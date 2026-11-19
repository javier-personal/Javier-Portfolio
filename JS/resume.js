/* Resume page: format selector (Professional | ATS-Friendly) + a single PDF preview.
   The two PDF paths live ONLY on the tab buttons in HTML/resume.html (data-pdf / data-file).
   Selecting a tab renders that PDF with pdf.js and re-points "Open Preview" and "Download PDF" at it.
   Docs: documentations/resume-format-selector.md */
(() => {
  const tabs = [...document.querySelectorAll('.format-tab')],
    switcher = document.querySelector('.format-switch'),
    box = document.getElementById('viewer'),
    openLink = document.getElementById('open'),
    dlLink = document.getElementById('dl');
  if (!tabs.length || !box) return;

  const FALLBACK =
    '<p class="pdf-status">The preview could not be loaded in this browser. Use Open Preview or Download PDF below.</p>';
  const docs = new Map(); // url -> Promise<PDFDocument>
  const pages = new Map(); // url -> rendered canvases (valid for renderedWidth only)
  let renderedWidth = 0,
    current = tabs[0],
    token = 0; // bumped on every switch/resize so a slow render can never overwrite a newer one

  const contentWidth = () =>
    box.clientWidth -
    parseFloat(getComputedStyle(box).paddingLeft) -
    parseFloat(getComputedStyle(box).paddingRight);

  const getDoc = (url) => {
    if (!docs.has(url)) docs.set(url, pdfjsLib.getDocument(url).promise);
    return docs.get(url);
  };

  const renderPages = async (url, width, myToken) => {
    const doc = await getDoc(url);
    const out = [];
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      if (myToken !== token) return null;
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = page.getViewport({ scale: (width / base.width) * dpr });
      const c = document.createElement('canvas');
      c.className = 'pdf-page';
      c.width = vp.width;
      c.height = vp.height;
      c.setAttribute('role', 'img');
      const fmt = current.querySelector('.format-name').textContent.trim();
      c.setAttribute('aria-label', `${fmt} resume, page ${n} of ${doc.numPages}`);
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      if (myToken !== token) return null;
      out.push(c);
    }
    return out;
  };

  const show = async () => {
    const myToken = ++token,
      url = current.dataset.pdf;
    box.setAttribute('aria-busy', 'true');
    box.setAttribute('aria-labelledby', current.id);
    if (!window.pdfjsLib) {
      box.innerHTML = FALLBACK;
      box.setAttribute('aria-busy', 'false');
      return;
    }
    const width = contentWidth();
    if (width !== renderedWidth) {
      pages.clear(); // cached canvases were drawn for another width
      renderedWidth = width;
    }
    try {
      let canvases = pages.get(url);
      if (!canvases) {
        if (!box.querySelector('.pdf-page')) {
          box.innerHTML = '<p class="pdf-status" role="status">Loading resume preview…</p>';
        }
        canvases = await renderPages(url, width, myToken);
        if (!canvases) return; // superseded by a newer selection
        pages.set(url, canvases);
      }
      if (myToken !== token) return;
      box.replaceChildren(...canvases);
      box.scrollTop = 0;
    } catch (err) {
      if (myToken === token) box.innerHTML = FALLBACK;
    } finally {
      if (myToken === token) box.setAttribute('aria-busy', 'false');
    }
  };

  /* Single place that decides which file every control points at. */
  const select = (tab, focus) => {
    current = tab;
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });
    switcher.dataset.active = tabs.indexOf(tab);
    openLink.href = tab.dataset.pdf;
    dlLink.href = tab.dataset.pdf;
    dlLink.setAttribute('download', tab.dataset.file);
    if (focus) tab.focus();
    show();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => tab !== current && select(tab));
    tab.addEventListener('keydown', (e) => {
      const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      select(tabs[(to + tabs.length) % tabs.length], true);
    });
  });

  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      document.body.dataset.root + 'vendor/pdfjs/pdf.worker.js';
  }
  select(tabs[0]); // Professional is the default

  let timer,
    lastW = box.clientWidth;
  addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (Math.abs(box.clientWidth - lastW) > 20) {
        lastW = box.clientWidth;
        show();
      }
    }, 250);
  });
})();
