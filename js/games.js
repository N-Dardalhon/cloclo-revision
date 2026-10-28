/* Jeux et sessions d'entraînement */
(function () {
  'use strict';
  const { h, md, plain, shuffle, sample, chap, mean, norm } = U;
  const { icon, stamp, confetti, toast, sessionBar, chapterPicker, ring } = UI;
  const S = () => ST.S;
  const LET = 'ABCD';

  const chTag = id => { const c = chap(id); return h('span', { class: 'tag', style: { '--c': c.col } }, h('i'), 'Ch. ' + c.n + ' · ' + c.short); };
  const head = (title, lede, back) => h('header', { class: 'page-head' },
    back ? h('a', { class: 'back', href: back.href }, icon('left', 16), back.label) : null,
    h('h1', null, title), lede ? h('p', { class: 'lede' }, lede) : null);
  const stat = (n, label) => h('div', { class: 'mini-stat' }, h('b', null, n), h('span', null, label));
  const byCh = (list, set) => list.filter(x => set.has(x.ch));
  const verdictComment = p => p >= .9 ? 'Impeccable.' : p >= .75 ? 'Solide, on est presque propriétaire.' : p >= .5 ? 'Bonne base, quelques points à reprendre.' : 'Le cours résiste encore : relis la fiche, puis recommence.';

  function result(box, o) {
    const card = h('section', { class: 'result' },
      h('div', { class: 'result-big' }, o.big),
      h('p', { class: 'result-sub' }, o.sub),
      o.xp ? h('p', { class: 'result-xp' }, icon('bolt', 16), '+' + o.xp + ' XP') : null,
      ...(o.extra || []),
      h('div', { class: 'row-actions' }, (o.actions || []).map(a => h(a.href ? 'a' : 'button', { class: 'btn' + (a.primary ? ' primary' : ''), type: a.href ? null : 'button', href: a.href, onclick: a.onclick }, a.label))));
    box.replaceChildren(h('div', { class: 'wrap narrow' }, card));
    stamp(card, o.stamp || 'Validé', o.kind || 'ok');
    if (o.confetti) confetti();
    return card;
  }

  /* ============ Moteur QCM générique ============ */
  const qcmItem = x => ({ id: x.id, ch: x.ch, q: x.q, good: x.good, bad: x.bad, exp: x.exp, ref: x.ref });

  function runMCQ(box, items, o) {
    o = Object.assign({ title: 'Quiz', back: '#/jouer', chrono: false, grade: true }, o);
    let i = 0, ok = 0, combo = 0, xp = 0, answered = false, timer = null, left = 0, nextFn = null;
    const missed = [], total = items.length;
    const quit = () => { clearInterval(timer); location.hash = o.back; };

    function render() {
      clearInterval(timer);
      if (i >= total) return finish();
      const q = items[i]; answered = false;
      const opts = shuffle([{ t: q.good, g: true }, ...q.bad.slice(0, 3).map(t => ({ t, g: false }))]);
      const card = h('article', { class: 'qcard' }, q.ch ? chTag(q.ch) : null, h('h2', { class: 'q' }, h('span', { html: md(q.q) })));
      const list = h('div', { class: 'opts', role: 'group', 'aria-label': 'Réponses' });
      const fb = h('div', { class: 'feedback', 'aria-live': 'polite' });
      const buttons = opts.map((op, k) => {
        const b = h('button', { class: 'opt', type: 'button', onclick: () => pick(k) }, h('b', null, LET[k]), h('span', { html: md(op.t) }));
        list.append(b); return b;
      });
      card.append(list);
      let timerEl = null;
      if (o.chrono) { timerEl = h('div', { class: 'chrono' }, h('div', { class: 'chrono-fill' })); card.prepend(timerEl); left = 25; startTimer(); }

      function startTimer() {
        const fill = timerEl.firstChild;
        fill.style.transition = 'none'; fill.style.width = '100%';
        requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.transition = 'width 25s linear'; fill.style.width = '0%'; }));
        timer = setInterval(() => { left--; if (left <= 0) { clearInterval(timer); if (!answered) pick(-1); } }, 1000);
      }

      function pick(k) {
        if (answered) return; answered = true; clearInterval(timer);
        if (timerEl) timerEl.firstChild.style.transition = 'none';
        const good = k >= 0 && opts[k].g;
        buttons.forEach((b, j) => { b.disabled = true; b.classList.add(opts[j].g ? 'good' : (j === k ? 'bad' : 'dim')); });
        if (good) { ok++; combo++; const g = 10 + (combo >= 3 ? 3 : 0) + (o.chrono && left > 15 ? 2 : 0); xp += g; }
        else { combo = 0; xp += 2; missed.push(q); }
        if (o.grade && q.id) ST.grade(q.id, good ? 2 : 0);
        stamp(card, good ? 'Validé' : (k < 0 ? 'Trop tard' : 'À revoir'), good ? 'ok' : 'ko');
        if (!good) card.classList.add('shake');
        U.add(fb, 
          h('p', { class: 'verdict ' + (good ? 'ok' : 'ko') }, good ? (combo >= 3 ? 'Exact, série de ' + combo + '.' : 'Exact.') : 'Pas tout à fait.'),
          !good ? h('p', { class: 'good-ans' }, 'Bonne réponse : ', h('span', { html: md(q.good) })) : null,
          q.exp ? h('p', { class: 'exp', html: md(q.exp) }) : null,
          q.ref ? h('p', null, h('span', { class: 'ref' }, q.ref)) : null,
          h('button', { class: 'btn primary next', type: 'button', onclick: next }, i + 1 < total ? 'Question suivante' : 'Voir mon résultat', icon('right', 16)));
        fb.querySelector('.next').focus({ preventScroll: true });
        fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        const bar = box.querySelector('.sbar-n'); if (bar && combo >= 3) bar.textContent = 'Série ×' + combo;
      }
      function next() { i++; render(); }
      nextFn = () => { if (answered) next(); };
      box.replaceChildren(h('div', { class: 'wrap narrow' }, sessionBar(o.title, i, total, quit, `${i + 1}/${total}`), card, fb));
      box.firstChild.classList.add('enter');
            ST.clearKeys();
      ST.onKey(e => {
        if (!answered && '1234'.includes(e.key) && opts[+e.key - 1]) pick(+e.key - 1);
        else if (!answered && 'abcdABCD'.includes(e.key) && e.key.length === 1 && opts[LET.indexOf(e.key.toUpperCase())]) pick(LET.indexOf(e.key.toUpperCase()));
        else if (answered && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); nextFn(); }
      });
    }

    function finish() {
      ST.clearKeys();
      const p = ok / total;
      const bonus = (p >= .8 ? 20 : 0) + (ok === total && total >= 5 ? 30 : 0);
      if (ok === total && total >= 5) { S().flags.perfect = true; ST.save(); }
      ST.gain(xp + bonus);
      const extra = missed.length ? [h('div', { class: 'missed' }, h('h3', null, 'À retravailler (' + missed.length + ')'),
        missed.map(q => h('details', null, h('summary', { html: md(q.q) }), h('p', { class: 'good-ans' }, 'Réponse : ', h('span', { html: md(q.good) })), q.exp ? h('p', { class: 'exp', html: md(q.exp) }) : null, q.ref ? h('span', { class: 'ref' }, q.ref) : null)))] : [];
      result(box, {
        big: `${ok}/${total}`, sub: verdictComment(p), xp: xp + bonus, extra, confetti: p >= .8,
        stamp: p >= .8 ? 'Validé' : p >= .5 ? 'Admis' : 'À reprendre', kind: p >= .5 ? 'ok' : 'ko',
        actions: [
          missed.length ? { label: 'Rejouer mes erreurs', primary: true, onclick: () => runMCQ(box, shuffle(missed), Object.assign({}, o, { title: 'Mes erreurs' })) } : null,
          { label: 'Nouvelle série', primary: !missed.length, onclick: () => o.again ? o.again() : (location.hash = o.back) },
          { label: 'Retour', href: o.back }
        ].filter(Boolean)
      });
    }
    render();
  }

  /* ============ QCM ============ */
  function quiz(box, args) {
    let n = 10, chrono = false;
    const pick = chapterPicker(refresh);
    const info = h('p', { class: 'hint' });
    function pool() { return byCh(DATA.qcm, pick.get()); }
    function refresh() { const p = pool(), d = ST.dueItems(p).length; info.textContent = `${p.length} questions dans la sélection · ${d} à revoir aujourd'hui`; }
    const nOpts = [10, 15, 20].map(v => h('button', { type: 'button', class: 'seg' + (v === n ? ' on' : ''), onclick(e) { n = v; [...e.target.parentNode.children].forEach(x => x.classList.toggle('on', x === e.target)); } }, v + ' questions'));
    const chronoBox = h('label', { class: 'switch' }, h('input', { type: 'checkbox', onchange(e) { chrono = e.target.checked; } }), h('span', null, 'Mode chrono (25 s par question)'));
    function start() {
      const items = ST.pickSmart(pool(), n).map(qcmItem);
      runMCQ(box, shuffle(items), { title: 'Quiz', back: '#/quiz', chrono, again: start });
    }
    if (args && args[0] === 'go') return start();
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Quiz', 'Questions à choix multiple avec explication et référence. Les questions que tu rates reviennent plus vite.', { href: '#/jouer', label: 'Jouer' }),
      h('section', { class: 'panel' }, h('h3', null, 'Quels chapitres ?'), pick, info, h('h3', null, 'Longueur'), h('div', { class: 'segs' }, nOpts), chronoBox,
        h('button', { class: 'btn primary big', type: 'button', onclick: start }, icon('play', 18), 'Lancer le quiz'))));
    refresh();
  }

  /* ============ Flashcards ============ */
  function cartes(box) {
    let mode = 'smart', n = 15;
    const pick = chapterPicker(refresh);
    const info = h('p', { class: 'hint' });
    const pool = () => byCh(DATA.cards, pick.get());
    function weak(p) { return p.filter(x => { const it = S().items[x.id]; return it && (it.b <= 1 || it.w > 0); }); }
    function fresh(p) { return p.filter(x => !S().items[x.id]); }
    function refresh() { const p = pool(); info.textContent = `${p.length} cartes · ${ST.dueItems(p).length} à revoir · ${fresh(p).length} nouvelles · ${weak(p).length} points faibles`; }
    const modes = [['smart', 'Mix intelligent', 'À revoir d\'abord, puis nouvelles'], ['new', 'Nouvelles', 'Cartes jamais vues'], ['weak', 'Points faibles', 'Cartes ratées ou fragiles'], ['all', 'Tout au hasard', 'Sans tenir compte du suivi']];
    const mbox = h('div', { class: 'cards-choice' }, modes.map(m => h('button', { type: 'button', class: 'choice' + (m[0] === mode ? ' on' : ''), onclick(e) { mode = m[0]; [...mbox.children].forEach(x => x.classList.remove('on')); e.currentTarget.classList.add('on'); } }, h('b', null, m[1]), h('span', null, m[2]))));
    const nOpts = [10, 15, 25].map(v => h('button', { type: 'button', class: 'seg' + (v === n ? ' on' : ''), onclick(e) { n = v; [...e.target.parentNode.children].forEach(x => x.classList.toggle('on', x === e.target)); } }, v + ' cartes'));
    function start() {
      let p = pool();
      if (mode === 'new') p = fresh(p); else if (mode === 'weak') p = weak(p);
      if (mode === 'all') p = shuffle(p); else p = ST.pickSmart(p, 999);
      p = p.slice(0, n);
      if (!p.length) { toast('Aucune carte dans cette sélection. Essaie un autre mode.'); return; }
      session(shuffle(p));
    }
    function session(deck) {
      const total = deck.length;
      let i = 0, flipped = false, good = 0, xp = 0; const queue = deck.slice(), requeued = new Set(), stats = { 2: 0, 1: 0, 0: 0 };
      const quit = () => { ST.clearKeys(); location.hash = '#/cartes'; };
      function render() {
        if (!queue.length) return done();
        const c = queue[0]; flipped = false;
        const front = h('div', { class: 'face recto' }, chTag(c.ch), h('p', { class: 'fq', html: md(c.q) }), h('span', { class: 'tap' }, icon('flip', 16), 'Touche pour retourner'));
        const back = h('div', { class: 'face verso' }, chTag(c.ch), h('p', { class: 'fa', html: md(c.a) }), c.ref ? h('span', { class: 'ref' }, c.ref) : null);
        const fc = h('div', { class: 'flip', role: 'button', tabindex: 0, 'aria-label': 'Retourner la carte', onclick: flip }, h('div', { class: 'flip-in' }, front, back));
        const btns = h('div', { class: 'grade-row hidden' },
          h('button', { class: 'btn g0', type: 'button', onclick: () => rate(0) }, h('small', null, '1'), 'À revoir'),
          h('button', { class: 'btn g1', type: 'button', onclick: () => rate(1) }, h('small', null, '2'), 'Presque'),
          h('button', { class: 'btn g2', type: 'button', onclick: () => rate(2) }, h('small', null, '3'), 'Je savais'));
        function flip() { if (flipped) return; flipped = true; fc.classList.add('on'); btns.classList.remove('hidden'); }
        function rate(r) {
          if (!flipped) return;
          stats[r]++; ST.grade(c.id, r); S().stats.cards++;
          xp += r === 2 ? 6 : r === 1 ? 3 : 1;
          queue.shift();
          if (r === 0 && !requeued.has(c.id)) { requeued.add(c.id); queue.push(c); }
          else if (r < 2 && !requeued.has(c.id) && queue.length > 2) { /* presque : une fois de plus plus tard */ }
          if (r === 2) good++;
          i++; render();
        }
        box.replaceChildren(h('div', { class: 'wrap narrow' }, sessionBar('Flashcards', Math.min(i, total), total, quit, `${Math.min(i + 1, total)}/${total}`), fc, btns));
        box.firstChild.classList.add('enter');
        ST.clearKeys();
        ST.onKey(e => {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
          else if ('123'.includes(e.key) && flipped) rate(+e.key - 1);
          else if (e.key === 'ArrowRight' && flipped) rate(2);
          else if (e.key === 'ArrowLeft' && flipped) rate(0);
        });
        fc.focus({ preventScroll: true });
      }
      function done() {
        ST.clearKeys();
        const bonus = 20; ST.gain(xp + bonus);
        result(box, {
          big: `${stats[2]} sues sur ${total}`, sub: stats[0] ? `${stats[0]} cartes reviennent plus vite dans ton calendrier.` : 'Toutes en mémoire. Elles reviendront dans quelques jours pour fixer ça.', xp: xp + bonus,
          confetti: stats[2] === total, stamp: 'Session validée', kind: 'ok',
          actions: [{ label: 'Une autre série', primary: true, onclick: start }, { label: 'Retour', href: '#/cartes' }]
        });
      }
      render();
    }
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Flashcards', 'Une question, tu réfléchis, tu retournes, tu te notes honnêtement. Le calendrier de révision fait le reste.', { href: '#/jouer', label: 'Jouer' }),
      h('section', { class: 'panel' }, h('h3', null, 'Quels chapitres ?'), pick, info, h('h3', null, 'Quelles cartes ?'), mbox, h('h3', null, 'Longueur'), h('div', { class: 'segs' }, nOpts),
        h('button', { class: 'btn primary big', type: 'button', onclick: start }, icon('play', 18), 'Commencer'))));
    refresh();
  }

  /* ============ Vrai / Faux ============ */
  function vf(box) {
    let mode = 'serie';
    const pick = chapterPicker(refresh);
    const info = h('p', { class: 'hint' });
    const pool = () => byCh(DATA.vf, pick.get());
    function refresh() { info.textContent = `${pool().length} affirmations dans la sélection · record blitz : ${S().blitz}`; }
    const modes = [['serie', 'Série de 15', 'Avec explication après chaque réponse'], ['blitz', 'Blitz 60 secondes', 'Un maximum de bonnes réponses, explications à la fin']];
    const mbox = h('div', { class: 'cards-choice' }, modes.map(m => h('button', { type: 'button', class: 'choice' + (m[0] === mode ? ' on' : ''), onclick(e) { mode = m[0]; [...mbox.children].forEach(x => x.classList.remove('on')); e.currentTarget.classList.add('on'); } }, h('b', null, m[1]), h('span', null, m[2]))));
    function start() { run(mode, ST.pickSmart(pool(), mode === 'blitz' ? 60 : 15)); }

    function run(m, deck) {
      deck = shuffle(deck);
      const blitz = m === 'blitz', total = deck.length;
      let i = 0, ok = 0, xp = 0, combo = 0, answered = false, timer = null, left = 60; const missed = [];
      const quit = () => { clearInterval(timer); ST.clearKeys(); location.hash = '#/vf'; };
      if (blitz) timer = setInterval(() => { left--; const t = box.querySelector('.sbar-n'); if (t) t.textContent = left + ' s'; if (left <= 0) { clearInterval(timer); finish(); } }, 1000);
      function render() {
        if (i >= total) return finish();
        const q = deck[i]; answered = false;
        const card = h('article', { class: 'qcard vf' }, chTag(q.ch), h('p', { class: 'vf-s', html: md(q.s) }));
        const fb = h('div', { class: 'feedback' });
        const bF = h('button', { class: 'btn vf-btn f', type: 'button', onclick: () => ans(false) }, h('small', null, 'F'), 'Faux');
        const bV = h('button', { class: 'btn vf-btn v', type: 'button', onclick: () => ans(true) }, h('small', null, 'V'), 'Vrai');
        function ans(v) {
          if (answered) return; answered = true;
          const good = v === q.v; (v ? bV : bF).classList.add(good ? 'good' : 'bad'); bF.disabled = bV.disabled = true;
          if (!good) (q.v ? bV : bF).classList.add('good');
          ST.grade(q.id, good ? 2 : 0);
          if (good) { ok++; combo++; xp += blitz ? 3 : 5; if (blitz) { S().blitz = Math.max(S().blitz, ok); } } else { combo = 0; xp += 1; missed.push(q); }
          stamp(card, good ? 'Validé' : 'À revoir', good ? 'ok' : 'ko');
          if (!good) card.classList.add('shake');
          if (blitz) { setTimeout(() => { i++; if (left > 0) render(); }, good ? 380 : 700); return; }
          U.add(fb, h('p', { class: 'verdict ' + (good ? 'ok' : 'ko') }, good ? 'Exact.' : 'Raté.'), h('p', { class: 'exp' }, q.v ? 'C\'est vrai. ' : 'C\'est faux. ', h('span', { html: md(q.exp) })),
            h('button', { class: 'btn primary next', type: 'button', onclick: next }, i + 1 < total ? 'Suivante' : 'Voir mon résultat', icon('right', 16)));
          fb.querySelector('.next').focus({ preventScroll: true });
        }
        function next() { i++; render(); }
        box.replaceChildren(h('div', { class: 'wrap narrow' }, sessionBar(blitz ? 'Blitz' : 'Vrai ou faux', blitz ? ok : i, blitz ? 20 : total, quit, blitz ? left + ' s' : `${i + 1}/${total}`), card, h('div', { class: 'vf-row' }, bF, bV), fb));
        ST.clearKeys();
        ST.onKey(e => {
          const k = e.key.toLowerCase();
          if (!answered) { if (k === 'v' || e.key === 'ArrowRight') ans(true); else if (k === 'f' || e.key === 'ArrowLeft') ans(false); }
          else if (!blitz && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); next(); }
        });
      }
      function finish() {
        clearInterval(timer); ST.clearKeys();
        const p = ok / Math.max(1, i);
        const bonus = blitz ? (ok >= 10 ? 15 : 0) : (p >= .8 ? 20 : 0);
        ST.save(); ST.gain(xp + bonus);
        result(box, {
          big: blitz ? `${ok} bonnes` : `${ok}/${total}`, sub: blitz ? `en 60 secondes, ${i} affirmations traitées. Record : ${S().blitz}.` : verdictComment(p), xp: xp + bonus, confetti: p >= .85 && i >= 8,
          stamp: p >= .8 ? 'Validé' : p >= .5 ? 'Admis' : 'À reprendre', kind: p >= .5 ? 'ok' : 'ko',
          extra: missed.length ? [h('div', { class: 'missed' }, h('h3', null, 'À retravailler (' + missed.length + ')'), missed.map(q => h('details', null, h('summary', { html: md(q.s) }), h('p', { class: 'exp' }, q.v ? 'Vrai. ' : 'Faux. ', h('span', { html: md(q.exp) })))))] : [],
          actions: [{ label: 'Rejouer', primary: true, onclick: start }, { label: 'Retour', href: '#/vf' }]
        });
      }
      render();
    }
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Vrai ou faux', 'Des affirmations tirées du cours. Rapide, pratique pour détecter les pièges.', { href: '#/jouer', label: 'Jouer' }),
      h('section', { class: 'panel' }, h('h3', null, 'Quels chapitres ?'), pick, info, h('h3', null, 'Mode'), mbox, h('button', { class: 'btn primary big', type: 'button', onclick: start }, icon('play', 18), 'Lancer'))));
    refresh();
  }

  /* ============ Articles à compléter ============ */
  function articles(box) {
    const pick = chapterPicker(refresh);
    const info = h('p', { class: 'hint' });
    const pool = () => byCh(DATA.arts, pick.get());
    function refresh() { info.textContent = pool().length + ' articles dans la sélection'; }
    function start() { run(ST.pickSmart(pool(), 6)); }
    function run(deck) {
      let i = 0, xp = 0, right = 0, blanksTotal = 0;
      const quit = () => { ST.clearKeys(); location.hash = '#/articles'; };
      function render() {
        if (i >= deck.length) return finish();
        const a = deck[i];
        const parts = a.text.split(/(\{\{.+?\}\})/).filter(Boolean);
        const answers = parts.filter(p => p.startsWith('{{')).map(p => p.slice(2, -2));
        const others = DATA.arts.filter(x => x.id !== a.id).flatMap(x => (x.text.match(/\{\{(.+?)\}\}/g) || []).map(m => m.slice(2, -2))).filter(w => !answers.includes(w));
        const bank = shuffle([...answers, ...sample([...new Set(others)], 2)]);
        const fills = answers.map(() => null); let active = 0, checked = false;
        const sentence = h('p', { class: 'art-text' });
        const bankEl = h('div', { class: 'bank' });
        const fb = h('div', { class: 'feedback' });
        const check = h('button', { class: 'btn primary', type: 'button', onclick: doCheck }, 'Vérifier');
        function paint() {
          let bi = 0;
          sentence.replaceChildren(...parts.map(p => {
            if (!p.startsWith('{{')) return document.createTextNode(p);
            const k = bi++, w = fills[k];
            const btn = h('button', { type: 'button', class: 'blank' + (w == null ? ' empty' : '') + (k === active && !checked ? ' active' : '') + (checked ? (w === answers[k] ? ' good' : ' bad') : ''), onclick() { if (checked) return; if (w != null) fills[k] = null; active = k; paint(); } }, w == null ? '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0' : w);
            return checked && w !== answers[k] ? h('span', null, btn, h('span', { class: 'fix' }, answers[k])) : btn;
          }));
          bankEl.replaceChildren(...bank.map((w, j) => { const used = fills.includes(w) && fills.indexOf(w) >= 0 && bank.slice(0, j).filter(x => x === w).length < fills.filter(f => f === w).length; return h('button', { type: 'button', class: 'word' + (used ? ' used' : ''), disabled: used || checked, onclick() { place(w); } }, w); }));
        }
        function place(w) {
          let k = fills[active] == null ? active : fills.findIndex(f => f == null);
          if (k < 0) return; fills[k] = w;
          const nx = fills.findIndex(f => f == null); active = nx < 0 ? k : nx; paint();
        }
        function doCheck() {
          if (checked) { i++; return render(); }
          checked = true; let okc = 0; answers.forEach((w, k) => { if (fills[k] === w) okc++; });
          blanksTotal += answers.length; right += okc; xp += okc * 4;
          const r = okc === answers.length ? 2 : okc >= answers.length / 2 ? 1 : 0; ST.grade(a.id, r);
          paint();
          stamp(card, r === 2 ? 'Validé' : r === 1 ? 'Presque' : 'À revoir', r === 2 ? 'ok' : 'ko');
          U.add(fb, h('p', { class: 'verdict ' + (r === 2 ? 'ok' : 'ko') }, `${okc}/${answers.length} mots justes`), r < 2 ? h('p', { class: 'exp' }, 'Texte complet : ', h('em', null, plain(a.text.replace(/\{\{(.+?)\}\}/g, '$1')))) : null);
          check.textContent = i + 1 < deck.length ? 'Article suivant' : 'Voir mon résultat'; check.classList.add('next');
        }
        const card = h('article', { class: 'qcard art' }, chTag(a.ch), h('h2', { class: 'q' }, a.ref), sentence, h('p', { class: 'hint' }, 'Touche un mot de la banque pour remplir le premier trou. Touche un trou rempli pour le vider.'), bankEl, h('div', { class: 'row-actions' }, check));
        paint();
        box.replaceChildren(h('div', { class: 'wrap narrow' }, sessionBar('Articles à compléter', i, deck.length, quit), card, fb));
        ST.clearKeys();
        ST.onKey(e => { if (e.key === 'Enter') { e.preventDefault(); doCheck(); } });
      }
      function finish() {
        ST.clearKeys(); const p = right / Math.max(1, blanksTotal), bonus = p >= .8 ? 15 : 0; ST.gain(xp + bonus);
        result(box, { big: `${right}/${blanksTotal}`, sub: 'mots justes. ' + verdictComment(p), xp: xp + bonus, confetti: p >= .9, stamp: p >= .7 ? 'Validé' : 'À reprendre', kind: p >= .7 ? 'ok' : 'ko', actions: [{ label: 'Autres articles', primary: true, onclick: start }, { label: 'Retour', href: '#/articles' }] });
      }
      render();
    }
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Articles à compléter', 'Les textes cités dans ton cours, avec des trous. Le vocabulaire exact fait gagner des points en partiel.', { href: '#/jouer', label: 'Jouer' }),
      h('section', { class: 'panel' }, h('h3', null, 'Quels chapitres ?'), pick, info, h('button', { class: 'btn primary big', type: 'button', onclick: start }, icon('play', 18), 'Commencer'))));
    refresh();
  }

  /* ============ Associer ============ */
  function associer(box) {
    let set = 'gloss';
    const pick = chapterPicker();
    const sets = [['gloss', 'Termes et définitions'], ['juris', 'Arrêts et solutions'], ['nums', 'Chiffres et sens']];
    const sbox = h('div', { class: 'cards-choice' }, sets.map(s => h('button', { type: 'button', class: 'choice' + (s[0] === set ? ' on' : ''), onclick(e) { set = s[0]; [...sbox.children].forEach(x => x.classList.remove('on')); e.currentTarget.classList.add('on'); } }, h('b', null, s[1]))));
    function pairsFor() {
      const chs = pick.get();
      let L = [];
      if (set === 'gloss') L = DATA.gloss.filter(x => chs.has(x.ch) && x.def.length <= 150).map(x => ({ id: x.id, ch: x.ch, a: x.term, b: x.def }));
      if (set === 'juris') L = DATA.juris.filter(x => chs.has(x.ch) && x.sol.length <= 190).map(x => ({ id: x.id, ch: x.ch, a: x.label, b: x.sol }));
      if (set === 'nums') { const seen = new Set(); L = shuffle(DATA.nums.filter(x => chs.has(x.ch))).filter(x => { if (seen.has(x.n)) return false; seen.add(x.n); return true; }).map(x => ({ id: x.id, ch: x.ch, a: x.n, b: x.t })); }
      return L;
    }
    function start() {
      const all = shuffle(pairsFor());
      if (all.length < 4) { toast('Pas assez d\'éléments dans cette sélection.'); return; }
      const perRound = Math.min(6, all.length), rounds = Math.min(3, Math.floor(all.length / perRound) || 1);
      let r = 0, errs = 0, xp = 0, t0 = Date.now();
      const quit = () => { ST.clearKeys(); location.hash = '#/associer'; };
      function round() {
        if (r >= rounds) return finish();
        const items = all.slice(r * perRound, r * perRound + perRound); let selA = null, done = 0;
        const colA = h('div', { class: 'm-col' }), colB = h('div', { class: 'm-col' });
        const A = shuffle(items), B = shuffle(items);
        const mk = (it, side) => h('button', { type: 'button', class: 'm-item ' + side, dataset: undefined, onclick(e) { sel(it, side, e.currentTarget); }, 'data-id': it.id }, h('span', { html: md(side === 'a' ? String(it.a) : String(it.b)) }));
        A.forEach(it => colA.append(mk(it, 'a'))); B.forEach(it => colB.append(mk(it, 'b')));
        function sel(it, side, el) {
          if (el.classList.contains('done')) return;
          if (side === 'a') { colA.querySelectorAll('.sel').forEach(x => x.classList.remove('sel')); el.classList.add('sel'); selA = { it, el }; return; }
          if (!selA) { toast('Choisis d\'abord un élément à gauche.'); return; }
          if (selA.it.id === it.id) {
            [selA.el, el].forEach(x => { x.classList.remove('sel'); x.classList.add('done'); x.style.setProperty('--c', chap(it.ch).col); });
            selA = null; done++; ST.grade(it.id, 2);
            if (done === items.length) { xp += Math.max(6, 24 - errs * 0); setTimeout(() => { r++; round(); }, 650); }
          } else { errs++; xp = Math.max(0, xp - 2); el.classList.add('wrong'); selA.el.classList.add('wrong'); ST.grade(selA.it.id, 0); const s = selA; setTimeout(() => { el.classList.remove('wrong'); s.el.classList.remove('wrong'); }, 450); }
        }
        box.replaceChildren(h('div', { class: 'wrap' }, sessionBar('Associer', r, rounds, quit, `Manche ${r + 1}/${rounds}`), h('p', { class: 'hint' }, 'Touche un élément à gauche, puis son partenaire à droite.'), h('div', { class: 'match' }, colA, colB)));
      }
      function finish() {
        const sec = Math.round((Date.now() - t0) / 1000), bonus = errs === 0 ? 20 : 0; ST.gain(xp + bonus);
        result(box, { big: errs === 0 ? 'Sans faute' : errs + ' erreur' + (errs > 1 ? 's' : ''), sub: `${rounds * perRound} paires en ${sec} secondes.`, xp: xp + bonus, confetti: errs === 0, stamp: errs <= 2 ? 'Validé' : 'Admis', kind: 'ok', actions: [{ label: 'Rejouer', primary: true, onclick: start }, { label: 'Retour', href: '#/associer' }] });
      }
      round();
    }
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Associer', 'Relie chaque élément à son partenaire. Idéal pour fixer les arrêts et le vocabulaire.', { href: '#/jouer', label: 'Jouer' }),
      h('section', { class: 'panel' }, h('h3', null, 'Quoi associer ?'), sbox, h('h3', null, 'Quels chapitres ?'), pick, h('button', { class: 'btn primary big', type: 'button', onclick: start }, icon('play', 18), 'Commencer'))));
  }

  /* ============ Cas pratiques ============ */
  function cas(box, args) {
    if (args[0]) return runCas(box, DATA.cas.find(c => c.id === args[0]));
    const list = DATA.cas;
    box.replaceChildren(h('div', { class: 'wrap' }, head('Cas pratiques', 'On suit la méthode du syllogisme : qualifier, trouver la règle, appliquer, conclure. Chaque étape est corrigée.', { href: '#/jouer', label: 'Jouer' }),
      h('div', { class: 'grid cases' }, list.map(c => {
        const sc = S().cas[c.id];
        return h('a', { class: 'case-card', href: '#/cas/' + c.id, style: { '--c': chap(c.ch).col } }, chTag(c.ch), h('h3', null, c.title), h('p', null, plain(c.facts).slice(0, 120) + '…'), h('span', { class: 'case-meta' }, c.steps.length + ' étapes', sc != null ? ' · meilleur score ' + Math.round(sc * 100) + ' %' : ''));
      }))));
  }
  function runCas(box, c) {
    if (!c) { location.hash = '#/cas'; return; }
    let i = 0, ok = 0, xp = 0, answered = false; const quit = () => { ST.clearKeys(); location.hash = '#/cas'; };
    function render() {
      if (i >= c.steps.length) return finish();
      const st = c.steps[i]; answered = false;
      const opts = shuffle(st.opts.map((t, k) => ({ t, g: k === st.ans })));
      const facts = h('aside', { class: 'facts' }, chTag(c.ch), h('h2', null, c.title), h('p', { html: md(c.facts) }));
      const card = h('article', { class: 'qcard' }, h('h3', { class: 'q' }, h('span', { class: 'stepno' }, 'Étape ' + (i + 1) + '/' + c.steps.length), ' ', st.q));
      const list = h('div', { class: 'opts' }); const fb = h('div', { class: 'feedback' });
      const bs = opts.map((op, k) => { const b = h('button', { class: 'opt', type: 'button', onclick: () => pick(k) }, h('b', null, LET[k]), h('span', { html: md(op.t) })); list.append(b); return b; });
      card.append(list);
      function pick(k) {
        if (answered) return; answered = true; const good = opts[k].g;
        bs.forEach((b, j) => { b.disabled = true; b.classList.add(opts[j].g ? 'good' : (j === k ? 'bad' : 'dim')); });
        if (good) { ok++; xp += 12; } else xp += 2;
        stamp(card, good ? 'Validé' : 'À revoir', good ? 'ok' : 'ko'); if (!good) card.classList.add('shake');
        U.add(fb, h('p', { class: 'verdict ' + (good ? 'ok' : 'ko') }, good ? 'Bien vu.' : 'Pas tout à fait.'), h('p', { class: 'exp', html: md(st.exp) }), h('button', { class: 'btn primary next', type: 'button', onclick: () => { i++; render(); } }, i + 1 < c.steps.length ? 'Étape suivante' : 'Voir le corrigé', icon('right', 16)));
        fb.querySelector('.next').focus({ preventScroll: true });
      }
      box.replaceChildren(h('div', { class: 'wrap narrow' }, sessionBar('Cas pratique', i, c.steps.length, quit), facts, card, fb));
      ST.clearKeys(); ST.onKey(e => { if (!answered && '1234'.includes(e.key) && opts[+e.key - 1]) pick(+e.key - 1); else if (answered && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fb.querySelector('.next').click(); } });
    }
    function finish() {
      ST.clearKeys(); const p = ok / c.steps.length; S().cas[c.id] = Math.max(S().cas[c.id] || 0, p); ST.save(); const bonus = 15; ST.gain(xp + bonus);
      result(box, {
        big: `${ok}/${c.steps.length}`, sub: 'étapes justes.', xp: xp + bonus, confetti: p === 1, stamp: p >= .75 ? 'Validé' : 'À reprendre', kind: p >= .75 ? 'ok' : 'ko',
        extra: [h('div', { class: 'corrige' }, h('h3', null, 'Corrigé rédigé'), h('p', { html: md(c.corrige) }))],
        actions: [{ label: 'Refaire ce cas', onclick: () => runCas(box, c) }, { label: 'Autre cas', primary: true, href: '#/cas' }]
      });
    }
    render();
  }

  /* ============ Questions de cours ============ */
  function questions(box, args) {
    if (args[0]) return runQ(box, DATA.coursq.find(c => c.id === args[0]));
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Questions de cours', 'Rédige ta réponse de tête ou sur papier, puis compare avec le corrigé et coche les points que tu avais.', { href: '#/jouer', label: 'Jouer' }),
      h('div', { class: 'list-stack' }, DATA.coursq.map(q => {
        const sc = S().cq[q.id];
        return h('a', { class: 'row-link', href: '#/questions/' + q.id, style: { '--c': chap(q.ch).col } }, h('i'), h('span', null, q.q), sc != null ? h('em', null, Math.round(sc * 100) + ' %') : icon('right', 16));
      }))));
  }
  function runQ(box, q) {
    if (!q) { location.hash = '#/questions'; return; }
    const ta = h('textarea', { class: 'draft', rows: 7, placeholder: 'Ta réponse (facultatif, rien n\'est enregistré). Pense au plan : principe, conditions, exceptions, références.' });
    const reveal = h('button', { class: 'btn primary', type: 'button', onclick: show }, 'Voir le corrigé');
    function show() {
      reveal.remove(); ta.readOnly = true;
      const boxes = q.points.map(p => h('label', { class: 'check' }, h('input', { type: 'checkbox' }), h('span', { html: md(p) })));
      const done = h('button', { class: 'btn primary', type: 'button', onclick() { const n = boxes.filter(b => b.firstChild.checked).length, r = n / q.points.length; S().cq[q.id] = Math.max(S().cq[q.id] || 0, r); ST.save(); const x = 8 + n * 4; ST.gain(x); toast('+' + x + ' XP'); location.hash = '#/questions'; } }, 'Enregistrer mon auto-évaluation');
      card.append(h('div', { class: 'corrige' }, h('h3', null, 'Corrigé'), h('p', { class: 'serif', html: md(q.model) })), h('h3', null, 'Points attendus : coche ceux que tu avais'), h('div', { class: 'checks' }, boxes), done);
    }
    const card = h('article', { class: 'qcard' }, chTag(q.ch), h('h2', { class: 'q' }, q.q), ta, h('div', { class: 'row-actions' }, reveal));
    box.replaceChildren(h('div', { class: 'wrap narrow' }, h('a', { class: 'back', href: '#/questions' }, icon('left', 16), 'Questions de cours'), card));
  }

  /* ============ Examen blanc ============ */
  function examen(box) {
    const pick = chapterPicker();
    let mins = 25;
    const past = S().exam.slice(-5).reverse();
    const mOpts = [15, 25, 40].map(v => h('button', { type: 'button', class: 'seg' + (v === mins ? ' on' : ''), onclick(e) { mins = v; [...e.target.parentNode.children].forEach(x => x.classList.toggle('on', x === e.target)); } }, v + ' min'));
    function build() {
      const chs = pick.get();
      const q = ST.pickSmart(byCh(DATA.qcm, chs), 12).map(qcmItem);
      const v = ST.pickSmart(byCh(DATA.vf, chs), 6).map(x => ({ id: x.id, ch: x.ch, q: x.s, good: x.v ? 'Vrai' : 'Faux', bad: [x.v ? 'Faux' : 'Vrai'], exp: x.exp, ref: '', vf: true }));
      const gl = sample(byCh(DATA.gloss, chs), 2).map(x => { const others = sample(DATA.gloss.filter(y => y.term !== x.term), 3).map(y => y.term); return { id: x.id, ch: x.ch, q: 'Quel terme correspond à cette définition : « ' + x.def + ' » ?', good: x.term, bad: others, exp: x.ref ? 'Référence : ' + x.ref : '', ref: '' }; });
      return shuffle([...q, ...v, ...gl]);
    }
    function start() {
      const qs = build(); if (qs.length < 6) { toast('Sélection trop petite pour un examen.'); return; }
      const total = qs.length, ans = new Array(total).fill(null), order = qs.map(q => shuffle([{ t: q.good, g: true }, ...q.bad.slice(0, 3).map(t => ({ t, g: false }))]).sort((a, b) => q.vf ? (a.t === 'Vrai' ? -1 : 1) : 0));
      let i = 0, left = mins * 60, timer = setInterval(tick, 1000);
      function tick() { left--; const t = box.querySelector('.exam-time'); if (t) { t.textContent = fmt(left); t.classList.toggle('low', left < 120); } if (left <= 0) end(); }
      const fmt = s => String(Math.floor(Math.max(0, s) / 60)).padStart(2, '0') + ':' + String(Math.max(0, s) % 60).padStart(2, '0');
      function render() {
        const q = qs[i];
        const card = h('article', { class: 'qcard' }, chTag(q.ch), h('h2', { class: 'q' }, h('span', { html: md(q.q) })),
          h('div', { class: 'opts' }, order[i].map((op, k) => h('button', { class: 'opt' + (ans[i] === k ? ' picked' : ''), type: 'button', onclick() { ans[i] = k; render(); } }, h('b', null, LET[k]), h('span', { html: md(op.t) })))));
        const nav = h('div', { class: 'exam-nav' }, qs.map((_, k) => h('button', { type: 'button', class: 'dot' + (k === i ? ' cur' : '') + (ans[k] != null ? ' done' : ''), onclick() { i = k; render(); }, 'aria-label': 'Question ' + (k + 1) }, k + 1)));
        box.replaceChildren(h('div', { class: 'wrap narrow' }, h('div', { class: 'exam-head' }, h('div', null, h('b', null, 'Examen blanc'), ' · question ' + (i + 1) + '/' + total), h('div', { class: 'exam-time' }, fmt(left))), card, nav,
          h('div', { class: 'row-actions' }, h('button', { class: 'btn', type: 'button', disabled: i === 0, onclick() { i--; render(); } }, icon('left', 16), 'Précédente'), i + 1 < total ? h('button', { class: 'btn', type: 'button', onclick() { i++; render(); } }, 'Suivante', icon('right', 16)) : null,
            h('button', { class: 'btn primary', type: 'button', onclick() { const miss = ans.filter(a => a == null).length; if (!miss || confirm(miss + ' question(s) sans réponse. Rendre la copie quand même ?')) end(); } }, 'Rendre ma copie'))));
        ST.clearKeys(); ST.onKey(e => { if ('1234'.includes(e.key) && order[i][+e.key - 1]) { ans[i] = +e.key - 1; render(); } else if (e.key === 'ArrowRight' && i + 1 < total) { i++; render(); } else if (e.key === 'ArrowLeft' && i > 0) { i--; render(); } });
      }
      function end() {
        clearInterval(timer); ST.clearKeys();
        let okc = 0; const wrong = [];
        qs.forEach((q, k) => { const good = ans[k] != null && order[k][ans[k]].g; if (good) okc++; else wrong.push({ q, a: ans[k] != null ? order[k][ans[k]].t : null }); ST.grade(q.id, good ? 2 : 0); });
        const score = Math.round((okc / total) * 200) / 10;
        S().exam.push({ date: Date.now(), score, n: total }); ST.save();
        const xp = Math.round(score * 5); ST.gain(xp);
        const mention = score >= 16 ? 'Mention très bien.' : score >= 14 ? 'Mention bien.' : score >= 12 ? 'Mention assez bien.' : score >= 10 ? 'Admise.' : 'Ajournée : on y retourne.';
        result(box, {
          big: score.toString().replace('.', ',') + '/20', sub: mention + ` ${okc} bonnes réponses sur ${total}.`, xp, confetti: score >= 14, stamp: score >= 10 ? (score >= 14 ? 'Admise avec mention' : 'Admise') : 'Ajournée', kind: score >= 10 ? 'ok' : 'ko',
          extra: wrong.length ? [h('div', { class: 'missed' }, h('h3', null, 'Correction des erreurs (' + wrong.length + ')'), wrong.map(w => h('details', null, h('summary', { html: md(w.q.q) }), w.a ? h('p', { class: 'bad-ans' }, 'Ta réponse : ', h('span', { html: md(w.a) })) : h('p', { class: 'bad-ans' }, 'Sans réponse'), h('p', { class: 'good-ans' }, 'Bonne réponse : ', h('span', { html: md(w.q.good) })), w.q.exp ? h('p', { class: 'exp', html: md(w.q.exp) }) : null)))] : [],
          actions: [{ label: 'Nouvel examen', primary: true, onclick: () => (location.hash = '#/examen') }, { label: 'Accueil', href: '#/' }]
        });
        box.firstChild.__ex = true;
      }
      render();
    }
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Examen blanc', '20 questions mélangées, un chrono, aucune aide. La note arrive à la fin, avec la correction.', { href: '#/jouer', label: 'Jouer' }),
      h('section', { class: 'panel' }, h('h3', null, 'Quels chapitres ?'), pick, h('h3', null, 'Durée'), h('div', { class: 'segs' }, mOpts), h('button', { class: 'btn primary big', type: 'button', onclick: start }, icon('clock', 18), 'Démarrer l\'examen')),
      past.length ? h('section', { class: 'panel' }, h('h3', null, 'Tes derniers examens'), h('div', { class: 'past' }, past.map(e => h('div', null, h('b', null, String(e.score).replace('.', ',') + '/20'), h('span', null, new Date(e.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }))))))
        : null));
  }

  /* ============ Quiz auto-générés (définitions, arrêts, chiffres) ============ */
  function autoQuiz(kind, chs) {
    const out = [];
    if (kind === 'gloss') {
      const L = DATA.gloss.filter(x => chs.has(x.ch));
      sample(L, 12).forEach(x => out.push({ id: x.id, ch: x.ch, q: 'Quel terme correspond à cette définition : « ' + x.def + ' » ?', good: x.term, bad: sample(DATA.gloss.filter(y => y.term !== x.term), 3).map(y => y.term), exp: x.ref ? 'Référence : ' + x.ref : '', ref: '' }));
    }
    if (kind === 'juris') {
      const L = DATA.juris.filter(x => chs.has(x.ch));
      sample(L, 10).forEach(x => out.push({ id: x.id, ch: x.ch, q: 'Quel arrêt dit ceci : « ' + x.sol + ' » ?', good: x.label, bad: sample(DATA.juris.filter(y => y.label !== x.label), 3).map(y => y.label), exp: x.keep, ref: '' }));
    }
    if (kind === 'nums') {
      const pool = n => /ans$/.test(n) ? 'ans' : /^\d{4}$/.test(n) ? 'year' : 'small';
      const L = DATA.nums.filter(x => chs.has(x.ch));
      sample(L, 10).forEach(x => {
        const p = pool(x.n); const cand = [...new Set(DATA.nums.filter(y => pool(y.n) === p && y.n !== x.n).map(y => y.n))];
        const extra = p === 'ans' ? ['1 an', '5 ans', '20 ans'] : p === 'year' ? ['1804', '1955', '2020'] : ['1', '5', '6'];
        const bad = sample([...new Set([...cand, ...extra.filter(e => e !== x.n)])], 3);
        out.push({ id: x.id, ch: x.ch, q: 'Quel chiffre ou quelle durée ? ' + x.t, good: x.n, bad, exp: x.ref ? 'Référence : ' + x.ref : '', ref: '' });
      });
    }
    return out;
  }

  window.Games = { quiz, cartes, vf, articles, associer, cas, questions, examen, runMCQ, autoQuiz };
})();
