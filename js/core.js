/* Noyau : utilitaires, stockage local, révision espacée, XP, badges */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  const plain = s => String(s).replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

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

  /* ---------- Stockage ---------- */
  const KEY = 'droit-des-biens.v1';
  const fresh = () => ({ name: '', xp: 0, items: {}, days: {}, streak: 0, best: 0, last: '', read: {}, badges: {}, flags: {}, stats: { answered: 0, correct: 0, cards: 0 }, exam: [], blitz: 0, examDate: '', cas: {}, cq: {}, prefs: { chapters: [], dark: null } });
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
    if (p < .2) return { k: 0, name: 'Détenu', fem: 'Détenue', line: 'Tu le détiens : il faut encore l\'apprivoiser.' };
    if (p < .5) return { k: 1, name: 'Possédé', fem: 'Possédée', line: 'Tu le possèdes : corpus ok, il manque l\'animus.' };
    if (p < .8) return { k: 2, name: 'Usucapé', fem: 'Usucapée', line: 'Presque à toi : encore un peu de temps.' };
    return { k: 3, name: 'Propriété', fem: 'Propriété', line: 'Propriétaire : il est à toi.' };
  }
  function dueItems(list) { const now = Date.now(); return list.filter(x => { const it = S.items[x.id]; return it && it.d <= now; }); }
  function pickSmart(list, n) {
    const now = Date.now();
    const sc = x => { const it = S.items[x.id]; if (!it) return 1 + Math.random() * .4; if (it.d <= now) return 2 + (5 - it.b) * .2 + Math.random() * .3; return (5 - it.b) * .1 + Math.random() * .5; };
    return list.map(x => [sc(x), x]).sort((a, b) => b[0] - a[0]).slice(0, n).map(a => a[1]);
  }

  /* ---------- XP, niveaux, série ---------- */
  const TITLES = ['Détentrice précaire', 'Possesseure', 'Possesseure de bonne foi', 'Usucapante', 'Propriétaire', 'Propriétaire exclusive', 'Notaire', 'Magistrate', 'Conseillère à la Cour de cassation', 'Doyenne de la faculté'];
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
    { id: 'read', n: 'Lectrice', d: 'Relire les 5 fiches', t: () => DATA.chapters.every(c => S.read[c.id]) },
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

  window.U = { $, $$, h, add, esc, md, plain, norm, shuffle, sample, mean, dayKey, chap };
  window.ST = {
    get S() { return S; }, save, grade, mastery, globalMastery, state, dueItems, pickSmart, masteryKinds,
    gain, levelOf, levelFloor, titleOf, currentStreak, BADGES, checkBadges, onKey, clearKeys,
    onHud: f => hudListeners.push(f), reset() { S = fresh(); save(); },
    replace(o) { S = Object.assign(fresh(), o); save(); }
  };
})();
