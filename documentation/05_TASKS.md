# Tasks

## Done
- [x] Glass redesign, header, shared footer, to-top
- [x] Homepage six sections, counters, no orbs
- [x] 13 project pages, filters, Back to Projects glass buttons
- [x] Internship card centred; OCBC page with owner edits
- [x] Resume page glass buttons
- [x] Restore truncated CSS in owner's Portfolio 2
- [x] Nav bar to reference-image design
- [x] Back to Projects top spacing
- [x] Documentation system (`documentation/` + Project Files `docs/`)
- [x] Website-wide animations, gold text, shorter card text, Source text removed (2026-11-07)
- [x] OCBC reflection book, Task 1-3 pages and card titles rewritten (2026-11-07)
- [x] 2026-11-19: approved consistency changes A-F applied (see `03_CHANGELOG.md`)
- [x] 2026-11-19 (follow-up): homepage OCBC card, finance meta description, Control-M/Cloudera placement, Certifications, Awards & Achievements, Shopee sentence + horizontal timeline, Photography sentence and tile mechanism, build-system safeguards and reconciliation
- [x] 2026-11-19 (round 3): chips removed, year pill colour, full-resume timeline, credential documentation slots, Reflection JS error fixed, audit and resume/portfolio sync check

- [x] 2026-11-19 (round 4): Resume Format Selector (Professional | ATS-Friendly) and header profile photo with lightbox on all pages

## Pending (needs owner)
- [ ] Deploy round 4 yourself (not deployed by Claude); then check both resume tabs, Download PDF, and the avatar lightbox on the live site
- [ ] Decide whether to fix the header name link on pages inside `HTML/` (Known Issue 25) and whether to add a small avatar copy of `prof_pic_2.PNG` (Known Issue 26)
- [ ] Supply certificate and award images (and any dates/IDs you want public), then ask for the "View" buttons (`09_CREDENTIALS.md`)
- [ ] Decide: "Boxing" on the homepage is not on the resume (Known Issue 19)
- [ ] Shrink `images/Main-Page/photography.jpeg` (2.4 MB shown at about 120 px) and decide about the unused `.HEIC` (Known Issue 20)
- [ ] Decide what to do with the old and "(private)" resume files committed in `Resume/` (Known Issue 21)
- [ ] Review OCBC internal screenshots and resume. (The settlement PDF part was resolved by the owner 2026-11-19.)
- [ ] Confirm whether the OCBC page needs a visible way back to the Internship page now the Back button is removed
- [x] ~~Approve deployment~~ Superseded 2026-11-19: the owner says the portfolio is already deployed
- [ ] Owner to review the rewritten OCBC wording for accuracy (first-person contributions are taken from the original reflections)
- [ ] Confirm `internship.html` (card gallery) should be animated

## Ideas, not started
- [ ] Mobile drawer active state could match the new white pill nav
- [ ] Lower the to-top threshold for short pages (Internship page scrolls only 50-150px)

## Awaiting owner input (2026-11-19 follow-up)
- [ ] **Photography tile is inactive.** Supply 4-6 photos, copy them to `images/Photography/` and list them in `JS/photography.js` (instructions at the top of that file). Until then nothing appears. Also check the alt text for each photo.
- [ ] Optional: certificate dates, IDs, links or images (CCNA has no date on the resume). Nothing is invented; these can be added to the Certifications cards later.
- [ ] Review the interpretations: timeline lists Shopee, Ce La Vi, The Elephant Room only (no Promoter, no OCBC); Disciplinary Minds uses the resume's wording; the hackathon award row says "team of five among about 170 polytechnic students".
- [ ] `HTML/ocbc-intern.html` logs a pre-existing JS error because the Reflection section is commented out ("Hidden for now not needed for hiring purposes") while `JS/ocbc.js` still looks for it. Harmless; left as is.

## Deferred on purpose (2026-11-19)
- [ ] When the new projects are added, document TypeScript, Tailwind CSS, Bootstrap and Figma in their project pages after verifying actual usage. Keep the homepage tags meanwhile.
- [ ] Do not touch `files/resume.pdf`.

## Outstanding consistency items
Resolved 2026-11-19 (follow-up): homepage OCBC card, finance meta description, hackathon caption (owner), DVA gallery (owner), Control-M homepage tag, Cloudera, intern card title (confirmed correct: Ignite is the programme name), CCNA/LinkedIn/awards/Shopee/Lightroom and Photoshop on the portfolio (implemented; photo tile awaits photos).
- [ ] Data Visualization & Analytics gallery: `images/DAVA/dava-residuals.jpeg` is still not in the gallery. The owner reports having changed the gallery; left exactly as supplied.
- [ ] TypeScript, Tailwind, Bootstrap and Figma only as homepage tags; PostgreSQL on one page (deferred, above).
- [ ] Live site not checked against this version (no network in the working sandbox).
- [ ] `README.md` "Checks run" section describes the 2026-11-07 round; re-run checks after the next content round.
