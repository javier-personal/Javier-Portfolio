# Changelog (newest first)

## 2026-11-07 (Task 3 dashboard revamp)
- `HTML/ocbc-task3.html` rebuilt as the "DevOps & Project Delivery" dashboard from the owner's written spec (the reference image was not attached): header, 2x2 KPI cards, 01 workflow (4 numbered stages, no connectors), 02 Gantt timeline drawn by JS from the previous sprint tracker's tasks and Jul 1-9 dates ("Deployment" and "Bug QA" stay "Pending", no dates invented), 03 Tools Used (Confluence, Jira) vs Tools Learned (Jenkins, Bitbucket, Control-M, Power BI), Key Takeaway. Logos open in the enlarge modal. Back link kept. Fully responsive; Gantt scrolls sideways inside its card on phones.
- Removed outdated sections: task ownership table, gap analysis, proposed workflow, Jenkins/Bitbucket/Confluence text cards, Jira + Infinity checklist and carousel, Agile image. Their previous version is `_original-pages/HTML/ocbc-task3.before-dashboard-revamp.html`.
- No other file changed. No animations added (OCBC exclusion).

## 2026-11-07 (website revamp + OCBC recruiter content)
- **Animations:** `css/components.css` (motion system, header drop-in, hover, to-top spring, gold text) and `JS/site.js` (tags elements from a selector map, toggles `.in-view` with IntersectionObserver so reveals replay on scroll, refresh, filter changes; a bfcache-restore re-observe is implemented but untested). `css/home.css`: decorative photo panels float gently. Disabled by `prefers-reduced-motion` and by `<body data-motion="off">` (set on `ocbc-intern.html` via its template). Old unused `.reveal` code removed.
- **Gold text:** `.gold-text .gold-soft` (Temasek Polytechnic: `index.html`, hackathon page, hackathon card) and `.gold-strong` (third place). `tools/build.js` `rich()` wraps the phrases automatically.
- **Projects cards:** new `cardSummary` per project in `data/projects.json`; originals kept in `summary` / `pageSummary` so project pages are unchanged.
- **Source text removed** from project pages (`source-note` markup and CSS deleted; `result.source` renamed `result.alt`, still used as image alt text).
- **Hand edits recovered:** the shipped HTML had owner edits not in the JSON (hackathon "Temasek Polytechnic"/"third place" text, IDL page text and tools, DAVA gallery, DAEC result text, "revamped" images, shorter card titles). They were copied into the JSON (`pageSummary`, `heading`, `cardTitle`, gallery/image paths) so rebuilds keep them. The IDL page also had an unclosed `<p>`, fixed by the rebuild.
- **OCBC:** `data/reflections.json` rewritten (13 entries to 9; tab labels Data Pipeline / Dashboards / DevOps; originals in `_original-pages/data/`). `tools/templates/ocbc-intern.html`: cards renamed, `data-motion="off"`. `HTML/ocbc-task1..3.html` rewritten (Overview with objective, contributions, tools, outcome; condensed phases; same layouts, scripts and images; originals in `_original-pages/HTML/`). Task 1 gained `<meta charset="UTF-8">` (arrow and Chinese label were garbled). Task 1 "Data Testing" slides 2 and 3 merged (6 to 5 slides, all images kept).
- Cache-busting bumped to `?v=3`.

## 2026-11-06 (follow-up)
- `css/components.css`: nav bar restyled to match owner's reference (pill container, no dividers, white active pill; dark-hero variant keeps white active pill). Added `.project > .back-link { margin-bottom: 1.5rem }`.
- Added `docs/` (7 files) and mirrored them to Claude Project Files.

## 2026-11-06
- Fixed owner's `Portfolio 2`: restored full CSS (base + components + pages + home + ocbc), added `components.css` link to all pages, regenerated generated pages, removed orbs from `index.html`, `resume.html` and `contact.html` now load `components.css`.
- Owner edits preserved: `index.html` intro/expertise text, `prof_pic.jpeg`, `censored-dashboard.png`, extra tool chips (Tailwind, Bootstrap, TypeScript), shorter stat labels (source lines removed), Hong Kong photo swap; `ocbc-intern.html` shortened hero text, `ocbc-logo-2.png` image, Back button removed; `ocbc.css` hero image `object-fit: contain`.
- Template `tools/templates/ocbc-intern.html` updated with the owner's edits so rebuilds do not revert them.

## Earlier builds
- Round 1-2: preview-only redesign, JSON data + reusable components, step-by-step slides removed, 77.3% DSES result confirmed.
- Round 3: glass direction, profile photo in header, editorial homepage, original 3D cards and reflection book preserved.
- Build 2-3: shared glass components, unified footer, to-top, internship card centred, consistent Prettier formatting, cache-busting `?v=2`.
