/* Renders every page of the resume PDF as a responsive canvas. Falls back to download/open links. */
(() => {
  const url = document.body.dataset.pdf,
    box = document.getElementById('viewer'),
    status = document.getElementById('pdfStatus');
  const fail = () => {
    box.innerHTML = `<div class="pdf-fallback"><p>The preview could not be loaded in this browser.</p>
      <a class="btn" href="${url}" download>Download Resume</a> <a class="btn btn-glass" href="${url}" target="_blank" rel="noopener">Open in new tab</a></div>`;
  };
  if (!window.pdfjsLib) return fail();
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    document.body.dataset.root + 'vendor/pdfjs/pdf.worker.js';
  let doc, timer;
  const render = async () => {
    const width = box.clientWidth - parseFloat(getComputedStyle(box).paddingLeft) * 2;
    const frag = document.createDocumentFragment();
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = page.getViewport({ scale: (width / base.width) * dpr });
      const c = document.createElement('canvas');
      c.className = 'pdf-page';
      c.width = vp.width;
      c.height = vp.height;
      c.setAttribute('role', 'img');
      c.setAttribute('aria-label', `Resume page ${n} of ${doc.numPages}`);
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      frag.appendChild(c);
    }
    box.replaceChildren(frag);
  };
  pdfjsLib
    .getDocument(url)
    .promise.then((d) => {
      doc = d;
      return render();
    })
    .catch(fail);
  let lastW = box.clientWidth;
  addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (doc && Math.abs(box.clientWidth - lastW) > 20) {
        lastW = box.clientWidth;
        render();
      }
    }, 250);
  });
})();
