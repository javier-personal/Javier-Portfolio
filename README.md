# Javier Tan portfolio: updated static site

Plain HTML/CSS/JS. No framework, no server needed (open `index.html` or host the folder anywhere).

> **HOLD: do not deploy yet.** `images/Intern/Settlement Agreement NYSS (Template)_JAVIER_CNX15311.pdf` would become publicly downloadable. See `PRESERVATION.md`. Deployment needs the owner's explicit approval.

## Structure

```
index.html                  new homepage (six sections)
HTML/                       contact, resume, projects, internship, ocbc-intern, 13 project pages (rebuilt)
                            ocbc-task1-3, test, test2, test3, format, saved-codes, project_template: UNCHANGED
css/    base.css (tokens, background, glass)  components.css (header, buttons, footer, to-top, lightbox)
        pages.css  home.css  ocbc.css
JS/     site.js (shared header + brand, lightbox, to-top)  filters.js  ocbc.js  resume.js
        script.js (original, still used by the unchanged pages)
data/   projects.json (all project info)  reflections.json (reflection book)
assets/ profile.svg     temporary profile picture
vendor/ pdfjs/          Mozilla pdf.js (resume preview)
images/ files/ Resume/  original assets, untouched
tools/  build.js + templates/   regenerates the project pages from data/*.json
.prettierrc.json  package.json   one formatting style for all code (npm run build = generate + format)
_original-pages/        your original versions of every page that was rebuilt (for rollback; not for deployment)
PRESERVATION.md         OCBC preservation record with checksums
```

## Everyday edits

- **Profile picture / name:** edit `PROFILE` at the top of `JS/site.js` (one place, every page updates). Put your photo in `assets/`.
- **Project text, tools, results, images:** edit `data/projects.json`, then run `node tools/build.js` (Node 18+; no packages needed). Output is plain HTML.
- **Reflections:** edit `data/reflections.json`, then run `node tools/build.js`.
- **Homepage text/photos:** edit `index.html` directly.
- **Code style:** all CSS, JS, JSON and rebuilt HTML are formatted with Prettier using `.prettierrc.json` (`npm install` then `npm run format`). Original untouched files are listed in `.prettierignore` and are never reformatted.
- **After changing any CSS/JS:** bump `?v=2` in the page links (in `tools/build.js` and `index.html`) so browsers do not serve an old cached copy.

## Checks run (all passed)

- 19 rebuilt pages × 4 widths (re-run after the latest fixes) (390, 820, 1280, 1920 px): no console errors, no failed requests, no horizontal overflow.
- 337 internal links/assets resolve; every image referenced by `projects.json` exists.
- Every page has one `h1`, a title, a description, `lang`, alt text on images, named buttons/links, no duplicate ids; touch targets ≥ 24 px on mobile.
- Interactions (desktop and mobile): nav drawer, Home → Intern → internship.html → ocbc-intern.html, 3D carousel rotation and task links, reflection book open/filter/dialog, project filters (13 / 10 recent / 1 mini, matching your original rule), lightbox open/Esc, resume inline preview (3 pages) and download of `resume.pdf`, contact mailto/tel, counters (13+, 1+ yr, 10+, 3+) and section order.
- 205 original files compared by SHA-256: 186 identical, 19 intentionally rebuilt pages, 0 missing.

Not done: automated contrast tooling (no network for axe) and real-device testing; contrast was designed to pass (dark ink on near-opaque glass) but not machine-audited.

## Round-4 fixes (this version)

Glass buttons, back links, footer and scroll-to-top are defined once in `css/components.css` and used identically on every page (OCBC page now uses the same footer). The decorative purple glow shapes were removed from the homepage, the single internship card is centred, dead homepage CSS was removed from `pages.css`, inline styles were replaced by classes, all code is formatted by Prettier, and every CSS/JS link carries `?v=2` so browsers cannot serve an older cached copy. If you still see unstyled elements after updating, do a hard refresh (Ctrl/Cmd+Shift+R).
