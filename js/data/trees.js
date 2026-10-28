/* Arbres de décision interactifs. Nœud : {q, hint?, o:[[label, next]]} ou feuille : {r, tone:'ok'|'ko'|'mid', ref, note} */
DATA.trees = [
{
  id:'t-detention', ch:'c3', title:'Détenteur précaire ou possesseur ?', blurb:'Qualifie la situation d\'une personne qui a un bien en main.',
  start:'a',
  nodes:{
    a:{q:`La personne exerce-t-elle des actes matériels de maîtrise sur le bien (corpus) ?`, o:[[`Oui`,'b'],[`Non`,'n1']]},
    n1:{r:`Pas de possession : sans corpus, il n'y a pas de maîtrise matérielle.`, tone:'ko', ref:`Corpus nécessaire`},
    b:{q:`Se comporte-t-elle comme propriétaire (animus) ou sait-elle que le bien appartient à autrui ?`, o:[[`Elle se comporte comme propriétaire`,'c'],[`Elle sait que le bien est à autrui et devra le restituer`,'d']]},
    c:{q:`Possession caractérisée (corpus + animus). Reste à vérifier les vices : continue, paisible, publique, non équivoque ?`, o:[[`Les 4 qualités sont réunies`,'ok'],[`Il manque une qualité`,'vice']]},
    ok:{r:`Possession utile : elle peut mener à l'usucapion (selon la durée) et bénéficie d'une présomption de droit (art. 2256).`, tone:'ok', ref:`Art. 2261, 2256`},
    vice:{r:`Possession viciée (discontinuité, violence, clandestinité ou équivoque). Clandestinité et violence sont des vices temporaires et relatifs.`, tone:'mid', ref:`Art. 2261, 2263`},
    d:{q:`Après coup, a-t-elle acquis le bien d'un tiers qu'elle croyait propriétaire, ou fait un acte contraire à la propriété resté sans réponse ?`, o:[[`Oui : acquisition auprès d'un tiers (a non domino)`,'i1'],[`Oui : contradiction ouverte (ex : grands travaux) et propriétaire inactif`,'i2'],[`Non, rien de tel`,'dp']]},
    dp:{r:`Détenteur précaire : il ne peut pas prescrire (art. 2266). Exemples : locataire, garagiste. Il peut seulement agir en justice contre un trouble.`, tone:'ko', ref:`Art. 2266`},
    i1:{r:`Interversion de titre par une cause venant d'un tiers : il devient possesseur (pas propriétaire), dès l'acquisition.`, tone:'ok', ref:`Acquisition a non domino`},
    i2:{r:`Interversion par contradiction ouverte : le détenteur devient possesseur et pourra prescrire (immeuble) avec le temps.`, tone:'ok', ref:`Cornu`}
  }
},
{
  id:'t-usucapion', ch:'c5', title:'Peut-on usucaper ?', blurb:'Les 3 conditions (PIT), puis 10 ou 30 ans.',
  start:'a',
  nodes:{
    a:{q:`Le bien ou le droit est-il dans le commerce et n'est-il pas une universalité ?`, hint:`Le domaine public et les universalités (patrimoine, succession, fonds de commerce) ne s'usucapent pas.`, o:[[`Oui`,'b'],[`Non`,'n1']]},
    n1:{r:`Pas d'usucapion : bien hors commerce (art. 2260) ou universalité. On peut seulement prescrire les éléments d'une universalité.`, tone:'ko', ref:`Art. 2260`},
    b:{q:`S'agit-il d'un droit réel principal (propriété, usufruit, servitude) ?`, o:[[`Oui`,'c'],[`Non`,'n2']]},
    n2:{r:`Pas d'usucapion : seuls les droits réels principaux s'acquièrent par usucapion.`, tone:'ko'},
    c:{q:`P — La possession est-elle pleinement constituée et utile (corpus, animus, continue, paisible, publique, non équivoque) ?`, hint:`Un simple acte de tolérance du propriétaire n'ouvre pas la prescription (art. 2262).`, o:[[`Oui`,'d'],[`Non (vice ou tolérance)`,'n3']]},
    n3:{r:`Pas d'usucapion : la possession doit être utile. Attention : la violence cesse d'être un vice quand elle prend fin, la possession utile ne commence qu'alors.`, tone:'ko', ref:`Art. 2261, 2262, 2263`},
    d:{q:`I — Le propriétaire est-il resté inactif ? (pas d'action en justice, pas de reprise matérielle du bien)`, o:[[`Oui, inactif`,'e'],[`Non, il a agi : demande en justice ou reprise de possession`,'n4']]},
    n4:{r:`Interruption : le délai acquis est effacé et un nouveau délai de même durée recommence (art. 2241, 2271).`, tone:'mid', ref:`Art. 2241, 2271`},
    e:{q:`La prescription a-t-elle été suspendue (possession contre un mineur non émancipé, un majeur sous tutelle, entre époux) ?`, o:[[`Non`,'f'],[`Oui`,'n5']]},
    n5:{r:`Suspension : le délai s'arrête temporairement sans effacer ce qui a couru (art. 2230, 2234, 2236). Il reprendra après.`, tone:'mid', ref:`Art. 2230, 2234, 2236`},
    f:{q:`T — Le possesseur est-il de bonne foi avec un juste titre (acquisition a non domino) ?`, o:[[`Oui`,'g10'],[`Non (mauvaise foi ou pas de juste titre)`,'g30']]},
    g10:{r:`Usucapion abrégée : 10 ans. Délai compté de jour en jour, avec jonction des possessions possible. N'oublie pas : le possesseur doit l'invoquer, le juge ne la relève pas d'office (art. 2247).`, tone:'ok', ref:`Art. 2272, 2228, 2265`},
    g30:{r:`Usucapion trentenaire : 30 ans. Même régime ensuite : faculté, rétroactivité, mode originaire.`, tone:'ok', ref:`Art. 2272`}
  }
},
{
  id:'t-meuble-vole', ch:'c5', title:'Meuble vendu à un possesseur de bonne foi : qui l\'emporte ?', blurb:'Art. 2276 et 2277, cas du vol, de la perte ou de l\'abus de confiance.',
  start:'a',
  nodes:{
    a:{q:`Le possesseur actuel est-il de bonne foi (au moment de l'acquisition) et le bien est-il un meuble corporel non immatriculé ?`, o:[[`Oui`,'b'],[`Non`,'n1']]},
    n1:{r:`L'art. 2276 ne joue pas (mauvaise foi, ou immeuble, meuble incorporel, bien immatriculé). Voir usucapion ou autres règles.`, tone:'ko', ref:`Art. 2276`},
    b:{q:`Comment le propriétaire s'est-il séparé du bien ?`, o:[[`Il l'a remis volontairement (prêt, dépôt, escroquerie, abus de confiance)`,'c'],[`Vol ou perte`,'d']]},
    c:{r:`Le possesseur de bonne foi est propriétaire dès l'acquisition (effet acquisitif de l'art. 2276 al. 1). Le propriétaire initial ne peut agir que contre celui à qui il a remis le bien.`, tone:'ok', ref:`Art. 2276 al. 1`},
    d:{q:`Le propriétaire agit-il dans les 3 ans de la perte ou du vol ? (délai préfix)`, o:[[`Oui`,'e'],[`Non, le délai est passé`,'n2']]},
    n2:{r:`Le droit d'agir est éteint : le possesseur est regardé comme propriétaire.`, tone:'ok', ref:`Délai préfix de 3 ans`},
    e:{q:`Le propriétaire prouve-t-il sa qualité de propriétaire et la perte / le vol ?`, o:[[`Oui`,'f'],[`Non`,'n3']]},
    n3:{r:`Action rejetée : le propriétaire doit prouver sa qualité de propriétaire (la possession régulière antérieure suffit, 1re civ. 1er juin 1977) et la perte ou le vol.`, tone:'ko'},
    f:{q:`Le possesseur a-t-il acheté dans une foire, un marché, une vente publique ou chez un marchand vendant des choses pareilles ?`, o:[[`Oui`,'g'],[`Non`,'h']]},
    g:{r:`Le propriétaire reprend son bien mais doit rembourser le prix. Le possesseur a un droit de rétention jusque-là (art. 2277).`, tone:'mid', ref:`Art. 2277, Civ. 11 févr. 1931`},
    h:{r:`Le propriétaire reprend son bien sans rembourser. Le possesseur se retourne contre son vendeur (garantie, responsabilité contractuelle).`, tone:'mid', ref:`Art. 2276 al. 2`}
  }
},
{
  id:'t-double-vente', ch:'c5', title:'Double vente : qui est propriétaire ?', blurb:'Deux acquéreurs successifs tiennent leur droit de la même personne.',
  start:'a',
  nodes:{
    a:{q:`Quel est l'objet de la vente ?`, o:[[`Un immeuble`,'i'],[`Un meuble corporel`,'m'],[`Une invention brevetable`,'b']]},
    i:{q:`Un acquéreur a-t-il publié son titre authentique au fichier immobilier avant l'autre ?`, o:[[`Oui, le second acquéreur a publié le premier`,'i2'],[`Oui, le premier acquéreur a publié le premier`,'i3'],[`Aucun n'a publié`,'i4']]},
    i2:{q:`Le second acquéreur était-il de bonne foi (ignorait la première vente) ?`, o:[[`Oui`,'i5'],[`Non`,'i6']]},
    i5:{r:`Le second acquéreur est préféré (art. 1198 al. 2, 3e civ. 12 janv. 2011). Le premier acquéreur a un recours contre le vendeur.`, tone:'ok', ref:`Art. 1198 al. 2`},
    i6:{r:`Sa mauvaise foi fait obstacle : il n'est pas préféré. Depuis 2016, la bonne foi est une condition.`, tone:'ko', ref:`Art. 1198 al. 2`},
    i3:{r:`Le premier acquéreur, qui a publié le premier, est préféré (de bonne foi).`, tone:'ok', ref:`Art. 1198 al. 2`},
    i4:{r:`Sans publication, la vente est inopposable aux tiers : la publicité foncière organise l'opposabilité (décret de 1955, art. 30).`, tone:'mid', ref:`Décret 4 janv. 1955`},
    m:{q:`Un acquéreur a-t-il pris possession du meuble avant l'autre ?`, o:[[`Oui, et il est de bonne foi`,'m1'],[`Oui, mais il savait qu'il y avait une première vente`,'m2']]},
    m1:{r:`Il est préféré, même si son droit est postérieur (art. 1198 al. 1 ; en fait de meubles possession vaut titre, art. 2276).`, tone:'ok', ref:`Art. 1198 al. 1`},
    m2:{r:`Sa mauvaise foi l'empêche d'être préféré.`, tone:'ko', ref:`Art. 1198 al. 1`},
    b:{q:`Qui a déposé le brevet en premier ?`, o:[[`Le déposant, et personne n'exploitait l'invention de bonne foi avant`,'b1'],[`Le déposant, mais un tiers de bonne foi exploitait l'invention avant le dépôt`,'b2']]},
    b1:{r:`Le premier déposant est préféré (art. L616-6 CPI).`, tone:'ok', ref:`L616-6 CPI`},
    b2:{r:`Le déposant a le brevet, mais le possesseur antérieur de bonne foi peut exploiter à titre personnel, en France seulement, sans licence (art. L613-7 CPI).`, tone:'mid', ref:`L613-7 CPI`}
  }
},
{
  id:'t-transfert', ch:'c5', title:'Le transfert de propriété est-il immédiat ?', blurb:'Solo consensu, et ses limites.',
  start:'a',
  nodes:{
    a:{q:`Les parties ont-elles prévu une clause qui retarde le transfert ?`, o:[[`Réserve de propriété`,'r'],[`Réitération par acte authentique`,'t'],[`Aucune clause`,'c']]},
    r:{r:`Transfert retardé au complet paiement du prix (art. 1196 n'est pas d'ordre public).`, tone:'mid', ref:`Art. 1196`},
    t:{r:`Transfert retardé à la signature de l'acte authentique chez le notaire (matière immobilière).`, tone:'mid', ref:`Art. 1196`},
    c:{q:`La chose vendue est-elle une chose de genre / fongible vendue au poids, au compte ou à la mesure ?`, o:[[`Oui`,'g'],[`Non, c'est un corps certain`,'v']]},
    g:{r:`Transfert à l'individualisation (pesée, comptée ou mesurée). Les choses sont aux risques du vendeur jusque-là (art. 1585).`, tone:'mid', ref:`Art. 1585`},
    v:{q:`S'agit-il de vin, d'huile ou d'autres choses que l'on goûte avant l'achat ?`, o:[[`Oui`,'w'],[`Non`,'ok']]},
    w:{r:`Pas de vente tant que l'acheteur n'a pas goûté et agréé (art. 1587).`, tone:'mid', ref:`Art. 1587`},
    ok:{r:`Transfert immédiat dès l'échange des consentements (solo consensu), avec transfert des risques. Les tiers, eux, regardent la publicité foncière.`, tone:'ok', ref:`Art. 1196, 1583, 938`}
  }
}
];
