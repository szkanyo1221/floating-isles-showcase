

## Plan: Convert to Plain HTML/CSS/JavaScript

Replace the entire React/TypeScript/Tailwind project with a single `index.html` file containing all HTML, embedded CSS, and vanilla JavaScript — preserving the exact same design, layout, colors, animations, and functionality.

### What will be built

A standalone `index.html` file that replicates the current site:

- **CSS**: All Tailwind utility classes converted to equivalent plain CSS, using the same HSL color variables, Inter font, responsive breakpoints, and animations (scroll fade-in, bounce arrow)
- **HTML**: Same semantic structure — sticky header, hero text, video embed, "Ce Facem" section with icon cards, "De Ce Noi" benefits cards, contact CTA, footer with social links
- **JavaScript**: Vanilla JS for scroll shadow on header, mobile menu toggle, and IntersectionObserver scroll animations
- **Icons**: Replace Lucide React components with inline SVGs (phone, mail, leaf, waves, tree, droplets, menu, x, instagram, facebook, arrow-down)
- **Logo**: Still references `/images/logo.png` (the existing file stays)

### Files changed

1. **`index.html`** — Rewrite with full inline `<style>` and `<script>`, all HTML content, SVG icons, responsive design via media queries
2. **Delete** all `src/` files, `tailwind.config.ts`, `postcss.config.js`, `vite.config.ts`, `tsconfig*.json`, `components.json`, `package.json`, `bun.lock*`, `package-lock.json`, `eslint.config.js`, `.lovable/`, `vitest.config.ts` — none are needed for a static HTML site

### Technical details

- CSS custom properties (`:root`) map directly from the current HSL values
- Media queries at 640px, 768px, 1024px replicate the sm/md/lg breakpoints
- `@keyframes fade-in-up` and `@keyframes bounce` for animations
- IntersectionObserver with 0.15 threshold for section reveal
- YouTube embed with same autoplay/loop parameters
- All `tel:` and `mailto:` links preserved

