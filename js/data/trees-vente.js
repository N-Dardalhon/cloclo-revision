/* Arbres de décision : contrats spéciaux (la vente). Ajoutés après trees.js. */
DATA.trees.push(
{
  id:'t-qualif', ch:'v2', title:'Est-ce bien une vente ?', blurb:'Prix, chose, transfert de propriété : élimine les contrats voisins.',
  start:'a',
  nodes:{
    a:{q:`Le contrat transfère-t-il la propriété d'une chose de manière définitive ?`, o:[[`Oui`,'b'],[`Non : seulement l'usage`,'bail'],[`Non : il faudra restituer`,'pret']]},
    bail:{r:`Pas une vente : transfert de l'usage, c'est un bail. Attention à la carrière : si l'exploitation détruit la substance de la chose, c'est une vente.`, tone:'ko', ref:`Vente / bail`},
    pret:{r:`Pas une vente : l'obligation de restituer (même par équivalent) caractérise le prêt ou le dépôt (art. 1915).`, tone:'ko', ref:`Vente / prêt / dépôt`},
    b:{q:`Quelle est la contrepartie ?`, o:[[`Une somme d'argent`,'c'],[`Une autre chose`,'ech'],[`Des parts sociales`,'app'],[`Rien (intention libérale)`,'don']]},
    ech:{r:`Échange (art. 1702). Avec soulte : si la valeur de la chose dépasse la soulte, échange ; sinon, vente. En pratique, on applique les règles de la vente par analogie.`, tone:'mid', ref:`Art. 1702`},
    app:{r:`Apport en nature en société : la contrepartie est constituée de parts sociales ou d'actions, pas d'un prix.`, tone:'ko', ref:`Vente / apport`},
    don:{r:`Donation : intention libérale, acte à titre gratuit (art. 894). Donation avec charge : regarder la disproportion entre la charge et la valeur.`, tone:'ko', ref:`Art. 894`},
    c:{q:`Le contrat porte-t-il sur une chose ou sur un service ?`, o:[[`Une chose de série / existante`,'v'],[`Une chose fabriquée spécialement (meuble)`,'f'],[`Une construction`,'imm'],[`Un service (avec éventuellement une chose remise)`,'ent']]},
    f:{r:`Critère de la spécificité du travail (3e civ., 5 févr. 1985) : travail spécifique répondant aux besoins particuliers du client = contrat d'entreprise ; sinon vente.`, tone:'mid', ref:`3e civ., 5 févr. 1985`},
    imm:{q:`À qui appartient le sol ?`, o:[[`À l'entrepreneur`,'v'],[`Au client`,'ent2']]},
    ent2:{r:`Contrat d'entreprise : le client devient propriétaire au fur et à mesure, par accession.`, tone:'ko', ref:`Critère du sol`},
    ent:{r:`Contrat d'entreprise : critère de l'économie de l'opération (ex : le garagiste qui change une pièce répare, il ne vend pas).`, tone:'ko', ref:`Économie de l'opération`},
    v:{r:`C'est une vente : transfert de propriété d'une chose contre un prix (art. 1582-1583).`, tone:'ok', ref:`Art. 1582`}
  }
},
{
  id:'t-avantcontrat', ch:'v3', title:'Promesse, pacte ou vente ?', blurb:'Qualifie l\'avant-contrat et trouve la sanction de sa violation.',
  start:'a',
  nodes:{
    a:{q:`Les deux parties ont-elles déjà consenti à la vente, sur la chose et le prix ?`, o:[[`Oui, les deux`,'syn'],[`Seul le vendeur a consenti`,'pu'],[`Le vendeur s'engage seulement à proposer en priorité s'il vend`,'pp']]},
    syn:{q:`Que reste-t-il à attendre ?`, o:[[`Rien`,'v'],[`Un événement certain (réitération, date)`,'t'],[`Un événement incertain (prêt…)`,'cond']]},
    v:{r:`La promesse synallagmatique vaut vente (art. 1589 al. 1).`, tone:'ok', ref:`Art. 1589`},
    t:{r:`Vente à terme : l'exécution est retardée jusqu'à un événement futur et certain (art. 1305).`, tone:'ok', ref:`Art. 1305`},
    cond:{r:`Vente sous condition suspensive (art. 1304). Si la condition échoue par la faute de celui qui y avait intérêt, elle est réputée accomplie (art. 1304-3).`, tone:'mid', ref:`Art. 1304, 1304-3`},
    pu:{q:`Le promettant a vendu à un tiers (ou s'est rétracté) avant la levée d'option. Le tiers connaissait-il la promesse ?`, o:[[`Oui`,'pu1'],[`Non`,'pu2'],[`Simple rétractation, pas de tiers`,'pu3']]},
    pu1:{r:`Le contrat conclu avec le tiers est nul (art. 1124 al. 3). Le bénéficiaire peut lever l'option et obtenir la vente.`, tone:'ok', ref:`Art. 1124 al. 3`},
    pu2:{r:`La vente au tiers de bonne foi tient : le bénéficiaire obtient des dommages-intérêts contre le promettant.`, tone:'mid', ref:`Art. 1124`},
    pu3:{r:`La révocation n'empêche pas la formation du contrat promis (art. 1124 al. 2) : la levée d'option forme la vente. Fin de la jurisprudence Consorts Cruz.`, tone:'ok', ref:`Art. 1124 al. 2`},
    pp:{q:`Le promettant a vendu à un tiers. Le tiers connaissait-il le pacte ET l'intention du bénéficiaire de s'en prévaloir ?`, o:[[`Oui, les deux`,'pp1'],[`Il ne connaissait que le pacte`,'pp2'],[`Il ignorait tout`,'pp2']]},
    pp1:{r:`Le bénéficiaire peut demander la nullité de la vente ou sa substitution au tiers (art. 1123 al. 2).`, tone:'ok', ref:`Art. 1123 al. 2`},
    pp2:{r:`La vente au tiers tient ; seulement des dommages-intérêts contre le promettant. Le tiers aurait pu utiliser l'action interrogatoire (art. 1123 al. 3).`, tone:'mid', ref:`Art. 1123`}
  }
},
{
  id:'t-lesion', ch:'v5', title:'Le prix est-il attaquable ?', blurb:'Prix vil, déterminabilité, lésion de plus de 7/12.',
  start:'a',
  nodes:{
    a:{q:`Le prix a-t-il été fixé par les parties (ou est-il objectivement déterminable) ?`, o:[[`Oui`,'b'],[`Non : il dépend de la volonté d'une partie`,'c']]},
    c:{q:`La vente est-elle conclue en application d'un contrat cadre ?`, o:[[`Oui`,'cc'],[`Non : vente simple`,'nul']]},
    cc:{r:`Fixation unilatérale admise si elle est convenue, à charge de motiver ; l'abus est sanctionné par des dommages-intérêts, voire la résolution (art. 1164).`, tone:'mid', ref:`Art. 1164 ; Ass. plén. 1995`},
    nul:{r:`Vente nulle : le prix doit être déterminé et désigné par les parties (art. 1591 ; Com., 10 juill. 2024).`, tone:'ko', ref:`Art. 1591`},
    b:{q:`Le prix est-il si dérisoire qu'il équivaut à une absence de prix ?`, o:[[`Oui`,'vil'],[`Non, mais il est très bas`,'d']]},
    vil:{r:`Prix vil : la vente est nulle (nullité relative depuis 2016). Avec une promesse, la vilité s'apprécie au jour de la promesse (3e civ., 21 nov. 2024).`, tone:'ko', ref:`Prix sérieux`},
    d:{q:`S'agit-il de la vente d'un immeuble, et le vendeur agit-il ?`, o:[[`Oui`,'e'],[`Non (meuble, ou c'est l'acheteur)`,'ok']]},
    ok:{r:`Pas de sanction : la lésion n'est pas une cause de rescision, sauf texte spécial. L'acheteur ne peut jamais agir (art. 1683).`, tone:'mid', ref:`Art. 1683`},
    e:{q:`Le vendeur est-il lésé de plus de 7/12, et agit-il dans les 2 ans de la vente ?`, o:[[`Oui aux deux`,'res'],[`Non`,'ok2']]},
    ok2:{r:`Pas de rescision : seuil non atteint ou délai de forclusion expiré (art. 1674, 1676).`, tone:'ko', ref:`Art. 1674, 1676`},
    res:{r:`Rescision possible, même si le vendeur y avait renoncé. L'acheteur peut garder le bien en payant le supplément du juste prix, moins 1/10 du prix total (art. 1681).`, tone:'ok', ref:`Art. 1674, 1681`}
  }
},
{
  id:'t-risques', ch:'v8', title:'Qui supporte la perte ?', blurb:'La chose a disparu par cas fortuit après la vente.',
  start:'a',
  nodes:{
    a:{q:`La perte est-elle due à une faute d'une partie ?`, o:[[`Oui`,'faute'],[`Non, cas fortuit`,'b']]},
    faute:{r:`Pas de théorie des risques : c'est une question de responsabilité de la partie fautive.`, tone:'mid', ref:`Risque = absence de faute`},
    b:{q:`La vente est-elle sous condition suspensive non encore réalisée ?`, o:[[`Oui`,'cs'],[`Non`,'c']]},
    cs:{r:`La chose reste aux risques du vendeur (débiteur), même si les parties ont prévu un transfert de propriété rétroactif (art. 1304-6).`, tone:'ko', ref:`Art. 1304-6`},
    c:{q:`Une clause aménage-t-elle les risques ?`, o:[[`Oui : réserve de propriété + transfert immédiat des risques`,'acq'],[`Réserve de propriété seule`,'vend'],[`Aucune clause`,'d']]},
    vend:{r:`Res perit domino : le vendeur, resté propriétaire, supporte les risques.`, tone:'ko', ref:`Art. 1196 al. 3`},
    d:{q:`Le vendeur avait-il été mis en demeure de délivrer avant la perte ?`, o:[[`Oui`,'deb'],[`Non`,'acq']]},
    deb:{r:`Res perit debitori : le vendeur défaillant supporte la perte ; l'acheteur ne paie pas (ou récupère le prix).`, tone:'ko', ref:`Art. 1196 al. 3, 1344-2`},
    acq:{r:`L'acheteur supporte la perte : il doit payer le prix (risques transférés avec la propriété, ou par clause).`, tone:'ok', ref:`Res perit domino`}
  }
},
{
  id:'t-defaut', ch:'v9', title:'Non-conformité, vice ou éviction ?', blurb:'Trouve le bon fondement quand l\'acheteur se plaint.',
  start:'a',
  nodes:{
    a:{q:`D'où vient le trouble ?`, o:[[`Un tiers revendique un droit sur la chose`,'tiers'],[`Le vendeur lui-même trouble la jouissance`,'perso'],[`La chose elle-même`,'chose']]},
    perso:{r:`Garantie d'éviction du fait personnel : troubles de droit et de fait, d'ordre public (« qui doit garantie ne peut évincer »). Durée raisonnable pour la non-concurrence.`, tone:'ok', ref:`Art. 1626, 1628`},
    tiers:{q:`Le droit invoqué existait-il (dans sa cause) avant la vente, et l'acheteur l'ignorait-il ?`, o:[[`Oui`,'ev'],[`Non`,'noev'],[`La servitude promise n'a en fait jamais existé`,'nc']]},
    ev:{r:`Garantie d'éviction du fait d'un tiers (totale ou partielle). Une clause de non-garantie n'empêche pas la restitution du prix (art. 1629). Appel en garantie incidente possible.`, tone:'ok', ref:`Art. 1626 et s.`},
    noev:{r:`Pas de garantie : cause postérieure à la vente, ou acheteur de mauvaise foi (l'absence d'aléa chasse la garantie).`, tone:'ko', ref:`Art. 1629`},
    chose:{q:`La chose délivrée correspond-elle à ce qui était stipulé ?`, o:[[`Non : autre chose, autre quantité ou qualité (aliud)`,'nc'],[`Oui, mais un défaut caché la rend impropre à l'usage (pejus)`,'vc']]},
    nc:{r:`Défaut de délivrance conforme : responsabilité contractuelle de droit commun, prescription 5 ans à compter de la vente ; la réception ne purge pas la non-conformité apparente.`, tone:'ok', ref:`Art. 1603-1604`},
    vc:{q:`Le défaut était-il apparent lors de la réception ?`, o:[[`Oui`,'app'],[`Non`,'vc2']]},
    app:{r:`Vice apparent purgé par la réception : pas d'action en garantie des vices cachés.`, tone:'ko', ref:`Réception`},
    vc2:{r:`Garantie des vices cachés (art. 1641) : action rédhibitoire ou estimatoire, dans les 2 ans de la découverte du vice.`, tone:'ok', ref:`Art. 1641`}
  }
}
);
