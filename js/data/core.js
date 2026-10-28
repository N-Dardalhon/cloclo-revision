/* Noyau de données : chaque chapitre appelle DATA.load('cX', {...}) */
window.SITE = {
  title: "Droit des biens",
  subtitle: "Révisions L3",
  // Tu peux écrire le prénom ici pour sauter l'écran d'accueil : name: "Camille"
  name: "Clothilde",
  // Date du partiel préremplie (AAAA-MM-JJ), modifiable dans Progrès
  exam: "2026-11-07"
};
window.DATA = {
  chapters: [
    {id:'c1', n:1, part:'Partie 1 · Titre 1', title:'Les attributs du droit de propriété', short:'Attributs', blurb:'usus, fructus, abusus et libre transmissibilité', col:'#F2A6A0', src:'chapitre_1'},
    {id:'c2', n:2, part:'Partie 1 · Titre 1', title:'La portée du droit de propriété', short:'Portée', blurb:'dessus, dessous, eaux et accession', col:'#F3CE72', src:'chapitre_2_1'},
    {id:'c3', n:3, part:'Partie 1 · Titre 2', title:'La notion de possession', short:'Possession', blurb:'corpus, animus, vices et bonne foi', col:'#B9A6EB', src:'chapitre_1_1'},
    {id:'c4', n:4, part:'Partie 1 · Titre 2', title:'Le régime juridique de la possession', short:'Régime', blurb:'acquisition, perte et effets', col:'#9ED08A', src:'chapitre_2'},
    {id:'c5', n:5, part:'Partie 2 · Titre 1', title:"L'acquisition du droit de propriété", short:'Acquisition', blurb:'acte, occupation, usucapion et art. 2276', col:'#8CC6EC', src:'chapitre_1_2'}
  ],
  fiche:{}, cards:[], qcm:[], vf:[], cas:[], arts:[], gloss:[], juris:[], coursq:[], nums:[], trees:[],
  load(ch, o){
    const D=this;
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
