# Project Status

_Last updated: 2026-11-07_

## Current state
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
