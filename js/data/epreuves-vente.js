/* Épreuves type partiel : contrats spéciaux (la vente). Même format que epreuves-biens.js. */
window.EPREUVES = window.EPREUVES || {};
EPREUVES.vente = {
sujets: [

/* ---------------------------------------------------------------- DISSERTATIONS */
{
  id: 'v-vices', type: 'diss', niveau: 'hors', theme: 'Vices cachés', duree: '3 h',
  sujet: `La garantie des vices cachés`,
  kit: [
    `**Art. 1641** : le vendeur est tenu de la garantie à raison des **défauts cachés** de la chose vendue qui la rendent **impropre à l'usage** auquel on la destine, ou qui diminuent tellement cet usage que l'acheteur ne l'aurait pas acquise, ou en aurait donné un moindre prix, s'il les avait connus.`,
    `**Conditions** : un **défaut** (inhérent à la chose), **caché** (art. 1642 : pas de garantie pour les vices apparents dont l'acheteur a pu se convaincre lui-même ; on est plus exigeant avec un acheteur professionnel), **antérieur** à la vente (ou au moins en germe), **grave** (impropriété à l'usage).`,
    `**Option de l'acheteur (art. 1644)** : **action rédhibitoire** (rendre la chose, récupérer le prix) ou **action estimatoire** (garder la chose, obtenir une réduction du prix). Le choix est **libre**, il n'a pas à le justifier.`,
    `**Dommages-intérêts** : si le vendeur **connaissait** les vices, il doit tous dommages-intérêts (art. 1645) ; sinon, seulement la restitution du prix et les frais (art. 1646). Le **vendeur professionnel** est **présumé de manière irréfragable** connaître les vices (Civ. 1re, 19 janv. 1965).`,
    `**Clauses de non-garantie** : valables en principe (art. 1643), mais **inefficaces** pour le vendeur qui connaissait le vice, donc pour le vendeur professionnel face à un non-professionnel (et interdites face à un consommateur).`,
    `**Délai (art. 1648 al. 1)** : **deux ans à compter de la découverte du vice**. La chambre mixte (21 juill. 2023) y voit un délai de **prescription** (susceptible de suspension), enfermé dans le **délai butoir de 20 ans** de l'art. 2232, qui court à compter de la **vente**.`,
    `**Frontières** : **non-conformité** (chose différente de celle convenue : obligation de délivrance, art. 1604) ≠ **vice** (chose conforme mais défectueuse pour son usage). Civ. 1re, 5 mai 1993 : le défaut qui rend la chose impropre à l'usage est un vice caché, pas un défaut de conformité. **Erreur** : l'action pour vice caché est l'**unique fondement** possible (Civ. 1re, 14 mai 1996), mais le **dol** reste ouvert.`
  ],
  lecture: [
    { q: `Ton cours s'arrête à la garantie d'éviction. Que fais-tu du chapitre sur l'éviction ?`, opts: [
      `Je l'évoque en introduction pour situer la garantie des vices parmi les obligations du vendeur (art. 1603, 1625), puis je n'en parle plus`,
      `J'en fais ma partie I, puisque c'est aussi une garantie`,
      `Je fais un plan « I. Éviction, II. Vices cachés »`,
      `Je ne le cite jamais`],
      ans: 0, exp: `**L'art. 1625** prévoit deux garanties : éviction et vices. Le sujet n'en vise **qu'une**. L'éviction sert à **délimiter** (« le vendeur garantit la possession paisible et les défauts cachés ; seul le second objet est ici étudié »). En faire une partie, c'est le **hors-sujet par réflexe**.` },
    { q: `Quelle notion voisine dois-tu absolument écarter, en l'expliquant, dans l'introduction ?`, opts: [
      `Le défaut de conformité (obligation de délivrance) et, pour le consommateur, la garantie légale de conformité`,
      `La lésion`,
      `La promesse de vente`,
      `Le transfert des risques`],
      ans: 0, exp: `Vice caché et non-conformité sont **constamment confondus**, et le correcteur attend que tu les **distingues**. Mentionner la garantie de conformité du Code de la consommation montre aussi que tu connais l'environnement du sujet.` },
    { q: `Quel plan ?`, opts: [
      `I. Une garantie aux conditions exigeantes (vice caché, antérieur, grave ; bref délai) ; II. Une garantie aux effets protecteurs (option rédhibitoire / estimatoire, dommages-intérêts, sort des clauses)`,
      `I. Les obligations du vendeur ; II. Les obligations de l'acheteur`,
      `I. L'art. 1641 ; II. L'art. 1648`,
      `I. La garantie d'éviction ; II. La garantie des vices cachés`],
      ans: 0, exp: `Plan conditions / effets, chaque partie avec une **idée** (exigeante / protectrice). Le plan C est un plan « par articles », à éviter ; les plans B et D débordent du sujet.` }
  ],
  defs: [`**Garantie** (art. 1603, 1625)`, `**Vice caché** (art. 1641)`, `**Non-conformité** (à distinguer)`],
  problematique: `La garantie des vices cachés, protection traditionnelle de l'acheteur, n'est-elle pas d'un accès si exigeant que sa portée protectrice s'en trouve limitée ?`,
  plan: [
    ['I. Une garantie d\'accès exigeant', [
      `A. Des conditions strictes tenant au vice : défaut caché, antérieur, grave (art. 1641, 1642) ; distinction avec la non-conformité (Civ. 1re, 5 mai 1993)`,
      `B. Un délai encadré : deux ans à compter de la découverte (art. 1648), délai butoir de 20 ans (ch. mixte, 21 juill. 2023) ; exclusivité face à l'erreur (Civ. 1re, 14 mai 1996)`]],
    ['II. Une garantie aux effets protecteurs', [
      `A. L'option de l'acheteur : action rédhibitoire ou estimatoire (art. 1644)`,
      `B. Une protection renforcée face au professionnel : dommages-intérêts (art. 1645), présomption irréfragable de connaissance, neutralisation des clauses de non-garantie (art. 1643)`]]
  ],
  hs: [
    `Traiter **la garantie d'éviction** dans une partie.`,
    `Faire une dissertation sur **les obligations du vendeur** en général.`,
    `Mélanger vice et **non-conformité** sans jamais les distinguer.`,
    `Développer longuement le **droit de la consommation** : il sert de comparaison.`
  ],
  points: [
    `J'ai cité l'art. 1641 et défini le vice caché`,
    `J'ai donné les conditions : caché, antérieur, grave`,
    `J'ai distingué vice caché et défaut de conformité`,
    `J'ai cité l'option de l'art. 1644 (rédhibitoire / estimatoire)`,
    `J'ai cité le délai de deux ans à compter de la découverte (art. 1648)`,
    `J'ai parlé du vendeur professionnel présumé connaître le vice`,
    `J'ai traité les clauses de non-garantie`,
    `Je n'ai pas consacré de partie à l'éviction`
  ]
},

{
  id: 'v-acheteur', type: 'diss', niveau: 'hors', theme: 'Obligations de l\'acheteur', duree: '3 h',
  sujet: `Les obligations de l'acheteur`,
  kit: [
    `**Art. 1650** : « La principale obligation de l'acheteur est de **payer le prix** au jour et au lieu réglés par la vente. » À défaut de stipulation : au lieu et au temps de la **délivrance** (art. 1651).`,
    `**Intérêts (art. 1652)** : dus sur le prix si convenu, si la chose produit des fruits ou revenus, ou après sommation.`,
    `**Suspension (art. 1653)** : l'acheteur troublé ou menacé d'éviction peut **suspendre** le paiement jusqu'à ce que le vendeur fasse cesser le trouble.`,
    `**Obligation de retirement** : prendre livraison de la chose ; les frais d'enlèvement sont à sa charge (art. 1608). **Art. 1657** : pour les denrées et effets mobiliers, la vente est **résolue de plein droit**, sans sommation, au profit du vendeur, après l'expiration du terme convenu pour le retirement.`,
    `**Sanctions du défaut de paiement** : **résolution** (art. 1654 ; art. 1656 pour les immeubles : même avec une clause résolutoire, une sommation est nécessaire), **exécution forcée**, **exception d'inexécution** et **droit de rétention** du vendeur (art. 1612 : il n'est pas tenu de délivrer si le prix n'est pas payé et qu'il n'a pas accordé de délai).`,
    `**Sûretés du vendeur** : **privilège** du vendeur (mobilier et immobilier), **clause de réserve de propriété** (art. 2367, que tu as vue avec le transfert de propriété).`,
    `**Obligation d'information ?** L'acheteur n'est pas tenu d'informer le vendeur sur la **valeur** de la chose (Civ. 1re, 3 mai 2000, Baldus ; art. 1112-1 al. 2 : le devoir d'information ne porte pas sur l'estimation de la valeur de la prestation).`
  ],
  lecture: [
    { q: `Tu connais très bien les obligations du vendeur. Comment t'en servir ?`, opts: [
      `Seulement comme miroir, en introduction ou ponctuellement (la délivrance fixe le lieu et la date du paiement, l'éviction justifie la suspension)`,
      `En faire la partie I pour équilibrer`,
      `Faire un plan « I. Le vendeur, II. L'acheteur »`,
      `Les ignorer complètement`],
      ans: 0, exp: `C'est le **piège de symétrie** : le sujet porte sur **l'acheteur**. Les obligations du vendeur n'apparaissent que là où elles **interagissent** avec celles de l'acheteur (art. 1651, 1653, 1612).` },
    { q: `Quelles sont les obligations de l'acheteur ?`, opts: [
      `Payer le prix (obligation principale, art. 1650) et retirer la chose (prendre livraison)`,
      `Payer le prix uniquement`,
      `Délivrer et garantir`,
      `Informer le vendeur de la valeur de la chose`],
      ans: 0, exp: `Deux obligations : **payer** (principale) et **retirer**. L'obligation d'information sur la valeur est **écartée** par la jurisprudence Baldus : c'est un bon point de discussion.` },
    { q: `Quel plan ?`, opts: [
      `I. Le contenu des obligations de l'acheteur (payer, retirer) ; II. La sanction de leur inexécution (résolution, rétention, sûretés)`,
      `I. La vente parfaite ; II. Le transfert de propriété`,
      `I. Les obligations du vendeur ; II. Les obligations de l'acheteur`,
      `I. Le prix ; II. La chose`],
      ans: 0, exp: `Contenu / sanctions est sûr et couvre tout le sujet. Le plan D (« le prix, la chose ») est celui de la **formation** de la vente : autre sujet.` }
  ],
  defs: [`**Acheteur**`, `**Obligation** (vs simple charge)`, `**Prix**, **retirement**`],
  problematique: `Comment le droit de la vente assure-t-il au vendeur l'exécution de la contrepartie qui lui est due ?`,
  plan: [
    ['I. Le contenu des obligations de l\'acheteur', [
      `A. L'obligation principale de payer le prix : lieu, date (art. 1650, 1651), intérêts (art. 1652), faculté de suspension (art. 1653)`,
      `B. L'obligation accessoire de retirer la chose : frais d'enlèvement (art. 1608), terme du retirement (art. 1657) ; absence d'obligation d'information sur la valeur (Baldus, art. 1112-1)`]],
    ['II. La sanction des obligations de l\'acheteur', [
      `A. La résolution de la vente : judiciaire (art. 1654), de plein droit pour les denrées et effets mobiliers (art. 1657), mise en demeure pour les immeubles (art. 1656)`,
      `B. Les garanties du vendeur : droit de rétention (art. 1612), exception d'inexécution, privilège, réserve de propriété (art. 2367)`]]
  ],
  hs: [
    `Consacrer une partie aux **obligations du vendeur**.`,
    `Glisser vers la **formation** du contrat ou la détermination du prix.`,
    `Oublier l'obligation de **retirement**.`
  ],
  points: [
    `J'ai cité l'art. 1650`,
    `J'ai traité le lieu et la date du paiement (art. 1651)`,
    `J'ai parlé de l'obligation de retirement`,
    `J'ai cité l'art. 1653 (suspension en cas de trouble)`,
    `J'ai traité la résolution (art. 1654, 1656 ou 1657)`,
    `J'ai mentionné le droit de rétention ou la réserve de propriété`,
    `J'ai évoqué la jurisprudence Baldus`
  ]
},

{
  id: 'v-conso', type: 'diss', niveau: 'hors', theme: 'Droit de la consommation', duree: '3 h',
  sujet: `L'acheteur consommateur`,
  kit: [
    `**Consommateur** (art. liminaire C. consom.) : personne physique qui agit à des fins qui n'entrent pas dans le cadre de son activité commerciale, industrielle, artisanale, libérale ou agricole. Face à lui : le **professionnel**.`,
    `**Information précontractuelle** : art. L. 111-1 C. consom. (caractéristiques essentielles, prix, délai de livraison, garanties…).`,
    `**Droit de rétractation** : **14 jours** pour les contrats conclus **à distance** ou **hors établissement** (art. L. 221-18), à compter de la **réception** du bien, sans motif ni pénalité ; prolongé de 12 mois si le consommateur n'a pas été informé de ce droit ; exceptions (biens confectionnés selon ses spécifications, périssables…, art. L. 221-28). En immobilier : faculté de rétractation de **10 jours** pour l'acquéreur non professionnel d'un logement (art. L. 271-1 CCH).`,
    `**Délivrance et risques** : à défaut de date indiquée, livraison au plus tard **30 jours** après la conclusion (art. L. 216-1) ; le consommateur peut **résoudre** après une mise en demeure restée vaine (art. L. 216-6) ; les **risques** ne passent au consommateur qu'à la **prise de possession physique** du bien (art. L. 216-4), par dérogation à l'art. 1196.`,
    `**Garantie légale de conformité** (art. L. 217-3 s., réformée au 1er janv. 2022) : le vendeur professionnel répond des défauts de conformité apparaissant dans les **2 ans** de la délivrance ; défauts **présumés** exister à la délivrance pendant **24 mois** (bien neuf) ou **12 mois** (occasion) ; le consommateur choisit d'abord entre **réparation** et **remplacement**, puis réduction du prix ou résolution. Garantie **d'ordre public**, qui ne prive pas de l'action en garantie des vices cachés.`,
    `**Clauses abusives** (art. L. 212-1) : réputées non écrites celles qui créent un **déséquilibre significatif** ; liste noire et liste grise réglementaires.`
  ],
  lecture: [
    { q: `Comment articuler droit commun de la vente et droit de la consommation ?`, opts: [
      `Montrer comment le droit de la consommation renforce, complète ou écarte le droit commun de la vente (Code civil) quand l'acheteur est un consommateur`,
      `Ne parler que du Code de la consommation`,
      `Ne parler que du Code civil, puisque c'est le cours`,
      `Faire un plan « I. Code civil ; II. Code de la consommation »`],
      ans: 0, exp: `Le sujet est **l'acheteur** quand il est **consommateur** : ce qui compte, c'est la **spécificité** de sa situation par rapport à l'acheteur ordinaire. Le plan par codes est descriptif et juxtapose au lieu de démontrer.` },
    { q: `Quel plan suit la vie du contrat et répond au sujet ?`, opts: [
      `I. Un consentement protégé (information, rétractation) ; II. Une exécution sécurisée (délivrance, risques, garantie de conformité, clauses abusives)`,
      `I. La notion de consommateur ; II. La notion de professionnel`,
      `I. Le prix ; II. La chose`,
      `I. La vente en magasin ; II. La vente en ligne`],
      ans: 0, exp: `Formation / exécution permet de couvrir **toutes** les protections avec une idée directrice. Les définitions (consommateur, professionnel) vont en **introduction**, pas dans tout un I.` }
  ],
  defs: [`**Consommateur** (article liminaire)`, `**Professionnel**`, `**Acheteur** au sens du Code civil`],
  problematique: `En quoi la qualité de consommateur transforme-t-elle la condition de l'acheteur telle que la conçoit le droit commun de la vente ?`,
  plan: [
    ['I. Un consentement protégé', [
      `A. L'information renforcée : art. L. 111-1, au-delà de l'art. 1112-1 et de l'art. 1602`,
      `B. Le droit de se dédire : rétractation de 14 jours (art. L. 221-18), 10 jours en immobilier (art. L. 271-1 CCH), contre la force obligatoire (art. 1103)`]],
    ['II. Une exécution sécurisée', [
      `A. Une délivrance et des risques aménagés : 30 jours, résolution facilitée (art. L. 216-1, L. 216-6), risques à la prise de possession (art. L. 216-4) au lieu de l'art. 1196`,
      `B. Des garanties d'ordre public : garantie légale de conformité (art. L. 217-3 s.), présomption d'antériorité, clauses abusives (art. L. 212-1)`]]
  ],
  hs: [
    `Une dissertation sur **la notion de consommateur** en droit européen.`,
    `Réciter le droit commun de la vente sans jamais parler du consommateur.`,
    `Faire un exposé sur **le crédit à la consommation**.`
  ],
  points: [
    `J'ai défini le consommateur`,
    `J'ai comparé avec l'acheteur du Code civil`,
    `J'ai cité le droit de rétractation de 14 jours`,
    `J'ai parlé de la délivrance (30 jours) et des risques (prise de possession)`,
    `J'ai exposé la garantie légale de conformité et sa présomption`,
    `J'ai mentionné les clauses abusives`
  ]
},

{
  id: 'v-prix', type: 'diss', niveau: 'cours', theme: 'Prix', duree: '3 h',
  sujet: `Le prix, élément essentiel de la vente`,
  kit: [
    `Sujet **au programme** (chapitre « Le prix »). L'enjeu ici est la **lecture** du sujet : le mot « essentiel » commande tout.`,
    `**Art. 1582** (définition de la vente : l'un livre la chose, l'autre la paie) ; **art. 1583** (vente parfaite dès l'accord sur la chose et le prix) ; **art. 1591** (prix déterminé et désigné par les parties) ; **art. 1592** (prix laissé à l'arbitrage d'un tiers).`,
    `**Prix réel et sérieux** : un prix **dérisoire** ou **vil** = absence de prix (nullité) ; à distinguer de la **lésion** (art. 1674 : plus des 7/12 pour la vente d'immeuble, rescision), qui suppose un prix existant mais insuffisant.`,
    `**Prix en argent** : sinon, ce n'est plus une vente (échange, art. 1702 ; dation).`
  ],
  lecture: [
    { q: `Le mot « essentiel » oriente le sujet. Vers quoi ?`, opts: [
      `Vers le rôle du prix dans la qualification et la validité de la vente : sans prix réel, sérieux, déterminé, pas de vente`,
      `Vers le paiement du prix par l'acheteur (art. 1650)`,
      `Vers la fixation des prix par l'État`,
      `Vers le prix dans tous les contrats (art. 1163 à 1171)`],
      ans: 0, exp: `« Essentiel » renvoie à la **formation** et à la **qualification**. Le **paiement** du prix (exécution) n'est pas le sujet, et le prix dans tous les contrats non plus : le droit commun sert à comparer (contrat-cadre, art. 1164).` },
    { q: `Quel plan ?`, opts: [
      `I. Un élément nécessaire à l'existence de la vente (prix en argent, réel et sérieux) ; II. Un élément dont la détermination est encadrée (art. 1591, 1592, lésion)`,
      `I. Le prix ; II. La chose`,
      `I. Le paiement ; II. Les sanctions du non-paiement`,
      `I. Le prix en droit commun ; II. Le prix en droit de la consommation`],
      ans: 0, exp: `Le plan A suit l'adjectif « essentiel » : existence puis détermination. Le plan B ajoute la chose (hors sujet), le plan C traite l'exécution.` }
  ],
  defs: [`**Prix**`, `**Élément essentiel** (sans lui, pas de vente)`],
  problematique: `Pourquoi et comment le droit exige-t-il un prix réel, sérieux et déterminé pour qu'il y ait vente ?`,
  plan: [
    ['I. Un élément nécessaire à l\'existence de la vente', [
      `A. Un prix en argent : critère de qualification (échange, dation, donation)`,
      `B. Un prix réel et sérieux : prix fictif, dérisoire ou vil, sanction par la nullité`]],
    ['II. Un élément dont la fixation est encadrée', [
      `A. Un prix déterminé ou déterminable : art. 1591, 1592 (tiers estimateur), comparaison avec le contrat-cadre (art. 1164)`,
      `B. Un prix contrôlé dans son montant : la lésion (art. 1674)`]]
  ],
  hs: [`Traiter le **paiement** du prix.`, `Ajouter la **chose** au sujet.`, `Une dissertation sur l'art. 1163 et suivants.`],
  points: [
    `J'ai cité les art. 1582 et 1583`,
    `J'ai expliqué le prix en argent comme critère de qualification`,
    `J'ai traité le prix réel et sérieux (vil, dérisoire)`,
    `J'ai cité l'art. 1591 et l'art. 1592`,
    `J'ai distingué prix vil et lésion (art. 1674)`,
    `Je n'ai pas parlé du paiement`
  ]
},

{
  id: 'v-entreprise', type: 'diss', niveau: 'frontiere', theme: 'Qualification', duree: '3 h',
  sujet: `Vente et contrat d'entreprise`,
  kit: [
    `**Contrat d'entreprise** (louage d'ouvrage, art. **1710**) : contrat par lequel l'une des parties s'engage à **faire quelque chose** pour l'autre, moyennant un prix. **Art. 1787** : l'entrepreneur peut fournir seulement son travail, ou aussi la **matière**.`,
    `**Difficulté** : quand l'entrepreneur fournit la matière et fabrique une chose, est-ce une vente (d'une chose future) ou une entreprise ?`,
    `**Critères** : ancien critère de la **valeur respective** de la matière et du travail ; critère retenu aujourd'hui par la jurisprudence : le **travail spécifique** destiné à répondre aux **besoins particuliers** du client caractérise l'entreprise ; un produit **standard**, même fabriqué sur commande, relève de la vente.`,
    `**Enjeux** : **prix** (élément essentiel de la vente ; dans l'entreprise, il peut être fixé après coup, le juge peut le fixer) ; **transfert de propriété** (vente : solo consensu, chose future à son achèvement ; entreprise : à l'achèvement ou à la réception) ; **garanties** (vices cachés, art. 1641 / responsabilité contractuelle et garanties des constructeurs, art. 1792) ; action directe du sous-traitant (loi du 31 déc. 1975).`,
    `**Lien avec ton cours** : la **qualification** (chapitre d'introduction) et l'**identification de la vente** (prix, chose, transfert de propriété).`
  ],
  lecture: [
    { q: `Un sujet « A et B ». Que doit faire ton plan ?`, opts: [
      `Confronter les deux contrats dans chaque partie : comment les distinguer (critères) et pourquoi (enjeux de la qualification)`,
      `Partie I sur la vente, partie II sur le contrat d'entreprise`,
      `Ne parler que de la vente, puisque c'est le cours`,
      `Faire l'histoire des deux contrats`],
      ans: 0, exp: `Le **« et »** demande d'étudier la **relation** entre les deux termes. Un plan « I. A, II. B » est la faute de méthode la plus fréquente sur ce type de sujet : c'est une juxtaposition, pas une démonstration.` },
    { q: `Quel plan ?`, opts: [
      `I. Une frontière délicate à tracer (critères de distinction) ; II. Une frontière aux enjeux importants (régimes différents)`,
      `I. La vente ; II. Le contrat d'entreprise`,
      `I. Le prix ; II. La chose`,
      `I. Le droit commun ; II. Le droit spécial`],
      ans: 0, exp: `Critères / enjeux est le plan type des sujets de **qualification** entre deux contrats voisins. Garde-le en tête pour « Vente et donation », « Vente et bail », « Vente et échange »…` }
  ],
  defs: [`**Vente** (art. 1582)`, `**Contrat d'entreprise** (art. 1710, 1787)`, `**Qualification**`],
  problematique: `Selon quels critères distinguer la vente du contrat d'entreprise, et pourquoi cette distinction importe-t-elle ?`,
  plan: [
    ['I. Une frontière délicate à tracer', [
      `A. Un objet commun : la fourniture d'une chose (art. 1787, chose future de l'art. 1163)`,
      `B. Les critères de distinction : de la valeur respective au travail spécifique répondant aux besoins particuliers`]],
    ['II. Une frontière aux enjeux importants', [
      `A. Enjeux de formation : le prix, élément essentiel de la vente mais non de l'entreprise`,
      `B. Enjeux d'exécution : transfert de propriété, garanties (art. 1641 / art. 1792), sous-traitance`]]
  ],
  hs: [`Juxtaposer la vente puis l'entreprise.`, `Faire tout le cours de la vente sans parler de l'entreprise.`],
  points: [
    `J'ai défini les deux contrats (art. 1582 et 1710)`,
    `J'ai cité l'art. 1787`,
    `J'ai présenté le critère du travail spécifique`,
    `J'ai montré l'enjeu sur le prix`,
    `J'ai montré l'enjeu sur le transfert de propriété ou les garanties`,
    `Chaque partie confronte les deux contrats`
  ]
},

{
  id: 'v-cvim', type: 'diss', niveau: 'hors', theme: 'Vente internationale', duree: '3 h',
  sujet: `La vente internationale de marchandises`,
  kit: [
    `**Convention de Vienne (CVIM)** du **11 avril 1980**, en vigueur en France depuis le **1er janvier 1988**. Un traité de **droit matériel uniforme** : il donne directement la règle, au lieu de désigner une loi nationale.`,
    `**Champ (art. 1)** : ventes de marchandises entre parties ayant leur **établissement dans des États différents**, si ces États sont contractants, ou si les règles de droit international privé mènent à la loi d'un État contractant. **Exclusions (art. 2)** : ventes aux **consommateurs**, aux enchères, valeurs mobilières, navires, électricité. Les parties peuvent l'**écarter** (art. 6). Une commande de marchandises à fabriquer est une vente, sauf si le client fournit l'essentiel des matériaux ou si la prestation de services prédomine (art. 3).`,
    `**Ce qu'elle ne règle pas (art. 4)** : la **validité** du contrat et le **transfert de propriété** (renvoi à la loi nationale applicable). Elle règle la formation (offre, acceptation, art. 14 à 24) et les droits et obligations des parties.`,
    `**Conformité unitaire (art. 35)** : pas de distinction entre non-conformité et vice caché. L'acheteur doit **examiner** la marchandise dans un bref délai (art. 38) et **dénoncer** le défaut dans un délai raisonnable, au plus tard **2 ans** après la remise (art. 39).`,
    `**Remèdes** : priorité au **maintien du contrat** (délai supplémentaire, art. 47 ; réparation, remplacement) ; **résolution** seulement en cas de **contravention essentielle** (art. 25, 49, 64), par simple **déclaration** (art. 26), sans juge ; dommages-intérêts limités au **prévisible** (art. 74) ; exonération pour **empêchement** indépendant de la volonté (art. 79).`,
    `**Risques** : transfert à la remise au premier transporteur en cas de transport (art. 67). **Interprétation** autonome, en tenant compte du caractère international et de la bonne foi (art. 7).`
  ],
  lecture: [
    { q: `Tu n'as jamais étudié la CVIM. Quelle stratégie ?`, opts: [
      `Construire le devoir par comparaison avec ce que je connais : comment la vente internationale se forme, transfère la propriété et sanctionne les défauts, par rapport au Code civil`,
      `Faire une dissertation de droit international privé sur les conflits de lois`,
      `Faire une dissertation sur la vente en droit français en ajoutant « internationale » dans les titres`,
      `Parler du commerce mondial et de l'OMC`],
      ans: 0, exp: `Face à un thème inconnu, la **comparaison** avec le droit commun maîtrisé est ton meilleur outil, à condition de rester sur **le sujet**. Le droit international privé (conflits de lois, Rome I) ou l'économie sont **à côté**.` },
    { q: `Quel plan ?`, opts: [
      `I. Un droit uniforme au champ délimité (sources, champ, exclusions) ; II. Un régime original de la vente (conformité unitaire, contravention essentielle, maintien du contrat)`,
      `I. Le droit français ; II. Le droit étranger`,
      `I. Les Incoterms ; II. L'arbitrage international`,
      `I. La formation ; II. La formation (suite)`],
      ans: 0, exp: `Le plan A présente l'instrument puis ce qu'il a de propre. Les Incoterms et l'arbitrage sont des notions **voisines** du commerce international, pas le sujet.` }
  ],
  defs: [`**Vente internationale** (établissements dans des États différents)`, `**Marchandises** (meubles corporels)`, `**Droit uniforme** vs règle de conflit`],
  problematique: `Comment la Convention de Vienne parvient-elle à offrir aux opérateurs du commerce international un droit de la vente uniforme, et en quoi s'écarte-t-elle du droit français ?`,
  plan: [
    ['I. Un droit uniforme au champ délimité', [
      `A. Une source internationale : CVIM 1980, droit matériel uniforme, interprétation autonome (art. 7)`,
      `B. Un champ circonscrit : ventes internationales de marchandises (art. 1), exclusions (art. 2), questions non réglées (art. 4), possibilité d'exclusion (art. 6)`]],
    ['II. Un régime original de la vente', [
      `A. Une obligation de conformité unitaire : art. 35, examen et dénonciation (art. 38-39), contre la dualité française vice / non-conformité`,
      `B. Des remèdes orientés vers le maintien du contrat : délai supplémentaire (art. 47), résolution limitée à la contravention essentielle (art. 25) et extrajudiciaire (art. 26)`]]
  ],
  hs: [
    `Une dissertation sur les **conflits de lois** (Rome I).`,
    `Parler d'économie, d'OMC, de mondialisation.`,
    `Réciter le droit français de la vente sans le confronter à la CVIM.`
  ],
  points: [
    `J'ai cité la Convention de Vienne du 11 avril 1980`,
    `J'ai expliqué la notion de droit uniforme`,
    `J'ai délimité le champ (art. 1) et cité l'exclusion des ventes aux consommateurs`,
    `J'ai mentionné que le transfert de propriété n'est pas réglé (art. 4)`,
    `J'ai présenté la conformité unitaire (art. 35)`,
    `J'ai présenté la contravention essentielle (art. 25)`,
    `J'ai comparé au droit français à au moins un endroit`
  ]
},

/* ---------------------------------------------------------------- COMMENTAIRES */
{
  id: 'v-art1583', type: 'comm', niveau: 'cours', theme: 'Transfert de propriété', duree: '3 h',
  sujet: `Commentez l'article 1583 du Code civil.`,
  doc: `**Article 1583 du Code civil** : « Elle est parfaite entre les parties, et la propriété est acquise de droit à l'acheteur à l'égard du vendeur, dès qu'on est convenu de la chose et du prix, quoique la chose n'ait pas encore été livrée ni le prix payé. »`,
  kit: [
    `Sujet **au programme** (identification, formation, transfert de propriété). L'enjeu ici est la **méthode** du commentaire d'article.`,
    `**Mots à analyser** : « Elle » (la vente, art. 1582), « parfaite » (formée, consensualisme), « entre les parties », « acquise de droit », « à l'égard du vendeur » (et les tiers ? publicité foncière, art. 1198, art. 2276), « dès qu'on est convenu de la chose et du prix » (éléments essentiels), « quoique… ni livrée ni payée » (dissociation formation / exécution).`,
    `**Portée** : art. 1196 (transfert solo consensu en droit commun, risques), exceptions : choses de genre (individualisation), chose future, clause de réserve de propriété, vente à terme.`
  ],
  lecture: [
    { q: `Le texte contient deux affirmations. Lesquelles ?`, opts: [
      `La vente est parfaite (formée) par le seul accord sur la chose et le prix ; la propriété est transférée immédiatement, indépendamment de la livraison et du paiement`,
      `La vente doit être écrite ; la propriété passe à la livraison`,
      `Le vendeur doit délivrer ; l'acheteur doit payer`,
      `La vente est un contrat réel ; les risques pèsent sur le vendeur`],
      ans: 0, exp: `**Consensualisme** et **transfert solo consensu** : ce sont tes deux parties. Les obligations de délivrer et de payer ne sont évoquées que par la concession finale (« quoique… »).` },
    { q: `Comment exploiter « à l'égard du vendeur » ?`, opts: [
      `Montrer que le texte ne règle que les rapports entre les parties : l'opposabilité aux tiers obéit à d'autres règles (publicité foncière, art. 1198 ; art. 2276 pour les meubles)`,
      `Ne pas en parler, c'est un détail`,
      `Dire que la vente n'a aucun effet envers les tiers`,
      `En faire toute la partie II`],
      ans: 0, exp: `Chaque **mot restrictif** d'un article est une mine pour le commentaire. Ici, il permet de parler des tiers **sans sortir du texte**.` }
  ],
  defs: [`**Vente parfaite**`, `**Consensualisme**`, `**Transfert solo consensu**`],
  problematique: `En faisant de l'accord sur la chose et le prix la condition suffisante de la formation de la vente et du transfert de propriété, l'article 1583 n'énonce-t-il pas un principe plus nuancé qu'il n'y paraît ?`,
  plan: [
    ['I. La perfection de la vente par le seul accord des volontés', [
      `A. Le consensualisme : « parfaite… dès qu'on est convenu »`,
      `B. Les éléments essentiels : « la chose et le prix »`]],
    ['II. Le transfert immédiat de la propriété', [
      `A. Un transfert solo consensu dissocié de l'exécution : « quoique la chose n'ait pas encore été livrée ni le prix payé » (art. 1196)`,
      `B. Un transfert relatif et aménageable : « à l'égard du vendeur » (tiers : art. 1198, 2276), exceptions (choses de genre, chose future, réserve de propriété)`]]
  ],
  hs: [`Une dissertation sur le transfert de propriété en général, sans les mots du texte.`, `Développer les obligations du vendeur.`],
  points: [
    `J'ai analysé « parfaite » (consensualisme)`,
    `J'ai analysé « la chose et le prix » (éléments essentiels)`,
    `J'ai analysé « acquise de droit » (transfert solo consensu)`,
    `J'ai analysé « à l'égard du vendeur » (tiers)`,
    `J'ai analysé « quoique… ni livrée ni payée »`,
    `J'ai donné des exceptions ou aménagements (art. 1196, choses de genre, réserve de propriété)`
  ]
},

{
  id: 'v-art1641', type: 'comm', niveau: 'hors', theme: 'Vices cachés', duree: '3 h',
  sujet: `Commentez l'article 1641 du Code civil.`,
  doc: `**Article 1641 du Code civil** : « Le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui la rendent impropre à l'usage auquel on la destine, ou qui diminuent tellement cet usage que l'acheteur ne l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix, s'il les avait connus. »`,
  kit: [
    `Voir le kit du sujet « La garantie des vices cachés » : conditions (caché, antérieur, grave), art. 1642 à 1648, distinction avec la non-conformité.`,
    `**Mots à analyser** : « est tenu » (obligation légale, de plein droit, même vendeur de bonne foi) ; « garantie » ; « défauts » (inhérents à la chose) ; « cachés » (art. 1642) ; « impropre à l'usage auquel on la destine » (usage normal, voire usage convenu) ; « diminuent tellement cet usage » (gravité) ; « ne l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix » (annonce l'option rédhibitoire / estimatoire de l'art. 1644) ; « s'il les avait connus » (ignorance de l'acheteur).`
  ],
  lecture: [
    { q: `Le texte annonce sans le dire une règle d'un autre article. Laquelle ?`, opts: [
      `« Ne l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix » annonce l'option entre action rédhibitoire et action estimatoire (art. 1644)`,
      `Il annonce la garantie d'éviction (art. 1626)`,
      `Il annonce le délai de 2 ans (art. 1648)`,
      `Il n'annonce rien`],
      ans: 0, exp: `Repérer les **liens** entre les mots du texte et le reste du régime permet de traiter la portée **sans quitter le texte**. Le délai de l'art. 1648 peut être évoqué, mais il n'est pas « annoncé » par la lettre de l'art. 1641.` },
    { q: `Quel plan suit le texte ?`, opts: [
      `I. Un défaut caché (la nature du vice : défaut, caché, ignoré de l'acheteur) ; II. Un défaut grave (l'atteinte à l'usage et ses conséquences sur le consentement et le prix)`,
      `I. Les vices cachés ; II. La garantie d'éviction`,
      `I. Le vendeur ; II. L'acheteur`,
      `I. Les conditions ; II. Le délai de l'art. 1648`],
      ans: 0, exp: `Le texte s'organise autour de deux qualités du défaut : **caché** et **grave**. Le plan B déborde, le plan D fait du délai (qui n'est pas dans le texte) la moitié du devoir.` }
  ],
  defs: [`**Garantie**`, `**Défaut caché**`, `**Usage auquel on la destine**`],
  problematique: `Quel défaut l'article 1641 entend-il faire peser sur le vendeur, et quelle protection en tire l'acheteur ?`,
  plan: [
    ['I. Un défaut caché', [
      `A. Un défaut de la chose : vice inhérent, distinct de la non-conformité et de l'éviction`,
      `B. Un défaut ignoré de l'acheteur : « cachés », « s'il les avait connus » (art. 1642, acheteur profane ou professionnel)`]],
    ['II. Un défaut grave', [
      `A. L'atteinte à l'usage : « impropre à l'usage auquel on la destine », « diminuent tellement cet usage »`,
      `B. L'incidence sur le consentement de l'acheteur : « ne l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix », annonce de l'option de l'art. 1644`]]
  ],
  hs: [`Réciter tout le régime des vices cachés (art. 1641 à 1649) sans revenir aux mots de l'art. 1641.`, `Faire une partie sur l'éviction.`],
  points: [
    `J'ai situé le texte parmi les obligations du vendeur (art. 1603, 1625)`,
    `J'ai analysé « est tenu de la garantie »`,
    `J'ai analysé « défauts cachés » (et l'art. 1642)`,
    `J'ai analysé « impropre à l'usage »`,
    `J'ai relié « moindre prix » à l'option de l'art. 1644`,
    `J'ai distingué le vice de la non-conformité`
  ]
},

/* ---------------------------------------------------------------- CAS PRATIQUES */
{
  id: 'v-cas-voiture', type: 'cas', niveau: 'hors', theme: 'Vices cachés, conformité', duree: '1 h 30',
  sujet: `Cas pratique : la voiture de Clara`,
  doc: `Le 3 mars 2026, Clara, étudiante, achète une voiture d'occasion de 2019 au garage **Auto Plus** pour 9 000 €. Le bon de commande précise : « **véhicule vendu en l'état, sans garantie** ».\n\nLe 20 mai 2026, le moteur casse. L'expert qu'elle mandate conclut que le **joint de culasse était défectueux avant la vente**, ce qui n'était pas décelable par un non-spécialiste.\n\nLe garage refuse toute prise en charge en invoquant la clause. Clara voudrait savoir sur quel fondement agir, ce qu'elle peut obtenir et dans quel délai.`,
  kit: [
    `**Garantie légale de conformité** (C. consom., art. L. 217-3 s.) : vendeur **professionnel** / acheteur **consommateur** ; défauts apparus dans les **2 ans** de la délivrance ; **présomption** d'antériorité de **12 mois** pour un bien d'occasion ; remèdes : réparation ou remplacement, puis réduction du prix ou résolution ; **d'ordre public** (clause contraire réputée non écrite).`,
    `**Vices cachés** (art. 1641 s.) : défaut caché, antérieur, grave ; option rédhibitoire / estimatoire (art. 1644) ; dommages-intérêts si le vendeur connaissait le vice (art. 1645), le vendeur professionnel étant **présumé** le connaître ; délai de 2 ans à compter de la **découverte** (art. 1648).`,
    `**Clause de non-garantie** : sans effet contre la garantie légale de conformité ; inefficace en matière de vices cachés pour le vendeur professionnel (présumé connaître le vice) ; interdite dans les contrats avec un consommateur (clause abusive).`
  ],
  lecture: [
    { q: `Qualification des parties : pourquoi est-ce la première chose à faire ?`, opts: [
      `Parce que le garage est un professionnel et Clara une consommatrice : cela ouvre la garantie légale de conformité du Code de la consommation, en plus du Code civil`,
      `Ce n'est pas utile, le Code civil s'applique à tous`,
      `Pour savoir qui est le plus riche`,
      `Pour savoir si la vente est commerciale et relève du tribunal de commerce`],
      ans: 0, exp: `**Qualifier les parties** est le premier réflexe de tout cas pratique de contrats spéciaux : vendeur professionnel ou non, acheteur consommateur ou non. Cela change les fondements disponibles.` },
    { q: `Quel fondement privilégier ?`, opts: [
      `La garantie légale de conformité, grâce à la présomption d'antériorité (défaut apparu en moins de 12 mois), avec les vices cachés en fondement alternatif`,
      `L'erreur sur les qualités essentielles (art. 1132)`,
      `La responsabilité délictuelle (art. 1240)`,
      `La garantie d'éviction`],
      ans: 0, exp: `La panne survient **moins de 12 mois** après la délivrance d'un bien d'occasion : le défaut est **présumé** antérieur, Clara n'a rien à prouver sur ce point. Les vices cachés restent ouverts (cumul possible). L'erreur est exclue pour un défaut caché (Civ. 1re, 14 mai 1996).` },
    { q: `La clause « vendu en l'état, sans garantie » est-elle efficace ?`, opts: [
      `Non : la garantie de conformité est d'ordre public, et en matière de vices cachés le vendeur professionnel, présumé connaître le vice, ne peut s'en prévaloir`,
      `Oui, Clara l'a signée`,
      `Oui, parce que la voiture est d'occasion`,
      `Oui, sauf si Clara prouve que le garage connaissait le vice`],
      ans: 0, exp: `Double inefficacité : **ordre public** consumériste, et **présomption irréfragable** de connaissance du vice par le vendeur professionnel (art. 1643 a contrario). Clara n'a donc rien à prouver sur la connaissance.` },
    { q: `Que peut-elle obtenir, et dans quel délai ?`, opts: [
      `Conformité : la réparation (le remplacement d'une voiture d'occasion étant difficile), puis réduction du prix ou résolution si la réparation est impossible ou tarde ; vices cachés : restitution ou réduction du prix et dommages-intérêts. Délais : défaut apparu dans les 2 ans de la délivrance ; 2 ans à compter de la découverte pour les vices cachés`,
      `Seulement des dommages-intérêts, dans un délai de 5 ans`,
      `Seulement le remplacement de la voiture par une neuve`,
      `Rien, le délai est expiré`],
      ans: 0, exp: `Une conclusion de cas pratique doit être **concrète** : ce qu'elle obtient et **avant quand** agir. Le 20 mai 2026 (découverte) fait courir le délai de 2 ans de l'art. 1648.` }
  ],
  defs: [`**Consommateur / professionnel**`, `**Défaut de conformité / vice caché**`],
  problematique: `Trois questions : le fondement, l'efficacité de la clause, les remèdes et délais.`,
  plan: [
    ['I. Le fondement de l\'action', [
      `Qualification : vendeur professionnel, acheteuse consommatrice, bien d'occasion, défaut antérieur non décelable`,
      `Règle : garantie légale de conformité (présomption 12 mois pour l'occasion) ; vices cachés (art. 1641) ; exclusion de l'erreur`,
      `Conclusion : agir en priorité sur la garantie légale de conformité, subsidiairement sur les vices cachés`]],
    ['II. L\'efficacité de la clause', [
      `Règle : ordre public consumériste ; présomption irréfragable de connaissance du vice par le vendeur professionnel (art. 1643, 1645)`,
      `Conclusion : clause sans effet`]],
    ['III. Ce que Clara peut obtenir', [
      `Conformité : réparation (remplacement difficile pour une occasion) ; à défaut, réduction du prix ou résolution`,
      `Vices cachés : action rédhibitoire ou estimatoire (art. 1644) + dommages-intérêts (art. 1645)`,
      `Délais : défaut apparu dans les 2 ans de la délivrance ; 2 ans à compter du 20 mai 2026 pour les vices cachés`]]
  ],
  hs: [`Oublier de qualifier les parties.`, `Ne citer que le Code civil.`, `Ne pas conclure concrètement (remèdes, délai).`],
  points: [
    `J'ai qualifié le garage de professionnel et Clara de consommatrice`,
    `J'ai invoqué la garantie légale de conformité et sa présomption`,
    `J'ai invoqué les vices cachés en alternative`,
    `J'ai écarté la clause (ordre public + présomption de connaissance)`,
    `J'ai donné les remèdes de chaque fondement`,
    `J'ai donné les délais`
  ]
},

{
  id: 'v-cas-enligne', type: 'cas', niveau: 'hors', theme: 'Vente à distance', duree: '1 h 30',
  sujet: `Cas pratique : le canapé de Lou`,
  doc: `Le 1er septembre 2026, Lou commande sur le site **Canapé.fr** un canapé de série à 1 200 €, payé en ligne. Aucune date de livraison n'est indiquée.\n\n**1.** Au 15 octobre, toujours rien. Que peut-elle faire ?\n**2.** Le canapé est finalement livré le 20 octobre, mais le transporteur l'a abîmé pendant le trajet, avant de le lui remettre. Qui supporte la perte ?\n**3.** Un autre canapé, intact, lui est livré le 2 novembre. Le 12 novembre, elle change d'avis. Peut-elle le renvoyer ? Les conditions générales du site prévoient : « **aucun remboursement, avoir uniquement** ».`,
  kit: [
    `**Délivrance** (C. consom.) : à défaut de date indiquée, livraison **au plus tard 30 jours** après la conclusion (art. L. 216-1). En cas de manquement, le consommateur peut **résoudre** le contrat après avoir enjoint le professionnel de s'exécuter dans un délai supplémentaire raisonnable resté vain (art. L. 216-6) ; remboursement de toutes les sommes versées.`,
    `**Risques** : tout risque de perte ou d'endommagement est transféré au consommateur au moment où il (ou un tiers désigné par lui) **prend physiquement possession** du bien (art. L. 216-4), par exception à l'art. 1196 (risques liés à la propriété).`,
    `**Rétractation** : **14 jours** à compter de la **réception** du bien pour un contrat à distance (art. L. 221-18), sans motif ; le professionnel **rembourse** toutes les sommes, frais de livraison initiale compris, dans les 14 jours (art. L. 221-24) ; les frais de **renvoi** peuvent rester à la charge du consommateur s'il en a été informé. Exception pour les biens **confectionnés selon les spécifications** du consommateur (art. L. 221-28).`,
    `**Clauses contraires** : les dispositions sur la rétractation sont **d'ordre public** ; une clause qui les écarte est sans effet.`
  ],
  lecture: [
    { q: `Le canapé n'est pas livré au 15 octobre. Quelle règle ?`, opts: [
      `À défaut de date, livraison dans les 30 jours (art. L. 216-1) : le délai est dépassé ; elle doit enjoindre le site de livrer dans un délai supplémentaire raisonnable, puis peut résoudre (art. L. 216-6)`,
      `Elle doit attendre indéfiniment, aucune date n'ayant été fixée`,
      `Elle peut résoudre immédiatement sans aucune démarche`,
      `L'art. 1610 seul s'applique`],
      ans: 0, exp: `Le droit spécial de la consommation **prime** ici sur le droit commun : délai de 30 jours, puis injonction, puis résolution. Le droit commun (art. 1610, 1224 s.) peut être cité en comparaison.` },
    { q: `Le canapé est abîmé par le transporteur avant la remise. Qui supporte la perte ?`, opts: [
      `Le vendeur : dans une vente au consommateur, les risques ne passent qu'à la prise de possession physique (art. L. 216-4), même si Lou est propriétaire depuis la commande`,
      `Lou, puisqu'elle est propriétaire depuis l'accord (art. 1196, res perit domino)`,
      `Le transporteur seul, sans recours possible de Lou contre le site`,
      `Personne`],
      ans: 0, exp: `Piège : appliquer **res perit domino** (cours sur les risques) sans voir que le **droit de la consommation y déroge**. Toujours vérifier s'il existe une règle spéciale pour le consommateur.` },
    { q: `Elle change d'avis le 12 novembre. Peut-elle se rétracter malgré la clause ?`, opts: [
      `Oui : 14 jours à compter de la réception (2 novembre), donc jusqu'au 16 novembre ; canapé de série (pas d'exception) ; la clause « avoir uniquement » est sans effet, elle a droit au remboursement en argent`,
      `Non, la clause du site l'interdit`,
      `Non, le délai court depuis la commande du 1er septembre`,
      `Oui, mais seulement contre un avoir`],
      ans: 0, exp: `Le délai court à compter de la **réception** pour un bien. 10 jours après la réception, elle est dans les temps. Le remboursement doit se faire en principe par le **même moyen de paiement** ; un avoir ne peut pas être imposé.` }
  ],
  defs: [`**Contrat à distance**`, `**Consommateur / professionnel**`, `**Rétractation**`],
  problematique: `Trois questions successives : retard de livraison, perte en cours de transport, rétractation.`,
  plan: [
    ['1. Le retard de livraison', [`Règle : art. L. 216-1 (30 jours) et L. 216-6 (injonction puis résolution)`, `Conclusion : mise en demeure de livrer dans un délai raisonnable, puis résolution et remboursement`]],
    ['2. Le canapé abîmé', [`Règle : art. L. 216-4 (risques à la prise de possession physique), exception à l'art. 1196`, `Conclusion : la perte pèse sur le site, qui doit livrer un canapé intact`]],
    ['3. Le changement d\'avis', [`Règle : art. L. 221-18 (14 jours à compter de la réception), L. 221-24 (remboursement), L. 221-28 (exceptions), ordre public`, `Application : réception le 2 novembre, délai jusqu'au 16 novembre ; canapé de série`, `Conclusion : rétractation possible, remboursement intégral malgré la clause ; frais de renvoi à sa charge si elle en a été informée`]]
  ],
  hs: [`Appliquer res perit domino sans voir l'art. L. 216-4.`, `Faire courir la rétractation à partir de la commande.`],
  points: [
    `J'ai qualifié Lou de consommatrice et le contrat de contrat à distance`,
    `J'ai cité le délai de 30 jours et la procédure de résolution`,
    `J'ai appliqué la règle spéciale des risques (prise de possession physique)`,
    `J'ai calculé le délai de rétractation à partir de la réception`,
    `J'ai écarté la clause « avoir uniquement »`
  ]
},

{
  id: 'v-cas-chaine', type: 'cas', niveau: 'hors', theme: 'Chaînes de contrats', duree: '1 h 30',
  sujet: `Cas pratique : le camping-car de M. Diallo`,
  doc: `M. Diallo a acheté un camping-car neuf auprès du concessionnaire **Évasion**, qui l'avait lui-même acheté au fabricant **Roulier**. Six mois plus tard, un défaut de fabrication du châssis, indécelable à l'achat, rend le véhicule dangereux et inutilisable.\n\nÉvasion vient d'être placé en **liquidation judiciaire**. M. Diallo voudrait agir directement contre Roulier, avec qui il n'a signé aucun contrat. Roulier répond qu'il n'a « aucun lien » avec lui et, subsidiairement, invoque une **clause limitative** de garantie stipulée dans son contrat avec Évasion.`,
  kit: [
    `**Chaîne de contrats translatifs de propriété** : le sous-acquéreur dispose contre le vendeur originaire (ou le fabricant) d'une **action directe** en garantie des vices cachés (Civ. 1re, 9 oct. 1979, **Lamborghini**).`,
    `**Nature contractuelle** : Ass. plén., 7 févr. 1986 : le maître de l'ouvrage comme le sous-acquéreur jouit de tous les droits et actions attachés à la chose qui appartenaient à son auteur ; il dispose d'une action **directe**, **nécessairement de nature contractuelle**. L'action est **transmise avec la chose**, comme un accessoire.`,
    `**Conséquence** : le fabricant peut opposer au sous-acquéreur les **moyens de défense** qu'il aurait pu opposer à son propre cocontractant (clauses du contrat initial, dans la mesure où elles sont valables entre ces parties). Entre deux professionnels de **même spécialité**, une clause limitative peut être valable ; mais un fabricant est un vendeur professionnel présumé connaître les vices, ce qui neutralise la clause face à un acheteur non professionnel de cette spécialité.`,
    `**Intérêt** : éviter l'insolvabilité de l'intermédiaire (ici, Évasion en liquidation).`
  ],
  lecture: [
    { q: `Roulier dit n'avoir « aucun lien » contractuel avec M. Diallo. Quelle notion répond à cet argument ?`, opts: [
      `La chaîne de contrats translatifs de propriété : l'action en garantie des vices est transmise avec la chose, ce qui ouvre une action directe contre le fabricant`,
      `L'effet relatif des contrats, qui interdit toute action`,
      `La stipulation pour autrui`,
      `La gestion d'affaires`],
      ans: 0, exp: `L'effet relatif (art. 1199) est **tempéré** par la transmission des actions avec la chose. C'est la jurisprudence Lamborghini (1979) et l'Assemblée plénière de 1986.` },
    { q: `Action délictuelle ou contractuelle ?`, opts: [
      `Nécessairement contractuelle (Ass. plén., 7 févr. 1986) : M. Diallo exerce l'action en garantie des vices cachés d'Évasion contre Roulier`,
      `Délictuelle, puisqu'il n'y a pas de contrat entre eux`,
      `Au choix de M. Diallo`,
      `Ni l'une ni l'autre`],
      ans: 0, exp: `Dans les chaînes **translatives de propriété**, l'action est **nécessairement contractuelle**. Tu peux noter qu'en dehors de ces chaînes, la jurisprudence est différente (Ass. plén., 12 juill. 1991, Besse, pour une chaîne non translative).` },
    { q: `La clause limitative entre Roulier et Évasion est-elle opposable à M. Diallo ?`, opts: [
      `En principe, Roulier peut opposer les moyens de défense qu'il avait contre Évasion ; mais comme vendeur professionnel présumé connaître le vice, il ne peut limiter sa garantie face à un acheteur qui n'est pas de la même spécialité`,
      `Toujours, sans réserve`,
      `Jamais, une clause n'a d'effet qu'entre les parties`,
      `Oui, sauf si M. Diallo prouve que Roulier connaissait le vice`],
      ans: 0, exp: `L'action transmise est celle d'Évasion, **avec ses limites**. Mais la présomption irréfragable de connaissance du vice par le vendeur professionnel neutralise la clause. Note que ce point est délicat : la réponse attendue est une **discussion**, pas une affirmation sèche.` }
  ],
  defs: [`**Sous-acquéreur**`, `**Chaîne de contrats translatifs de propriété**`, `**Action directe**`],
  problematique: `Trois questions : l'existence d'une action contre le fabricant, sa nature, l'opposabilité de la clause limitative.`,
  plan: [
    ['I. L\'action directe contre le fabricant', [`Règle : chaîne translative de propriété, Lamborghini (1979), Ass. plén. 1986`, `Application : Roulier → Évasion → Diallo ; vice antérieur, caché, grave`, `Conclusion : action directe en garantie des vices cachés`]],
    ['II. La nature de l\'action', [`Nécessairement contractuelle (Ass. plén., 7 févr. 1986) ; délai de 2 ans à compter de la découverte (art. 1648)`]],
    ['III. La clause limitative', [`Principe : opposabilité des moyens de défense du contrat initial`, `Limite : présomption de connaissance du vice par le fabricant ; clause inefficace face à un acheteur non spécialiste`, `Conclusion : M. Diallo peut obtenir la restitution du prix ou sa réduction et des dommages-intérêts`]]
  ],
  hs: [`Fonder l'action sur l'art. 1240.`, `Conclure à l'absence d'action au nom de l'effet relatif.`],
  points: [
    `J'ai identifié la chaîne de contrats translatifs de propriété`,
    `J'ai cité Lamborghini (1979) ou l'Assemblée plénière de 1986`,
    `J'ai qualifié l'action de contractuelle`,
    `J'ai vérifié les conditions du vice caché`,
    `J'ai discuté l'opposabilité de la clause limitative`,
    `J'ai donné le délai pour agir`
  ]
},

/* ---------------------------------------------------------------- QUESTIONS */
{
  id: 'v-q-echange', type: 'q', niveau: 'hors', theme: 'Échange', duree: '30 min',
  sujet: `Distinguez la vente et l'échange.`,
  kit: [
    `**Échange (art. 1702)** : contrat par lequel les parties se donnent respectivement **une chose pour une autre**. **Art. 1703** : il s'opère par le seul consentement, comme la vente.`,
    `**Différences** : pas de **prix en argent** (critère de la vente) ; chaque copermutant est à la fois vendeur et acheteur ; en cas d'éviction, le copermutant évincé a le choix entre des dommages-intérêts et la **répétition de sa chose** (art. 1705) ; la **rescision pour lésion** n'a pas lieu dans l'échange (art. 1706).`,
    `**Renvoi (art. 1707)** : toutes les autres règles de la vente s'appliquent à l'échange.`,
    `**Échange avec soulte** : si une soulte en argent est versée, la qualification dépend de la part prépondérante (soulte importante → vente).`
  ],
  lecture: [
    { q: `Quel est le critère central de distinction ?`, opts: [
      `Le prix en argent : la vente l'exige, l'échange porte sur une chose contre une autre`,
      `La forme écrite`,
      `La qualité des parties`,
      `La nature mobilière ou immobilière de la chose`],
      ans: 0, exp: `Le **prix en argent** est l'élément qui fait la vente : son absence fait basculer vers l'échange. C'est un sujet de **qualification**, comme ton chapitre d'identification de la vente.` }
  ],
  defs: [`**Vente** (art. 1582)`, `**Échange** (art. 1702)`, `**Soulte**`],
  problematique: `Comparaison en trois temps : critère, points communs, différences de régime.`,
  plan: [
    ['Réponse structurée', [
      `1. Critère : le prix en argent (art. 1582 / art. 1702)`,
      `2. Points communs : consensualisme (art. 1703), renvoi aux règles de la vente (art. 1707)`,
      `3. Différences de régime : éviction (art. 1705), pas de lésion (art. 1706) ; cas de l'échange avec soulte`]]
  ],
  hs: [`Deux exposés juxtaposés.`],
  points: [`J'ai cité l'art. 1702`, `J'ai posé le critère du prix en argent`, `J'ai cité l'art. 1707 (renvoi)`, `J'ai cité l'art. 1706 (pas de lésion)`, `J'ai évoqué la soulte`]
},

{
  id: 'v-q-remere', type: 'q', niveau: 'frontiere', theme: 'Faculté de rachat', duree: '30 min',
  sujet: `Qu'est-ce que la vente avec faculté de rachat ?`,
  kit: [
    `**Art. 1659** : pacte par lequel le vendeur se **réserve de reprendre** la chose vendue, moyennant la restitution du prix et des remboursements de l'art. 1673 (frais et loyaux coûts, réparations nécessaires, améliorations ayant augmenté la valeur).`,
    `**Durée (art. 1660)** : **5 ans maximum** ; un terme plus long est réduit à 5 ans. **Art. 1662** : faute d'exercice dans le délai, l'acquéreur devient **propriétaire irrévocable**.`,
    `**Nature** : vente sous **condition résolutoire** potestative (dépendant de la volonté du vendeur). L'exercice du rachat anéantit la vente rétroactivement : les droits consentis par l'acheteur dans l'intervalle tombent (sauf baux de bonne foi, art. 1673).`,
    `**Usage et danger** : moyen de **crédit** (le vendeur obtient de l'argent tout en gardant l'espoir de récupérer son bien) ; risque de **prêt déguisé** contournant la prohibition du pacte commissoire ou l'usure : le juge peut requalifier.`
  ],
  lecture: [
    { q: `Que doit contenir une bonne réponse à une question « Qu'est-ce que… ? »`, opts: [
      `Une définition précise, la nature juridique, le régime essentiel et l'intérêt pratique de l'opération`,
      `Uniquement la définition de l'art. 1659`,
      `Un plan en deux parties avec introduction de 2 pages`,
      `Une liste d'exemples`],
      ans: 0, exp: `Définition, **nature**, **régime**, **intérêt** : c'est la grille universelle d'une question de cours « notion ».` }
  ],
  defs: [`**Faculté de rachat** (réméré)`, `**Condition résolutoire**`],
  problematique: `Définition, nature, régime, intérêt et risque.`,
  plan: [['Réponse structurée', [`1. Définition (art. 1659)`, `2. Nature : vente sous condition résolutoire`, `3. Régime : 5 ans max (art. 1660), effets de l'exercice (art. 1673), défaut d'exercice (art. 1662)`, `4. Intérêt : opération de crédit ; risque de prêt déguisé`]]],
  hs: [`Confondre avec la promesse unilatérale de vente.`],
  points: [`J'ai cité l'art. 1659`, `J'ai qualifié de condition résolutoire`, `J'ai donné la limite de 5 ans`, `J'ai expliqué l'effet rétroactif du rachat`, `J'ai évoqué le risque de prêt déguisé`]
},

{
  id: 'v-q-vefa', type: 'q', niveau: 'hors', theme: 'Vente d\'immeuble à construire', duree: '30 min',
  sujet: `Présentez la vente d'immeuble à construire.`,
  kit: [
    `**Art. 1601-1** : vente par laquelle le vendeur s'oblige à **édifier un immeuble** dans un délai déterminé par le contrat. Deux formes : **vente à terme** et **vente en l'état futur d'achèvement (VEFA)**.`,
    `**Vente à terme (art. 1601-2)** : le vendeur s'engage à livrer l'immeuble à son achèvement ; le **transfert de propriété** se produit de plein droit **à l'achèvement**, constaté par acte authentique, avec effet rétroactif au jour de la vente.`,
    `**VEFA (art. 1601-3)** : le vendeur transfère immédiatement à l'acquéreur ses droits sur le **sol** et la propriété des constructions existantes ; les ouvrages à venir deviennent la propriété de l'acquéreur **au fur et à mesure** de leur exécution ; l'acquéreur paie le prix **à mesure de l'avancement** des travaux. Le vendeur reste **maître de l'ouvrage** jusqu'à la réception.`,
    `**Secteur protégé** (logement, CCH art. L. 261-10 s.) : contrat obligatoirement **authentique** avec mentions imposées ; **garantie financière d'achèvement** ; paiements plafonnés : 35 % à l'achèvement des fondations, 70 % à la mise hors d'eau, 95 % à l'achèvement (art. R. 261-14 CCH). Contrat de **réservation** préalable possible.`,
    `**Garanties** : le vendeur est tenu des garanties des constructeurs (décennale, biennale, parfait achèvement : art. 1646-1, renvoyant aux art. 1792 s.) et des vices apparents (art. 1642-1).`,
    `**Lien avec ton cours** : vente de **chose future** (art. 1163) et **transfert de propriété** différé ou progressif, exception au principe solo consensu.`
  ],
  lecture: [
    { q: `À quoi rattacher ce thème inconnu ?`, opts: [
      `Au transfert de propriété (exception au transfert immédiat) et à la vente de chose future`,
      `À la lésion`,
      `Aux promesses de vente`,
      `À la garantie d'éviction`],
      ans: 0, exp: `L'intérêt majeur de la vente d'immeuble à construire, pour ton cours, est de montrer un **transfert de propriété différé** (vente à terme) ou **progressif** (VEFA), loin de l'art. 1583.` }
  ],
  defs: [`**Vente d'immeuble à construire** (art. 1601-1)`, `**VEFA**`, `**Vente à terme**`],
  problematique: `Notion, deux formes, protection de l'acquéreur, lien avec le transfert de propriété.`,
  plan: [['Réponse structurée', [`1. Notion (art. 1601-1)`, `2. Vente à terme (art. 1601-2) : transfert à l'achèvement`, `3. VEFA (art. 1601-3) : transfert au fur et à mesure, paiement échelonné`, `4. Secteur protégé : forme authentique, garantie d'achèvement, plafonds de paiement`, `5. Garanties des constructeurs (art. 1646-1)`]]],
  hs: [`Un exposé de droit de la construction (responsabilité décennale) sans parler de la vente.`],
  points: [`J'ai défini la vente d'immeuble à construire`, `J'ai distingué vente à terme et VEFA`, `J'ai expliqué le moment du transfert de propriété dans chacune`, `J'ai mentionné les protections du secteur protégé`, `J'ai rattaché à la vente de chose future`]
}
],

lecture: [
  [`Le transfert des risques dans la vente`, `Qui supporte la perte fortuite de la chose entre la vente et la livraison : res perit domino (art. 1196), effets de la mise en demeure, règles spéciales (consommateur, CVIM)`, [`Le transfert de propriété en général`, `Les assurances de dommages`, `La garantie des vices cachés`], `Le transfert de propriété est un **outil** du sujet (risques liés à la propriété), pas le sujet.`],
  [`La vente de la chose d'autrui`, `L'art. 1599 : nullité relative au profit de l'acheteur, conditions, régularisation, et articulation avec l'art. 2276 et la garantie d'éviction`, [`La vente en général`, `La possession vaut titre uniquement`, `La garantie d'éviction uniquement`], `Sujet **étroit** : centré sur l'art. 1599 et la sanction de cette vente.`],
  [`Le vendeur professionnel`, `Ce que la qualité de professionnel change pour le vendeur : présomption de connaissance des vices, obligation de conseil, droit de la consommation, clauses limitatives`, [`Les obligations du vendeur en général`, `Le commerçant en droit commercial`, `La vente entre particuliers`], `L'adjectif **« professionnel »** fixe l'angle : la spécificité de sa situation.`],
  [`L'acheteur`, `La situation de l'acheteur : ses obligations (payer, retirer) et ses protections (information, garanties, rétractation)`, [`Les obligations du vendeur`, `La formation de la vente`, `Le consommateur uniquement`], `Sujet sur une **personne** : obligations et protections, vues depuis l'acheteur.`],
  [`La promesse unilatérale de vente`, `Définition (art. 1124), formation, effets (option, révocation inefficace pendant le délai), sanction et distinction avec la promesse synallagmatique (art. 1589)`, [`Le pacte de préférence (art. 1123)`, `Toutes les promesses et pactes`, `L'offre de contracter`], `Le pacte de préférence est une notion **voisine** : à citer pour délimiter.`],
  [`L'obligation de délivrance`, `Son objet (chose, accessoires, conformité, art. 1604 s.), ses modalités (lieu, délai, frais) et ses sanctions`, [`La garantie des vices cachés`, `Toutes les obligations du vendeur`, `Le transfert de propriété`], `La **non-conformité** relève de la délivrance, le **vice** de la garantie : ne pas mélanger.`],
  [`La lésion dans la vente`, `La rescision pour lésion de plus des 7/12 dans la vente d'immeuble (art. 1674 s.), son domaine, ses conditions et ses effets`, [`Le prix vil ou dérisoire`, `Tous les vices du consentement`, `Le prix dans tous les contrats`], `Le prix **vil** est une **absence** de prix ; la **lésion** suppose un prix existant mais insuffisant.`],
  [`Vente et donation`, `Critères de distinction (prix sérieux, intention libérale), cas limites (vente à vil prix, donation déguisée) et enjeux de la qualification`, [`La vente, puis la donation, chacune dans une partie`, `Le droit des successions`, `La donation entre époux`], `Sujet « A et B » : **confronter** dans chaque partie.`],
  [`La formation de la vente`, `Les conditions de fond (consentement, chose, prix) et de forme de la vente`, [`Les effets de la vente`, `Le transfert de propriété uniquement`, `La formation du contrat en droit commun`], `« Formation » exclut les **effets** (propriété, risques, obligations).`],
  [`Le consentement de l'acheteur`, `La protection du consentement de l'acheteur : information, délais de réflexion et de rétractation, vices du consentement`, [`Le consentement en droit commun des contrats`, `Le consentement du vendeur`, `Les promesses de vente uniquement`], `Le sujet vise **l'acheteur** : centre-toi sur les règles qui protègent **son** consentement.`],
  [`La vente d'immeuble`, `Les règles propres à la vente immobilière : forme et publicité, avant-contrats, rétractation de l'acquéreur non professionnel, lésion, transfert de propriété et opposabilité`, [`La vente d'immeuble à construire uniquement`, `La copropriété`, `Le bail d'habitation`], `Ce qui compte : la **spécificité** de l'immeuble par rapport à la vente mobilière.`],
  [`Les garanties du vendeur`, `La garantie d'éviction et la garantie des vices cachés (art. 1625), voire la garantie légale de conformité du Code de la consommation`, [`L'obligation de délivrance`, `Les sûretés du vendeur impayé`, `Le cautionnement`], `Ambiguïté : « garanties **du** vendeur » = garanties **dues par** le vendeur (art. 1625). Les sûretés **au profit** du vendeur sont une autre lecture, à écarter en le disant.`],
  [`Droit commun et droit spécial de la vente`, `L'articulation entre droit commun des contrats et règles propres à la vente (art. 1105) : complément, dérogation, concurrence (vices cachés / erreur, délivrance / résolution)`, [`Le droit commun des contrats uniquement`, `L'histoire du Code civil`, `Le droit de la consommation`], `Sujet transversal : il porte sur la **relation** entre les deux corps de règles.`],
  [`La chose future`, `La vente de chose future (art. 1163) : validité, aléa, transfert de propriété différé, risques, exemple de la vente d'immeuble à construire`, [`La chose hors commerce`, `La promesse de vente`, `La chose de genre`], `Bien distinguer chose **future** (qui n'existe pas encore) et chose de **genre** (non individualisée).`]
]
};
