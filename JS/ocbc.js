(() => {
  const $ = (s) => document.querySelector(s);
  /* 3D carousel: radius and height follow the container width (original only measured once) */
  const car = $('#carousel'),
    box = $('#carouselBox'),
    items = [...car.children],
    theta = 360 / items.length;
  let angle = 0,
    radius = 350;
  const layout = () => {
    const w = box.clientWidth,
      cw = Math.max(190, Math.min(300, w * 0.6));
    box.style.setProperty('--card-w', cw + 'px');
    radius = cw * 1.15;
    items.forEach((it, i) => {
      it.style.transform = `rotateY(${theta * i}deg) translateZ(${radius}px)`;
    });
    const h = Math.max(...items.map((i) => i.firstElementChild.offsetHeight));
    car.style.height = h + 'px';
    box.style.height = h + 60 + 'px';
    update();
  };
  const update = () => {
    const act = ((Math.round(-angle / theta) % items.length) + items.length) % items.length;
    items.forEach((it, i) => it.firstElementChild.classList.toggle('active', i === act));
    car.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
  };
  $('#prev').onclick = () => {
    angle += theta;
    update();
  };
  $('#next').onclick = () => {
    angle -= theta;
    update();
  };
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') $('#prev').click();
    if (e.key === 'ArrowRight') $('#next').click();
  });
  addEventListener('resize', layout);
  addEventListener('load', layout);
  layout();

  /* Reflection book: content is embedded from data/reflections.json at build time (works from a folder and on any static host) */
  const open = $('#bookOpen'),
    openBtn = $('#bookOpenBtn'),
    tabs = $('#tabs'),
    list = $('#entries'),
    dlg = $('#dlg');
  let data,
    filter = 'all';
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const draw = () => {
    tabs.innerHTML =
      [...data.tasks.map((t) => [t.id, t.label]), ['all', 'Show All']]
        .map(
          ([id, l]) =>
            `<button class="tab" aria-pressed="${filter === id}" data-f="${id}">${l}</button>`
        )
        .join('') + '<span class="sp"></span><button class="tab" id="closeBook">Close</button>';
    const shown = data.entries.filter((e) => filter === 'all' || e.task === filter);
    list.innerHTML = shown
      .map(
        (e) =>
          `<div class="entry"><button data-i="${data.entries.indexOf(e)}" aria-haspopup="dialog"><span>${esc(e.title)}</span>${icon('zoom')}<span class="sr-only">Read reflection</span></button></div>`
      )
      .join('');
  };
  data = JSON.parse(document.getElementById('reflection-data').textContent);
  draw();
  openBtn.onclick = () => {
    openBtn.hidden = true;
    open.hidden = false;
    openBtn.setAttribute('aria-expanded', true);
    list.focus();
  };
  tabs.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.id === 'closeBook') {
      open.hidden = true;
      openBtn.hidden = false;
      openBtn.setAttribute('aria-expanded', false);
      openBtn.focus();
    } else {
      filter = b.dataset.f;
      draw();
      tabs.querySelector(`[data-f="${filter}"]`).focus();
    }
  };
  list.onclick = (e) => {
    const b = e.target.closest('button[data-i]');
    if (!b) return;
    const en = data.entries[+b.dataset.i];
    $('#dlgTitle').textContent = en.title;
    $('#dlgBody').innerHTML = en.body
      .map((p) => `<p>${p.label ? `<strong>${esc(p.label)}:</strong> ` : ''}${esc(p.text)}</p>`)
      .join('');
    dlg.showModal();
  };
  $('#dlgClose').onclick = () => dlg.close();
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
})();
