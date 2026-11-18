/* Le prof du cerveau.
   Un tuteur qui raisonne sur le cours au lieu de renvoyer une seule fiche.
   Deux moteurs :
   - local (hors ligne, gratuit) : comprend l'intention de la question (définition, différence,
     conditions, cas pratique, interro…), tolère les fautes de frappe, assemble une réponse à partir
     de plusieurs passages du cours, montre son raisonnement étape par étape, se souvient du sujet
     de la conversation et corrige les réponses écrites ;
   - Claude (facultatif, avec une clé API perso) : un vrai modèle qui fouille lui-même le cours avec
     des outils (recherche, fiches, progression), raisonne, interroge et note. */
(function () {
  'use strict';
  const { h, md, plain, norm, lexKey } = U;
  let keywords, close; // définies plus bas (correction)

  /* ================= Langue ================= */
  const STOP = new Set(('le la les un une des de du d l a au aux et ou en dans par pour sur avec sans ce cet cette ces qui que quoi quel quelle quels quelles est sont c qu ne pas plus se sa son ses leur leurs il elle on nous vous ils elles je j tu me m te t moi toi y comment pourquoi quand combien dit dire faut peut etre avoir fait cest quest explique expliquer explique moi definition definir signifie veut veux sais savoir parle parler cours chose quoi entre lui dont donc car mais si tout tous toute toutes ca cela celui celle ceux ai as avez ont suis es sommes etes vais va vas allez aller bien tres trop aussi alors encore deja moins meme quoi ok oui non stp svp please merci comme avait etait etre faire peux pourrais pouvez voudrais aide aider bon ben genre truc').split(' '));
  const stem = w => w.length > 5 ? w.replace(/(ements|ement|ations|ation|ites|ite|eurs|eur|euses|euse|ives|ive|ifs|if|ables|able|es|s|x|e)$/, '') : w.replace(/s$/, '');
  const words = s => norm(plain(String(s))).replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
  const toks = s => words(s).filter(w => w.length > 1 && !STOP.has(w)).map(stem);
  const refsOf = s => { const out = new Set(); String(s).replace(/\bart(?:icles?|\.)?\s*(L\s?)?(\d{3,4}(?:-\d+)?)/gi, (_, l, n) => { out.add((l ? 'L' : '') + n); }); return [...out]; };
  // Synonymes et formes voisines (racines) : élargit la recherche sans perdre le sens
  const SYN = [['acheteur', 'acquereur', 'achat', 'acquisit'], ['vendeur', 'cedant', 'vend'], ['immeuble', 'immobili', 'terrain', 'maison', 'appartement', 'fond'], ['meuble', 'mobili'], ['nullit', 'nul', 'annul'], ['usucapion', 'prescript'], ['possess', 'possesseur', 'possed'], ['propriet', 'proprietair'], ['contrat', 'convention'], ['vic', 'defaut'], ['eviction', 'evinc', 'trouble'], ['delivranc', 'livr', 'livraison'], ['risqu', 'pert', 'perit'], ['promess', 'avant'], ['lesion', 'vil'], ['fruit', 'loyer', 'recolt'], ['accession', 'incorpor', 'construct'], ['servitud', 'passag'], ['pref', 'preferenc'], ['bonn', 'foi'], ['detent', 'detenteur', 'precair'], ['action', 'agir', 'recour'], ['revendic', 'revendiqu'], ['consentement', 'accord', 'volont']];
  const SYNI = new Map(); SYN.forEach(g => g.forEach(w => SYNI.set(w, g)));
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i]; let best = i;
      for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (cur[j] < best) best = cur[j]; }
      if (best > max) return max + 1; prev = cur;
    }
    return prev[b.length];
  }
  const keyOf = s => ' ' + lexKey(plain(String(s))) + ' ';
  const mentions = (d, term) => (d._k || (d._k = keyOf(d.title + ' ' + d.body))).includes(' ' + lexKey(term) + ' ');
  const pick = a => a[Math.floor(Math.random() * a.length)];
  // libellés lisibles d'un article ou d'un arrêt (les passages de fiche ont pour titre leur section)
  const artLabel = d => { if (!d.passage) return plain(d.title); const r = refsOf(plain(d.body).slice(0, 60))[0]; return r ? 'Art. ' + r : plain(d.title); };
  const arrLabel = d => d.passage ? plain(d.body).split(/ : | — /)[0].slice(0, 80) : plain(d.title);
  const arrText = d => d.passage ? d.body : '**' + plain(d.title) + '** : ' + d.body;
  const FOLLOWW = /^(pourquoi|exempl|arret|articl|pieg|encor|simpl|condition|effet|jurisprud|text|detail|suit|continu|resum|clair|comprend|develop|approfond|concret|illustr|justifi|fondement|raison|consequ|sanction|regim|vulgaris|reexpliqu|expliq|differen|distingu|compar|indic|interrog)/;
  const stripFollow = q => words(q).filter(w => !FOLLOWW.test(stem(w))).join(' ');
  const uniqBy = (a, f) => { const s = new Set(); return a.filter(x => { const k = f(x); if (s.has(k)) return false; s.add(k); return true; }); };
  const firstSentence = s => { const t = plain(String(s)); const m = t.match(/^.{25,}?(?<!\b(?:art|al|civ|com|cass|ex|ch|req|soc|crim|plén|1re|2e|3e|n°|cf|etc|c))[.!?](?=\s|$)/i); return m ? m[0].trim() : t; };

  /* ================= Index de recherche (BM25 + fautes + synonymes) ================= */
  function makeIndex(docs) {
    const D = docs.map(d => {
      const t = toks(d.title + ' ' + d.title + ' ' + d.body + ' ' + (d.ref || '')); const tf = new Map();
      t.forEach(w => tf.set(w, (tf.get(w) || 0) + 1));
      return { tf, len: t.length, refs: refsOf(d.title + ' ' + (d.ref || '')), brefs: refsOf(d.body) };
    });
    const df = new Map(); D.forEach(d => d.tf.forEach((_, w) => df.set(w, (df.get(w) || 0) + 1)));
    const vocab = [...df.keys()], avg = D.reduce((a, d) => a + d.len, 0) / Math.max(1, D.length), N = D.length;
    const fixC = new Map();
    function fix(w) { // mot inconnu : faute de frappe ou début de mot
      if (df.has(w)) return [w];
      if (fixC.has(w)) return fixC.get(w);
      let out = [];
      if (w.length >= 4) {
        const max = w.length > 7 ? 2 : 1;
        out = vocab.filter(v => v[0] === w[0] && lev(w, v, max) <= max).slice(0, 3);
        if (!out.length && w.length >= 5) out = vocab.filter(v => v.startsWith(w) || (v.length >= 5 && w.startsWith(v))).slice(0, 3);
      }
      fixC.set(w, out); return out;
    }
    function expand(q) {
      const W = new Map(), fixed = [];
      [...new Set(toks(q))].forEach(w => {
        const f = fix(w); if (f.length && f[0] !== w) fixed.push([w, f[0]]);
        f.forEach(x => W.set(x, Math.max(W.get(x) || 0, 1)));
        [w, ...f].forEach(x => (SYNI.get(x) || []).forEach(s => { if (df.has(s) && !W.has(s)) W.set(s, .5); }));
      });
      return { W, fixed };
    }
    function search(q, n = 8, filter) {
      const { W } = expand(q); if (!W.size) return [];
      const qrefs = refsOf(String(q).replace(/^\s*(\d{3,4})\s*$/, 'art. $1'));
      const nq = norm(q);
      const res = [];
      for (let i = 0; i < N; i++) {
        const d = D[i], doc = docs[i]; if (filter && !filter(doc)) continue;
        let s = 0;
        W.forEach((wt, w) => { const f = d.tf.get(w); if (!f) return; const idf = Math.log(1 + (N - df.get(w) + .5) / (df.get(w) + .5)); s += wt * idf * f * 2.2 / (f + 1.2 * (.25 + .75 * d.len / avg)); });
        if (qrefs.length) { if (d.refs.some(r => qrefs.includes(r))) s += 7; else if (d.brefs.some(r => qrefs.includes(r))) s += 2.5; }
        if (doc.title.length > 4 && nq.includes(norm(plain(doc.title)))) s += 3;
        if (s > 0) res.push([s * (doc.boost || 1), doc]);
      }
      return res.sort((a, b) => b[0] - a[0]).slice(0, n).map(x => x[1]);
    }
    return { search, expand, fix };
  }

  /* ================= Base de connaissances ================= */
  function buildKB(items) {
    const docs = items.slice();
    const boost = { 'Définition': 1.25, 'Carte': 1.15, 'Article': 1.1, 'Arrêt': 1.1, 'Question de cours': 1.05, 'Fiche': 1, 'Piège': 1.05, 'Épreuve': .85 };
    docs.forEach(d => { d.boost = boost[d.kind] || 1; });
    MATIERES.forEach((M, mi) => M.chapters.forEach(c => {
      const o = DATA.all[c.id]; if (!o || !o.fiche) return;
      let h2 = c.title, h3 = '', k = 0;
      const add = (kind, body, ref) => docs.push({ id: 'f-' + c.id + '-' + (k++), kind, title: h3 ? h2 + ' · ' + h3 : h2, body, ref: ref || '', ch: c.id, chap: c, mat: M, hemi: mi ? 1 : -1, passage: true, boost: boost[kind] || 1 });
      o.fiche.forEach(b => {
        const t = b[0];
        if (t === 'h2') { h2 = plain(b[1]); h3 = ''; }
        else if (t === 'h3' || t === 'h4') h3 = plain(b[1]);
        else if (t === 'p' || t === 'intro' || t === 'note') add('Fiche', b[1]);
        else if (t === 'ul') add('Fiche', b[1].map(x => '• ' + x).join('\n'));
        else if (t === 'steps' || t === 'pair') add('Fiche', b[1].map(s => '• **' + s[0] + '** : ' + s[1]).join('\n'));
        else if (t === 'trap') add('Piège', b[1]);
        else if (t === 'tip') add('À retenir', b[1]);
        else if (t === 'mnemo') add('Mnémo', '**' + b[1] + '** : ' + b[2]);
        else if (t === 'def') add('Définition', '**' + b[1] + '** : ' + b[2]);
        else if (t === 'art') add('Article', '**' + b[1] + '** : ' + b[2], b[1]);
        else if (t === 'juris') add('Arrêt', '**' + b[1] + '** : ' + b[2], b[1]);
        else if (t === 'table') b[2].forEach(r => add('Tableau', r.map((x, j) => (b[1][j] ? b[1][j] + ' : ' : '') + x).join(' ; ')));
      });
    }));
    const E = window.EPREUVES || {};
    Object.keys(E).forEach(mid => {
      const M = MATIERES.find(m => m.id === mid); if (!M) return;
      (E[mid].sujets || []).forEach(s => {
        const base = { kind: 'Épreuve', title: s.theme + ' — ' + plain(s.sujet).slice(0, 80), ch: null, chap: { col: '#9A6B12', short: 'Épreuve', n: '' }, mat: M, passage: true, sujet: s, boost: boost['Épreuve'] };
        (s.kit || []).forEach((x, j) => docs.push(Object.assign({}, base, { id: 'e-' + s.id + '-' + j, body: x })));
        if (s.problematique) docs.push(Object.assign({}, base, { id: 'e-' + s.id + '-p', body: 'Problématique : ' + s.problematique }));
      });
    });
    return docs;
  }

  /* ================= Repérage des notions ================= */
  const GENERIC = new Set(['droit', 'bien', 'chose', 'contrat', 'loi', 'article', 'arret', 'juge', 'partie', 'regle', 'effet', 'condition', 'personne', 'acte', 'titre', 'action', 'principe', 'exception', 'cour', 'cas', 'question', 'difference']);
  let LEXK = null;
  function concepts(q) {
    const LEX = U.lexicon(); if (!LEXK) LEXK = [...LEX.keys()].filter(k => k.length >= 6);
    const ws = lexKey(q).split(' ').filter(Boolean), found = [];
    let i = 0;
    while (i < ws.length) {
      let hit = null;
      for (let n = Math.min(6, ws.length - i); n >= 1 && !hit; n--) {
        const k = ws.slice(i, i + n).join(' ');
        if (n === 1 && (k.length < 4 || STOP.has(k) || GENERIC.has(k))) continue;
        let e = LEX.get(k);
        if (!e && k.length >= 7 && (n > 1 || !STOP.has(k))) { // faute de frappe sur une notion
          const max = k.length >= 9 ? 2 : 1; const near = LEXK.find(x => x[0] === k[0] && Math.abs(x.length - k.length) <= max && lev(x, k, max) <= max);
          if (near) e = Object.assign({}, LEX.get(near), { fixed: true }), hit = Object.assign(e, { key: near, n });
        }
        if (e && !hit) hit = Object.assign({}, e, { key: k, n });
      }
      if (hit) { if (!found.some(f => f.key === hit.key)) found.push(hit); i += hit.n; } else i++;
    }
    return found;
  }

  /* ================= Indices dans les faits ================= */
  const FACTS = [
    [/\b\d+\s*(euros?|€)\s*symbolique|euro symbolique|prix (derisoire|ridicule|tres bas|insignifiant)|pour (presque )?rien|vil prix/, 'prix vil dérisoire prix sérieux'],
    [/n.?(etait|est) pas (a lui|le sien|proprietaire)|appartient (a|en fait a) (son|sa|un|une)|chose d.?autrui|ne lui appartenait/, 'vente de la chose d autrui'],
    [/depuis (plus de )?(\d+|dix|vingt|trente) ans|pendant (\d+|dix|vingt|trente) ans|occupe .* depuis/, 'usucapion prescription acquisitive possession'],
    [/trouve|perdu|vole|volee|brocante|occasion/, 'possession vaut titre art. 2276 perte vol revendication'],
    [/panne|ne (fonctionne|marche) (plus|pas)|defaut|vice|fissure|termite|cache/, 'garantie des vices cachés'],
    [/n.?a (jamais )?pas? paye|impaye|ne paie pas|refuse de payer/, 'paiement du prix résolution réserve de propriété'],
    [/promis de (lui )?vendre|promesse|option/, 'promesse unilatérale de vente levée d option'],
    [/en priorite|preference|d.?abord (a|lui) proposer/, 'pacte de préférence'],
    [/construi|batit|plante|edifie|maison sur (le|son) terrain/, 'accession construction sur le terrain d autrui art. 555'],
    [/detruit|incendie|brule|perit|tempete|inondation/, 'transfert des risques perte de la chose'],
    [/livr|livraison|conforme|pas celle commandee|autre modele/, 'délivrance conforme'],
    [/revendique|tiers|deux acheteurs|vendu deux fois|second acquereur/, 'conflit entre acquéreurs successifs art. 1198'],
    [/fruits|loyers|recoltes/, 'fruits possesseur de bonne foi'],
    [/lese|lesion|sous[- ]evalue|moitie de (sa )?valeur|7\/12|sept douziemes/, 'rescision pour lésion art. 1674']
  ];
  const factHints = q => { const n = norm(q).replace(/[’']/g, ' '); return FACTS.filter(([re]) => re.test(n)).map(x => x[1]); };

  /* ================= Intention ================= */
  const INTENTS = [
    ['lesson', /fais[- ]moi (le |un |du )?cours|apprends[- ]moi (le|la|les|l.|ce|mon|le chapitre)|enseigne[- ]moi|\blecon\b|reprend(s|re)? (le|la|mon|notre) (cours|lecon)|explique[- ]moi (tout )?le chapitre|cours (sur|du|de) /],
    ['restit', /restitu|je (te )?(recite|resume)|je vais (te )?(reciter|expliquer|resumer)|ecoute[- ]moi|laisse[- ]moi (t.?)?expliquer|je te (le |la )?raconte/],
    ['teach', /apprends[- ]moi (un truc|quelque chose|des choses|un (nouveau )?truc)|le savais[- ]tu|surprends[- ]moi|anecdote|truc (a savoir|interessant)|notion du jour|culture/],
    ['greet', /^(bonjour|salut|coucou|hello|hey|yo|bonsoir)\b|qui es[- ]tu|tu es qui/],
    ['thanks', /^(merci|super|top|parfait|genial|trop bien|ok merci)\b/],
    ['quiz', /interroge|teste[- ]?moi|pose[- ]moi|colle[- ]moi|quiz|fais[- ]moi (reviser|travailler)|une question|entraine/],
    ['revise', /(quoi|que) (reviser|revoir|travailler)|par quoi (je )?commence|mes (lacunes|faiblesses|points faibles)|ou j.?en suis|programme|planning|plan de revision/],
    ['compare', /differen|distingu|compar|\bvs\b|versus|par rapport a|confond|meme chose|pareil/],
    ['plan', /\bplan\b|dissert|commentaire|problematique|introduction|annonce|sujet de/],
    ['conditions', /condition|requis|exig|critere|faut[- ]il|quand (est[- ]ce qu|peut)|elements constitutifs/],
    ['effects', /effet|consequence|sanction|regime|que se passe|qu.?est[- ]ce qui se passe|resultat/],
    ['example', /exemple|concret|illustr|situation|en pratique/],
    ['why', /pourquoi|justifi|fondement|raison|a quoi (ca )?sert|interet|utilite|but/],
    ['article', /\bart(icle)?\b|\bcode\b|texte/],
    ['arret', /arret|jurisprudence|cassation|\bcass\b|decision|revirement/],
    ['trap', /piege|erreur|attention|se tromper|confusion/],
    ['simpler', /plus simple|simplement|comprends? (pas|rien)|pige pas|capte pas|j.?ai pas compris|reexplique|re-explique|vulgaris|en clair|resume/],
    ['more', /plus loin|approfondi|detail|developpe|encore|et ensuite|et apres|continue|la suite/],
    ['def', /c.?est quoi|qu.?est[- ]ce (que|qu)|defini|signifi|veut dire|notion de|ca veut dire/]
  ];
  function intentOf(q) {
    const n = norm(q).replace(/[’']/g, ' ').replace(/\s+/g, ' ');
    const hits = INTENTS.filter(([, re]) => re.test(n)).map(x => x[0]);
    const long = q.length > 170 || /\b(veut|souhaite|a vendu|a achete|a promis|decouvre|revendique|depuis \d+ ans|monsieur|madame|m\.|mme)\b/.test(n) && q.length > 90;
    if (long && !hits.includes('quiz')) return { main: 'cas', all: hits };
    return { main: hits[0] || 'def', all: hits };
  }

  /* ================= Découpage des fiches en parties de cours ================= */
  const SEQC = {};
  function lessonsOf(ch) {
    if (SEQC[ch] !== undefined) return SEQC[ch];
    const o = DATA.all[ch], c = MATIERES.flatMap(M => M.chapters).find(x => x.id === ch);
    if (!o || !o.fiche || !c) return (SEQC[ch] = null);
    const raw = []; let curS = { h2: null, head: c.title, blocks: [] };
    const push = () => { if (curS.blocks.some(b => !['plan'].includes(b[0])) || curS.blocks.length > 1) raw.push(curS); };
    o.fiche.forEach(b => {
      if (b[0] === 'h2') { push(); curS = { h2: plain(b[1]), head: plain(b[1]), blocks: [] }; }
      else if (b[0] === 'h3') { push(); curS = { h2: curS.h2, head: plain(b[1]), blocks: [] }; }
      else curS.blocks.push(b);
    });
    push();
    const out = [];
    raw.forEach(r => { // parties trop longues : coupées aux sous-titres h4
      if (r.blocks.length <= 9) return out.push(r);
      let part = { h2: r.h2, head: r.head, blocks: [] };
      r.blocks.forEach(b => { if (b[0] === 'h4' && part.blocks.length >= 4) { out.push(part); part = { h2: r.h2, head: r.head + ' · ' + plain(b[1]), blocks: [] }; } else part.blocks.push(b); });
      if (part.blocks.length) out.push(part);
    });
    out.forEach((x, i) => {
      x.id = ch + '-' + i;
      x.title = x.h2 && x.head !== x.h2 && !x.head.startsWith(x.h2) ? x.h2.replace(/^Section \d+\s*[—-]\s*/, '') + ' · ' + x.head : x.head;
      x.text = x.blocks.map(b => b.slice(1).flat(3).filter(v => typeof v === 'string').join(' ')).join(' ');
    });
    return (SEQC[ch] = out.length ? out : null);
  }
  // Points clés d'une partie : définitions, articles, arrêts, notions en gras, pièges
  function pointsOf(s) {
    if (s._pts) return s._pts;
    const pts = [], add = (kind, label, kw, refs, short) => { label = plain(label).trim(); if (label.length < 3) return; pts.push({ kind, label, kw: [...new Set(kw)].filter(w => w.length > 2 && !GENERIC.has(w)).slice(0, 5), refs: refs || [], short }); };
    s.blocks.forEach(b => {
      const t = b[0];
      if (t === 'def') add('def', b[1], toks(b[1]).concat(keywords(b[2]).slice(0, 2)), [], '**' + b[1] + '** : ' + firstSentence(b[2]));
      else if (t === 'art') add('art', b[1], keywords(b[2]).slice(0, 4), refsOf(b[1]), '**' + plain(b[1]) + '** : ' + firstSentence(b[2]).replace(/^« ?/, '').slice(0, 160));
      else if (t === 'juris') { const name = plain(b[1]).split(/ — | : /).pop(); add('arret', b[1], toks(name).concat(keywords(b[2]).slice(0, 2)), [], '**' + plain(b[1]) + '** : ' + firstSentence(b[2])); }
      else if (t === 'trap') add('trap', firstSentence(b[1]).slice(0, 70), keywords(b[1]).slice(0, 3), refsOf(b[1]), '*Piège* : ' + firstSentence(b[1]));
      else if (t === 'mnemo') add('mnemo', b[1], keywords(b[2]).slice(0, 4), [], '**' + b[1] + '** : ' + plain(b[2]));
      else {
        const txt = fbText(b);
        [...txt.matchAll(/\*\*(.+?)\*\*/g)].forEach(m => {
          const term = m[1].replace(/[.:;,]$/, ''); if (term.length < 4 || term.length > 50 || /^\d/.test(term)) return;
          const e = U.lookup(term), r = refsOf(term);
          if (r.length) return add('art', term, [], r, '**' + term + '**');
          if (e) add('def', term, toks(term).concat(keywords(e.def).slice(0, 2)), [], '**' + term + '** : ' + firstSentence(e.def));
        });
      }
    });
    return (s._pts = uniqBy(pts, p => norm(p.label)).slice(0, 14));
  }
  const fbText = b => b.slice(1).flat(3).filter(v => typeof v === 'string').join(' ');

  /* ================= Profil de l'élève (mémoire entre les séances) ================= */
  const PKEY = 'cloclo.prof';
  function loadProfile() { try { return Object.assign({ miss: {}, seen: {}, chats: 0 }, JSON.parse(localStorage.getItem(PKEY) || '{}')); } catch (e) { return { miss: {}, seen: {}, chats: 0 }; } }
  function saveProfile(P) { try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch (e) { } }

  /* ================= Correction d'une réponse libre ================= */
  keywords = function (answer) {
    const bold = [...String(answer).matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]);
    let w = [...new Set(toks(bold.length ? bold.join(' ') : answer))].filter(x => x.length > 3 && !GENERIC.has(x));
    if (!bold.length) w = w.slice(0, 6);
    return w.slice(0, 8);
  };
  close = (g, w) => g === w || (g.length > 4 && w.length > 4 && (g.startsWith(w) || w.startsWith(g))) || (w.length > 5 && lev(g, w, w.length > 8 ? 2 : 1) <= (w.length > 8 ? 2 : 1)) || (SYNI.get(w) || []).includes(g);
  function gradeText(it, said) {
    const n = norm(said);
    if (it.kind === 'Vrai ou faux') {
      const v = /\bvrai|\bexact|\boui\b|correct/.test(n), f = /\bfaux|\bnon\b|inexact|incorrect|errone/.test(n);
      const truth = /^\*\*Vrai/.test(it.body);
      if (v === f) return { res: 0, hit: [], miss: [], note: 'Dis-moi d\'abord : vrai ou faux ?' };
      const ok = v === truth; return { res: ok ? 2 : 0, hit: [], miss: [], verdict: ok };
    }
    const kw = keywords(it.answer), got = toks(said);
    const hit = kw.filter(w => got.some(g => close(g, w))), miss = kw.filter(w => !hit.includes(w));
    const refs = refsOf(it.answer + ' ' + it.ref), sref = refsOf('art. ' + said.replace(/\b(\d{3,4})\b/g, 'art. $1'));
    const refOk = refs.length ? refs.some(r => sref.includes(r)) : null;
    let r = kw.length ? hit.length / kw.length : 0;
    if (refOk) r = Math.min(1, r + .25);
    return { res: r >= .65 ? 2 : r >= .3 ? 1 : 0, hit, miss, refOk, ratio: r };
  }
  // retrouve la forme lisible d'une racine dans un texte
  function surface(stemW, text) { const w = words(plain(text)).find(x => stem(x) === stemW); return w || stemW; }

  /* ================= Le prof ================= */
  function create(items, hooks) {
    const docs = buildKB(items), idx = makeIndex(docs);
    const P = loadProfile(); P.chats++; saveProfile(P);
    const conv = { topic: null, topics: [], last: null, pending: null, history: [], quizN: 0, quizOk: 0 };
    const log = h('div', { class: 'pf-log', role: 'log', 'aria-live': 'polite' });
    const el = h('div', { class: 'pf' }, log);
    let busy = false;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cur = () => MATIERES.find(m => m.id === SITE.matiere);
    const nameOf = () => (ST.S.name || SITE.name || '').split(' ')[0];

    /* ---------- rendu ---------- */
    const scroll = () => { el.scrollTop = el.scrollHeight; };
    function srcList(list) {
      list = uniqBy(list.filter(Boolean), d => d.id).slice(0, 6); if (!list.length) return null;
      return h('div', { class: 'pf-src' }, h('b', null, 'Sources dans ton cours'), list.map(d => h('button', { type: 'button', style: { '--c': d.chap.col }, onclick: () => d.passage ? hooks.focusChapter(d.ch, d) : hooks.openItem(d) }, h('i'), h('span', null, d.kind + ' · ' + plain(d.title).slice(0, 60)), h('small', null, d.mat.title === cur().title ? 'ch. ' + d.chap.n : d.mat.title))));
    }
    function block(b) {
      if (!b) return null;
      if (typeof b === 'string') return h('p', { html: md(b).replace(/\n/g, '<br>') });
      const [t, a, c] = b;
      if (t === 'h') return h('p', { class: 'pf-h' }, a);
      if (t === 'p') return h('p', { html: md(a).replace(/\n/g, '<br>') });
      if (t === 'ul') return h('ul', null, a.filter(Boolean).map(x => h('li', { html: md(x) })));
      if (t === 'ol') return h('ol', null, a.filter(Boolean).map(x => h('li', { html: md(x) })));
      if (t === 'rule') return h('blockquote', { class: 'pf-rule' }, h('span', { html: md(a) }), c ? h('cite', null, c) : null);
      if (t === 'trap') return h('p', { class: 'pf-trap', html: '<b>Piège</b> ' + md(a) });
      if (t === 'tip') return h('p', { class: 'pf-tip', html: md(a) });
      if (t === 'cmp') return h('div', { class: 'pf-cmp' }, a.map(col => h('div', null, h('b', null, col[0]), h('p', { html: md(col[1]) }), col[2] ? h('small', null, col[2]) : null)));
      if (t === 'src') return srcList(a);
      if (t === 'node') return a;
      return null;
    }
    function bubble(who, kids) { const b = h('div', { class: 'pf-msg ' + who }, kids); log.append(b); scroll(); return b; }
    function chips(list) {
      list = (list || []).filter(Boolean); if (!list.length) return null;
      return h('div', { class: 'pf-chips' }, list.map(c => h('button', { type: 'button', onclick(e) { e.currentTarget.parentNode.remove(); if (c.fn) c.fn(); else ask(c.q || c.label); } }, c.label)));
    }
    function clearChips() { log.querySelectorAll('.pf-chips').forEach(c => c.remove()); }
    function user(text) { clearChips(); bubble('me', h('p', null, text)); }
    // Réponse du prof : d'abord le raisonnement, étape par étape (les neurones s'allument), puis la réponse
    function reply(r) {
      return new Promise(done => {
        const b = bubble('prof', []);
        const steps = (r.steps || []).filter(Boolean);
        const trace = steps.length ? h('details', { class: 'pf-think', open: true }, h('summary', null, 'Je réfléchis…'), h('ol')) : null;
        if (trace) b.append(trace);
        let i = 0;
        const next = () => {
          if (i < steps.length) {
            const s = steps[i++]; trace.lastChild.append(h('li', { html: md(s.t) }));
            if (s.docs && s.docs.length) hooks.light(s.docs);
            scroll(); setTimeout(next, reduce ? 0 : 420 + Math.random() * 260); return;
          }
          if (trace) { trace.firstChild.textContent = 'Mon raisonnement (' + steps.length + ' étapes)'; if (steps.length > 2) trace.open = false; }
          (r.blocks || []).map(block).forEach(x => x && b.append(x));
          const c = chips(r.chips); if (c) log.append(c);
          scroll();
          if (r.speak) hooks.say(r.speak);
          done(b);
        };
        next();
      });
    }

    /* ---------- outils de raisonnement ---------- */
    function gather(term, q) {
      const hits = idx.search(term + ' ' + (q || ''), 60);
      const strong = hits.filter(d => mentions(d, term));
      const pool = strong.length >= 3 ? strong : uniqBy(strong.concat(hits.slice(0, 12)), d => d.id);
      const of = k => pool.filter(d => d.kind === k);
      const LEXE = U.lookup(term);
      return {
        pool, strong,
        def: (LEXE && LEXE.def) || (of('Définition')[0] || {}).body || '',
        defDoc: of('Définition')[0] || pool.find(d => d.kind === 'Carte') || null,
        arts: uniqBy(of('Article').sort((a, b) => (keyOf(b.body).includes(' ' + lexKey(term) + ' ') ? 1 : 0) - (keyOf(a.body).includes(' ' + lexKey(term) + ' ') ? 1 : 0)), d => artLabel(d)),
        arrets: uniqBy(of('Arrêt'), d => arrLabel(d).slice(0, 25)),
        traps: of('Piège').concat(pool.filter(d => d.kind === 'Vrai ou faux' && /^\*\*Faux/.test(d.body))),
        tips: of('À retenir'), mnemo: of('Mnémo'), fiche: of('Fiche'), table: of('Tableau'),
        cards: pool.filter(d => d.kind === 'Carte' || d.kind === 'Question de cours'),
        ex: pool.filter(d => /\bex(emple)?\s*:|\bpar exemple\b|\bainsi,/i.test(d.body)),
        why: pool.filter(d => /\bcar\b|parce que|fondement|justifi|afin de|pour (protéger|éviter|assurer)|ratio|but/i.test(d.body)),
        epreuve: pool.filter(d => d.kind === 'Épreuve'),
        cross: pool.filter(d => { const home = MATIERES.find(M => M.chapters.some(c => c.id === (LEXE && LEXE.ch))) || cur(); return d.mat && d.mat.id !== home.id && !d.passage && norm(plain(d.title)) !== norm(term); })
      };
    }
    const asks = (pool, notId) => pool.filter(d => d.ask && d.kind !== 'Cas pratique' && d.id !== notId);
    const lobeOf = ch => hooks.lobes().find(L => L.ch === ch);
    function topicLabel(t) { return t ? t.term : ''; }
    function setTopic(t) { if (!t) return; conv.topic = t; conv.topics = [t].concat(conv.topics.filter(x => x.key !== t.key)).slice(0, 6); }
    const openers = { def: ['Bonne question.', 'On reprend ça proprement.', 'Classique de partiel, ça.', 'Allons-y.'], compare: ['Très bonne question, c\'est typiquement ce qui tombe.', 'La confusion est fréquente, on démêle.', 'On les met côte à côte.'], cas: ['On le traite comme au partiel : syllogisme.', 'Méthode du cas pratique, étape par étape.'] };

    /* ---------- intentions ---------- */
    function explain(t, q, it, extra) {
      const G = gather(t.term, q), steps = [], blocks = [];
      steps.push({ t: 'Je repère la notion : **' + t.term + '**' + (t.fixed ? ' (j\'ai corrigé l\'orthographe)' : '') + (t.ch ? ' — ' + chLabel(t.ch) : ''), docs: G.strong.slice(0, 6) });
      const want = it.all;
      const art = G.arts[0], arr = G.arrets[0], trap = G.traps[0];
      if (art) steps.push({ t: 'Je cherche le texte : **' + artLabel(art) + '**', docs: [art] });
      if (arr) steps.push({ t: 'Je vérifie la jurisprudence : *' + arrLabel(arr) + '*', docs: [arr] });
      if (trap) steps.push({ t: 'Je regarde où les étudiants se trompent', docs: [trap] });
      if (G.cross.length) steps.push({ t: 'Je fais le lien avec ' + G.cross[0].mat.title, docs: G.cross.slice(0, 3) });
      const missed = P.miss[t.key];
      blocks.push(['p', pick(openers.def) + ' ' + (G.def ? '**' + cap(t.term) + '** : ' + G.def : 'Voici ce que dit ton cours sur **' + t.term + '**.')]);
      if (want.includes('conditions') || it.main === 'conditions') {
        const cond = idx.search(t.term + ' conditions éléments caractères critères exige', 4, d => (d.kind === 'Fiche' || d.kind === 'Tableau' || d.kind === 'Carte' || d.kind === 'Question de cours') && mentions(d, t.term)).slice(0, 2);
        blocks.push(['h', 'Les conditions']);
        if (cond.length) cond.forEach(d => blocks.push(['p', d.body])); else blocks.push(['p', 'Ton cours ne les liste pas d\'un bloc ; regarde ' + (art ? 'le texte : ' + art.body : 'les passages ci-dessous') + '.']);
      }
      if (want.includes('effects') || it.main === 'effects') {
        const ef = G.fiche.filter(d => /effet|cons[ée]quence|sanction|r[ée]gime|nullit|action/i.test(d.title + ' ' + d.body)).slice(0, 2);
        blocks.push(['h', 'Les effets, le régime']); ef.length ? ef.forEach(d => blocks.push(['p', d.body])) : blocks.push(['p', 'Rien de spécifique dans ton cours sur ce point.']);
      }
      if (art && !(want.includes('arret') && !want.includes('article'))) blocks.push(['rule', art.body, artLabel(art)]);
      if (arr) blocks.push(['p', '**Jurisprudence.** ' + arrText(arr)]);
      if (want.includes('why') || it.main === 'why') { const w = G.why.find(d => d !== art && d !== arr); blocks.push(['h', 'Pourquoi ?']); blocks.push(['p', w ? w.body : 'Ton cours ne donne pas de justification explicite. Raisonne sur le but de la règle : qui protège-t-elle, et contre quoi ?']); }
      if (want.includes('example') || it.main === 'example') { const e = G.ex[0]; blocks.push(['h', 'Un exemple']); blocks.push(['p', e ? e.body : 'Pas d\'exemple tout fait dans ton cours ; je t\'en propose un en cas pratique si tu veux.']); }
      if (G.mnemo[0]) blocks.push(['tip', '**Pour retenir.** ' + G.mnemo[0].body]);
      else if (G.tips[0]) blocks.push(['tip', '**À retenir.** ' + G.tips[0].body]);
      if (trap) blocks.push(['trap', trap.kind === 'Vrai ou faux' ? '« ' + plain(trap.title) + ' » ' + trap.body : trap.body]);
      if (G.cross[0]) blocks.push(['p', '**Pont avec ' + G.cross[0].mat.title + '.** ' + plain(G.cross[0].title) + ' : ' + firstSentence(G.cross[0].body)]);
      if (missed) blocks.push(['p', '*Tu avais buté sur cette notion ' + (missed > 1 ? missed + ' fois' : 'une fois') + ' : on vérifie qu\'elle est acquise ?*']);
      blocks.push(['src', [G.defDoc, art, arr, ...G.strong.slice(0, 4)]]);
      if (extra) blocks.push(...extra);
      const related = relatedConcepts(t, G);
      const q2 = asks(G.strong.length ? G.strong : G.pool)[0];
      return {
        steps, blocks, speak: G.def ? t.term + ' : ' + firstSentence(G.def) : '',
        chips: [q2 && { label: 'Interroge-moi dessus', fn: () => quiz(t) }, { label: 'Un exemple', q: 'un exemple de ' + t.term }, { label: 'Pourquoi ?', q: 'pourquoi ' + t.term }, related[0] && { label: 'Différence avec « ' + related[0].term + ' »', q: 'différence entre ' + t.term + ' et ' + related[0].term }, { label: 'Plus simple', q: 'explique plus simplement ' + t.term }]
      };
    }
    function relatedConcepts(t, G) {
      const seen = new Set([t.key]), out = [];
      G.pool.slice(0, 20).forEach(d => concepts(plain(d.body).slice(0, 400)).forEach(c => { if (!seen.has(c.key) && c.key.length > 4 && !GENERIC.has(c.key)) { seen.add(c.key); out.push(c); } }));
      return out.slice(0, 4);
    }
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    function chLabel(ch) { const c = MATIERES.flatMap(M => M.chapters.map(x => [x, M])).find(([x]) => x.id === ch); return c ? c[1].title + ', ch. ' + c[0].n + ' (' + c[0].short + ')' : ''; }

    function compare(A, B, q) {
      const GA = gather(A.term, q), GB = gather(B.term, q);
      const both = uniqBy(idx.search(A.term + ' ' + B.term + ' différence distinction', 40).filter(d => mentions(d, A.term) && mentions(d, B.term)), d => d.id);
      const contrast = /distingu|diff[ée]ren|alors que|contrairement|à la différence|tandis que|\bvs\b|confond|\bsans\b|\bmais\b/i;
      const crit = both.find(d => d.kind === 'Tableau') || both.find(d => (d.kind === 'Carte' || d.kind === 'Question de cours') && contrast.test(d.title + ' ' + d.body)) || both.find(d => contrast.test(d.body) && plain(d.body).length > 80) || both[0];
      if (crit && crit.ask && crit.kind !== 'Tableau' && !crit.passage) crit._show = '**' + plain(crit.title) + '** ' + crit.body;
      const steps = [
        { t: 'Deux notions : **' + A.term + '** et **' + B.term + '**', docs: GA.strong.slice(0, 3).concat(GB.strong.slice(0, 3)) },
        { t: 'Je cherche leur définition respective' },
        both.length ? { t: 'Je cherche les passages qui les **opposent** (' + both.length + ' trouvés)', docs: both.slice(0, 4) } : { t: 'Aucun passage ne les compare directement : je compare leurs définitions' },
        { t: 'Je dégage le critère de distinction' }
      ];
      const blocks = [['p', pick(openers.compare)], ['cmp', [[cap(A.term), GA.def || firstSentence((GA.strong[0] || {}).body || '—'), (GA.arts[0] && artLabel(GA.arts[0])) || ''], [cap(B.term), GB.def || firstSentence((GB.strong[0] || {}).body || '—'), (GB.arts[0] && artLabel(GB.arts[0])) || '']]]];
      if (crit) { blocks.push(['h', 'Le critère qui les sépare']); blocks.push(['p', crit._show || crit.body]); }
      both.filter(d => d !== crit && (d.kind === 'Tableau' || d.kind === 'Piège')).slice(0, 2).forEach(d => blocks.push(d.kind === 'Piège' ? ['trap', d.body] : ['p', d.body]));
      blocks.push(['tip', '**Réflexe de copie.** Quand deux notions voisines tombent, on les définit chacune, on donne **le critère** qui les sépare, puis la **conséquence** pratique de la qualification.']);
      blocks.push(['src', [crit, ...both.slice(0, 3), GA.defDoc, GB.defDoc]]);
      const qz = both.find(d => d.ask && d.kind !== 'Cas pratique');
      return { steps, blocks, speak: crit ? firstSentence(crit.body) : '', chips: [qz && { label: 'Teste-moi sur la différence', fn: () => quizItem(qz) }, { label: 'Explique ' + A.term, q: 'c\'est quoi ' + A.term }, { label: 'Explique ' + B.term, q: 'c\'est quoi ' + B.term }] };
    }

    function cas(q) {
      const hints = factHints(q), hq = hints.join(' ');
      const found = uniqBy(concepts(hq + ' . ' + q).filter(c => !GENERIC.has(c.key)), c => norm(c.term)).slice(0, 4);
      const hits = uniqBy((hq ? idx.search(hq, 20) : []).concat(idx.search(q, 20)), d => d.id);
      // la règle part des notions repérées (et non de mots isolés)
      const Gs = found.slice(0, 2).map(f => gather(f.term, hq + ' ' + q));
      const onTopic = d => found.slice(0, 3).some(f => mentions(d, f.term));
      const BROAD = /^(vente|nullite|prix|chose|contrat|propriete|bien|acheteur|vendeur|succession|meuble|immeuble|proprietaire|acquereur)$/;
      // une notion et ses alias (ex. usucapion = prescription acquisitive, donné entre parenthèses dans la définition)
      const aliases = f => [f.term].concat([...String(f.def || '').matchAll(/\(([^()]{4,40})\)/g)].map(m => m[1]).filter(x => !/art\./i.test(x))).map(x => ' ' + lexKey(x) + ' ');
      const inBody = d => found.slice(0, 3).filter(f => !BROAD.test(lexKey(f.term))).some(f => aliases(f).some(k => keyOf(d.body).includes(k)));
      let arts = uniqBy((Gs[0] ? Gs[0].arts : []).concat(Gs.slice(1).flatMap(g => g.arts), hits.filter(d => d.kind === 'Article')).filter(inBody), artLabel).slice(0, 3);
      if (!arts.length && !found.length) arts = uniqBy(hits.filter(d => d.kind === 'Article'), artLabel).slice(0, 2);
      const arrets = uniqBy(Gs.flatMap(g => g.arrets.slice(0, 2)).concat(hits.filter(d => d.kind === 'Arrêt' && onTopic(d))), d => arrLabel(d).slice(0, 25)).slice(0, 3);
      const sentences = q.split(/(?<=[.?!])\s+/), question = sentences.filter(s => /\?/.test(s)).pop();
      const main = found[0] || null; if (main) setTopic(main);
      const G = main ? gather(main.term, q) : null;
      const cond = G ? G.fiche.find(d => /condition|crit[eè]re|exig/i.test(d.title + ' ' + d.body)) : null;
      const keyPass = G ? G.strong.filter(d => ['Fiche', 'Tableau'].includes(d.kind)).slice(0, 1) : [];
      const casList = [];
      MATIERES.forEach(M => M.chapters.forEach(c => ((DATA.all[c.id] || {}).cas || []).forEach(x => casList.push({ x, c, M }))));
      const qt = new Set(toks(q)); const sim = casList.map(o => [toks(o.x.title + ' ' + (o.x.facts || o.x.faits || '')).filter(w => qt.has(w)).length, o]).sort((a, b) => b[0] - a[0])[0];
      const steps = [
        { t: 'Je lis les faits et je repère les mots qui déclenchent une règle' + (found.length ? ' : ' + found.map(f => '**' + f.term + '**').join(', ') : ''), docs: hits.slice(0, 6) },
        hints.length ? { t: 'Les faits me font penser à : ' + hints.map(x => '*' + x.split(' ').slice(0, 4).join(' ') + '*').join(' ; ') } : null,
        { t: 'Je qualifie juridiquement la situation', docs: G ? G.strong.slice(0, 3) : [] },
        arts.length ? { t: 'Je cherche la **majeure** (textes) : ' + arts.map(artLabel).join(', '), docs: arts } : { t: 'Pas d\'article évident : je cherche des principes du cours' },
        arrets.length ? { t: 'Je regarde la jurisprudence applicable', docs: arrets } : null,
        { t: 'Je prépare la **mineure** : appliquer chaque condition aux faits' }
      ];
      const blocks = [['p', pick(openers.cas)],
        ['h', '1. Qualification'], ['p', found.length ? 'Les faits évoquent : ' + found.map(f => '**' + f.term + '**' + (f.def ? ' (' + firstSentence(f.def).replace(/\.$/, '') + ')' : '')).join(' ; ') + '.' : 'Je ne reconnais pas de notion précise : reformule avec les mots du cours (vente, possession, prix…).'],
        ['h', '2. Problème de droit'], ['p', (question ? 'La question posée : « ' + question.trim() + ' ». ' : '') + 'Reformule-la de façon **abstraite**, sans les prénoms' + (found[0] ? ', autour de la notion de **' + found[0].term + '**' : '') + ' : « Un … peut-il … ? »'],
        ['h', '3. Majeure (la règle)']];
      arts.forEach(a => blocks.push(['rule', a.body, artLabel(a)]));
      arrets.forEach(a => blocks.push(['p', a.passage ? a.body : '**' + plain(a.title) + '** : ' + firstSentence(a.body)]));
      if (keyPass[0] && !arts.some(a => mentions(a, main.term))) blocks.push(['p', '**Ton cours, sur ' + main.term + ' :** ' + keyPass[0].body]);
      else if (!arts.length && !arrets.length && G && G.def) blocks.push(['p', G.def]);
      blocks.push(['h', '4. Mineure (à toi)']);
      blocks.push(['p', cond ? 'Vérifie une par une ces conditions dans les faits :\n' + cond.body : 'Reprends chaque élément de la règle et dis si les faits le remplissent, en citant les faits précis.']);
      blocks.push(['h', '5. Conclusion']);
      blocks.push(['p', '**À toi :** écris ta conclusion (et ta mineure si tu veux) ici, je te corrige.']);
      if (sim && sim[0] >= 3) blocks.push(['tip', 'Ça ressemble au cas « ' + sim[1].x.title + ' » (' + sim[1].M.title + ', ch. ' + sim[1].c.n + ') : son corrigé peut t\'aider.']);
      blocks.push(['src', [...arts, ...arrets, ...(G ? G.strong.slice(0, 2) : [])]]);
      conv.pending = { type: 'cas', kw: [...new Set(arts.slice(0, 2).concat(keyPass).flatMap(d => keywords(d.body)).concat(found.slice(0, 2).flatMap(f => toks(f.term))))].slice(0, 8), refs: arts.flatMap(a => refsOf(a.title)), docs: [...keyPass, ...arts, ...arrets] };
      return { steps, blocks, speak: 'On le traite comme au partiel. Je t\'ai préparé la qualification et la règle ; à toi la mineure.', chips: [{ label: 'Donne-moi la solution', fn: casSolution }] };
    }
    function casSolution() {
      const p = conv.pending; conv.pending = null;
      if (!p || p.type !== 'cas') return reply({ blocks: ['Il n\'y a pas de cas en cours.'] });
      user('Donne-moi la solution');
      return reply({ steps: [{ t: 'Je reprends la règle et je l\'applique', docs: p.docs }], blocks: [['p', 'Sans les faits complets, je ne peux pas trancher à ta place, mais voici la structure de la solution :'], ['ol', p.docs.slice(0, 3).map(d => '**' + (d.kind === 'Article' ? artLabel(d) : arrLabel(d)) + '** : ' + firstSentence(d.body) + ' → les faits remplissent-ils chaque condition ?')], ['tip', 'Conclusion type : « En l\'espèce, les conditions de … étant (ou non) réunies, X pourra (ou non) … »']] });
    }
    function gradeCas(text) {
      const p = conv.pending; conv.pending = null;
      const got = toks(text), hit = p.kw.filter(w => got.some(g => close(g, w))), refHit = p.refs.filter(r => refsOf('art. ' + text.replace(/\b(\d{3,4})\b/g, 'art. $1')).includes(r));
      const r = p.kw.length ? hit.length / p.kw.length : 0;
      const struct = /en l.?esp[eè]ce|en (l.?)?occurrence|or,|ici/i.test(text), concl = /donc|par cons[eé]quent|ainsi|en conclusion|pourra|ne pourra|peut|ne peut/i.test(text);
      const blocks = [['p', r > .5 ? 'Bon raisonnement.' : r > .25 ? 'Il y a des bonnes choses, mais c\'est incomplet.' : 'Tu restes trop loin de la règle.']];
      const list = [];
      const cited = refsOf('art. ' + text.replace(/\b(\d{3,4})\b/g, 'art. $1')).filter(r => !refHit.includes(r));
      if (refHit.length) list.push('Tu cites ' + refHit.map(x => 'l\'art. ' + x).join(', ') + ' : c\'est le bon texte.');
      cited.forEach(r => { const d = idx.search('art. ' + r, 1, x => refsOf(x.title + ' ' + (x.ref || '')).includes(r))[0] || idx.search('art. ' + r, 1, x => refsOf(x.body).includes(r))[0]; list.push(d ? 'Tu cites l\'**art. ' + r + '** : dans ton cours, ' + firstSentence(d.body) + ' Vérifie qu\'il colle bien aux faits.' : 'Tu cites l\'art. ' + r + ', que je ne trouve pas dans ton cours : vérifie le numéro.'); });
      if (!refHit.length && !cited.length) list.push('Tu ne cites aucun texte' + (p.refs.length ? ' (pense à l\'art. ' + p.refs[0] + ')' : '') + ' : au partiel, ce sont des points perdus.');
      list.push(struct ? 'Tu appliques aux faits (« en l\'espèce ») : bien.' : 'Je ne vois pas l\'application aux faits : écris « En l\'espèce, … » et reprends les faits précis.');
      list.push(concl ? 'Tu conclus : bien.' : 'Il manque une conclusion nette qui répond à la question posée.');
      const miss = p.kw.filter(w => !hit.includes(w)).slice(0, 5).map(w => surface(w, p.docs.map(d => d.body).join(' ')));
      if (miss.length) list.push('Notions de la règle absentes de ta réponse : ' + miss.map(m => '**' + m + '**').join(', ') + '.');
      blocks.push(['ul', list]);
      return { steps: [{ t: 'Je compare ta réponse à la règle applicable', docs: p.docs }, { t: 'Je vérifie la structure : majeure, mineure, conclusion' }], blocks, speak: blocks[0][1] };
    }

    function revise() {
      const M = cur(), L = hooks.lobes().filter(l => l.mat === M).slice().sort((a, b) => a.m - b.m);
      const due = ST.dueItems(items.filter(i => i.gradable));
      const misses = Object.entries(P.miss).sort((a, b) => b[1] - a[1]).slice(0, 3);
      const exam = ST.S.examDate ? Math.ceil((new Date(ST.S.examDate) - Date.now()) / 864e5) : null;
      const weak = L.slice(0, 2);
      const steps = [{ t: 'Je regarde ta maîtrise lobe par lobe', docs: weak.flatMap(l => l.nodes.slice(0, 3)) }, { t: due.length + ' élément' + (due.length > 1 ? 's' : '') + ' à revoir aujourd\'hui (répétition espacée)' }, misses.length ? { t: 'Je me souviens de tes erreurs passées' } : null, exam != null && exam >= 0 ? { t: 'Partiel dans ' + exam + ' jour' + (exam > 1 ? 's' : '') } : null];
      const blocks = [['p', 'Voici ce que je te conseille, ' + (nameOf() || 'toi') + ' :'], ['ol', [
        weak[0] && '**' + weak[0].chap.title + '** (' + Math.round(weak[0].m * 100) + ' %) : c\'est ton lobe le plus faible. Récital puis interro.',
        weak[1] && '**' + weak[1].chap.title + '** (' + Math.round(weak[1].m * 100) + ' %) ensuite.',
        due.length ? '**' + due.length + ' rappels** en attente : une interro « tout le cerveau » les prend en priorité.' : 'Aucun rappel en retard : bien.',
        misses.length ? 'Notions sur lesquelles tu as buté : ' + misses.map(([k]) => '**' + k + '**').join(', ') + '.' : null
      ]]];
      if (exam != null && exam >= 0 && exam <= 7) blocks.push(['tip', 'À moins d\'une semaine : privilégie les **définitions**, les **articles** et un **plan type** par grande notion plutôt que du nouveau.']);
      return { steps, blocks, chips: [weak[0] && { label: 'Récital : ' + weak[0].chap.short, fn: () => hooks.recital(weak[0]) }, weak[0] && { label: 'Interro : ' + weak[0].chap.short, fn: () => hooks.interro(weak[0]) }, { label: 'Interro sur mes rappels', fn: () => hooks.interro(null) }, misses[0] && { label: 'Réexplique ' + misses[0][0], q: 'c\'est quoi ' + misses[0][0] }] };
    }

    function planFor(q) {
      const hits = idx.search(q, 20, d => d.kind === 'Épreuve'); const s = hits[0] && hits[0].sujet;
      const found = concepts(q);
      if (s) {
        const steps = [{ t: 'Je cherche un sujet proche dans les épreuves type partiel : **' + plain(s.sujet) + '**', docs: hits.slice(0, 3) }, { t: 'Je reprends la problématique et le plan corrigé' }, { t: 'Je liste les hors-sujet à éviter' }];
        return { steps, blocks: [['p', '**Problématique.** ' + s.problematique], ['ul', (s.plan || []).map(p => '**' + p[0] + '**' + '\n' + p[1].map(x => '— ' + x).join('\n'))], s.hs && s.hs.length ? ['trap', 'Hors-sujet : ' + s.hs.map(plain).join(' ; ')] : null, ['tip', 'Un bon plan a **deux idées** (pas deux thèmes) : chaque titre doit dire quelque chose.']], chips: [{ label: 'Ouvrir les épreuves', fn: () => { location.hash = '#/epreuves'; } }] };
      }
      return found[0] ? explain(found[0], q, { main: 'def', all: ['def'] }, [['tip', 'Pour un plan : I. la notion (définition, conditions) ; II. son régime (effets, limites). Mets une **idée** dans chaque titre.']]) : null;
    }

    /* ---------- interro dans la conversation ---------- */
    function quiz(t) {
      let pool = t ? asks(gather(t.term).strong) : [];
      if (!pool.length) pool = ST.pickSmart(items.filter(i => i.gradable && i.ask && i.kind !== 'Cas pratique'), 10);
      pool = pool.filter(i => !conv.history.includes(i.id));
      if (!pool.length) return reply({ blocks: ['J\'ai épuisé mes questions sur ce point. Change de sujet ?'] });
      return quizItem(t ? pool[0] : pick(pool), t);
    }
    function quizItem(it, t) {
      conv.history.push(it.id); conv.pending = { type: 'quiz', it, tries: 0, t };
      hooks.light([it]);
      return reply({ steps: [{ t: 'Je choisis une question ' + (t ? 'sur **' + t.term + '**' : 'parmi ce que tu dois revoir'), docs: [it] }], blocks: [['p', '**' + it.kind + '.** ' + it.ask], ['p', '*Réponds avec tes mots, même approximativement. « indice » si tu bloques.*']], speak: it.ask });
    }
    function answerQuiz(text) {
      const p = conv.pending, it = p.it, n = norm(text);
      if (/^(indice|aide|un indice|help)\b/.test(n) || /je (ne )?sais pas|aucune idee|j.?en sais rien|je seche|joker/.test(n)) {
        if (p.tries === 0 && !/je (ne )?sais pas|aucune idee|rien|joker/.test(n)) { p.tries++; return reply({ blocks: [['p', hint(it)]] }); }
        return finishQuiz(0, { hit: [], miss: keywords(it.answer) }, true);
      }
      const g = gradeText(it, text);
      if (g.note) return reply({ blocks: [g.note] });
      if (g.res === 0 && p.tries === 0 && it.kind !== 'Vrai ou faux') { p.tries++; return reply({ steps: [{ t: 'Je compare ta réponse aux éléments attendus' }], blocks: [['p', 'Pas encore. ' + hint(it)], ['p', '*Retente.*']] }); }
      return finishQuiz(g.res, g);
    }
    function hint(it) {
      const kw = keywords(it.answer), refs = refsOf(it.answer + ' ' + it.ref);
      if (refs.length) return 'Indice : pense à l\'**art. ' + refs[0] + '**.';
      if (kw[0]) { const w = surface(kw[0], it.answer); return 'Indice : un mot-clé commence par « **' + w.slice(0, Math.max(3, Math.ceil(w.length / 3))) + '…** ».'; }
      return 'Indice : relis le titre de la question, la réponse est dans la définition.';
    }
    function finishQuiz(res, g, gaveUp) {
      const p = conv.pending, it = p.it; conv.pending = null;
      hooks.grade(it, res); conv.quizN++; if (res === 2) conv.quizOk++;
      const t = p.t || concepts(it.title + ' ' + it.answer)[0];
      if (res < 2 && t) { P.miss[t.term] = (P.miss[t.term] || 0) + 1; saveProfile(P); }
      const msg = res === 2 ? pick(['Exact.', 'Oui, c\'est ça.', 'Parfait.', 'Bien joué.']) : res === 1 ? 'Presque.' : gaveUp ? 'Pas de souci, voilà la réponse.' : 'Non, pas tout à fait.';
      const blocks = [['p', '**' + msg + '**' + (g.hit && g.hit.length && res < 2 ? ' Tu as bien ' + g.hit.map(w => '« ' + surface(w, it.answer) + ' »').join(', ') + '.' : '')]];
      if (res < 2 && g.miss && g.miss.length) blocks.push(['p', 'Il manquait : ' + g.miss.slice(0, 5).map(w => '**' + surface(w, it.answer) + '**').join(', ') + '.']);
      if (g.refOk === false) blocks.push(['p', 'Et cite le texte : ' + refsOf(it.answer + ' ' + it.ref).map(r => 'art. ' + r).join(', ') + '.']);
      blocks.push(['rule', it.answer, it.ref || it.kind]);
      if (res === 2) { const G = t ? gather(t.term) : null; const more = G && [...G.arrets, ...G.traps].find(d => d.id !== it.id && mentions(d, t.term)); if (more) blocks.push(['p', '**Pour aller plus loin.** ' + plain(more.title) + ' : ' + firstSentence(more.body)]); }
      blocks.push(['p', '*Score de la séance : ' + conv.quizOk + ' / ' + conv.quizN + '*']);
      return reply({ steps: [{ t: 'Je compare ta réponse aux éléments attendus', docs: [it] }, { t: 'Je note (répétition espacée) : ' + ['à revoir aujourd\'hui', 'à revoir bientôt', 'acquis pour l\'instant'][res] }], blocks, speak: msg, chips: [{ label: 'Question suivante', fn: () => quiz(p.t) }, t && res < 2 && { label: 'Réexplique ' + t.term, q: 'explique plus simplement ' + t.term }, { label: 'Stop', fn: () => reply({ blocks: ['Séance finie : ' + conv.quizOk + ' / ' + conv.quizN + '. ' + (conv.quizN && conv.quizOk / conv.quizN >= .75 ? 'Très bien.' : 'On y reviendra.')] }) }] });
    }

    function simpler(t) {
      const G = gather(t.term), card = G.cards.slice().sort((a, b) => plain(a.body).length - plain(b.body).length)[0];
      const blocks = [['p', 'En une phrase : ' + (G.def ? firstSentence(G.def) : card ? plain(card.body) : 'je n\'ai pas de version courte.')]];
      if (card && G.def) blocks.push(['p', '**Version flashcard.** ' + card.title + ' → ' + card.body]);
      if (G.mnemo[0]) blocks.push(['tip', G.mnemo[0].body]);
      blocks.push(['p', '*Reformule-la avec tes mots ici : je te dis si c\'est juste.*']);
      const it = G.defDoc && G.defDoc.ask ? G.defDoc : asks(G.strong)[0];
      if (it) conv.pending = { type: 'quiz', it, tries: 1, t };
      return { steps: [{ t: 'Je cherche la formulation la plus courte de **' + t.term + '**', docs: [card, G.defDoc].filter(Boolean) }], blocks, speak: blocks[0][1] };
    }
    function focusedFollow(t, it, q) {
      const G = gather(t.term, q), want = it.main;
      if (want === 'example') { const e = (G.ex.length ? G.ex : G.pool.filter(d => d.kind === 'Cas pratique' || d.kind === 'Épreuve')).slice(0, 2); return { steps: [{ t: 'Je cherche un exemple de **' + t.term + '** dans ton cours', docs: e }], blocks: e.length ? e.map(d => ['p', d.body]).concat([['src', e]]) : [['p', 'Pas d\'exemple tout fait sur ' + t.term + '. Essaie : écris-moi une petite situation et je te dis si c\'en est un.']], chips: [{ label: 'Interroge-moi dessus', fn: () => quiz(t) }] }; }
      if (want === 'why') { const w = G.why.slice(0, 2); return { steps: [{ t: 'Je cherche la justification de **' + t.term + '**', docs: w }], blocks: w.length ? w.map(d => ['p', d.body]).concat([['src', w]]) : [['p', 'Ton cours ne donne pas de justification en toutes lettres. Raisonne : qui la règle protège-t-elle, contre quel risque ? Voici le passage qui éclaire le mieux :'], ...G.fiche.filter(d => mentions(d, t.term)).slice(0, 1).map(d => ['p', d.body]), ['p', '*Propose ta justification ici, je te dis ce que j\'en pense.*']] }; }
      if (want === 'arret') { const a = G.arrets.slice(0, 3); return { steps: [{ t: 'Je cherche les arrêts liés à **' + t.term + '**', docs: a }], blocks: a.length ? a.map(d => ['p', arrText(d)]).concat([['src', a]]) : [['p', 'Aucun arrêt rattaché à cette notion dans ton cours.']] }; }
      if (want === 'article') { const a = G.arts.slice(0, 3); return { steps: [{ t: 'Je cherche les textes sur **' + t.term + '**', docs: a }], blocks: a.length ? a.map(d => ['rule', d.body, artLabel(d)]) : [['p', 'Aucun article rattaché à cette notion dans ton cours.']] }; }
      if (want === 'trap') { const a = G.traps.slice(0, 3); return { steps: [{ t: 'Je cherche les pièges sur **' + t.term + '**', docs: a }], blocks: a.length ? a.map(d => ['trap', d.kind === 'Vrai ou faux' ? '« ' + plain(d.title) + ' » ' + d.body : d.body]) : [['p', 'Pas de piège signalé dans ton cours sur ce point.']] }; }
      if (want === 'more') { const seen = new Set(conv.shown || []); const rest = G.strong.filter(d => !seen.has(d.id) && d.kind !== 'Vrai ou faux' && d.kind !== 'Quiz').slice(0, 3); conv.shown = [...seen, ...rest.map(d => d.id)]; return { steps: [{ t: 'Je cherche ce que je ne t\'ai pas encore dit sur **' + t.term + '**', docs: rest }], blocks: rest.length ? rest.map(d => ['p', '**' + d.kind + ' · ' + plain(d.title) + '.** ' + d.body]).concat([['src', rest]]) : [['p', 'J\'ai fait le tour de ce que dit ton cours là-dessus. On passe à l\'interro ?']], chips: [{ label: 'Encore', q: 'encore' }, { label: 'Interroge-moi dessus', fn: () => quiz(t) }] }; }
      return explain(t, q, it);
    }

    function articleLookup(refs, q) {
      const steps = [], blocks = [], all = [];
      refs.slice(0, 3).forEach(r => {
        const own = idx.search('art. ' + r, 3, d => refsOf(d.title + ' ' + (d.ref || '')).includes(r));
        const used = idx.search('art. ' + r, 6, d => !own.includes(d) && refsOf(d.body).includes(r));
        steps.push({ t: 'Je cherche l\'**art. ' + r + '** : ' + (own.length ? 'trouvé' : 'pas de fiche dédiée') + (used.length ? ', cité dans ' + used.length + ' autres passages' : ''), docs: own.concat(used) });
        if (own[0]) blocks.push(['rule', own[0].body, plain(own[0].title)]);
        else if (used[0]) blocks.push(['p', 'Ton cours ne le reproduit pas, mais l\'utilise ici : ' + used[0].body]);
        else blocks.push(['p', 'L\'art. ' + r + ' n\'apparaît pas dans ton cours.' + (Claude.ready() ? '' : ' (Le mode Claude peut répondre hors cours.)')]);
        const tr = used.find(d => d.kind === 'Piège' || /^\*\*Faux/.test(d.body)); if (tr) blocks.push(['trap', tr.body]);
        const ar = used.find(d => d.kind === 'Arrêt'); if (ar) blocks.push(['p', '**Appliqué par :** ' + plain(ar.title) + ' — ' + firstSentence(ar.body)]);
        all.push(...own, ...used);
      });
      blocks.push(['src', all]);
      const c = concepts(plain((all[0] || {}).title || '') + ' ' + plain((all[0] || {}).body || '').slice(0, 200))[0]; if (c) setTopic(c);
      const qz = all.find(d => d.ask && d.kind === 'Article') || all.find(d => d.ask && d.kind !== 'Cas pratique');
      return { steps, blocks, speak: all[0] ? firstSentence(all[0].body) : '', chips: [qz && { label: 'Récite-le moi (je vérifie)', fn: () => quizItem(qz) }, c && { label: 'Explique ' + c.term, q: 'c\'est quoi ' + c.term }] };
    }
    function fallback(q) {
      const res = idx.search(q, 6);
      if (!res.length) return { steps: [{ t: 'Je cherche dans tout le cours… rien ne correspond' }], blocks: [['p', 'Je ne trouve rien sur « ' + q + ' » dans ton cours. Essaie avec un mot-clé (« réméré », « lésion », « art. 1583 »…), ou ' + (Claude.ready() ? 'reformule.' : 'branche le mode Claude (bouton ⚙) pour les questions hors cours.')]] };
      const best = res[0];
      const { fixed } = idx.expand(q);
      return { steps: [fixed.length ? { t: 'J\'ai compris ' + fixed.map(([a, b]) => '« ' + a + ' » comme « ' + b + ' »').join(', ') } : null, { t: 'Je cherche dans tout le cours : ' + res.length + ' passages', docs: res }, { t: 'Je garde le plus pertinent' }], blocks: [['p', '**' + plain(best.title) + '** — ' + best.body], res[1] ? ['p', '*Voir aussi :* ' + plain(res[1].title) + ' : ' + firstSentence(res[1].body)] : null, ['src', res]], speak: best.answer || best.body, chips: best.ask ? [{ label: 'Interroge-moi dessus', fn: () => quizItem(best) }] : [] };
    }

    /* ================= Faire cours ================= */
    // Une leçon = la fiche du chapitre, découpée en parties (sections et sous-sections),
    // expliquée partie par partie, avec une vérification de compréhension à chaque étape.
    const lessonBar = h('div', { class: 'pf-lesson', hidden: true });
    el.insertBefore(lessonBar, log);
    const chapList = () => MATIERES.flatMap(M => M.chapters.map(c => Object.assign({ M }, c)));
    const chapById = id => chapList().find(c => c.id === id);
    const lp = ch => (P.lessons = P.lessons || {}, P.lessons[ch] = P.lessons[ch] || { i: 0, ok: [], ko: [], done: false });
    function chapterFrom(q) {
      const n = norm(q).replace(/[’']/g, ' '), M = cur();
      const num = n.match(/\b(?:chap(?:itre)?|ch)\.?\s*(\d+)/);
      const other = MATIERES.find(m => m.id !== M.id && n.includes(norm(m.title)));
      const inM = other || M;
      if (num) { const c = inM.chapters.find(x => String(x.n) === num[1]); if (c) return c.id; }
      const byName = chapList().filter(c => (!other || c.M === other)).find(c => n.includes(norm(c.title)) || (c.short.length > 4 && new RegExp('\\b' + norm(c.short) + '\\b').test(n)));
      if (byName) return byName.id;
      const t = concepts(stripFollow(q))[0];
      if (t && t.ch && chapById(t.ch) && lessonsOf(t.ch)) return t.ch;
      return null;
    }
    function fblock(b) {
      const t = b[0];
      if (t === 'intro' || t === 'p' || t === 'note') return ['p', b[1]];
      if (t === 'h4') return ['h', plain(b[1])];
      if (t === 'ul') return ['ul', b[1]];
      if (t === 'def') return ['p', '**' + b[1] + '** : ' + b[2]];
      if (t === 'art') return ['rule', b[2], b[1]];
      if (t === 'juris') return ['p', '**' + b[1] + '** — ' + b[2]];
      if (t === 'tip') return ['tip', '**À retenir.** ' + b[1]];
      if (t === 'trap') return ['trap', b[1]];
      if (t === 'mnemo') return ['tip', '**' + b[1] + '** — ' + b[2]];
      if (t === 'plan') return ['ul', b[1].map(x => typeof x === 'string' ? x : '**' + x[0] + '**' + (x[1] && x[1].length ? ' : ' + x[1].join(' ; ') : ''))];
      if (t === 'table') return ['ul', b[2].map(r => '**' + r[0] + '** — ' + r.slice(1).map((x, j) => (b[1][j + 1] ? b[1][j + 1] + ' : ' : '') + x).join(' ; '))];
      if (t === 'steps') return ['ol', b[1].map(s => '**' + s[0] + '** : ' + s[1])];
      if (t === 'pair') return ['cmp', b[1].map(s => [plain(s[0]), s[1]])];
      return null;
    }
    const TRANS = ['Maintenant, voyons', 'On passe à', 'Enchaînons sur', 'Suite logique :', 'Deuxième temps :', 'Regardons'];
    function checkFor(L, s, avoid) {
      const st = new Set(toks(s.text));
      const cand = idx.search(s.head + ' ' + keywords(s.text).join(' '), 30, d => d.ch === L.ch && d.ask && d.kind !== 'Cas pratique' && !avoid.includes(d.id));
      const sc = d => { const k = keywords(d.answer); return k.length ? k.filter(w => st.has(w)).length / k.length : 0; };
      return cand.map(d => [sc(d) + (d.kind === 'Question de cours' || d.kind === 'Carte' ? .1 : 0), d]).sort((a, b) => b[0] - a[0]).filter(x => x[0] >= .34).map(x => x[1])[0] || null;
    }
    function lessonHead() {
      const Ls = conv.lesson; if (!Ls) { lessonBar.hidden = true; return; }
      const c = chapById(Ls.ch), n = Ls.seqs.length;
      lessonBar.replaceChildren(h('span', null, h('b', null, 'Cours'), ' · ' + c.M.title + ', ch. ' + c.n + ' — partie ' + Math.min(n, Ls.i + 1) + ' / ' + n), h('i', null, h('u', { style: { width: Math.round(Math.min(n, Ls.i + 1) / n * 100) + '%' } })), h('button', { type: 'button', onclick: () => { lessonPause(); } }, 'Pause'));
      lessonBar.hidden = false;
    }
    function lessonStart(ch, at) {
      if (Claude.ready()) { const c = chapById(ch); return ask('Fais-moi le cours du chapitre ' + ch + ' (' + c.title + ', ' + c.M.title + ')' + (at ? ', à partir de la partie ' + (at + 1) : '') + ', partie par partie, comme un vrai prof : explique, illustre, puis vérifie que j\'ai compris avant de passer à la suite.'); }
      const seqs = lessonsOf(ch); if (!seqs) return reply({ blocks: ['Ce chapitre n\'a pas de fiche : je ne peux pas en faire le cours.'] });
      const st = lp(ch); const i = at != null ? at : (st.done ? 0 : st.i);
      conv.lesson = { ch, seqs, i, asked: [] }; conv.pending = null;
      hooks.focusChapter(ch);
      return lessonShow(i > 0 && at == null ? 'reprise' : null);
    }
    function lessonShow(how) {
      const Ls = conv.lesson, s = Ls.seqs[Ls.i], c = chapById(Ls.ch), n = Ls.seqs.length;
      lp(Ls.ch).i = Ls.i; saveProfile(P); lessonHead();
      const rel = idx.search(s.head + ' ' + keywords(s.text).join(' '), 8, d => d.ch === Ls.ch && !d.passage);
      const pts = pointsOf(s).slice(0, 4);
      const intro = Ls.i === 0 ? (how === 'reprise' ? 'On reprend ' : 'On attaque ') + '**' + c.title + '** (' + c.M.title + '). ' + (n > 1 ? 'Je te le fais en ' + n + ' parties ; à chaque fin de partie, je vérifie que c\'est compris.' : '')
        : (how === 'reprise' ? 'On reprend où on s\'était arrêtés : ' : pick(TRANS) + ' ') + '**' + s.title + '**.';
      const blocks = [['p', intro]];
      if (Ls.i > 0 || s.head !== c.title) blocks.push(['h', (Ls.i + 1) + '. ' + s.title]);
      s.blocks.map(fblock).forEach(b => b && blocks.push(b));
      if (pts.length) blocks.push(['p', '**Ce que tu dois retenir de cette partie :**'], ['ul', pts.map(p => p.short)]);
      const q = checkFor(Ls, s, Ls.asked.concat(conv.history));
      if (q) { Ls.asked.push(q.id); conv.pending = { type: 'lesson', it: q, tries: 0 }; blocks.push(['p', '**Vérifions.** ' + q.ask], ['p', '*Réponds avec tes mots (ou « suite » pour passer).*']); }
      return reply({
        steps: [{ t: 'J\'ouvre la fiche « ' + c.short + ' », partie ' + (Ls.i + 1) + ' sur ' + n, docs: rel }, pts.length ? { t: 'Je dégage les ' + pts.length + ' points essentiels' } : null, q ? { t: 'Je prépare une question pour vérifier que c\'est compris', docs: [q] } : null],
        blocks, speak: plain(intro) + ' ' + pts.map(p => plain(p.short)).join('. '),
        chips: q ? [{ label: 'Lis-la moi', fn: () => hooks.say(s.blocks.map(b => plain(fblockText(b))).join(' ')) }, { label: 'Explique autrement', fn: lessonAlt }] : lessonChips()
      });
    }
    function fblockText(b) { const t = b[0]; if (t === 'ul') return b[1].join('. '); if (t === 'def' || t === 'art' || t === 'juris') return b[1] + ' : ' + b[2]; if (t === 'mnemo') return b[2]; if (t === 'steps' || t === 'pair') return b[1].map(s => s[0] + ' : ' + s[1]).join('. '); if (t === 'table') return b[2].map(r => r.join(', ')).join('. '); if (t === 'plan') return ''; return b[1] || ''; }
    function lessonChips() {
      const Ls = conv.lesson; const last = Ls && Ls.i >= Ls.seqs.length - 1;
      return [{ label: last ? 'Terminer le cours' : 'Partie suivante', fn: lessonNext }, { label: 'Explique autrement', fn: lessonAlt }, { label: 'Je te la restitue', fn: () => restitStart(Ls.ch, Ls.i) }, { label: 'Une question de plus', fn: lessonMoreQ }];
    }
    function lessonNext() {
      const Ls = conv.lesson; if (!Ls) return reply({ blocks: ['Pas de cours en route. Dis « fais-moi cours sur… ».'] });
      conv.pending = null;
      if (Ls.i >= Ls.seqs.length - 1) return lessonEnd();
      Ls.i++; return lessonShow();
    }
    function lessonMoreQ() {
      const Ls = conv.lesson; if (!Ls) return null;
      const q = checkFor(Ls, Ls.seqs[Ls.i], Ls.asked.concat(conv.history));
      if (!q) return reply({ blocks: ['J\'ai épuisé mes questions sur cette partie.'], chips: lessonChips() });
      Ls.asked.push(q.id); conv.pending = { type: 'lesson', it: q, tries: 0 };
      return reply({ steps: [{ t: 'Je cherche une autre question sur cette partie', docs: [q] }], blocks: [['p', '**' + q.kind + '.** ' + q.ask]], speak: q.ask });
    }
    function lessonAlt() {
      const Ls = conv.lesson; if (!Ls) return null;
      const s = Ls.seqs[Ls.i], st = new Set(toks(s.text));
      const cards = idx.search(s.head + ' ' + keywords(s.text).join(' '), 12, d => d.ch === Ls.ch && (d.kind === 'Carte' || d.kind === 'Définition' || d.kind === 'Question de cours')).filter(d => keywords(d.answer || d.body).some(w => st.has(w))).slice(0, 4);
      const first = s.blocks.find(b => b[0] === 'p' || b[0] === 'intro');
      const blocks = [['p', 'Autrement dit' + (first ? ' : ' + firstSentence(first[1]) : ', en version flashcards :')]];
      if (cards.length) blocks.push(['ul', cards.map(d => '**' + plain(d.title) + '** → ' + plain(d.answer || d.body))]);
      const pts = pointsOf(s);
      const defs = pts.filter(p => p.kind === 'def').slice(0, 3); if (defs.length) blocks.push(['p', '**Les mots à connaître :** ' + defs.map(p => p.short).join(' ; ')]);
      const mn = s.blocks.find(b => b[0] === 'mnemo') || (DATA.all[Ls.ch].fiche || []).find(b => b[0] === 'mnemo'); if (mn) blocks.push(['tip', '**' + mn[1] + '** — ' + mn[2]]);
      blocks.push(['p', '*Si c\'est plus clair, essaie de me la restituer avec tes mots.*']);
      return reply({ steps: [{ t: 'Je reformule la partie avec ses flashcards', docs: cards }], blocks, speak: blocks[0][1], chips: lessonChips() });
    }
    function lessonAnswer(text) {
      const p = conv.pending, it = p.it, n = norm(text), Ls = conv.lesson, st = lp(Ls.ch);
      const give = /je (ne )?sais pas|aucune idee|j.?en sais rien|je seche|joker|donne la reponse/.test(n);
      if (/^(un )?indice\b|^aide\b/.test(n) && p.tries === 0) { p.tries++; return reply({ blocks: [['p', hint(it)]] }); }
      const g = give ? { res: 0, hit: [], miss: keywords(it.answer) } : gradeText(it, text);
      if (g.note) return reply({ blocks: [g.note] });
      if (g.res === 0 && p.tries === 0 && !give && it.kind !== 'Vrai ou faux') { p.tries++; return reply({ steps: [{ t: 'Je compare ta réponse à la partie qu\'on vient de voir' }], blocks: [['p', 'Pas encore. ' + hint(it) + ' *Retente.*']] }); }
      conv.pending = null; hooks.grade(it, g.res);
      const key = Ls.seqs[Ls.i].id;
      st.ok = st.ok.filter(x => x !== key); st.ko = st.ko.filter(x => x !== key); (g.res === 2 ? st.ok : st.ko).push(key); saveProfile(P);
      const blocks = [['p', g.res === 2 ? '**' + pick(['Exact', 'C\'est ça', 'Parfait', 'Bien compris']) + '.** On peut avancer.' : g.res === 1 ? '**Presque.** Il manquait : ' + g.miss.slice(0, 4).map(w => '**' + surface(w, it.answer) + '**').join(', ') + '.' : '**Pas tout à fait.**']];
      blocks.push(['rule', it.answer, it.ref || it.kind]);
      if (g.res < 2) {
        const s = Ls.seqs[Ls.i], kw = keywords(it.answer);
        const back = s.blocks.map(b => [kw.filter(w => toks(fblockText(b)).includes(w)).length, b]).sort((a, b) => b[0] - a[0])[0];
        if (back && back[0]) blocks.push(['p', '**C\'est ici dans le cours :**'], fblock(back[1]));
        const t = concepts(it.title + ' ' + it.answer)[0]; if (t) { P.miss[t.term] = (P.miss[t.term] || 0) + 1; saveProfile(P); }
      }
      return reply({ steps: [{ t: 'Je compare ta réponse à la partie qu\'on vient de voir', docs: [it] }], blocks, speak: plain(blocks[0][1]), chips: g.res === 2 ? lessonChips() : [{ label: 'Explique autrement', fn: lessonAlt }, { label: 'Une autre question', fn: lessonMoreQ }, { label: 'Partie suivante quand même', fn: lessonNext }] });
    }
    function lessonEnd() {
      const Ls = conv.lesson, c = chapById(Ls.ch), st = lp(Ls.ch);
      st.done = true; st.i = 0; saveProfile(P);
      const ko = Ls.seqs.filter(s => st.ko.includes(s.id)), ok = Ls.seqs.filter(s => st.ok.includes(s.id));
      const all = Ls.seqs.flatMap(s => pointsOf(s).filter(p => p.kind === 'art' || p.kind === 'def')).slice(0, 8);
      conv.lesson = null; lessonHead();
      return reply({
        steps: [{ t: 'Je fais le bilan des ' + Ls.seqs.length + ' parties' }],
        blocks: [['p', '**Fin du cours : ' + c.title + '.** ' + (ok.length ? ok.length + ' partie' + (ok.length > 1 ? 's' : '') + ' validée' + (ok.length > 1 ? 's' : '') + '. ' : '') + (ko.length ? 'À retravailler : ' + ko.map(s => '« ' + s.title + ' »').join(', ') + '.' : 'Rien à reprendre : bravo.')],
          all.length ? ['p', '**L\'essentiel du chapitre :**'] : null, all.length ? ['ul', all.map(p => p.short)] : null,
          ['tip', 'La meilleure façon de fixer un cours, c\'est de le **restituer** sans regarder : essaie maintenant, je te corrige.']],
        speak: 'Fin du cours. ' + (ko.length ? ko.length + ' parties à retravailler.' : 'Rien à reprendre, bravo.'),
        chips: [{ label: 'Je restitue tout le chapitre', fn: () => restitStart(c.id, null) }, ko[0] && { label: 'Reprendre « ' + ko[0].title.slice(0, 30) + ' »', fn: () => lessonStart(c.id, Ls.seqs.indexOf(ko[0])) }, { label: 'Interro sur ce chapitre', fn: () => hooks.interro(hooks.lobes().find(l => l.ch === c.id)) }]
      });
    }
    function lessonPause() { if (!conv.lesson) return; const c = chapById(conv.lesson.ch); conv.lesson = null; conv.pending = null; lessonHead(); reply({ blocks: ['Cours mis en pause. Je garde ta place : dis « **reprends le cours** » quand tu veux.'], chips: [{ label: 'Reprendre ' + c.short, fn: () => lessonStart(c.id) }] }); }
    function lessonPicker(kind) {
      const M = cur(), go = kind === 'restit' ? (ch => restitStart(ch, null)) : (ch => lessonStart(ch));
      const lst = M.chapters.filter(c => lessonsOf(c.id));
      const prog = c => { const s = (P.lessons || {})[c.id]; return s ? (s.done ? ' ✓' : s.i ? ' (' + (s.i + 1) + '/' + lessonsOf(c.id).length + ')' : '') : ''; };
      return { blocks: [['p', kind === 'restit' ? 'Quel chapitre veux-tu me **restituer** ? Écris (ou dicte au micro) tout ce dont tu te souviens, je te dis ce qui manque.' : 'Sur quel chapitre je te fais **cours** ? (' + M.title + ' ; pour l\'autre matière, précise-la.)']], chips: lst.map(c => ({ label: c.n + '. ' + c.short + prog(c), fn: () => go(c.id) })) };
    }

    /* ================= Restitution ================= */
    function restitStart(ch, i) {
      const seqs = lessonsOf(ch); if (!seqs) return reply({ blocks: ['Pas de fiche pour ce chapitre.'] });
      const c = chapById(ch), scope = i == null ? seqs : [seqs[i]];
      const pts = uniqBy(scope.flatMap(pointsOf), p => norm(p.label)).sort((a, b) => (b.kind === 'def' || b.kind === 'art') - (a.kind === 'def' || a.kind === 'art')).slice(0, i == null ? 18 : 10);
      conv.pending = { type: 'restit', ch, i, pts, title: i == null ? c.title : scope[0].title };
      hooks.focusChapter(ch);
      return reply({ steps: [{ t: 'Je relève les ' + pts.length + ' points qu\'une bonne restitution doit contenir' }],
        blocks: [['p', 'Je t\'écoute : restitue-moi **' + conv.pending.title + '**, sans regarder. Écris ou dicte (micro) tout ce dont tu te souviens : définitions, articles, arrêts, distinctions.'], ['p', '*Je cherche ' + pts.length + ' points précis. Pas besoin de phrases parfaites.*']],
        speak: 'Je t\'écoute. Restitue-moi ' + plain(conv.pending.title) + '.' });
    }
    function restitGrade(text) {
      const p = conv.pending; conv.pending = null;
      const got = toks(text), sref = refsOf('art. ' + text.replace(/\b(\d{3,4}(?:-\d+)?)\b/g, 'art. $1'));
      const cover = pts => pts.map(pt => { const kh = pt.kw.filter(w => got.some(g => close(g, w))).length; const ok = (pt.refs.length && pt.refs.some(r => sref.includes(r))) || (pt.kw.length && kh >= Math.max(1, Math.ceil(pt.kw.length * .5))); return [ok, pt]; });
      let res = cover(p.pts), moved = null;
      if (p.i != null && res.filter(x => x[0]).length / p.pts.length < .35) { // a-t-elle restitué une autre partie ?
        const seqs = lessonsOf(p.ch);
        const best = seqs.map((x, j) => { const pts = pointsOf(x).slice(0, 10); const r = cover(pts); return [r.filter(y => y[0]).length / Math.max(1, pts.length), j, pts, r]; }).filter(x => x[1] !== p.i).sort((a, b) => b[0] - a[0])[0];
        if (best && best[0] >= .4) { moved = seqs[best[1]]; res = best[3]; p.pts = best[2]; p.i = best[1]; }
      }
      const ok = res.filter(x => x[0]).map(x => x[1]), ko = res.filter(x => !x[0]).map(x => x[1]);
      const note = Math.round(20 * ok.length / Math.max(1, p.pts.length) * 2) / 2;
      P.restit = P.restit || {}; P.restit[p.ch + (p.i == null ? '' : '-' + p.i)] = note; saveProfile(P);
      const words = text.trim().split(/\s+/).length;
      const blocks = [moved ? ['p', 'Ce que tu me racontes ne correspond pas à la partie demandée, mais plutôt à **« ' + moved.title + ' »** : je te note sur celle-là.'] : null, ['p', '**Note de restitution : ' + note + ' / 20.** ' + (note >= 16 ? 'Excellent, c\'est su.' : note >= 12 ? 'Solide, quelques oublis.' : note >= 8 ? 'Les bases sont là, mais il manque des éléments clés.' : 'Il faut le revoir : reprends le cours puis recommence.')]];
      if (ok.length) blocks.push(['p', '**Tu as restitué :** ' + ok.map(x => x.label).join(', ') + '.']);
      if (ko.length) blocks.push(['p', '**Il manque :**'], ['ul', ko.slice(0, 8).map(x => x.short)]);
      if (words < 25) blocks.push(['tip', 'Ta restitution est très courte (' + words + ' mots). Au partiel, développe : définis, cite le texte, donne l\'arrêt.']);
      if (!sref.length && p.pts.some(x => x.refs.length)) blocks.push(['tip', 'Tu ne cites **aucun article** : c\'est le premier réflexe à prendre.']);
      return reply({ steps: [{ t: 'Je compare ta restitution aux points attendus' }, moved ? { t: 'Trop peu de points de la partie demandée : je cherche quelle partie tu as restituée → « ' + moved.title + ' »' } : null, { t: ok.length + ' retrouvés, ' + ko.length + ' manquants' }], blocks, speak: (moved ? 'Tu m\'as restitué une autre partie. ' : '') + 'Note de restitution : ' + note + ' sur 20.',
        chips: [{ label: 'Recommencer', fn: () => restitStart(p.ch, p.i) }, { label: 'Refais-moi le cours', fn: () => lessonStart(p.ch, p.i == null ? 0 : p.i) }, conv.lesson && { label: 'Partie suivante', fn: lessonNext }] });
    }

    /* ================= Le savais-tu ? ================= */
    function teach() {
      P.seen = P.seen || {};
      const pool = items.filter(i => ['Arrêt', 'Définition', 'Chiffre', 'Article'].includes(i.kind) && !P.seen[i.id]);
      const sorted = pool.map(i => [(i.m || 0) + Math.random() * .6 + (i.kind === 'Arrêt' ? -.2 : 0), i]).sort((a, b) => a[0] - b[0]);
      const it = (sorted[0] || [])[1]; if (!it) return { blocks: ['Tu as déjà tout vu ! Demande-moi une notion précise.'] };
      P.seen[it.id] = 1; saveProfile(P);
      const t = concepts(plain(it.title) + ' ' + plain(it.body).slice(0, 200))[0]; if (t) setTopic(t);
      const G = t ? gather(t.term) : null, more = G && [...G.traps, ...G.arrets].find(d => d.id !== it.id && mentions(d, t.term));
      const lead = { 'Arrêt': 'Une décision à connaître', 'Définition': 'Un mot que les correcteurs adorent', 'Chiffre': 'Un chiffre qui tombe souvent', 'Article': 'Un texte à savoir citer' }[it.kind];
      const blocks = [['p', '**Le savais-tu ?** ' + lead + ' (' + it.mat.title + ', ch. ' + it.chap.n + ').'], ['p', '**' + plain(it.title) + '** — ' + it.body]];
      if (it.kind === 'Arrêt' && G && G.def) blocks.push(['p', '**La notion en jeu :** ' + t.term + ' : ' + G.def]);
      if (more) blocks.push(more.kind === 'Piège' || /^\*\*Faux/.test(more.body) ? ['trap', more.kind === 'Vrai ou faux' ? '« ' + plain(more.title) + ' » ' + more.body : more.body] : ['p', '**À rapprocher de :** ' + arrText(more)]);
      return { steps: [{ t: 'Je cherche dans ton cerveau un élément que tu ne maîtrises pas encore', docs: [it] }], blocks, speak: plain(it.title) + '. ' + firstSentence(it.body),
        chips: [{ label: 'Encore un', q: 'apprends-moi quelque chose' }, it.ask && { label: 'Teste-moi dessus', fn: () => quizItem(it) }, t && { label: 'Explique ' + t.term, q: 'c\'est quoi ' + t.term }, { label: 'Fais-moi le cours du chapitre', fn: () => lessonStart(it.ch) }] };
    }

    /* ---------- point d'entrée ---------- */
    async function ask(q, opts = {}) {
      q = String(q || '').trim(); if (!q || busy) return;
      busy = true; hooks.busy(true);
      try {
        if (!opts.silent) user(q);
        if (Claude.ready()) {
          try { await Claude.turn(q, ctx); return; }
          catch (e) { bubble('prof sys', h('p', null, 'Claude indisponible (' + e.message + '). Je réponds avec mon moteur local.')); }
        }
        const r = localAnswer(q);
        if (r && r.then) await r; else if (r) await reply(r);
      } finally { busy = false; hooks.busy(false); }
    }
    function localAnswer(q) {
      const n = norm(q);
      if (conv.pending && conv.pending.type === 'quiz' && !/^(un )?indice\b|^aide\b/.test(n) && (/\?\s*$/.test(q) || /^(stop|arrete|change|autre chose)/.test(n) || intentOf(q).all.length)) conv.pending = null;
      if (conv.pending && conv.pending.type === 'quiz') return answerQuiz(q);
      const cmd = n.replace(/[^a-z ]/g, ' ').trim();
      const isCmd = ['lesson', 'restit', 'teach', 'quiz', 'revise', 'greet'].includes(intentOf(q).main);
      if (conv.lesson) {
        if (/^(suite|continue|continuer|la suite|ok|okay|vas[- ]y|go|next|suivant|partie suivante|passe|on continue|d.?accord|c.?est bon|compris|j.?ai compris)\b/.test(cmd) && cmd.split(' ').length <= 4) return lessonNext();
        if (/^(repete|relis|redis|encore une fois)\b/.test(cmd)) return lessonShow();
        if (/^(explique autrement|autrement|plus simple|j.?ai pas compris|je comprends pas|pas compris)/.test(cmd)) { conv.pending = null; return lessonAlt(); }
        if (/^(pause|stop|arrete)\b/.test(cmd)) return lessonPause();
      }
      if (conv.pending && conv.pending.type === 'lesson') {
        if (isCmd || (/\?\s*$/.test(q) && intentOf(q).all.length)) conv.pending = null; else return lessonAnswer(q);
      }
      if (conv.pending && conv.pending.type === 'restit') {
        if (q.length > 15 && !isCmd && !/\?\s*$/.test(q) && !/^(stop|annule|non)/.test(n)) return restitGrade(q);
        conv.pending = null;
      }
      if (conv.pending && conv.pending.type === 'cas' && q.length > 25 && !/\?$/.test(q)) return gradeCas(q);
      if (/^(stop|arrete)/.test(n)) { conv.pending = null; return { blocks: ['D\'accord, on arrête là.'] }; }
      if (/^(un )?indice\b|^aide\b/.test(n)) return { blocks: ['Un indice sur quoi ? Dis « **interroge-moi** » et je te pose une question ; là, je pourrai t\'aider.'], chips: [{ label: 'Interroge-moi', fn: () => quiz(conv.topic) }] };
      const it = intentOf(q);
      let found = uniqBy(concepts(stripFollow(q)).filter(c => !(c.key.split(' ').length === 1 && GENERIC.has(c.key))), c => norm(c.term));
      const FOLLOW = ['why', 'example', 'arret', 'article', 'trap', 'more', 'simpler', 'conditions', 'effects'];
      const content = toks(q).filter(w => !FOLLOWW.test(w));
      const shortFollow = !found.length && conv.topic && !content.length && (FOLLOW.includes(it.main) || it.all.some(x => FOLLOW.includes(x)));
      const qrefs = refsOf(q.replace(/^\s*(\d{3,4}(?:-\d+)?)\s*$/, 'art. $1'));
      if (qrefs.length && !it.all.includes('compare') && it.main !== 'cas') return articleLookup(qrefs, q);
      if (it.main === 'lesson' || it.main === 'restit') {
        let ch = chapterFrom(q);
        if (!ch && /reprend/.test(n)) ch = Object.keys(P.lessons || {}).find(k => P.lessons[k].i > 0 && !P.lessons[k].done);
        if (!ch && conv.lesson) ch = conv.lesson.ch;
        if (!ch) return lessonPicker(it.main);
        if (it.main === 'restit') { const sm = norm(q).match(/partie\s*(\d+)/); return restitStart(ch, sm ? Math.max(0, +sm[1] - 1) : (conv.lesson && conv.lesson.ch === ch ? conv.lesson.i : null)); }
        const pm = norm(q).match(/partie\s*(\d+)/);
        return lessonStart(ch, pm ? Math.max(0, +pm[1] - 1) : undefined);
      }
      if (it.main === 'teach') return teach();
      if (it.main === 'greet') return greet();
      if (it.main === 'thanks') return { blocks: [pick(['Avec plaisir.', 'De rien !', 'Je suis là.']) + ' On continue ? Demande-moi une notion, une différence, ou colle-moi un cas pratique.'], chips: [{ label: 'Interroge-moi', fn: () => quiz(null) }, { label: 'Par quoi je commence ?', q: 'par quoi je commence ?' }] };
      if (it.main === 'revise') return revise();
      if (it.main === 'cas') return cas(q);
      if (it.main === 'quiz') { const t = found[0] || (/dessus|la-dessus|ca\b/.test(n) ? conv.topic : null); if (t) setTopic(t); return quiz(t); }
      if (it.main === 'plan') { const r = planFor(q); if (r) return r; }
      if (it.main === 'compare' || it.all.includes('compare')) {
        if (found.length < 2 && conv.topic && found.length === 1 && found[0].key !== conv.topic.key) found = [conv.topic, found[0]];
        if (found.length >= 2) { setTopic(found[0]); return compare(found[0], found[1], q); }
      }
      if (!found.length && shortFollow) found = [conv.topic];
      if (!found.length) { // la recherche peut révéler la notion
        const r = idx.search(q, 3), c = r[0] && (r[0].kind === 'Définition' ? concepts(r[0].title) : concepts(plain(r[0].title)));
        if (c && c[0] && (it.main !== 'def' || toks(q).length <= 4)) found = [c[0]];
      }
      if (!found.length) return fallback(q);
      const t = found[0]; setTopic(t);
      if (it.main === 'simpler') return simpler(t);
      if (['example', 'why', 'arret', 'article', 'trap', 'more'].includes(it.main) && (shortFollow || toks(q).length <= 5)) return focusedFollow(t, it, q);
      return explain(t, q, it);
    }
    function greet() {
      const M = cur(), L = hooks.lobes().filter(l => l.mat === M).slice().sort((a, b) => a.m - b.m)[0];
      const due = ST.dueItems(items.filter(i => i.gradable)).length;
      const name = nameOf();
      const lines = [(name ? 'Salut ' + name + '.' : 'Salut.') + ' Je suis ton prof : je connais tout ton cours (' + items.length + ' éléments, ' + docs.length + ' passages) et je réfléchis avant de répondre.'];
      if (L) lines.push('Ton point faible du moment : **' + L.chap.title + '** (' + Math.round(L.m * 100) + ' %).' + (due ? ' Et ' + due + ' rappels t\'attendent.' : ''));
      const resume = Object.keys(P.lessons || {}).map(k => [k, P.lessons[k]]).find(([k, v]) => v.i > 0 && !v.done && lessonsOf(k));
      if (resume) lines.push('Tu as un cours en route : **' + chapById(resume[0]).title + '** (partie ' + (resume[1].i + 1) + ' / ' + lessonsOf(resume[0]).length + ').');
      lines.push('Je peux te **faire cours** sur un chapitre, t\'écouter le **restituer**, t\'**apprendre** quelque chose, répondre à une question, comparer deux notions, corriger un **cas pratique**, ou t\'**interroger**.');
      return { blocks: lines.map(l => ['p', l]), chips: [resume && { label: 'Reprendre le cours : ' + chapById(resume[0]).short, fn: () => lessonStart(resume[0]) }, { label: 'Fais-moi cours', fn: () => reply(lessonPicker('lesson')) }, { label: 'Je restitue un chapitre', fn: () => reply(lessonPicker('restit')) }, { label: 'Apprends-moi un truc', q: 'apprends-moi quelque chose' }, { label: 'Par quoi je commence ?', q: 'par quoi je commence ?' }, { label: 'Interroge-moi', fn: () => quiz(null) }, { label: 'Promesse ou pacte ?', q: 'différence entre promesse unilatérale de vente et pacte de préférence' }] };
    }
    function start() { if (!log.childElementCount) reply(Claude.ready() ? { blocks: [['p', 'Mode **Claude** actif : je fouille ton cours moi-même, je raisonne et je t\'interroge. Pose ta question.']], chips: greet().chips } : greet()); }
    function explainItem(it) { ask('Explique-moi : ' + plain(it.title)); }

    /* ---------- contexte pour Claude ---------- */
    const ctx = {
      bubble, block, srcList, scroll, log, hooks, items, docs, idx, P, saveProfile, lessonsOf, pointsOf, chapById, lp,
      search: (q, n) => idx.search(q, n),
      byId: id => docs.find(d => d.id === id),
      chapterOf: ch => MATIERES.flatMap(M => M.chapters).find(c => c.id === ch),
      ficheText(ch) {
        const o = DATA.all[ch]; if (!o || !o.fiche) return null;
        return docs.filter(d => d.passage && d.ch === ch).map(d => '[' + d.id + '] (' + d.kind + ' — ' + d.title + ') ' + plain(d.body)).join('\n');
      },
      learner() {
        return {
          prenom: nameOf(), matiere_en_cours: cur().title, partiel: ST.S.examDate || null,
          maitrise_par_chapitre: hooks.lobes().map(L => ({ chapitre: L.ch, titre: L.chap.title, matiere: L.mat.title, maitrise: Math.round(L.m * 100) + ' %' })),
          rappels_en_retard: ST.dueItems(items.filter(i => i.gradable)).length,
          notions_ratees: P.miss,
          cours_suivis: Object.fromEntries(Object.entries(P.lessons || {}).map(([k, v]) => [k, { partie: v.i + 1, termine: v.done, parties_comprises: v.ok, parties_a_revoir: v.ko }])),
          notes_de_restitution: P.restit || {}
        };
      }
    };

    return { el, ask, start, explainItem, lesson: ch => (busy ? null : (ch ? lessonStart(ch) : reply(lessonPicker('lesson')))), get busy() { return busy; }, reset() { log.replaceChildren(); conv.topic = null; conv.pending = null; conv.lesson = null; lessonHead(); Claude.reset(); start(); } };
  }

  /* ================= Mode Claude (clé API personnelle) ================= */
  const Claude = (function () {
    const K = 'cloclo.claude';
    const MODEL = 'claude-opus-5-5';
    let messages = [];
    const cfg = () => { try { return JSON.parse(localStorage.getItem(K) || '{}'); } catch (e) { return {}; } };
    const setCfg = o => { try { localStorage.setItem(K, JSON.stringify(Object.assign(cfg(), o))); } catch (e) { } };
    const ready = () => { const c = cfg(); return !!(c.key && c.on !== false); };

    function system() {
      const plan = MATIERES.map(M => M.title + ' :\n' + M.chapters.map(c => `- ${c.id} : ch. ${c.n}, ${c.title} (${c.blurb})`).join('\n')).join('\n\n');
      return `Tu es le prof particulier de droit d'une étudiante en L3 de droit (France), qui révise pour ses partiels. Tu vis dans « le cerveau caché » de son site de révision : chaque élément de son cours y est un neurone, et les neurones que tu consultes s'allument sous ses yeux.

Ses cours :
${plan}

Comment tu travailles :
- Tu t'appuies d'abord sur SON cours : cherche avec les outils avant de répondre sur le fond (plusieurs recherches si la question a plusieurs facettes, lecture d'une fiche entière si la question est large). Cite les articles et les arrêts tels qu'ils figurent dans le cours.
- Si la question dépasse le cours, tu peux répondre avec tes connaissances de droit français, mais dis clairement ce qui est « hors de ton cours » et reste prudent sur les dates et numéros d'articles dont tu n'es pas sûr.
- Tu enseignes, tu ne récites pas : explique le raisonnement (pourquoi la règle existe, qui elle protège, comment elle s'articule avec les notions voisines), signale les pièges classiques de copie, fais des liens entre les deux matières quand ils existent.
- Tu es socratique quand c'est utile : après une explication importante, pose UNE question de vérification courte. Quand elle répond, corrige précisément (ce qui est juste, ce qui manque, ce qui est faux), puis enregistre le résultat avec l'outil enregistrer_resultat si la question portait sur un élément du cours (identifiant connu).
- Pour un cas pratique : méthode du syllogisme (qualification, problème de droit, majeure, mineure, conclusion). Ne fais pas tout à sa place si elle s'entraîne : guide-la, puis corrige.
- Pour une dissertation ou un commentaire : problématique, plan en deux parties avec des titres qui portent une idée, hors-sujet à éviter.
- Adapte-toi à son niveau : consulte sa progression (etat_eleve) quand elle demande quoi réviser, ou pour cibler une interro.
- Tutoie-la, ton chaleureux mais exigeant, comme un bon chargé de TD. Réponds en français.
- Faire cours : quand elle demande un cours (« fais-moi cours sur… »), commence par plan_du_cours, puis enseigne UNE partie par message avec lire_partie : annonce où on en est (partie 2/6), explique avec tes mots (pas de copier-coller de la fiche), donne un exemple concret ou une petite situation, signale le piège, termine par « ce qu'il faut retenir » (2-4 puces) et UNE question de vérification. Attends sa réponse. Si c'est compris, enregistrer_progression (comprise: true) et passe à la partie suivante quand elle le demande ; sinon réexplique autrement (analogie, schéma en mots, contre-exemple) et repose une question. À la fin du chapitre, fais une synthèse et propose une restitution.
- Restitution : quand elle veut te restituer un cours, lis la partie ou le chapitre concerné, laisse-la écrire sans l'aider, puis corrige point par point : ce qui est restitué, ce qui manque (avec la règle exacte), ce qui est faux, et une note sur 20 justifiée.
- Lui apprendre des choses : tu peux aller au-delà du cours (contexte historique, raison d'être d'une règle, liens avec le droit des obligations, actualité jurisprudentielle que tu connais avec certitude), en le signalant comme « pour aller plus loin », sans la noyer.
- Format : réponses denses et lisibles, sans titres Markdown. Paragraphes courts, **gras** pour les notions clés, listes à puces « - » si utile. En général moins de 250 mots, sauf cas pratique ou plan.`;
    }
    const TOOLS = [
      { name: 'chercher_cours', description: 'Recherche plein texte dans les deux cours (fiches, flashcards, articles, arrêts, définitions, pièges, épreuves type partiel). Tolère les fautes. Renvoie les passages les plus pertinents avec leur identifiant. À appeler avant de répondre sur le fond.', input_schema: { type: 'object', properties: { requete: { type: 'string', description: 'Mots-clés ou question (ex : « pacte de préférence sanction », « art. 1583 »).' }, nombre: { type: 'integer', description: 'Nombre de passages (1 à 12, défaut 6).' } }, required: ['requete'], additionalProperties: false } },
      { name: 'lire_fiche', description: 'Lit la fiche de révision complète d\'un chapitre (identifiant comme « c3 » ou « v5 »). Utile pour une question large ou un plan.', input_schema: { type: 'object', properties: { chapitre: { type: 'string', description: 'Identifiant du chapitre.' } }, required: ['chapitre'], additionalProperties: false } },
      { name: 'etat_eleve', description: 'Progression de l\'étudiante : maîtrise par chapitre, rappels en retard, notions ratées, date du partiel.', input_schema: { type: 'object', properties: {}, additionalProperties: false } },
      { name: 'question_du_cours', description: 'Tire une question d\'entraînement du cours (avec sa réponse attendue, à NE PAS montrer avant qu\'elle réponde). Sur un chapitre ou une notion, sinon parmi ce qu\'elle doit revoir.', input_schema: { type: 'object', properties: { chapitre: { type: 'string', description: 'Identifiant du chapitre (facultatif).' }, notion: { type: 'string', description: 'Notion visée (facultatif).' } }, additionalProperties: false } },
      { name: 'plan_du_cours', description: 'Plan d\'un chapitre découpé en parties de cours (index, titre), avec la progression de l\'étudiante sur chaque partie. À appeler avant de faire cours.', input_schema: { type: 'object', properties: { chapitre: { type: 'string', description: 'Identifiant du chapitre (ex : c3, v5).' } }, required: ['chapitre'], additionalProperties: false } },
      { name: 'lire_partie', description: 'Contenu complet d\'une partie de cours (texte de la fiche) et ses points clés, pour l\'enseigner ou corriger une restitution.', input_schema: { type: 'object', properties: { chapitre: { type: 'string' }, partie: { type: 'integer', description: 'Index de la partie (à partir de 0), donné par plan_du_cours.' } }, required: ['chapitre', 'partie'], additionalProperties: false } },
      { name: 'enregistrer_progression', description: 'Mémorise où elle en est dans un cours : partie atteinte et si elle est comprise (pour reprendre plus tard).', input_schema: { type: 'object', properties: { chapitre: { type: 'string' }, partie: { type: 'integer' }, comprise: { type: 'boolean' } }, required: ['chapitre', 'partie', 'comprise'], additionalProperties: false } },
      { name: 'enregistrer_resultat', description: 'Enregistre dans la répétition espacée le résultat de l\'étudiante sur un élément du cours : 2 = su, 1 = partiellement, 0 = raté.', input_schema: { type: 'object', properties: { id: { type: 'string', description: 'Identifiant de l\'élément (ex : k-c3-4).' }, resultat: { type: 'integer', enum: [0, 1, 2] } }, required: ['id', 'resultat'], additionalProperties: false } }
    ];
    TOOLS.forEach(t => { t.eager_input_streaming = true; });

    function runTool(name, input, ctx) {
      const fmt = d => ({ id: d.id, type: d.kind, chapitre: d.ch ? d.ch + ' (' + d.chap.title + ', ' + d.mat.title + ')' : d.mat.title + ' · épreuve', titre: plain(d.title), texte: plain(d.body), ref: d.ref || undefined });
      if (name === 'chercher_cours') {
        const n = Math.max(1, Math.min(12, input.nombre || 6)), r = ctx.search(String(input.requete || ''), n);
        ctx.hooks.light(r);
        return { label: 'Je cherche « ' + input.requete + ' »', docs: r, out: r.length ? r.map(fmt) : 'Aucun passage trouvé.' };
      }
      if (name === 'lire_fiche') {
        const c = ctx.chapterOf(input.chapitre), t = c && ctx.ficheText(c.id);
        if (c) ctx.hooks.focusChapter(c.id);
        return { label: c ? 'Je relis la fiche « ' + c.title + ' »' : 'Fiche introuvable', out: t || 'Pas de fiche pour cet identifiant.' };
      }
      if (name === 'etat_eleve') return { label: 'Je regarde ta progression', out: ctx.learner() };
      if (name === 'question_du_cours') {
        let pool = ctx.items.filter(i => i.ask && i.kind !== 'Cas pratique');
        if (input.chapitre) pool = pool.filter(i => i.ch === input.chapitre);
        if (input.notion) { const r = new Set(ctx.search(input.notion, 30).map(d => d.id)); const p2 = pool.filter(i => r.has(i.id)); if (p2.length) pool = p2; }
        const gr = pool.filter(i => i.gradable); const it = (gr.length ? ST.pickSmart(gr, 5) : U.shuffle(pool).slice(0, 5))[Math.floor(Math.random() * Math.min(5, pool.length))];
        if (!it) return { label: 'Je cherche une question', out: 'Aucune question disponible.' };
        ctx.hooks.light([it]);
        return { label: 'Je choisis une question', docs: [it], out: { id: it.id, type: it.kind, question: plain(it.ask), reponse_attendue: plain(it.answer), chapitre: it.ch } };
      }
      if (name === 'plan_du_cours') {
        const seqs = ctx.lessonsOf(input.chapitre), c = ctx.chapById(input.chapitre);
        if (!seqs) return { label: 'Plan introuvable', out: 'Pas de fiche pour ce chapitre.' };
        ctx.hooks.focusChapter(c.id);
        const st = (ctx.P.lessons || {})[c.id] || {};
        return { label: 'Je prépare le plan du cours « ' + c.short + ' »', out: { chapitre: c.id, titre: c.title, matiere: c.M.title, parties: seqs.map((x, i) => ({ partie: i, titre: x.title, comprise: (st.ok || []).includes(x.id) ? true : (st.ko || []).includes(x.id) ? false : null })), reprise_a_la_partie: st.done ? 0 : (st.i || 0) } };
      }
      if (name === 'lire_partie') {
        const seqs = ctx.lessonsOf(input.chapitre), x = seqs && seqs[input.partie];
        if (!x) return { label: 'Partie introuvable', out: 'Index de partie invalide.' };
        const rel = ctx.search(x.head + ' ' + keywords(x.text).join(' '), 8).filter(d => d.ch === input.chapitre && !d.passage);
        ctx.hooks.light(rel);
        return { label: 'Je relis la partie ' + (input.partie + 1) + ' / ' + seqs.length + ' : ' + x.title, docs: rel, out: { partie: input.partie, sur: seqs.length, titre: x.title, contenu: x.blocks.map(b => (['art', 'juris', 'def'].includes(b[0]) ? plain(b[1]) + ' : ' + plain(b[2]) : plain(fbText(b)))).join('\n'), points_cles: pointsOf(x).map(p => plain(p.short)), questions_du_cours: rel.filter(d => d.ask).slice(0, 4).map(d => ({ id: d.id, question: plain(d.ask), reponse: plain(d.answer) })) } };
      }
      if (name === 'enregistrer_progression') {
        const seqs = ctx.lessonsOf(input.chapitre); if (!seqs || !seqs[input.partie]) return { label: 'Progression non enregistrée', out: 'Chapitre ou partie invalide.' };
        const st = ctx.lp(input.chapitre), key = seqs[input.partie].id;
        st.i = input.partie; st.ok = st.ok.filter(k => k !== key); st.ko = st.ko.filter(k => k !== key); (input.comprise ? st.ok : st.ko).push(key);
        if (input.partie >= seqs.length - 1 && input.comprise) st.done = true;
        ctx.saveProfile(ctx.P);
        return { label: 'Je note ta progression : partie ' + (input.partie + 1) + (input.comprise ? ' comprise' : ' à revoir'), out: 'Enregistré.' };
      }
      if (name === 'enregistrer_resultat') {
        const it = ctx.items.find(i => i.id === input.id);
        if (!it) return { label: 'Résultat non enregistré', out: 'Identifiant inconnu.' };
        ctx.hooks.grade(it, input.resultat);
        return { label: 'Je note : ' + ['à revoir', 'presque', 'su'][input.resultat], docs: [it], out: it.gradable ? 'Enregistré.' : 'Élément d\'une autre matière : non enregistré, mais pris en compte.' };
      }
      return { label: name, out: 'Outil inconnu.' };
    }

    // Lecture du flux SSE de l'API Messages
    async function stream(body, on) {
      const c = cfg();
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': c.key, 'anthropic-version': '2026-10-21', 'anthropic-beta': 'server-side-fallback-2026-07-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        let m = 'erreur ' + res.status; try { const j = await res.json(); m = (j.error && j.error.message) || m; } catch (e) { }
        if (res.status === 401) m = 'clé API refusée'; else if (res.status === 429) m = 'trop de requêtes, réessaie dans un instant'; else if (res.status === 529 || res.status >= 500) m = 'serveur surchargé';
        throw new Error(m);
      }
      const reader = res.body.getReader(), dec = new TextDecoder();
      const msg = { content: [], stop_reason: null };
      let buf = '';
      for (;;) {
        const { done, value } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let k;
        while ((k = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, k); buf = buf.slice(k + 2);
          const data = chunk.split('\n').filter(l => l.startsWith('data:')).map(l => l.slice(5).trim()).join('');
          if (!data) continue;
          let ev; try { ev = JSON.parse(data); } catch (e) { continue; }
          if (ev.type === 'error') throw new Error((ev.error && ev.error.message) || 'erreur de flux');
          if (ev.type === 'content_block_start') { const b = Object.assign({}, ev.content_block); if (b.type === 'tool_use') { b._json = ''; b.input = {}; } msg.content[ev.index] = b; on('start', b); }
          else if (ev.type === 'content_block_delta') {
            const b = msg.content[ev.index], d = ev.delta; if (!b) continue;
            if (d.type === 'text_delta') { b.text = (b.text || '') + d.text; on('text', b); }
            else if (d.type === 'thinking_delta') { b.thinking = (b.thinking || '') + d.thinking; on('thinking', b); }
            else if (d.type === 'signature_delta') b.signature = d.signature;
            else if (d.type === 'input_json_delta') b._json += d.partial_json;
          }
          else if (ev.type === 'content_block_stop') { const b = msg.content[ev.index]; if (b && b.type === 'tool_use') { try { b.input = b._json ? JSON.parse(b._json) : {}; } catch (e) { b._bad = true; } } }
          else if (ev.type === 'message_delta') { if (ev.delta && ev.delta.stop_reason) msg.stop_reason = ev.delta.stop_reason; }
        }
      }
      msg.content = msg.content.filter(Boolean);
      return msg;
    }
    // Contenu à renvoyer à l'API : tel quel, sauf les blocs internes d'une tentative refusée avant un basculement
    function echo(content) {
      const clean = content.map(b => { const o = Object.assign({}, b); delete o._json; delete o._bad; return o; });
      const last = clean.map(b => b.type).lastIndexOf('fallback');
      return last < 0 ? clean : clean.filter((b, i) => i >= last || !['thinking', 'redacted_thinking', 'tool_use'].includes(b.type));
    }

    async function turn(q, ctx) {
      messages.push({ role: 'user', content: q });
      const b = ctx.bubble('prof claude', []);
      const trace = h('details', { class: 'pf-think', open: true }, h('summary', null, 'Je réfléchis…'), h('ol'));
      b.append(trace);
      const step = (t, docs) => { trace.lastChild.append(h('li', { html: md(t) })); if (docs && docs.length) ctx.hooks.light(docs); ctx.scroll(); return trace.lastChild.lastChild; };
      const seen = [];
      let nSteps = 0;
      try {
        for (let round = 0; round < 10; round++) {
          let textEl = null, thinkEl = null;
          const msg = await stream({
            model: MODEL, max_tokens: 32000, stream: true,
            system: [{ type: 'text', text: system(), cache_control: { type: 'ephemeral' } }],
            tools: TOOLS, thinking: { type: 'adaptive', display: 'summarized' },
            output_config: { effort: cfg().effort || 'medium' },
            fallbacks: 'default',
            messages
          }, (ev, blk) => {
            if (ev === 'thinking' && blk.thinking) { if (!thinkEl) { thinkEl = step(''); nSteps++; } thinkEl.innerHTML = md(blk.thinking.trim().split('\n').filter(Boolean).pop() || ''); }
            if (ev === 'start' && blk.type === 'text') { textEl = h('div', { class: 'pf-text' }); b.append(textEl); }
            if (ev === 'text' && textEl) { textEl.innerHTML = render(blk.text); ctx.scroll(); }
          });
          if (msg.stop_reason === 'refusal') { messages.pop(); b.append(h('p', null, 'Je ne peux pas répondre à cette demande. Reformule-la autrement ?')); return; }
          messages.push({ role: 'assistant', content: echo(msg.content) });
          const last = msg.content.map(x => x.type).lastIndexOf('fallback');
          const calls = msg.content.filter((x, i) => x.type === 'tool_use' && i > last);
          if (msg.stop_reason !== 'tool_use' || !calls.length) {
            if (msg.stop_reason === 'max_tokens') b.append(h('p', { class: 'pf-tip' }, 'Réponse coupée (trop longue). Demande « continue ».'));
            break;
          }
          const results = calls.map(c => {
            if (c._bad) return { type: 'tool_result', tool_use_id: c.id, content: 'INVALID_JSON : arguments illisibles, réessaie.', is_error: true };
            const r = runTool(c.name, c.input || {}, ctx); step(r.label, r.docs); nSteps++;
            (r.docs || []).forEach(d => seen.push(d));
            return { type: 'tool_result', tool_use_id: c.id, content: typeof r.out === 'string' ? r.out : JSON.stringify(r.out) };
          });
          messages.push({ role: 'user', content: results });
        }
      } catch (e) {
        // retire le tour inachevé pour garder un historique valide
        while (messages.length && !(messages[messages.length - 1].role === 'user' && typeof messages[messages.length - 1].content === 'string')) messages.pop();
        messages.pop();
        b.remove(); throw e;
      }
      trace.firstChild.textContent = nSteps ? 'Mon raisonnement (' + nSteps + ' étape' + (nSteps > 1 ? 's' : '') + ')' : 'Réponse directe';
      if (nSteps > 2 || !nSteps) trace.open = false;
      if (!nSteps) trace.remove();
      const s = ctx.srcList(seen); if (s) b.append(s);
      const txt = [...b.querySelectorAll('.pf-text')].map(x => x.textContent).join(' ');
      if (txt) ctx.hooks.say(txt.split(/(?<=[.!?])\s+/).slice(0, 2).join(' '));
      ctx.scroll();
    }
    // Markdown minimal et sûr (échappé par md)
    function render(t) {
      const lines = String(t).split('\n'); let html = '', list = null;
      const flush = () => { if (list) { html += '<' + list.t + '>' + list.items.map(x => '<li>' + md(x) + '</li>').join('') + '</' + list.t + '>'; list = null; } };
      lines.forEach(l => {
        const ul = l.match(/^\s*[-•*]\s+(.*)/), ol = l.match(/^\s*\d+[.)]\s+(.*)/);
        if (ul || ol) { const t = ul ? 'ul' : 'ol'; if (!list || list.t !== t) { flush(); list = { t, items: [] }; } list.items.push((ul || ol)[1]); return; }
        flush();
        if (/^#{1,4}\s+/.test(l)) html += '<p class="pf-h">' + md(l.replace(/^#+\s+/, '')) + '</p>';
        else if (l.trim()) html += '<p>' + md(l) + '</p>';
      });
      flush(); return html;
    }
    return { ready, cfg, setCfg, turn, reset() { messages = []; }, MODEL };
  })();

  /* ================= Réglages du mode Claude ================= */
  function settings(onClose) {
    const c = Claude.cfg();
    const key = h('input', { type: 'password', class: 'pf-key', placeholder: 'sk-ant-…', value: c.key || '', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Clé API Anthropic' });
    const on = h('input', { type: 'checkbox', checked: c.on !== false });
    const eff = h('select', { 'aria-label': 'Profondeur de réflexion' }, [['low', 'Rapide'], ['medium', 'Équilibré'], ['high', 'Approfondi']].map(([v, l]) => h('option', { value: v, selected: (c.effort || 'medium') === v }, l)));
    const msg = h('p', { class: 'pf-small' });
    return h('div', { class: 'pf-set' },
      h('p', { class: 'b-kind' }, 'Réglages du prof'),
      h('h2', null, 'Brancher un vrai cerveau'),
      h('p', { class: 'b-body' }, 'Sans rien brancher, le prof fonctionne hors ligne avec son moteur local. Avec une clé API Anthropic, il passe sur Claude (' + Claude.MODEL + ') : il fouille ton cours lui-même, raisonne, répond aux questions hors cours et corrige vraiment tes réponses.'),
      h('label', { class: 'pf-field' }, h('span', null, 'Clé API'), key),
      h('label', { class: 'pf-field row' }, on, h('span', null, 'Utiliser Claude')),
      h('label', { class: 'pf-field' }, h('span', null, 'Réflexion'), eff),
      h('div', { class: 'b-ctrl', style: { justifyContent: 'flex-start' } },
        h('button', { type: 'button', class: 'b-btn', onclick() { Claude.setCfg({ key: key.value.trim(), on: on.checked, effort: eff.value }); msg.textContent = key.value.trim() ? 'Enregistré.' : 'Clé effacée : moteur local.'; onClose && setTimeout(onClose, 500); } }, 'Enregistrer'),
        c.key ? h('button', { type: 'button', class: 'b-btn ghost', onclick() { Claude.setCfg({ key: '' }); key.value = ''; msg.textContent = 'Clé effacée.'; } }, 'Effacer la clé') : null),
      msg,
      h('p', { class: 'pf-small' }, 'La clé reste dans ce navigateur (stockage local) et n\'est envoyée qu\'à api.anthropic.com. Chaque question est facturée sur ton compte Anthropic (quelques centimes). Ne l\'enregistre pas sur un ordinateur partagé.'));
  }

  window.Prof = { create, settings, Claude, nlp: { toks, stem, refsOf, keywords, gradeText, makeIndex, concepts, intentOf } };
})();
