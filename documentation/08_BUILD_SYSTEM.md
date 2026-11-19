# Build system and source of truth

_Added 2026-11-19. Read this before running `node tools/build.js`._

## Rule
**The HTML pages in this folder are the source of truth.** The page you see when you open `index.html` (and every other page) is the version to preserve. `data/projects.json`, `tools/build.js` and `tools/templates/` are secondary: they exist to scaffold pages, and they have been reconciled to the HTML (2026-11-19).

## What was wrong
`tools/build.js` used to write 16 pages (`projects.html`, `internship.html`, `ocbc-intern.html` and the project pages) every time it ran, with no check. You had hand-edited several of them (Personal Finance Tracker journey page, hackathon gold spans and caption, "Personal Projects" chip, "Analytical Dashboards" card, a third Front-End image, the intern card text) without copying the edits into the JSON or template, so a rebuild would have reverted them. Verified on a scratch copy of the ZIP: the old generator changed 16 files.

## What it does now
| Command | Effect |
|---|---|
| `node tools/build.js` (or `npm run build:check`) | **Check only. Writes nothing.** Prints one line per page: MATCH, NEW, UPDATE, PROTECTED or HAND-MADE, with the first difference for any page that differs. |
| `node tools/build.js --write` (or `npm run build`) | Writes only NEW pages and UPDATE pages. PROTECTED pages are skipped (exit code 2). Every overwritten file is first copied to `_build-backups/<timestamp>/`. Output is formatted with Prettier when it is installed. |
| `node tools/build.js --write --force HTML/page.html` | Overwrites one PROTECTED page on purpose (a backup is made). |
| `node tools/build.js --lock` | Records the current pages as the baseline without writing any HTML. |

Statuses:
- **MATCH**: the generated page equals the page on disk (whitespace, `&amp;` vs `&`, self-closing slashes and the doctype case are ignored; JSON data blocks are compared as parsed JSON). Nothing to do.
- **NEW**: the file does not exist yet.
- **UPDATE**: differs, but the file is byte-identical to the baseline in `tools/build-lock.json`, so nobody has edited it by hand since it last matched. Safe to regenerate.
- **PROTECTED**: differs and the file was changed since the baseline (or has no baseline). A hand edit would be lost, so it is never written without `--force`.
- **HAND-MADE**: marked `"pageSource": "html"` in `data/projects.json`. Never generated. Currently `personal-finance-tracker.html`.

The generator can only write inside `HTML/` and only the pages it generates. It never touches `index.html`, `resume.html`, `contact.html`, the OCBC Task pages, CSS, JS, images or the resume files.

## Workflows
- **Edit an existing page:** edit the HTML. Nothing else is required. A later `build` will report that page as PROTECTED (not overwrite it). To keep the JSON in step, copy the change into `data/projects.json`; once the generated page equals the HTML it shows MATCH, and `--lock`/`--write` refresh the baseline automatically.
- **Add a new project:** add an entry to `data/projects.json`, run `node tools/build.js` to review, then `--write`. The new page is created and `projects.html` is listed as UPDATE (safe) because it has not been hand-edited. If you have hand-edited `projects.html`, it shows PROTECTED: add the matching change to the JSON (or use `--force` after reading the diff).
- **Page cannot be expressed as data** (custom markup or CSS): set `"pageSource": "html"` on its JSON entry. Its card on the Projects page still comes from `cardTitle`/`cardSummary`.
- **Highlighted text** the generator cannot produce (gold spans): use `pageSummaryHtml` / `cardSummaryHtml` (raw HTML) in the JSON entry. A gallery item can have its own `alt` and `label` (aria-label) when they differ from the caption.

## Reconciliation done 2026-11-19
- `data/projects.json`: Personal Finance Tracker marked hand-maintained (its stale Excel/Tableau `detail` removed; the page and card now describe the full-stack app); hackathon raw-HTML summary/card, caption "OCBC Ignite Hackathon 2024"; Data Visualization & Analytics contribution and caption "K-Means Clustering (2/2) & Dashboard Analytics"; Full-Stack gallery now has the third Front-End image (captions 1/3, 2/3, 3/3).
- `tools/build.js`: chip "Personal Projects", intern card "OCBC Ignite 2025/2026" with the owner's text; safety layer added.
- `tools/templates/ocbc-intern.html`: card "Analytical Dashboards"; Reflection section commented out as "Hidden for now not needed for hiring purposes" (as on the page).
- `HTML/full-stack-web-development.html`: the image counter said "6 images" for 7 images; corrected to "7 images" (the only HTML change made for reconciliation).
- Result: all 15 generated pages report MATCH; `tools/build-lock.json` holds their baseline.

## Tests run (copies of the ZIP, not the real tree)
1. `--write` on a fully matching tree: 0 files written, HTML identical.
2. Hand edit to a generated page, then `--write`: PROTECTED, file untouched, exit code 2.
3. Change only the JSON for an untouched page: reported as UPDATE in check mode; `--write` regenerates it and stores a backup.
4. `--write --force` on the protected page: overwritten, original saved in `_build-backups/`.
5. New generator against the original (stale) data and templates with no baseline: 10 MATCH, 6 PROTECTED, 0 files written (the old generator changed 16).

## Limits (read these)
- A stale `data/projects.json` cannot be told apart from an intentional JSON edit if the HTML page has not been touched since its baseline: such a page shows UPDATE. That is why the default is check-only, `--write` backs up every overwrite, and you should read the check output first.
- The comparison ignores whitespace, so it will not report whitespace-only differences.
- Prettier must be installed (`npm install`) for formatted output; without it pages are written unformatted and a warning is printed. `HTML/ocbc-intern.html` and its template are never formatted: the owner's comment wrapper around the Reflection section also wraps the closing `</main></div>` tags, which Prettier cannot parse (browsers cope). Both are listed in `.prettierignore`. Closing that comment before the `</main>` would be the clean fix; it was left as is because the page is the source of truth.
- `npm run format` is separate from the build and only reformats whitespace. It is not part of `npm run build` any more.
- `_build-backups/` should not be committed (`.gitignore` in this ZIP is UTF-16 encoded and may not be read by git; check it).
