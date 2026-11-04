/* Le cerveau caché.
   Tout le cours (les deux matières) forme un cerveau en 3D, dessiné comme une planche
   d'anatomie gravée au pointillé. Chaque carte, article, arrêt ou définition est un neurone.
   Modes : explorer, demander (recherche locale), récital (voix), interro (voix + micro).
   Accès uniquement par easter egg : taper « cerveau », code Konami, ou 7 taps sur le logo. */
(function () {
  'use strict';
  const { h, md, plain, norm } = U;
  const { icon } = UI;
  const UNLOCK = 'cloclo.brain';
  const unlocked = () => { try { return localStorage.getItem(UNLOCK) === '1'; } catch (e) { return false; } };

  /* ================= Données ================= */
  function buildItems() {
    const items = [];
    MATIERES.forEach((M, mi) => {
      let store = {};
      if (M.id === SITE.matiere) store = ST.S.items;
      else { try { store = (JSON.parse(localStorage.getItem(M.key) || '{}').items) || {}; } catch (e) { } }
      M.chapters.forEach(c => {
        const o = DATA.all[c.id]; if (!o) return;
        const push = (kind, i, prefix, title, body, ref, ask, answer) => {
          const id = `${prefix}-${c.id}-${i}`, it = store[id];
          items.push({ id, kind, ch: c.id, chap: c, mat: M, hemi: mi === 0 ? -1 : 1, title, body, ref: ref || '', ask, answer, m: it ? (it.b || 0) / 5 : 0, gradable: M.id === SITE.matiere });
        };
        (o.cards || []).forEach((x, i) => push('Carte', i, 'k', x[0], x[1], x[2], x[0], x[1]));
        (o.qcm || []).forEach((x, i) => push('Quiz', i, 'q', x[0], '**' + x[1] + '**' + (x[3] ? ' — ' + x[3] : ''), x[4], x[0], x[1] + (x[3] ? '. ' + x[3] : '')));
        (o.vf || []).forEach((x, i) => push('Vrai ou faux', i, 'v', x[0], (x[1] ? '**Vrai.** ' : '**Faux.** ') + (x[2] || ''), '', 'Vrai ou faux ? ' + x[0], (x[1] ? 'Vrai. ' : 'Faux. ') + (x[2] || '')));
        (o.arts || []).forEach((x, i) => { const t = x[1].replace(/\{\{(.+?)\}\}/g, '**$1**'); push('Article', i, 'a', x[0], t, x[0], 'Que dit l\'' + x[0].replace(/^Art\./, 'article') + ' ?', t); });
        (o.gloss || []).forEach((x, i) => push('Définition', i, 'g', x[0], x[1], x[2], 'Que signifie « ' + x[0] + ' » ?', x[1]));
        (o.juris || []).forEach((x, i) => push('Arrêt', i, 'j', x[0], x[2] + (x[3] ? ' *' + x[3] + '*' : ''), x[0], 'Que retient l\'arrêt ' + x[0] + ' ?', x[2]));
        (o.coursq || []).forEach((x, i) => push('Question de cours', i, 'cq', x[0], x[2], '', x[0], x[2]));
        (o.nums || []).forEach((x, i) => push('Chiffre', i, 'n', x[0], x[1], x[2], 'À quoi correspond « ' + x[0] + ' » ?', x[1]));
        (o.cas || []).forEach((x, i) => push('Cas pratique', i, 'cas', x.title, x.corrige, '', null, null));
      });
    });
    return items;
  }
  const refsOf = s => { const out = new Set(); String(s).replace(/\bart(?:icles?|\.)?\s*(L\s?)?(\d{3,4}(?:-\d+)?)/gi, (_, l, n) => { out.add((l ? 'L' : '') + n); }); return [...out]; };

  /* ================= Recherche locale (BM25) ================= */
  const STOP = new Set(('le la les un une des de du d l a au aux et ou en dans par pour sur avec sans ce cet cette ces qui que quoi quel quelle quels quelles est sont c qu ne pas plus se sa son ses leur leurs il elle on nous vous ils elles je j tu me m te t moi toi y comment pourquoi quand combien dit dire faut peut etre avoir fait cest quest explique expliquer definition definir signifie veut veux sais savoir parle parler cours chose quoi entre lui leur dont donc car mais si tout tous toute toutes ca cela celui celle ceux').split(' '));
  const stem = w => w.length > 5 ? w.replace(/(ements|ement|ations|ation|ites|ite|eurs|eur|euses|euse|ives|ive|ifs|if|ables|able|es|s|x|e)$/, '') : w.replace(/s$/, '');
  const toks = s => norm(plain(String(s))).replace(/[^a-z0-9]+/g, ' ').split(' ').filter(w => w.length > 1 && !STOP.has(w)).map(stem);
  function makeIndex(items) {
    const docs = items.map(it => { const t = toks(it.title + ' ' + it.title + ' ' + it.body + ' ' + it.ref); const tf = new Map(); t.forEach(w => tf.set(w, (tf.get(w) || 0) + 1)); return { tf, len: t.length }; });
    const df = new Map(); docs.forEach(d => d.tf.forEach((_, w) => df.set(w, (df.get(w) || 0) + 1)));
    const avg = docs.reduce((a, d) => a + d.len, 0) / Math.max(1, docs.length), N = docs.length;
    const boost = { 'Définition': 1.2, 'Carte': 1.15, 'Article': 1.1, 'Arrêt': 1.1, 'Question de cours': 1.05 };
    return function search(q, n = 6) {
      const qt = [...new Set(toks(q))]; if (!qt.length) return [];
      const qrefs = refsOf(q.replace(/^(\d{3,4})$/, 'art. $1'));
      const res = docs.map((d, i) => {
        let s = 0;
        qt.forEach(w => { const f = d.tf.get(w); if (!f) return; const idf = Math.log(1 + (N - df.get(w) + .5) / (df.get(w) + .5)); s += idf * f * 2.2 / (f + 1.2 * (.25 + .75 * d.len / avg)); });
        const it = items[i];
        if (qrefs.length && refsOf(it.ref + ' ' + it.title).some(r => qrefs.includes(r))) s += 6;
        if (norm(q).includes(norm(it.title)) && it.title.length > 4) s += 3;
        return [s * (boost[it.kind] || 1), i];
      }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, n);
      return res.map(x => items[x[1]]);
    };
  }

  /* ================= Voix ================= */
  const synth = window.speechSynthesis;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let voice = null, voiceOn = !!synth, speakId = 0;
  function pickVoice() {
    if (!synth) return;
    const fr = synth.getVoices().filter(v => /^fr/i.test(v.lang));
    voice = fr.find(v => /google|amélie|amelie|audrey|thomas|denise|henri|marie|paul|julie/i.test(v.name) && /fr-FR/i.test(v.lang)) || fr.find(v => /fr-FR/i.test(v.lang)) || fr[0] || null;
  }
  if (synth) { pickVoice(); synth.addEventListener && synth.addEventListener('voiceschanged', pickVoice); }
  function spoken(s) {
    return plain(String(s))
      .replace(/\bArt\.\s*/g, 'article ').replace(/\bart\.\s*/g, 'article ').replace(/\bal\.\s*/g, 'alinéa ')
      .replace(/\b1re civ\./g, 'première chambre civile').replace(/\b(\d)e civ\./g, (_, n) => ({ 2: 'deuxième', 3: 'troisième' }[n] || n + 'e') + ' chambre civile')
      .replace(/\bCom\./g, 'chambre commerciale').replace(/\bAss\. plén\./g, 'Assemblée plénière').replace(/\bCh\. mixte/g, 'chambre mixte').replace(/\bCass\./g, 'Cour de cassation')
      .replace(/\bC\. civ\./g, 'Code civil').replace(/\bC\. com\./g, 'Code de commerce').replace(/\bC\. conso\./g, 'Code de la consommation').replace(/\bC\. trav\./g, 'Code du travail').replace(/\bC\. rural/g, 'Code rural').replace(/\bCPI\b/g, 'Code de la propriété intellectuelle')
      .replace(/\bet s\./g, 'et suivants').replace(/\bex\s*:/gi, 'par exemple :').replace(/§\s*/g, 'paragraphe ')
      .replace(/7\/12/g, 'sept douzièmes').replace(/1\/10/g, 'un dixième').replace(/1\/20/g, 'un vingtième').replace(/1\/2/g, 'la moitié')
      .replace(/\bn°\s*/g, 'numéro ').replace(/[«»"]/g, '').replace(/[→=]>?/g, ', ').replace(/\s+/g, ' ').trim();
  }
  const sentences = s => spoken(s).split(/(?<=[.!?…;:])\s+(?=[A-ZÀ-Ÿ«0-9])/).filter(x => x.trim());
  function stopVoice() { speakId++; if (synth) synth.cancel(); }
  // lit une suite de phrases ; done() n'est appelé que si la lecture n'a pas été interrompue
  function say(text, done, rate = 1) {
    const id = ++speakId; if (synth) synth.cancel();
    const parts = sentences(text);
    if (!synth || !voiceOn || !parts.length) { const t = setTimeout(() => { if (id === speakId && done) done(); }, Math.min(12000, 1400 + plain(text).length * 55)); return; }
    let k = 0;
    const next = () => {
      if (id !== speakId) return;
      if (k >= parts.length) { done && done(); return; }
      const u = new SpeechSynthesisUtterance(parts[k++]); u.lang = 'fr-FR'; if (voice) u.voice = voice; u.rate = rate; u.pitch = 1;
      u.onend = next; u.onerror = () => { if (id === speakId) next(); };
      synth.speak(u);
    };
    next();
  }
  function listen(onText, onEnd) {
    if (!SR) return null;
    const r = new SR(); r.lang = 'fr-FR'; r.interimResults = true; r.continuous = false;
    r.onresult = e => { let t = ''; for (const x of e.results) t += x[0].transcript; onText(t, e.results[e.results.length - 1].isFinal); };
    r.onend = () => onEnd && onEnd(); r.onerror = () => { };
    try { r.start(); } catch (e) { return null; }
    return r;
  }
  function keywords(answer) {
    const bold = [...String(answer).matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]);
    let k = (bold.length ? bold.join(' ') : answer);
    let w = [...new Set(toks(k))].filter(x => x.length > 3);
    if (!bold.length) w = w.slice(0, 6);
    return w.slice(0, 8);
  }

  /* ================= Géométrie du cerveau ================= */
  function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  const nrm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const HC = .3; // demi-écart entre les hémisphères
  function surf(d, hemi, depth) {
    const a = .6, b = .7, c = .98;
    let r = 1 / Math.sqrt((d[0] / a) ** 2 + (d[1] / b) ** 2 + (d[2] / c) ** 2);
    const fold = Math.sin(11 * d[2] + 4 * Math.sin(6 * d[1])) * Math.sin(9 * d[1] + 3 * Math.sin(7 * d[2] + 2 * d[0]));
    r *= (1 + .05 * fold) * depth;
    let x = d[0] * r, y = d[1] * r, z = d[2] * r;
    if (x * hemi < 0) x *= .25;
    if (y < -.36) y = -.36 + (y + .36) * .45;
    if (y < -.1 && z > -.2 && z < .45) y -= .1 * Math.cos((z - .12) * 4.5) * Math.min(1, (-.1 - y) * 4); // lobe temporal
    return [hemi * HC + x, y + .06, z];
  }
  function geometry(items) {
    const R = rng(20261104), gauss = () => { let u = 0; while (!u) u = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * R()); };
    const lobes = [];
    MATIERES.forEach((M, mi) => {
      const hemi = mi === 0 ? -1 : 1, k = M.chapters.length, cols = Math.ceil(k / 2);
      M.chapters.forEach((c, j) => {
        const col = Math.floor(j / 2), row = j % 2;
        const dir = nrm([hemi * .85, row ? -.3 : .5, .92 - 1.84 * (col + .5) / cols]);
        lobes.push({ ch: c.id, chap: c, mat: M, hemi, dir, nodes: [] });
      });
    });
    const lobeOf = id => lobes.find(l => l.ch === id);
    // neurones
    items.forEach(it => {
      const L = lobeOf(it.ch); L.nodes.push(it);
      let d = nrm([L.dir[0] + gauss() * .2, L.dir[1] + gauss() * .2, L.dir[2] + gauss() * .2]);
      if (d[0] * L.hemi < .12) d = nrm([L.hemi * (.12 + Math.abs(d[0])), d[1], d[2]]);
      it.p = surf(d, L.hemi, .86 + .13 * R());
      it.lobe = L;
      it.r = { 'Arrêt': 1.5, 'Article': 1.45, 'Question de cours': 1.4, 'Cas pratique': 1.6, 'Définition': 1.1 }[it.kind] || 1;
    });
    lobes.forEach(L => {
      const n = L.nodes.length || 1;
      L.c = [0, 1, 2].map(k => L.nodes.reduce((a, it) => a + it.p[k], 0) / n);
      L.m = L.nodes.length ? L.nodes.reduce((a, it) => a + it.m, 0) / L.nodes.length : 0;
    });
    // pointillé (gravure) : hémisphères, cervelet, tronc
    const amb = [];
    for (let i = 0; i < 5200; i++) {
      const hemi = i % 2 ? 1 : -1;
      const d = nrm([gauss(), gauss(), gauss()]);
      const p = surf(d, hemi, .985 + .015 * R());
      let best = null, bd = .8;
      lobes.forEach(L => { if (L.hemi !== hemi) return; const dd = d[0] * L.dir[0] + d[1] * L.dir[1] + d[2] * L.dir[2]; if (dd > bd) { bd = dd; best = L; } });
      // la couleur du lobe apparaît à mesure qu'il est maîtrisé
      const tint = best && R() < .18 + .8 * best.m * (bd - .8) / .2 + .25 * (bd - .8) / .2 ? best : null;
      amb.push({ p, L: tint, s: .8 + R() * .7 });
    }
    for (let i = 0; i < 650; i++) {
      const d = nrm([gauss(), gauss(), gauss()]);
      let r = 1 / Math.sqrt((d[0] / .52) ** 2 + (d[1] / .23) ** 2 + (d[2] / .3) ** 2);
      r *= 1 + .06 * Math.sin(48 * d[1] * r);
      amb.push({ p: [d[0] * r, -.42 + d[1] * r, -.66 + d[2] * r], L: null, s: .7 + R() * .5 });
    }
    for (let i = 0; i < 220; i++) {
      const t = R(), a = R() * Math.PI * 2, rr = .1 - t * .025;
      amb.push({ p: [Math.cos(a) * rr, -.34 - .62 * t, -.28 - .14 * t + Math.sin(a) * rr], L: null, s: .7 + R() * .4 });
    }
    // synapses : voisins proches dans le lobe + ponts par articles communs
    const links = [];
    lobes.forEach(L => L.nodes.forEach(a => {
      const near = L.nodes.filter(b => b !== a).map(b => [Math.hypot(a.p[0] - b.p[0], a.p[1] - b.p[1], a.p[2] - b.p[2]), b]).sort((x, y) => x[0] - y[0]).slice(0, 2);
      near.forEach(([, b]) => { if (a.id < b.id) links.push({ a, b, cross: 0 }); });
    }));
    const byRef = new Map();
    items.forEach(it => refsOf(it.title + ' ' + it.ref + ' ' + it.body).forEach(r => { if (!byRef.has(r)) byRef.set(r, []); byRef.get(r).push(it); }));
    byRef.forEach((L, ref) => {
      for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
        const a = L[i], b = L[j]; if (a.ch === b.ch) continue;
        if (R() < (a.hemi !== b.hemi ? .5 : .08)) links.push({ a, b, cross: a.hemi !== b.hemi ? 2 : 1, ref });
      }
    });
    items.forEach(it => { it.links = []; });
    links.forEach(l => { l.a.links.push(l.b); l.b.links.push(l.a); });
    return { lobes, amb, links };
  }

  // replaceChildren() écrirait « null » pour les enfants absents
  const put = (el, ...kids) => el.replaceChildren(...kids.flat().filter(k => k != null && k !== false && k !== ''));

  /* ================= Vue ================= */
  function view(box) {
    if (!unlocked()) { location.hash = '#/'; return; }
    const items = buildItems(), G = geometry(items), search = makeIndex(items);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dark = () => document.documentElement.dataset.theme === 'dark';
    document.body.classList.add('brain-on');

    const cv = h('canvas', { class: 'b-cv', 'aria-label': 'Cerveau en 3D : chaque point est un élément du cours. Glisser pour tourner.' });
    const tip = h('div', { class: 'b-tip', hidden: true });
    const panel = h('aside', { class: 'b-panel', hidden: true, 'aria-live': 'polite' });
    const sub = h('div', { class: 'b-sub', hidden: true, 'aria-live': 'polite' });
    const input = h('input', { class: 'b-ask', type: 'search', placeholder: 'Demande à ton cerveau… (ex : c\'est quoi un pacte de préférence ?)', 'aria-label': 'Poser une question au cours', enterkeyhint: 'search' });
    const micBtn = SR ? h('button', { class: 'b-ico', type: 'button', title: 'Dicter', 'aria-label': 'Dicter la question', onclick: dictate }, micSvg()) : null;
    const voiceBtn = h('button', { class: 'b-ico' + (voiceOn ? ' on' : ''), type: 'button', title: 'Voix', 'aria-label': 'Activer ou couper la voix', onclick() { voiceOn = !voiceOn; if (!voiceOn) stopVoice(); this.classList.toggle('on', voiceOn); this.replaceChildren(spkSvg(voiceOn)); } }, spkSvg(voiceOn));
    const modes = h('div', { class: 'b-modes' },
      h('button', { type: 'button', class: 'b-mode', onclick: () => pickLobe('Récital', startRecital) }, 'Récital'),
      h('button', { type: 'button', class: 'b-mode', onclick: () => pickLobe('Interro', startInterro) }, 'Interro'),
      h('button', { type: 'button', class: 'b-mode ghost', onclick: resetView }, 'Vue d\'ensemble'));
    const dock = h('form', { class: 'b-dock', onsubmit(e) { e.preventDefault(); ask(input.value); } }, h('div', { class: 'b-askrow' }, input, micBtn, voiceBtn), modes);
    const legend = h('nav', { class: 'b-legend', 'aria-label': 'Lobes' }, MATIERES.map((M, mi) => h('div', { class: 'b-lg' },
      h('b', null, (mi === 0 ? 'Hémisphère gauche' : 'Hémisphère droit')), h('small', null, M.title),
      G.lobes.filter(L => L.mat === M).map(L => h('button', { type: 'button', class: 'b-lobe', style: { '--c': L.chap.col }, onclick: () => focusLobe(L) }, h('i'), h('span', null, L.chap.n + '. ' + L.chap.short), h('em', null, Math.round(L.m * 100) + ' %'))))));
    const total = items.length;
    const head = h('header', { class: 'b-head' },
      h('div', null, h('p', { class: 'b-kicker' }, 'Planche I · pièce secrète'), h('h1', null, 'Le cerveau de ' + (ST.S.name || SITE.name || 'toi')), h('p', { class: 'b-cap' }, total + ' neurones, un par carte, article, arrêt ou définition. Les ponts dorés relient les articles communs aux deux cours.')),
      h('div', { class: 'b-tools' },
        h('button', { class: 'b-ico', type: 'button', title: 'Planche claire ou sombre', 'aria-label': 'Changer de planche', onclick() { const d = document.documentElement; const nd = d.dataset.theme !== 'dark'; d.dataset.theme = nd ? 'dark' : 'light'; ST.S.prefs.dark = nd; ST.save(); } }, icon('moon', 18)),
        h('a', { class: 'b-ico', href: '#/', title: 'Quitter', 'aria-label': 'Quitter le cerveau' }, icon('x', 18))));
    const root = h('div', { class: 'brain' }, cv, head, legend, panel, sub, dock, tip);
    box.replaceChildren(); document.body.append(root); // hors de #main (son animation casserait position: fixed)

    /* ---------- caméra ---------- */
    const cam = { yaw: -1.05, pitch: -.22, dist: 3.5, ty: null, tp: null, td: 3.5, spin: reduce ? 0 : 1 };
    let W = 0, H = 0, DPR = 1, F = 1;
    const ctx = cv.getContext('2d');
    function resize() { DPR = Math.min(2, devicePixelRatio || 1); W = root.clientWidth; H = root.clientHeight; cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px'; F = Math.min(W * (W < 700 ? 1.25 : .95), H * 1.3) * (W < 700 ? 1.1 : 1.08); }
    resize(); addEventListener('resize', resize);
    const N = items.length, A = G.amb.length;
    const nx = new Float32Array(N), ny = new Float32Array(N), nz = new Float32Array(N), ns = new Float32Array(N);
    const ax = new Float32Array(A), ay = new Float32Array(A), az = new Float32Array(A);
    // assemblage : chaque point part d'une position dispersée
    const R0 = rng(7), scatter = () => { const d = nrm([R0() - .5, R0() - .5, R0() - .5]); const r = 1.6 + R0() * 1.4; return [d[0] * r, d[1] * r, d[2] * r]; };
    items.forEach(it => { it.from = scatter(); }); G.amb.forEach(a => { a.from = scatter(); });
    let t0 = performance.now(), assemble = reduce ? 1 : 0;
    function rot(p, out, i, k) {
      const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
      const x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy, y = p[1];
      const y2 = y * cp - z * sp, z2 = y * sp + z * cp, dz = Math.max(.4, cam.dist - z2), s = F / dz;
      out[0][i] = W / 2 + x * s; out[1][i] = H * .5 - y2 * s; out[2][i] = z2; if (k) k[i] = s;
    }
    const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

    /* ---------- état d'affichage ---------- */
    let hover = null, sel = null, hl = null, focusL = null, pulses = [], flash = new Map();
    const colorCache = {};
    function sprite(col) {
      if (colorCache[col]) return colorCache[col];
      const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, '#FFFBF0'); gr.addColorStop(.18, col); gr.addColorStop(.45, col + '66'); gr.addColorStop(1, col + '00');
      g.fillStyle = gr; g.fillRect(0, 0, 64, 64); colorCache[col] = c; return c;
    }
    function spawnPulse(from) {
      const l = from ? (from.links.length ? { a: from, b: from.links[Math.floor(Math.random() * from.links.length)] } : null) : G.links[Math.floor(Math.random() * G.links.length)];
      if (l) pulses.push({ a: l.a, b: l.b, t: 0, v: .6 + Math.random() * .8, gold: l.cross === 2 });
    }

    /* ---------- dessin ---------- */
    let raf = 0, last = performance.now(), labelsFont = false;
    document.fonts && document.fonts.load('italic 600 20px Newsreader').then(() => { labelsFont = true; }).catch(() => { });
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (root.clientWidth !== W || root.clientHeight !== H) resize();
      const dt = Math.min(50, now - last); last = now;
      if (assemble < 1) assemble = Math.min(1, (now - t0) / 2600);
      const ease = 1 - Math.pow(1 - assemble, 4);
      // caméra
      if (cam.ty != null) {
        let d = cam.ty - cam.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
        cam.yaw += d * .07; cam.pitch += (cam.tp - cam.pitch) * .07;
        if (Math.abs(d) < .002 && Math.abs(cam.tp - cam.pitch) < .002) cam.ty = null;
      } else if (!drag && cam.spin) cam.yaw += dt * .00009 * cam.spin;
      cam.dist += (cam.td - cam.dist) * .08;
      const dk = dark();
      const INK = dk ? '237,228,208' : '43,36,30';
      // fond : papier ou nuit
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const bg = ctx.createRadialGradient(W * .5, H * .45, 0, W * .5, H * .5, Math.max(W, H) * .75);
      if (dk) { bg.addColorStop(0, '#16203A'); bg.addColorStop(1, '#070A14'); } else { bg.addColorStop(0, '#FBF6EA'); bg.addColorStop(1, '#E4D8BF'); }
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      // pointillé
      for (let i = 0; i < A; i++) { const a = G.amb[i]; rot(ease < 1 ? lerp3(a.from, a.p, ease) : a.p, [ax, ay, az], i); }
      for (let i = 0; i < A; i++) {
        const a = G.amb[i], z = az[i], f = Math.max(0, Math.min(1, (z + 1.1) / 2.2));
        const s = a.s * (F / 700) * (.55 + f * .7);
        if (a.L) ctx.fillStyle = a.L.chap.col + (dk ? '' : '');
        else ctx.fillStyle = `rgba(${INK},1)`;
        ctx.globalAlpha = (a.L ? (dk ? .35 + f * .6 : .45 + f * .55) : (dk ? .08 + f * .38 : .1 + f * .5)) * (hl || focusL ? .55 : 1);
        ctx.fillRect(ax[i] - s / 2, ay[i] - s / 2, s, s);
      }
      // neurones : projection
      for (let i = 0; i < N; i++) { const it = items[i]; rot(ease < 1 ? lerp3(it.from, it.p, ease) : it.p, [nx, ny, nz], i, ns); it.i = i; }
      // synapses
      ctx.lineWidth = 1;
      for (const l of G.links) {
        const a = l.a.i, b = l.b.i, f = Math.max(0, Math.min(1, ((nz[a] + nz[b]) / 2 + 1) / 2));
        let al = (l.cross ? .22 : .1) * f * ease;
        if (hl) al *= hl.has(l.a) && hl.has(l.b) ? 3 : .25;
        if (focusL) al *= l.a.lobe === focusL || l.b.lobe === focusL ? 1.8 : .3;
        if (al < .01) continue;
        ctx.globalAlpha = Math.min(.8, al);
        ctx.strokeStyle = l.cross === 2 ? (dk ? '#E6C27A' : '#9A6B12') : `rgb(${INK})`;
        ctx.beginPath(); ctx.moveTo(nx[a], ny[a]);
        if (l.cross) { const mx = (nx[a] + nx[b]) / 2, my = (ny[a] + ny[b]) / 2 - 30 * (F / 500); ctx.quadraticCurveTo(mx, my, nx[b], ny[b]); } else ctx.lineTo(nx[b], ny[b]);
        ctx.stroke();
      }
      // influx nerveux
      if (!reduce && ease >= 1 && Math.random() < .35) spawnPulse(null);
      pulses = pulses.filter(p => (p.t += dt * .001 * p.v) < 1);
      for (const p of pulses) {
        const a = p.a.i, b = p.b.i, x = nx[a] + (nx[b] - nx[a]) * p.t, y = ny[a] + (ny[b] - ny[a]) * p.t;
        ctx.globalAlpha = Math.sin(p.t * Math.PI) * .9;
        ctx.fillStyle = p.gold ? (dk ? '#F3D9A8' : '#9A6B12') : (dk ? '#FFFFFF' : '#8E2333');
        const s = 2.2 * (F / 520); ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      // neurones : du fond vers l'avant
      const order = items.map((_, i) => i).sort((p, q) => nz[p] - nz[q]);
      for (const i of order) {
        const it = items[i], f = Math.max(0, Math.min(1, (nz[i] + 1.1) / 2.2));
        let al = .3 + f * .7, sz = (1.1 + it.r * 1.15 + it.m * 1.4) * ns[i] / 260;
        if (hl) { if (hl.has(it)) { sz *= 1.7; al = 1; } else al *= .18; }
        if (focusL && it.lobe !== focusL) al *= .25;
        const fl = flash.get(it); if (fl) { const k = Math.max(0, 1 - (now - fl.t) / 1400); sz *= 1 + k * 1.6; al = Math.max(al, k); if (k <= 0) flash.delete(it); }
        if (it === hover || it === sel) { sz *= 1.6; al = 1; }
        sz = Math.min(sz, 9);
        ctx.globalAlpha = al;
        if (dk) { const S = sz * 5; ctx.drawImage(sprite(it.chap.col), nx[i] - S / 2, ny[i] - S / 2, S, S); }
        else {
          ctx.fillStyle = it.chap.col; ctx.beginPath(); ctx.arc(nx[i], ny[i], Math.max(.1, sz), 0, 6.2832); ctx.fill();
          ctx.lineWidth = .6; ctx.strokeStyle = `rgba(${INK},.6)`; ctx.stroke();
        }
        if (it.m >= .8) { ctx.globalAlpha = al * .9; ctx.lineWidth = 1.2; ctx.strokeStyle = dk ? '#F3D9A8' : '#9A6B12'; ctx.beginPath(); ctx.arc(nx[i], ny[i], sz + 2.5, 0, 6.2832); ctx.stroke(); }
        if (fl) { ctx.globalAlpha = Math.max(0, 1 - (now - fl.t) / 1400); ctx.lineWidth = 2; ctx.strokeStyle = fl.c; ctx.beginPath(); ctx.arc(nx[i], ny[i], Math.max(1, sz + 6 + (now - fl.t) / 40), 0, 6.2832); ctx.stroke(); }
      }
      // légendes façon planche anatomique
      if (ease >= 1 && W > 760) drawLabels(dk, INK);
      ctx.globalAlpha = 1;
    }
    const lab = new Float32Array(3).fill(0);
    function drawLabels(dk, INK) {
      ctx.font = `italic ${labelsFont ? 600 : 500} ${W < 1100 ? 13 : 15}px ${labelsFont ? 'Newsreader' : 'Georgia'}, serif`;
      const pts = [];
      G.lobes.forEach(L => { const o = [[0], [0], [0]]; rot(L.c, o, 0); if (o[2][0] > -.12) pts.push({ L, x: o[0][0], y: o[1][0], z: o[2][0] }); });
      const half = 1.05 * F / cam.dist, cx = W / 2;
      [-1, 1].forEach(side => {
        const col = pts.filter(p => (p.x < cx ? -1 : 1) === side).sort((a, b) => a.y - b.y);
        let prev = -1e9; col.forEach(p => { p.ly = Math.max(p.y, prev + 24); prev = p.ly; });
        const over = col.length ? col[col.length - 1].ly - (H - 170) : 0; if (over > 0) col.forEach(p => { p.ly -= over; });
        const lx = cx + side * (half + 40);
        col.forEach(p => {
          const L = p.L, vis = Math.min(1, (p.z + .12) * 3) * (focusL && focusL !== L ? .3 : 1);
          const txt = 'Fig. ' + L.chap.n + '. ' + L.chap.short, tw = ctx.measureText(txt).width;
          ctx.globalAlpha = .8 * vis; ctx.strokeStyle = `rgb(${INK})`; ctx.lineWidth = .7;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(lx - side * 18, p.ly); ctx.lineTo(lx, p.ly); ctx.stroke();
          ctx.fillStyle = `rgb(${INK})`; ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, 6.2832); ctx.fill();
          const tx = side > 0 ? lx + 6 : lx - 6 - tw;
          if (tx < 230 && W > 900) return; // ne pas chevaucher la légende
          ctx.fillStyle = dk ? '#EDE4D0' : '#2B241E'; ctx.textBaseline = 'middle'; ctx.fillText(txt, tx, p.ly);
          ctx.globalAlpha = .25 * vis; ctx.fillStyle = `rgb(${INK})`; ctx.fillRect(tx, p.ly + 9, tw, 1);
          ctx.globalAlpha = .95 * vis; ctx.fillStyle = L.chap.col; ctx.fillRect(tx, p.ly + 8.5, tw * L.m, 2);
        });
      });
    }
    raf = requestAnimationFrame(frame);

    /* ---------- interactions ---------- */
    let drag = null; const ptrs = new Map(); let pinch0 = 0, dist0 = 0;
    function pick(x, y) {
      let best = null, bd = 18 * 18;
      for (let i = 0; i < N; i++) { if (nz[i] < -.35) continue; const dx = nx[i] - x, dy = ny[i] - y, d = dx * dx + dy * dy - nz[i] * 30; if (d < bd) { bd = d; best = items[i]; } }
      return best;
    }
    cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); drag = { x: e.clientX, y: e.clientY, moved: 0 }; cam.ty = null; if (ptrs.size === 2) { const [p, q] = [...ptrs.values()]; pinch0 = Math.hypot(p[0] - q[0], p[1] - q[1]); dist0 = cam.td; } });
    cv.addEventListener('pointermove', e => {
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (ptrs.has(e.pointerId)) ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (ptrs.size === 2) { const [p, q] = [...ptrs.values()]; const d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (pinch0) cam.td = Math.max(2.5, Math.min(5.5, dist0 * pinch0 / d)); return; }
      if (drag && ptrs.size) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.moved += Math.abs(dx) + Math.abs(dy);
        cam.yaw += dx * .006; cam.pitch = Math.max(-1.3, Math.min(1.3, cam.pitch + dy * .005)); drag.x = e.clientX; drag.y = e.clientY;
        tip.hidden = true; return;
      }
      if (e.pointerType === 'mouse') {
        hover = pick(x, y);
        if (hover) { tip.hidden = false; tip.replaceChildren(h('b', null, hover.kind + ' · ' + hover.chap.short), h('span', null, plain(hover.title).slice(0, 90))); tip.style.left = Math.min(W - 260, x + 16) + 'px'; tip.style.top = (y + 14) + 'px'; cv.style.cursor = 'pointer'; }
        else { tip.hidden = true; cv.style.cursor = 'grab'; }
      }
    });
    const up = e => {
      const r = cv.getBoundingClientRect();
      if (drag && drag.moved < 6 && ptrs.size <= 1) { const it = pick(e.clientX - r.left, e.clientY - r.top); if (it) openItem(it); else if (!busy()) closePanel(); }
      ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch0 = 0; if (!ptrs.size) drag = null;
    };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointerleave', () => { hover = null; tip.hidden = true; });
    cv.addEventListener('wheel', e => { e.preventDefault(); cam.td = Math.max(2.5, Math.min(5.5, cam.td * (1 + Math.sign(e.deltaY) * .08))); }, { passive: false });
    const onKey = e => { if (e.key === 'Escape') { if (!panel.hidden || mode) { stopAll(); closePanel(); } else location.hash = '#/'; } };
    addEventListener('keydown', onKey);

    function flyTo(p, dist) {
      const yaw = Math.atan2(-p[0], p[2]);
      const z = -p[0] * Math.sin(yaw) + p[2] * Math.cos(yaw);
      cam.ty = yaw; cam.tp = Math.max(-1.1, Math.min(1.1, Math.atan2(p[1], Math.max(.2, z)) * .9)); if (dist) cam.td = dist;
    }
    function resetView() { stopAll(); closePanel(); hl = null; focusL = null; cam.ty = -1.05; cam.tp = -.22; cam.td = 3.5; }
    function focusLobe(L) { focusL = focusL === L ? null : L; hl = null; if (focusL) flyTo(L.c, 3.1); else cam.td = 3.5; }
    function closePanel() { panel.hidden = true; sel = null; if (!mode) hl = null; }
    const busy = () => !!mode;

    /* ---------- fiche d'un neurone ---------- */
    function openItem(it, opts = {}) {
      sel = it; flyTo(it.p, Math.min(cam.td, 3.1)); flash.set(it, { t: performance.now(), c: it.chap.col });
      for (let k = 0; k < 6; k++) spawnPulse(it);
      const near = it.links.slice(0, 6);
      const open = it.gradable && DATA.fiche[it.ch] ? h('a', { class: 'b-link', href: '#/fiche/' + it.ch }, 'Ouvrir la fiche du chapitre') : null;
      put(panel, 
        h('button', { class: 'b-x', type: 'button', 'aria-label': 'Fermer', onclick: closePanel }, icon('x', 16)),
        h('p', { class: 'b-kind', style: { '--c': it.chap.col } }, h('i'), it.kind + ' · ' + it.mat.title + ' · ch. ' + it.chap.n),
        h('h2', { html: md(it.title) }),
        h('div', { class: 'b-body', html: md(it.body) }),
        it.ref ? h('p', { class: 'b-ref' }, it.ref) : null,
        h('div', { class: 'b-acts' },
          h('button', { type: 'button', class: 'b-btn', onclick: () => say(it.title + '. ' + it.body) }, spkSvg(true), 'Lire à voix haute'), open),
        near.length ? h('div', { class: 'b-near' }, h('b', null, 'Neurones connectés'), near.map(n => h('button', { type: 'button', style: { '--c': n.chap.col }, onclick: () => openItem(n) }, h('i'), h('span', null, plain(n.title).slice(0, 70)), h('small', null, n.kind)))) : null,
        opts.extra || null);
      panel.hidden = false;
    }

    /* ---------- demander ---------- */
    function ask(q) {
      q = (q || '').trim(); if (!q) return;
      stopAll(); focusL = null;
      const res = search(q, 7);
      if (!res.length) { hl = new Set(); put(panel, h('button', { class: 'b-x', type: 'button', onclick: closePanel }, icon('x', 16)), h('p', { class: 'b-kind' }, 'Aucun neurone ne s\'allume'), h('h2', null, '« ' + q + ' »'), h('p', { class: 'b-body' }, 'Rien dans ton cours ne correspond à ces mots. Essaie avec un mot-clé (« réméré », « lésion », « art. 1583 »…).')); panel.hidden = false; say('Rien dans ton cours ne correspond.'); return; }
      hl = new Set(res); const best = res[0];
      openItem(best, { extra: h('div', { class: 'b-near' }, h('b', null, 'Autres passages qui répondent'), res.slice(1).map(n => h('button', { type: 'button', style: { '--c': n.chap.col }, onclick: () => openItem(n) }, h('i'), h('span', null, plain(n.title).slice(0, 70)), h('small', null, n.kind + ' · ' + n.mat.title)))) });
      panel.querySelector('.b-kind').append(' — réponse de ton cours');
      res.forEach((n, k) => setTimeout(() => flash.set(n, { t: performance.now(), c: n.chap.col }), k * 160));
      say((best.answer || best.body));
    }
    function dictate() {
      stopVoice(); micBtn.classList.add('rec'); input.value = ''; input.placeholder = 'Je t\'écoute…';
      const r = listen((t, fin) => { input.value = t; if (fin) ask(t); }, () => { micBtn.classList.remove('rec'); input.placeholder = 'Demande à ton cerveau…'; });
      if (!r) micBtn.classList.remove('rec');
    }

    /* ---------- choix d'un lobe ---------- */
    function pickLobe(title, go) {
      stopAll();
      const cur = MATIERES.find(m => m.id === SITE.matiere);
      put(panel, h('button', { class: 'b-x', type: 'button', onclick: closePanel }, icon('x', 16)),
        h('p', { class: 'b-kind' }, title), h('h2', null, title === 'Récital' ? 'Quel chapitre je te récite ?' : 'Sur quoi je t\'interroge ?'),
        h('p', { class: 'b-body' }, title === 'Récital' ? 'Une voix lit la fiche, phrase par phrase, pendant que le lobe s\'illumine. Tu peux aussi faire lire quelqu\'un à voix haute avec les sous-titres.' : 'Le cerveau pose la question à voix haute. Réponds au micro, ou fais-toi interroger par quelqu\'un qui lit la question à l\'écran.'),
        title === 'Interro' ? h('button', { type: 'button', class: 'b-btn wide', onclick: () => go(null) }, 'Tout le cerveau (' + cur.title + ')') : null,
        MATIERES.map(M => h('div', { class: 'b-near' }, h('b', null, M.title), G.lobes.filter(L => L.mat === M && (title === 'Récital' ? (DATA.all[L.ch] || {}).fiche : true)).map(L => h('button', { type: 'button', style: { '--c': L.chap.col }, onclick: () => go(L) }, h('i'), h('span', null, L.chap.n + '. ' + L.chap.title), h('small', null, Math.round(L.m * 100) + ' %'))))));
      panel.hidden = false;
    }

    /* ---------- récital ---------- */
    let mode = null, recTimer = 0, rec = null;
    function ficheLines(o) {
      const out = [];
      (o.fiche || []).forEach(b => {
        const t = b[0];
        if (t === 'intro' || t === 'p') out.push(b[1]);
        else if (t === 'h2' || t === 'h3' || t === 'h4') out.push({ head: b[1] });
        else if (t === 'mnemo') out.push('Moyen mnémotechnique : ' + b[1] + '. ' + b[2]);
        else if (t === 'ul') b[1].forEach(x => out.push(x));
        else if (t === 'def') out.push('**' + b[1] + '** : ' + b[2]);
        else if (t === 'art') out.push('**' + b[1] + '** : ' + b[2]);
        else if (t === 'juris') out.push('**' + b[1] + '** : ' + b[2]);
        else if (t === 'tip') out.push('À retenir : ' + b[1]);
        else if (t === 'trap') out.push('Attention, piège : ' + b[1]);
        else if (t === 'steps' || t === 'pair') b[1].forEach(s => out.push('**' + s[0] + '** : ' + s[1]));
        else if (t === 'table') b[2].forEach(r => out.push(r.map((c, k) => (b[1][k] ? b[1][k] + ' : ' : '') + c).filter(Boolean).join(' ; ')));
      });
      return out;
    }
    function startRecital(L) {
      stopAll(); closePanel(); mode = 'recital'; focusL = L; flyTo(L.c, 3.1);
      const lines = ficheLines(DATA.all[L.ch]); let i = 0, paused = false, head = L.chap.title;
      const ctrl = h('div', { class: 'b-ctrl' },
        h('button', { type: 'button', class: 'b-ico', 'aria-label': 'Phrase précédente', onclick() { i = Math.max(0, i - 2); play(); } }, icon('left', 18)),
        h('button', { type: 'button', class: 'b-ico', 'aria-label': 'Pause', onclick() { paused = !paused; if (paused) stopVoice(); else play(); this.replaceChildren(paused ? icon('play', 18) : pauseSvg()); } }, pauseSvg()),
        h('button', { type: 'button', class: 'b-ico', 'aria-label': 'Phrase suivante', onclick() { play(); } }, icon('right', 18)),
        h('button', { type: 'button', class: 'b-ico', 'aria-label': 'Arrêter', onclick: stopAll }, icon('x', 18)));
      const prog = h('div', { class: 'b-prog' }, h('i'));
      function play() {
        while (i < lines.length && lines[i].head) { head = lines[i].head; i++; }
        if (i >= lines.length) { put(sub, h('p', { class: 'b-subhead' }, 'Fin du chapitre ' + L.chap.n), h('p', { class: 'b-line' }, 'Tu viens de tout réviser. Lance une interro pour vérifier ?'), h('div', { class: 'b-ctrl' }, h('button', { type: 'button', class: 'b-btn', onclick: () => startInterro(L) }, 'Interro sur ce chapitre'), h('button', { type: 'button', class: 'b-btn ghost', onclick: stopAll }, 'Fermer'))); say('Fin du chapitre.'); return; }
        const line = lines[i++];
        put(sub, h('p', { class: 'b-subhead' }, plain(head)), h('p', { class: 'b-line', html: md(line) }), prog, ctrl);
        prog.firstChild.style.width = Math.round(i / lines.length * 100) + '%';
        sub.hidden = false;
        const ns = L.nodes; for (let k = 0; k < 4; k++) { const n = ns[Math.floor(Math.random() * ns.length)]; if (n) { flash.set(n, { t: performance.now() + k * 200, c: L.chap.col }); spawnPulse(n); } }
        say(line, () => { if (mode === 'recital' && !paused) recTimer = setTimeout(play, 350); }, .98);
      }
      play();
    }

    /* ---------- interro ---------- */
    function startInterro(L) {
      stopAll(); closePanel(); mode = 'interro';
      let pool = items.filter(it => it.ask && it.kind !== 'Cas pratique' && (L ? it.lobe === L : it.gradable));
      if (!L) { const ids = new Set(ST.pickSmart(pool, 12).map(x => x.id)); pool = pool.filter(x => ids.has(x.id)); }
      pool = U.shuffle(pool).slice(0, 12);
      focusL = L || null; if (L) flyTo(L.c, 3.1);
      let k = 0, score = 0;
      function q() {
        if (k >= pool.length) { mode = 'done'; put(sub, h('p', { class: 'b-subhead' }, 'Interro terminée'), h('p', { class: 'b-line' }, score + ' / ' + pool.length + ' sues du premier coup.'), h('div', { class: 'b-ctrl' }, h('button', { type: 'button', class: 'b-btn', onclick: () => startInterro(L) }, 'Encore'), h('button', { type: 'button', class: 'b-btn ghost', onclick: stopAll }, 'Fermer'))); say(score + ' sur ' + pool.length + '. ' + (score / pool.length >= .75 ? 'Très bien.' : 'On y retourne bientôt.')); return; }
        const it = pool[k++]; sel = it; hl = new Set([it]); flyTo(it.p, 3.1); flash.set(it, { t: performance.now(), c: it.chap.col });
        let heard = '';
        const said = h('p', { class: 'b-heard' });
        const mic = SR ? h('button', { type: 'button', class: 'b-btn', onclick() { stopVoice(); this.classList.add('rec'); this.textContent = 'Je t\'écoute…'; const self = this; rec = listen((t) => { heard = t; said.textContent = '« ' + t + ' »'; }, () => { self.classList.remove('rec'); self.textContent = 'Répondre au micro'; if (heard) reveal(); }); } }, 'Répondre au micro') : null;
        const show = h('button', { type: 'button', class: 'b-btn ghost', onclick: reveal }, 'Révéler la réponse');
        put(sub, h('p', { class: 'b-subhead' }, 'Question ' + k + ' / ' + pool.length + ' · ' + it.chap.short), h('p', { class: 'b-line', html: md(it.ask) }), said, h('div', { class: 'b-ctrl' }, mic, show, h('button', { type: 'button', class: 'b-ico', 'aria-label': 'Arrêter', onclick: stopAll }, icon('x', 18))));
        sub.hidden = false;
        say(it.ask);
        let done = false;
        function reveal() {
          if (done) return; done = true; if (rec) { try { rec.stop(); } catch (e) { } rec = null; }
          const kw = keywords(it.answer), got = heard ? toks(heard) : [], hit = kw.filter(w => got.some(g => g === w || (g.length > 4 && (g.startsWith(w) || w.startsWith(g)))));
          const grade = res => { if (it.gradable) { ST.grade(it.id, res); ST.gain(res === 2 ? 8 : res === 1 ? 4 : 1); it.m = (ST.S.items[it.id].b || 0) / 5; } if (res === 2) score++; flash.set(it, { t: performance.now(), c: res === 2 ? '#2F8A5F' : res === 1 ? '#C99A2E' : '#B3293D' }); setTimeout(q, 500); };
          put(sub, h('p', { class: 'b-subhead' }, 'Réponse'), h('p', { class: 'b-line small', html: md(it.answer) }),
            heard ? h('p', { class: 'b-heard' }, kw.length ? `Mots-clés cités : ${hit.length} / ${kw.length}` + (hit.length < kw.length ? ' (manquants : ' + kw.filter(w => !hit.includes(w)).join(', ') + ')' : ' — parfait') : '') : null,
            h('div', { class: 'b-ctrl' }, h('button', { type: 'button', class: 'b-btn ok', onclick: () => grade(2) }, 'Je savais'), h('button', { type: 'button', class: 'b-btn mid', onclick: () => grade(1) }, 'Presque'), h('button', { type: 'button', class: 'b-btn ko', onclick: () => grade(0) }, 'Raté')));
          say(it.answer);
        }
      }
      q();
    }
    function stopAll() { stopVoice(); clearTimeout(recTimer); if (rec) { try { rec.stop(); } catch (e) { } rec = null; } mode = null; sub.hidden = true; hl = null; sel = null; }

    return () => { cancelAnimationFrame(raf); stopAll(); removeEventListener('resize', resize); removeEventListener('keydown', onKey); document.body.classList.remove('brain-on'); root.remove(); };
  }

  /* ---------- petites icônes ---------- */
  function svgIcon(d, extra) { const s = UI.svg('svg', { viewBox: '0 0 24 24', width: 18, height: 18, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' }); s.append(UI.svg('path', { d })); if (extra) s.append(UI.svg('path', { d: extra })); return s; }
  const micSvg = () => svgIcon('M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z', 'M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21');
  const spkSvg = on => svgIcon('M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z', on ? 'M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11' : 'M16 9.5l5 5M21 9.5l-5 5');
  const pauseSvg = () => svgIcon('M8 5v14M16 5v14');

  /* ---------- easter egg ---------- */
  function egg() {
    const first = !unlocked();
    try { localStorage.setItem(UNLOCK, '1'); } catch (e) { }
    const fx = h('div', { class: 'egg-fx', 'aria-hidden': 'true' }); document.body.append(fx); setTimeout(() => fx.remove(), 1600);
    if (first) UI.toast('Easter egg trouvé : le cerveau caché', 'badge');
    setTimeout(() => { location.hash = '#/cerveau'; }, 700);
  }
  window.Brain = { view, egg };
})();
