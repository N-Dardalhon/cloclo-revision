/* Épreuves type partiel : sujets (dans et hors du cours), analyse du sujet contre le hors-sujet,
   kit de survie, plan corrigé, auto-évaluation. Données : js/data/epreuves-*.js */
(function () {
  'use strict';
  const { h, md, plain, shuffle } = U;
  const { icon, stamp, toast, sessionBar } = UI;
  const S = () => ST.S;
  const LET = 'ABCD';
  const E = () => (window.EPREUVES || {})[SITE.matiere] || { sujets: [], lecture: [] };
  const scores = () => (S().ep = S().ep || {});

  const TYPES = { diss: 'Dissertation', comm: 'Commentaire', cas: 'Cas pratique', q: 'Question de cours' };
  const NIV = {
    cours: ['Au programme', 'Vu en cours : ici on travaille la lecture du sujet.'],
    frontiere: ['À la frontière', 'Effleuré en cours : il faut aller un peu plus loin.'],
    hors: ['Hors cours', 'Jamais vu en cours : le kit de survie te donne l\'essentiel.']
  };
  const head = (title, lede, back) => h('header', { class: 'page-head' },
    back ? h('a', { class: 'back', href: back.href }, icon('left', 16), back.label) : null,
    h('h1', null, title), lede ? h('p', { class: 'lede' }, lede) : null);
  const badge = n => h('span', { class: 'ep-niv ep-' + n }, NIV[n][0]);
  const typeTag = t => h('span', { class: 'tag' }, h('i', { style: { background: 'var(--ink)' } }), TYPES[t]);
  const paras = s => String(s).split(/\n\n+/).map(p => h('p', { html: md(p).replace(/\n/g, '<br>') }));
  const ul = (list, cls) => h('ul', { class: cls || 'ep-ul' }, list.map(x => h('li', { html: md(x) })));
  const planEl = plan => h('div', { class: 'ep-plan' }, plan.map(p => h('div', { class: 'ep-part' }, h('h4', null, p[0]), ul(p[1]))));
  const kitEl = (s, open) => h('details', { class: 'ep-kit', open: open || null },
    h('summary', null, icon('book', 16), s.niveau === 'cours' ? ' Rappel du cours' : ' Kit de survie : l\'essentiel sur « ' + s.theme + ' »'), ul(s.kit));

  /* ================= Liste ================= */
  function hub(box, args) {
    if (args[0]) return run(box, E().sujets.find(s => s.id === args[0]));
    let fType = 'all', fNiv = 'all';
    const L = E().sujets;
    const grid = h('div', { class: 'grid cases' });
    const seg = (opts, cur, set) => h('div', { class: 'chips' }, opts.map(([v, label]) => h('button', {
      type: 'button', class: 'chip' + (v === cur() ? ' on' : ''),
      onclick(e) { set(v); [...e.currentTarget.parentNode.children].forEach(b => b.classList.toggle('on', b === e.currentTarget)); paint(); }
    }, label)));
    function paint() {
      const list = L.filter(s => (fType === 'all' || s.type === fType) && (fNiv === 'all' || s.niveau === fNiv || (fNiv === 'hors' && s.niveau === 'frontiere')));
      grid.replaceChildren(...list.map(s => {
        const sc = scores()[s.id];
        return h('a', { class: 'case-card ep-card', href: '#/epreuves/' + s.id, style: { '--c': s.niveau === 'cours' ? 'var(--brand)' : s.niveau === 'hors' ? 'var(--stamp)' : 'var(--gold)' } },
          h('div', { class: 'ep-tags' }, typeTag(s.type), badge(s.niveau)),
          h('h3', null, s.sujet),
          h('p', null, s.theme + ' · ' + s.duree),
          h('span', { class: 'case-meta' }, s.lecture.length + ' étapes d\'analyse · ' + s.points.length + ' points attendus', sc != null ? ' · meilleur score ' + Math.round(sc * 100) + ' %' : ''));
      }));
      if (!list.length) grid.append(h('p', { class: 'empty' }, 'Aucun sujet avec ces filtres.'));
    }
    const nHors = L.filter(s => s.niveau !== 'cours').length;
    box.replaceChildren(h('div', { class: 'wrap' },
      head('Épreuves type partiel', `${L.length} sujets, dont ${nHors} hors du cours ou à sa frontière. Pour chacun : tu analyses le sujet (c'est là que se joue le hors-sujet), tu fais ton plan, puis tu compares avec le corrigé.`, { href: '#/jouer', label: 'Jouer' }),
      h('div', { class: 'tiles ep-hub-tiles' },
        h('a', { class: 'tile', href: '#/methode' }, h('span', { class: 'tile-i' }, icon('flow', 22)), h('b', null, 'Méthode anti hors-sujet'), h('small', null, 'Lire un sujet, le délimiter, et que faire face à un thème jamais vu.')),
        h('a', { class: 'tile', href: '#/lecture' }, h('span', { class: 'tile-i' }, icon('quiz', 22)), h('b', null, 'Lire un sujet'), h('small', null, 'Un intitulé, quatre lectures : trouve la bonne.'), h('em', null, E().lecture.length + ' sujets')),
        h('a', { class: 'tile', href: '#/kits' }, h('span', { class: 'tile-i' }, icon('book', 22)), h('b', null, 'Notions hors cours'), h('small', null, 'Tous les kits de survie, à lire comme des mini-fiches.'))),
      h('section', { class: 'panel ep-filters' },
        h('h3', null, 'Type d\'épreuve'), seg([['all', 'Tous'], ['diss', 'Dissertations'], ['comm', 'Commentaires'], ['cas', 'Cas pratiques'], ['q', 'Questions']], () => fType, v => fType = v),
        h('h3', null, 'Thème'), seg([['all', 'Tous'], ['hors', 'Hors cours'], ['cours', 'Au programme']], () => fNiv, v => fNiv = v)),
      grid));
    paint();
  }

  /* ================= Déroulé d'une épreuve ================= */
  function run(box, s) {
    if (!s) { location.hash = '#/epreuves'; return; }
    let ok = 0, xp = 0;
    const quit = () => { ST.clearKeys(); location.hash = '#/epreuves'; };
    const sujetBox = () => h('aside', { class: 'facts ep-sujet' },
      h('div', { class: 'ep-tags' }, typeTag(s.type), badge(s.niveau), h('span', { class: 'ref' }, s.duree)),
      h('h2', null, s.sujet), s.doc ? h('div', { class: 'ep-doc' }, paras(s.doc)) : null);

    // Étape 0 : le sujet
    function intro() {
      const tips = {
        diss: 'Avant d\'écrire quoi que ce soit : souligne chaque mot du sujet, définis-le, et demande-toi ce qui est exclu.',
        comm: 'Tout part du texte : chaque partie de ton plan doit pouvoir citer des mots du document.',
        cas: 'Qualifie d\'abord les faits et les parties, sépare les problèmes, puis syllogisme pour chacun.',
        q: 'Réponse directe et structurée : définition, règle, précisions, sans dériver.'
      };
      box.replaceChildren(h('div', { class: 'wrap narrow' },
        h('a', { class: 'back', href: '#/epreuves' }, icon('left', 16), 'Épreuves'),
        sujetBox(),
        h('div', { class: 'callout note' }, h('b', null, NIV[s.niveau][0]), h('p', null, NIV[s.niveau][1])),
        h('div', { class: 'callout tip' }, h('b', null, 'Réflexe'), h('p', null, tips[s.type])),
        h('p', { class: 'muted' }, 'Prends deux minutes au brouillon pour noter les mots-clés et ta première idée de problématique. Ensuite, l\'analyse guidée vérifie que tu as bien lu le sujet.'),
        h('div', { class: 'row-actions' },
          h('button', { class: 'btn primary big', type: 'button', onclick: () => step(0) }, icon('play', 18), 'Analyser le sujet'),
          h('button', { class: 'btn', type: 'button', onclick: draft }, 'Passer directement au plan'))));
    }

    // Étape 1 : analyse du sujet (QCM)
    function step(i) {
      if (i >= s.lecture.length) return draft();
      const st = s.lecture[i]; let answered = false;
      const opts = shuffle(st.opts.map((t, k) => ({ t, g: k === st.ans })));
      const card = h('article', { class: 'qcard' }, h('h3', { class: 'q' }, h('span', { class: 'stepno' }, 'Analyse ' + (i + 1) + '/' + s.lecture.length), ' ', h('span', { html: md(st.q) })));
      const list = h('div', { class: 'opts' }); const fb = h('div', { class: 'feedback', 'aria-live': 'polite' });
      const bs = opts.map((op, k) => { const b = h('button', { class: 'opt', type: 'button', onclick: () => pick(k) }, h('b', null, LET[k]), h('span', { html: md(op.t) })); list.append(b); return b; });
      card.append(list);
      function pick(k) {
        if (answered) return; answered = true; const good = opts[k].g;
        bs.forEach((b, j) => { b.disabled = true; b.classList.add(opts[j].g ? 'good' : (j === k ? 'bad' : 'dim')); });
        if (good) { ok++; xp += 10; } else xp += 2;
        stamp(card, good ? 'Validé' : 'Hors sujet', good ? 'ok' : 'ko'); if (!good) card.classList.add('shake');
        U.add(fb, h('p', { class: 'verdict ' + (good ? 'ok' : 'ko') }, good ? 'Bonne lecture.' : 'Attention, piège.'), h('p', { class: 'exp', html: md(st.exp) }),
          h('button', { class: 'btn primary next', type: 'button', onclick: () => step(i + 1) }, i + 1 < s.lecture.length ? 'Étape suivante' : 'Faire mon plan', icon('right', 16)));
        fb.querySelector('.next').focus({ preventScroll: true });
        fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      box.replaceChildren(h('div', { class: 'wrap narrow' }, sessionBar('Analyse du sujet', i, s.lecture.length, quit), sujetBox(), card, fb));
      ST.clearKeys(); ST.onKey(e => { if (!answered && '1234'.includes(e.key) && opts[+e.key - 1]) pick(+e.key - 1); else if (answered && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fb.querySelector('.next').click(); } });
    }

    // Étape 2 : brouillon
    function draft() {
      ST.clearKeys();
      const ph = s.type === 'cas' ? 'Pour chaque problème : faits qualifiés, problème de droit, règle, application, conclusion.'
        : s.type === 'q' ? 'Ta réponse structurée, en quelques lignes.'
        : 'Définitions des termes, problématique, puis plan : I. A. B. / II. A. B.';
      const ta = h('textarea', { class: 'draft', rows: 10, placeholder: ph + ' (Rien n\'est enregistré : tu peux aussi écrire sur papier.)' });
      box.replaceChildren(h('div', { class: 'wrap narrow' },
        sessionBar('Ton plan', s.lecture.length, s.lecture.length, quit, 'Plan'),
        sujetBox(),
        s.defs && s.defs.length ? h('div', { class: 'callout tip' }, h('b', null, 'Termes à définir'), h('p', { html: s.defs.map(md).join(' · ') })) : null,
        s.niveau !== 'cours' ? h('p', { class: 'muted' }, 'Thème inconnu ? Essaie d\'abord avec ce que tu sais (définitions, droit commun, notions voisines du cours), puis ouvre le kit si tu bloques.') : null,
        kitEl(s, false),
        ta,
        h('div', { class: 'row-actions' }, h('button', { class: 'btn primary', type: 'button', onclick: () => corrige(ta.value) }, 'Voir le corrigé', icon('right', 16)))));
      ta.focus();
    }

    // Étape 3 : corrigé et auto-évaluation
    function corrige(mine) {
      const boxes = s.points.map(p => h('label', { class: 'check' }, h('input', { type: 'checkbox' }), h('span', { html: md(p) })));
      const save = h('button', { class: 'btn primary', type: 'button', onclick() {
        const n = boxes.filter(b => b.firstChild.checked).length;
        const pa = s.lecture.length ? ok / s.lecture.length : 1, pp = n / s.points.length;
        const sc = s.lecture.length ? .4 * pa + .6 * pp : pp;
        scores()[s.id] = Math.max(scores()[s.id] || 0, sc); ST.save();
        const gained = xp + 10 + n * 4; ST.gain(gained);
        if (sc >= .75) UI.confetti();
        toast(Math.round(sc * 100) + ' % · +' + gained + ' XP');
        location.hash = '#/epreuves';
      } }, 'Enregistrer mon auto-évaluation');
      box.replaceChildren(h('div', { class: 'wrap narrow ep-corr' },
        h('a', { class: 'back', href: '#/epreuves' }, icon('left', 16), 'Épreuves'),
        sujetBox(),
        s.lecture.length ? h('p', { class: 'muted' }, 'Analyse du sujet : ' + ok + '/' + s.lecture.length + ' bonnes lectures.') : null,
        mine && mine.trim() ? h('details', { class: 'ep-kit' }, h('summary', null, 'Ce que tu as écrit'), h('p', { class: 'serif ep-mine' }, mine)) : null,
        h('div', { class: 'corrige' },
          h('h3', null, s.type === 'cas' || s.type === 'q' ? 'Démarche attendue' : 'Problématique'),
          h('p', { html: md(s.problematique) }),
          h('h3', null, s.type === 'cas' ? 'Corrigé' : s.type === 'q' ? 'Réponse type' : 'Plan détaillé'),
          planEl(s.plan)),
        h('div', { class: 'callout trap' }, h('b', null, 'Hors-sujet à éviter'), ul(s.hs)),
        kitEl(s, s.niveau !== 'cours'),
        h('h3', null, 'Points attendus : coche honnêtement ceux que tu avais'),
        h('div', { class: 'checks' }, boxes),
        h('div', { class: 'row-actions' }, save, h('button', { class: 'btn', type: 'button', onclick: () => run(box, s) }, 'Recommencer'))));
    }

    intro();
  }

  /* ================= Lire un sujet (QCM) ================= */
  function lecture(box) {
    const items = shuffle(E().lecture.map((x, i) => ({
      id: 'lec-' + SITE.matiere + '-' + i,
      q: 'Sujet : **« ' + x[0].replace(/^«\s*|\s*»$/g, '') + ' »**. Que faut-il traiter ?',
      good: x[1], bad: x[2], exp: x[3]
    })));
    Games.runMCQ(box, items, { title: 'Lire un sujet', back: '#/epreuves', grade: false, again: () => lecture(box) });
  }

  /* ================= Kits ================= */
  function kits(box) {
    const L = E().sujets.filter(s => s.niveau !== 'cours');
    const seen = new Set();
    box.replaceChildren(h('div', { class: 'wrap narrow' },
      head('Notions hors cours', 'Les thèmes qui peuvent tomber sans avoir été traités en cours. Lis-les comme des mini-fiches : l\'objectif n\'est pas de tout savoir, mais de ne jamais être prise au dépourvu.', { href: '#/epreuves', label: 'Épreuves' }),
      h('div', { class: 'ep-kits' }, L.filter(s => !seen.has(s.theme) && seen.add(s.theme)).map(s => h('details', { class: 'ep-kit' },
        h('summary', null, badge(s.niveau), ' ', h('b', null, s.theme)),
        ul(s.kit),
        h('a', { class: 'btn', href: '#/epreuves/' + s.id }, 'S\'entraîner : ' + plain(s.sujet)))))));
  }

  /* ================= Méthode ================= */
  function methode(box) {
    const sec = (t, ...kids) => h('section', { class: 'ep-meth' }, h('h2', null, t), ...kids);
    const steps = [
      ['Recopier le sujet et souligner chaque mot', 'Y compris les petits mots : « le », « les », « et », « ou », le point d\'interrogation, les guillemets. « Le possesseur » n\'est pas « La possession » ; « Vente et donation » n\'est pas « La vente » puis « La donation ».'],
      ['Définir juridiquement chaque terme', 'Avec un article de Code si possible. Le sens courant n\'est jamais le bon (« patrimoine » ≠ monuments, « accession » ≠ devenir propriétaire de son logement).'],
      ['Délimiter : ce qui est dedans, ce qui est dehors', 'Écris-le noir sur blanc dans l\'introduction : « seront exclus… car… ». Une notion voisine se cite pour être écartée, elle ne se développe pas.'],
      ['Trouver la tension du sujet', 'Pourquoi ce sujet est-il posé ? Quel paradoxe, quelle évolution, quel débat ? Si tu ne vois pas d\'enjeu, tu vas réciter.'],
      ['Formuler la problématique', 'Une vraie question, qui contient les mots du sujet, et à laquelle le plan répond. Si ta problématique pourrait servir pour un autre sujet, elle est trop large.'],
      ['Construire le plan, puis le tester', 'Deux parties, deux sous-parties, avec des titres qui démontrent (pas « Les conditions » mais « Des conditions exigeantes »). Puis le test ci-dessous.']
    ];
    box.replaceChildren(h('div', { class: 'wrap narrow ep-methode' },
      head('Méthode anti hors-sujet', 'Le hors-sujet ne vient presque jamais d\'un manque de connaissances : il vient d\'une mauvaise lecture du sujet, ou de la panique devant un thème inconnu. Les deux se travaillent.', { href: '#/epreuves', label: 'Épreuves' }),
      sec('Pourquoi on fait un hors-sujet',
        ul([
          `**On récite le cours le plus proche.** On reconnaît un mot (« possession ») et on déroule le chapitre entier, alors que le sujet portait sur un point précis (« le possesseur de bonne foi »).`,
          `**On lit un mot-clé, pas le sujet.** « La garantie des vices cachés » devient « les garanties du vendeur », et la moitié de la copie parle d'éviction.`,
          `**On panique devant un thème jamais vu** et on le remplace par un thème maîtrisé. C'est le pire des cas : zéro point sur le fond, même avec une copie juste.`
        ])),
      sec('Les six étapes, au brouillon (15 à 20 minutes)',
        h('ol', { class: 'ep-steps' }, steps.map(([t, d]) => h('li', null, h('b', null, t), h('p', null, d))))),
      sec('Le test du plan',
        h('div', { class: 'callout trap' }, h('b', null, 'Pour chaque I, II, A, B, pose-toi trois questions'),
          ul([`Est-ce que le titre contient **un mot du sujet** (ou un synonyme exact) ?`, `Est-ce que cette partie **répond à ma problématique** ?`, `Est-ce que je pourrais **la recopier telle quelle** dans une autre dissertation ? Si oui : danger, c'est du cours récité.`]))),
      sec('Face à un thème jamais vu en cours',
        ul([
          `**Ne jamais changer de sujet.** Une copie modeste mais dans le sujet vaut bien plus qu'une copie brillante à côté.`,
          `**Repartir des définitions et du droit commun.** Chose, bien, droit réel, propriété (art. 544), contrat (art. 1101), obligation, responsabilité : presque tout sujet s'y rattache.`,
          `**Raisonner par comparaison avec une notion vue.** La servitude se compare à l'usufruit et à la propriété ; la CVIM au Code civil ; l'échange à la vente.`,
          `**Si le Code est autorisé, s'en servir.** L'index alphabétique et la table des matières donnent les articles du thème en deux minutes ; les articles qui se suivent dessinent souvent le plan (notion, conditions, effets, extinction).`,
          `**Prendre un plan sûr.** Notion / régime ; conditions / effets ; principe / limites ; critères / enjeux (pour « A et B »). Puis donner à chaque titre une idée.`,
          `**Rester honnête.** Ne pas inventer d'articles ni d'arrêts : un raisonnement juste avec peu de références vaut mieux qu'une référence fausse.`
        ])),
      sec('Les formats',
        h('div', { class: 'ep-formats' },
          h('div', { class: 'callout note' }, h('b', null, 'Dissertation'), h('p', { html: md('Accroche, définitions, délimitation, intérêts, **problématique**, annonce de plan. Deux parties, deux sous-parties, chapeaux et transitions. Conclusion : réponse à la question, ouverture facultative.') })),
          h('div', { class: 'callout note' }, h('b', null, 'Commentaire d\'arrêt'), h('p', { html: md('Introduction = fiche d\'arrêt : faits, procédure, prétentions, **problème de droit**, solution. Plan : sens, valeur, portée de la solution. La fiche ne fait jamais une partie.') })),
          h('div', { class: 'callout note' }, h('b', null, 'Commentaire d\'article'), h('p', { html: md('Contexte, structure du texte, analyse **mot à mot** au service d\'une idée. Le plan suit souvent la construction du texte (principe / réserve). Ni paraphrase, ni dissertation déguisée.') })),
          h('div', { class: 'callout note' }, h('b', null, 'Cas pratique'), h('p', { html: md('**Qualifier** les faits et les parties, **séparer** les problèmes. Pour chacun : problème de droit, règle (majeure), application aux faits (mineure), conclusion concrète.') })),
          h('div', { class: 'callout note' }, h('b', null, 'Question de cours'), h('p', { html: md('Réponse directe : définition, nature, régime, intérêt. « Distinguez » impose une **comparaison** point par point, pas deux exposés.') })))),
      h('div', { class: 'row-actions' },
        h('a', { class: 'btn primary', href: '#/lecture' }, icon('quiz', 16), 'M\'entraîner à lire des sujets'),
        h('a', { class: 'btn', href: '#/epreuves' }, 'Voir les épreuves'))));
  }

  window.Epreuves = { hub, lecture, kits, methode };
})();
