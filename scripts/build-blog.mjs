/**
 * Generator static pentru blogul insuleplutitoare.ro
 * Rulează: node scripts/build-blog.mjs
 * Citește content/blog.config.json + content/articole/*.md și scrie pagini HTML statice.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(process.cwd());
const CONTENT = join(ROOT, 'content');
const ARTICLES_DIR = join(CONTENT, 'articole');
const OUT = join(ROOT, 'blog');

const cfg = JSON.parse(readFileSync(join(CONTENT, 'blog.config.json'), 'utf8'));
const SITE = cfg.siteUrl.replace(/\/$/, '');

/* ---------------- utils ---------------- */
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s = '') => s.toLowerCase()
  .replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const LUNI = ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];
function dateRo(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return `${d.getUTCDate()} ${LUNI[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/* ---------------- frontmatter ---------------- */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i === -1 || /^\s*#/.test(line)) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim().replace(/^["'](.*)["']$/, '$1');
    data[key] = val;
  }
  return { data, body: m[2] };
}

/* ---------------- markdown (subset) ---------------- */
function inline(t) {
  return esc(t)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, '')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, href) => {
      const ext = /^https?:\/\//.test(href) && !href.includes('insuleplutitoare.ro');
      return `<a href="${href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${txt}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}

function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let list = null, para = [], quote = [];
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const flushQuote = () => { if (quote.length) { out.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`); quote = []; } };
  const flushAll = () => { flushPara(); flushList(); flushQuote(); };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushAll(); continue; }

    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (img) {
      flushAll();
      const cap = img[3] ? `<figcaption>${esc(img[3])}</figcaption>` : '';
      out.push(`<figure><img src="${esc(img[2])}" alt="${esc(img[1])}" loading="lazy" decoding="async" />${cap}</figure>`);
      continue;
    }
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      flushAll();
      const lvl = h[1].length;
      const id = slugify(h[2]);
      out.push(`<h${lvl} id="${id}">${inline(h[2])}</h${lvl}>`);
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(line)) { flushAll(); out.push('<hr />'); continue; }
    if (/^>\s?/.test(line)) { flushPara(); flushList(); quote.push(line.replace(/^>\s?/, '')); continue; }
    const li = line.match(/^([-*]|\d+\.)\s+(.*)$/);
    if (li) {
      flushPara(); flushQuote();
      const type = /^\d/.test(li[1]) ? 'ol' : 'ul';
      if (list && list !== type) flushList();
      if (!list) { out.push(`<${type}>`); list = type; }
      out.push(`<li>${inline(li[2])}</li>`);
      continue;
    }
    flushList(); flushQuote();
    para.push(line);
  }
  flushAll();
  return out.join('\n');
}

/* ---------------- load articles ---------------- */
const catBySlug = new Map(cfg.categories.map(c => [c.slug, c]));
let articles = [];

if (existsSync(ARTICLES_DIR)) {
  for (const file of readdirSync(ARTICLES_DIR)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const raw = readFileSync(join(ARTICLES_DIR, file), 'utf8');
    const { data, body } = parseFrontmatter(raw);
    if ((data.status || 'draft').toLowerCase() !== 'published') continue;

    const slug = data.slug || slugify(data.title || file.replace(/\.md$/, ''));
    const catSlug = catBySlug.has(data.category) ? data.category : slugify(data.category || 'noutati');
    const cat = catBySlug.get(catSlug) || { slug: catSlug, name: data.category || 'Noutăți', description: '' };
    const words = body.split(/\s+/).filter(Boolean).length;
    const html = renderMarkdown(body);
    const text = body.replace(/[#>*_\-!\[\]()]/g, ' ').replace(/\s+/g, ' ').trim();

    articles.push({
      slug, title: data.title || slug, excerpt: data.excerpt || text.slice(0, 160),
      category: cat, tags: (data.tags || '').split(',').map(t => t.trim()).filter(Boolean),
      author: data.author || cfg.defaultAuthor,
      date: data.date || new Date().toISOString().slice(0, 10),
      updated: data.updated || data.date || null,
      image: data.image || cfg.defaultImage,
      imageAlt: data.imageAlt || data.title || cfg.defaultImageAlt,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.excerpt || text.slice(0, 155),
      ogImage: data.ogImage || data.image || cfg.defaultImage,
      keywords: data.keywords || '',
      featured: String(data.featured).toLowerCase() === 'true',
      readingTime: Math.max(1, Math.round(words / 200)),
      html, text,
      url: `/blog/${slug}/`,
    });
  }
}
articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/* ---------------- shared partials ---------------- */
const ICON = {
  phone: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  arrow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
};

function header(active) {
  const links = [
    ['/', 'Acasă', 'acasa'],
    ['/#despre', 'Ce Facem', 'despre'],
    ['/#galerie', 'Galerie', 'galerie'],
    ['/blog/', 'Blog', 'blog'],
    ['/#beneficii', 'De Ce Noi', 'beneficii'],
    ['/#contact', 'Contact', 'contact'],
  ];
  const nav = links.map(([h, l, k]) => `<a href="${h}"${k === active ? ' aria-current="page"' : ''}>${l}</a>`).join('\n        ');
  const mob = links.map(([h, l, k]) => `<a class="mobile-link" href="${h}"${k === active ? ' aria-current="page"' : ''}>${l}</a>`).join('\n      ');
  return `  <a class="skip-link" href="#main">Sari la conținut</a>
  <header class="header" id="header">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="insuleplutitoare.ro — pagina principală">
        <img src="/images/logo.png" alt="insuleplutitoare.ro" width="300" height="150" />
      </a>
      <nav class="nav-desktop" aria-label="Navigare principală">
        ${nav}
      </nav>
      <div class="header-contact">
        <a href="tel:+40755011500">${ICON.phone}<span>+40 755 011 500</span></a>
        <a href="mailto:jenoszabo68@gmail.com">${ICON.mail}<span>jenoszabo68@gmail.com</span></a>
      </div>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Deschide meniul" aria-expanded="false" aria-controls="mobileMenu">
        <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <nav class="mobile-menu" id="mobileMenu" aria-label="Navigare mobil">
      ${mob}
      <div class="mobile-menu-divider">
        <a href="tel:+40755011500">${ICON.phone}+40 755 011 500</a>
        <a href="mailto:jenoszabo68@gmail.com">${ICON.mail}jenoszabo68@gmail.com</a>
      </div>
    </nav>
  </header>`;
}

const footer = () => `  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="/images/logo.png" alt="" width="150" height="75" />
        <span>&copy; ${new Date().getUTCFullYear()} insuleplutitoare.ro</span>
      </div>
      <nav class="footer-links" aria-label="Navigare secundară">
        <a href="/">Acasă</a>
        <a href="/#despre">Ce facem</a>
        <a href="/#galerie">Galerie</a>
        <a href="/blog/">Blog</a>
        <a href="/#contact">Contact</a>
      </nav>
      <div class="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
      </div>
    </div>
  </footer>`;

function page({ title, description, canonical, ogImage, ogType = 'website', jsonld = [], noindex = false, body, active }) {
  const ld = jsonld.map(o => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  ${noindex ? '<meta name="robots" content="noindex, follow" />' : '<meta name="robots" content="index, follow, max-image-preview:large" />'}
  <link rel="canonical" href="${SITE}${canonical}" />
  <meta property="og:site_name" content="insuleplutitoare.ro" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${SITE}${canonical}" />
  <meta property="og:image" content="${SITE}${ogImage}" />
  <meta property="og:locale" content="ro_RO" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${SITE}${ogImage}" />
  <meta name="theme-color" content="#2c5c46" />
  <link rel="icon" href="/favicon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/blog.css" />
${ld}
</head>
<body>
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/blog.js" defer></script>
</body>
</html>
`;
}

/* ---------------- components ---------------- */
function cardHtml(a) {
  return `<article class="post-card">
  <a class="thumb" href="${a.url}" tabindex="-1" aria-hidden="true"><img src="${esc(a.image)}" alt="" loading="lazy" decoding="async" width="800" height="500" /></a>
  <div class="body">
    <p class="tag-cat"><a href="/blog/categorie/${a.category.slug}/">${esc(a.category.name)}</a></p>
    <h3><a href="${a.url}">${esc(a.title)}</a></h3>
    <p class="meta"><time datetime="${a.date}">${dateRo(a.date)}</time><span class="dot"></span><span>${a.readingTime} min citire</span></p>
    <p>${esc(a.excerpt)}</p>
    <a class="read-more" href="${a.url}">Citește articolul ${ICON.arrow}</a>
  </div>
</article>`;
}

function featuredHtml(a) {
  return `<article class="featured-card">
  <a class="thumb" href="${a.url}" tabindex="-1" aria-hidden="true"><img src="${esc(a.image)}" alt="" fetchpriority="high" decoding="async" width="1200" height="750" /></a>
  <div class="body">
    <p class="tag-cat">Articol recomandat · <a href="/blog/categorie/${a.category.slug}/">${esc(a.category.name)}</a></p>
    <h3><a href="${a.url}">${esc(a.title)}</a></h3>
    <p class="meta"><time datetime="${a.date}">${dateRo(a.date)}</time><span class="dot"></span><span>${a.readingTime} min citire</span><span class="dot"></span><span>${esc(a.author)}</span></p>
    <p>${esc(a.excerpt)}</p>
    <p><a class="read-more" href="${a.url}">Citește articolul ${ICON.arrow}</a></p>
  </div>
</article>`;
}

const ctaBox = (variant = 'default') => `<section class="cta-box" aria-labelledby="cta-title">
  <h2 id="cta-title">${variant === 'article' ? 'Ai un lac sau un corp de apă care are nevoie de o soluție?' : 'Hai să discutăm despre proiectul tău'}</h2>
  <p>Evaluăm gratuit situația și îți propunem o soluție cu insule plutitoare adaptată corpului tău de apă — pentru calitatea apei, biodiversitate și peisaj.</p>
  <div class="cta-actions">
    <a class="btn-primary" href="/#contact">${ICON.mail} Cere o evaluare</a>
    <a class="btn-outline" href="/#despre">Află despre insulele plutitoare</a>
  </div>
</section>`;

const breadcrumbs = (items) => `<nav class="breadcrumbs" aria-label="Navigare ierarhică"><ol>${items.map((it, i) => `<li>${it.url && i < items.length - 1 ? `<a href="${it.url}">${esc(it.name)}</a>` : `<span aria-current="page">${esc(it.name)}</span>`}${i < items.length - 1 ? ' <span aria-hidden="true">/</span>' : ''}</li>`).join('')}</ol></nav>`;

const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE + (it.url || '') })),
});

const catNav = (activeSlug, interactive) => `<nav class="cat-nav" aria-label="Categorii articole">
  ${interactive ? `<button type="button" class="cat-chip active" data-cat="toate">Toate</button>` : `<a class="cat-chip" href="/blog/">Toate</a>`}
  ${cfg.categories.map(c => interactive
    ? `<button type="button" class="cat-chip" data-cat="${c.slug}">${esc(c.name)}</button>`
    : `<a class="cat-chip" href="/blog/categorie/${c.slug}/"${c.slug === activeSlug ? ' aria-current="page"' : ''}>${esc(c.name)}</a>`).join('\n  ')}
</nav>`;

/* ---------------- write helper ---------------- */
function write(relDir, html) {
  const dir = join(ROOT, relDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });

/* ---------------- blog index (+ pagination) ---------------- */
const perPage = cfg.postsPerPage || 9;
const featured = articles.find(a => a.featured) || articles[0] || null;
const rest = articles.filter(a => a !== featured);
const totalPages = Math.max(1, Math.ceil(rest.length / perPage));

for (let p = 1; p <= totalPages; p++) {
  const slice = rest.slice((p - 1) * perPage, p * perPage);
  const canonical = p === 1 ? '/blog/' : `/blog/pagina/${p}/`;
  const crumbs = [{ name: 'Acasă', url: '/' }, { name: 'Blog', url: '/blog/' }];
  if (p > 1) crumbs.push({ name: `Pagina ${p}`, url: canonical });

  const empty = articles.length === 0;
  const body = `<section class="blog-hero">
  <div class="wrap">
    ${breadcrumbs(crumbs)}
    <p class="section-label">${esc(cfg.blogTitle)}</p>
    <h1>${cfg.blogHeading}</h1>
    <p>${esc(cfg.blogTagline)}</p>
    <div class="blog-tools">
      <div class="search-field">
        <label class="visually-hidden" for="blogSearch">Caută articole</label>
        ${ICON.search}
        <input type="search" id="blogSearch" placeholder="Caută articole…" autocomplete="off" />
      </div>
    </div>
    <div class="blog-tools">${catNav(null, true)}</div>
  </div>
</section>

<div class="wrap section" id="results">
  <div id="staticContent"${p === 1 ? '' : ''}>
    ${empty ? `<div class="notice"><strong>Momentan nu există articole publicate.</strong>Lucrăm la primele materiale despre insule plutitoare, calitatea apei și biodiversitate. Revino în curând sau scrie-ne dacă vrei să afli mai multe.<div class="cta-actions" style="margin-top:1.5rem"><a class="btn-primary" href="/#contact">Contactează-ne</a></div></div>` : ''}
    ${featured && p === 1 ? `<section aria-labelledby="featured-title" style="margin-bottom:3rem"><h2 class="visually-hidden" id="featured-title">Articol recomandat</h2>${featuredHtml(featured)}</section>` : ''}
    ${slice.length ? `<section aria-labelledby="latest-title">
      <p class="section-label">Articole</p>
      <h2 class="section-title" id="latest-title" style="margin-bottom:2rem">Cele mai <strong>recente</strong></h2>
      <div class="card-grid">
        ${slice.map(cardHtml).join('\n        ')}
      </div>
    </section>` : ''}
    ${totalPages > 1 ? `<nav class="pagination" aria-label="Paginare articole">
      ${p > 1 ? `<a href="${p === 2 ? '/blog/' : `/blog/pagina/${p - 1}/`}" rel="prev">← Anterioare</a>` : ''}
      ${Array.from({ length: totalPages }, (_, i) => i + 1).map(n => n === p
        ? `<span aria-current="page">${n}</span>`
        : `<a href="${n === 1 ? '/blog/' : `/blog/pagina/${n}/`}">${n}</a>`).join('\n      ')}
      ${p < totalPages ? `<a href="/blog/pagina/${p + 1}/" rel="next">Următoare →</a>` : ''}
    </nav>` : ''}
  </div>
  <div id="dynamicContent" hidden aria-live="polite"></div>
  <div class="center mt-2"><button type="button" class="btn-outline" id="loadMore" hidden>Încarcă mai multe articole</button></div>
</div>

<div class="wrap">${ctaBox()}</div>`;

  write(p === 1 ? 'blog' : `blog/pagina/${p}`, page({
    title: p === 1 ? cfg.blogMetaTitle : `${cfg.blogMetaTitle} — pagina ${p}`,
    description: cfg.blogMetaDescription,
    canonical, ogImage: cfg.defaultImage, active: 'blog',
    jsonld: [
      breadcrumbLd(crumbs),
      { '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog insuleplutitoare.ro', url: `${SITE}/blog/`, inLanguage: 'ro-RO', description: cfg.blogMetaDescription,
        blogPost: articles.slice(0, 10).map(a => ({ '@type': 'BlogPosting', headline: a.title, url: SITE + a.url, datePublished: a.date, image: SITE + a.image })) },
    ],
    body,
  }));
}

/* ---------------- category pages ---------------- */
for (const c of cfg.categories) {
  const list = articles.filter(a => a.category.slug === c.slug);
  const crumbs = [{ name: 'Acasă', url: '/' }, { name: 'Blog', url: '/blog/' }, { name: c.name, url: `/blog/categorie/${c.slug}/` }];
  const body = `<section class="blog-hero">
  <div class="wrap">
    ${breadcrumbs(crumbs)}
    <p class="section-label">Categorie</p>
    <h1>${esc(c.name)}</h1>
    <p>${esc(c.description)}</p>
    <div class="blog-tools">${catNav(c.slug, false)}</div>
  </div>
</section>
<div class="wrap section">
  ${list.length ? `<div class="card-grid">${list.map(cardHtml).join('\n  ')}</div>`
    : `<div class="notice"><strong>Încă nu există articole în această categorie.</strong>Vezi <a href="/blog/">toate articolele</a> sau contactează-ne pentru informații despre proiectele noastre.</div>`}
  ${ctaBox()}
</div>`;
  write(`blog/categorie/${c.slug}`, page({
    title: `${c.name} | Blog insuleplutitoare.ro`,
    description: c.description || cfg.blogMetaDescription,
    canonical: `/blog/categorie/${c.slug}/`,
    ogImage: cfg.defaultImage, active: 'blog',
    noindex: list.length === 0,
    jsonld: [breadcrumbLd(crumbs), {
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.name, description: c.description,
      url: `${SITE}/blog/categorie/${c.slug}/`, inLanguage: 'ro-RO',
    }],
    body,
  }));
}

/* ---------------- article pages ---------------- */
function related(a) {
  const same = articles.filter(x => x.slug !== a.slug && x.category.slug === a.category.slug);
  const others = articles.filter(x => x.slug !== a.slug && x.category.slug !== a.category.slug);
  return [...same, ...others].slice(0, 3);
}

for (const a of articles) {
  const crumbs = [{ name: 'Acasă', url: '/' }, { name: 'Blog', url: '/blog/' },
    { name: a.category.name, url: `/blog/categorie/${a.category.slug}/` }, { name: a.title, url: a.url }];
  const shareUrl = encodeURIComponent(SITE + a.url);
  const shareTitle = encodeURIComponent(a.title);
  const rel = related(a);

  const body = `<article>
<div class="wrap-narrow article-header">
  ${breadcrumbs(crumbs)}
  <p class="tag-cat" style="margin-top:1rem"><a href="/blog/categorie/${a.category.slug}/">${esc(a.category.name)}</a></p>
  <h1>${esc(a.title)}</h1>
  <p class="meta">
    <span>de ${esc(a.author)}</span><span class="dot"></span>
    <time datetime="${a.date}">${dateRo(a.date)}</time><span class="dot"></span>
    <span>${a.readingTime} min citire</span>
  </p>
</div>
<div class="wrap-narrow">
  <img class="article-hero" src="${esc(a.image)}" alt="${esc(a.imageAlt)}" fetchpriority="high" decoding="async" width="1200" height="675" />
</div>
<div class="wrap-narrow">
  <div class="article-body">
    ${a.html}
  </div>
  <div class="share">
    <span>Distribuie:</span>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Distribuie pe Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
    <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}" target="_blank" rel="noopener noreferrer" aria-label="Distribuie pe X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L5.9 22H2.8l7.5-8.6L2.4 2h6.6l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z"/></svg></a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Distribuie pe LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
    <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Distribuie pe WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>
    <button type="button" id="copyLink" aria-label="Copiază linkul articolului"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>
    <span id="copyStatus" class="visually-hidden" role="status"></span>
  </div>
  ${ctaBox('article')}
</div>
</article>
${rel.length ? `<section class="related" aria-labelledby="rel-title">
  <div class="wrap">
    <p class="section-label">Continuă să explorezi</p>
    <h2 class="section-title" id="rel-title" style="margin-bottom:2rem">Articole <strong>similare</strong></h2>
    <div class="card-grid">${rel.map(cardHtml).join('\n    ')}</div>
    <p class="center mt-2"><a class="btn-outline" href="/blog/">Vezi toate articolele</a></p>
  </div>
</section>` : ''}`;

  write(`blog/${a.slug}`, page({
    title: a.seoTitle, description: a.seoDescription, canonical: a.url,
    ogImage: a.ogImage, ogType: 'article', active: 'blog',
    jsonld: [breadcrumbLd(crumbs), {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: a.title, description: a.seoDescription,
      image: [SITE + a.image], datePublished: a.date, dateModified: a.updated || a.date,
      author: { '@type': 'Organization', name: a.author, url: SITE },
      publisher: { '@type': 'Organization', name: 'Insule Plutitoare', logo: { '@type': 'ImageObject', url: `${SITE}/images/logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + a.url },
      articleSection: a.category.name, inLanguage: 'ro-RO',
      keywords: a.keywords || a.tags.join(', '), wordCount: a.text.split(/\s+/).length,
    }],
    body,
  }));
}

/* ---------------- search index ---------------- */
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'search-index.json'), JSON.stringify(articles.map(a => ({
  t: a.title, u: a.url, e: a.excerpt, c: a.category.slug, cn: a.category.name,
  d: a.date, dr: dateRo(a.date), r: a.readingTime, i: a.image,
  k: (a.title + ' ' + a.excerpt + ' ' + a.tags.join(' ') + ' ' + a.text).toLowerCase().slice(0, 1200),
}))));

/* ---------------- sitemap ---------------- */
const sitemapPath = join(ROOT, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  let xml = readFileSync(sitemapPath, 'utf8');
  xml = xml.replace(/\s*<url>(?:(?!<\/url>)[\s\S])*?<loc>[^<]*\/blog[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  const urls = [
    { loc: '/blog/', changefreq: 'weekly', priority: '0.9' },
    ...Array.from({ length: totalPages - 1 }, (_, i) => ({ loc: `/blog/pagina/${i + 2}/`, changefreq: 'weekly', priority: '0.4' })),
    ...cfg.categories.filter(c => articles.some(a => a.category.slug === c.slug))
      .map(c => ({ loc: `/blog/categorie/${c.slug}/`, changefreq: 'weekly', priority: '0.6' })),
    ...articles.map(a => ({ loc: a.url, changefreq: 'monthly', priority: '0.8', lastmod: a.updated || a.date })),
  ];
  const block = urls.map(u => [
    '  <url>',
    `    <loc>${SITE}${u.loc}</loc>`,
    u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
    `    <changefreq>${u.changefreq}</changefreq>`,
    `    <priority>${u.priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n')).join('\n');
  xml = xml.replace('</urlset>', block + '\n</urlset>');
  writeFileSync(sitemapPath, xml);
  if (existsSync(join(ROOT, 'public', 'sitemap.xml'))) writeFileSync(join(ROOT, 'public', 'sitemap.xml'), xml);
}

console.log(`Blog generat: ${articles.length} articole, ${totalPages} pagini de listare, ${cfg.categories.length} categorii.`);
