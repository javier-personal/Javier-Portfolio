# Project Instructions: Javier Tan Portfolio

Read this file first in every new session, then `02_PROJECT_STATUS.md`, `05_TASKS.md` and `06_KNOWN_ISSUES.md`.

## What this is
A static HTML/CSS/JS portfolio for Javier Tan (Big Data & Analytics, Temasek Polytechnic; OCBC intern Mar 2025 – Mar 2026). No framework. Node is used only by `tools/build.js` to generate pages from `data/*.json`.

## Standing rules (from the owner)
1. **Confidential OCBC content:** do not publish, expose or modify the OCBC internal screenshots, the settlement agreement PDF, or the resume until the owner has reviewed them. Keep existing files and flag anything needing approval.
2. **Unapproved content:** preserve existing content and ask before changing it.
3. **Owner edits are intentional:** descriptions and removed elements edited by the owner must never be reverted (see `03_CHANGELOG.md` and `PRESERVATION.md`).
4. **Intern route stays:** nav "Intern" -> `HTML/internship.html` -> `HTML/ocbc-intern.html` -> `HTML/ocbc-task1..3.html`.
5. **Do not touch** the six unlinked pages (`test`, `test2`, `test3`, `format`, `saved-codes`, `project_template`), `JS/script.js`, `vendor/`, `images/`, `files/`, `Resume/`, `_original-pages/`. The OCBC task pages (`ocbc-task1..3.html`) were rewritten at the owner's request on 2026-11-07; the pre-rewrite originals are in `_original-pages/HTML/`. Edit them by hand (they are not generated and are in `.prettierignore`; keep CRLF line endings).
6. **No deployment** without explicit approval. The settlement agreement is a public-access risk.
7. **No new animations on the OCBC Internship pages** (`ocbc-intern.html`, `ocbc-task1..3.html`). **Palette is exact, no pink.** Glassmorphism design language. Do not invent data; use documented results only.
8. Do not claim something works unless it was verified. Be efficient with usage.

## Design system
- Tokens in `css/base.css` (`--purple`, `--purple-deep`, `--ink`, `--glass`, `--glass-strong`, `--glass-border`, `--blur`, shadows).
- Shared components in `css/components.css`: header, nav, drawer, `.btn` (purple glass), `.btn-glass` (white glass), `.back-link`, `.site-footer`, `.to-top`, lightbox, toast.
- Page CSS: `pages.css`, `home.css`, `ocbc.css`. Load order: base, components, page CSS. Links carry `?v=3` (bump `V` in `tools/build.js` and the hand-written pages on CSS/JS changes).

## Workflow
- Project data fields (`data/projects.json`): `summary` (meta description and default hero text), `pageSummary` (hero text override), `cardSummary` (short text on the Projects card), `cardTitle` / `heading` (title overrides), `detail.result.alt` (image alt text; there is no visible Source text). Hand edits made directly in generated HTML are lost on rebuild, so copy them into the JSON first.
- Edit `data/*.json` or `tools/build.js` / `tools/templates/` for generated pages, then `node tools/build.js` and `npm run format` (Prettier 3, `.prettierrc.json`). Hand-written pages: `index.html`, `HTML/resume.html`, `HTML/contact.html`, `HTML/internship.html` is generated.
- Never run Prettier on files in `.prettierignore`.
- Verify with Playwright (Chromium) at 390px and 1440px: styles, no overflow, links, console errors.
- Deliver only the files that changed when the owner asks for a small fix, plus any updated docs.

## Documentation upkeep
After every meaningful change update the relevant file only: `02` status, `03` changelog, `04` decisions, `05` tasks, `06` issues, `07` structure. Keep the copy in `documentation/` (inside the project/ZIP) and the copy in Claude Project Files (`docs/`) in sync.
