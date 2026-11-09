#!/usr/bin/env node
/* Static page generator. Reads data/projects.json and data/reflections.json and writes plain HTML.
   Run from the project root:  node tools/build.js
   Output is ordinary static HTML (no server, no framework needed to host it). */
const fs = require('fs'),
  path = require('path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const write = (f, s) => fs.writeFileSync(path.join(root, f), s);
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const projects = JSON.parse(read('data/projects.json'));
const reflections = JSON.parse(read('data/reflections.json'));

const svg = {
  right: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  left: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>',
};
const icon = (n) =>
  `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${svg[n]}</svg>`;

/* Escapes text and wraps the two highlighted phrases in the shared gold-text classes (css/components.css). */
const rich = (s) =>
  esc(s)
    .replace(/Temasek Polytechnic/g, '<span class="gold-text gold-soft">$&</span>')
    .replace(/third place/gi, '<span class="gold-text gold-strong">$&</span>');

/* page shell for pages inside HTML/ (R = '../') */
const R = '../';
const V = '?v=3'; // bump when CSS/JS change so browsers fetch the new files
const FOOTER =
  '<footer class="site-footer glass"><p>&copy; <span id="year">2026</span> Javier Tan. All rights reserved. Fully coded website 😄</p></footer>';
const shell = ({
  title,
  desc,
  nav,
  main,
  css = ['base', 'components', 'pages'],
  extraScripts = '',
  bodyAttrs = '',
  header = '<header class="site-header" id="site-header"></header>',
  head = '',
}) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${head}${css.map((c) => `<link rel="stylesheet" href="${R}css/${c}.css${V}">`).join('\n')}
</head>
<body class="glass-page" data-root="${R}" data-nav="${nav}"${bodyAttrs}>
<a class="skip-link" href="#main">Skip to content</a>
${header}
${main}
${FOOTER}
<button class="to-top" aria-label="Back to top"></button>
<script src="${R}JS/site.js${V}"></script>
${extraScripts}</body>
</html>
`;

/* ---- Projects ---- */
const filtersFor = (p) =>
  ['all', p.recent && 'recent', p.relevant && 'relevant', p.mini && 'mini']
    .filter(Boolean)
    .join(' ');
write(
  'HTML/projects.html',
  shell({
    title: 'Projects | Javier Tan',
    desc: 'Selected data analytics, data engineering, machine learning and UX projects by Javier Tan.',
    nav: 'projects.html',
    main: `<main id="main" class="page-wrap">
  <h1 class="page-title">Projects</h1>
  <div class="filters" role="group" aria-label="Filter projects" id="filters">
    <button class="chip" data-filter="all" aria-pressed="true">All</button><button class="chip" data-filter="recent" aria-pressed="false">Most Recent</button><button class="chip" data-filter="relevant" aria-pressed="false">Most Relevant</button><button class="chip" data-filter="mini" aria-pressed="false">Mini Projects</button>
  </div>
  <p class="result-count" id="count" role="status" aria-live="polite"></p>
  <div class="gallery" id="gallery">
${projects
  .map(
    (p) => `    <a class="card glass" href="${p.slug}.html" data-filters="${filtersFor(p)}">
      <div class="thumb"><img src="${R}${p.image}" alt="${esc(p.alt)}" loading="lazy"></div>
      <div class="body"><h3>${esc(p.cardTitle || p.title)}</h3><p>${rich(p.cardSummary)}</p><span class="more">View project ${icon('right')}</span></div></a>`
  )
  .join('\n')}
  </div>
</main>`,
    extraScripts: `<script src="${R}JS/filters.js${V}"></script>\n`,
  })
);

/* ---- Project pages ---- */
const lb = (src, alt) =>
  `<button class="zoomable" aria-label="Enlarge: ${esc(alt)}"><img src="${R}${src}" alt="${esc(alt)}" loading="lazy"><span class="zoom-badge">${icon('zoom')}</span></button>`;
for (const p of projects) {
  const d = p.detail;
  write(
    `HTML/${p.slug}.html`,
    shell({
      title: `${p.title} | Javier Tan`,
      desc: p.summary,
      nav: 'projects.html',
      main: `<main id="main" class="page-wrap project">
  <a class="back-link" href="projects.html">${icon('left')} Back to Projects</a>
  <section class="project-hero glass"><h1>${esc(p.heading || p.title)}</h1><p class="summary">${rich(p.pageSummary || p.summary)}</p></section>
  <div class="facts">
    <section class="fact glass"><h2>My contribution</h2><p>${rich(d.contribution)}</p></section>
    <section class="fact glass"><h2>Tools</h2><ul class="tags">${d.tools.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>${
      d.result
        ? `
    <section class="fact glass wide"><h2>Strongest documented result</h2><div class="result"><div><p class="big">${esc(d.result.text)}</p></div><div data-lightbox-group>${lb(d.result.image, d.result.alt)}</div></div></section>`
        : ''
    }
  </div>
  <h2 class="section-title">Project visuals</h2>
  <p class="gallery-count">${d.gallery.length} images. Select one to enlarge.</p>
  <div class="shots" data-lightbox-group>
${d.gallery.map((i) => `    <figure class="shot glass">${lb(i.src, i.caption)}<figcaption>${esc(i.caption)}</figcaption></figure>`).join('\n')}
  </div>
  <p class="page-end"><a class="btn btn-glass" href="projects.html">${icon('left')} Back to Projects</a></p>
</main>`,
    })
  );
}

/* ---- Internship landing page (original route: nav > internship.html > ocbc-intern.html) ---- */
write(
  'HTML/internship.html',
  shell({
    title: 'Internship | Javier Tan',
    desc: "Javier Tan's OCBC internship: data engineering and analytics projects and reflections.",
    nav: 'internship.html',
    main: `<main id="main" class="page-wrap">
  <h1 class="page-title">Internship</h1>
  <div class="filters" role="group" aria-label="Filter internships" id="filters">
    <button class="chip" data-filter="all" aria-pressed="true">All</button><button class="chip" data-filter="recent" aria-pressed="false">Most Recent</button><button class="chip" data-filter="relevant" aria-pressed="false">Most Relevant</button>
  </div>
  <p class="result-count" id="count" role="status" aria-live="polite"></p>
  <div class="gallery" id="gallery">
    <a class="card glass" href="ocbc-intern.html" data-filters="all recent relevant">
      <div class="thumb"><img src="${R}images/Intern/ocbc-logo.png" alt="OCBC Ignite 2025/2026 Internship" loading="lazy"></div>
      <div class="body"><h3>OCBC ignite 2025/2026</h3><p>Built a predictive analytics pipeline with Python libraries for profiling, cleaning, visualization, modeling, clustering, and recommendations.</p><span class="more">View internship ${icon('right')}</span></div></a>
  </div>
</main>`,
    extraScripts: `<script src="${R}JS/filters.js${V}"></script>\n`,
  })
);

/* ---- OCBC page: original content, responsive layout, reflection data embedded ---- */
let oc = read('tools/templates/ocbc-intern.html');
oc = oc.replace('/*REFLECTION_JSON*/', JSON.stringify(reflections).replace(/</g, '\\u003c'));
write('HTML/ocbc-intern.html', oc);
console.log('built', projects.length, 'project pages + projects, internship, ocbc-intern');
