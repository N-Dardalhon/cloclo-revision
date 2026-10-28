/* Composants d'interface : toasts, confettis, tampons, carte cadastrale, anneaux */
(function () {
  'use strict';
  const { h, $, chap, mean } = U;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = (tag, a = {}, ...kids) => {
    const el = document.createElementNS(NS, tag);
    for (const k in a) el.setAttribute(k, a[k]);
    kids.flat().forEach(c => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  };

  const ICONS = {
    home: 'M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10',
    book: 'M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5ZM8 17h10',
    play: 'M8 5.5v13l11-6.5-11-6.5Z',
    trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4.5c0 3 1.5 4.5 3.5 5M16 6h3.5c0 3-1.5 4.5-3.5 5M12 13v4M8.5 20h7M10 17h4',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5.5 12.5L21 21',
    moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4',
    flame: 'M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.2 1 1.8 1.7 2C10.5 8 11 5.5 12 3Z',
    check: 'm5 12.5 4.5 4.5L19 7.5',
    x: 'M6 6l12 12M18 6 6 18',
    left: 'M15 5l-7 7 7 7',
    right: 'M9 5l7 7-7 7',
    flip: 'M4 8h13l-3-3M20 16H7l3 3',
    clock: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4v4.5l3 1.5',
    cards: 'M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-3 3v10a2 2 0 0 0 2 2',
    quiz: 'M12 17v.01M9.2 9.2a3 3 0 1 1 4.3 2.7c-.9.5-1.5 1.1-1.5 2.1M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z',
    scale: 'M12 4v16M7 20h10M5 8h14M5 8l-2.5 6a3 3 0 0 0 5 0L5 8Zm14 0-2.5 6a3 3 0 0 0 5 0L19 8Z',
    pen: 'M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19l-4 1Z',
    gavel: 'M13 6l5 5M9.5 9.5l5 5M4 20l7-7M8 4.5l4.5 4.5-3 3L5 7.5l3-3Zm6.5 6.5L19 15.5l-3 3-4.5-4.5',
    flow: 'M5 4h6v5H5V4Zm8 11h6v5h-6v-5ZM8 9v3.5a2.5 2.5 0 0 0 2.5 2.5H13',
    list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
    hash: 'M5 9h14M5 15h14M10 4 8 20M16 4l-2 16',
    link: 'M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3A4 4 0 0 0 11 18.6l1-1',
    star: 'm12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8L12 3.5Z',
    bolt: 'M13 3 5 13.5h6L10 21l9-11h-6.5L13 3Z',
    map: 'M9 4 3.5 6v14L9 18m0-14 6 2m-6-2v14m6-12 5.5-2v14L15 20m0-14v14'
  };
  const icon = (n, s = 20) => {
    const el = svg('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', class: 'ico' });
    el.append(svg('path', { d: ICONS[n] || '' }));
    return el;
  };

  /* ---------- Toasts ---------- */
  function toast(msg, kind) {
    let box = $('#toasts');
    if (!box) { box = h('div', { id: 'toasts', 'aria-live': 'polite' }); document.body.append(box); }
    const t = h('div', { class: 'toast ' + (kind || '') }, kind === 'badge' ? icon('star', 18) : kind === 'level' ? icon('bolt', 18) : null, h('span', null, msg));
    box.append(t);
    setTimeout(() => t.classList.add('out'), 3200);
    setTimeout(() => t.remove(), 3700);
  }

  /* ---------- Confettis (pastels de cadastre) ---------- */
  function confetti(n = 90) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = h('canvas', { class: 'confetti', 'aria-hidden': 'true' });
    cv.width = innerWidth; cv.height = innerHeight; document.body.append(cv);
    const ctx = cv.getContext('2d');
    const cols = DATA.chapters.map(c => c.col).concat(['#E5304F', '#14271F']);
    const P = Array.from({ length: n }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .55, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4,
      w: 6 + Math.random() * 8, hgt: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[Math.floor(Math.random() * cols.length)]
    }));
    let f = 0;
    (function tick() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      P.forEach(p => {
        p.vy += .36; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vx *= .99;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.hgt / 2, p.w, p.hgt); ctx.restore();
      });
      if (++f < 110) requestAnimationFrame(tick); else cv.remove();
    })();
  }

  /* ---------- Tampon de notaire ---------- */
  function stamp(parent, text, kind) {
    parent.querySelectorAll(':scope > .stamp').forEach(s => s.remove());
    const s = h('div', { class: 'stamp ' + (kind || 'ok'), 'aria-hidden': 'true', style: { '--rot': (-14 + Math.random() * 9).toFixed(1) + 'deg' } }, text);
    parent.append(s);
    return s;
  }

  /* ---------- Anneau de progression ---------- */
  function ring(p, col, size = 56, label) {
    const r = size / 2 - 5, c = 2 * Math.PI * r;
    const el = svg('svg', { viewBox: `0 0 ${size} ${size}`, width: size, height: size, class: 'ring', role: 'img', 'aria-label': Math.round(p * 100) + ' %' });
    el.append(svg('circle', { cx: size / 2, cy: size / 2, r, fill: 'none', 'stroke-width': 5, class: 'ring-bg' }));
    el.append(svg('circle', { cx: size / 2, cy: size / 2, r, fill: 'none', 'stroke-width': 5, 'stroke-linecap': 'round', stroke: col, 'stroke-dasharray': c, 'stroke-dashoffset': c * (1 - p), transform: `rotate(-90 ${size / 2} ${size / 2})` }));
    el.append(svg('text', { x: size / 2, y: size / 2 + 4, 'text-anchor': 'middle', class: 'ring-t' }, label != null ? label : Math.round(p * 100)));
    return el;
  }

  /* ---------- Carte cadastrale ---------- */
  function parcelMap(onGo) {
    const T = [[0, 0], [214, 0], [430, 0], [640, 0]];
    const M = [[0, 190], [204, 172], [446, 206], [640, 178]];
    const Sp = [318, 198], B = [[0, 400], [286, 400], [640, 400]];
    const polys = {
      c1: [T[0], T[1], M[1], M[0]],
      c2: [T[1], T[2], M[2], Sp, M[1]],
      c3: [T[2], T[3], M[3], M[2]],
      c4: [M[0], M[1], Sp, B[1], B[0]],
      c5: [Sp, M[2], M[3], B[2], B[1]]
    };
    const root = svg('svg', { viewBox: '-8 -8 656 416', class: 'map', role: 'group', 'aria-label': 'Plan cadastral du cours : une parcelle par chapitre' });
    const defs = svg('defs');
    defs.append(svg('pattern', { id: 'hatch', width: 8, height: 8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, svg('rect', { width: 8, height: 8, class: 'hatch-bg' }), svg('line', { x1: 0, y1: 0, x2: 0, y2: 8, class: 'hatch-line' })));
    root.append(defs);
    const tweens = [];
    DATA.chapters.forEach(c => {
      const pts = polys[c.id];
      const cx = mean(pts.map(p => p[0])), cy = mean(pts.map(p => p[1]));
      const sh = pts.map(p => [cx + (p[0] - cx) * .94, cy + (p[1] - cy) * .93]);
      const d = 'M' + sh.map(p => p.map(v => v.toFixed(1)).join(',')).join('L') + 'Z';
      const ys = sh.map(p => p[1]), y0 = Math.min(...ys), y1 = Math.max(...ys), hgt = y1 - y0;
      const m = ST.mastery(c.id), stt = ST.state(m);
      const a = svg('a', { href: '#/chapitre/' + c.id, class: 'parcel', 'aria-label': `Chapitre ${c.n} : ${c.title}. ${Math.round(m * 100)} % maîtrisé` });
      const clip = svg('clipPath', { id: 'clip-' + c.id });
      const rect = svg('rect', { x: -10, y: y1, width: 660, height: hgt + 4 });
      clip.append(rect); defs.append(clip);
      a.append(svg('path', { d, class: 'p-base' }));
      a.append(svg('path', { d, class: 'p-fill', fill: c.col, 'clip-path': `url(#clip-${c.id})` }));
      a.append(svg('path', { d, class: 'p-line' }));
      sh.forEach(p => a.append(svg('rect', { x: p[0] - 3.5, y: p[1] - 3.5, width: 7, height: 7, class: 'borne' })));
      const lx = cx, ly = cy;
      a.append(svg('text', { x: lx, y: ly - 4, 'text-anchor': 'middle', class: 'p-num' }, c.n));
      a.append(svg('text', { x: lx, y: ly + 24, 'text-anchor': 'middle', class: 'p-name' }, c.short));
      a.append(svg('text', { x: lx, y: ly + 46, 'text-anchor': 'middle', class: 'p-state' }, `${stt.fem} · ${Math.round(m * 100)} %`));
      root.append(a);
      tweens.push({ rect, from: y1, to: y1 - hgt * Math.max(m, 0.0001) - (m > 0 ? 2 : 0) });
    });
    // petite animation d'arrivée : les parcelles se remplissent
    let t0 = null;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function step(now) {
      if (t0 == null) t0 = now;
      const k = reduce ? 1 : Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - k, 3);
      tweens.forEach(t => t.rect.setAttribute('y', (t.from + (t.to - t.from) * e).toFixed(1)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return root;
  }

  /* ---------- Sélecteur de chapitres ---------- */
  function chapterPicker(onChange) {
    const sel = new Set(ST.S.prefs.chapters.length ? ST.S.prefs.chapters : DATA.chapters.map(c => c.id));
    const wrap = h('div', { class: 'chips', role: 'group', 'aria-label': 'Chapitres' });
    function paint() {
      wrap.replaceChildren(
        h('button', { class: 'chip all' + (sel.size === DATA.chapters.length ? ' on' : ''), type: 'button', onclick() { DATA.chapters.forEach(c => sel.add(c.id)); commit(); } }, 'Tous'),
        ...DATA.chapters.map(c => h('button', {
          class: 'chip' + (sel.has(c.id) ? ' on' : ''), type: 'button', style: { '--c': c.col }, 'aria-pressed': sel.has(c.id),
          title: c.title,
          onclick() { sel.has(c.id) ? (sel.size > 1 && sel.delete(c.id)) : sel.add(c.id); commit(); }
        }, h('i'), 'Ch. ' + c.n + ' · ' + c.short))
      );
    }
    function commit() { ST.S.prefs.chapters = [...sel]; ST.save(); paint(); onChange && onChange(new Set(sel)); }
    paint();
    wrap.get = () => new Set(sel);
    return wrap;
  }

  /* ---------- Modale ---------- */
  function modal(content, opts = {}) {
    const prev = document.activeElement;
    const back = h('div', { class: 'modal-back', onmousedown(e) { if (e.target === back && !opts.locked) close(); } });
    const box = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': opts.label || 'Fenêtre' }, content);
    back.append(box); document.body.append(back);
    function close() { back.remove(); document.removeEventListener('keydown', esc); prev && prev.focus && prev.focus(); opts.onClose && opts.onClose(); }
    function esc(e) { if (e.key === 'Escape' && !opts.locked) close(); }
    document.addEventListener('keydown', esc);
    setTimeout(() => { const f = box.querySelector('input,button,textarea'); f && f.focus(); }, 30);
    return { close, box };
  }

  /* ---------- Barre de session ---------- */
  function sessionBar(title, i, n, onQuit, extra) {
    return h('div', { class: 'sbar' },
      h('button', { class: 'icon-btn', type: 'button', onclick: onQuit, 'aria-label': 'Quitter la session', title: 'Quitter' }, icon('x', 18)),
      h('div', { class: 'sbar-mid' },
        h('div', { class: 'sbar-title' }, title),
        h('div', { class: 'track', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': n, 'aria-valuenow': i }, h('div', { class: 'fill', style: { width: (n ? (i / n) * 100 : 0) + '%' } }))),
      h('div', { class: 'sbar-n' }, extra || `${Math.min(i + 1, n)}/${n}`));
  }

  window.UI = { svg, icon, toast, confetti, stamp, ring, parcelMap, chapterPicker, modal, sessionBar };
})();
