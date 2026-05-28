# Project Portfolio Website (Static)

Sleek, professional portfolio website optimized for space mission operations / spaceflight operations job applications.

## Run locally

- **Option A (simplest)**: open `index.html` in your browser.
- **Option B (recommended)**: serve the folder with a local static server (so the browser gets the right content-types).

If you have Python:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

If you **don’t** have Python (or if your current preview is showing raw HTML as text), use the included Node server:

```bash
node server.mjs
```

Then open `http://127.0.0.1:5173`.

## Customize

- **Your name + headline**: edit `index.html` (Hero section).
- **Email / GitHub / LinkedIn**: update links in `index.html` and `script.js` (search for `you@example.com` and `github.com/your-handle`).
- **Projects**: edit the `PROJECTS` array in `script.js`.
  - Each project supports tags, tech stack, links, highlights, ops considerations, and next improvements.

## Deploy (easy)

- Important: GitHub Pages project sites are hosted under `/<repo>/`. This site uses **relative** asset paths so it works correctly on GitHub Pages.

- **GitHub Pages**:
  - Push this folder to a GitHub repo.
  - In repo settings → Pages → deploy from `main` branch root.
  - Your live URL will look like `https://<user>.github.io/<repo>/` (make sure you’re visiting the Pages URL, not the GitHub file viewer).

- **Netlify / Vercel**:
  - New site → connect repo → build command: *(none)* → publish directory: `/`.

