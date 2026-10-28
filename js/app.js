/* Coque de l'application : navigation, thème, routage */
(function () {
  'use strict';
  const { h, $, $$ } = U;
  const { icon } = UI;
  const S = () => ST.S;

  const NAV = [
    ['', 'Accueil', 'home'],
    ['cours', 'Cours', 'book'],
    ['jouer', 'Jouer', 'play'],
    ['progres', 'Progrès', 'trophy']
  ];
  const GROUP = {
    '': '', home: '', cours: 'cours', chapitre: 'cours', fiche: 'cours', glossaire: 'cours', schemas: 'cours', chiffres: 'cours', jurisprudence: 'cours',
    jouer: 'jouer', quiz: 'jouer', cartes: 'jouer', vf: 'jouer', articles: 'jouer', associer: 'jouer', cas: 'jouer', questions: 'jouer', examen: 'jouer', progres: 'progres'
  };
  const ROUTES = {
    '': Views.home, home: Views.home, cours: Views.cours, chapitre: Views.chapitre, fiche: Views.fiche, jouer: Views.jouer, glossaire: Views.glossaire,
    chiffres: Views.chiffres, jurisprudence: Views.jurisprudence, schemas: Views.schemas, progres: Views.progres,
    quiz: Games.quiz, cartes: Games.cartes, vf: Games.vf, articles: Games.articles, associer: Games.associer, cas: Games.cas, questions: Games.questions, examen: Games.examen
  };

  /* ---------- Thème ---------- */
  function applyTheme() {
    const d = S().prefs.dark;
    const dark = d == null ? matchMedia('(prefers-color-scheme: dark)').matches : d;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const m = $('meta[name=theme-color]'); if (m) m.content = dark ? '#0F1B16' : '#EDF2EC';
    $$('.theme-btn').forEach(b => { b.replaceChildren(icon(dark ? 'sun' : 'moon', 20)); b.setAttribute('aria-label', dark ? 'Passer en thème clair' : 'Passer en thème sombre'); });
  }
  function toggleTheme() { const cur = document.documentElement.dataset.theme === 'dark'; S().prefs.dark = !cur; ST.save(); applyTheme(); }

  /* ---------- Logo ---------- */
  const logo = () => {
    const s = UI.svg('svg', { viewBox: '0 0 40 40', width: 34, height: 34, 'aria-hidden': 'true', class: 'logo-svg' });
    s.append(UI.svg('rect', { width: 40, height: 40, rx: 8, fill: '#14271F' }));
    [['M5 5h14l-2 13H5Z', '#F2A6A0'], ['M21 5h14v10l-14 3Z', '#F3CE72'], ['M5 21h12l4 14H5Z', '#B9A6EB'], ['M23 21l12-2v16H25Z', '#9ED08A']].forEach(p => s.append(UI.svg('path', { d: p[0], fill: p[1] })));
    return s;
  };

  /* ---------- Coque ---------- */
  function shell() {
    const nav = (cls) => h('nav', { class: cls, 'aria-label': 'Navigation principale' }, NAV.map(n => h('a', { href: '#/' + n[0], 'data-g': n[0], class: 'nav-a' }, icon(n[2], 22), h('span', null, n[1]))));
    const hud = h('div', { class: 'hud', id: 'hud' });
    const searchBtn = () => h('button', { class: 'icon-btn', type: 'button', onclick: Views.search, 'aria-label': 'Rechercher (touche /)', title: 'Rechercher' }, icon('search', 20));
    const themeBtn = () => h('button', { class: 'icon-btn theme-btn', type: 'button', onclick: toggleTheme });
    const rail = h('aside', { id: 'rail' },
      h('a', { class: 'brand', href: '#/' }, logo(), h('span', null, h('b', null, SITE.title), h('small', null, SITE.subtitle))),
      nav('side-nav'), hud, h('div', { class: 'rail-tools' }, searchBtn(), themeBtn()));
    const top = h('header', { id: 'topbar' }, h('a', { class: 'brand', href: '#/' }, logo(), h('b', null, SITE.title)), h('div', { class: 'rail-tools' }, searchBtn(), themeBtn()));
    const main = h('main', { id: 'main', tabindex: '-1' });
    document.body.replaceChildren(
      h('a', { class: 'skip', href: '#main' }, 'Aller au contenu'),
      h('div', { id: 'shell' }, rail, h('div', { id: 'col' }, top, main)),
      nav('tabs'));
    // filtre pour rendre le bord du tampon légèrement irrégulier
    document.body.insertAdjacentHTML('beforeend', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter></svg>');
    ST.onHud(paintHud); paintHud();
  }
  function paintHud() {
    const el = $('#hud'); if (!el) return;
    const s = S(), l = ST.levelOf(s.xp), p = (s.xp - ST.levelFloor(l)) / (ST.levelFloor(l + 1) - ST.levelFloor(l));
    el.replaceChildren(
      h('div', { class: 'hud-top' }, h('b', null, ST.titleOf(l)), h('small', null, 'Niveau ' + l)),
      h('div', { class: 'track' }, h('div', { class: 'fill', style: { width: Math.round(p * 100) + '%' } })),
      h('div', { class: 'hud-bot' }, h('span', null, s.xp + ' XP'), h('span', { class: 'streak' }, icon('flame', 15), ST.currentStreak() + ' j')));
  }

  /* ---------- Routage ---------- */
  let cleanup = null;
  function go() {
    const hash = location.hash.replace(/^#\/?/, '');
    const parts = hash.split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
    const key = parts[0] || '';
    const view = ROUTES[key] || Views.home;
    if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
    ST.clearKeys();
    const main = $('#main');
    $$('.nav-a').forEach(a => a.classList.toggle('on', a.dataset.g === (GROUP[key] != null ? GROUP[key] : '')));
    main.className = 'enter';
    cleanup = view(main, parts.slice(1)) || null;
    window.scrollTo(0, 0);
    document.title = (key ? key.charAt(0).toUpperCase() + key.slice(1) + ' · ' : '') + SITE.title;
  }

  /* ---------- Premier lancement ---------- */
  function welcome() {
    if (S().name || SITE.name || S().flags.askedName) return;
    const input = h('input', { class: 'field big', placeholder: 'Ton prénom', 'aria-label': 'Ton prénom', maxlength: 24 });
    let m;
    const ok = () => { S().name = input.value.trim(); S().flags.askedName = 1; ST.save(); m.close(); go(); };
    m = UI.modal(h('form', { class: 'welcome', onsubmit(e) { e.preventDefault(); ok(); } },
      h('div', { class: 'welcome-logo' }, logo()),
      h('h2', null, 'Bienvenue dans ton cours de droit des biens'),
      h('p', null, 'Cinq chapitres, des fiches, des jeux et un plan cadastral qui se colore quand tu maîtrises le cours. Comment on t\'appelle ?'),
      input,
      h('div', { class: 'row-actions' }, h('button', { class: 'btn primary', type: 'submit' }, 'C\'est parti'), h('button', { class: 'btn ghost', type: 'button', onclick() { S().flags.askedName = 1; ST.save(); m.close(); } }, 'Plus tard'))),
      { locked: true, label: 'Bienvenue' });
  }

  /* ---------- Démarrage ---------- */
  shell(); applyTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (S().prefs.dark == null) applyTheme(); });
  addEventListener('hashchange', go);
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input,textarea,select')) return;
    if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); Views.search(); }
  });
  go(); welcome();
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => { });
})();
