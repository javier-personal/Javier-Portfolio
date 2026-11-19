/* Shared behaviour: header (brand + nav, single source), to-top, lightbox, motion, icons. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  /* >>> Replace the picture and/or name here; every page picks it up <<<
     The header avatar is a small circular crop of this photo (see .avatar in components.css);
     clicking it opens the full photo in the shared lightbox below. */
  const ROOT = document.body.dataset.root || ''; // '' on index.html, '../' on pages in HTML/
  const PROFILE = {
    src: ROOT + 'images/Main-Page/prof_pic_2.PNG',
    name: 'Javier Tan',
    alt: 'Javier Tan Wei-En',
  };
  const PAGES = ROOT ? '' : 'HTML/';
  /* Same items, order and destinations as the original site (Intern opens internship.html first). */
  const NAV = [
    ['Home', ROOT + 'index.html', 'index.html'],
    ['Resume', PAGES + 'resume.html', 'resume.html'],
    ['Intern', PAGES + 'internship.html', 'internship.html'],
    ['Projects', PAGES + 'projects.html', 'projects.html'],
    ['Contact', PAGES + 'contact.html', 'contact.html'],
  ];

  const ICONS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    left: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    right: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>',
    prev: '<path d="M15 18l-6-6 6-6"/>',
    next: '<path d="M9 18l6-6-6-6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    phone:
      '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    linkedin:
      '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M12 13a2.5 2.5 0 015 0v3"/>',
    instagram:
      '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    building:
      '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    target:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  };
  window.icon = (n, cls = '') =>
    `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[n]}</svg>`;
  document
    .querySelectorAll('[data-icon]')
    .forEach((el) => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));

  /* ---- Header component ---- */
  const header = document.getElementById('site-header');
  if (header) {
    const current = document.body.dataset.nav;
    const links = NAV.map(
      ([t, h, k]) =>
        `<li><a href="${h}"${k === current ? ' aria-current="page"' : ''}>${t}</a></li>`
    ).join('');
    header.innerHTML = `
      <div class="brand"><button type="button" class="avatar" aria-label="View ${PROFILE.name}'s profile photo" aria-haspopup="dialog"><img src="${PROFILE.src}" alt="" width="1535" height="1024" decoding="async"></button><a class="brand-name" href="index.html" aria-label="${PROFILE.name}, home">${PROFILE.name}</a></div>
      <nav class="nav-glass" aria-label="Primary"><ul>${links}</ul></nav>
      <button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${icon('menu')}</button>
      <div class="drawer-backdrop" id="backdrop"></div>
      <nav class="drawer" id="drawer" aria-label="Mobile"><button class="menu-btn drawer-close" id="menuClose" aria-label="Close menu">${icon('x')}</button><ul>${links}</ul></nav>`;
    const btn = document.getElementById('menuBtn'),
      drawer = document.getElementById('drawer');
    const setMenu = (open) => {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open);
      drawer.toggleAttribute('inert', !open);
      (open ? document.getElementById('menuClose') : btn).focus();
    };
    drawer.setAttribute('inert', '');
    btn.onclick = () => setMenu(true);
    document.getElementById('menuClose').onclick = () => setMenu(false);
    document.getElementById('backdrop').onclick = () => setMenu(false);
    drawer
      .querySelectorAll('a')
      .forEach((a) =>
        a.addEventListener('click', () => document.body.classList.remove('menu-open'))
      );
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
    });
  }

  /* ---- Footer year, to-top ---- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  const top = document.querySelector('.to-top');
  if (top) {
    top.innerHTML = icon('up');
    addEventListener('scroll', () => top.classList.toggle('show', scrollY > 200), {
      passive: true,
    });
    top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- Lightbox ---- */
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `<button class="lb-btn lb-close" aria-label="Close image">${icon('x')}</button>
    <button class="lb-btn lb-prev" aria-label="Previous image">${icon('prev')}</button>
    <img alt=""><button class="lb-btn lb-next" aria-label="Next image">${icon('next')}</button><div class="lb-caption"></div>`;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img'),
    cap = lb.querySelector('.lb-caption');
  const lbNav = [lb.querySelector('.lb-prev'), lb.querySelector('.lb-next')];
  let group = [],
    idx = 0,
    opener = null;
  const setSingle = (single) => {
    /* Profile photo only: one image (no prev/next, no counter), animated, background scroll locked.
       Gallery lightboxes keep their original behaviour. */
    lbNav.forEach((b) => (b.hidden = single));
    lb.classList.toggle('lb-profile', single);
  };
  const open = () => {
    lb.classList.add('open');
    root.classList.toggle('lb-open', lb.classList.contains('lb-profile')); // scroll lock (components.css)
    lb.querySelector('.lb-close').focus();
  };
  const show = () => {
    const im = group[idx];
    lbImg.src = im.currentSrc || im.src;
    lbImg.alt = im.alt;
    cap.textContent = group.length > 1 ? `${im.alt} (${idx + 1}/${group.length})` : im.alt;
  };
  const close = () => {
    lb.classList.remove('open');
    root.classList.remove('lb-open');
    opener && opener.focus();
  };
  const step = (d) => {
    if (!group.length) return;
    idx = (idx + d + group.length) % group.length;
    show();
  };
  document.addEventListener('click', (e) => {
    /* Header avatar -> the full professional photograph, as a one-image lightbox. */
    const av = e.target.closest('.site-header .avatar');
    if (av) {
      group = [{ src: PROFILE.src, currentSrc: PROFILE.src, alt: PROFILE.alt }];
      idx = 0;
      opener = av;
      setSingle(true);
      show();
      open();
      return;
    }
    const z = e.target.closest('.zoomable');
    if (!z) return;
    const scope = z.closest('[data-lightbox-group]') || document;
    /* A nested [data-lightbox-group] (e.g. the Photography tile) is its own set, not part of the outer one.
       Images with no group wrapper at all form the page-level set (they used to be dropped, so the lightbox never opened). */
    group = [...scope.querySelectorAll('.zoomable img')].filter(
      (i) => (i.closest('[data-lightbox-group]') || document) === scope
    );
    idx = group.indexOf(z.querySelector('img'));
    opener = z;
    setSingle(false);
    show();
    open();
  });
  lb.querySelector('.lb-close').onclick = close;
  lb.querySelector('.lb-prev').onclick = () => step(-1);
  lb.querySelector('.lb-next').onclick = () => step(1);
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });
  addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'Tab') {
      const f = [...lb.querySelectorAll('button')].filter((b) => !b.hidden);
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  /* ---- Motion: scroll-triggered reveals that replay (CSS lives in components.css) ----
     Pages whose <body> has data-motion="off" (OCBC Internship page) and visitors who prefer
     reduced motion get none of this: html.motion is never added, so nothing is hidden or animated. */
  const MOTION = [
    /* [selector, effect: up | down | left | right | zoom | pop] */
    ['.page-title, .intro-copy > h1, .tagline', 'down'],
    ['.page-wrap > .lead, .filters, .result-count, .stats-head, .s-projects .head', 'up'],
    ['.gallery > .card, .facts > .fact, .project-hero, .section-title, .gallery-count', 'up'],
    ['.page-end, .form-card, .contact-info, .resume-viewer, .cred', 'up'],
    ['.intro-card, .work-timeline, .intern, .about-card, .photo-row .item, .touch', 'up'],
    ['.back-link, .alt > .ph, .work-grid > .ph', 'left'],
    ['.intro-photo, .alt > .copy, .work-grid > .copy, .intern .info > div', 'right'],
    ['.shots > .shot', 'zoom'],
    ['.chips li, .stat', 'pop'],
  ];
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  let io = null,
    tagged = [];
  const reveal = (entries) => {
    let n = 0;
    entries
      .filter((en) => en.isIntersecting)
      .sort(
        (a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top ||
          a.boundingClientRect.left - b.boundingClientRect.left
      )
      .forEach((en) => {
        const pop = en.target.dataset.anim === 'pop';
        en.target.style.transitionDelay = Math.min(n++, 7) * (pop ? 45 : 80) + 'ms';
        en.target.classList.add('in-view');
      });
    entries
      .filter((en) => !en.isIntersecting)
      .forEach((en) => {
        en.target.style.transitionDelay = '0ms';
        en.target.classList.remove('in-view');
      });
  };
  const startMotion = () => {
    if (io || !('IntersectionObserver' in window)) return;
    root.classList.add('motion');
    io = new IntersectionObserver(reveal, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    MOTION.forEach(([sel, fx]) =>
      document.querySelectorAll(sel).forEach((el) => {
        if (el.dataset.anim) return;
        el.dataset.anim = fx;
        tagged.push(el);
        io.observe(el);
      })
    );
  };
  const stopMotion = () => {
    if (!io) return;
    io.disconnect();
    io = null;
    root.classList.remove('motion');
    tagged.forEach((el) => {
      el.removeAttribute('data-anim');
      el.classList.remove('in-view');
      el.style.transitionDelay = '';
    });
    tagged = [];
  };
  if (document.body.dataset.motion !== 'off') {
    if (!mq.matches) startMotion();
    mq.addEventListener('change', () => (mq.matches ? stopMotion() : startMotion()));
    /* Back/forward cache restores the page as it was; re-observe so the reveals replay. */
    addEventListener('pageshow', (e) => {
      if (!e.persisted || !io) return;
      tagged.forEach((el) => {
        el.classList.remove('in-view');
        io.unobserve(el);
        io.observe(el);
      });
    });
  }
})();
