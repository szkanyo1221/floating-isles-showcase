## Plan: Remove the logo background (without modifying the original logo)

The current logo (`public/images/logo.png`) has a solid white/cream square baked into the image. Because it's a flattened PNG, the background can't be made transparent purely with CSS — the pixels themselves need to be removed. To respect the requirement of "not modifying the logo itself", we'll keep `logo.png` untouched and create a new transparent-background version alongside it.

### Steps

1. **Generate a transparent version of the logo**
   - Use the Lovable AI image edit endpoint (Nano banana) with `public/images/logo.png` as input and the instruction: "Remove the background completely so it is fully transparent. Keep the logo artwork (icon + text) exactly as-is — same colors, shapes, proportions, and details. Output PNG with alpha channel."
   - Save the result as `public/images/logo-transparent.png`. The original `logo.png` is left unchanged.

2. **Update `index.html`**
   - Replace the two `<img src="/images/logo.png" ...>` references (header + footer) with `/images/logo-transparent.png`.
   - No CSS or layout changes needed — the header and footer already have a light background so the transparent logo will blend in cleanly.

3. **Quick QA**
   - Visually verify the new logo has a clean transparent background and the artwork is visually identical to the original.
   - If the AI output has any artifacts or alters the logo, re-run with a stricter prompt or fall back to a deterministic background-removal approach (e.g. flood-fill the near-white pixels to transparent with a small Python/Pillow script) and save again as `logo-transparent.png`.

### Files touched
- **Added:** `public/images/logo-transparent.png`
- **Edited:** `index.html` (two `src` attributes)
- **Untouched:** `public/images/logo.png` (original preserved)
