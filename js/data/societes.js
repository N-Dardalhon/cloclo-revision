/* Matière « Droit des sociétés » (mineure, L3 S5, cours de P. Mousseron).
   Source : les notes de cours partagées sur Google Drive (dossier L3 > S5 > MINEURES).
   La liste des chapitres, entre les marqueurs, est réécrite par tools/drive_sync.py :
   ne pas modifier ces lignes à la main, le reste du fichier peut l'être. */
window.MATIERE_SOCIETES = {
  id: 'societes', title: 'Droit des sociétés', subtitle: 'Mineure · L3', key: 'droit-des-societes.v1',
  exam: '', unit: 'société',
  states: [
    { name: 'Statuts en projet', fem: 'En projet', line: 'Simple projet : rien n\'est encore signé.' },
    { name: 'Statuts signés', fem: 'Statuts signés', line: 'Le contrat existe, il manque encore la personnalité.' },
    { name: 'Immatriculée', fem: 'Immatriculée', line: 'Immatriculée : elle a la personnalité juridique.' },
    { name: 'Cotée', fem: 'Cotée en bourse', line: 'Cotée : tu maîtrises, elle est à toi.' }
  ],
  titles: ['Simple apporteuse', 'Associée minoritaire', 'Associée égalitaire', 'Associée majoritaire', 'Gérante de SARL', 'Présidente de SAS', 'Directrice générale', 'Administratrice', 'Avocate d\'affaires', 'Conseillère à la chambre commerciale'],
  fil: {
    intro: [
      `Le droit des sociétés est la **branche du droit privé** qui étudie les **structures de certaines entreprises** : celles qui prennent la forme d'une société. Il pousse sur le tronc du **droit civil** (personnes, contrats) et plus précisément des **contrats spéciaux** : la société est d'abord un **contrat** (art. 1832), qui donne en général naissance à une **personne**.`,
      `Le cours suit une **démarche chronologique** plutôt que le plan classique droit commun / droit spécial : d'abord la **formation** de la société (qu'est-ce qu'une société, pourquoi et comment en créer une, quels risques avant l'immatriculation), puis sa **vie** (droits et devoirs des associés, pouvoirs des dirigeants).`,
      `À l'examen de mineure, ce sont surtout des **définitions** : apport, bénéfice, pertes, affectio societatis, capital, reprise des actes, abus de majorité… Les flashcards de chaque leçon sont faites pour ça.`
    ],
    keys: ['société', 'apport', 'affectio societatis', 'contribution aux pertes', 'capital social', 'immatriculation', 'écran social']
  },
  /* chapitres:debut */
  parts: [
    ['Introduction', [['La matière et ses sources', ['s0']]]],
    ['Partie 1 · La formation de la société', [['Qu\'est-ce qu\'une société ?', ['s1', 's2']], ['Pourquoi, sous quelle forme et comment ?', ['s3', 's4', 's5']], ['Avant l\'immatriculation', ['s6']]]],
    ['Partie 2 · La vie de la société', [['Les associés', ['s7', 's8']], ['Les dirigeants', ['s9']]]]
  ],
  chapters: [
    {id:'s0', n:0, part:'Introduction', title:'Introduction : la matière et ses sources', short:'Introduction', blurb:'définition, sources normatives, jurisprudence, usages, évolutions', col:'#9BB8E8', src:['(1) 07.09.2026', '(2) 08.09.2026']},
    {id:'s1', n:1, part:'Partie 1 · Leçon 1', title:'Qu\'est-ce qu\'une société ?', short:'La société', blurb:'fiction ou réalité, personne ou bien, art. 1832, société créée de fait', col:'#F2A6A0', src:['(2) 08.09.2026', '(3) 09.09.2026', '(4) 21.09.2026']},
    {id:'s2', n:2, part:'Partie 1 · Leçon 2', title:'Les structures concurrentes des sociétés', short:'Concurrentes', blurb:'association, GIE, entreprise individuelle, succursale, indivision, fiducie', col:'#F3CE72', src:['(4) 21.09.2026', '(5) 22.09.2026']},
    {id:'s3', n:3, part:'Partie 1 · Leçon 3', title:'Pourquoi créer une société ?', short:'Pourquoi', blurb:'raisons affichées, avouées et cachées : organisation, écran social, fiscalité', col:'#B9A6EB', src:['(6) 23.09.2026', '(7) 29.09.2026']},
    {id:'s4', n:4, part:'Partie 1 · Leçon 4', title:'Quelle forme sociale choisir ?', short:'Forme', blurb:'sociétés civiles, commerciales, hybrides ; facteurs et aménagements du choix', col:'#9ED08A', src:['(7) 29.09.2026', '(8) 07.10.2026']},
    {id:'s5', n:5, part:'Partie 1 · Leçon 5', title:'Comment créer une société ?', short:'Création', blurb:'statuts, mentions obligatoires, capital, annonce légale, immatriculation', col:'#8CC6EC', src:['(8) 07.10.2026', '(9) 13.10.2026']},
    {id:'s6', n:6, part:'Partie 1 · Leçon 6', title:'Les risques de la période de formation', short:'Formation', blurb:'désengagement, actes accomplis pour la société en formation, reprise, biens', col:'#F5B38A', src:['(9) 13.10.2026', '(10) 14.10.2026', '(11) 20.10.2026', '(12) 21.10.2026']},
    {id:'s7', n:7, part:'Partie 2 · Leçon 7', title:'Les droits des associés', short:'Droits', blurb:'rester associé, information, vote, abus de majorité, dividendes, retrait', col:'#E9A6D2', src:['(12) 21.10.2026', '(13) 10.11.2026', '(14) 18.11.2026']},
    {id:'s8', n:8, part:'Partie 2 · Leçon 8', title:'Les devoirs des associés', short:'Devoirs', blurb:'libération et garantie des apports, obligation aux dettes, clauses léonines', col:'#A9DCD0', src:['(15) 24.11.2026', '(16) 25.11.2026']},
    {id:'s9', n:9, part:'Partie 2 · Leçon 9', title:'Les pouvoirs des dirigeants', short:'Dirigeants', blurb:'dirigeants légaux, plénitude de pouvoirs, capacité, compétence, représentation', col:'#D8CF7E', src:['(16) 25.11.2026']}
  ]
  /* chapitres:fin */
};
