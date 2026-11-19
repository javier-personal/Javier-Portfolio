#!/usr/bin/env node
/* Static page generator. Reads data/projects.json and data/reflections.json and builds plain HTML.

   THE HTML PAGES IN HTML/ ARE THE SOURCE OF TRUTH. This tool is a SAFE generator:
     node tools/build.js                  CHECK ONLY. Writes nothing. Reports, per page, whether the
                                          generated version matches the page on disk.
     node tools/build.js --write          Writes NEW pages and pages that were NOT edited by hand since
                                          they last matched the generator. Pages edited by hand are
                                          PROTECTED and are skipped. Every overwritten file is first
                                          copied to _build-backups/.
     node tools/build.js --write --force HTML/page.html
                                          Overwrites one protected page on purpose (backup is made).
     node tools/build.js --lock           Records the current pages as the baseline without writing HTML.
   A page marked "pageSource": "html" in data/projects.json is maintained by hand and is never generated.
   See documentation/07_BUILD_SYSTEM.md. Output is ordinary static HTML (no server needed). */
const fs = require('fs'),
  path = require('path'),
  crypto = require('crypto');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
/* Nothing is written while the pages are being built; results are collected here and only the
   safety layer at the bottom of this file may touch the disk. */
const outputs = new Map();
const write = (f, s, opts = {}) => outputs.set(f, { content: s, format: opts.format !== false });
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
    <button class="chip" data-filter="all" aria-pressed="true">All</button><button class="chip" data-filter="recent" aria-pressed="false">Most Recent</button><button class="chip" data-filter="relevant" aria-pressed="false">Most Relevant</button><button class="chip" data-filter="mini" aria-pressed="false">Personal Projects</button>
  </div>
  <p class="result-count" id="count" role="status" aria-live="polite"></p>
  <div class="gallery" id="gallery">
${projects
  .map(
    (p) => `    <a class="card glass" href="${p.slug}.html" data-filters="${filtersFor(p)}">
      <div class="thumb"><img src="${R}${p.image}" alt="${esc(p.alt)}" loading="lazy"></div>
      <div class="body"><h3>${esc(p.cardTitle || p.title)}</h3><p>${p.cardSummaryHtml || rich(p.cardSummary)}</p><span class="more">View project ${icon('right')}</span></div></a>`
  )
  .join('\n')}
  </div>
</main>`,
    extraScripts: `<script src="${R}JS/filters.js${V}"></script>\n`,
  })
);

/* ---- Project pages ---- */
const lb = (src, alt, label) =>
  `<button class="zoomable" aria-label="Enlarge: ${esc(label || alt)}"><img src="${R}${src}" alt="${esc(alt)}" loading="lazy"><span class="zoom-badge">${icon('zoom')}</span></button>`;
for (const p of projects) {
  if (p.pageSource === 'html') continue; // hand-maintained page: the HTML file is the source, never generated
  const d = p.detail;
  write(
    `HTML/${p.slug}.html`,
    shell({
      title: `${p.title} | Javier Tan`,
      desc: p.summary,
      nav: 'projects.html',
      main: `<main id="main" class="page-wrap project">
  <a class="back-link" href="projects.html">${icon('left')} Back to Projects</a>
  <section class="project-hero glass"><h1>${esc(p.heading || p.title)}</h1><p class="summary">${p.pageSummaryHtml || rich(p.pageSummary || p.summary)}</p></section>
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
${d.gallery.map((i) => `    <figure class="shot glass">${lb(i.src, i.alt || i.caption, i.label)}<figcaption>${esc(i.caption)}</figcaption></figure>`).join('\n')}
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
      <div class="body"><h3>OCBC Ignite 2025/2026</h3><p>Developed automated data pipelines and Power BI dashboards to support reporting across multiple departments.</p><span class="more">View internship ${icon('right')}</span></div></a>
  </div>
</main>`,
    extraScripts: `<script src="${R}JS/filters.js${V}"></script>\n`,
  })
);

/* ---- OCBC page: original content, responsive layout, reflection data embedded ---- */
let oc = read('tools/templates/ocbc-intern.html');
oc = oc.replace('/*REFLECTION_JSON*/', JSON.stringify(reflections).replace(/</g, '\\u003c'));
write('HTML/ocbc-intern.html', oc, { format: false }); // already hand-formatted; Prettier cannot parse it

/* ================= SAFETY LAYER =================
   Decides, page by page, whether the generated version may replace the page on disk.
     MATCH      generated and on-disk pages are equivalent (whitespace/formatting ignored): nothing to do
     NEW        the page does not exist yet: may be created
     UPDATE     differs, but the file is byte-identical to the baseline recorded in tools/build-lock.json,
                i.e. nobody has edited it by hand since it last matched: safe to regenerate
     PROTECTED  differs AND was changed since the baseline (or has no baseline): a hand edit would be lost,
                so it is NEVER written unless named with --force */
const args = process.argv.slice(2);
const WRITE = args.includes('--write'),
  LOCK_ONLY = args.includes('--lock');
const forced = new Set(args.filter((a, i) => args[i - 1] === '--force'));
const LOCK = 'tools/build-lock.json';
const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const lock = fs.existsSync(path.join(root, LOCK))
  ? JSON.parse(read(LOCK))
  : {
      note: 'Baseline of HTML pages the generator may overwrite. Managed by tools/build.js.',
      pages: {},
    };
/* Equivalent = same content after ignoring whitespace (also around tags), self-closing slashes,
   &amp; vs & and the doctype case. JSON data blocks are compared as parsed JSON. */
const norm = (s) =>
  s
    .replace(/\r\n/g, '\n')
    .replace(/(<script type="application\/json"[^>]*>)([\s\S]*?)(<\/script>)/g, (m, a, j, c) => {
      try {
        return a + JSON.stringify(JSON.parse(j)) + c;
      } catch {
        return m;
      }
    })
    .replace(/<!doctype/gi, '<!DOCTYPE')
    .replace(/&amp;/g, '&')
    .replace(/\s*\/>/g, '>')
    .replace(/\s+>/g, '>')
    .replace(/\s+/g, ' ')
    .replace(/> /g, '>')
    .replace(/ </g, '<')
    .trim();
const firstDiff = (a, b) => {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const cut = (s) => JSON.stringify(s.slice(Math.max(0, i - 40), i + 70));
  return `      on disk  : ${cut(a)}\n      generated: ${cut(b)}`;
};
async function loadPrettier() {
  try {
    return require('prettier');
  } catch {}
  try {
    const g = require('child_process')
      .execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    return require(path.join(g, 'prettier'));
  } catch {}
  try {
    /* a globally installed prettier found through PATH */
    const bin = fs.realpathSync(
      require('child_process')
        .execSync('command -v prettier', { stdio: ['ignore', 'pipe', 'ignore'] })
        .toString()
        .trim()
    );
    for (let d = path.dirname(bin); d !== path.dirname(d); d = path.dirname(d))
      if (
        fs.existsSync(path.join(d, 'package.json')) &&
        require(path.join(d, 'package.json')).name === 'prettier'
      )
        return require(d);
  } catch {}
  return null;
}

(async () => {
  const rows = [];
  for (const [file, out] of outputs) {
    if (!/^HTML\/[\w.-]+\.html$/.test(file))
      throw new Error('refusing to handle path outside HTML/: ' + file);
    const abs = path.join(root, file);
    if (!fs.existsSync(abs)) {
      rows.push({ file, out, status: 'NEW' });
      continue;
    }
    const cur = fs.readFileSync(abs);
    const a = norm(cur.toString('utf8')),
      b = norm(out.content);
    let status = 'MATCH';
    if (a !== b)
      status = lock.pages[file] && lock.pages[file].sha256 === sha(cur) ? 'UPDATE' : 'PROTECTED';
    rows.push({ file, out, status, diff: a === b ? '' : firstDiff(a, b), cur });
  }
  const handMade = projects
    .filter((p) => p.pageSource === 'html')
    .map((p) => `HTML/${p.slug}.html`);

  console.log(
    WRITE ? 'BUILD (--write)' : LOCK_ONLY ? 'LOCK' : 'CHECK ONLY: nothing will be written'
  );
  for (const r of rows) {
    const forcedNow = r.status === 'PROTECTED' && forced.has(r.file);
    console.log(`  ${(forcedNow ? 'FORCED' : r.status).padEnd(10)} ${r.file}`);
    if (r.status === 'PROTECTED' || (r.status === 'UPDATE' && !WRITE)) console.log(r.diff);
  }
  handMade.forEach((f) => console.log(`  HAND-MADE  ${f}  (never generated)`));

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  let wrote = 0,
    skipped = 0;
  if (WRITE) {
    const prettier = await loadPrettier();
    const cfg = JSON.parse(read('.prettierrc.json'));
    for (const r of rows) {
      const go =
        r.status === 'NEW' ||
        r.status === 'UPDATE' ||
        (r.status === 'PROTECTED' && forced.has(r.file));
      if (r.status === 'PROTECTED' && !go) {
        skipped++;
        continue;
      }
      if (!go) continue;
      let text = r.out.content;
      if (r.out.format) {
        if (prettier) text = await prettier.format(text, { ...cfg, parser: 'html' });
        else console.warn(`  (Prettier not found: ${r.file} written unformatted; run npm install)`);
      }
      const abs = path.join(root, r.file);
      if (r.cur) {
        const bdir = path.join(root, '_build-backups', stamp);
        fs.mkdirSync(path.dirname(path.join(bdir, r.file)), { recursive: true });
        fs.writeFileSync(path.join(bdir, r.file), r.cur);
      }
      fs.writeFileSync(abs, text);
      r.status = 'WROTE';
      wrote++;
    }
  }
  if (WRITE || LOCK_ONLY) {
    for (const r of rows) {
      if (r.status === 'MATCH' || r.status === 'WROTE')
        lock.pages[r.file] = { sha256: sha(fs.readFileSync(path.join(root, r.file))) };
    }
    fs.writeFileSync(path.join(root, LOCK), JSON.stringify(lock, null, 2) + '\n');
  }
  const pending = rows.filter((r) => ['NEW', 'UPDATE', 'PROTECTED'].includes(r.status));
  console.log(
    `\n${rows.length} generated pages: ${rows.filter((r) => r.status === 'MATCH').length} match` +
      (WRITE
        ? `, ${wrote} written, ${skipped} PROTECTED and skipped`
        : `, ${pending.length} differ`)
  );
  if (skipped)
    console.log(
      'PROTECTED pages were edited by hand and differ from data/templates. They were NOT touched.\n' +
        'Either copy the hand edits into data/projects.json (or the template) so the page matches,\n' +
        'or overwrite on purpose with: node tools/build.js --write --force <page>'
    );
  if (!WRITE && pending.length)
    console.log(
      'Run with --write to apply the safe ones (NEW/UPDATE). PROTECTED ones are never written without --force.'
    );
  process.exitCode = WRITE ? (skipped ? 2 : 0) : pending.length ? 1 : 0;
})();
