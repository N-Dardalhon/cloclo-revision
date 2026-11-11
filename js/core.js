/* Noyau : utilitaires, stockage local, révision espacée, XP, badges */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ---------- Lexique : définitions affichées au survol des mots en gras ---------- */
  // Clé de recherche : sans accents, sans article, sans pluriel simple (« les vices cachés » = « Vice caché »)
  const lexKey = s => norm(s).replace(/\([^)]*\)/g, ' ').replace(/[’']/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim()
    .replace(/^(le|la|l|les|un|une|des|du|de|d) /, '')
    .split(' ').map(w => w.length > 3 && /[sx]$/.test(w) ? w.slice(0, -1) : w).join(' ');
  let LEX = null;
  function lexicon() {
    if (LEX) return LEX;
    LEX = new Map();
    const put = (term, def, ch, alias) => {
      if (!term || !def) return;
      [term].concat(alias || []).forEach(t => { const k = lexKey(t); if (k && !LEX.has(k)) LEX.set(k, { term: String(term), def, ch }); });
    };
    const fromChapter = (id, o) => {
      (o.gloss || []).forEach(g => put(g[0], g[1], id));
      (o.fiche || []).forEach(b => { if (b[0] === 'def') put(b[1], b[2], id); });
    };
    const mine = new Set(DATA.chapters.map(c => c.id));
    Object.keys(DATA.all).filter(id => mine.has(id)).forEach(id => fromChapter(id, DATA.all[id])); // la matière en cours d'abord
    (window.LEXIQUE || []).forEach(x => put(x[0], x[1], null, x[2]));
    Object.keys(DATA.all).filter(id => !mine.has(id)).forEach(id => fromChapter(id, DATA.all[id]));
    return LEX;
  }
  const lookup = s => lexicon().get(lexKey(String(s).replace(/<[^>]+>/g, ''))) || null;
  const md = (s, noLex) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, (m, t) => !noLex && lookup(t) ? '<strong class="gl" data-gl="' + esc(lexKey(t)) + '">' + t + '</strong>' : '<strong>' + t + '</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  const plain = s => String(s).replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');

  function h(tag, a, ...kids) {
    const el = document.createElement(tag);
    if (a) for (const k in a) {
      const v = a[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') { for (const sk in v) { if (sk.startsWith('--')) el.style.setProperty(sk, v[sk]); else el.style[sk] = v[sk]; } }
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat(Infinity).forEach(c => { if (c == null || c === false) return; el.append(c.nodeType ? c : document.createTextNode(c)); });
    return el;
  }
  function add(el, ...kids) { kids.flat(Infinity).forEach(c => { if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(c)); }); return el; }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const sample = (a, n) => shuffle(a).slice(0, n);
  const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
  const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const chap = id => DATA.chapters.find(c => c.id === id);
  DATA.trees = DATA.trees.filter(t => chap(t.ch)); // schémas de la matière choisie

  /* ---------- Stockage ---------- */
  const KEY = SITE.key || 'droit-des-biens.v1';
  const fresh = () => ({ name: '', xp: 0, items: {}, days: {}, streak: 0, best: 0, last: '', read: {}, badges: {}, flags: {}, stats: { answered: 0, correct: 0, cards: 0 }, exam: [], blitz: 0, examDate: '', cas: {}, cq: {}, ep: {}, prefs: { chapters: [], dark: null } });
  let S;
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = fresh(); }
  if (!S.examDate && window.SITE && SITE.exam) S.examDate = SITE.exam;
  S.prefs = Object.assign({ chapters: [], dark: null }, S.prefs);
  S.stats = Object.assign({ answered: 0, correct: 0, cards: 0 }, S.stats);
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* stockage indisponible : on continue en mémoire */ } }

  /* ---------- Révision espacée (boîtes de Leitner) ---------- */
  const DAYS = [0, 1, 2, 4, 8, 16, 32];
  function grade(id, res) { // res : 2 = juste, 1 = presque, 0 = raté
    const it = S.items[id] || { b: 0, d: 0, s: 0, w: 0 };
    it.s++;
    if (res === 2) it.b = Math.min(5, it.b + 1);
    else if (res === 1) it.b = Math.max(it.b, 1);
    else { it.b = Math.max(0, it.b - 2); it.w++; }
    it.d = Date.now() + (res === 0 ? 0 : DAYS[it.b]) * 864e5;
    S.items[id] = it;
    S.stats.answered++; if (res === 2) S.stats.correct++;
    save();
  }
  const masteryKinds = () => [...DATA.cards, ...DATA.qcm, ...DATA.vf, ...DATA.arts, ...DATA.juris];
  function mastery(ch) {
    const list = masteryKinds().filter(x => x.ch === ch);
    return mean(list.map(x => ((S.items[x.id] || {}).b || 0) / 5));
  }
  const globalMastery = () => mean(DATA.chapters.map(c => mastery(c.id)));
  function state(p) {
    const k = p < .2 ? 0 : p < .5 ? 1 : p < .8 ? 2 : 3;
    return Object.assign({ k }, SITE.states[k]);
  }
  function dueItems(list) { const now = Date.now(); return list.filter(x => { const it = S.items[x.id]; return it && it.d <= now; }); }
  function pickSmart(list, n) {
    const now = Date.now();
    const sc = x => { const it = S.items[x.id]; if (!it) return 1 + Math.random() * .4; if (it.d <= now) return 2 + (5 - it.b) * .2 + Math.random() * .3; return (5 - it.b) * .1 + Math.random() * .5; };
    return list.map(x => [sc(x), x]).sort((a, b) => b[0] - a[0]).slice(0, n).map(a => a[1]);
  }

  /* ---------- XP, niveaux, série ---------- */
  const TITLES = SITE.titles;
  const levelOf = xp => Math.floor(Math.sqrt(xp / 40)) + 1;
  const levelFloor = l => 40 * (l - 1) * (l - 1);
  const titleOf = l => TITLES[Math.min(l, TITLES.length) - 1];

  const hudListeners = [];
  function touchDay(points) {
    const t = dayKey();
    if (S.last !== t) {
      const y = dayKey(new Date(Date.now() - 864e5));
      S.streak = S.last === y ? S.streak + 1 : 1;
      S.best = Math.max(S.best || 0, S.streak);
      S.last = t;
    }
    S.days[t] = (S.days[t] || 0) + points;
  }
  function gain(n, why) {
    if (!n) return;
    const before = levelOf(S.xp);
    S.xp += n; touchDay(n);
    save();
    const after = levelOf(S.xp);
    if (after > before) { UI.toast('Niveau ' + after + ' : ' + titleOf(after), 'level'); UI.confetti(); }
    checkBadges();
    hudListeners.forEach(f => f());
  }
  const currentStreak = () => {
    const t = dayKey(), y = dayKey(new Date(Date.now() - 864e5));
    return (S.last === t || S.last === y) ? S.streak : 0;
  };

  const BADGES = [
    { id: 'first', n: 'Premier tampon', d: 'Répondre à une première question', t: () => S.stats.answered >= 1 },
    { id: 'xp100', n: 'Clerc de notaire', d: 'Atteindre 100 XP', t: () => S.xp >= 100 },
    { id: 'xp500', n: 'Greffière', d: 'Atteindre 500 XP', t: () => S.xp >= 500 },
    { id: 'xp1500', n: 'Magistrate en herbe', d: 'Atteindre 1 500 XP', t: () => S.xp >= 1500 },
    { id: 'st3', n: 'Trois jours d\'affilée', d: 'Réviser 3 jours de suite', t: () => S.best >= 3 },
    { id: 'st7', n: 'Semaine pleine', d: 'Réviser 7 jours de suite', t: () => S.best >= 7 },
    { id: 'perfect', n: 'Sans faute', d: 'Finir un quiz sans erreur', t: () => !!S.flags.perfect },
    { id: 'cards50', n: 'Fichiste', d: 'Retourner 50 flashcards', t: () => S.stats.cards >= 50 },
    { id: 'read', n: 'Lectrice', d: 'Relire les ' + DATA.chapters.length + ' fiches', t: () => DATA.chapters.every(c => S.read[c.id]) },
    { id: 'cas', n: 'Jurisconsulte', d: 'Réussir 3 cas pratiques', t: () => Object.values(S.cas).filter(v => v >= .75).length >= 3 },
    { id: 'blitz', n: 'Éclair', d: '15 bonnes réponses en blitz', t: () => S.blitz >= 15 },
    { id: 'owner', n: 'Propriétaire d\'un chapitre', d: 'Maîtriser un chapitre à 80 %', t: () => DATA.chapters.some(c => mastery(c.id) >= .8) },
    { id: 'all', n: 'Propriétaire du cours', d: 'Maîtriser le cours à 80 %', t: () => globalMastery() >= .8 },
    { id: 'exam', n: 'Mention bien', d: 'Obtenir 14/20 à un examen blanc', t: () => S.exam.some(e => e.score >= 14) }
  ];
  function checkBadges() {
    BADGES.forEach(b => { if (!S.badges[b.id] && b.t()) { S.badges[b.id] = Date.now(); save(); UI.toast('Badge : ' + b.n, 'badge'); } });
  }

  /* ---------- Clavier ---------- */
  let keyFns = [];
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input,textarea,select')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    keyFns.forEach(f => f(e));
  });
  const onKey = f => keyFns.push(f);
  const clearKeys = () => { keyFns = []; };

  window.U = { $, $$, h, add, esc, md, plain, norm, lookup, lexKey, lexicon, shuffle, sample, mean, dayKey, chap };
  window.ST = {
    get S() { return S; }, save, grade, mastery, globalMastery, state, dueItems, pickSmart, masteryKinds,
    gain, levelOf, levelFloor, titleOf, currentStreak, BADGES, checkBadges, onKey, clearKeys,
    onHud: f => hudListeners.push(f), reset() { S = fresh(); save(); },
    replace(o) { S = Object.assign(fresh(), o); save(); }
  };
})();
