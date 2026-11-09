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
