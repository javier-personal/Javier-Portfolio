# Project Structure

```
Portfolio 2/
  index.html                  Homepage (hand-written; owner edits live here)
  HTML/
    projects.html, internship.html, ocbc-intern.html   generated
    <13 project pages>.html                            generated from data/projects.json
    resume.html, contact.html                          hand-written
    ocbc-task1..3.html                                 hand-written, rewritten 2026-11-07 (originals in _original-pages/HTML/)
    test, test2, test3, format, saved-codes, project_template .html   ORIGINAL, unlinked, do not modify
  css/  base.css (tokens, reset, background, glass)
        components.css (header, nav, drawer, buttons, back-link, footer, to-top, lightbox, toast, motion system, gold text)
        pages.css, home.css, ocbc.css
  JS/   site.js (header, to-top, lightbox, icons, motion/reveal map)  filters.js  ocbc.js  resume.js
        script.js (ORIGINAL, do not modify)
  data/ projects.json, reflections.json
  tools/ build.js, templates/ocbc-intern.html
  assets/profile.svg          Header avatar (single place to change)
  images/ ...                 Originals + owner additions (prof_pic.jpeg, censored-dashboard.png, ocbc-logo-2.*)
  files/resume.pdf, Resume/   Resume files (not modified)
  vendor/pdfjs/               PDF viewer
  _original-pages/            Originals of rebuilt pages, original task pages, original reflections.json (data/)
  documentation/              These 7 documentation files (mirrored in Claude Project Files as docs/)
  PRESERVATION.md, README.md, package.json, .prettierrc.json, .prettierignore
```

Page load order: `base.css` -> `components.css` -> page CSS. Navigation: Home, Resume, Intern, Projects, Contact.
