/* Filter chips for Projects and Internship pages. Cards carry data-filters="all recent relevant mini". */
(() => {
  const bar = document.getElementById('filters'),
    gallery = document.getElementById('gallery'),
    count = document.getElementById('count');
  if (!bar || !gallery) return;
  const cards = [...gallery.children],
    chips = [...bar.querySelectorAll('button')];
  const apply = (key) => {
    let n = 0;
    cards.forEach((c) => {
      const ok = c.dataset.filters.split(' ').includes(key);
      c.hidden = !ok;
      n += ok;
    });
    chips.forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === key));
    if (count)
      count.textContent = `Showing ${n} of ${cards.length} ${cards.length === 1 ? 'item' : 'projects'}`;
  };
  chips.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));
  apply('all');
})();
