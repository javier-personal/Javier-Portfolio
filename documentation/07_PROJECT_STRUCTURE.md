# Project Structure

```
Portfolio 2/
  index.html                  Homepage (hand-written; owner edits live here)
  HTML/
    projects.html, internship.html, ocbc-intern.html   generated (safe generator; HTML is the source of truth)
    <12 project pages>.html                            generated from data/projects.json
    personal-finance-tracker.html                      hand-maintained (pageSource: html), never generated
    resume.html (format selector + PDF preview + Certifications + Awards), contact.html   hand-written
    ocbc-task1..3.html                                 hand-written, rewritten 2026-11-07 (originals in _original-pages/HTML/)
    test, test2, test3, format, saved-codes, project_template .html   ORIGINAL, unlinked, do not modify
  css/  base.css (tokens, reset, background, glass)
        components.css (header, nav, drawer, buttons, back-link, footer, to-top, lightbox, toast, motion system, gold text)
        pages.css, home.css (also Work Experience timeline), ocbc.css
        credentials.css (Resume page: Certifications, Awards & Achievements; year pills = issuer pill colours)
  JS/   site.js (header, to-top, lightbox, icons, motion/reveal map)  filters.js  ocbc.js  resume.js
        photography.js (homepage Photography tile; empty PHOTOS list = nothing shown)
        script.js (ORIGINAL, do not modify)
  data/ projects.json, reflections.json
  tools/ build.js (safe generator), build-lock.json (baseline), templates/ocbc-intern.html
  _build-backups/             created by build --write when it overwrites a page (do not commit)
  assets/profile.svg          Former header avatar (unused since round 4; the header now uses images/Main-Page/prof_pic_2.PNG, set in PROFILE in JS/site.js)
  images/ ...                 Originals + owner additions (prof_pic.jpeg, censored-dashboard.png, ocbc-logo-2.*)
  files/ , Resume/            Resume files (not modified). The Resume page uses files/Javier Tan Wei En_Resume.pdf (Professional) and files/Javier Tan Wei En_Resume_ATS.pdf (ATS-Friendly)
  vendor/pdfjs/               PDF viewer
  _original-pages/            Originals of rebuilt pages, original task pages, original reflections.json (data/)
  documentation/              These 9 documentation files (08_BUILD_SYSTEM.md and 09_CREDENTIALS.md added 2026-11-19) (mirrored in Claude Project Files as docs/)
  PRESERVATION.md, README.md, package.json, .prettierrc.json, .prettierignore
```

Page load order: `base.css` -> `components.css` -> page CSS. Navigation: Home, Resume, Intern, Projects, Contact.
