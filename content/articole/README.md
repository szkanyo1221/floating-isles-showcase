# Cum publici un articol pe blog

1. Copiază `_sablon-articol.md.example` într-un fișier nou: `content/articole/numele-articolului.md`.
2. Completează câmpurile din antet (frontmatter) și scrie conținutul în Markdown.
3. Pune `status: published` (sau `draft` ca să nu apară pe site).
4. Rulează `npm run blog` — se regenerează `/blog/`, paginile de categorie, articolele și sitemap.xml.
5. Sincronizează cu GitHub pentru publicare.

## Câmpuri disponibile
title, slug, excerpt, category (slug din content/blog.config.json), tags, author,
date, updated, image, imageAlt, seoTitle, seoDescription, ogImage, keywords,
featured (true/false), status (published/draft).

## Imagini
Pune imaginile în `images/blog/` cu nume descriptive, în română, fără diacritice
(ex: `insula-plutitoare-lac-biodiversitate.webp`). Folosește format WebP.

## Categorii
Se editează în `content/blog.config.json` (secțiunea `categories`). Poți adăuga
oricâte categorii noi; paginile se generează automat.
