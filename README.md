# Javier Tan portfolio: updated static site

Plain HTML/CSS/JS. No framework, no server needed (open `index.html` or host the folder anywhere).

> **The HTML pages are the source of truth.** `node tools/build.js` only checks and reports; `--write` never overwrites a hand-edited page. Read `documentation/08_BUILD_SYSTEM.md` before using it.

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
assets/ profile.svg     former temporary avatar (unused; the header now uses images/Main-Page/prof_pic_2.PNG)
vendor/ pdfjs/          Mozilla pdf.js (resume preview)
images/ files/ Resume/  original assets, untouched
tools/  build.js (safe generator: check-only by default) + templates/ + build-lock.json
.prettierrc.json  package.json   one formatting style for all code (npm run build = generate + format)
_original-pages/        your original versions of every page that was rebuilt (for rollback; not for deployment)
PRESERVATION.md         OCBC preservation record with checksums
```

## Everyday edits

- **Profile picture / name:** edit `PROFILE` at the top of `JS/site.js` (one place, every page updates). The header avatar is a circular crop of `images/Main-Page/prof_pic_2.PNG`; clicking it opens the full photo in the lightbox. To re-frame the crop, edit `.avatar img` (`left`, `width`) in `css/components.css`.
- **Resume page formats:** the two PDF paths are on the two tab buttons in `HTML/resume.html` (`data-pdf`, `data-file`): Professional = `files/Javier Tan Wei En_Resume.pdf`, ATS-Friendly = `files/Javier Tan Wei En_Resume_ATS.pdf`. Replace a PDF by overwriting the file; keep the names or update the button.
- **Project text, tools, results, images:** edit the page in `HTML/` directly (it is the source of truth). To generate a NEW page, add it to `data/projects.json`, run `node tools/build.js` to review and then `node tools/build.js --write` (Node 18+). Hand-edited pages are protected, and `personal-finance-tracker.html` is hand-maintained.
- **Reflections:** edit `data/reflections.json`, then review with `node tools/build.js` and apply with `--write` (the OCBC page is protected if you have edited it by hand).
- **Resume page credentials:** edit `HTML/resume.html` (Certifications and Awards & Achievements sections). Every card has an id; the register and the plan for the future "View" (lightbox) button are in `documentation/09_CREDENTIALS.md`.
- **Reflection section (OCBC page):** hidden on purpose inside an HTML comment in `HTML/ocbc-intern.html` (and `tools/templates/ocbc-intern.html`). To bring it back, delete the line `<!-- Hidden for now not needed for hiring purposes` and the matching `-->` after `</div>` near the footer. `JS/ocbc.js` already copes with it being hidden or visible.
- **Homepage Photography tile:** it is a static tile in `index.html` (`images/Main-Page/photography.jpeg`). `JS/photography.js` is inactive (empty list); do not add the same photo to it or the tile will appear twice.
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
