#!/usr/bin/env node
/**
 * Generator static pentru secțiunea „Cursuri de hidrobiologie”.
 * Rulează:  node scripts/build-cursuri.mjs
 *
 * Câmpurile configurabile (durată, locație, preț, următoarea sesiune) se
 * completează în obiectul COURSES de mai jos. Valoarea null afișează
 * „De stabilit” pe site, fără a inventa informații.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://insuleplutitoare.ro';
const TBD = null;

/* ------------------------------------------------------------------ date */

const COURSES = [
  {
    slug: 'naui-scuba-diver',
    step: 'PASUL 1',
    stepTitle: 'Învață să te scufunzi',
    badge: { text: 'Prezentare / Curs de bază', cls: 'badge-base' },
    title: 'NAUI Scuba Diver',
    subtitle: 'Curs de bază de scufundări',
    metaTitle: 'NAUI Scuba Diver — curs de bază de scufundări | Insule Plutitoare',
    metaDescription: 'Cursul NAUI Scuba Diver oferă pregătirea de bază pentru scufundări în condiții de siguranță — condiția necesară pentru cursurile de observare a mediului subacvatic.',
    intro: 'Pentru a putea participa la cursurile de specializare dedicate observării și studierii mediului subacvatic este necesară o pregătire de bază în scufundări. Cursul NAUI Scuba Diver oferă pregătirea necesară pentru a putea desfășura activități subacvatice în condiții de siguranță.',
    price: '3500 RON',
    duration: TBD,
    location: TBD,
    nextSession: TBD,
    image: '/images/gallery/insula-plutitoare-lac-smarald-cariera-1600.webp',
    audience: [
      'Persoane fără experiență anterioară de scufundare care doresc o pregătire de bază.',
      'Persoane interesate de observarea mediului acvatic, care au nevoie de calificarea de bază înainte de cursurile de specializare.',
      'Persoane implicate în proiecte de mediu care au nevoie de acces sub apă în condiții de siguranță.'
    ],
    requirements: [
      'Vârsta minimă conform standardelor NAUI aplicabile cursului.',
      'Stare de sănătate compatibilă cu activitatea de scufundare, conform cerințelor medicale aplicabile.',
      'Capacitatea de a se descurca în apă (evaluare la începutul cursului).'
    ],
    objectives: [
      'Înțelegerea principiilor fizice și fiziologice ale scufundării.',
      'Utilizarea corectă și sigură a echipamentului de scufundare.',
      'Controlul flotabilității și deplasarea eficientă sub apă.',
      'Planificarea unei scufundări și aplicarea procedurilor de siguranță.',
      'Lucrul în echipă cu partenerul de scufundare.'
    ],
    modules: [
      'Introducere în scufundare și echipamentul de bază',
      'Fizica și fiziologia scufundării',
      'Proceduri de siguranță și gestionarea situațiilor neprevăzute',
      'Controlul flotabilității și tehnici de deplasare',
      'Planificarea scufundărilor',
      'Scufundări practice în mediu deschis'
    ],
    theory: 'Partea teoretică acoperă noțiunile de fizică și fiziologie a scufundării, echipamentul, planificarea scufundărilor, procedurile de siguranță și responsabilitatea față de mediul acvatic.',
    practice: 'Partea practică include exerciții în apă puțin adâncă și scufundări în mediu deschis, în care se exersează controlul flotabilității, procedurile de siguranță și lucrul cu partenerul de scufundare.',
    faq: [
      ['Este nevoie de experiență anterioară?', 'Nu. Cursul NAUI Scuba Diver este un curs de bază, destinat inclusiv persoanelor care se scufundă pentru prima dată.'],
      ['Unde se poate face cursul?', 'Cursul de bază poate fi efectuat inclusiv la centrul nostru. Detaliile de locație și programare se stabilesc împreună cu fiecare participant.'],
      ['De ce am nevoie de acest curs pentru celelalte două?', 'Cursurile de specializare se desfășoară sub apă, așa că presupun o pregătire de scufundător deja dobândită.'],
      ['Ce include prețul?', 'Detaliile privind ce este inclus în tariful de 3500 RON se comunică la înscriere, în funcție de sesiune și locație.']
    ]
  },
  {
    slug: 'naui-underwater-naturalist-diver',
    step: 'PASUL 2',
    stepTitle: 'Învață să observi',
    badge: { text: 'Curs specializat', cls: 'badge-spec' },
    title: 'NAUI Underwater Naturalist Diver Course',
    subtitle: 'Curs de naturalist subacvatic',
    metaTitle: 'NAUI Underwater Naturalist Diver — curs de naturalist subacvatic | Insule Plutitoare',
    metaDescription: 'Curs de specializare dedicat observării vieții subacvatice: identificarea organismelor, habitate acvatice, biodiversitate și observație responsabilă în timpul scufundării.',
    intro: 'Un curs dedicat explorării și înțelegerii vieții subacvatice. Participanții învață să observe organismele și habitatele acvatice, să recunoască relațiile dintre organisme și mediul lor și să privească scufundarea din perspectiva unui observator al ecosistemului.',
    price: '3000 RON',
    duration: TBD,
    location: TBD,
    nextSession: TBD,
    image: '/images/gallery/insula-plutitoare-vegetatie-densa-oglinda-1600.webp',
    topics: [
      'observarea vieții acvatice',
      'identificarea organismelor',
      'habitate subacvatice',
      'relațiile dintre organisme și mediu',
      'biodiversitate',
      'comportamentul organismelor',
      'impactul activităților umane asupra ecosistemelor acvatice',
      'observația responsabilă în timpul scufundării'
    ],
    requirementNote: 'Condiție de participare: absolvirea cursului de bază NAUI Scuba Diver sau deținerea unei calificări de scafandru echivalente, conform cerințelor aplicabile cursului.',
    audience: [
      'Scafandri care doresc să înțeleagă ce observă sub apă, nu doar să se scufunde.',
      'Persoane interesate de biodiversitatea acvatică și de ecologia lacurilor și a apelor interioare.',
      'Participanți la proiecte de mediu care au nevoie de o privire structurată asupra habitatelor subacvatice.'
    ],
    requirements: [
      'Absolvirea cursului de bază NAUI Scuba Diver sau o calificare de scafandru echivalentă, conform cerințelor aplicabile cursului.',
      'Stare de sănătate compatibilă cu activitatea de scufundare.',
      'Echipament de scufundare adecvat condițiilor sesiunii.'
    ],
    objectives: [
      'Observarea atentă și structurată a vieții acvatice.',
      'Recunoașterea principalelor grupe de organisme și a habitatelor în care apar.',
      'Înțelegerea relațiilor dintre organisme și mediul lor de viață.',
      'Recunoașterea efectelor activităților umane asupra ecosistemelor acvatice.',
      'Practicarea unei observații responsabile, fără perturbarea organismelor.'
    ],
    modules: [
      'Principiile observației subacvatice',
      'Habitate acvatice și structura lor',
      'Identificarea organismelor acvatice',
      'Relații ecologice și comportamentul organismelor',
      'Biodiversitate și indicatori de stare a ecosistemului',
      'Impactul activităților umane',
      'Scufundări de observație'
    ],
    theory: 'Partea teoretică tratează habitatele acvatice, grupele de organisme întâlnite, relațiile ecologice dintre acestea și mediu, precum și principiile observației responsabile sub apă.',
    practice: 'Partea practică constă în scufundări de observație, în care participanții exersează recunoașterea habitatelor și a organismelor și își notează observațiile fără a perturba mediul.',
    faq: [
      ['Pot participa fără brevet de scufundare?', 'Nu. Cursul presupune o pregătire de bază pentru scufundări — cursul NAUI Scuba Diver sau o calificare de scafandru echivalentă, conform cerințelor aplicabile cursului.'],
      ['Este nevoie de studii de biologie?', 'Nu. Cursul este construit pentru scafandri, iar noțiunile de biologie acvatică sunt introduse pas cu pas.'],
      ['Ce echipament îmi trebuie?', 'Echipamentul standard de scufundare; detaliile se comunică înainte de sesiune, în funcție de locație și condiții.'],
      ['Care este prețul cursului?', 'Tariful se comunică la stabilirea sesiunii. Scrie-ne prin formularul de înscriere pentru oferta curentă.']
    ]
  },
  {
    slug: 'naui-citizen-science-diver',
    step: 'PASUL 3',
    stepTitle: 'Învață să contribui',
    badge: { text: 'Curs specializat', cls: 'badge-spec' },
    title: 'NAUI Citizen Science Diver Course',
    subtitle: 'Curs de Citizen Science pentru scafandri',
    metaTitle: 'NAUI Citizen Science Diver — curs de citizen science pentru scafandri | Insule Plutitoare',
    metaDescription: 'Curs care leagă scufundările de cercetarea participativă: observație subacvatică, documentarea biodiversității și monitorizarea ecosistemelor acvatice.',
    intro: 'Un curs care face legătura dintre scufundări și cercetarea participativă. Scafandrii sunt introduși în principiile observării, documentării și colectării de informații despre mediul acvatic, astfel încât observațiile realizate sub apă să poată contribui la proiecte de monitorizare și cunoaștere a ecosistemelor.',
    price: '3000 RON',
    duration: TBD,
    location: TBD,
    nextSession: TBD,
    image: '/images/gallery/insula-plutitoare-instalare-lac-montan-1600.webp',
    topics: [
      'citizen science',
      'observație subacvatică',
      'documentarea biodiversității',
      'colectarea și organizarea observațiilor',
      'monitorizarea ecosistemelor',
      'identificarea organismelor',
      'documentarea schimbărilor din mediul acvatic',
      'contribuția scafandrilor la proiecte de cercetare și conservare'
    ],
    requirementNote: 'Condiție de participare: pregătire de bază pentru scufundări.',
    audience: [
      'Scafandri care vor ca scufundările lor să contribuie la proiecte de monitorizare.',
      'Voluntari și membri ai organizațiilor de mediu implicați în observarea apelor.',
      'Persoane interesate de documentarea biodiversității acvatice.'
    ],
    requirements: [
      'Pregătire de bază pentru scufundări.',
      'Stare de sănătate compatibilă cu activitatea de scufundare.',
      'Disponibilitate pentru lucrul cu fișe de observație și material foto/video.'
    ],
    objectives: [
      'Înțelegerea principiilor cercetării participative (citizen science).',
      'Realizarea de observații subacvatice utilizabile într-un proiect de monitorizare.',
      'Documentarea biodiversității prin notițe, fotografii și fișe de observație.',
      'Organizarea și raportarea corectă a datelor colectate.',
      'Recunoașterea și documentarea schimbărilor din mediul acvatic.'
    ],
    modules: [
      'Ce este citizen science și cum contribuie scafandrii',
      'Protocoale de observație subacvatică',
      'Identificarea și documentarea organismelor',
      'Tehnici de documentare foto/video sub apă',
      'Colectarea, organizarea și raportarea observațiilor',
      'Monitorizarea în timp a ecosistemelor',
      'Scufundări de documentare'
    ],
    theory: 'Partea teoretică prezintă principiile cercetării participative, protocoalele de observație, modul de înregistrare a datelor și felul în care observațiile scafandrilor ajung să fie utile în proiecte de monitorizare și conservare.',
    practice: 'Partea practică include scufundări de documentare, în care participanții completează fișe de observație, realizează material foto/video și își organizează datele colectate.',
    faq: [
      ['Ce înseamnă citizen science?', 'Cercetare participativă: observații realizate de persoane neprofesioniste, după protocoale clare, care pot fi folosite în proiecte de monitorizare a mediului.'],
      ['Trebuie să am cursul de naturalist subacvatic înainte?', 'Condiția explicită este pregătirea de bază pentru scufundări. Cursul de naturalist subacvatic ajută, pentru că exersează observația și identificarea organismelor.'],
      ['Am nevoie de aparat foto subacvatic?', 'Documentarea foto/video este utilă, dar cerințele concrete de echipament se comunică înainte de sesiune.'],
      ['Unde ajung observațiile mele?', 'Observațiile pot fi folosite în proiecte de monitorizare și cunoaștere a ecosistemelor acvatice, în funcție de proiectul la care participi.']
    ]
  }
];

const CERTIFICATES = [
  {
    title: 'Instructor of Underwater Naturalist Diver Course',
    holder: 'Jeno Szabo (#33607)',
    date: 'October 28, 1999',
    file: '/images/certificate/naui-instructor-underwater-naturalist-diver.jpg',
    alt: 'Certificat NAUI de instructor pentru Underwater Naturalist Diver Course, emis pe numele Jeno Szabo (#33607), 28 octombrie 1999'
  },
  {
    title: 'Instructor of Citizen Science Diver Course',
    holder: 'Jeno Szabo (#33607)',
    date: 'October 28, 1999',
    file: '/images/certificate/naui-instructor-citizen-science-diver.jpg',
    alt: 'Certificat NAUI de instructor pentru Citizen Science Diver Course, emis pe numele Jeno Szabo (#33607), 28 octombrie 1999'
  }
];

/* --------------------------------------------------------------- helpers */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const val = v => (v == null ? '<dd class="tbd">De stabilit — te contactăm cu detaliile</dd>' : `<dd>${esc(v)}</dd>`);

const ICON = {
  phone: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  down: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
  cert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  close: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
};

const NAV = [
  ['/', 'Acasă', 'acasa'],
  ['/#despre', 'Ce Facem', 'despre'],
  ['/#galerie', 'Galerie', 'galerie'],
  ['/cursuri-hidrobiologie/', 'Cursuri', 'cursuri'],
  ['/blog/', 'Blog', 'blog'],
  ['/#beneficii', 'De Ce Noi', 'beneficii'],
  ['/#contact', 'Contact', 'contact']
];

function header(active) {
  const nav = NAV.map(([h, l, k]) => `<a href="${h}"${k === active ? ' aria-current="page"' : ''}>${l}</a>`).join('\n        ');
  const mob = NAV.map(([h, l, k]) => `<a class="mobile-link" href="${h}"${k === active ? ' aria-current="page"' : ''}>${l}</a>`).join('\n      ');
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
        <a href="tel:+40755011500">${ICON.phone}<span>0040755011500</span></a>
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
        <a href="tel:+40755011500">${ICON.phone}0040755011500</a>
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
        <a href="/cursuri-hidrobiologie/">Cursuri de hidrobiologie</a>
        <a href="/blog/">Blog</a>
        <a href="/#contact">Contact</a>
      </nav>
      <div class="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
      </div>
    </div>
  </footer>`;

function page({ title, description, canonical, ogImage, jsonld = [], body }) {
  const ld = jsonld.map(o => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:site_name" content="insuleplutitoare.ro" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
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
  <link rel="stylesheet" href="/assets/cursuri.css" />
${ld}
</head>
<body>
${header('cursuri')}
<main id="main">
${body}
</main>
${footer()}
  <figure class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Vizualizare certificat" aria-hidden="true">
    <button type="button" class="lb-close" aria-label="Închide">${ICON.close}</button>
    <img src="" alt="" />
    <figcaption></figcaption>
  </figure>
<script src="/assets/cursuri.js" defer></script>
</body>
</html>
`;
}

const crumbs = items => `<nav class="breadcrumbs" aria-label="Navigare ierarhică"><ol>${items
  .map((it, i) => (i === items.length - 1
    ? `<li><span aria-current="page">${esc(it.name)}</span></li>`
    : `<li><a href="${it.url}">${esc(it.name)}</a> <span aria-hidden="true">/</span></li>`)).join('')}</ol></nav>`;

const breadcrumbLd = items => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE + it.url }))
});

function enrollForm(preselect) {
  const opts = COURSES.map(c => `<option value="${esc(c.title)}"${c.title === preselect ? ' selected' : ''}>${esc(c.title)}</option>`).join('\n            ');
  return `<section class="section form-section" id="inscriere">
  <div class="wrap">
    <p class="section-label">Înscriere</p>
    <h2 class="section-title">Trimite o <strong>cerere de înscriere</strong></h2>
    <p class="form-hint" style="margin-top:0.75rem;max-width:44rem">Completează datele de mai jos și îți răspundem cu detaliile de program, locație și tarif pentru cursul ales.</p>
    <form class="enroll-form" id="enrollForm" novalidate>
      <div class="row-2">
        <div class="field">
          <label for="nume">Nume și prenume *</label>
          <input type="text" id="nume" name="nume" required autocomplete="name" />
        </div>
        <div class="field">
          <label for="email">E-mail *</label>
          <input type="email" id="email" name="email" required autocomplete="email" />
        </div>
      </div>
      <div class="row-2">
        <div class="field">
          <label for="telefon">Telefon</label>
          <input type="tel" id="telefon" name="telefon" autocomplete="tel" />
        </div>
        <div class="field">
          <label for="curs">Cursul dorit *</label>
          <select id="curs" name="curs" required>
            ${opts}
          </select>
        </div>
      </div>
      <div class="field">
        <label for="experienta">Experiență de scufundare / brevet deținut</label>
        <input type="text" id="experienta" name="experienta" placeholder="ex. fără experiență, NAUI Scuba Diver, altă calificare echivalentă" />
      </div>
      <div class="field">
        <label for="mesaj">Mesaj</label>
        <textarea id="mesaj" name="mesaj" placeholder="Întrebări, perioada preferată, alte detalii"></textarea>
      </div>
      <button type="submit" class="btn-primary">Trimite cererea</button>
      <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>
      <p class="form-hint">Cererea se trimite prin e-mail către jenoszabo68@gmail.com. Ne poți suna și la <a href="tel:+40755011500" style="text-decoration:underline">0040755011500</a>.</p>
    </form>
  </div>
</section>`;
}

/* ------------------------------------------------------------ index page */

function buildIndex() {
  const c1 = COURSES[0], c2 = COURSES[1], c3 = COURSES[2];

  const pathSteps = COURSES.map(c => `<div class="path-step">
          <p class="step-no">${esc(c.step)}</p>
          <h3>${esc(c.stepTitle)}</h3>
          <p class="course-name">${esc(c.title)}</p>
          ${c.price ? `<p class="price">${esc(c.price)}</p>` : ''}
          <p style="margin-top:1rem"><a class="read-more" href="/cursuri-hidrobiologie/${c.slug}/">Vezi cursul</a></p>
        </div>`).join(`
        <div class="path-arrow" aria-hidden="true">${ICON.down}</div>
        `);

  const specCard = c => `<article class="course-card" id="${c.slug}">
        <div class="eyebrow"><span class="badge ${c.badge.cls}">${esc(c.badge.text)}</span></div>
        <h3>${esc(c.title)}</h3>
        <p class="subtitle">${esc(c.subtitle)}</p>
        <p>${esc(c.intro)}</p>
        <ul class="topic-list">${c.topics.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <p class="requirement">${esc(c.requirementNote)}</p>
        <div class="card-actions">
          <a class="btn-outline" href="/cursuri-hidrobiologie/${c.slug}/">Vezi cursul</a>
          <a class="btn-primary" href="/cursuri-hidrobiologie/${c.slug}/#inscriere">Înscriere</a>
        </div>
      </article>`;

  const certCards = CERTIFICATES.map(ct => `<article class="cert-card">
          <button type="button" class="cert-frame" data-full="${ct.file}" data-caption="${esc(ct.title)} — ${esc(ct.holder)}, ${esc(ct.date)}" aria-label="Vezi mărit certificatul: ${esc(ct.title)}">
            <img src="${ct.file}" alt="${esc(ct.alt)}" loading="lazy" decoding="async" />
            <span class="cert-missing" hidden>${ICON.cert}<span>Imaginea certificatului urmează să fie încărcată în <code>${ct.file}</code>.</span></span>
          </button>
          <div class="cert-body">
            <h3>${esc(ct.title)}</h3>
            <dl>
              <div><dt>Titular</dt><dd>${esc(ct.holder)}</dd></div>
              <div><dt>Data certificării</dt><dd>${esc(ct.date)}</dd></div>
            </dl>
          </div>
        </article>`).join('\n        ');

  const chain = ['Scufundări', 'Observație', 'Identificare', 'Documentare', 'Monitorizare', 'Înțelegerea ecosistemului']
    .map(s => `<span class="link-step">${esc(s)}</span>`).join('<span class="sep" aria-hidden="true">→</span>');

  const compareRows = [
    ['NAUI Scuba Diver', 'Dobândirea pregătirii de bază pentru scufundări'],
    ['Underwater Naturalist Diver', 'Observarea și înțelegerea vieții subacvatice'],
    ['Citizen Science Diver', 'Observarea și documentarea mediului în cadrul activităților de citizen science']
  ];

  const gallery = [
    ['insula-plutitoare-vegetatie-tanara-lac', 'Vegetație tânără pe o insulă plutitoare, cu rădăcini care se dezvoltă sub apă'],
    ['insula-plutitoare-structura-modulara-iuta', 'Structură modulară din iută a unei insule plutitoare, habitat pentru organisme acvatice'],
    ['insula-plutitoare-iris-galben-lac', 'Insulă plutitoare cu iriși galbeni pe un lac liniștit'],
    ['insula-plutitoare-instalare-lac-montan', 'Specialist inspectând o insulă plutitoare instalată pe un lac montan']
  ].map(([f, alt]) => `<img src="/images/gallery/${f}-960.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="960" height="960" />`).join('\n      ');

  const crumbItems = [{ name: 'Acasă', url: '/' }, { name: 'Cursuri de hidrobiologie', url: '/cursuri-hidrobiologie/' }];

  const body = `<section class="course-hero">
  <div class="wrap">
    ${crumbs(crumbItems)}
    <p class="section-label">Cursuri de hidrobiologie</p>
    <h1>De la scufundare la <strong>înțelegerea ecosistemului</strong></h1>
    <p class="lead">Un program educațional construit în jurul unor cursuri NAUI dedicate scufundărilor, observării vieții subacvatice și participării scafandrilor la activități de cunoaștere și monitorizare a ecosistemelor acvatice.</p>
    <div class="hero-actions">
      <a class="btn-primary" href="#trasee">Vezi traseul educațional</a>
      <a class="btn-outline" href="#inscriere">Înscriere</a>
    </div>
    <dl class="hero-facts">
      <div><dt>Cursuri</dt><dd>3 cursuri NAUI</dd></div>
      <div><dt>Curs de bază</dt><dd>NAUI Scuba Diver — 3500 RON</dd></div>
      <div><dt>Specializări</dt><dd>Underwater Naturalist · Citizen Science</dd></div>
    </dl>
  </div>
</section>

<section class="course-video" aria-labelledby="course-video-title">
  <div class="wrap">
    <div class="course-video-heading">
      <p class="section-label">Descoperă programul</p>
      <h2 class="section-title" id="course-video-title">Scufundări, observație și <strong>cunoașterea ecosistemelor</strong></h2>
    </div>
    <div class="course-video-frame">
      <iframe src="https://www.youtube-nocookie.com/embed/GTTbCziHgys?rel=0" title="Prezentarea cursurilor de hidrobiologie și scufundări" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </div>
</section>

<section class="section path" id="trasee">
  <div class="wrap">
    <p class="section-label">Traseu educațional</p>
    <h2 class="section-title">Trei pași, în <strong>ordine</strong></h2>
    <div class="path-steps">
        ${pathSteps}
    </div>
  </div>
</section>

<section class="section" id="cursuri">
  <div class="wrap">
    <p class="section-label">Cursul 1 — curs de bază</p>
    <h2 class="section-title">NAUI <strong>Scuba Diver</strong></h2>
    <div style="margin-top:2rem">
      <article class="course-card" id="${c1.slug}">
        <div class="eyebrow"><span class="badge badge-base">Prezentare / Curs de bază</span></div>
        <h3>${esc(c1.title)}</h3>
        <p class="subtitle">${esc(c1.subtitle)}</p>
        <p>${esc(c1.intro)}</p>
        <p class="requirement">Acest curs poate fi efectuat inclusiv la centrul nostru. Absolvirea lui — sau o calificare de scafandru echivalentă, conform cerințelor aplicabile — este condiția de acces la cele două cursuri de specializare de mai jos.</p>
        <p class="price-tag"><small>Preț</small>${esc(c1.price)}</p>
        <div class="card-actions">
          <a class="btn-outline" href="/cursuri-hidrobiologie/${c1.slug}/">Vezi cursul NAUI Scuba Diver</a>
          <a class="btn-primary" href="/cursuri-hidrobiologie/${c1.slug}/#inscriere">Înscriere</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap">
    <p class="section-label">Cursurile 2 și 3 — specializare</p>
    <h2 class="section-title">Observare și <strong>citizen science</strong></h2>
    <p class="form-hint" style="margin:0.75rem 0 2rem;max-width:44rem">Cele două cursuri de specializare se desfășoară sub apă și presupun o pregătire de scafandru deja dobândită.</p>
      ${specCard(c2)}
      ${specCard(c3)}
  </div>
</section>

<section class="section certs" id="calificare">
  <div class="wrap">
    <p class="section-label">Experiență și calificare</p>
    <h2 class="section-title">Experiență în instruirea scafandrilor pentru <strong>observarea și studierea mediului subacvatic</strong></h2>
    <p class="form-hint" style="margin-top:1rem;max-width:46rem">Programul educațional este construit în jurul unor cursuri NAUI dedicate observării mediului subacvatic și participării scafandrilor la activități de cunoaștere și monitorizare a ecosistemelor.</p>
    <div class="cert-grid">
        ${certCards}
    </div>
    <p class="cert-note">Certificatele de mai sus sunt documente NAUI care atestă calificarea de instructor pentru cursurile respective. Ele nu reprezintă certificări emise de insuleplutitoare.ro. Brevetele de curs sunt eliberate conform sistemului NAUI, în condițiile aplicabile fiecărui curs.</p>
  </div>
</section>

<section class="section" id="legatura">
  <div class="wrap">
    <p class="section-label">Legătura cu insulele plutitoare</p>
    <h2 class="section-title">De la scufundare la <strong>înțelegerea ecosistemului</strong></h2>
    <div class="prose" style="max-width:46rem;margin-top:1.5rem">
      <p>O insulă plutitoare vegetală nu poate fi înțeleasă doar ca o structură amplasată pe suprafața apei. Sub ea se dezvoltă o zonă de interacțiune între plante, rădăcini, microorganisme, nevertebrate și alte organisme acvatice.</p>
      <p>Pentru a înțelege aceste procese, trebuie mai întâi să învățăm să observăm mediul acvatic.</p>
    </div>
    <div class="chain">${chain}</div>
    <div class="media-band">
      ${gallery}
    </div>
  </div>
</section>

<section class="section" style="background:hsl(var(--card))" id="comparatie">
  <div class="wrap">
    <p class="section-label">Diferențierea cursurilor</p>
    <h2 class="section-title">Ce urmărește <strong>fiecare curs</strong></h2>
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead><tr><th scope="col">Curs</th><th scope="col">Scop</th></tr></thead>
        <tbody>
          ${compareRows.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>
    <div class="compare-cards">
      ${compareRows.map(([a, b]) => `<div class="compare-card"><h4>${esc(a)}</h4><p>${esc(b)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

${enrollForm(null)}`;

  const ld = [
    breadcrumbLd(crumbItems),
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Cursuri de hidrobiologie și scufundări',
      itemListElement: COURSES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.title, url: `${SITE}/cursuri-hidrobiologie/${c.slug}/` }))
    }
  ];

  write('cursuri-hidrobiologie/index.html', page({
    title: 'Cursuri de hidrobiologie și scufundări | Insule Plutitoare',
    description: 'Descoperă cursurile NAUI dedicate scufundărilor, observării vieții subacvatice și citizen science: Scuba Diver, Underwater Naturalist Diver și Citizen Science Diver.',
    canonical: `${SITE}/cursuri-hidrobiologie/`,
    ogImage: '/images/og-insule-plutitoare.jpg',
    jsonld: ld,
    body
  }));
}

/* ----------------------------------------------------------- course page */

function buildCourse(c, idx) {
  const crumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Cursuri de hidrobiologie', url: '/cursuri-hidrobiologie/' },
    { name: c.title, url: `/cursuri-hidrobiologie/${c.slug}/` }
  ];

  const list = arr => `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

  const body = `<section class="course-hero" style="background:linear-gradient(180deg, hsla(152,45%,8%,0.86), hsla(152,40%,14%,0.92)), url('${c.image}') center/cover no-repeat">
  <div class="wrap">
    ${crumbs(crumbItems)}
    <p class="section-label">${esc(c.step)} · ${esc(c.badge.text)}</p>
    <h1>${esc(c.title)}</h1>
    <p class="lead"><strong style="color:hsl(140,50%,72%);font-weight:600">${esc(c.subtitle)}</strong> — ${esc(c.intro)}</p>
    <div class="hero-actions">
      <a class="btn-primary" href="#inscriere">Înscriere</a>
      <a class="btn-outline" href="/cursuri-hidrobiologie/">Toate cursurile</a>
    </div>
    <dl class="hero-facts">
      <div><dt>Durată</dt><dd>${c.duration ? esc(c.duration) : 'De stabilit'}</dd></div>
      <div><dt>Locație</dt><dd>${c.location ? esc(c.location) : 'De stabilit'}</dd></div>
      <div><dt>Preț</dt><dd>${c.price ? esc(c.price) : 'La cerere'}</dd></div>
      <div><dt>Următoarea sesiune</dt><dd>${c.nextSession ? esc(c.nextSession) : 'De stabilit'}</dd></div>
    </dl>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="detail-grid">
      <div class="prose">
        <h2>Despre curs</h2>
        <p>${esc(c.intro)}</p>
        ${c.topics ? `<h3>Teme abordate</h3><ul class="topic-list">${c.topics.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}

        <h2>Cui se adresează</h2>
        ${list(c.audience)}

        <h2>Condiții de participare</h2>
        ${list(c.requirements)}
        ${c.requirementNote ? `<p class="requirement">${esc(c.requirementNote)}</p>` : ''}

        <h2>Obiective</h2>
        ${list(c.objectives)}

        <h2>Module</h2>
        <div class="modules">
          ${c.modules.map((m, i) => `<div class="module"><span class="num">${i + 1}</span><p>${esc(m)}</p></div>`).join('\n          ')}
        </div>

        <h2>Partea teoretică</h2>
        <p>${esc(c.theory)}</p>

        <h2>Partea practică</h2>
        <p>${esc(c.practice)}</p>
      </div>
      <aside class="sidecard">
        <h3>Detalii curs</h3>
        <dl>
          <div><dt>Curs</dt><dd>${esc(c.title)}</dd></div>
          <div><dt>Durată</dt>${val(c.duration)}</div>
          <div><dt>Locație</dt>${val(c.location)}</div>
          <div><dt>Preț</dt>${c.price ? `<dd>${esc(c.price)}</dd>` : '<dd class="tbd">La cerere</dd>'}</div>
          <div><dt>Următoarea sesiune</dt>${val(c.nextSession)}</div>
        </dl>
        <a class="btn-primary" href="#inscriere">Înscriere</a>
      </aside>
    </div>
  </div>
</section>

${enrollForm(c.title)}

<section class="section">
  <div class="wrap">
    <p class="section-label">Întrebări frecvente</p>
    <h2 class="section-title">FAQ — <strong>${esc(c.subtitle)}</strong></h2>
    <div class="faq">
      ${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>`;

  const ld = [
    breadcrumbLd(crumbItems),
    {
      '@context': 'https://schema.org', '@type': 'Course', name: c.title, description: c.intro,
      inLanguage: 'ro-RO', url: `${SITE}/cursuri-hidrobiologie/${c.slug}/`,
      provider: { '@type': 'Organization', name: 'insuleplutitoare.ro', url: SITE }
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    }
  ];

  write(`cursuri-hidrobiologie/${c.slug}/index.html`, page({
    title: c.metaTitle,
    description: c.metaDescription,
    canonical: `${SITE}/cursuri-hidrobiologie/${c.slug}/`,
    ogImage: c.image,
    jsonld: ld,
    body
  }));
}

function write(rel, html) {
  const full = join(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html, 'utf8');
  console.log('scris: ' + rel);
}

buildIndex();
COURSES.forEach(buildCourse);

/* ---------------------------------------------------------------- sitemap */
import { existsSync, readFileSync } from 'node:fs';
const sitemapPath = join(ROOT, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  let xml = readFileSync(sitemapPath, 'utf8');
  xml = xml.replace(/\s*<url>(?:(?!<\/url>)[\s\S])*?<loc>[^<]*\/cursuri-hidrobiologie[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  const urls = [
    { loc: '/cursuri-hidrobiologie/', priority: '0.9' },
    ...COURSES.map(c => ({ loc: `/cursuri-hidrobiologie/${c.slug}/`, priority: '0.8' }))
  ];
  const block = urls.map(u => `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n');
  xml = xml.replace('</urlset>', block + '\n</urlset>');
  writeFileSync(sitemapPath, xml, 'utf8');
  if (existsSync(join(ROOT, 'public', 'sitemap.xml'))) writeFileSync(join(ROOT, 'public', 'sitemap.xml'), xml, 'utf8');
  console.log('sitemap.xml actualizat.');
}

console.log(`Secțiunea cursuri generată: ${COURSES.length} cursuri.`);
