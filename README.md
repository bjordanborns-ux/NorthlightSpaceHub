# Project Portfolio Website (Static)

Sleek, professional portfolio website optimized for space mission operations / spaceflight operations job applications.

## Run locally

- **Option A (simplest)**: open `index.html` in your browser.
- **Option B (recommended)**: serve the folder with a local static server.

If you have Python:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Customize

- **Your name + headline**: edit `index.html` (Hero section).
- **Email / GitHub / LinkedIn**: update links in `index.html` and `script.js` (search for `you@example.com` and `github.com/your-handle`).
- **Projects**: edit the `PROJECTS` array in `script.js`.
  - Each project supports tags, tech stack, links, highlights, ops considerations, and next improvements.

## Deploy (easy)

- **GitHub Pages**:
  - Push this folder to a GitHub repo.
  - In repo settings → Pages → deploy from `main` branch root.

- **Netlify / Vercel**:
  - New site → connect repo → build command: *(none)* → publish directory: `/`.

