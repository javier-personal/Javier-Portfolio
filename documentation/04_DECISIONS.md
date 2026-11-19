# Decisions

| Date | Decision | Reason |
|---|---|---|
| Round 2 | Remove step-by-step slides and Prev/Next from project pages | Owner request |
| Round 2 | DSES result is 77.3%; use documented results only, flag missing ones | Accuracy, no invented data |
| Round 2 | Keep existing Most Recent / Most Relevant logic | Owner request |
| Round 2 | Keep phone number on contact | Owner approved |
| Round 2 | One JSON data file + reusable components, static HTML framework | Owner approved |
| Round 3 | Glassmorphism, profile photo + name top-left on every page | Owner reference images |
| Round 3 | Keep original 3D carousel cards and reflection book | Owner request |
| Homepage | No View Projects / Resume buttons on homepage; no pink | Owner request |
| Homepage | Statistics immediately before Get in Touch; stats use "+" | Owner feedback |
| OCBC | Keep Intern nav route; preserve all OCBC files and settlement PDF unmodified | Owner security constraint |
| OCBC | Six unlinked pages stay in place unchanged | Owner approval |
| Deploy | Do not deploy settlement agreement without explicit approval (public-access risk) | Owner security constraint |
| Fix round | Back button on OCBC page stays removed | Owner's intentional edit |
| Fix round | Repair owner's `Portfolio 2` by overlaying the shared CSS rather than reverting edits | Preserve owner edits |
| Fix round | Nav bar follows owner's reference image (pill, white active) | Owner request 2026-11-06 |
| Docs | Docs live in `docs/` and in Claude Project Files, kept in sync | Owner request |
| 2026-11-07 | Motion is opt-out: `data-motion="off"` on `<body>` or `prefers-reduced-motion` means `html.motion` is never added | Keeps OCBC pages untouched and respects accessibility |
| 2026-11-07 | Reveals use `translate`/`scale`/`opacity` (not `transform`); components append their own transitions via `--own` | Hover `transform` rules keep working |
| 2026-11-07 | "OCBC Internship page" = `ocbc-intern.html` and its Task 1-3 pages. The `internship.html` landing (card gallery) IS animated | Interpretation; one line to change (`data-motion="off"` on that page) |
| 2026-11-07 | Card text is separate (`cardSummary`); project page text unchanged | Request was Projects page cards only |
| 2026-11-07 | Gold gradient uses darker golds than a classic pale highlight | Pale highlight made text unreadable on the light glass |
| 2026-11-07 | OCBC outcomes only state documented facts (UAT sign-off, handover, scheduling); no metrics added | No invented results |
| 2026-11-07 | Reflection tab labels renamed to match the new card names | Consistency with renamed cards |
| 2026-11-07 | OCBC About text and hero left as the owner's current wording | Not in the requested scope |
| 2026-11-07 | Task 3 timeline bars computed from the old tracker's dates; undated items shown as Pending | No invented dates or statuses |
| 2026-11-07 | Task 3 built from the written spec because no reference image arrived | Owner to compare and request tweaks |
| 2026-11-19 | Approved: hackathon scale (five-member team, about 170 students), OCBC intern card text, About My Internship figures, T-1 context, PostgreSQL via Supabase, Personal Finance Tracker card, Customer Satisfaction Prediction description | Make portfolio and resume consistent. Implemented 2026-11-19 |
| 2026-11-19 | Database per project: Personal Finance Tracker = PostgreSQL (via Supabase); Full-Stack Web Development = MySQL; Data Warehouse = MySQL. Never list PostgreSQL on the two MySQL projects | Owner statement of actual usage |
| 2026-11-19 | DEFERRED: TypeScript, Tailwind CSS, Bootstrap, Figma. Keep the homepage tags; do not edit existing project pages to add them. Document them in the project pages of the new projects when those are added, after verifying actual usage | Owner built further projects not yet in the portfolio |
| 2026-11-19 | `files/resume.pdf` is an archival copy not used by the site code; leave untouched | Owner decision |
| 2026-11-19 | No further resume audit or scoring; earlier review decisions are settled | Owner decision |
| 2026-11-19 | The portfolio is already deployed; deployment is not an outstanding task (supersedes the 2026-11-07 "Deploy" hold and the "Approve deployment" task) | Owner statement |
| 2026-11-19 | Interpretations made: "homepage card" = the Personal Finance Tracker card on the Projects page (none on the homepage); "existing resume's About My Internship section" = the About My Internship section of `ocbc-intern.html`; the intern card's old text (a copy of the DSES blurb) was replaced rather than kept beside the new text | Conflicts between the brief and the code; owner to confirm |
| 2026-11-19 | PROPOSED (history; approved later the same day, see the APPROVED rows below): (1) Certifications and (2) Awards as two sections of the Resume page with no navbar change; (3) one Shopee sentence in the existing Work Experiences paragraph, Promoter left out; (4) one sentence plus a sixth Photography tile in the About Me photo row. Presented in the "Portfolio Design Proposals (for review)" design canvas | Awaiting owner review |
| 2026-11-19 | The HTML pages (as rendered from `index.html`) are the source of truth; JSON data and templates are secondary and were reconciled to the HTML | Owner statement |
| 2026-11-19 | The build tool is check-only by default and never overwrites a hand-edited page; Personal Finance Tracker is hand-maintained (`pageSource: html`) | Prevents the overwrite risk (Known Issues 5, 12, 13) |
| 2026-11-19 | APPROVED designs implemented: Certifications and Awards & Achievements as sections of the existing Resume page; navbar label stays "Resume", no new page or nav item; Photography in the homepage About Me section (sentence plus sixth tile in the photo row, 4-6 photos in the lightbox, Lightroom and Photoshop named in the sentence) | Owner approval of the proposals |
| 2026-11-19 | APPROVED with modification: employment proposal = one Shopee sentence in Work Experiences plus a horizontal timeline directly below Work Experience. Promoter stays out (proposal's inclusion decision); the OCBC internship is not in the timeline because its own card follows immediately; vertical on mobile | Owner approval; interpretation flagged for review |
| 2026-11-19 | Ignite is the name of the internship programme: title "OCBC Ignite 2025/2026" is correct and must not be renamed (supersedes the earlier suggestion to rename it) | Owner statement |
| 2026-11-19 | Homepage OCBC description is the short approved version; the Intern page keeps the long one. They must not be identical | Owner instruction |
| 2026-11-19 | Control-M: not on the homepage strip, kept in OCBC Task 1 and 3. Cloudera: removed from Task 1 | Earlier approved decision, verified |
| 2026-11-19 | Credentials show only facts in the resume; no [ADD] placeholders, IDs or certificate links until the owner supplies them | No invented credentials |
| 2026-11-19 | The settlement PDF matter is resolved by the owner; no longer tracked in these docs (supersedes the 2026-11-07 "Deploy" hold and Known Issue 1) | Owner statement |
| 2026-11-19 | Jump chips ("Certifications", "Awards & Achievements") removed from the Resume page; section ids kept | Owner: "they are not needed" |
| 2026-11-19 | Year pills under Awards use the Certifications issuer-pill colours | Owner request |
| 2026-11-19 | Timeline shows every role on the resume, oldest first, descriptions under six words from the resume; Bartender/Bar Assistant and Service Crew at Ce La Vi are one entry (same company, same dates). Supersedes the earlier "Promoter and OCBC left out" interpretation | Owner: timeline "should display all my work experience in my resume" |
| 2026-11-19 | Each certificate and award gets a documented slot (stable id, register in `09_CREDENTIALS.md`); the "View" button and images come later. No images, IDs, dates or issuers invented | Owner: "in the future, we will add a view button" |
| 2026-11-19 | Reflection section stays hidden in the owner's HTML comment; `JS/ocbc.js` is null-safe so it can be restored by removing the comment markers | Owner: "intentionally hide it so I can bring it back anytime" |
| 2026-11-19 | The comment boundary in `ocbc-intern.html` (it also wraps `</main></div>`) was left as the owner wrote it | Not asked; harmless (Known Issue 22) |
| 2026-11-19 | Owner's static Photography tile kept; `JS/photography.js` left in place but inactive (empty list) to avoid a duplicate tile | Owner fixed Photography himself |
| 2026-11-19 | Resume page: one preview with a Professional / ATS-Friendly segmented control; Professional default; Open Preview and Download PDF follow the selection; no new page or nav item | Owner request (round 4) |
| 2026-11-19 | Resume paths: Professional `files/Javier Tan Wei En_Resume.pdf`, ATS `files/Javier Tan Wei En_Resume_ATS.pdf`; defined only on the tab buttons; files not renamed or regenerated | Owner: no crossover, do not modify resumes. `Resume/` copies are identical but unused by the page |
| 2026-11-19 | Preview area has a fixed maximum height and scrolls inside | Owner: preview must not make the page unnecessarily long (credentials follow it) |
| 2026-11-19 | Header avatar is a button showing `prof_pic_2.PNG`, cropped by CSS (no duplicate image file); the name remains a link to `index.html` | Owner request; a link cannot contain the clickable avatar |
| 2026-11-19 | Profile lightbox reuses the shared lightbox in single-image mode; its fade/zoom animation and scroll lock apply to the profile photo only | Owner: reuse the shared component and "do not change anything else" |
| 2026-11-19 | Existing header link target (`href="index.html"`, which 404s on pages inside `HTML/`) left unchanged and reported, not fixed | Owner: do not change anything not mentioned (Known Issue 25) |
| 2026-11-19 | The two Resume format options carry a short description INSIDE each toggle button (Professional: "Visually polished, structured for easy reading"; ATS-Friendly: "Design optimised for ATS parsing"); edit in `HTML/resume.html` | Owner request (round 5); supersedes the earlier idea of captions under the toggle |
| 2026-11-19 | Resume page spacing uses one token `--resume-gap` (`clamp(2rem, 5vw, 3rem)`) for every section gap; the toggle-to-buttons gap is `clamp(1.5rem, 3vw, 2rem)` | Owner request (round 6): more breathing room; one value keeps all section gaps equal and easy to change. Fallback `1rem` in `credentials.css` keeps it safe if the token is missing |
