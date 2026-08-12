Fix GitHub Pages asset deployment for gallery and SEO files

Current state
- The latest site changes are committed locally (commit `2a93b4b Added gallery + lightbox`).
- The remote `main` branch on GitHub has the same `index.html`, so the code itself is synced.
- The live site (`https://www.insuleplutitoare.ro`) is served by GitHub Pages from the repository root.
- The gallery images, Open Graph image, `sitemap.xml`, and `robots.txt` are currently inside the `public/` folder, which Vite/Lovable uses locally but GitHub Pages does not serve from the root. Live checks already return 404 for `/images/gallery/*.webp` and `/images/og-insule-plutitoare.jpg`.

Plan
1. Copy all optimized gallery WebP images from `public/images/gallery/` to `images/gallery/` at the repository root.
2. Copy `public/images/og-insule-plutitoare.jpg` to `images/og-insule-plutitoare.jpg` at the repository root.
3. Copy `public/robots.txt` to `robots.txt` at the repository root and ensure its sitemap URL points to `/sitemap.xml`.
4. Copy `public/sitemap.xml` to `sitemap.xml` at the repository root so it is reachable at `/sitemap.xml`.
5. Keep the `public/` copies intact so Lovable's local preview and any future build pipeline continue to work.
6. Once the changes are committed and synced to GitHub, verify that the live URLs return 200 for:
   - `https://www.insuleplutitoare.ro/images/gallery/insula-plutitoare-baraj-flori-salicaria-1600.webp`
   - `https://www.insuleplutitoare.ro/images/og-insule-plutitoare.jpg`
   - `https://www.insuleplutitoare.ro/sitemap.xml`

Technical details
- GitHub Pages serves the repository root; it does not automatically use a `public/` folder like Vite does.
- `index.html` already uses root-relative paths (`/images/...`), so no HTML changes are needed.
- The extra README commit on the remote (`dbd76ce`) is unrelated to the site and will not be touched.

Expected outcome
- The live site will display the gallery and hero images correctly.
- The Open Graph / Twitter preview image will load.
- The sitemap and robots.txt will be accessible at the root, and the broken live URLs will return 200.
