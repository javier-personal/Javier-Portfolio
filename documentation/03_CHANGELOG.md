# Changelog (newest first)

## 2026-11-19 (round 6: wider spacing on the Resume page)
Base: owner's uploaded `Portfolio_v20261119_5.zip` (source of truth). It equals the round-5 delivery plus owner edits to `HTML/resume.html` and `css/pages.css`, all kept as they are: the "My Resume" glass card (heading and paragraph "Explore my journey in data science...") is back and now holds the toggle and the Open Preview / Download PDF buttons; the preview sits in its own section below it; the Professional description is shortened to "Visually polished for easy reading". `JS/resume.js` is unchanged and still works (it finds everything by id).
Owner request: more space between the Resume page sections, and more space between the Professional / ATS-Friendly toggle and the Open Preview / Download PDF buttons. Nothing else.
- **Section gap:** one shared token `--resume-gap: clamp(2rem, 5vw, 3rem)` (set on `.page-wrap` in `css/pages.css`) now spaces the intro card, the preview, Certifications and Awards & Achievements. `.resume-card` bottom margin uses it; `css/credentials.css` `.cred` top margin reads it (fallback `1rem`, so nothing changes if the token is absent). Measured: was 24 / 16 / 16 px (card to preview / preview to Certifications / Certifications to Awards); now 48 px at 1280px and 32 px at 390px and 320px, equal for all three.
- **Toggle to buttons:** `.resume-actions` top margin `1.1rem` to `clamp(1.5rem, 3vw, 2rem)`. Measured: was 18 px; now 32 px at 1280px and 24 px on phones.
- **To adjust later:** change `--resume-gap` (all section gaps) or the `.resume-actions` `margin-top` in `css/pages.css`.
- **Cache busting:** `pages.css?v=6` and `credentials.css?v=3` on `HTML/resume.html` only.
- **Not changed:** markup, JS, wording, PDFs, other pages, the card's inner spacing, the preview height.
- **Tests:** gap measurements at 1280, 390 and 320px (before and after, with the scroll-reveal offset neutralised) and screenshots; no horizontal overflow. The 50 resume checks were re-run: 47 pass; the 2 "heading + subtitle" checks still look for the old "Resume" title and subtitle that the owner replaced, and the desktop console message is the missing favicon. Toggle, Open Preview, Download (file names and bytes), keyboard, rapid switching and credentials all pass. Not tested: Safari/Firefox/real devices/live site.
**Documentation:** this file, `02`, `04`, `06` (item 29).

## 2026-11-19 (round 5: descriptions inside the format toggle)
Base: owner's uploaded `Portfolio_v20261119_4.zip` (source of truth). It equals the first round-4 delivery plus two owner edits, both kept as they are: the lightbox caption `PROFILE.alt` in `JS/site.js` is now "Javier Tan Wei-En", and `files/Javier Tan Wei En_Resume.pdf` was replaced by the owner (no "Confluence", phone `+65 9147 3081`, 3 pages). Note: `Resume/Javier Tan Wei En_Resume.pdf` is still the older file (it still contains "Confluence"), so the two Professional PDFs are no longer identical; the Resume page uses `files/`.
Owner request: put the short descriptions INSIDE the toggle buttons (instead of beneath them).
- **Wording (owner's):** Professional: "Visually polished, structured for easy reading"; ATS-Friendly: "Design optimised for ATS parsing" (sentence case).
- **Files:** `HTML/resume.html` (each tab now holds `span.format-name` and `span.format-desc`; `pages.css?v=5`, `resume.js?v=5`), `css/pages.css` (two-line segments, 64px minimum height, 520px control; smaller type under 600px; `white-space: nowrap` on the name), `JS/resume.js` (page labels read the option name only).
- **Design:** the white sliding thumb now frames name plus description; selected option in `--purple-deep`, unselected in ink, description slightly lighter and 0.74rem (0.7rem on phones); `text-wrap: balance`. Two lines at 1280px and 390px, three at 320px; "ATS-Friendly" never breaks.
- **To edit the wording:** the two `span.format-desc` lines in `HTML/resume.html`.
- **Tests:** 50 resume checks re-run on this base (Download saves the owner's current `files/` PDFs, byte-identical); layout and screenshots at 1280, 390 and 320px; only console message is the missing favicon. Not tested: Safari/Firefox/real devices/live site.
**Documentation:** this file, `04`, `06` (item 28).

## 2026-11-19 (round 4: Resume Format Selector, profile photo + lightbox)
Base: owner's ZIP `Portfolio_v20261119_3` (source of truth). Only the two requested features were changed; nothing else was edited.
**1. Resume Format Selector** (`HTML/resume.html`, `JS/resume.js`, `css/pages.css`)
- The "My Resume" card, its paragraph and the two old buttons were replaced by: `Resume` title, subtitle "My experience, education, skills & achievements.", a two-option segmented control (**Professional** | **ATS-Friendly**), ONE PDF preview, and two buttons under it (**Open Preview**, **Download PDF**). Certifications and Awards & Achievements are untouched.
- Professional is selected on load. Files: Professional = `files/Javier Tan Wei En_Resume.pdf`, ATS-Friendly = `files/Javier Tan Wei En_Resume_ATS.pdf` (the same two files also sit, byte-identical, in `Resume/`; the page uses `files/`).
- The two paths exist only on the two tab buttons (`data-pdf`, `data-file`). `JS/resume.js` reads them; one function (`select`) sets the preview, Open Preview (`target=_blank`) and Download PDF (`download` = file name) together, so they cannot disagree. Spaces are encoded as `%20`.
- The preview is rendered with the existing pdf.js; each format is rendered once and cached (switching back is instant); a newer selection cancels an older render. The preview area has a bounded height (`clamp(440px, 74vh, 860px)`, 70vh on phones) and scrolls inside itself, so the page does not become long. Tabs follow the ARIA tab pattern (arrow keys, Home/End).
- No-JS / failed preview: Open Preview and Download PDF default to Professional and a one-line message points to them. `data-pdf` was removed from `<body>`.
**2. Profile photo and lightbox** (`JS/site.js`, `css/components.css`)
- The header avatar (shared component, built in `site.js`, so all 19 pages that use it) now shows `images/Main-Page/prof_pic_2.PNG` instead of `assets/profile.svg`. It is a `<button>` (the avatar can no longer be inside the name link) with the same 44px (40px on mobile) circle, white ring and shadow. The landscape photo is cropped by sizing and offsetting the image inside the circle (width 213.2%, left -55.3%, aspect ratio kept) so the face is centred; edit those two values in `.avatar img` to re-frame.
- Click / Enter / Space opens the shared lightbox in single-image mode: full photo at its original aspect ratio (max 92vw x 82vh), blurred dark backdrop, close button, Escape, click outside, subtle fade plus zoom, background scroll locked (`html.lb-open`), focus returns to the avatar. Previous/next buttons are hidden in this mode.
- The animation and scroll lock apply to the profile lightbox only (`.lb-profile`); the existing gallery lightbox behaves as before.
- The name stays a link to `index.html`, exactly as before (see Known Issue 25).
**Cache busting:** `site.js?v=5` and `components.css?v=4` on every page that uses the shared header (19 pages); `pages.css?v=4` and `resume.js?v=4` on the Resume page. `HTML/ocbc-task1.html` (original, byte-identical file) was not touched.
**Not changed:** resume files, resume content, Certifications / Awards, nav, other pages' content, `assets/profile.svg` (kept, now unused).
**Tests (Playwright / Chrome, over http):** 50 resume checks at 1280px and 390px (DPR 2, touch) and 497 avatar/lightbox checks on all 19 pages at both sizes; see `02_PROJECT_STATUS.md`.
**Documentation:** this file, `02`, `04`, `05`, `06`, `07`, `README.md`; project doc `documentations/resume-format-selector.md`.

## 2026-11-19 (round 3: ZIP `Portfolio_v20261119_2`, owner's six requests)
Base: owner's ZIP `Portfolio_v20261119_2` (source of truth). Compared with the previous delivery it only differed by the owner's static sixth Photography tile in `index.html` (+ `images/Main-Page/photography.jpeg` and `.HEIC`) and a `.vscode` port; all kept.
1. **Jump chips removed** (`HTML/resume.html`, `css/credentials.css`, `JS/site.js` motion selector). The section ids `#certifications` and `#awards` stay.
2. **Year pills** under Awards & Achievements now use the same colours as the Certifications issuer pills (`--lilac` background, `--purple-deep` text, no border) (`css/credentials.css`).
3. **Work Experience Timeline** (`index.html`, `css/home.css`) now covers every role on the resume, oldest first: Shopee 2021; Promoter 2021 - 2022; Ce La Vi 2022 - 2023 (Bartender/Bar Assistant & Service Crew, one entry because both roles share company and dates); The Elephant Room 2024 - 2025; OCBC 2025 - 2026. Each description is under six words and comes from the resume. Layout: five columns above 1000px (was three), vertical rail at 1000px and below.
4. **Documentation slots for every certificate and award:** each card has a stable id (`cert-...`, `award-...`); in-page comment points to the new `documentation/09_CREDENTIALS.md` (register, privacy note, how to add the future "View" button). No images, "View" buttons or invented details yet. `JS/site.js` lightbox fix: images with no `data-lightbox-group` wrapper were ignored (the lightbox never opened for them); they now form the page-level set. Tested on a throwaway copy with two placeholder buttons.
5. **Reflection JS error** (`JS/ocbc.js`): the Reflection book code now runs only if `#book` exists. The section stays in your HTML comment; remove the comment markers and the book works again, with no JS change (tested on a copy: 9 entries, dialog opens and closes). Template `tools/templates/ocbc-intern.html` and page both load `ocbc.js?v=4`. Your comment markers were not touched.
6. **Audit:** see `06_KNOWN_ISSUES.md` items 19-22 and `02_PROJECT_STATUS.md`.
Cache-busting versions: `home.css?v=5`, `credentials.css?v=2`, `ocbc.js?v=4`. `site.js` keeps its existing `?v=` values (its changes only affect future buttons); bump them if you want returning visitors to get the lightbox fix at once.
Build: `node tools/build.js` reports 15 of 15 MATCH; `tools/build-lock.json` refreshed (`--lock`).
**Documentation:** this file, `02`, `04`, `05`, `06`, `07`, new `09_CREDENTIALS.md`, `README.md`.

## 2026-11-19 (follow-up: corrections, approved designs, build safety)
Base: owner's ZIP `Portfolio_v20261119` (source of truth). Owner edits since the previous delivery were kept and not re-applied: DVA contribution rewritten by the owner (replacing the earlier sentence) and caption "K-Means Clustering (2/2) & Dashboard Analytics"; intern card text "Developed automated data pipelines and Power BI dashboards..." and title "OCBC Ignite 2025/2026"; hackathon caption "OCBC Ignite Hackathon 2024" (alt text updated by the owner too); Personal Finance Tracker tag "PostgreSQL"; Projects page finance card without the "Built with Next.js..." sentence; third Front-End Development image; `.vscode` port 5502; settlement PDF removed (not tracked here).
**Corrections**
- `index.html`: "Internship at OCBC" card now uses the approved wording (single paragraph; the longer version stays on `ocbc-intern.html`). "Control M" removed from the skills strip.
- `HTML/personal-finance-tracker.html`: `<meta name="description">` is now "A full-stack personal finance application built with Next.js, React and Supabase, featuring expense tracking, budgeting, savings management and an analytics dashboard." Page text untouched.
- `HTML/ocbc-task1.html`: removed the Cloudera documentation link (it sat inside an HTML comment, so it was not visible). Control-M kept in Task 1 and Task 3. CRLF preserved.
- `HTML/full-stack-web-development.html`: image counter corrected from "6 images" to "7 images" (the owner added a seventh image).
- Verified unchanged: title "OCBC Ignite 2025/2026", hackathon caption, Data Visualization gallery.
**Designs (from the approved canvas "Portfolio Design Proposals (for review)")**
- Certifications and Awards & Achievements on `HTML/resume.html`, below the PDF viewer, with two jump chips; new `css/credentials.css`. Navbar unchanged. Only resume facts are shown (no placeholders for dates, IDs or links). Disciplinary Minds uses the resume's own wording.
- `index.html`: one Shopee sentence added to Work Experiences; new "Work Experience Timeline" block immediately below it (Shopee 2021, Ce La Vi 2022 - 2023, The Elephant Room 2024 - 2025); styles in `css/home.css`. Promoter left out per the approved proposal.
- `index.html`: Photography sentence added to "A Little More About Me". `JS/photography.js` adds a sixth tile that opens only the listed photos in the lightbox; the list is empty, so no tile shows yet.
- `JS/site.js`: lightbox treats a nested `[data-lightbox-group]` as its own group; scroll reveals extended to the new blocks. `index.html` and `resume.html` load `site.js?v=4`; `home.css?v=4`; `credentials.css?v=1`.
**Build system** (details in `08_BUILD_SYSTEM.md`): `tools/build.js` is check-only by default, writes only NEW/UPDATE pages with `--write`, protects hand-edited pages, backs up overwrites; `tools/build-lock.json` added; `data/projects.json` and `tools/templates/ocbc-intern.html` reconciled to the HTML; Personal Finance Tracker marked hand-maintained; `package.json` scripts `build` and `build:check`; `.prettierignore` updated.
**Documentation:** this file, `02`, `04`, `05`, `06`, `07`, new `08_BUILD_SYSTEM.md`, `README.md`.

## 2026-11-19 (approved content consistency pass)
Edited the committed pages directly (see Known Issue 13: several generated pages carry owner hand edits that `tools/build.js` would overwrite) and mirrored the same text in the source where it drives the page. Line endings preserved (Task pages use CRLF).
- **A. Hackathon** (`HTML/data-storytelling-hackathon-school.html`, `data/projects.json` `pageSummary`): added "Secured third place in a polytechnic-wide hackathon, competing as part of a five-member team against approximately 170 students." to the hero summary. Third place retained.
- **B1. Intern page card** (`HTML/internship.html`, `tools/build.js`): the OCBC card text was a copy of the Data Science Essentials blurb ("Built a predictive analytics pipeline with Python libraries..."). Replaced with "Contributed to data engineering and analytics initiatives, developing automated data pipelines and Power BI dashboards to support reporting across multiple departments." Title "OCBC ignite 2025/2026" unchanged.
- **B2. About My Internship** (`HTML/ocbc-intern.html`, `tools/templates/ocbc-intern.html`): same two paragraphs; added that the owner personally developed three Power BI dashboards and contributed to a team that delivered 15+ dashboards across 10+ departments (audiences approximately 50-500 people per dashboard), built automated Hadoop data pipelines for T-1 reporting and automated approximately 90% of manual ad hoc, daily and weekly reporting workflows.
- **F. T-1 context** (`HTML/ocbc-intern.html` + template card "Data Pipeline Development": "...ingestion, supporting T-1 reporting"; `HTML/ocbc-task1.html` diagram caption: "...of the data pipelines built for T-1 reporting."). No new section.
- **C. Databases** (`HTML/personal-finance-tracker.html`): added tag "PostgreSQL (via Supabase)". Full-Stack Web Development and Data Warehouse tag lists already say MySQL and were not changed. PostgreSQL appears only on the Personal Finance Tracker.
- **D. Personal Finance Tracker card** (`HTML/projects.html`, `data/projects.json` `cardSummary`): there is no such card on `index.html`; the only card is on the Projects page. Now "Full-stack personal finance application featuring expense tracking, budgeting, savings management and an analytics dashboard. Built with Next.js, React and Supabase (PostgreSQL)."
- **E. Data Visualization & Analytics** (`HTML/data-visualization-analytics.html`, `data/projects.json` `contribution`): added the customer satisfaction prediction work, using only documented facts (food delivery data; Rule Engine and Category To Number; training/test partition; linear regression predicting customer ratings for restaurants; Numeric Scorer on both sets; residuals visualised in Power BI). No new metrics. Existing R-squared 0.823 and MAE 0.116 untouched.
- Not changed: `index.html`, CSS, JS, images, resume files, `files/resume.pdf`, deployment settings.

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
