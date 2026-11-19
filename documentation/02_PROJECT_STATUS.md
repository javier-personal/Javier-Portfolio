# Project Status

_Last updated: 2026-11-19_

## Current state
**Update 2026-11-19 (round 6):** more space between the Resume page sections (one `--resume-gap` token, 48px desktop / 32px phone) and between the format toggle and the Open Preview / Download PDF buttons (32px desktop / 24px phone). Built on the owner's `_5` zip with his Resume page restructure kept. Details in `03_CHANGELOG.md`. Verified with Playwright (Chrome); not verified on Safari/Firefox, real phones or the live site. Not deployed (owner deploys).

**Update 2026-11-19 (round 4):** the Resume page now has a format selector (Professional | ATS-Friendly, one preview, Open Preview and Download PDF follow the selection) and the header avatar on every page is the professional photograph (`prof_pic_2.PNG`) with a click-to-enlarge lightbox. Details in `03_CHANGELOG.md`. Verified with Playwright (Chrome) on desktop and mobile; not verified on Safari/Firefox, real phones or the live site. Not deployed (owner deploys).

**Update 2026-11-19 (round 3, from ZIP `Portfolio_v20261119_2`):** the owner's six requests are done: jump chips removed, year pills recoloured, timeline covers all six resume roles (five entries), credential cards ready for a future "View" lightbox button (`09_CREDENTIALS.md`), and the Reflection JS error fixed while the section stays hidden in his comment. The owner fixed Photography himself with a static sixth tile; `JS/photography.js` stays inactive. New findings are in `06_KNOWN_ISSUES.md` items 19-22.

**Update 2026-11-19 (follow-up, from ZIP `Portfolio_v20261119`):** the owner's latest ZIP is the source of truth and his own edits were preserved (intern card text and title "OCBC Ignite 2025/2026", hackathon caption, Data Visualization contribution and gallery caption, Personal Finance Tracker tag "PostgreSQL", Projects page card, third Front-End image). Applied: homepage "Internship at OCBC" text (approved wording, shorter than the Intern page text), Personal Finance Tracker meta description, Control-M removed from the homepage skills strip, Cloudera removed from OCBC Task 1 (it was inside a commented-out block). Approved designs implemented: Certifications and Awards & Achievements on the Resume page, a horizontal Work Experience timeline plus one Shopee sentence on the homepage, a Photography sentence and tile mechanism on the homepage. The build system was made safe (see `08_BUILD_SYSTEM.md`). **Photography tile is built and tested but inactive until photos are supplied** (`JS/photography.js`). The settlement PDF issue is resolved by the owner and is not tracked here.

**Earlier update 2026-11-19:** the owner confirmed the portfolio is already deployed (remote `origin` = github.com/javier-personal/Javier-Portfolio; the resume links to its published URL). The "Not deployed" wording below is historical (2026-11-07). On 2026-11-19 six approved content changes were applied (see `03_CHANGELOG.md`): hackathon scale and team size, OCBC intern card and About My Internship figures, T-1 context, PostgreSQL via Supabase on the Personal Finance Tracker, Personal Finance Tracker card, and the Customer Satisfaction Prediction description on Data Visualization & Analytics. Four design proposals are awaiting owner approval (not implemented).

Portfolio site is built and working locally. Latest work (2026-11-07): website-wide animations, gold text effects, shorter project card text, Source text removed, OCBC reflection book and Task 1-3 pages rewritten for recruiters, Task cards renamed. Not deployed.

## Completed
- Glass redesign across all pages; profile photo + name top-left on every page.
- Six-section editorial homepage (Intro, Projects & Expertise, Work, About, Statistics before Get in Touch, Contact), animated counters, no orbs.
- 13 project pages generated from `data/projects.json`; Projects page filters (All / Most Recent / Most Relevant).
- Internship page (centred card) -> OCBC page with 3D task carousel and reflection book -> task pages (rewritten 2026-11-07; originals in `_original-pages/HTML/`).
- Resume page with inline PDF viewer, Download Resume and Open in new tab (glass buttons).
- Shared footer on every page including OCBC; scroll-to-top button (appears after 200px scroll).
- Repair of owner's `Portfolio 2` copy: its `css/base.css` was truncated (no button/footer/to-top rules); styles restored, owner edits kept.
- Nav bar redesigned to the pill style from the owner's reference image (no separators, white active pill).
- Back to Projects (top) has a 24px gap above the title box.
- Documentation system created (`documentation/` in the ZIP, `docs/` in Claude Project Files).
- 2026-11-07 revamp: shared motion system (all pages except OCBC), metallic gold shimmer on "Temasek Polytechnic" and "third place", shorter Projects card descriptions, visible "Source" text removed from project pages, recruiter-focused OCBC reflection book (9 entries) and Task 1-3 pages, cards renamed Data Pipeline Development / Departmental Dashboards / DevOps Framework Design.

## In progress / pending
See `05_TASKS.md`.

## Verification last run (2026-11-07)
Chromium (Playwright) at 390px and 1440px on 12 pages: no horizontal overflow, no console errors (the resume PDF preview only fails over `file://`; it renders over http). Scroll replay, refresh replay, filter replay, `prefers-reduced-motion` and the OCBC exclusion tested. Not tested: Safari/Firefox, real touch devices, bfcache restore.

## Verification run 2026-11-19 (round 4)
Playwright (Chrome 1280px desktop; 390px phone, DPR 2, touch), served over http. Resume page (50 checks): Professional selected on load and only its PDF fetched; ATS-Friendly switch shows a different render and fetches the ATS PDF; Open Preview opens the selected PDF in a new tab (URL checked) and Download PDF saves the selected file (name and MD5 equal to `files/...pdf` / `..._ATS.pdf`); both PDFs return 200 with `%PDF`; rapid switching settles on the last choice; arrow keys switch tabs; one preview and one tab panel; 3 certification cards, 4 award cards and the hackathon row intact; no horizontal overflow; buttons at least 44px high. Avatar (497 checks, 19 pages x 2 sizes): photo loads from `images/Main-Page/prof_pic_2.PNG`, circle not stretched, name and 5 nav links intact, click opens the lightbox with the full 1535x1024 photo at the right aspect ratio inside the viewport, background scroll locked, Escape / close button / click outside close it, click on the image does not, focus returns to the avatar, scroll position unchanged, no JS errors or 4xx. Gallery lightbox on `data-warehouse.html` still in normal mode, and switching between gallery and avatar modes works. Only console message: the missing `favicon.ico` (no favicon exists; pre-existing). Not tested: Safari/Firefox, real devices, the live site.

## Verification run 2026-11-19 (round 3)
Playwright (Chromium, served over http) at 1280px, 1024px (timeline only) and 390px. Timeline: five entries, all descriptions under six words, five columns at 1280px/1024px, vertical at 390px, no horizontal overflow. Resume page: no `.cred-nav` in the DOM; year pill and issuer pill computed colours identical (rgb(233,231,239) / rgb(93,80,117)). OCBC page: original ZIP throws "Cannot set properties of null (setting 'innerHTML')" at 1280px and 390px; fixed tree throws nothing; on a copy with the comment removed the book opens, shows 9 entries, opens and closes a reflection dialog, and the carousel still turns. Lightbox "View" pattern tested on a throwaway copy. All 28 HTML pages swept at two widths before and after: the only difference is the removed OCBC error. Link/image check 281 references, 0 broken. `node tools/build.js`: 15 of 15 MATCH. Not tested: Safari/Firefox, real devices, the live site.

## Verification run 2026-11-19 (follow-up)
Playwright (Chromium) at 1280px and 390px, served over http: homepage OCBC wording, no Control M, Shopee sentence, timeline order (after the Work Experience block, before Internship), horizontal at 1280px and vertical at 390px, Photography sentence, Resume page sections and values, jump chips, hackathon link, PDF viewer still 3 pages, navbar unchanged, no horizontal overflow. Photography tile and lightbox tested on a throwaway copy with five generated placeholder images (not shipped): tile is the sixth item, opens only the five photography images, arrows wrap, Escape closes, other tiles' lightbox unchanged, mobile tile uses the wide frame. Before/after comparison of 22 pages at two widths: no change in JS errors, overflow or broken images. Local link and image check: 280 references, 0 broken. Build safeguards tested on copies (see `08_BUILD_SYSTEM.md`). Not tested: Safari/Firefox, real devices, the live deployed site.

## Verification run 2026-11-19
Playwright (Chromium) at 1280px and 390px on the 9 edited pages plus the homepage: every new text present in the rendered DOM; no horizontal overflow; local link and image check 276 references, 0 broken (identical before and after). Pre-existing, unchanged: one image with no `src` on every page (header avatar placeholder), and `ocbc-intern.html` throws `Cannot set properties of null (setting 'innerHTML')` plus a blocked Google Fonts request when offline. Not tested: Safari/Firefox, real devices, the live deployed site.
