/* Arbres de décision : droit des sociétés (mineure L3). Ajoutés après trees.js. */
DATA.trees.push(
{
  id:'t-soc-qualif', ch:'s1', title:'Est-ce une société ?', blurb:'Apports, bénéfice, pertes, affectio societatis : élimine les structures voisines.',
  start:'a',
  nodes:{
    a:{q:`Au moins deux personnes affectent-elles des biens ou leur industrie à une entreprise commune (apports) ?`, o:[[`Oui`,'b'],[`Non : une seule personne exploite seule`,'ei'],[`Non : plusieurs sont propriétaires d'un même bien, sans entreprise commune`,'indiv']]},
    ei:{r:`Pas de contrat de société : c'est une entreprise individuelle (sans personnalité). Une société unipersonnelle suppose une forme prévue par la loi.`, tone:'ko', ref:`Art. 1832`},
    indiv:{r:`Indivision : propriété de plusieurs personnes sur un même bien non divisé en lots, sans affectation à une entreprise commune.`, tone:'ko', ref:`Société / indivision`},
    b:{q:`Dans quel but ?`, o:[[`Partager le bénéfice ou profiter d'une économie`,'c'],[`Un but autre que le partage des bénéfices`,'asso'],[`Développer l'activité de ses membres (activité auxiliaire)`,'gie']]},
    asso:{r:`Association (loi de 1901) : mise en commun permanente dans un but autre que le partage des bénéfices. Elle peut faire des bénéfices, pas les distribuer.`, tone:'ko', ref:`Art. 1er, loi 1901`},
    gie:{r:`Groupement d'intérêt économique : doté de la personnalité, son activité prolonge celle de ses membres.`, tone:'mid', ref:`GIE`},
    c:{q:`Chacun s'engage-t-il à contribuer aux pertes et à collaborer de manière égalitaire (affectio societatis) ?`, o:[[`Oui`,'d'],[`Non : un associé ne prend aucun risque ou est subordonné`,'non']]},
    non:{r:`Un élément constitutif manque : pas de société (par exemple un contrat de travail ou un prêt déguisé). Une clause exonérant un associé de toute perte serait léonine (art. 1844-1).`, tone:'ko', ref:`Art. 1832 al. 3, 1844-1`},
    d:{q:`Des statuts ont-ils été signés et la société immatriculée ?`, o:[[`Oui`,'ok'],[`Non, mais les éléments constitutifs se prouvent`,'fait'],[`Les associés ont choisi de ne pas l'immatriculer`,'part']]},
    ok:{r:`C'est une société, dotée de la personnalité juridique depuis son immatriculation.`, tone:'ok', ref:`Art. 1832`},
    fait:{r:`Société créée de fait : on prouve les éléments constitutifs (apports, bénéfice, pertes, affectio societatis) ; régime de la société en participation. Ex : concubins et gîtes (Com., 12 mai 2015).`, tone:'mid', ref:`Com., 12 mai 2015`},
    part:{r:`Société en participation : une vraie société, mais sans personnalité juridique (art. 1870 à 1873).`, tone:'mid', ref:`Art. 1870 à 1873`}
  }
},
{
  id:'t-soc-formation', ch:'s6', title:'Qui est tenu d\'un acte de la société en formation ?', blurb:'L\'acte signé avant l\'immatriculation : qui paie, et comment la société le reprend.',
  start:'a',
  nodes:{
    a:{q:`L'acte a-t-il été conclu avant l'immatriculation de la société ?`, o:[[`Oui`,'b'],[`Non, après`,'apres']]},
    apres:{r:`La société a la personnalité juridique depuis l'immatriculation : elle est tenue de l'acte conclu par son dirigeant.`, tone:'ok', ref:`Immatriculation`},
    b:{q:`La société a-t-elle repris l'acte ?`, o:[[`Oui, par mandat préalable`,'rep'],[`Oui, acte annexé aux statuts`,'rep'],[`Oui, délibération des associés après immatriculation`,'rep'],[`Non`,'c']]},
    rep:{r:`Reprise : l'acte est réputé contracté par la société dès l'origine (fiction) ; les personnes qui ont agi sont libérées.`, tone:'ok', ref:`Art. 1843, R210-6 C. com.`},
    c:{q:`Le juge peut-il retenir la commune intention d'agir au nom et pour le compte de la société en formation ?`, o:[[`Oui, au vu des circonstances (mentions de l'acte, exécution…)`,'juris'],[`Non`,'d']]},
    juris:{r:`Com., 29 nov. 2023 : appréciation souveraine des circonstances intrinsèques et extrinsèques ; l'acte est sauvé de la nullité. Attention à l'insécurité juridique.`, tone:'mid', ref:`Com., 29 nov. 2023`},
    d:{q:`La société est-elle civile ou commerciale ?`, o:[[`Commerciale`,'com'],[`Civile`,'civ']]},
    com:{r:`Les personnes qui ont agi sont tenues solidairement et indéfiniment. La cession de contrat à la société est refusée.`, tone:'ko', ref:`Art. L210-6 al. 2 C. com.`},
    civ:{r:`Les personnes qui ont agi sont tenues, sans solidarité (conjointement).`, tone:'ko', ref:`Art. 1843`}
  }
},
{
  id:'t-soc-dettes', ch:'s8', title:'Le créancier peut-il poursuivre l\'associé ?', blurb:'Écran social, obligation aux dettes : selon la forme sociale.',
  start:'a',
  nodes:{
    a:{q:`Quelle est la forme de la société ?`, o:[[`Société civile`,'sc'],[`SNC`,'snc'],[`SARL, SAS ou SA`,'lim']]},
    lim:{q:`La société est-elle en redressement ou liquidation judiciaire, avec une faute de gestion ?`, o:[[`Oui`,'comb'],[`Non`,'ecran']]},
    ecran:{r:`Écran social : l'associé n'est pas tenu des dettes sociales ; il ne risque que ses apports.`, tone:'ok', ref:`Écran social`},
    comb:{r:`Action en comblement de passif contre les fautifs : l'écran cède en cas de faute.`, tone:'mid', ref:`Comblement de passif`},
    sc:{q:`Le créancier a-t-il obtenu contre la société une décision définitive restée inexécutée ?`, o:[[`Oui`,'sc2'],[`Non : seulement une mise en demeure`,'sc3']]},
    sc3:{r:`Pas encore : il faut de vaines poursuites contre la société ; la mise en demeure ne suffit pas.`, tone:'ko', ref:`Art. 1858`},
    sc2:{r:`Oui, mais conjointement : chaque associé à proportion de sa part au capital à la date d'exigibilité.`, tone:'mid', ref:`Art. 1858`},
    snc:{q:`La société a-t-elle été mise en demeure sans effet ?`, o:[[`Oui`,'snc2'],[`Non`,'snc3']]},
    snc3:{r:`D'abord mettre la société en demeure : l'obligation des associés reste subsidiaire.`, tone:'ko', ref:`Art. L221-1 C. com.`},
    snc2:{r:`Oui, solidairement et indéfiniment : le créancier peut réclamer toute la dette à un seul associé.`, tone:'ok', ref:`Art. L221-1 C. com.`}
  }
},
{
  id:'t-soc-abus', ch:'s7', title:'Ce vote est-il abusif ?', blurb:'Abus de majorité, de minorité, d\'égalité : conditions et sanctions.',
  start:'a',
  nodes:{
    a:{q:`Le droit exercé est-il discrétionnaire (ex : agrément) ?`, o:[[`Oui`,'disc'],[`Non : un vote en assemblée`,'b']]},
    disc:{r:`Pas de contrôle de l'abus, sauf usage discriminatoire.`, tone:'mid', ref:`Droit d'agrément`},
    b:{q:`Le vote est-il contraire à l'intérêt social ?`, o:[[`Oui`,'c'],[`Non`,'pas']]},
    pas:{r:`Pas d'abus : un vote conforme à l'intérêt social est libre, même s'il déplaît aux autres associés.`, tone:'ok', ref:`Intérêt social`},
    c:{q:`Qui a voté ?`, o:[[`Le ou les majoritaires`,'maj'],[`Des minoritaires qui bloquent`,'min'],[`Un associé à 50 %`,'ega']]},
    maj:{q:`Le vote sert-il l'intérêt propre des majoritaires, au détriment des minoritaires ?`, o:[[`Oui`,'maj2'],[`Non`,'pas']]},
    maj2:{r:`Abus de majorité : dommages-intérêts et nullité de la résolution.`, tone:'ko', ref:`Abus de majorité`},
    min:{q:`Le blocage met-il en péril la pérennité de la société ?`, o:[[`Oui`,'min2'],[`Non`,'pas']]},
    min2:{r:`Abus de minorité : dommages-intérêts et désignation d'un mandataire qui vote à la place du minoritaire (pas de nullité possible).`, tone:'ko', ref:`Abus de minorité`},
    ega:{r:`Abus d'égalité : même régime que l'abus de minorité (mandataire, dommages-intérêts).`, tone:'ko', ref:`Abus d'égalité`}
  }
},
{
  id:'t-soc-objet', ch:'s9', title:'L\'acte hors objet social engage-t-il la société ?', blurb:'Objet social et pouvoirs du dirigeant selon la forme.',
  start:'a',
  nodes:{
    a:{q:`Quelle est la forme de la société ?`, o:[[`SARL, SAS ou SA`,'b'],[`Société civile`,'sc']]},
    sc:{r:`L'objet social est une limite absolue : l'acte qui le dépasse est annulable.`, tone:'ko', ref:`Objet social`},
    b:{q:`La société prouve-t-elle que le tiers savait que l'acte dépassait l'objet, ou ne pouvait l'ignorer ?`, o:[[`Oui`,'c'],[`Elle invoque seulement la publication des statuts`,'d'],[`Non`,'d']]},
    c:{r:`La société n'est pas engagée.`, tone:'mid', ref:`Art. L223-18 al. 5 C. com.`},
    d:{r:`La société est engagée (la publication des statuts ne suffit pas comme preuve). Le dirigeant a commis une faute qui engage sa responsabilité.`, tone:'ok', ref:`Art. L223-18 al. 5 C. com.`}
  }
}
);
