/* Noyau de données : plusieurs matières, chacune avec ses chapitres.
   Chaque fichier de chapitre appelle DATA.load('cX', {...}) ; seuls les chapitres
   de la matière choisie sont chargés. */
window.MATIERES = [
  {
    id: 'biens', title: 'Droit des biens', subtitle: 'Révisions L3', key: 'droit-des-biens.v1',
    exam: '2026-11-07', unit: 'parcelle',
    states: [
      { name: 'Détenu', fem: 'Détenue', line: 'Tu le détiens : il faut encore l\'apprivoiser.' },
      { name: 'Possédé', fem: 'Possédée', line: 'Tu le possèdes : corpus ok, il manque l\'animus.' },
      { name: 'Usucapé', fem: 'Usucapée', line: 'Presque à toi : encore un peu de temps.' },
      { name: 'Propriété', fem: 'Propriété', line: 'Propriétaire : il est à toi.' }
    ],
    titles: ['Détentrice précaire', 'Possesseure', 'Possesseure de bonne foi', 'Usucapante', 'Propriétaire', 'Propriétaire exclusive', 'Notaire', 'Magistrate', 'Conseillère à la Cour de cassation', 'Doyenne de la faculté'],
    parts: [['Partie 1 · Les relations aux biens : propriété et possession', [['Titre 1 · La propriété', ['c1', 'c2']], ['Titre 2 · La possession', ['c3', 'c4']]]], ['Partie 2 · Les modalités de relation de propriété aux biens', [['Titre 1 · La propriété individuelle', ['c5']]]]],
    chapters: [
      {id:'c1', n:1, part:'Partie 1 · Titre 1', title:'Les attributs du droit de propriété', short:'Attributs', blurb:'usus, fructus, abusus et libre transmissibilité', col:'#F2A6A0', src:'chapitre_1'},
      {id:'c2', n:2, part:'Partie 1 · Titre 1', title:'La portée du droit de propriété', short:'Portée', blurb:'dessus, dessous, eaux et accession', col:'#F3CE72', src:'chapitre_2_1'},
      {id:'c3', n:3, part:'Partie 1 · Titre 2', title:'La notion de possession', short:'Possession', blurb:'corpus, animus, vices et bonne foi', col:'#B9A6EB', src:'chapitre_1_1'},
      {id:'c4', n:4, part:'Partie 1 · Titre 2', title:'Le régime juridique de la possession', short:'Régime', blurb:'acquisition, perte et effets', col:'#9ED08A', src:'chapitre_2'},
      {id:'c5', n:5, part:'Partie 2 · Titre 1', title:"L'acquisition du droit de propriété", short:'Acquisition', blurb:'acte, occupation, usucapion et art. 2276', col:'#8CC6EC', src:'chapitre_1_2'}
    ]
  },
  {
    id: 'vente', title: 'Contrats spéciaux', subtitle: 'La vente · L3', key: 'contrats-speciaux.v1',
    exam: '', unit: 'parcelle',
    states: [
      { name: 'Pourparlers', fem: 'Pourparlers', line: 'Simples pourparlers : rien n\'est encore acquis.' },
      { name: 'Offre', fem: 'Offre', line: 'Offre lancée : il manque encore l\'acceptation.' },
      { name: 'Promesse', fem: 'Promesse', line: 'Promesse signée : il ne reste qu\'à lever l\'option.' },
      { name: 'Vente parfaite', fem: 'Vente parfaite', line: 'Accord sur la chose et le prix : c\'est à toi.' }
    ],
    titles: ['Simple pollicitante', 'Acheteuse curieuse', 'Bénéficiaire de promesse', 'Acquéreure de bonne foi', 'Venderesse avisée', 'Juriste d\'affaires', 'Notaire', 'Avocate', 'Conseillère à la Cour de cassation', 'Doyenne de la faculté'],
    parts: [
      ['Introduction · Les contrats spéciaux', [['Diversité et multiplicité', ['v1']]]],
      ['Partie 1 · L\'identification de la vente', [['Prix, chose, transfert de propriété', ['v2']]]],
      ['Partie 2 · La formation de la vente', [['Titre 1 · Les conditions de fond', ['v3', 'v4', 'v5']], ['Titre 2 · Les conditions de forme', ['v6']]]],
      ['Partie 3 · Les effets de la vente', [['Titre 1 · Les effets réels', ['v7', 'v8']], ['Titre 2 · Les effets personnels', ['v9']]]]
    ],
    chapters: [
      {id:'v1', n:1, part:'Introduction', title:'Les contrats spéciaux : diversité et qualification', short:'Introduction', blurb:'contrats nommés, innomés, qualification et droits spéciaux', col:'#F2A6A0'},
      {id:'v2', n:2, part:'Partie 1', title:"L'identification de la vente", short:'Identification', blurb:'prix, chose, transfert : la vente face aux contrats voisins', col:'#F3CE72'},
      {id:'v3', n:3, part:'Partie 2 · Titre 1 · Chap. 1', title:'Le consentement', short:'Consentement', blurb:'liberté, aptitude, information, promesses et pactes', col:'#B9A6EB'},
      {id:'v4', n:4, part:'Partie 2 · Titre 1 · Chap. 2', title:'La chose', short:'La chose', blurb:'existante, dans le commerce et déterminable', col:'#9ED08A'},
      {id:'v5', n:5, part:'Partie 2 · Titre 1 · Chap. 3', title:'Le prix', short:'Le prix', blurb:'réel, sérieux, déterminé ; lésion et contrat cadre', col:'#8CC6EC'},
      {id:'v6', n:6, part:'Partie 2 · Titre 2', title:'Les conditions de forme', short:'Formes', blurb:'solennelles, informatives, publicitaires, probatoires', col:'#F5B38A'},
      {id:'v7', n:7, part:'Partie 3 · Titre 1 · Chap. 1', title:'Le transfert de propriété', short:'Propriété', blurb:'solo consensu, tiers, réserve de propriété', col:'#E9A6D2'},
      {id:'v8', n:8, part:'Partie 3 · Titre 1 · Chap. 2', title:'Le transfert des risques', short:'Risques', blurb:'res perit domino, res perit debitori', col:'#A9DCD0'},
      {id:'v9', n:9, part:'Partie 3 · Titre 2 · Chap. 1', title:'Les obligations du vendeur', short:'Vendeur', blurb:'délivrance conforme et garantie d\'éviction', col:'#D8CF7E'}
    ]
  }
];
(function () {
  let id = 'biens';
  try { id = localStorage.getItem('cloclo.matiere') || 'biens'; } catch (e) { }
  const M = MATIERES.find(m => m.id === id) || MATIERES[0];
  window.SITE = {
    matiere: M.id, title: M.title, subtitle: M.subtitle, key: M.key, states: M.states, titles: M.titles, parts: M.parts,
    // Prénom : saute l'écran d'accueil
    name: "Clothilde",
    // Date du partiel préremplie (AAAA-MM-JJ), modifiable dans Progrès
    exam: M.exam,
    switchTo(mid) { try { localStorage.setItem('cloclo.matiere', mid); } catch (e) { } location.hash = '#/'; location.reload(); }
  };
  window.DATA = {
    chapters: M.chapters,
    fiche:{}, cards:[], qcm:[], vf:[], cas:[], arts:[], gloss:[], juris:[], coursq:[], nums:[], trees:[],
    load(ch, o){
      const D=this;
      if(!D.chapters.some(c => c.id === ch)) return; // chapitre d'une autre matière
      if(o.fiche) D.fiche[ch]=o.fiche;
      (o.cards||[]).forEach((x,i)=>D.cards.push({id:`k-${ch}-${i}`,ch,q:x[0],a:x[1],ref:x[2]||''}));
      (o.qcm||[]).forEach((x,i)=>D.qcm.push({id:`q-${ch}-${i}`,ch,q:x[0],good:x[1],bad:x[2],exp:x[3]||'',ref:x[4]||''}));
      (o.vf||[]).forEach((x,i)=>D.vf.push({id:`v-${ch}-${i}`,ch,s:x[0],v:x[1],exp:x[2]||''}));
      (o.cas||[]).forEach((x,i)=>D.cas.push(Object.assign({id:`cas-${ch}-${i}`,ch},x)));
      (o.arts||[]).forEach((x,i)=>D.arts.push({id:`a-${ch}-${i}`,ch,ref:x[0],text:x[1]}));
      (o.gloss||[]).forEach((x,i)=>D.gloss.push({id:`g-${ch}-${i}`,ch,term:x[0],def:x[1],ref:x[2]||''}));
      (o.juris||[]).forEach((x,i)=>D.juris.push({id:`j-${ch}-${i}`,ch,label:x[0],theme:x[1],sol:x[2],keep:x[3]||''}));
      (o.coursq||[]).forEach((x,i)=>D.coursq.push({id:`cq-${ch}-${i}`,ch,q:x[0],points:x[1],model:x[2]}));
      (o.nums||[]).forEach((x,i)=>D.nums.push({id:`n-${ch}-${i}`,ch,n:x[0],t:x[1],ref:x[2]||''}));
    }
  };
})();
