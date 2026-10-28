/* Pages : accueil, chapitres, fiches, glossaire, schémas, progrès... */
(function () {
  'use strict';
  const { h, md, plain, norm, shuffle, sample, chap, mean, dayKey } = U;
  const { icon, ring, chapterPicker } = UI;
  const S = () => ST.S;
  const slug = s => norm(plain(s)).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const tag = id => { const c = chap(id); return h('span', { class: 'tag', style: { '--c': c.col } }, h('i'), 'Ch. ' + c.n + ' · ' + c.short); };
  const head = (title, lede, back) => h('header', { class: 'page-head' }, back ? h('a', { class: 'back', href: back.href }, icon('left', 16), back.label) : null, h('h1', null, title), lede ? h('p', { class: 'lede' }, lede) : null);
  const only = id => { S().prefs.chapters = [id]; ST.save(); };
  const allItems = () => [...DATA.cards, ...DATA.qcm, ...DATA.vf];

  /* ================= ACCUEIL ================= */
  function home(box) {
    const name = S().name || SITE.name;
    const due = ST.dueItems(allItems()).length;
    const seen = Object.keys(S().items).length;
    const gm = ST.globalMastery();
    const exam = S().examDate ? Math.ceil((new Date(S().examDate + 'T09:00') - Date.now()) / 864e5) : null;
    const dayArt = DATA.arts[Math.floor(Date.now() / 864e5) % DATA.arts.length];
    const hour = new Date().getHours();
    const hello = hour >= 22 || hour < 5 ? 'Bonne soirée' : hour < 12 ? 'Bonjour' : 'Salut';

    let mission, cta;
    if (!seen) { mission = 'Commence par lire la fiche du chapitre 1, puis lance ta première série de flashcards. Chaque bonne réponse colore ta parcelle.'; cta = h('a', { class: 'btn primary big', href: '#/fiche/c1' }, icon('book', 18), 'Lire la fiche du chapitre 1'); }
    else if (due > 0) { mission = `${due} élément${due > 1 ? 's' : ''} à revoir aujourd'hui. Dix minutes suffisent pour les remettre en mémoire.`; cta = h('a', { class: 'btn primary big', href: '#/quiz/go' }, icon('play', 18), 'Lancer la mission du jour'); }
    else { mission = 'Tout est à jour. Tu peux attaquer du nouveau, ou t\'éprouver avec un examen blanc.'; cta = h('a', { class: 'btn primary big', href: '#/quiz/go' }, icon('play', 18), 'Faire un quiz express'); }

    const hero = h('section', { class: 'hero' },
      h('div', { class: 'hero-text' },
        h('h1', null, name ? `${hello} ${name}.` : 'Ton cours de droit des biens, en parcelles.'),
        h('p', { class: 'lede' }, mission),
        h('div', { class: 'row-actions' }, cta, h('a', { class: 'btn', href: '#/jouer' }, 'Tous les jeux')),
        h('dl', { class: 'quick-stats' },
          h('div', null, h('dt', null, 'Série'), h('dd', null, ST.currentStreak() + (ST.currentStreak() > 1 ? ' jours' : ' jour'))),
          h('div', null, h('dt', null, 'XP'), h('dd', null, S().xp)),
          h('div', null, h('dt', null, 'Cours maîtrisé'), h('dd', null, Math.round(gm * 100) + ' %')),
          exam != null ? h('div', null, h('dt', null, 'Partiel'), h('dd', null, exam > 0 ? 'J-' + exam : exam === 0 ? 'Aujourd\'hui' : 'passé')) : null)),
      h('figure', { class: 'map-wrap' }, UI.parcelMap(), h('figcaption', null, 'Le plan de ton cours. Chaque parcelle se colore à mesure que tu la maîtrises : détenue, possédée, usucapée, puis propriété. Touche-en une.')));

    const list = h('section', { class: 'section' }, h('h2', null, 'Les cinq chapitres'),
      h('div', { class: 'chap-list' }, DATA.chapters.map(c => {
        const m = ST.mastery(c.id), st = ST.state(m);
        return h('a', { class: 'chap-row', href: '#/chapitre/' + c.id, style: { '--c': c.col } },
          h('span', { class: 'chap-n' }, c.n),
          h('span', { class: 'chap-t' }, h('b', null, c.title), h('small', null, c.part + ' · ' + c.blurb)),
          h('span', { class: 'chap-s' }, st.fem), ring(m, 'var(--ink)', 46));
      })));

    const day = h('section', { class: 'section day' }, h('h2', null, 'Article du jour'),
      h('blockquote', { class: 'f-art' }, h('cite', null, dayArt.ref), h('p', { html: md(dayArt.text.replace(/\{\{(.+?)\}\}/g, '**$1**')) })),
      h('a', { class: 'btn', href: '#/articles' }, 'Le compléter de mémoire'));

    box.replaceChildren(h('div', { class: 'wrap' }, hero, list, day));
  }

  /* ================= CHAPITRE ================= */
  function chapitre(box, args) {
    const c = chap(args[0]); if (!c) { location.hash = '#/cours'; return; }
    const m = ST.mastery(c.id), st = ST.state(m);
    const cnt = k => DATA[k].filter(x => x.ch === c.id).length;
    const tile = (ico, label, sub, href, extra) => h('a', { class: 'tile', href, onclick() { only(c.id); } }, h('span', { class: 'tile-i' }, icon(ico, 22)), h('b', null, label), h('small', null, sub));
    const jur = DATA.juris.filter(x => x.ch === c.id);
    box.replaceChildren(h('div', { class: 'wrap' },
      h('header', { class: 'chap-head', style: { '--c': c.col } },
        h('a', { class: 'back', href: '#/' }, icon('left', 16), 'Accueil'),
        h('div', { class: 'chap-head-main' },
          h('div', { class: 'big-n' }, c.n),
          h('div', null, h('p', { class: 'part' }, c.part), h('h1', null, c.title), h('p', { class: 'lede' }, c.blurb.charAt(0).toUpperCase() + c.blurb.slice(1) + '.')),
          h('div', { class: 'chap-ring' }, ring(m, 'var(--ink)', 84), h('p', null, h('b', null, st.fem), h('br'), st.line)))),
      h('div', { class: 'tiles' },
        tile('book', 'Lire la fiche', S().read[c.id] ? 'Déjà relue' : 'Cours structuré', '#/fiche/' + c.id),
        tile('cards', 'Flashcards', cnt('cards') + ' cartes', '#/cartes'),
        tile('quiz', 'Quiz', cnt('qcm') + ' questions', '#/quiz'),
        tile('bolt', 'Vrai ou faux', cnt('vf') + ' affirmations', '#/vf'),
        cnt('arts') ? tile('pen', 'Articles à compléter', cnt('arts') + ' textes', '#/articles') : null,
        DATA.cas.some(x => x.ch === c.id) ? tile('scale', 'Cas pratiques', cnt('cas') + ' cas', '#/cas') : null,
        tile('list', 'Questions de cours', cnt('coursq') + ' sujets', '#/questions')),
      jur.length ? h('section', { class: 'section' }, h('h2', null, 'Jurisprudence du chapitre'), h('div', { class: 'juris-list' }, jur.map(jurisCard))) : null));
  }

  /* ================= FICHE ================= */
  function planEl(nodes) {
    const li = n => typeof n === 'string' ? h('li', null, n) : h('li', null, h('span', null, n[0]), n[1] && n[1].length ? h('ul', null, n[1].map(li)) : null);
    return h('nav', { class: 'plan', 'aria-label': 'Plan du chapitre' }, h('b', null, 'Plan'), h('ul', null, nodes.map(li)));
  }
  function block(b, toc) {
    const t = b[0];
    if (t === 'intro') return h('p', { class: 'f-intro', html: md(b[1]) });
    if (t === 'mnemo') return h('div', { class: 'mnemo' }, h('div', { class: 'mnemo-k' }, b[1]), h('p', { html: md(b[2]) }));
    if (t === 'plan') return planEl(b[1]);
    if (t === 'h2' || t === 'h3') { const id = slug(b[1]); toc.push({ id, t: b[1], l: t }); return h(t, { id, html: md(b[1]) }); }
    if (t === 'h4') return h('h4', { html: md(b[1]) });
    if (t === 'p') return h('p', { html: md(b[1]) });
    if (t === 'ul') return h('ul', { class: 'f-ul' }, b[1].map(x => h('li', { html: md(x) })));
    if (t === 'def') return h('div', { class: 'f-def' }, h('b', null, b[1]), h('span', { html: md(b[2]) }));
    if (t === 'art') return h('blockquote', { class: 'f-art' }, h('cite', null, b[1]), h('p', { html: md(b[2]) }));
    if (t === 'juris') return h('div', { class: 'f-juris' }, h('div', { class: 'f-juris-l' }, icon('gavel', 16), b[1]), h('p', { html: md(b[2]) }));
    if (t === 'tip') return h('aside', { class: 'callout tip' }, h('b', null, 'À retenir'), h('p', { html: md(b[1]) }));
    if (t === 'trap') return h('aside', { class: 'callout trap' }, h('b', null, 'Piège'), h('p', { html: md(b[1]) }));
    if (t === 'note') return h('aside', { class: 'callout note' }, h('b', null, 'Dans tes notes'), h('p', { html: md(b[1]) }));
    if (t === 'table') return h('div', { class: 'table-scroll' }, h('table', null, h('thead', null, h('tr', null, b[1].map(x => h('th', null, x)))), h('tbody', null, b[2].map(r => h('tr', null, r.map((x, i) => h(i ? 'td' : 'th', { html: md(x), scope: i ? null : 'row' })))))));
    if (t === 'steps') return h('ol', { class: 'timeline' }, b[1].map(s => h('li', null, h('b', { html: md(s[0]) }), h('p', { html: md(s[1]) }))));
    if (t === 'pair') return h('div', { class: 'pair' }, b[1].map(s => h('div', { class: 'pair-i' }, h('b', { html: md(s[0]) }), h('p', { html: md(s[1]) }))));
    return h('p', null, '');
  }
  function fiche(box, args) {
    const c = chap(args[0]); if (!c || !DATA.fiche[c.id]) { location.hash = '#/cours'; return; }
    const toc = []; const body = h('div', { class: 'fiche-body' }, DATA.fiche[c.id].map(b => block(b, toc)));
    const idx = DATA.chapters.indexOf(c), prev = DATA.chapters[idx - 1], next = DATA.chapters[idx + 1];
    const readBtn = h('button', { class: 'btn primary', type: 'button', onclick() { if (!S().read[c.id]) { S().read[c.id] = Date.now(); ST.save(); ST.gain(20); UI.toast('Fiche relue, +20 XP'); UI.confetti(40); } readBtn.textContent = 'Fiche relue'; readBtn.disabled = true; } }, S().read[c.id] ? 'Fiche relue' : 'J\'ai relu cette fiche');
    readBtn.disabled = !!S().read[c.id];
    const side = h('nav', { class: 'toc', 'aria-label': 'Sommaire' }, h('b', null, 'Sommaire'), toc.map(t => h('a', { href: 'javascript:void 0', class: t.l, 'data-id': t.id, onclick(e) { e.preventDefault(); document.getElementById(t.id).scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, plain(t.t))));
    const prog = h('div', { class: 'read-prog' }, h('div'));
    box.replaceChildren(prog, h('div', { class: 'wrap fiche-wrap', style: { '--c': c.col } },
      h('header', { class: 'fiche-head' }, h('a', { class: 'back', href: '#/chapitre/' + c.id }, icon('left', 16), 'Chapitre ' + c.n), h('p', { class: 'part' }, c.part), h('h1', null, c.title)),
      h('div', { class: 'fiche-grid' }, body, side),
      h('footer', { class: 'fiche-foot' }, readBtn,
        h('div', { class: 'row-actions' }, h('a', { class: 'btn', href: '#/cartes', onclick() { only(c.id); } }, icon('cards', 16), 'Flashcards du chapitre'), h('a', { class: 'btn', href: '#/quiz', onclick() { only(c.id); } }, icon('quiz', 16), 'Quiz du chapitre')),
        h('div', { class: 'pager' }, prev ? h('a', { href: '#/fiche/' + prev.id }, icon('left', 16), 'Ch. ' + prev.n + ' · ' + prev.short) : h('span'), next ? h('a', { href: '#/fiche/' + next.id }, 'Ch. ' + next.n + ' · ' + next.short, icon('right', 16)) : null))));
    function onScroll() {
      const d = document.documentElement, p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
      prog.firstChild.style.width = (p * 100) + '%';
      let cur = null; toc.forEach(t => { const el = document.getElementById(t.id); if (el && el.getBoundingClientRect().top < 140) cur = t.id; });
      side.querySelectorAll('a').forEach(a => a.classList.toggle('cur', a.dataset.id === cur));
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }

  /* ================= COURS (hub) ================= */
  function cours(box) {
    const tiles = [
      ['book', 'Fiches de cours', DATA.chapters.length + ' chapitres', '#/chapitre/c1'],
      ['hash', 'Glossaire', DATA.gloss.length + ' termes', '#/glossaire'],
      ['flow', 'Schémas interactifs', DATA.trees.length + ' arbres de décision', '#/schemas'],
      ['list', 'Chiffres et délais', DATA.nums.length + ' repères', '#/chiffres'],
      ['gavel', 'Jurisprudence', DATA.juris.length + ' arrêts', '#/jurisprudence']
    ];
    const parts = [['Partie 1 · Les relations aux biens : propriété et possession', [['Titre 1 · La propriété', ['c1', 'c2']], ['Titre 2 · La possession', ['c3', 'c4']]]], ['Partie 2 · Les modalités de relation de propriété aux biens', [['Titre 1 · La propriété individuelle', ['c5']]]]];
    box.replaceChildren(h('div', { class: 'wrap' }, head('Le cours', 'Fiches, repères et outils pour comprendre avant de s\'entraîner.'),
      h('div', { class: 'tiles' }, tiles.map(t => h('a', { class: 'tile', href: t[3] }, h('span', { class: 'tile-i' }, icon(t[0], 22)), h('b', null, t[1]), h('small', null, t[2])))),
      h('section', { class: 'section' }, h('h2', null, 'Plan général'),
        h('div', { class: 'bigplan' }, parts.map(p => h('div', { class: 'bp-part' }, h('h3', null, p[0]), p[1].map(t => h('div', { class: 'bp-title' }, h('h4', null, t[0]), t[1].map(id => { const c = chap(id); return h('a', { class: 'chap-row slim', href: '#/fiche/' + id, style: { '--c': c.col } }, h('span', { class: 'chap-n' }, c.n), h('span', { class: 'chap-t' }, h('b', null, c.title)), S().read[id] ? h('span', { class: 'chap-s' }, 'Relue') : null); })))))))));
  }

  /* ================= JOUER (hub) ================= */
  function jouer(box) {
    const dueC = ST.dueItems(DATA.cards).length, dueQ = ST.dueItems(DATA.qcm).length;
    const g = [
      ['cards', 'Flashcards', 'Retourne, évalue-toi, reviens au bon moment.', '#/cartes', dueC ? dueC + ' à revoir' : DATA.cards.length + ' cartes'],
      ['quiz', 'Quiz', 'Questions à choix multiple, avec explication.', '#/quiz', dueQ ? dueQ + ' à revoir' : DATA.qcm.length + ' questions'],
      ['bolt', 'Vrai ou faux', 'Série ou blitz de 60 secondes.', '#/vf', 'Record : ' + S().blitz],
      ['pen', 'Articles à compléter', 'Les textes du cours avec des trous.', '#/articles', DATA.arts.length + ' articles'],
      ['link', 'Associer', 'Termes, arrêts, chiffres : relie les paires.', '#/associer', '3 jeux'],
      ['scale', 'Cas pratiques', 'Qualifier, règle, application, conclusion.', '#/cas', DATA.cas.length + ' cas'],
      ['list', 'Questions de cours', 'Rédige, compare, auto-évalue.', '#/questions', DATA.coursq.length + ' sujets'],
      ['clock', 'Examen blanc', '20 questions, un chrono, une note.', '#/examen', S().exam.length ? 'Dernier : ' + S().exam[S().exam.length - 1].score + '/20' : 'Jamais tenté']
    ];
    box.replaceChildren(h('div', { class: 'wrap' }, head('Jouer', 'Huit façons de réviser. Alterne : ton cerveau retient mieux quand le format change.'),
      h('div', { class: 'tiles big' }, g.map(t => h('a', { class: 'tile', href: t[3] }, h('span', { class: 'tile-i' }, icon(t[0], 24)), h('b', null, t[1]), h('small', null, t[2]), h('em', null, t[4]))))));
  }

  /* ================= GLOSSAIRE ================= */
  function glossaire(box) {
    let q = '', ch = null;
    const input = h('input', { type: 'search', class: 'field', placeholder: 'Chercher un terme ou une définition', 'aria-label': 'Chercher dans le glossaire', oninput(e) { q = norm(e.target.value); paint(); } });
    const chips = h('div', { class: 'chips' }, h('button', { type: 'button', class: 'chip on', onclick: e => setCh(null, e) }, 'Tous'), DATA.chapters.map(c => h('button', { type: 'button', class: 'chip', style: { '--c': c.col }, onclick: e => setCh(c.id, e) }, h('i'), 'Ch. ' + c.n)));
    function setCh(id, e) { ch = id; [...chips.children].forEach(x => x.classList.remove('on')); e.currentTarget.classList.add('on'); paint(); }
    const out = h('div', { class: 'gloss' });
    function paint() {
      const L = DATA.gloss.filter(g => (!ch || g.ch === ch) && (!q || norm(g.term + ' ' + g.def).includes(q))).sort((a, b) => norm(a.term).localeCompare(norm(b.term)));
      let cur = '';
      out.replaceChildren(...(L.length ? L.flatMap(g => { const l = norm(g.term)[0].toUpperCase(), r = []; if (l !== cur) { cur = l; r.push(h('h3', { class: 'letter' }, l)); } r.push(h('div', { class: 'g-item' }, h('div', { class: 'g-top' }, h('b', null, g.term), tag(g.ch)), h('p', { html: md(g.def) }), g.ref ? h('span', { class: 'ref' }, g.ref) : null)); return r; }) : [h('p', { class: 'empty' }, 'Aucun terme ne correspond. Essaie un mot plus court.')]));
    }
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Glossaire', DATA.gloss.length + ' termes tirés de ton cours.', { href: '#/cours', label: 'Le cours' }), h('div', { class: 'toolbar' }, input, h('button', { class: 'btn', type: 'button', onclick() { Games.runMCQ(box, Games.autoQuiz('gloss', new Set(DATA.chapters.map(c => c.id))), { title: 'Définitions', back: '#/glossaire', grade: false, again: () => glossaire(box) }); } }, icon('quiz', 16), 'Me tester')), chips, out));
    paint();
  }

  /* ================= CHIFFRES ================= */
  function chiffres(box) {
    let test = false;
    const grid = h('div', { class: 'nums' });
    function paint() {
      grid.replaceChildren(...DATA.nums.map(n => {
        const num = h('div', { class: 'num-n' + (test ? ' hide' : '') }, n.n);
        const el = h('button', { type: 'button', class: 'num', style: { '--c': chap(n.ch).col }, onclick() { num.classList.remove('hide'); } }, num, h('p', null, n.t), n.ref ? h('span', { class: 'ref' }, n.ref) : null);
        return el;
      }));
    }
    box.replaceChildren(h('div', { class: 'wrap' }, head('Chiffres et délais', 'Les nombres qui reviennent en examen. Active le mode test pour les cacher, puis touche une carte pour révéler.', { href: '#/cours', label: 'Le cours' }),
      h('div', { class: 'toolbar' }, h('label', { class: 'switch' }, h('input', { type: 'checkbox', onchange(e) { test = e.target.checked; paint(); } }), h('span', null, 'Mode test')),
        h('button', { class: 'btn', type: 'button', onclick() { Games.runMCQ(box, Games.autoQuiz('nums', new Set(DATA.chapters.map(c => c.id))), { title: 'Chiffres', back: '#/chiffres', grade: false, again: () => chiffres(box) }); } }, icon('quiz', 16), 'Quiz chiffres')), grid));
    paint();
  }

  /* ================= JURISPRUDENCE ================= */
  function jurisCard(j) {
    return h('article', { class: 'j-card', style: { '--c': chap(j.ch).col } }, h('div', { class: 'j-top' }, h('h3', null, j.label), tag(j.ch)), h('p', { class: 'j-theme' }, j.theme), h('p', { html: md(j.sol) }), j.keep ? h('p', { class: 'j-keep' }, h('b', null, 'À retenir. '), h('span', { html: md(j.keep) })) : null);
  }
  function jurisprudence(box) {
    let q = '', ch = null;
    const input = h('input', { type: 'search', class: 'field', placeholder: 'Chercher un arrêt ou un thème', 'aria-label': 'Chercher un arrêt', oninput(e) { q = norm(e.target.value); paint(); } });
    const chips = h('div', { class: 'chips' }, h('button', { type: 'button', class: 'chip on', onclick: e => setCh(null, e) }, 'Tous'), DATA.chapters.map(c => h('button', { type: 'button', class: 'chip', style: { '--c': c.col }, onclick: e => setCh(c.id, e) }, h('i'), 'Ch. ' + c.n)));
    function setCh(id, e) { ch = id; [...chips.children].forEach(x => x.classList.remove('on')); e.currentTarget.classList.add('on'); paint(); }
    const out = h('div', { class: 'juris-list' });
    function paint() { const L = DATA.juris.filter(j => (!ch || j.ch === ch) && (!q || norm(j.label + ' ' + j.theme + ' ' + j.sol).includes(q))); out.replaceChildren(...(L.length ? L.map(jurisCard) : [h('p', { class: 'empty' }, 'Aucun arrêt ne correspond.')])); }
    box.replaceChildren(h('div', { class: 'wrap narrow' }, head('Jurisprudence', DATA.juris.length + ' arrêts cités dans tes notes. Certaines dates sont incomplètes dans tes notes : vérifie-les dans ton cours.', { href: '#/cours', label: 'Le cours' }),
      h('div', { class: 'toolbar' }, input, h('button', { class: 'btn', type: 'button', onclick() { Games.runMCQ(box, Games.autoQuiz('juris', new Set(DATA.chapters.map(c => c.id))), { title: 'Quel arrêt ?', back: '#/jurisprudence', grade: false, again: () => jurisprudence(box) }); } }, icon('quiz', 16), 'Quel arrêt ?')), chips, out));
    paint();
  }

  /* ================= SCHÉMAS ================= */
  function schemas(box, args) {
    if (args[0]) return tree(box, DATA.trees.find(t => t.id === args[0]));
    box.replaceChildren(h('div', { class: 'wrap' }, head('Schémas interactifs', 'Réponds aux questions une par une : tu suis le raisonnement que le juge suivrait.', { href: '#/cours', label: 'Le cours' }),
      h('div', { class: 'grid cases' }, DATA.trees.map(t => h('a', { class: 'case-card', href: '#/schemas/' + t.id, style: { '--c': chap(t.ch).col } }, tag(t.ch), h('h3', null, t.title), h('p', null, t.blurb), h('span', { class: 'case-meta' }, icon('flow', 14), 'Arbre de décision'))))));
  }
  function tree(box, t) {
    if (!t) { location.hash = '#/schemas'; return; }
    let node = t.start; const path = [];
    function render() {
      const n = t.nodes[node];
      const trail = h('ol', { class: 'trail' }, path.map(p => h('li', null, h('span', null, plain(p.q)), h('b', null, p.a))));
      let card;
      if (n.r) {
        card = h('article', { class: 'qcard result-node ' + (n.tone || 'mid') }, h('p', { class: 'verdict-l' }, n.tone === 'ok' ? 'Conclusion' : n.tone === 'ko' ? 'Conclusion' : 'À nuancer'), h('h2', { class: 'q', html: md(n.r) }), n.ref ? h('span', { class: 'ref' }, n.ref) : null,
          h('div', { class: 'row-actions' }, h('button', { class: 'btn primary', type: 'button', onclick() { node = t.start; path.length = 0; render(); } }, 'Recommencer'), h('a', { class: 'btn', href: '#/schemas' }, 'Autres schémas')));
        if (!S().flags['t-' + t.id]) { S().flags['t-' + t.id] = 1; ST.gain(10); }
      } else {
        card = h('article', { class: 'qcard' }, h('h2', { class: 'q', html: md(n.q) }), n.hint ? h('p', { class: 'hint' }, n.hint) : null,
          h('div', { class: 'opts' }, n.o.map((o, k) => h('button', { class: 'opt', type: 'button', onclick() { path.push({ q: n.q, a: o[0] }); node = o[1]; render(); } }, h('b', null, k + 1), h('span', { html: md(o[0]) })))));
      }
      box.replaceChildren(h('div', { class: 'wrap narrow' }, head(t.title, t.blurb, { href: '#/schemas', label: 'Schémas' }), trail.children.length ? trail : null, card,
        path.length && !n.r ? h('button', { class: 'btn ghost', type: 'button', onclick() { const p = path.pop(); node = Object.keys(t.nodes).find(k => t.nodes[k].o && t.nodes[k].q === p.q); render(); } }, icon('left', 16), 'Revenir en arrière') : null));
      ST.clearKeys(); ST.onKey(e => { if (!n.r && '123456'.includes(e.key) && n.o[+e.key - 1]) { path.push({ q: n.q, a: n.o[+e.key - 1][0] }); node = n.o[+e.key - 1][1]; render(); } });
    }
    render();
  }

  /* ================= PROGRÈS ================= */
  function progres(box) {
    const s = S(), lvl = ST.levelOf(s.xp), lo = ST.levelFloor(lvl), hi = ST.levelFloor(lvl + 1), pct = (s.xp - lo) / (hi - lo);
    const acc = s.stats.answered ? Math.round((s.stats.correct / s.stats.answered) * 100) : 0;
    const cells = []; const today = new Date(); const dow = (today.getDay() + 6) % 7;
    for (let k = 28 + dow; k >= -(6 - dow); k--) { const d = new Date(today.getTime() - k * 864e5); const v = k < 0 ? 0 : (s.days[dayKey(d)] || 0); cells.push(h('i', { class: 'hc l' + (v === 0 ? 0 : v < 40 ? 1 : v < 120 ? 2 : 3) + (k < 0 ? ' future' : ''), title: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) + ' : ' + v + ' XP' })); }
    const weak = Object.entries(s.items).filter(([, it]) => it.w > 0).sort((a, b) => b[1].w - a[1].w).slice(0, 6).map(([id, it]) => { const x = [...DATA.cards, ...DATA.qcm, ...DATA.vf, ...DATA.arts].find(y => y.id === id); return x ? { x, it } : null; }).filter(Boolean);
    const examInput = h('input', { type: 'date', class: 'field', value: s.examDate || '', 'aria-label': 'Date du partiel', onchange(e) { s.examDate = e.target.value; ST.save(); toast('Date enregistrée'); } });
    const toast = UI.toast;
    const fileIn = h('input', { type: 'file', accept: 'application/json', hidden: true, onchange(e) { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { ST.replace(JSON.parse(t)); toast('Progression importée'); progres(box); } catch (er) { toast('Fichier illisible'); } }); } });
    box.replaceChildren(h('div', { class: 'wrap' }, head('Ta progression', 'Tout est enregistré dans ce navigateur. Exporte un fichier si tu veux changer d\'appareil.'),
      h('section', { class: 'level-card' }, h('div', null, h('p', { class: 'lvl-n' }, 'Niveau ' + lvl), h('h2', null, ST.titleOf(lvl))), h('div', { class: 'lvl-bar' }, h('div', { class: 'track' }, h('div', { class: 'fill', style: { width: Math.round(pct * 100) + '%' } })), h('small', null, s.xp + ' XP · encore ' + (hi - s.xp) + ' pour « ' + ST.titleOf(lvl + 1) + ' »'))),
      h('dl', { class: 'quick-stats wide' }, h('div', null, h('dt', null, 'Série en cours'), h('dd', null, ST.currentStreak() + ' j')), h('div', null, h('dt', null, 'Meilleure série'), h('dd', null, (s.best || 0) + ' j')), h('div', null, h('dt', null, 'Réponses'), h('dd', null, s.stats.answered)), h('div', null, h('dt', null, 'Taux de réussite'), h('dd', null, acc + ' %'))),
      h('section', { class: 'section' }, h('h2', null, 'Ces 5 dernières semaines'), h('div', { class: 'heat' }, h('div', { class: 'heat-days' }, ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => h('span', null, d))), h('div', { class: 'heat-grid' }, cells))),
      h('section', { class: 'section' }, h('h2', null, 'Où en est chaque parcelle'), h('div', { class: 'chap-list' }, DATA.chapters.map(c => { const m = ST.mastery(c.id), st = ST.state(m); return h('a', { class: 'chap-row', href: '#/chapitre/' + c.id, style: { '--c': c.col } }, h('span', { class: 'chap-n' }, c.n), h('span', { class: 'chap-t' }, h('b', null, c.title), h('small', null, st.line)), h('span', { class: 'chap-s' }, st.fem), ring(m, 'var(--ink)', 46)); }))),
      weak.length ? h('section', { class: 'section' }, h('h2', null, 'Tes points faibles'), h('div', { class: 'list-stack' }, weak.map(({ x, it }) => h('details', { class: 'weak' }, h('summary', null, h('span', { html: md(x.q || x.s || x.ref) }), h('em', null, it.w + ' erreur' + (it.w > 1 ? 's' : ''))), h('p', { html: md(x.a || x.good || (x.v != null ? (x.v ? 'Vrai. ' : 'Faux. ') + x.exp : '') || plain(x.text || '')) }))))) : null,
      h('section', { class: 'section' }, h('h2', null, 'Badges'), h('div', { class: 'badges' }, ST.BADGES.map(b => { const on = !!s.badges[b.id]; return h('div', { class: 'badge' + (on ? ' on' : '') }, h('span', { class: 'badge-i' }, icon(on ? 'star' : 'x', 20)), h('b', null, b.n), h('small', null, b.d)); }))),
      h('section', { class: 'section' }, h('h2', null, 'Réglages'),
        h('div', { class: 'settings' },
          h('label', { class: 'set' }, h('span', null, 'Prénom'), h('input', { class: 'field', value: s.name, placeholder: 'Ton prénom', onchange(e) { s.name = e.target.value.trim(); ST.save(); } })),
          h('label', { class: 'set' }, h('span', null, 'Date du partiel (pour le compte à rebours)'), examInput),
          h('div', { class: 'row-actions' },
            h('button', { class: 'btn', type: 'button', onclick() { const blob = new Blob([JSON.stringify(s)], { type: 'application/json' }); const a = h('a', { href: URL.createObjectURL(blob), download: 'progression-droit-des-biens.json' }); document.body.append(a); a.click(); a.remove(); } }, 'Exporter ma progression'),
            h('button', { class: 'btn', type: 'button', onclick: () => fileIn.click() }, 'Importer'), fileIn,
            h('button', { class: 'btn danger', type: 'button', onclick() { if (confirm('Effacer toute ta progression ? Cette action est définitive.')) { ST.reset(); location.hash = '#/'; location.reload(); } } }, 'Tout effacer'))))));
  }

  /* ================= RECHERCHE ================= */
  function search() {
    const idx = [
      ...DATA.gloss.map(g => ({ k: 'Glossaire', t: g.term, d: g.def, ch: g.ch, n: norm(g.term + ' ' + g.def) })),
      ...DATA.juris.map(j => ({ k: 'Arrêt', t: j.label, d: j.sol, ch: j.ch, n: norm(j.label + ' ' + j.theme + ' ' + j.sol) })),
      ...DATA.cards.map(c => ({ k: 'Carte', t: c.q, d: c.a, ch: c.ch, n: norm(c.q + ' ' + c.a) })),
      ...DATA.arts.map(a => ({ k: 'Article', t: a.ref, d: a.text.replace(/\{\{(.+?)\}\}/g, '$1'), ch: a.ch, n: norm(a.ref + ' ' + a.text) }))
    ];
    const out = h('div', { class: 'search-out' }, h('p', { class: 'empty' }, 'Tape un mot : un article, un arrêt, une notion.'));
    const input = h('input', { type: 'search', class: 'field big', placeholder: 'Chercher dans tout le cours', 'aria-label': 'Recherche', oninput(e) {
      const q = norm(e.target.value).trim(); if (q.length < 2) { out.replaceChildren(h('p', { class: 'empty' }, 'Tape au moins deux lettres.')); return; }
      const r = idx.filter(x => x.n.includes(q)).slice(0, 24);
      out.replaceChildren(...(r.length ? r.map(x => h('div', { class: 'sr' }, h('div', { class: 'sr-t' }, h('span', { class: 'kind' }, x.k), h('b', { html: md(x.t) })), h('p', { html: md(x.d) }), tag(x.ch))) : [h('p', { class: 'empty' }, 'Rien trouvé. Essaie un mot plus court.')]));
    } });
    UI.modal(h('div', null, input, out), { label: 'Recherche' });
  }

  window.Views = { home, chapitre, fiche, cours, jouer, glossaire, chiffres, jurisprudence, schemas, progres, search };
})();
