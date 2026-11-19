/* Photography tile for "A Little More About Me" (homepage).
   One tile is added to the end of the photo row. Clicking it opens ONLY the photos listed here
   in the shared lightbox (JS/site.js treats the tile as its own group).

   HOW TO USE: copy 4 to 6 photos into images/Photography/, then add one line per photo below.
   While the list is empty nothing is added to the page, so no empty tile or broken image appears.
   Load order: this file is loaded before site.js so the tile gets the same scroll reveal as the
   other tiles. */
(() => {
  const PHOTOS = [
    /* { src: 'images/Photography/example.jpg', alt: 'What the photo shows', width: 1600, height: 1067 }, */
  ];
  const CAPTION = 'Photography';

  const row = document.querySelector('.photo-row');
  if (!row || !PHOTOS.length) return;

  const mk = (tag, cls) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  };
  const zoomable = (p, i, label) => {
    const btn = mk('button', 'zoomable');
    btn.type = 'button';
    btn.setAttribute('aria-label', label);
    const img = mk('img');
    img.src = p.src;
    img.alt = p.alt || `Photograph ${i + 1}`;
    if (p.width) img.width = p.width;
    if (p.height) img.height = p.height;
    img.loading = 'lazy';
    btn.appendChild(img);
    return btn;
  };

  const fig = mk('figure', 'item photo-tile');
  fig.setAttribute('data-lightbox-group', '');
  const ph = mk('div', 'ph');
  ph.appendChild(
    zoomable(
      PHOTOS[0],
      0,
      `Open photography gallery (${PHOTOS.length} photo${PHOTOS.length > 1 ? 's' : ''})`
    )
  );
  fig.appendChild(ph);
  const cap = mk('figcaption');
  cap.textContent = CAPTION;
  fig.appendChild(cap);

  /* The remaining photos stay out of sight; the lightbox steps through them. */
  if (PHOTOS.length > 1) {
    const more = mk('div', 'photo-more');
    more.hidden = true;
    PHOTOS.slice(1).forEach((p, i) =>
      more.appendChild(zoomable(p, i + 1, `Enlarge photograph ${i + 2}`))
    );
    fig.appendChild(more);
  }
  row.appendChild(fig);
})();
