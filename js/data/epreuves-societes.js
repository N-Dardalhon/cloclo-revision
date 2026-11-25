/* Épreuves type partiel : droit des sociétés (mineure L3). Même format que epreuves-biens.js.
   En mineure, l'examen porte surtout sur des définitions : d'où beaucoup de questions de cours.
   Tout le contenu vient des notes de cours (P. Mousseron), rien n'est inventé. */
window.EPREUVES = window.EPREUVES || {};
EPREUVES.societes = {
sujets: [

/* ---------------------------------------------------------------- QUESTIONS DE COURS */
{
  id: 'so-q-societe', type: 'q', niveau: 'cours', theme: 'Notion de société', duree: '20 min',
  sujet: `Définissez la société.`,
  kit: [
    `**Art. 1832 al. 1** : « La société est instituée par deux ou plusieurs personnes qui conviennent par un **contrat** d'affecter à une **entreprise commune** des **biens ou leur industrie** en vue de **partager le bénéfice** ou de **profiter de l'économie** qui pourra en résulter. »`,
    `**Al. 3** : les associés s'engagent à **contribuer aux pertes**.`,
    `**Éléments constitutifs** : des **apports**, la vocation au **bénéfice ou à l'économie**, la **contribution aux pertes**, et l'**affectio societatis** (volonté de collaborer activement et de manière égalitaire).`,
    `**Nature** : un **contrat** qui donne en général naissance à une **personne** (à l'immatriculation) ; exception : la **société en participation**, sans personnalité.`
  ],
  lecture: [
    { q: `Qu'attend-on d'abord dans la réponse ?`, opts: [
      `La définition de l'art. 1832, puis ses éléments constitutifs expliqués un par un`,
      `L'histoire des sociétés depuis Rome`,
      `La liste de toutes les formes sociales`,
      `Les règles de l'immatriculation`],
      ans: 0, exp: `Une question « Définissez » appelle **la définition légale** citée, puis chacun de ses éléments. En mineure, c'est exactement ce qui est noté.` }
  ],
  defs: [`**Société** (art. 1832)`, `**Apport**`, `**Bénéfice**`, `**Pertes**`, `**Affectio societatis**`],
  problematique: `Montrer que la société est un contrat aux éléments précis, qui donne en général naissance à une personne.`,
  plan: [
    [`Réponse structurée`, [
      `1. La définition de l'art. 1832 (contrat, au moins deux personnes, entreprise commune)`,
      `2. Les éléments constitutifs : apports, bénéfice ou économie, contribution aux pertes, affectio societatis`,
      `3. La nature : contrat et, à l'immatriculation, personne morale (sauf société en participation)`]]
  ],
  hs: [`Parler seulement des formes sociales (SAS, SARL…) sans définir la société.`],
  points: [`J'ai cité l'art. 1832`, `J'ai défini l'apport`, `J'ai défini le bénéfice et l'économie`, `J'ai parlé de la contribution aux pertes`, `J'ai défini l'affectio societatis`, `J'ai évoqué la personnalité morale`]
},
{
  id: 'so-q-association', type: 'q', niveau: 'cours', theme: 'Structures concurrentes', duree: '20 min',
  sujet: `Distinguez la société et l'association.`,
  kit: [
    `**Société (art. 1832)** : mise en commun de biens ou d'industrie **en vue de partager le bénéfice** ou de profiter de l'économie.`,
    `**Association (art. 1er, loi du 1er juillet 1901)** : convention par laquelle deux ou plusieurs personnes mettent en commun, de façon **permanente**, leurs connaissances ou leur activité **dans un but autre que de partager des bénéfices**.`,
    `**Critère** : le **partage des bénéfices**. L'association peut faire des bénéfices, mais ne peut pas les **distribuer** à ses membres.`
  ],
  lecture: [
    { q: `Une association peut-elle réaliser des bénéfices ?`, opts: [
      `Oui, mais elle ne peut pas les partager entre ses membres`,
      `Non, jamais`,
      `Oui, et elle les distribue comme une société`,
      `Seulement si elle est reconnue d'utilité publique`],
      ans: 0, exp: `Le critère n'est pas l'existence de bénéfices mais leur **partage** : c'est ce qui sépare l'association de la société.` }
  ],
  defs: [`**Société** (art. 1832)`, `**Association** (loi de 1901)`],
  problematique: `Une distinction fondée sur un critère unique : le but de partager les bénéfices.`,
  plan: [
    [`Réponse structurée`, [
      `1. Les deux définitions (art. 1832 ; art. 1er loi 1901)`,
      `2. Le critère : le partage des bénéfices`,
      `3. Les points communs : deux personnes au moins, une mise en commun, un contrat`]]
  ],
  hs: [`Dire que l'association ne peut pas gagner d'argent.`],
  points: [`J'ai cité l'art. 1832`, `J'ai cité la loi de 1901`, `J'ai dégagé le critère du partage des bénéfices`, `J'ai précisé que l'association peut faire des bénéfices sans les distribuer`]
},
{
  id: 'so-q-capital', type: 'q', niveau: 'cours', theme: 'Création', duree: '20 min',
  sujet: `Qu'est-ce que le capital social ?`,
  kit: [
    `**Définition** : la somme des **apports en nature et en numéraire**. Les **apports en industrie** n'y entrent pas (trop difficiles à évaluer).`,
    `**Utilité pratique** : l'argent est utilisable dès l'immatriculation, mais le capital reste inscrit au **passif** pour son **montant initial** (dette de remboursement envers les associés).`,
    `**Utilité juridique** : il fixe la répartition des parts, donc des **droits de vote** et des **droits aux dividendes** ; il peut être augmenté ou réduit.`,
    `**Mention obligatoire des statuts** (art. 1835).`
  ],
  lecture: [
    { q: `Quel piège éviter ?`, opts: [
      `Croire que le capital est une somme mise de côté et conservée par la société`,
      `Croire que le capital figure dans les statuts`,
      `Croire que le capital comprend les apports en numéraire`,
      `Croire que le capital peut être augmenté`],
      ans: 0, exp: `Le capital est **dépensé** ; seule son inscription au passif reste, pour son montant initial.` }
  ],
  defs: [`**Capital social**`, `**Apport en nature**`, `**Apport en numéraire**`, `**Apport en industrie**`],
  problematique: `Une notion comptable qui a surtout une utilité juridique : répartir le pouvoir et les bénéfices.`,
  plan: [
    [`Réponse structurée`, [
      `1. Définition : apports en nature et en numéraire, sans l'industrie`,
      `2. Utilité pratique : financer les débuts, inscription au passif`,
      `3. Utilité juridique : droits de vote et dividendes ; variations du capital`]]
  ],
  hs: [`Confondre capital et capitaux propres.`],
  points: [`J'ai défini le capital`, `J'ai exclu les apports en industrie et dit pourquoi`, `J'ai expliqué l'inscription au passif`, `J'ai parlé des droits de vote et des dividendes`]
},
{
  id: 'so-q-objet', type: 'q', niveau: 'cours', theme: 'Création', duree: '20 min',
  sujet: `L'objet social.`,
  kit: [
    `**Définition** : ce que la société **peut faire selon ses statuts**, à distinguer de son **activité** (ce qu'elle fait réellement). Mention obligatoire (art. 1835).`,
    `**SARL, SA, SAS** : l'objet n'est **pas une limite absolue**. L'acte du dirigeant qui le dépasse est **valable**, mais le dirigeant commet une **faute**.`,
    `**Art. L223-18 al. 5 C. com.** (SARL) : la société est engagée même par les actes hors objet, sauf à prouver que le tiers **savait** ou **ne pouvait l'ignorer** ; la seule **publication des statuts** ne suffit pas.`,
    `**Société civile** : l'objet est une **limite absolue**, l'acte qui le dépasse est **annulable**.`
  ],
  lecture: [
    { q: `Quelle distinction structure la réponse ?`, opts: [
      `Sociétés à responsabilité limitée (acte valable) / sociétés à responsabilité illimitée (acte annulable)`,
      `Sociétés cotées / non cotées`,
      `Objet civil / objet commercial`,
      `Grandes / petites sociétés`],
      ans: 0, exp: `La portée de l'objet social dépend de la forme : limite relative dans les SARL, SA, SAS ; limite absolue dans la société civile.` }
  ],
  defs: [`**Objet social**`, `**Activité**`],
  problematique: `L'objet social limite-t-il vraiment ce que peut faire la société ?`,
  plan: [
    [`Réponse structurée`, [
      `1. Définition, distinction avec l'activité, mention obligatoire (art. 1835)`,
      `2. Une limite relative dans les SARL, SA, SAS (art. L223-18)`,
      `3. Une limite absolue dans la société civile`]]
  ],
  hs: [`Ne parler que de l'activité réelle de la société.`],
  points: [`J'ai défini l'objet social`, `Je l'ai distingué de l'activité`, `J'ai cité l'art. L223-18`, `J'ai traité la société civile à part`]
},
{
  id: 'so-q-abus', type: 'q', niveau: 'cours', theme: 'Droits des associés', duree: '30 min',
  sujet: `Distinguez l'abus de majorité et l'abus de minorité.`,
  kit: [
    `**Abus de majorité** : vote **contraire à l'intérêt social**, dans l'**intérêt propre** du majoritaire, **au détriment des minoritaires** (ex : nommer son fils gérant). Sanctions : **dommages-intérêts** et **nullité** de la résolution.`,
    `**Abus de minorité** : vote **contraire à l'intérêt social** qui **met en péril la pérennité** de la société. Sanctions : dommages-intérêts et désignation d'un **mandataire** qui vote à la place du minoritaire (pas de nullité : la résolution n'a pas été adoptée).`,
    `**Abus d'égalité** (associés à 50/50) : même régime que l'abus de minorité.`,
    `**Limite** : certains droits sont discrétionnaires (droit d'**agrément**), sauf usage discriminatoire.`
  ],
  lecture: [
    { q: `Pourquoi l'abus de minorité n'entraîne-t-il pas la nullité ?`, opts: [
      `Parce que la résolution bloquée n'a jamais été adoptée : il n'y a rien à annuler`,
      `Parce que les minoritaires sont protégés par la loi`,
      `Parce que la nullité est réservée aux sociétés cotées`,
      `Parce que l'abus de minorité n'est pas sanctionné`],
      ans: 0, exp: `D'où la solution originale du juge : un **mandataire** vote à la place du minoritaire abusif.` }
  ],
  defs: [`**Abus de majorité**`, `**Abus de minorité**`, `**Abus d'égalité**`, `**Intérêt social**`],
  problematique: `Deux abus du droit de vote, aux conditions et aux sanctions différentes.`,
  plan: [
    [`Réponse structurée`, [
      `1. Le point commun : un vote contraire à l'intérêt social`,
      `2. L'abus de majorité : conditions, nullité et dommages-intérêts`,
      `3. L'abus de minorité (et d'égalité) : péril pour la société, mandataire et dommages-intérêts`]]
  ],
  hs: [`Exposer seulement le droit de vote en général.`],
  points: [`J'ai défini l'abus de majorité avec ses 3 éléments`, `J'ai défini l'abus de minorité`, `J'ai donné les sanctions de chacun`, `J'ai parlé de l'abus d'égalité`, `J'ai expliqué pourquoi pas de nullité pour la minorité`]
},
{
  id: 'so-q-leonine', type: 'q', niveau: 'cours', theme: 'Devoirs des associés', duree: '20 min',
  sujet: `La clause léonine.`,
  kit: [
    `**Art. 1844-1 al. 2** : sont **réputées non écrites** la stipulation attribuant à un associé la **totalité du profit** ou l'exonérant de la **totalité des pertes**, et celle excluant un associé **totalement du profit** ou mettant à sa charge la **totalité des pertes**.`,
    `**Fondement** : la société suppose de partager le bénéfice et de contribuer aux pertes (art. 1832).`,
    `**Sanction** : la clause seule disparaît, la société subsiste.`
  ],
  lecture: [
    { q: `Une clause qui avantage un associé dans le partage des bénéfices est-elle léonine ?`, opts: [
      `Non : seules sont visées les clauses « tout ou rien » (tout le profit, toutes les pertes, exclusion totale)`,
      `Oui, toute inégalité est interdite`,
      `Oui, si elle est votée à la majorité`,
      `Non, seulement si elle concerne les pertes`],
      ans: 0, exp: `L'art. 1844-1 al. 2 vise la **totalité** : un partage inégal (dividende préciputaire, majoré) reste possible.` }
  ],
  defs: [`**Clause léonine** (art. 1844-1 al. 2)`, `**Réputé non écrit**`],
  problematique: `Une limite d'ordre public à la liberté statutaire, tirée de la définition même de la société.`,
  plan: [
    [`Réponse structurée`, [
      `1. Définition : les quatre clauses visées par l'art. 1844-1 al. 2`,
      `2. Fondement : partage du bénéfice et contribution aux pertes (art. 1832)`,
      `3. Sanction : réputée non écrite ; les clauses seulement inégalitaires restent valables`]]
  ],
  hs: [`Parler de toutes les clauses des statuts.`],
  points: [`J'ai cité l'art. 1844-1`, `J'ai énuméré les clauses visées`, `J'ai donné la sanction (réputée non écrite)`, `J'ai rattaché la règle à l'art. 1832`]
},
{
  id: 'so-q-retrait', type: 'q', niveau: 'cours', theme: 'Droits des associés', duree: '20 min',
  sujet: `Le droit de retrait de l'associé.`,
  kit: [
    `**Définition** : prérogative d'obtenir le **remboursement de ses titres par la société**, utile quand on ne trouve pas d'acheteur.`,
    `**Art. 1869** (société civile) : retrait dans les conditions des **statuts**, à défaut avec l'accord **unanime** des autres associés, ou pour **justes motifs** par décision de justice.`,
    `**Remboursement** : la **valeur des droits sociaux** (pas des apports), à défaut d'accord fixée par **expert** (art. 1843-4).`,
    `**Perte de la qualité d'associé** : date prévue par les statuts, à défaut au jour du **remboursement** (jurisprudence critiquée).`
  ],
  lecture: [
    { q: `Retrait ou cession : quelle différence ?`, opts: [
      `Dans la cession, un acheteur rachète les titres ; dans le retrait, c'est la société qui rembourse`,
      `Aucune différence`,
      `Le retrait est réservé aux SAS`,
      `La cession est interdite dans la société civile`],
      ans: 0, exp: `Le retrait évite de chercher un acheteur, mais il coûte à la société : d'où ses conditions.` }
  ],
  defs: [`**Droit de retrait** (art. 1869)`, `**Cession**`],
  problematique: `Une porte de sortie légale dans la société civile, encadrée pour protéger la société.`,
  plan: [
    [`Réponse structurée`, [
      `1. Définition et intérêt (comparaison avec la cession)`,
      `2. Conditions (art. 1869) : statuts, unanimité, justes motifs`,
      `3. Effets : remboursement de la valeur des droits, perte de la qualité d'associé`]]
  ],
  hs: [`Ne parler que de la cession de titres.`],
  points: [`J'ai défini le retrait`, `J'ai cité l'art. 1869`, `J'ai donné les trois voies (statuts, unanimité, justes motifs)`, `J'ai dit ce qui est remboursé`, `J'ai traité la date de perte de la qualité d'associé`]
},
{
  id: 'so-q-pouvoir', type: 'q', niveau: 'cours', theme: 'Dirigeants', duree: '20 min',
  sujet: `Distinguez capacité, pouvoir et compétence.`,
  kit: [
    `**Capacité** : l'aptitude à **agir**. Les dirigeants doivent être capables (pas de mineur, de majeur protégé ni de personne interdite). Pour la personne morale, **art. 1145 al. 2** : capacité limitée par les **règles applicables à chacune**.`,
    `**Pouvoir** : « l'**aptitude à exercer les droits d'autrui** » (Capitant). Pour un dirigeant : exercer les droits de la société. C'est un pan de la capacité.`,
    `**Compétence** : l'aptitude d'un **organe** à adopter une mesure (ex : l'**assemblée** désigne le président de SAS).`
  ],
  lecture: [
    { q: `Comment ordonner les trois notions ?`, opts: [
      `De la plus large (capacité) à la plus précise (compétence d'un organe), en passant par le pouvoir`,
      `Par ordre alphabétique`,
      `Selon les formes sociales`,
      `Par date de création des notions`],
      ans: 0, exp: `La capacité vise la personne, le pouvoir le fait d'agir pour autrui, la compétence la répartition entre organes.` }
  ],
  defs: [`**Capacité**`, `**Pouvoir**`, `**Compétence**`],
  problematique: `Trois aptitudes emboîtées qui encadrent l'action des dirigeants.`,
  plan: [
    [`Réponse structurée`, [
      `1. Capacité : personne physique et personne morale (art. 1145)`,
      `2. Pouvoir : définition de Capitant, plénitude des pouvoirs des dirigeants (art. L223-18)`,
      `3. Compétence : organes, exemple du président de SAS`]]
  ],
  hs: [`Ne traiter que la représentation.`],
  points: [`J'ai défini la capacité`, `J'ai cité la définition du pouvoir de Capitant`, `J'ai défini la compétence`, `J'ai donné un exemple pour chacune`]
},

/* ---------------------------------------------------------------- CAS PRATIQUES */
{
  id: 'so-cas-formation', type: 'cas', niveau: 'cours', theme: 'Période de formation', duree: '1 h',
  sujet: `Cas pratique : le bail de la future SAS de Léa`,
  doc: `Léa et Hugo veulent créer une **SAS** de vente de vélos. Le 2 février, avant toute immatriculation, Léa signe seule un **bail commercial** « pour le compte de la société Vélo Vert, en cours de formation ». Les statuts sont signés le 15 février ; l'acte de bail **n'y est pas annexé** et aucun mandat n'avait été donné à Léa.\n\nLa société est immatriculée le 10 mars. Le 1er avril, le bailleur réclame les loyers impayés de février et mars. Hugo dit que « ce n'est pas son problème », Léa pense que « c'est la société qui doit payer ».\n\nQui doit payer ? Que conseillez-vous ?`,
  kit: [
    `**Art. L210-6 al. 2 C. com.** (sociétés commerciales) : les personnes qui ont agi au nom d'une société en formation sont tenues **solidairement et indéfiniment** des actes accomplis, sauf **reprise** par la société immatriculée.`,
    `**Reprise** (art. **R210-6 C. com.**) : mandat préalable, acte annexé aux statuts, ou **délibération** des associés après l'immatriculation. Effet : l'acte est **réputé souscrit dès l'origine** par la société, ceux qui ont agi sont **libérés**.`,
    `**Personnes qui ont agi** : les signataires, et ceux qui ont pris des initiatives.`,
    `**Com., 29 nov. 2023** : le juge apprécie souverainement, au vu des circonstances **intrinsèques et extrinsèques**, si les parties voulaient conclure l'acte **au nom et pour le compte** de la société en formation.`,
    `**Cession de contrat** : refusée par la jurisprudence pour remplacer la reprise.`
  ],
  lecture: [
    { q: `Quel est le point de départ du raisonnement ?`, opts: [
      `La société n'avait pas la personnalité juridique le 2 février : l'acte relève du régime des actes de la société en formation`,
      `Le bail est nul car signé par une seule personne`,
      `Le bailleur n'a aucun recours`,
      `Hugo est automatiquement tenu car il est associé`],
      ans: 0, exp: `La personnalité naît à l'**immatriculation** (10 mars). Avant, on applique l'art. L210-6 (société commerciale).` },
    { q: `Quelle modalité de reprise reste possible ici ?`, opts: [
      `Une délibération des associés après l'immatriculation`,
      `Le mandat préalable`,
      `L'annexe aux statuts`,
      `Aucune`],
      ans: 0, exp: `Pas de mandat, pas d'annexe : il reste la **délibération** (R210-6). Conseil : la faire voter vite.` }
  ],
  defs: [`**Période de formation**`, `**Reprise des actes**`, `**Personnes qui ont agi**`],
  problematique: `Qui est tenu d'un acte conclu au nom d'une société commerciale avant son immatriculation, et comment la société peut-elle le reprendre ?`,
  plan: [
    [`Le principe : Léa est tenue`, [
      `Qualification : acte de la période de formation (pas de personnalité avant le 10 mars)`,
      `Art. L210-6 al. 2 : Léa, qui a agi, est tenue solidairement et indéfiniment ; Hugo n'a pas agi`]],
    [`La solution : la reprise par la société`, [
      `Mandat et annexe absents ; reste la délibération après immatriculation (R210-6)`,
      `Effet : acte réputé conclu par la société dès l'origine, Léa libérée`,
      `À défaut : Com. 29 nov. 2023 (commune intention d'agir pour la société en formation) ; cession de contrat refusée`]]
  ],
  hs: [`Dire que la société doit payer automatiquement.`, `Oublier que la société est commerciale (solidarité).`],
  points: [`J'ai daté la personnalité juridique à l'immatriculation`, `J'ai cité l'art. L210-6`, `J'ai identifié qui « a agi »`, `J'ai donné les trois modalités de reprise`, `J'ai dit ce que produit la reprise`, `J'ai cité Com. 29 nov. 2023`, `J'ai donné un conseil pratique`]
},
{
  id: 'so-cas-dettes', type: 'cas', niveau: 'cours', theme: 'Devoirs des associés', duree: '45 min',
  sujet: `Cas pratique : les créanciers de la société civile`,
  doc: `Une **société civile** a trois associés : Anne (50 % du capital), Bruno (30 %) et Chloé (20 %). Elle doit 100 000 € à un fournisseur, qui a seulement envoyé une **mise en demeure** à la société, restée sans réponse.\n\nLe fournisseur veut réclamer les 100 000 € à Anne, « la plus solvable ».\n\nLe peut-il ? Et si la société était une **SNC** ?`,
  kit: [
    `**Art. 1858 C. civ.** (société civile) : les créanciers ne peuvent poursuivre les associés qu'après avoir **préalablement et vainement poursuivi** la société.`,
    `**Vaines poursuites** : une décision de justice **définitive** contre la société restée **inexécutée** ; une mise en demeure ne suffit pas.`,
    `**Société civile** : associés tenus **conjointement**, à proportion de leur part au capital à la date d'**exigibilité**.`,
    `**SNC (art. L221-1 C. com.)** : associés tenus **indéfiniment et solidairement** ; poursuite possible après une simple **mise en demeure** de la société.`
  ],
  lecture: [
    { q: `La mise en demeure suffit-elle pour poursuivre Anne ?`, opts: [
      `Non dans une société civile (il faut de vaines poursuites) ; oui dans une SNC`,
      `Oui dans tous les cas`,
      `Non dans tous les cas`,
      `Oui dans une société civile, non dans une SNC`],
      ans: 0, exp: `C'est la différence centrale entre l'art. 1858 et l'art. L221-1.` }
  ],
  defs: [`**Obligation aux dettes**`, `**Vaines poursuites**`, `**Solidarité**`],
  problematique: `À quelles conditions et pour quelle part un associé répond-il des dettes sociales ?`,
  plan: [
    [`Dans la société civile`, [
      `Subsidiarité : vaines poursuites (art. 1858), la mise en demeure ne suffit pas`,
      `Conjointement : Anne ne doit que 50 000 € (50 %)`]],
    [`Si la société était une SNC`, [
      `Mise en demeure suffisante (L221-1)`,
      `Solidarité : le fournisseur peut réclamer les 100 000 € à Anne, qui se retournera contre les autres`]]
  ],
  hs: [`Oublier l'écran social et dire que l'associé paie toujours.`],
  points: [`J'ai cité l'art. 1858`, `J'ai défini les vaines poursuites`, `J'ai calculé la part d'Anne (50 000 €)`, `J'ai cité l'art. L221-1`, `J'ai expliqué la solidarité en SNC`]
},
{
  id: 'so-cas-abus', type: 'cas', niveau: 'cours', theme: 'Droits des associés', duree: '45 min',
  sujet: `Cas pratique : l'assemblée de la SARL Pâtes Fraîches`,
  doc: `Marc détient 70 % des parts de la SARL Pâtes Fraîches ; Inès et Paul se partagent les 30 % restants. Lors de l'assemblée, Marc fait voter la mise en **réserve** de tous les bénéfices pour la cinquième année de suite et la **nomination de son fils**, sans expérience, comme cogérant rémunéré.\n\nL'année suivante, une **augmentation de capital** indispensable pour éviter la cessation des paiements est bloquée par Inès et Paul, qui veulent « faire payer » Marc.\n\nAnalysez ces votes.`,
  kit: [
    `**Abus de majorité** : contraire à l'**intérêt social**, dans l'**intérêt propre** du majoritaire, **au détriment des minoritaires** ; sanctions : **nullité** et **dommages-intérêts**.`,
    `**Abus de minorité** : contraire à l'intérêt social et mettant en **péril la pérennité** de la société ; sanctions : dommages-intérêts, **mandataire** désigné pour voter.`,
    `**Dividende** : la distribution suppose une **décision** majoritaire ; les associés peuvent préférer la mise en réserve.`
  ],
  lecture: [
    { q: `La mise en réserve des bénéfices est-elle abusive en soi ?`, opts: [
      `Non : l'assemblée peut préférer la réserve ; il faut prouver l'intérêt propre du majoritaire contre l'intérêt social et les minoritaires`,
      `Oui, toujours`,
      `Oui, au-delà de deux ans`,
      `Non, jamais`],
      ans: 0, exp: `Il faut caractériser les trois éléments de l'abus de majorité, au vu des circonstances (répétition, avantage de Marc…).` }
  ],
  defs: [`**Abus de majorité**`, `**Abus de minorité**`, `**Intérêt social**`, `**Dividende**`],
  problematique: `Le vote majoritaire ou minoritaire peut-il être sanctionné, et comment ?`,
  plan: [
    [`Les votes de Marc : abus de majorité ?`, [
      `Nomination du fils : intérêt propre, contraire à l'intérêt social, détriment des minoritaires (exemple du cours)`,
      `Mise en réserve répétée : à prouver selon les circonstances`,
      `Sanctions : nullité des résolutions, dommages-intérêts`]],
    [`Le vote d'Inès et Paul : abus de minorité`, [
      `Contraire à l'intérêt social, péril pour la pérennité (cessation des paiements)`,
      `Sanctions : dommages-intérêts, mandataire votant à leur place`]]
  ],
  hs: [`Ne traiter qu'un des deux abus.`],
  points: [`J'ai donné les 3 conditions de l'abus de majorité`, `J'ai appliqué au fils nommé gérant`, `J'ai nuancé la mise en réserve`, `J'ai caractérisé l'abus de minorité`, `J'ai donné les sanctions de chacun`]
},

/* ---------------------------------------------------------------- DISSERTATIONS */
{
  id: 'so-diss-formation', type: 'diss', niveau: 'cours', theme: 'Période de formation', duree: '3 h',
  sujet: `Les risques de la période de formation des sociétés`,
  kit: [
    `**Période de formation** : de la **première évocation** de la société auprès des tiers à son **immatriculation** (souvent 1 à 2 mois).`,
    `**Désengagement** : contrat de société ou **promesse de société** (accord sur tous les éléments essentiels ; affaire Isabelle Adjani) ; clause d'**exclusivité**, **break-up fee** ; rupture fautive des négociations (responsabilité extracontractuelle).`,
    `**Actes** : art. **1843** et **L210-6** (ceux qui ont agi sont tenus, solidairement si la société est commerciale) ; **reprise** (R210-6) ; clauses ; **Com. 29 nov. 2023**.`,
    `**Biens** : récupération des fonds par action en justice (L223-8, L225-14) ; **art. 1872 al. 1** (l'associé reste propriétaire à l'égard des tiers) ; **art. 1843-1** (publicité anticipée, effet rétroactif).`
  ],
  lecture: [
    { q: `Quelle est la clé du sujet ?`, opts: [
      `Avant l'immatriculation, la société n'a pas la personnalité juridique : tous les risques en découlent`,
      `La société est déjà une personne dès la signature des statuts`,
      `Le sujet porte sur la dissolution`,
      `Le sujet porte sur les formes sociales`],
      ans: 0, exp: `L'absence de personnalité explique les trois risques : désengagement, actes, biens.` }
  ],
  defs: [`**Période de formation**`, `**Promesse de société**`, `**Reprise des actes**`],
  problematique: `Comment le droit protège-t-il fondateurs et tiers pendant que la société n'a pas encore la personnalité juridique ?`,
  plan: [
    [`I. Les risques entre futurs associés`, [
      `A. Le désengagement : contrat ou promesse de société, protocoles d'accord`,
      `B. La rupture des négociations : licite mais parfois fautive`]],
    [`II. Les risques à l'égard des tiers`, [
      `A. Les actes : principe (art. 1843, L210-6) et reprise (R210-6, Com. 29 nov. 2023)`,
      `B. Les biens : sommes apportées, propriété (art. 1872, 1843-1)`]]
  ],
  hs: [`Exposer la création de société (statuts, annonce, immatriculation) sans parler des risques.`],
  points: [`J'ai défini la période de formation`, `J'ai traité la promesse de société`, `J'ai cité les art. 1843 et L210-6`, `J'ai expliqué la reprise`, `J'ai cité Com. 29 nov. 2023`, `J'ai traité les biens (1872, 1843-1)`]
},
{
  id: 'so-diss-ecran', type: 'diss', niveau: 'cours', theme: 'Pourquoi créer une société', duree: '3 h',
  sujet: `L'écran social`,
  kit: [
    `**Écran social** : la société s'**interpose** entre l'associé et les créanciers de l'activité ; on ne paie pas les dettes d'autrui.`,
    `**Raison de créer une société** : séparer les patrimoines, cloisonner les risques (single ship company).`,
    `**Limites** : **obligation aux dettes** en société civile (art. 1858, après vaines poursuites, conjointement) et en SNC (L221-1, solidairement) ; **action en comblement de passif** en cas de faute ; **contribution aux pertes** illimitée dans les sociétés à responsabilité illimitée.`
  ],
  lecture: [
    { q: `Que signifie « écran » dans ce sujet ?`, opts: [
      `La séparation entre le patrimoine de la société et celui des associés face aux créanciers`,
      `L'écran d'ordinateur des dirigeants`,
      `La confidentialité des pactes d'associés`,
      `La publicité au registre`],
      ans: 0, exp: `L'écran protège l'associé des créanciers sociaux, mais il est plus ou moins solide selon la forme.` }
  ],
  defs: [`**Écran social**`, `**Obligation aux dettes**`, `**Contribution aux pertes**`],
  problematique: `L'écran social est-il une protection absolue de l'associé ?`,
  plan: [
    [`I. Un écran recherché`, [
      `A. Le principe : la société paie ses dettes`,
      `B. Un motif de création de société (cloisonnement des risques)`]],
    [`II. Un écran percé`, [
      `A. Par la forme sociale : obligation aux dettes (SC, SNC)`,
      `B. Par la faute ou la fin de vie : comblement de passif, contribution aux pertes`]]
  ],
  hs: [`Traiter la fiscalité des sociétés.`],
  points: [`J'ai défini l'écran social`, `J'ai cité l'art. 1858`, `J'ai cité l'art. L221-1`, `J'ai parlé de l'action en comblement de passif`, `J'ai distingué obligation aux dettes et contribution aux pertes`]
},
{
  id: 'so-diss-forme', type: 'diss', niveau: 'cours', theme: 'Forme sociale', duree: '3 h',
  sujet: `Le choix de la forme sociale`,
  kit: [
    `**Termes** : sociétés **civiles** (SC, SCP, SCI), **commerciales** (SAS, SARL, SA, SNC), **hybrides** (coopératives, sociétés d'exercice libéral, en participation).`,
    `**Facteurs juridiques** : SAS « souple » mais renvoi aux règles de la **SA** (art. **L227-1**) → SARL plus simple ; **obligation aux dettes** en SNC et SC ; liberté de la preuve en matière commerciale.`,
    `**Facteurs fiscaux** : **IS** 25 % (15 % PME) ou IR ; déficits qui remontent au foyer fiscal ; droits de mutation **3 %** (parts) / **0,1 %** (actions).`,
    `**Mise en œuvre** : option fiscale ; statuts et **pactes** ; **transformation** (majorité, unanimité si l'engagement augmente — art. 1836).`
  ],
  lecture: [
    { q: `Quel plan est attendu ?`, opts: [
      `Les critères du choix, puis l'aménagement du choix`,
      `Une partie par forme sociale`,
      `L'histoire du droit des sociétés`,
      `Les sociétés cotées puis non cotées`],
      ans: 0, exp: `Un sujet « le choix de » appelle les **critères** du choix et sa **mise en œuvre**, pas un catalogue.` }
  ],
  defs: [`**Forme sociale**`, `**Transformation**`, `**Pacte extrastatutaire**`],
  problematique: `Le choix de la forme sociale est-il libre et définitif ?`,
  plan: [
    [`I. Un choix guidé`, [
      `A. Par des facteurs juridiques`,
      `B. Par des facteurs fiscaux`]],
    [`II. Un choix aménageable`, [
      `A. Aménagements fiscaux et contractuels`,
      `B. La transformation`]]
  ],
  hs: [`Faire un catalogue des formes sociales.`],
  points: [`J'ai classé les formes (civiles, commerciales, hybrides)`, `J'ai cité l'art. L227-1`, `J'ai parlé de l'obligation aux dettes`, `J'ai traité l'IS et les droits de mutation`, `J'ai expliqué la transformation (art. 1836)`]
}
],

/* Exercice « Lire un sujet » : [sujet, bonne lecture, [mauvaises lectures], explication] */
lecture: [
  [`Les apports`, `Les apports en nature, en numéraire et en industrie : définition, régime, garanties dues par l'apporteur`, [`Le capital social uniquement`, `Les dividendes`, `L'apport d'un fonds de commerce en droit commercial`], `L'apport est l'élément constitutif de la société : il faut ses **trois formes** et les **garanties** de l'apporteur.`],
  [`L'associé`, `Le statut de l'associé : qualité, droits politiques et financiers, devoirs`, [`Le dirigeant de société`, `Le salarié`, `L'actionnaire de société cotée uniquement`], `« L'associé » appelle ses **droits** et ses **devoirs**, pas ceux des dirigeants.`],
  [`Société et personnalité morale`, `Le lien entre contrat de société et personne morale : naissance à l'immatriculation, exception de la société en participation`, [`La responsabilité pénale des personnes morales`, `Les associations`, `La capacité des majeurs protégés`], `Sujet « A et B » : montrer le lien et ses limites (société sans personnalité).`],
  [`Les dirigeants sociaux`, `Les pouvoirs des dirigeants : dirigeants légaux, plénitude des pouvoirs et ses limites`, [`Les droits de vote des associés`, `Le contrat de travail`, `La gouvernance des associations`], `Le cours traite les dirigeants par leurs **pouvoirs**.`],
  [`Le dividende`, `La notion de dividende, la décision de distribution et l'attribution du dividende (cession, usufruit)`, [`Le bénéfice comptable`, `Les impôts sur les sociétés`, `Le salaire du dirigeant`], `Dividende = **bénéfice distribuable distribué** ; questions clés : qui le touche ?`]
]
};
