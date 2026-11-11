/* Épreuves type partiel : droit des biens.
   niveau : 'cours' (vu en cours), 'frontiere' (effleuré en cours), 'hors' (jamais vu en cours).
   lecture : étapes d'analyse du sujet (anti hors-sujet), ans = index de la bonne option. */
window.EPREUVES = window.EPREUVES || {};
EPREUVES.biens = {
sujets: [

/* ---------------------------------------------------------------- DISSERTATIONS */
{
  id: 'b-servitudes', type: 'diss', niveau: 'hors', theme: 'Servitudes', duree: '3 h',
  sujet: `Les servitudes`,
  kit: [
    `**Définition (art. 637)** : une servitude est une **charge imposée sur un héritage** (le fonds **servant**) pour l'usage et l'utilité d'un héritage appartenant à **un autre propriétaire** (le fonds **dominant**). C'est un **droit réel** (démembrement de la propriété) attaché aux fonds, pas aux personnes.`,
    `**Sources (art. 639)** : la situation naturelle des lieux (ex. écoulement des eaux, art. 640), la loi (ex. passage en cas d'**enclave**, art. 682) et les conventions entre propriétaires (art. 686).`,
    `**Limite des servitudes conventionnelles (art. 686)** : liberté, à condition que le service ne soit imposé **ni à la personne ni en faveur de la personne**, mais à un fonds et pour un fonds, et respecte l'ordre public. Une servitude ne peut donc pas consister **à titre principal** en une obligation de faire (seulement accessoirement, art. 698).`,
    `**Classifications** : continues / discontinues (art. 688 : besoin ou non du fait actuel de l'homme ; une vue est continue, un passage est discontinu) ; apparentes / non apparentes (art. 689 : ouvrages extérieurs ou non).`,
    `**Acquisition** : titre ; **usucapion trentenaire** seulement pour les servitudes **continues et apparentes** (art. 690) ; les autres ne s'établissent que par titre (art. 691) ; **destination du père de famille** (art. 692 à 694).`,
    `**Caractères** : accessoire du fonds (suit le fonds en cas de vente), en principe perpétuelle, et « nul n'a de servitude sur sa propre chose » (*nemini res sua servit*).`,
    `**Extinction** : impossibilité d'user (art. 703), **confusion** des deux fonds dans la même main (art. 705), **non-usage pendant trente ans** (art. 706).`,
    `**Lien avec ton cours** : la servitude est un démembrement de la propriété (art. 544) qui restreint l'**usus** du propriétaire du fonds servant (art. 701 : il ne peut rien faire qui diminue l'usage de la servitude).`
  ],
  lecture: [
    { q: `Le sujet est un seul mot au pluriel : « Les servitudes ». Que faut-il en déduire ?`, opts: [
      `C'est un sujet notionnel : il faut définir la servitude et couvrir l'ensemble (notion et régime), toutes catégories confondues`,
      `Il faut seulement traiter les servitudes conventionnelles, les seules qui posent problème`,
      `Il faut traiter tous les démembrements de la propriété (usufruit, servitudes, emphytéose)`,
      `Il faut faire un catalogue des articles 637 à 710 dans l'ordre du Code`],
      ans: 0, exp: `Un sujet « mot unique » est un sujet **notionnel** : on attend une définition précise, puis une démonstration (pas un catalogue). Le pluriel invite à couvrir **toutes** les servitudes (naturelles, légales, conventionnelles). Parler de l'usufruit en long serait **hors sujet**, on peut seulement l'évoquer en introduction pour situer la notion.` },
    { q: `Quel terme dois-tu absolument définir dans l'introduction ?`, opts: [
      `La servitude au sens de l'art. 637 : une charge imposée sur un fonds pour l'utilité d'un fonds appartenant à un autre propriétaire`,
      `La servitude au sens courant : l'état de dépendance d'une personne envers une autre`,
      `Les servitudes d'utilité publique du droit de l'urbanisme, qui sont le cœur du sujet`,
      `Le droit de propriété, puisque le sujet porte sur lui`],
      ans: 0, exp: `La définition juridique est celle de l'**art. 637**. Le sens courant (servitude = asservissement d'une personne) est justement **exclu** par l'art. 686 : on ne peut imposer une charge à une personne. Les servitudes administratives peuvent être signalées et **écartées** dans la délimitation (droit public).` },
    { q: `Quelle problématique répond vraiment au sujet ?`, opts: [
      `Comment le droit concilie-t-il la charge imposée à un fonds avec le caractère absolu du droit de propriété de son titulaire ?`,
      `Le droit de propriété est-il absolu ?`,
      `Quelles sont les conditions de l'usucapion ?`,
      `Pourquoi le voisinage crée-t-il des troubles ?`],
      ans: 0, exp: `« Le droit de propriété est-il absolu ? » est **un autre sujet** : en partant de là, tu écrirais une dissertation sur l'art. 544 avec un petit paragraphe sur les servitudes. La bonne problématique garde **la servitude au centre** et l'éclaire par la propriété.` },
    { q: `Quel plan est le plus solide ?`, opts: [
      `I. Une charge réelle sur le fonds servant (notion, sources) ; II. Une charge encadrée (constitution, exercice, extinction)`,
      `I. Le droit de propriété ; II. Les limites du droit de propriété`,
      `I. L'usufruit ; II. Les servitudes`,
      `I. Les servitudes en droit romain ; II. Les servitudes aujourd'hui`],
      ans: 0, exp: `Plan notion / régime, chaque partie parle de la **servitude**. Le plan B est une dissertation sur la propriété (hors sujet partiel), le plan C traite un autre sujet pour moitié, le plan D est historique : l'histoire va en accroche, pas dans le plan.` }
  ],
  defs: [`**Servitude** (art. 637)`, `**Fonds servant / fonds dominant**`, `**Droit réel** et **démembrement** de la propriété`],
  problematique: `En quoi la servitude, charge attachée à un fonds au profit d'un autre fonds, constitue-t-elle une restriction du droit de propriété strictement encadrée par la loi ?`,
  plan: [
    ['I. La servitude, une charge réelle grevant un fonds', [
      `A. Une notion définie par son caractère réel : charge d'un fonds pour un fonds (art. 637), prohibition des services imposés à la personne (art. 686), accessoire et perpétuité, *nemini res sua servit*`,
      `B. Des sources diverses : situation des lieux (art. 640), loi (enclave, art. 682), volonté des propriétaires (art. 686) ; classifications continues / discontinues, apparentes / non apparentes (art. 688-689)`]],
    ['II. La servitude, une charge encadrée', [
      `A. Une constitution contrôlée : titre, usucapion réservée aux servitudes continues et apparentes (art. 690-691), destination du père de famille (art. 692-694)`,
      `B. Un exercice et une extinction mesurés : obligations réciproques (art. 697, 698, 701), extinction par confusion (art. 705) ou non-usage trentenaire (art. 706)`]]
  ],
  hs: [
    `Faire une dissertation sur les **limites du droit de propriété** en général (abus de droit, voisinage…) avec les servitudes en simple exemple.`,
    `Glisser vers l'**usufruit** ou les **droits réels de jouissance spéciale** : on peut les citer pour comparer, pas les développer.`,
    `Traiter les **servitudes administratives** (urbanisme) : c'est du droit public, à écarter dans la délimitation.`
  ],
  points: [
    `J'ai défini la servitude avec l'art. 637 (fonds servant, fonds dominant, propriétaires différents)`,
    `J'ai qualifié la servitude de droit réel / démembrement de la propriété`,
    `J'ai cité les trois sources de l'art. 639`,
    `J'ai mentionné la limite de l'art. 686 (ni à la personne, ni en faveur de la personne)`,
    `J'ai distingué servitudes continues / discontinues et apparentes / non apparentes`,
    `J'ai expliqué que seules les servitudes continues et apparentes s'usucapent (art. 690-691)`,
    `J'ai cité au moins un mode d'extinction (non-usage 30 ans, confusion)`,
    `Mon plan parle de la servitude dans chaque partie, pas seulement de la propriété`
  ]
},

{
  id: 'b-usufruit', type: 'diss', niveau: 'hors', theme: 'Usufruit', duree: '3 h',
  sujet: `L'usufruitier`,
  kit: [
    `**Art. 578** : « L'usufruit est le droit de jouir des choses dont un autre a la propriété, comme le propriétaire lui-même, mais à la charge d'en conserver la substance. » Démembrement : l'usufruitier a l'**usus** et le **fructus**, le **nu-propriétaire** garde l'**abusus**.`,
    `**Sources (art. 579)** : la loi (ex. usufruit du conjoint survivant) ou la volonté (donation, testament, vente avec réserve d'usufruit).`,
    `**Droits** : tous les fruits (art. 582), les fruits civils s'acquièrent jour par jour (art. 586) ; il peut jouir lui-même, louer, céder son droit (art. 595), mais un **bail rural ou commercial** exige le concours du nu-propriétaire (art. 595 al. 4).`,
    `**Quasi-usufruit (art. 587)** : sur des choses consomptibles (argent), l'usufruitier peut les consommer et doit rendre l'équivalent à la fin.`,
    `**Obligations** : inventaire et caution au départ (art. 600-601) ; **entretien** à sa charge (art. 605) ; **grosses réparations** (gros murs, voûtes, toiture entière) à la charge du nu-propriétaire (art. 606) ; jouir en bon père de famille, devenu « raisonnablement » (art. 601).`,
    `**Extinction (art. 617)** : mort de l'usufruitier (droit **viager**), terme, consolidation, non-usage trente ans, perte totale ; **abus de jouissance** (art. 618) ; usufruit d'une personne morale limité à **30 ans** (art. 619).`,
    `**Ne pas confondre** : le locataire a un **droit personnel** contre le bailleur, l'usufruitier un **droit réel** sur la chose.`
  ],
  lecture: [
    { q: `Le sujet est « L'usufruitier » et non « L'usufruit ». Qu'est-ce que ça change ?`, opts: [
      `Le sujet est centré sur la personne : ses droits, ses obligations, sa situation face au nu-propriétaire`,
      `Rien, c'est exactement le même sujet`,
      `Il faut parler uniquement de l'extinction de l'usufruit`,
      `Il faut traiter du nu-propriétaire en priorité`],
      ans: 0, exp: `Un sujet qui vise **une personne** (l'usufruitier, le possesseur, l'acheteur…) appelle un plan sur ses **prérogatives** et ses **charges** (ou sa protection). Le régime de l'usufruit est mobilisé, mais toujours vu **depuis l'usufruitier**. Traiter longuement le nu-propriétaire déporterait le sujet.` },
    { q: `Quelle comparaison est utile en introduction pour situer l'usufruitier ?`, opts: [
      `Le propriétaire (il jouit « comme lui ») et le locataire (lui a un simple droit personnel)`,
      `Le possesseur de mauvaise foi`,
      `Le créancier chirographaire`,
      `L'acheteur d'un bien meuble`],
      ans: 0, exp: `L'art. 578 compare l'usufruitier au **propriétaire** ; la comparaison avec le **locataire** montre l'intérêt de la nature **réelle** de son droit. Ce sont des comparaisons de délimitation, pas des parties de plan.` },
    { q: `Quel plan colle le mieux au sujet ?`, opts: [
      `I. Un titulaire de prérogatives proches de celles du propriétaire ; II. Un titulaire tenu de conserver la substance au profit du nu-propriétaire`,
      `I. Le droit de propriété ; II. Ses démembrements`,
      `I. L'usufruit légal ; II. L'usufruit conventionnel`,
      `I. Les fruits ; II. Les produits`],
      ans: 0, exp: `Le plan A suit la définition de l'art. 578 (« comme le propriétaire lui-même, mais à la charge d'en conserver la substance ») : idéal. Le plan C est descriptif et oublie les obligations, le plan B est un autre sujet.` }
  ],
  defs: [`**Usufruitier** (art. 578)`, `**Nu-propriétaire**`, `**Démembrement**, **fruits / produits**`],
  problematique: `L'usufruitier, qui jouit de la chose « comme le propriétaire lui-même », n'est-il pas en réalité un simple gardien temporaire de la substance d'un bien qui ne lui appartient pas ?`,
  plan: [
    ['I. Un quasi-propriétaire : les prérogatives de l\'usufruitier', [
      `A. L'usage et la jouissance de la chose : usus et fructus, tous les fruits (art. 582, 586), quasi-usufruit sur les choses consomptibles (art. 587)`,
      `B. Un droit réel dont il peut disposer : cession, location (art. 595), limites (bail rural ou commercial avec le nu-propriétaire)`]],
    ['II. Un gardien de la substance : les charges de l\'usufruitier', [
      `A. Des obligations de conservation : inventaire, caution (art. 600-601), entretien (art. 605) mais grosses réparations au nu-propriétaire (art. 606)`,
      `B. Un droit temporaire et révocable : caractère viager, extinction (art. 617), déchéance pour abus de jouissance (art. 618), 30 ans pour une personne morale (art. 619)`]]
  ],
  hs: [
    `Faire une dissertation sur **le démembrement de propriété** en général, ou sur le **nu-propriétaire**.`,
    `Réciter **les attributs du droit de propriété** (usus, fructus, abusus) sans les rattacher à l'usufruitier.`,
    `Développer le **droit des successions** (usufruit du conjoint survivant) : une phrase en exemple suffit.`
  ],
  points: [
    `J'ai cité et exploité l'art. 578`,
    `J'ai expliqué le démembrement : usus + fructus pour l'usufruitier, abusus pour le nu-propriétaire`,
    `J'ai parlé du droit aux fruits (art. 582) et du quasi-usufruit (art. 587)`,
    `J'ai distingué entretien (art. 605) et grosses réparations (art. 606)`,
    `J'ai mentionné le caractère viager et les causes d'extinction (art. 617)`,
    `J'ai comparé l'usufruitier au locataire (droit réel / droit personnel)`,
    `Chaque partie est construite autour de la personne de l'usufruitier`
  ]
},

{
  id: 'b-voisinage', type: 'diss', niveau: 'hors', theme: 'Troubles du voisinage', duree: '3 h',
  sujet: `Les troubles anormaux du voisinage`,
  kit: [
    `**Origine prétorienne** : la Cour de cassation a posé le principe autonome selon lequel « **nul ne doit causer à autrui un trouble anormal de voisinage** » (Civ. 2e, 19 nov. 1986). C'est une **responsabilité sans faute** : seul compte le caractère **anormal** du trouble.`,
    `**Consécration légale** : la loi du **15 avril 2024** a créé l'**art. 1253** du Code civil. Le propriétaire, le locataire, l'occupant (même sans titre), le maître d'ouvrage… à l'origine d'un trouble **excédant les inconvénients normaux de voisinage** est **responsable de plein droit** du dommage qui en résulte.`,
    `**Exonération d'antériorité** (art. 1253 al. 2) : pas de responsabilité si le trouble provient d'activités **antérieures** à l'installation de la victime, **conformes aux lois et règlements**, et poursuivies **sans aggravation**. C'est l'ancienne règle de la « **préoccupation** » (anc. art. L. 113-8 CCH).`,
    `**Appréciation de l'anormalité** : in concreto (lieu, ville ou campagne, heure, intensité, durée, répétition). La loi du 29 janv. 2021 protège en outre le « **patrimoine sensoriel des campagnes** » (coqs, cloches…).`,
    `**À distinguer de l'abus de droit** : l'abus suppose une **faute** du propriétaire, une intention de nuire (CA Colmar, 2 mai 1855, fausse cheminée ; Req., 3 août 1915, **Clément-Bayard**, piques sur une palissade pour crever des ballons dirigeables).`,
    `**Sanctions** : dommages-intérêts, mais aussi mesures pour faire **cesser** le trouble (travaux d'isolation, horaires, voire fermeture).`,
    `**Lien avec ton cours** : c'est une limite à l'**usus** du propriétaire (art. 544 : « pourvu qu'on n'en fasse pas un usage prohibé ») et elle peut aussi viser un possesseur ou un occupant.`
  ],
  lecture: [
    { q: `Quel mot du sujet est décisif ?`, opts: [
      `« Anormaux » : seul le trouble qui dépasse les inconvénients normaux du voisinage est sanctionné`,
      `« Les » : il faut faire une liste de tous les troubles possibles (bruit, odeur, fumée…)`,
      `« Voisinage » : il faut traiter des relations de voisinage en général, y compris les servitudes et la mitoyenneté`,
      `Aucun, tous les mots se valent`],
      ans: 0, exp: `L'adjectif **« anormaux »** porte toute la notion : il n'y a pas de responsabilité pour un trouble normal, et il n'y a pas besoin de faute pour un trouble anormal. Parler de toutes les relations de voisinage (servitudes, mitoyenneté, clôture) serait **trop large**.` },
    { q: `Ton cours de responsabilité civile te tend les bras. Que fais-tu de l'art. 1240 ?`, opts: [
      `Je le cite pour montrer que la théorie s'en est détachée : pas besoin de faute, le régime est autonome (art. 1253)`,
      `J'en fais ma partie I : la faute, le dommage, le lien de causalité`,
      `Je n'en parle pas du tout, c'est un autre cours`,
      `J'explique que les troubles de voisinage sont une application de l'art. 1240`],
      ans: 0, exp: `Piège classique : transformer le sujet en dissertation de **responsabilité pour faute**. L'art. 1240 sert de **contrepoint** : la jurisprudence a construit un principe autonome, sans faute, désormais codifié à l'**art. 1253**.` },
    { q: `Quelle problématique choisis-tu ?`, opts: [
      `Comment le droit a-t-il construit une responsabilité sans faute pour concilier les droits concurrents de propriétaires voisins ?`,
      `Le droit de propriété est-il absolu ?`,
      `Les nuisances sonores sont-elles un problème de santé publique ?`,
      `Faut-il supprimer l'abus de droit ?`],
      ans: 0, exp: `La bonne problématique part de la **tension** propre au sujet : deux propriétaires exercent chacun leur droit, il faut arbitrer sans exiger de faute. Les autres questions sont trop larges ou à côté.` }
  ],
  defs: [`**Trouble anormal** (excédant les inconvénients normaux)`, `**Voisin** (notion large : propriétaire, locataire, occupant, constructeur)`, `**Responsabilité de plein droit**`],
  problematique: `Comment le droit concilie-t-il les droits concurrents de propriétaires voisins en sanctionnant, sans exiger de faute, le seul trouble qui excède la mesure ?`,
  plan: [
    ['I. Une responsabilité autonome, détachée de la faute', [
      `A. Une construction jurisprudentielle : dépassement de l'abus de droit (Colmar 1855, Clément-Bayard 1915), principe autonome (Civ. 2e, 19 nov. 1986)`,
      `B. Une consécration légale : l'art. 1253 (loi du 15 avr. 2024), responsabilité de plein droit, cercle large des responsables`]],
    ['II. Une responsabilité mesurée par l\'anormalité', [
      `A. L'appréciation de l'anormalité : critères in concreto, patrimoine sensoriel des campagnes (loi 2021)`,
      `B. Les tempéraments : exonération d'antériorité (activité préexistante, conforme, sans aggravation) et sanctions graduées (réparation, cessation)`]]
  ],
  hs: [
    `Écrire une dissertation de **responsabilité délictuelle** (faute, dommage, causalité).`,
    `Faire une liste de nuisances (bruit, odeurs, ombre…) sans démonstration.`,
    `Élargir à toutes les **relations de voisinage** (servitudes, mitoyenneté, bornage).`,
    `Oublier la loi de **2024** et l'**art. 1253** : c'est l'actualité du sujet.`
  ],
  points: [
    `J'ai défini le trouble anormal (excède les inconvénients normaux de voisinage)`,
    `J'ai cité le principe « nul ne doit causer à autrui un trouble anormal de voisinage »`,
    `J'ai expliqué que la responsabilité est sans faute (de plein droit)`,
    `J'ai cité l'art. 1253 issu de la loi du 15 avril 2024`,
    `J'ai distingué trouble anormal et abus de droit (Clément-Bayard)`,
    `J'ai présenté l'exonération d'antériorité et ses trois conditions`,
    `J'ai rattaché le sujet à l'art. 544 (limite à l'exercice du droit de propriété)`
  ]
},

{
  id: 'b-indivision', type: 'diss', niveau: 'hors', theme: 'Indivision', duree: '3 h',
  sujet: `L'indivision, une propriété collective ?`,
  kit: [
    `**Définition** : situation où **plusieurs personnes** sont titulaires de droits de même nature sur **un même bien** (ou une masse de biens), sans division matérielle : chacun a une **quote-part abstraite** (ex. 1/2, 1/3). Sources fréquentes : succession, achat à deux, divorce.`,
    `**Art. 815** : « **Nul ne peut être contraint à demeurer dans l'indivision** et le partage peut toujours être provoqué, à moins qu'il n'y ait été sursis par jugement ou convention. » L'indivision est vue comme **précaire**.`,
    `**Gestion (art. 815-2 et 815-3)** : un indivisaire seul peut faire les actes **conservatoires** ; les actes d'**administration** (baux d'habitation, vente de meubles pour payer les dettes, mandat général) se prennent à la **majorité des 2/3** des droits indivis ; les autres actes de **disposition** exigent l'**unanimité**.`,
    `**Assouplissement (art. 815-5-1)** : les indivisaires à 2/3 peuvent demander au tribunal d'autoriser la **vente** d'un bien indivis.`,
    `**Jouissance (art. 815-9)** : chacun use des biens conformément à leur destination ; celui qui jouit seul doit une **indemnité d'occupation**. Les fruits accroissent à l'indivision (art. 815-10).`,
    `**Cession d'une quote-part à un tiers** : les coïndivisaires ont un **droit de préemption** (art. 815-14). Les créanciers personnels d'un indivisaire ne peuvent saisir sa part, mais peuvent provoquer le partage (art. 815-17).`,
    `**Indivision conventionnelle (art. 1873-1 s.)** : une convention peut organiser l'indivision (durée déterminée de 5 ans max renouvelable, ou indéterminée) : l'indivision devient **organisée**.`,
    `**Débat sur la nature** : thèse classique = **juxtaposition de droits de propriété** sur des quotes-parts ; thèse moderne = **propriété collective** sur le bien entier. À ne pas confondre avec la **copropriété des immeubles bâtis** (loi du 10 juill. 1965), qui combine propriété privative et parties communes et ne connaît pas de droit au partage.`
  ],
  lecture: [
    { q: `Le sujet se termine par un point d'interrogation. Que t'impose-t-il ?`, opts: [
      `De répondre à la question posée : l'indivision est-elle, ou non, une propriété collective ? La réponse doit structurer le plan`,
      `Rien de particulier, je décris l'indivision`,
      `De répondre « oui » obligatoirement`,
      `De ne pas faire de plan`],
      ans: 0, exp: `Une **question** dans le sujet exige une **réponse** et donc une thèse. Décrire le régime de l'indivision sans jamais dire si c'est une « propriété collective », c'est **ne pas traiter le sujet**. La réponse est souvent nuancée : « oui, mais » ou « non, mais ».` },
    { q: `Que signifie « propriété collective » ici ?`, opts: [
      `Un droit de propriété exercé ensemble par plusieurs personnes sur un même bien, par opposition à la propriété individuelle et exclusive de l'art. 544`,
      `La propriété publique de l'État`,
      `La copropriété des immeubles bâtis uniquement`,
      `Le communisme`],
      ans: 0, exp: `La notion se définit **par contraste** avec le modèle de l'art. 544 : une propriété **individuelle** et **exclusive**. Le sujet demande si l'indivision échappe à ce modèle. La copropriété de 1965 est une notion voisine, à **délimiter**, pas à traiter.` },
    { q: `Quel plan répond à la question ?`, opts: [
      `I. Une propriété collective dans son exercice (gestion à la majorité, jouissance commune) ; II. Une propriété individuelle dans son essence (quote-part de chacun, droit au partage)`,
      `I. Les sources de l'indivision ; II. Le partage`,
      `I. L'indivision ; II. La copropriété`,
      `I. La propriété individuelle ; II. La possession`],
      ans: 0, exp: `Le plan A répond « oui, mais » / « non, mais » : c'est une démonstration. Le plan B est descriptif (il ne répond pas à la question), le plan C mélange deux sujets.` }
  ],
  defs: [`**Indivision**, **quote-part**`, `**Propriété collective** vs propriété individuelle et exclusive (art. 544)`, `**Partage**`],
  problematique: `L'indivision, qui fait coexister plusieurs droits sur un même bien, réalise-t-elle une véritable propriété collective ou reste-t-elle une addition de propriétés individuelles ?`,
  plan: [
    ['I. Une propriété collective dans son exercice', [
      `A. Une gestion commune : actes conservatoires, majorité des 2/3, unanimité (art. 815-2, 815-3), vente autorisée (art. 815-5-1)`,
      `B. Une jouissance partagée : usage selon la destination, indemnité d'occupation (art. 815-9), fruits à l'indivision (art. 815-10), indivision conventionnelle (art. 1873-1 s.)`]],
    ['II. Une propriété individuelle dans son essence', [
      `A. Le droit de chacun sur sa quote-part : cession possible, préemption des coïndivisaires (art. 815-14), créanciers personnels (art. 815-17)`,
      `B. La vocation au partage : « nul ne peut être contraint à demeurer dans l'indivision » (art. 815), l'indivision comme état transitoire`]]
  ],
  hs: [
    `Traiter la **copropriété des immeubles bâtis** (loi de 1965) au même niveau que l'indivision.`,
    `Faire un exposé de **droit des successions** (qui hérite, réserve…).`,
    `Décrire le régime sans **jamais répondre** à la question « propriété collective ? ».`
  ],
  points: [
    `J'ai défini l'indivision (plusieurs titulaires, même bien, quotes-parts)`,
    `J'ai défini la propriété collective par opposition à l'art. 544`,
    `J'ai cité l'art. 815 (droit au partage)`,
    `J'ai exposé les règles de majorité de l'art. 815-3 (conservatoire / 2/3 / unanimité)`,
    `J'ai parlé de l'indemnité d'occupation (art. 815-9)`,
    `J'ai mentionné l'indivision conventionnelle`,
    `J'ai distingué indivision et copropriété des immeubles bâtis`,
    `Ma conclusion répond clairement à la question posée`
  ]
},

{
  id: 'b-corps', type: 'diss', niveau: 'hors', theme: 'Corps humain', duree: '3 h',
  sujet: `Le corps humain est-il une chose ?`,
  kit: [
    `**Summa divisio personnes / choses** : la personne est **sujet** de droits, la chose est **objet** de droits. Le corps humain, support de la personne, est classiquement rangé du côté de la **personne**.`,
    `**Art. 16-1** (lois de bioéthique du 29 juillet 1994) : « Chacun a droit au respect de son corps. Le corps humain est inviolable. Le corps humain, ses éléments et ses produits **ne peuvent faire l'objet d'un droit patrimonial**. »`,
    `**Art. 16-3** : atteinte à l'intégrité seulement en cas de **nécessité médicale** (ou dans l'intérêt thérapeutique d'autrui) avec consentement. **Art. 16-5** : les conventions qui confèrent une **valeur patrimoniale** au corps sont **nulles**. **Art. 16-6** : pas de rémunération pour le don. **Art. 16-7** : nullité de la gestation pour autrui.`,
    `**Éléments détachés** (sang, organes, gamètes, cheveux) : ils deviennent des choses, mais **hors commerce juridique** au sens patrimonial : don **gratuit** et **anonyme**.`,
    `**Le cadavre** : art. **16-1-1** (loi du 19 déc. 2008) : le respect dû au corps humain **ne cesse pas avec la mort** ; les restes doivent être traités avec respect, dignité et décence. Civ. 1re, 16 sept. 2010 : interdiction d'une exposition commerciale de cadavres (« Our Body »).`,
    `**Prothèses** : un objet (une chose) incorporé au corps est assimilé à la personne tant qu'il y est intégré.`,
    `**Lien avec ton cours** : la notion de **chose** et de **bien** (chose appropriable ayant une valeur), les **choses hors commerce**. Le sujet teste ta maîtrise de la frontière entre chose et bien.`
  ],
  lecture: [
    { q: `Le sujet mobilise une catégorie de ton cours. Laquelle ?`, opts: [
      `La notion de chose (et de bien) étudiée en introduction : objet de droit, appropriable ou non`,
      `La possession`,
      `L'usucapion`,
      `Le transfert de propriété`],
      ans: 0, exp: `C'est l'exemple type du sujet « hors cours » qui **s'appuie sur une notion du cours** : chose / bien / personne, choses hors commerce. Repars toujours de tes **définitions de base** quand le thème ne te dit rien.` },
    { q: `Quelle délimitation est pertinente ?`, opts: [
      `Envisager le corps vivant, ses éléments détachés et le cadavre, sous l'angle civil (qualification de chose ou non)`,
      `Ne parler que de la GPA, sujet d'actualité`,
      `Traiter du droit pénal des atteintes à l'intégrité physique`,
      `Parler de la vie privée et du droit à l'image`],
      ans: 0, exp: `Le sujet porte sur la **qualification** du corps. La GPA, le droit pénal ou la vie privée sont des exemples ou des voisins : tu peux citer l'art. 16-7, pas y consacrer une partie.` },
    { q: `Quelle réponse structure le mieux le plan ?`, opts: [
      `Non tant qu'il est le corps d'une personne vivante ; il devient une chose une fois détaché ou après la mort, mais une chose hors commerce, protégée par la dignité`,
      `Oui, c'est un bien comme un autre`,
      `Non, et il n'y a rien d'autre à dire`,
      `Ça dépend des pays`],
      ans: 0, exp: `Une réponse **nuancée** et **articulée** donne naturellement les deux parties : I. Le corps de la personne, une non-chose ; II. Le corps détaché ou défunt, une chose hors commerce.` }
  ],
  defs: [`**Chose** / **bien** / **personne**`, `**Corps humain**, éléments et produits`, `**Hors commerce** (non-patrimonialité)`],
  problematique: `Le corps humain, indissociable de la personne, peut-il être saisi par le droit comme un objet, et à quelles conditions ?`,
  plan: [
    ['I. Le corps de la personne vivante : une non-chose', [
      `A. Le corps, siège de la personne : summa divisio personnes / choses, inviolabilité (art. 16-1, 16-3)`,
      `B. L'exclusion de toute patrimonialité : nullité des conventions (art. 16-5), GPA (art. 16-7), prothèses intégrées à la personne`]],
    ['II. Le corps détaché ou défunt : une chose hors du commerce', [
      `A. Les éléments et produits détachés : des choses soumises à la gratuité et à l'anonymat (art. 16-6)`,
      `B. Le cadavre : une chose protégée par la dignité (art. 16-1-1, Civ. 1re, 16 sept. 2010)`]]
  ],
  hs: [
    `Écrire sur la **dignité humaine** ou les **droits de la personnalité** en général.`,
    `Faire un exposé de **bioéthique** ou de **droit pénal**.`,
    `Oublier de définir **chose** et **bien**, alors que c'est ta notion de cours.`
  ],
  points: [
    `J'ai rappelé la distinction personnes / choses`,
    `J'ai défini chose et bien (appropriation, valeur)`,
    `J'ai cité l'art. 16-1 (non-patrimonialité)`,
    `J'ai cité l'art. 16-5 (nullité des conventions patrimoniales)`,
    `J'ai traité les éléments détachés (don gratuit, anonyme)`,
    `J'ai traité le cadavre (art. 16-1-1)`,
    `J'ai répondu à la question posée, de façon nuancée`
  ]
},

{
  id: 'b-pi', type: 'diss', niveau: 'hors', theme: 'Propriété intellectuelle', duree: '3 h',
  sujet: `La propriété intellectuelle est-elle une propriété ?`,
  kit: [
    `**Biens incorporels** : choses sans existence matérielle (œuvres, inventions, marques, fonds de commerce, créances). La propriété intellectuelle porte sur des **créations de l'esprit**.`,
    `**Art. L. 111-1 CPI** : l'auteur jouit sur son œuvre, **du seul fait de sa création**, d'un « **droit de propriété incorporelle exclusif et opposable à tous** », qui comporte des attributs **moraux** et **patrimoniaux**.`,
    `**Reconnaissance au plus haut niveau** : le Conseil constitutionnel rattache les droits de propriété intellectuelle au droit de propriété (déc. n° 2006-540 DC du 27 juill. 2006) ; la CEDH y voit des « **biens** » protégés par l'art. 1er du Protocole n° 1 (Anheuser-Busch c/ Portugal, 11 janv. 2007, à propos d'une marque).`,
    `**Ressemblances avec l'art. 544** : droit **exclusif**, **opposable à tous**, comportant usage, exploitation (fruits = redevances) et disposition (cession, licence) ; sanction par l'action en **contrefaçon** (équivalent de la revendication).`,
    `**Différences** : droit **temporaire** (droit d'auteur : 70 ans après la mort ; brevet : 20 ans ; marque : 10 ans renouvelables), alors que la propriété est perpétuelle ; **droit moral** perpétuel, inaliénable et imprescriptible (art. L. 121-1 CPI) ; bien **non rival** (plusieurs peuvent l'utiliser en même temps) ; **pas de possession** au sens du Code civil ni d'art. 2276 pour les meubles incorporels.`,
    `**Lien avec ton cours** : les **caractères** du droit de propriété (absolu, exclusif, perpétuel) et la distinction **meubles corporels / incorporels** (l'art. 2276 ne joue que pour les meubles corporels).`
  ],
  lecture: [
    { q: `Que faut-il comparer pour répondre ?`, opts: [
      `Les caractères et attributs de la propriété (art. 544 : absolu, exclusif, perpétuel ; usus, fructus, abusus) avec ceux des droits de propriété intellectuelle`,
      `Le droit d'auteur et le droit des brevets entre eux`,
      `Le droit français et le droit américain`,
      `La propriété intellectuelle et le droit de la concurrence`],
      ans: 0, exp: `Le sujet est une **qualification** : la PI entre-t-elle dans la catégorie « propriété » ? La méthode est de **confronter les critères** de la catégorie (cours) aux caractéristiques de la notion (kit).` },
    { q: `Tu ne connais pas le Code de la propriété intellectuelle. Que fais-tu ?`, opts: [
      `Je construis le raisonnement avec ce que je maîtrise (art. 544, caractères de la propriété, meubles incorporels) et j'utilise les quelques éléments de PI connus comme exemples`,
      `Je remplace le sujet par une dissertation sur l'art. 544`,
      `Je rends copie blanche`,
      `J'invente des articles du CPI`],
      ans: 0, exp: `**Ne jamais remplacer le sujet par un sujet voisin maîtrisé** : c'est exactement le hors-sujet. Utilise ton cours **comme outil** au service de la question posée, et reste honnête : ne cite pas d'article dont tu n'es pas sûre.` },
    { q: `Quel plan répond à la question ?`, opts: [
      `I. Une propriété par sa structure (exclusivité, opposabilité, utilités) ; II. Une propriété singulière par son objet (temporaire, droit moral, non-rivalité, pas de possession)`,
      `I. Le droit d'auteur ; II. Les brevets et marques`,
      `I. L'histoire de la PI ; II. La PI aujourd'hui`,
      `I. Les attributs de la propriété ; II. Les caractères de la propriété`],
      ans: 0, exp: `Le plan A répond « oui, mais » à la question. Le plan B est une présentation des branches de la PI (descriptif) et le plan D une dissertation sur l'art. 544 : hors sujet.` }
  ],
  defs: [`**Propriété** (art. 544 : caractères et attributs)`, `**Propriété intellectuelle** (créations de l'esprit)`, `**Bien incorporel**`],
  problematique: `Les droits sur les créations de l'esprit, qualifiés de « propriété » par la loi, présentent-ils réellement les caractères du droit de propriété du Code civil ?`,
  plan: [
    ['I. Une propriété par sa structure', [
      `A. Une qualification consacrée : art. L. 111-1 CPI, Conseil constitutionnel 2006, CEDH 2007`,
      `B. Un droit exclusif et opposable à tous : usage, exploitation, disposition (cession, licence), action en contrefaçon`]],
    ['II. Une propriété singulière par son objet', [
      `A. Un droit temporaire et doublé d'un droit moral : durées limitées, droit moral perpétuel et inaliénable`,
      `B. Un bien immatériel rebelle au droit commun des biens : non-rivalité, inapplicabilité de la possession et de l'art. 2276`]]
  ],
  hs: [
    `Faire une dissertation sur **l'art. 544** sans parler de PI.`,
    `Faire un **catalogue** des droits de PI (auteur, brevets, marques, dessins…).`,
    `Ne **pas répondre** à la question « est-elle une propriété ? ».`
  ],
  points: [
    `J'ai défini la propriété avec l'art. 544 (caractères et attributs)`,
    `J'ai défini la propriété intellectuelle et les biens incorporels`,
    `J'ai cité l'art. L. 111-1 CPI ou à défaut la qualification légale de « propriété incorporelle »`,
    `J'ai montré les points communs (exclusivité, opposabilité, utilités)`,
    `J'ai montré les différences (temporaire, droit moral, non-rivalité)`,
    `J'ai rattaché à l'art. 2276 (meubles corporels seulement)`,
    `J'ai répondu clairement à la question`
  ]
},

{
  id: 'b-possesseur', type: 'diss', niveau: 'cours', theme: 'Possession', duree: '3 h',
  sujet: `Le possesseur de bonne foi`,
  kit: [
    `Sujet **au programme** : relis les fiches du titre 2 (possession) et du chapitre sur l'acquisition. L'enjeu ici est la **lecture du sujet**, pas la connaissance.`,
    `**Bonne foi (art. 550)** : le possesseur est de bonne foi quand il possède comme propriétaire **en vertu d'un titre translatif de propriété dont il ignore les vices** ; il cesse de l'être quand il les connaît. **Art. 2274** : la bonne foi est **présumée**. **Art. 2275** : il suffit qu'elle ait existé au moment de l'acquisition (pour l'usucapion).`,
    `**Avantages** : il fait les **fruits** siens (art. 549) ; usucapion **abrégée** de **10 ans** avec juste titre (art. 2272 al. 2) ; acquisition **immédiate** des meubles corporels (art. 2276) ; constructions sur le terrain d'autrui (art. 555 al. 4).`
  ],
  lecture: [
    { q: `Quel est le piège principal de ce sujet ?`, opts: [
      `Réciter tout le cours sur la possession (corpus, animus, vices) alors que le sujet porte sur la bonne foi et ses effets`,
      `Parler de la bonne foi`,
      `Citer l'art. 2276`,
      `Faire un plan en deux parties`],
      ans: 0, exp: `C'est le **hors-sujet par récitation** : on reconnaît un mot (« possesseur ») et on déroule le chapitre entier. Corpus et animus vont **en introduction** (pour définir le possesseur), le cœur du devoir est la **bonne foi** et ce qu'elle apporte.` },
    { q: `Quelle problématique ?`, opts: [
      `Pourquoi et comment le droit récompense-t-il la croyance légitime du possesseur en son droit ?`,
      `Qu'est-ce que la possession ?`,
      `La possession est-elle un fait ou un droit ?`,
      `Quels sont les vices de la possession ?`],
      ans: 0, exp: `Les autres questions sont celles d'**autres sujets** (« La possession », « Possession et vices »). La bonne problématique contient l'idée de **bonne foi** et de ses **effets**.` }
  ],
  defs: [`**Possesseur** (corpus + animus, art. 2255)`, `**Bonne foi** (art. 550, présomption de l'art. 2274)`],
  problematique: `Pourquoi et comment le droit récompense-t-il la croyance légitime du possesseur en son droit ?`,
  plan: [
    ['I. La qualité de possesseur de bonne foi', [
      `A. Une croyance légitime : définition de l'art. 550, juste titre, ignorance des vices`,
      `B. Une croyance présumée et appréciée au bon moment : art. 2274, art. 2275, perte de la bonne foi`]],
    ['II. Les faveurs accordées au possesseur de bonne foi', [
      `A. L'acquisition des fruits (art. 549) et l'indemnisation des constructions (art. 555)`,
      `B. L'acquisition accélérée de la propriété : usucapion de 10 ans (art. 2272 al. 2) et art. 2276 pour les meubles`]]
  ],
  hs: [
    `Dérouler tout le chapitre sur la **possession** (corpus, animus, vices, actions).`,
    `Parler de la **bonne foi contractuelle** (art. 1104) : même mot, autre notion.`
  ],
  points: [
    `J'ai défini le possesseur (corpus + animus) brièvement en introduction`,
    `J'ai cité l'art. 550 (titre translatif, ignorance des vices)`,
    `J'ai cité la présomption de l'art. 2274`,
    `J'ai traité les fruits (art. 549)`,
    `J'ai traité l'usucapion abrégée (art. 2272 al. 2) et l'art. 2276`,
    `Je n'ai pas récité les vices de la possession en détail`
  ]
},

/* ---------------------------------------------------------------- COMMENTAIRES */
{
  id: 'b-art544', type: 'comm', niveau: 'cours', theme: 'Propriété', duree: '3 h',
  sujet: `Commentez l'article 544 du Code civil.`,
  doc: `**Article 544 du Code civil** : « La propriété est le droit de jouir et disposer des choses de la manière la plus absolue, pourvu qu'on n'en fasse pas un usage prohibé par les lois ou par les règlements. »`,
  kit: [
    `Sujet **au programme** (chapitre sur les attributs). L'enjeu est la **méthode** du commentaire d'article : on commente **le texte**, ses mots, sa structure, pas tout le droit des biens.`,
    `**Méthode** : contexte (Code civil de 1804, rédaction inchangée, Déclaration de 1789 art. 2 et 17) ; analyse des termes (« droit », « jouir », « disposer », « choses », « la plus absolue », « pourvu que », « lois », « règlements ») ; structure du texte (un principe + une réserve) ; portée (jurisprudence : abus de droit, troubles du voisinage, empiétement et art. 545).`
  ],
  lecture: [
    { q: `Quelle est la structure du texte, qui doit guider ton plan ?`, opts: [
      `Un principe (droit de jouir et disposer de la manière la plus absolue) suivi d'une réserve (« pourvu qu'on n'en fasse pas un usage prohibé »)`,
      `Une liste de trois attributs : usus, fructus, abusus`,
      `Une définition de la possession`,
      `Une règle de preuve`],
      ans: 0, exp: `L'article est construit en **deux temps** reliés par « pourvu que » : c'est ton plan naturel. Les mots usus / fructus / abusus **ne figurent pas** dans le texte : on les tire de « jouir » et « disposer ».` },
    { q: `Que ne faut-il surtout pas faire ?`, opts: [
      `Paraphraser chaque mot, ou à l'inverse écrire une dissertation sur la propriété en oubliant le texte`,
      `Citer le texte`,
      `Analyser « la plus absolue »`,
      `Parler de l'abus de droit dans la portée`],
      ans: 0, exp: `Les deux écueils du commentaire : la **paraphrase** (répéter le texte) et la **dissertation déguisée** (oublier le texte). Chaque sous-partie doit **partir d'un mot** de l'article.` }
  ],
  defs: [`**Propriété**`, `**Jouir / disposer**`, `**« De la manière la plus absolue »**`],
  problematique: `Comment l'article 544 concilie-t-il l'affirmation d'un droit « le plus absolu » avec la soumission de son usage aux lois et règlements ?`,
  plan: [
    ['I. L\'affirmation d\'un droit absolu', [
      `A. Le contenu du droit : « jouir et disposer » (usus, fructus, abusus)`,
      `B. L'intensité du droit : « de la manière la plus absolue » (caractère absolu, exclusif, perpétuel ; héritage de 1789)`]],
    ['II. La relativisation d\'un droit encadré', [
      `A. La réserve légale : « usage prohibé par les lois ou par les règlements » (urbanisme, environnement, expropriation)`,
      `B. Les limites jurisprudentielles au-delà du texte : abus de droit, troubles anormaux du voisinage (aujourd'hui art. 1253)`]]
  ],
  hs: [
    `Faire une dissertation « Le droit de propriété » sans jamais citer les mots du texte.`,
    `Paraphraser l'article ligne à ligne sans analyse.`,
    `Développer la possession ou l'usucapion.`
  ],
  points: [
    `J'ai situé le texte (1804, Déclaration de 1789)`,
    `J'ai analysé « jouir » et « disposer »`,
    `J'ai analysé « la plus absolue »`,
    `J'ai analysé la réserve « pourvu que »`,
    `J'ai montré la portée jurisprudentielle (abus de droit, voisinage)`,
    `Mon plan suit la structure du texte`
  ]
},

{
  id: 'b-art515-14', type: 'comm', niveau: 'frontiere', theme: 'Animaux', duree: '3 h',
  sujet: `Commentez l'article 515-14 du Code civil.`,
  doc: `**Article 515-14 du Code civil** (loi du 16 février 2015) : « Les animaux sont des êtres vivants doués de sensibilité. Sous réserve des lois qui les protègent, les animaux sont soumis au régime des biens. »`,
  kit: [
    `**Contexte** : loi du **16 février 2015**. Avant, les animaux n'apparaissaient que comme des **meubles** (art. 528 : « les animaux et les corps qui peuvent se transporter… ») ou des **immeubles par destination** (art. 524). La loi les sort de ces définitions et crée l'art. 515-14, placé **en tête du livre II**, avant la distinction des biens.`,
    `**« Êtres vivants doués de sensibilité »** : formule déjà présente dans le Code rural (art. L. 214-1) ; reconnaissance symbolique, sans créer de catégorie juridique nouvelle (ni personne, ni chose ordinaire).`,
    `**« Soumis au régime des biens »** : les animaux restent **appropriables**, vendables, transmissibles ; on peut en être propriétaire ou possesseur (art. 2276 joue).`,
    `**« Sous réserve des lois qui les protègent »** : Code rural, Code pénal (sévices graves, art. 521-1 CP), loi du 30 nov. 2021 contre la maltraitance animale.`,
    `**Jurisprudence** : Civ. 1re, 9 déc. 2015 (chienne vendue malade) : le chien est un **être vivant, unique et irremplaçable**, destiné à recevoir l'affection de son maître ; le vendeur ne peut imposer le **remplacement** au lieu de la réparation (garantie de conformité).`,
    `**Débat** : faut-il une catégorie intermédiaire, voire une personnalité juridique de l'animal ?`
  ],
  lecture: [
    { q: `Comment le texte est-il construit ?`, opts: [
      `Deux phrases : une qualification nouvelle (êtres vivants doués de sensibilité) puis un régime maintenu (régime des biens, sous réserve des lois protectrices)`,
      `Une liste d'animaux protégés`,
      `Une définition des meubles`,
      `Une règle de responsabilité du fait des animaux`],
      ans: 0, exp: `Deux phrases, deux idées : c'est ton plan. La responsabilité du fait des animaux (art. 1243) est un **autre sujet** (responsabilité civile).` },
    { q: `Quel est le piège ?`, opts: [
      `Écrire un plaidoyer militant pour les droits des animaux ou un exposé sur la maltraitance, au lieu d'analyser la portée juridique du texte`,
      `Citer la loi de 2015`,
      `Parler de l'art. 528`,
      `Analyser « régime des biens »`],
      ans: 0, exp: `Un commentaire est une analyse **juridique** : sens, valeur, portée. L'opinion personnelle n'a sa place que dans l'appréciation (valeur), argumentée.` }
  ],
  defs: [`**Animal** : être vivant doué de sensibilité`, `**Bien** / **régime des biens**`, `**Meuble par nature** (art. 528)`],
  problematique: `La reconnaissance de la sensibilité animale par l'article 515-14 modifie-t-elle réellement la condition juridique de l'animal, qui reste soumis au régime des biens ?`,
  plan: [
    ['I. Une qualification nouvelle : l\'animal, être vivant doué de sensibilité', [
      `A. La sortie symbolique de la catégorie des choses : place du texte en tête du livre II, réécriture des art. 524 et 528`,
      `B. Une reconnaissance sans catégorie nouvelle : ni personne, ni bien ordinaire`]],
    ['II. Un régime maintenu : l\'animal, objet de droits protégé', [
      `A. Le principe : l'application du régime des biens (appropriation, vente, possession)`,
      `B. La réserve : les lois protectrices et leur influence sur le droit commun (Civ. 1re, 9 déc. 2015)`]]
  ],
  hs: [
    `Un exposé sur la **responsabilité du fait des animaux** (art. 1243).`,
    `Un texte militant sans analyse juridique.`,
    `Oublier la **seconde phrase** (régime des biens), qui est la plus importante juridiquement.`
  ],
  points: [
    `J'ai situé le texte (loi du 16 févr. 2015)`,
    `J'ai expliqué la situation antérieure (art. 524 et 528)`,
    `J'ai analysé « êtres vivants doués de sensibilité »`,
    `J'ai analysé « soumis au régime des biens »`,
    `J'ai analysé « sous réserve des lois qui les protègent »`,
    `J'ai cité l'arrêt de 2015 sur le chien « unique et irremplaçable » ou un autre exemple de portée`
  ]
},

{
  id: 'b-poesie', type: 'comm', niveau: 'hors', theme: 'Droits réels', duree: '3 h',
  sujet: `Commentez l'arrêt Civ. 3e, 31 octobre 2012 (Maison de poésie).`,
  doc: `**Résumé de l'affaire (reformulé, pas le texte officiel)**. En 1932, la Fondation Maison de poésie vend un hôtel particulier à la Société des auteurs et compositeurs dramatiques (SACD). L'acte stipule que la Fondation conservera la **jouissance** ou l'**occupation** de certains locaux **pendant toute la durée de son existence**. Des décennies plus tard, la SACD assigne la Fondation en expulsion. La cour d'appel qualifie le droit réservé de **droit d'usage et d'habitation**, qui, consenti à une personne morale, ne peut durer plus de **30 ans** (art. 619 et 625) : il serait donc éteint.\n\nLa Cour de cassation **casse** au visa des **articles 544 et 1134** (ancien) du Code civil : il résulte de ces textes que **le propriétaire peut consentir, sous réserve des règles d'ordre public, un droit réel conférant le bénéfice d'une jouissance spéciale de son bien**. Les parties avaient convenu de conférer ce droit à la Fondation pour la durée de son existence : la cour d'appel ne pouvait le requalifier en droit d'usage et d'habitation.`,
  kit: [
    `**Le débat du *numerus clausus***: les droits réels sont-ils limités à ceux que la loi énumère (propriété, usufruit, usage, habitation, servitudes, emphytéose…) ? Le Code ne le dit pas. Un arrêt ancien (**Req., 13 févr. 1834, Caquelard**) admettait déjà que les propriétaires peuvent créer des droits réels **non prévus** par la loi.`,
    `**Apport de l'arrêt de 2012** : consécration d'un **droit réel de jouissance spéciale** (DRJS), créé par la volonté, sur le fondement de la **liberté du propriétaire** (art. 544 : disposer) et de la **force obligatoire** du contrat (art. 1134 ancien, art. 1103 nouveau).`,
    `**Limite** : « sous réserve des règles d'ordre public ». Question restée ouverte : peut-il être **perpétuel** ?`,
    `**Suite** : Civ. 3e, 8 sept. 2016 (même affaire) : le droit, consenti pour la durée de la fondation, n'est pas soumis à la limite trentenaire de l'usufruit et dure **tant que la Fondation existe**. Ensuite (Civ. 3e, 7 juin 2018), la Cour précise qu'un tel droit **ne peut être perpétuel** : à défaut de durée fixée, il est limité à 30 ans par analogie avec l'art. 619.`,
    `**Lien avec ton cours** : l'**abusus** (le propriétaire dispose de son bien en démembrant sa propriété), la distinction **droit réel / droit personnel**, le caractère **perpétuel** de la propriété.`
  ],
  lecture: [
    { q: `Quel est le problème de droit ?`, opts: [
      `Un propriétaire peut-il consentir à un tiers un droit réel de jouissance qui ne correspond à aucun droit réel prévu par le Code, et pour une durée excédant trente ans ?`,
      `La Fondation est-elle propriétaire de l'immeuble ?`,
      `La vente de 1932 était-elle valable ?`,
      `La SACD a-t-elle commis une faute ?`],
      ans: 0, exp: `Le problème de droit est **abstrait** et porte sur ce que la Cour tranche : la **liberté de créer des droits réels** (et leur durée). Les faits ne sont qu'un support.` },
    { q: `Quel plan respecte la méthode du commentaire d'arrêt ?`, opts: [
      `I. La consécration d'un droit réel de jouissance spéciale (sens) ; II. Un droit réel aux contours incertains : durée, ordre public (valeur et portée)`,
      `I. Les faits ; II. La procédure`,
      `I. Le droit de propriété ; II. L'usufruit`,
      `I. La position de la cour d'appel ; II. La position de la Cour de cassation`],
      ans: 0, exp: `Le plan A explique la solution puis l'apprécie et la situe dans le temps (2016, 2018). Le plan B est la fiche d'arrêt (qui va dans l'introduction), le plan C est une dissertation, le plan D est purement descriptif.` }
  ],
  defs: [`**Droit réel** / **droit personnel**`, `**Numerus clausus** des droits réels`, `**Droit d'usage et d'habitation** (art. 625 s.)`],
  problematique: `Le propriétaire peut-il librement créer un droit réel de jouissance non prévu par la loi, et dans quelles limites ?`,
  plan: [
    ['I. La consécration d\'un droit réel de jouissance spéciale', [
      `A. Le refus d'une requalification forcée : la volonté des parties prime sur le modèle légal du droit d'usage et d'habitation`,
      `B. L'affirmation de la liberté de créer des droits réels : visa des art. 544 et 1134, rejet d'un numerus clausus (filiation avec Caquelard, 1834)`]],
    ['II. Un droit réel aux contours incertains', [
      `A. La réserve de l'ordre public : quelles règles impératives ?`,
      `B. La question de la durée : perpétuité de la propriété contre temporalité des démembrements (Civ. 3e, 2016 puis 2018)`]]
  ],
  hs: [
    `Faire une dissertation sur **l'usufruit** ou sur **les droits réels** en général.`,
    `Mettre la **fiche d'arrêt** comme partie I.`,
    `Ignorer la **portée** de l'arrêt (suites de 2016 et 2018).`
  ],
  points: [
    `Mon introduction contient faits, procédure, prétentions, problème de droit et solution`,
    `J'ai expliqué le visa (544 et 1134)`,
    `J'ai expliqué le débat du numerus clausus`,
    `J'ai expliqué pourquoi la cour d'appel est censurée (requalification en droit d'usage)`,
    `J'ai discuté la durée et la perpétuité`,
    `J'ai donné la portée (arrêts postérieurs)`
  ]
},

/* ---------------------------------------------------------------- CAS PRATIQUES */
{
  id: 'b-cas-voisins', type: 'cas', niveau: 'hors', theme: 'Voisinage, empiètement, enclave', duree: '1 h 30',
  sujet: `Cas pratique : la maison de Mme Arnaud`,
  doc: `En mars 2025, Mme Arnaud achète une maison dans un village. Juste à côté se trouve une **boulangerie industrielle** installée en 2010, qui fonctionne dans le respect des règles applicables. Depuis l'installation d'un **second four** en janvier 2026, les ventilateurs tournent toute la nuit et le bruit est devenu insupportable. Le boulanger répond qu'il « était là avant elle ».\n\nEn faisant borner son terrain, Mme Arnaud découvre que le **garage** construit en 2012 par son autre voisin, M. Bodin, **déborde de 15 cm** sur sa parcelle. M. Bodin propose de lui verser 500 € « pour solde de tout compte ».\n\nEnfin, depuis la fermeture d'un chemin communal, la parcelle de jardin que Mme Arnaud possède au fond du village **n'a plus aucun accès** à la voie publique, sauf à traverser le pré de M. Bodin.`,
  kit: [
    `**Trouble anormal de voisinage** : art. **1253** (loi du 15 avril 2024), responsabilité **de plein droit** de celui qui cause un trouble excédant les inconvénients normaux de voisinage. **Exonération** si l'activité est **antérieure** à l'arrivée de la victime, **conforme** aux lois et règlements, et poursuivie **sans aggravation**.`,
    `**Empiètement** : art. **545** : « Nul ne peut être contraint de céder sa propriété, si ce n'est pour cause d'utilité publique, et moyennant une juste et préalable indemnité. » La jurisprudence ordonne la **démolition** de la partie qui empiète, **même minime** (quelques centimètres), sans contrôle de proportionnalité (Civ. 3e, 21 déc. 2017). L'action en revendication est **imprescriptible** (art. 2227) ; seul l'usucapion de l'empiéteur (30 ans, ou 10 ans avec juste titre et bonne foi) pourrait l'arrêter.`,
    `**Enclave** : art. **682** : le propriétaire dont le fonds n'a **aucune issue** (ou une issue insuffisante) sur la voie publique peut réclamer un **passage** sur les fonds voisins, moyennant une **indemnité** proportionnée au dommage. Art. 683 : passage pris du côté où le trajet est le plus court, et le moins dommageable.`
  ],
  lecture: [
    { q: `Le bruit de la boulangerie. Quel fondement ?`, opts: [
      `Le trouble anormal de voisinage (art. 1253) : responsabilité de plein droit, sans avoir à prouver une faute`,
      `L'art. 1240 : il faut prouver une faute du boulanger`,
      `L'abus de droit : il faut prouver l'intention de nuire`,
      `Aucun : le boulanger respecte les règlements`],
      ans: 0, exp: `L'art. 1253 dispense de prouver une faute. Le respect des règlements **n'exclut pas** l'anormalité du trouble : il n'est qu'une des conditions de l'exonération d'antériorité.` },
    { q: `Le boulanger invoque son antériorité. A-t-il raison ?`, opts: [
      `Non, pas pour le bruit nouveau : l'activité est antérieure et conforme, mais elle a été aggravée en 2026 (second four) après l'arrivée de Mme Arnaud`,
      `Oui, il était là avant, il ne peut jamais être responsable`,
      `Oui, car Mme Arnaud a accepté le risque en achetant`,
      `Non, l'antériorité n'a jamais d'effet en droit français`],
      ans: 0, exp: `L'exonération exige trois conditions **cumulatives** : antériorité, conformité, **absence d'aggravation**. Le second four aggrave le trouble : l'exonération tombe pour ce trouble nouveau. Mme Arnaud peut obtenir des dommages-intérêts et des mesures pour faire cesser le trouble (isolation, horaires).` },
    { q: `Le garage qui empiète de 15 cm. Que peut obtenir Mme Arnaud ?`, opts: [
      `La démolition de la partie qui empiète (art. 545), même si l'empiètement est minime ; elle n'est pas obligée d'accepter les 500 €`,
      `Seulement une indemnité, car 15 cm c'est minime`,
      `Rien, car le garage existe depuis plus de 10 ans`,
      `La propriété du garage par accession`],
      ans: 0, exp: `Nul ne peut être contraint de céder sa propriété (**art. 545**) : la jurisprudence ordonne la **démolition**, sans contrôle de proportionnalité. M. Bodin ne peut pas avoir usucapé : 2012 → 2026 < 30 ans, et il n'a pas de juste titre sur la bande de terrain (pas d'usucapion abrégée). L'action en revendication est imprescriptible (art. 2227).` },
    { q: `La parcelle de jardin sans accès. Que peut faire Mme Arnaud ?`, opts: [
      `Réclamer un droit de passage sur le pré de M. Bodin au titre de l'enclave (art. 682), moyennant une indemnité, par le trajet le plus court et le moins dommageable (art. 683)`,
      `Passer librement, la loi lui en donne le droit gratuitement`,
      `Rien, seul un accord de M. Bodin peut créer un passage`,
      `Demander à la commune de lui racheter la parcelle`],
      ans: 0, exp: `C'est une **servitude légale** de passage pour cause d'enclave. Elle est **due**, mais **indemnisée** (art. 682). L'assiette se détermine par l'art. 683 (et peut se fixer par 30 ans d'usage continu, art. 685).` }
  ],
  defs: [`**Syllogisme** : faits qualifiés, problème de droit, règle, application, conclusion`],
  problematique: `Trois problèmes à traiter séparément : le bruit (art. 1253), l'empiètement (art. 545), l'enclave (art. 682).`,
  plan: [
    ['I. Le bruit de la boulangerie', [
      `Problème : un voisin dont l'activité respecte les règles et préexistait peut-il être responsable d'un trouble aggravé ?`,
      `Règle : art. 1253 (responsabilité de plein droit ; exonération si antériorité + conformité + absence d'aggravation)`,
      `Application : trouble anormal (nuit, continu) ; activité antérieure et conforme, mais aggravée en 2026 → exonération exclue pour le trouble nouveau`,
      `Conclusion : action fondée ; dommages-intérêts et mesures de cessation`]],
    ['II. Le garage de M. Bodin', [
      `Problème : un empiètement minime peut-il justifier la démolition ?`,
      `Règle : art. 545 ; jurisprudence constante (démolition sans contrôle de proportionnalité) ; art. 2227 et usucapion`,
      `Application : 15 cm empiètent ; pas d'usucapion (14 ans, pas de juste titre) ; offre de 500 € non obligatoire`,
      `Conclusion : Mme Arnaud peut exiger la démolition de la partie qui empiète`]],
    ['III. La parcelle enclavée', [
      `Problème : le propriétaire d'un fonds sans issue peut-il imposer un passage à son voisin ?`,
      `Règle : art. 682 et 683`,
      `Application : aucune issue depuis la fermeture du chemin ; le pré de Bodin est le seul accès`,
      `Conclusion : droit de passage, moyennant indemnité`]]
  ],
  hs: [
    `Traiter les trois problèmes **en bloc** au lieu de les séparer.`,
    `Fonder le bruit sur l'art. 1240 (faute) alors que l'art. 1253 est plus favorable.`,
    `Oublier de **répondre** concrètement à chaque question de Mme Arnaud.`
  ],
  points: [
    `J'ai séparé les trois problèmes juridiques`,
    `J'ai cité l'art. 1253 et les trois conditions de l'exonération`,
    `J'ai vu que le second four est une aggravation`,
    `J'ai cité l'art. 545 et la sanction de démolition`,
    `J'ai écarté l'usucapion de M. Bodin (durée, absence de juste titre)`,
    `J'ai cité l'art. 682 (enclave, indemnité)`,
    `Chaque problème suit le syllogisme et se termine par une conclusion claire`
  ]
},

/* ---------------------------------------------------------------- QUESTIONS */
{
  id: 'b-q-squat', type: 'q', niveau: 'hors', theme: 'Squat', duree: '30 min',
  sujet: `Comment le propriétaire peut-il récupérer un logement occupé par des squatteurs ?`,
  kit: [
    `**Interdiction de se faire justice soi-même** : le propriétaire qui expulse lui-même, par la force ou en coupant l'eau et l'électricité, commet un délit (**art. 226-4-2 du Code pénal**).`,
    `**Voie administrative** : **art. 38 de la loi DALO du 5 mars 2007** (renforcé en 2020 puis par la loi du **27 juillet 2023**) : après dépôt de **plainte**, preuve que le logement est le sien et **constat** de l'occupation illicite par un officier de police judiciaire, le propriétaire demande au **préfet** de mettre les occupants en demeure de quitter les lieux ; à défaut, évacuation forcée.`,
    `**Voie judiciaire** : saisir le juge (souvent en **référé**) pour obtenir une décision d'**expulsion**, exécutée par commissaire de justice. La **trêve hivernale** ne protège pas les personnes entrées par **voie de fait**.`,
    `**Voie pénale** : violation de domicile (**art. 226-4 CP**, peines portées à 3 ans et 45 000 € en 2023) et délit d'occupation frauduleuse d'un local (**art. 315-1 CP**, créé en 2023).`,
    `**Lien avec ton cours** : le squatteur est-il possesseur ? Il a le corpus, peut-être l'animus, mais sa possession commence par **violence** (vice). Les **actions possessoires** ont été supprimées (loi du 16 févr. 2015) ; l'art. 2278 protège la possession par la voie du **référé**. Et le propriétaire garde l'action en **revendication**, imprescriptible.`
  ],
  lecture: [
    { q: `Une question de cours sur un thème hors programme. Par quoi commencer ?`, opts: [
      `Rattacher la question aux notions du cours (propriété, possession, revendication) puis exposer les voies d'action, sans dériver vers un débat politique sur le logement`,
      `Un développement sur la crise du logement en France`,
      `Recopier tout le chapitre sur la possession`,
      `Dire que je ne l'ai pas vu en cours`],
      ans: 0, exp: `Une question de cours appelle une **réponse directe, structurée et précise**. Le rattachement au cours montre que tu raisonnes ; le débat de société n'a pas sa place.` }
  ],
  defs: [`**Occupant sans droit ni titre**`, `**Voie de fait**`, `**Action en revendication**`],
  problematique: `Réponse attendue en trois temps : interdiction de se faire justice, voies d'action, rattachement au droit des biens.`,
  plan: [
    ['Réponse structurée', [
      `1. Principe : le propriétaire ne peut pas expulser lui-même (art. 226-4-2 CP)`,
      `2. Voie administrative rapide (art. 38 loi DALO, réformé en 2023), voie judiciaire (référé expulsion), voie pénale (art. 226-4 et 315-1 CP)`,
      `3. Analyse civile : squatteur possesseur vicieux (violence), propriétaire titulaire d'une action en revendication imprescriptible`]]
  ],
  hs: [`Un débat sur le droit au logement.`, `Un exposé complet sur la possession.`],
  points: [
    `J'ai posé l'interdiction de se faire justice soi-même`,
    `J'ai cité la procédure administrative (préfet, art. 38 loi DALO)`,
    `J'ai cité la voie judiciaire (expulsion)`,
    `J'ai mentionné la voie pénale`,
    `J'ai fait le lien avec la possession et la revendication`
  ]
},

{
  id: 'b-q-copro', type: 'q', niveau: 'hors', theme: 'Copropriété', duree: '30 min',
  sujet: `Distinguez l'indivision et la copropriété des immeubles bâtis.`,
  kit: [
    `**Indivision** : plusieurs personnes ont des droits concurrents sur **le même bien**, sans partie matérielle propre ; chacun a une **quote-part abstraite**. Situation **précaire** : « nul ne peut être contraint à demeurer dans l'indivision » (art. 815). Gestion à la majorité des 2/3 ou à l'unanimité (art. 815-3).`,
    `**Copropriété des immeubles bâtis (loi du 10 juillet 1965)** : l'immeuble est divisé en **lots**, chaque lot comprenant une **partie privative** (propriété exclusive : l'appartement) et une **quote-part des parties communes** (hall, toit, escaliers), en tantièmes.`,
    `**Organisation** : un **règlement de copropriété** ; un **syndicat des copropriétaires** doté de la **personnalité morale** ; un **syndic** ; une **assemblée générale** qui décide selon des majorités graduées (art. 24, 25, 26 de la loi).`,
    `**Différence clé** : la copropriété est **permanente** (pas de droit au partage des parties communes), l'indivision est **transitoire** ; la copropriété combine propriété individuelle et collective, l'indivision est entièrement collective.`
  ],
  lecture: [
    { q: `Le sujet commence par « Distinguez ». Qu'est-ce qui est attendu ?`, opts: [
      `Une comparaison point par point (définition, objet, organisation, durée), avec les ressemblances et surtout les différences`,
      `Deux exposés successifs indépendants, l'un sur l'indivision, l'autre sur la copropriété`,
      `Seulement les ressemblances`,
      `Un exposé sur la copropriété uniquement`],
      ans: 0, exp: `« Distinguer » impose une **confrontation**. Deux exposés juxtaposés ne répondent pas : c'est au correcteur de faire la comparaison à ta place, et il ne le fera pas.` }
  ],
  defs: [`**Indivision**`, `**Lot de copropriété** (partie privative + quote-part de parties communes)`, `**Syndicat des copropriétaires**`],
  problematique: `Comparaison en trois critères : structure du droit, organisation, durée.`,
  plan: [
    ['Réponse structurée', [
      `1. Point commun : pluralité de titulaires sur un même ensemble, quotes-parts`,
      `2. Structure : indivision = droits concurrents sur tout le bien ; copropriété = lot alliant partie privative exclusive et quote-part des parties communes`,
      `3. Organisation : règles de majorité de l'art. 815-3 ; syndicat doté de la personnalité morale, syndic, AG (loi de 1965)`,
      `4. Durée : indivision précaire (art. 815) ; copropriété permanente`]]
  ],
  hs: [`Deux exposés séparés sans comparaison.`],
  points: [
    `J'ai donné une définition de chacune`,
    `J'ai cité l'art. 815 et la loi du 10 juillet 1965`,
    `J'ai expliqué la notion de lot (privatif + parties communes)`,
    `J'ai mentionné le syndicat doté de la personnalité morale`,
    `J'ai opposé précarité de l'indivision et permanence de la copropriété`
  ]
},

{
  id: 'b-q-fiducie', type: 'q', niveau: 'frontiere', theme: 'Patrimoine, fiducie', duree: '30 min',
  sujet: `La fiducie remet-elle en cause la théorie du patrimoine d'Aubry et Rau ?`,
  kit: [
    `**Théorie d'Aubry et Rau** (XIXe s.) : le patrimoine est une **émanation de la personnalité** : toute personne a un patrimoine, **seule une personne** a un patrimoine, une personne n'a **qu'un seul** patrimoine (unité et indivisibilité).`,
    `**Fiducie** (loi du **19 février 2007**, art. **2011** s.) : opération par laquelle un **constituant** transfère des biens, droits ou sûretés à un **fiduciaire** qui, **les tenant séparés de son patrimoine propre**, agit dans un but déterminé au profit d'un ou plusieurs **bénéficiaires**.`,
    `**Patrimoine fiduciaire** (art. 2025) : les biens transférés ne peuvent être saisis que par les titulaires de créances nées de leur conservation ou de leur gestion : c'est un **patrimoine d'affectation** dans la main du fiduciaire, qui a donc **deux patrimoines**.`,
    `**Encadrement** : contrat écrit avec mentions obligatoires, **99 ans** maximum (art. 2018), fiduciaires limités (établissements de crédit, assureurs, avocats : art. 2015), fiducie-libéralité **nulle** (art. 2013), enregistrement.`,
    `**Autres atteintes** : EIRL (2010, supprimée pour l'avenir), puis **entrepreneur individuel** à patrimoine professionnel séparé de plein droit (loi du 14 févr. 2022) ; EURL (société unipersonnelle, 1985).`
  ],
  lecture: [
    { q: `Que faut-il absolument faire avant de parler de la fiducie ?`, opts: [
      `Exposer les principes de la théorie d'Aubry et Rau, car ce sont eux que la fiducie remettrait en cause`,
      `Raconter l'histoire du trust anglo-saxon en détail`,
      `Expliquer le droit fiscal de la fiducie`,
      `Définir l'usufruit`],
      ans: 0, exp: `On ne peut pas dire si un principe est « remis en cause » sans l'avoir **énoncé**. Le trust peut servir d'accroche (inspiration), pas de développement.` }
  ],
  defs: [`**Patrimoine**`, `**Fiducie** (art. 2011)`, `**Patrimoine d'affectation**`],
  problematique: `Réponse attendue : oui pour l'unicité (le fiduciaire a deux patrimoines), mais atteinte encadrée qui n'abandonne pas le lien patrimoine / personne.`,
  plan: [
    ['Réponse structurée', [
      `1. La théorie d'Aubry et Rau : patrimoine lié à la personne, unique et indivisible`,
      `2. L'atteinte : patrimoine fiduciaire séparé (art. 2011, 2025), le fiduciaire est titulaire de deux patrimoines`,
      `3. La nuance : atteinte encadrée (art. 2013, 2015, 2018) ; le patrimoine reste rattaché à une personne (le fiduciaire) ; mouvement général (entrepreneur individuel, 2022)`]]
  ],
  hs: [`Un exposé sur le trust anglo-saxon.`, `Ne pas répondre à la question.`],
  points: [
    `J'ai exposé les trois propositions d'Aubry et Rau`,
    `J'ai défini la fiducie (art. 2011)`,
    `J'ai expliqué le patrimoine fiduciaire séparé`,
    `J'ai mentionné l'encadrement légal`,
    `J'ai répondu à la question de façon nuancée`
  ]
}
],

/* Lire un sujet : sujet → bonne lecture, 3 mauvaises lectures (pièges de hors-sujet). */
lecture: [
  [`Le droit de propriété est-il absolu ?`, `Confronter le caractère absolu affirmé par l'art. 544 à ses limites (lois, règlements, abus de droit, voisinage) et répondre de façon nuancée`, [`Lister les attributs usus, fructus, abusus`, `Raconter l'histoire de la propriété depuis 1789`, `Exposer les modes d'acquisition de la propriété`], `Un sujet-question exige une **réponse**. Les attributs ne sont qu'un élément de définition.`],
  [`« La possession vaut titre »`, `L'art. 2276 : l'acquisition immédiate d'un meuble corporel par le possesseur de bonne foi, ses conditions et ses limites (perte, vol)`, [`La possession en général : corpus, animus, vices`, `L'usucapion immobilière de 10 et 30 ans`, `La preuve de la propriété immobilière`], `Une citation entre guillemets renvoie à une **règle précise** : ici l'art. 2276, réservé aux **meubles corporels**.`],
  [`Le possesseur`, `La personne du possesseur : ce qui fait sa qualité, ses droits (fruits, protection, usucapion), ses obligations envers le propriétaire`, [`La possession comme notion abstraite uniquement`, `Le propriétaire`, `Les vices de la possession`], `Un sujet sur une **personne** se traite depuis son point de vue : prérogatives et charges.`],
  [`Les fruits`, `La notion de fruits (vs produits) et leur attribution : propriétaire (art. 547), possesseur de bonne foi (art. 549), usufruitier (art. 582)`, [`Le seul attribut du fructus dans l'art. 544`, `Les fruits civils dans le droit des contrats`, `L'accession immobilière`], `Il faut **définir** (périodicité, conservation de la substance) puis traiter les **titulaires** des fruits.`],
  [`Les choses sans maître`, `Les choses qui n'appartiennent à personne : res nullius (occupation), res derelictae, choses communes (art. 714), biens sans maître (art. 713) et trésor (art. 716)`, [`L'usucapion`, `Le domaine public`, `La possession de bonne foi`], `Attention au sens précis : la chose **sans maître** n'est pas la chose possédée par un non-propriétaire.`],
  [`Le temps et la propriété`, `La perpétuité de la propriété face au temps : imprescriptibilité de la revendication (art. 2227), usucapion, extinction des démembrements par non-usage`, [`L'histoire du droit de propriété`, `La durée des baux`, `La prescription en droit des contrats`], `Un sujet « X et Y » porte sur la **relation** entre les deux termes, pas sur chacun séparément.`],
  [`Possession et détention`, `Comparer les deux situations : corpus commun, animus du seul possesseur, détention précaire (art. 2266), interversion de titre`, [`Exposer la possession puis, en annexe, la détention`, `La protection pénale contre le vol`, `La détention provisoire`], `Sujet de **comparaison** : le plan doit **confronter**, pas juxtaposer.`],
  [`L'animal, un bien comme les autres ?`, `L'art. 515-14 : la reconnaissance de la sensibilité animale face au maintien du régime des biens`, [`La responsabilité du fait des animaux (art. 1243)`, `Le bien-être animal en droit pénal`, `La classification meubles / immeubles`], `Les mots « bien » et « comme les autres » fixent l'angle : **qualification** et **régime** de l'animal.`],
  [`L'abus du droit de propriété`, `La théorie de l'abus de droit appliquée au propriétaire : intention de nuire, absence d'utilité (Colmar 1855, Clément-Bayard 1915), et sa distinction avec le trouble anormal`, [`Toutes les limites du droit de propriété`, `L'abus de majorité en droit des sociétés`, `L'abus de jouissance de l'usufruitier`], `Sujet **plus étroit** que « les limites du droit de propriété » : ne pas élargir.`],
  [`Le patrimoine`, `La notion de patrimoine (théorie d'Aubry et Rau : unité, lien avec la personne) et ses remises en cause (fiducie, entrepreneur individuel)`, [`La liste des biens d'une personne`, `Le patrimoine culturel et les monuments historiques`, `Les successions`], `Le mot a un sens courant (monuments) et un sens juridique : **toujours** prendre le sens juridique.`],
  [`Meubles et immeubles`, `La summa divisio des biens (art. 516) : critères de distinction, catégories fictives (par destination, par anticipation) et intérêts pratiques (art. 2276, publicité foncière)`, [`Les seuls immeubles par destination`, `La vente immobilière`, `Le mobilier d'un logement`], `Sujet classique : définir, puis montrer **pourquoi** la distinction compte et si elle est encore pertinente.`],
  [`La bonne foi en droit des biens`, `Sa définition (art. 550), sa présomption (art. 2274) et ses effets : fruits (art. 549), usucapion abrégée (art. 2272), art. 2276, constructions (art. 555)`, [`La bonne foi dans les contrats (art. 1104)`, `La mauvaise foi du vendeur`, `La possession en général`], `La précision « **en droit des biens** » délimite : la bonne foi contractuelle est hors sujet.`],
  [`Usucapion et prescription extinctive`, `Comparer la prescription acquisitive (acquérir un droit par la possession) et la prescription extinctive (perdre une action par l'inaction), et leurs liens (art. 2219 et 2258)`, [`L'usucapion seule`, `Les délais de prescription en droit pénal`, `L'art. 2276`], `Sujet de **confrontation** : il faut les deux termes dans chaque partie.`],
  [`L'accession`, `Le droit du propriétaire sur ce qui est produit par la chose ou s'y unit (art. 546) : accession par production et par incorporation, notamment l'art. 555`, [`La seule accession mobilière`, `L'accession à la propriété immobilière des ménages`, `La possession`], `Ne pas confondre le sens juridique avec « l'accession à la propriété » (devenir propriétaire de son logement).`]
]
};
