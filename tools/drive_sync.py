"""Synchronise la matière « Droit des sociétés » avec le dossier Google Drive où Julia dépose ses notes.

Utilisé par la skill Claude Code /cours-drive (.claude/skills/cours-drive/SKILL.md) : c'est Claude, dans une
session, qui rédige les fiches. Aucune clé d'API n'est utilisée.

  python tools/drive_sync.py verifier [--dossier DIR] [--sortie DIR]
      Télécharge les PDF (lien partagé, aucun identifiant), découpe aux titres « Leçon N : » et compare aux
      empreintes de tools/societes_etat.json. Écrit les notes des chapitres nouveaux ou modifiés dans
      DIR/sN.txt et affiche la liste en JSON.
  python tools/drive_sync.py enregistrer sN --titre T --court C --resume R [--dossier DIR]
      Une fois js/data/sN.js rédigé : enregistre l'empreinte, réécrit la liste des chapitres
      (js/data/societes.js), les balises <script> (index.html) et la version du cache (sw.js).
  python tools/drive_sync.py seed [--dossier DIR]
      Marque tous les chapitres actuels comme à jour.
"""
import argparse, hashlib, json, os, re, shutil, subprocess, sys, tempfile

FOLDER_ID = '1Kfb7Zg47Gu5Qe7ztEj_RGbu_anOGPKBQ'  # « Droit des sociétés - Pierre MOUSSERON » (L3 > S5 > Mineures)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ETAT = os.path.join(ROOT, 'tools', 'societes_etat.json')
MATIERE = os.path.join(ROOT, 'js', 'data', 'societes.js')
INDEX = os.path.join(ROOT, 'index.html')
SW = os.path.join(ROOT, 'sw.js')
COULEURS = ['#9BB8E8', '#F2A6A0', '#F3CE72', '#B9A6EB', '#9ED08A', '#8CC6EC', '#F5B38A', '#E9A6D2', '#A9DCD0', '#D8CF7E']
LECON = re.compile(r'(?im)^\s*le[çc]on\s*(\d+)\s*[:.–-]\s*(.*)$')


def log(*a):
    print(*a, flush=True)


# ---------------------------------------------------------------- Drive et PDF
def telecharger(dest):
    import time, gdown
    fichiers = None
    for essai in range(4):  # Google refuse parfois un fichier quand on télécharge souvent : on reprend
        try:
            fichiers = gdown.download_folder(id=FOLDER_ID, output=dest, quiet=True, resume=True)
            break
        except Exception as e:
            log('Téléchargement incomplet (%s), nouvel essai…' % type(e).__name__)
            time.sleep(20 * (essai + 1))
    if not fichiers:
        sys.exit('Téléchargement du dossier Drive impossible (lien plus partagé ?).')
    return dest


def numero(nom):
    m = re.match(r'\((\d+)\)', nom)
    return int(m.group(1)) if m else 10 ** 6


def etiquette(nom):
    """« (16) Julia - Droit des sociétés S5 - 25.11.2026.pdf » → « (16) 25.11.2026 »."""
    d = re.search(r'(\d{2}\.\d{2}\.\d{4})', nom)
    return '(%d) %s' % (numero(nom), d.group(1)) if d and numero(nom) < 10 ** 6 else os.path.splitext(nom)[0]


def lire_pdfs(dossier):
    import pypdf
    noms = sorted((n for n in os.listdir(dossier) if n.lower().endswith('.pdf')), key=lambda n: (numero(n), n))
    docs = []
    for n in noms:
        texte = '\n'.join(p.extract_text() or '' for p in pypdf.PdfReader(os.path.join(dossier, n)).pages)
        texte = re.sub(r'(?m)^[^\n]{0,60}?\bCM - Page \d+\s*', '', texte)  # pied de page des notes
        texte = re.sub(r'\(\d+\) \d\d/\d\d/\d{4} - Le[çc]on \d+\.?', ' ', texte)  # en-tête de page
        docs.append((etiquette(n), texte))
    return docs


def decouper(docs):
    """Chapitres {id: {'texte', 'src', 'titre'}} ; s0 = tout ce qui précède la leçon 1."""
    chap, cur = {}, 's0'
    def ajoute(cid, morceau, src):
        if not morceau.strip():
            return
        c = chap.setdefault(cid, {'texte': '', 'src': [], 'titre': ''})
        c['texte'] += morceau + '\n'
        if src not in c['src']:
            c['src'].append(src)
    for src, texte in docs:
        pos = 0
        for m in LECON.finditer(texte):
            ajoute(cur, texte[pos:m.start()], src)
            cur = 's%d' % int(m.group(1))
            chap.setdefault(cur, {'texte': '', 'src': [], 'titre': m.group(2).strip()})['titre'] = m.group(2).strip()
            pos = m.start()
        ajoute(cur, texte[pos:], src)
    return chap


def empreinte(texte):
    return hashlib.sha256(re.sub(r'\s+', ' ', texte).strip().encode()).hexdigest()[:16]


# ---------------------------------------------------------------- État
def lire_etat():
    with open(ETAT, encoding='utf-8') as f:
        return json.load(f)


def ecrire_etat(etat):
    with open(ETAT, 'w', encoding='utf-8') as f:
        json.dump(etat, f, ensure_ascii=False, indent=1)
        f.write('\n')


def etat_depuis_matiere():
    """Premier lancement : reprend parties et chapitres écrits à la main dans societes.js."""
    s = open(MATIERE, encoding='utf-8').read()
    bloc = s[s.index('/* chapitres:debut */'):s.index('/* chapitres:fin */')]
    lit = lambda v: v.replace("\\'", "'")
    chapitres = {}
    for ligne in re.findall(r"\{id:'s\d+'.*\}", bloc):
        c = {k: lit(v) for k, v in re.findall(r"(\w+):'((?:[^'\\]|\\.)*)'", ligne)}
        c['n'] = int(re.search(r'n:(\d+)', ligne).group(1))
        c['src'] = [lit(x) for x in re.findall(r"'((?:[^'\\]|\\.)*)'", re.search(r'src:\[(.*?)\]', ligne).group(1))]
        chapitres[c.pop('id')] = c
    parts_js = re.search(r'parts:\s*(\[.*?\]),\s*chapters:', bloc, re.S).group(1)
    parts = json.loads(re.sub(r"'((?:[^'\\]|\\.)*)'", lambda m: json.dumps(lit(m.group(1)), ensure_ascii=False), parts_js))
    return {'dossier': FOLDER_ID, 'parts': parts, 'chapitres': chapitres}


# ---------------------------------------------------------------- Réécriture du site
def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def ecrire_matiere(etat):
    ids = sorted(etat['chapitres'], key=lambda c: etat['chapitres'][c]['n'])
    lignes = ['  parts: [']
    lignes.append(',\n'.join('    [%s, [%s]]' % (js_str(p), ', '.join('[%s, [%s]]' % (js_str(g), ', '.join(js_str(i) for i in l)) for g, l in groupes))
                             for p, groupes in etat['parts']))
    lignes.append('  ],')
    lignes.append('  chapters: [')
    champs = []
    for cid in ids:
        c = etat['chapitres'][cid]
        champs.append('    {id:%s, n:%d, part:%s, title:%s, short:%s, blurb:%s, col:%s, src:[%s]}' % (
            js_str(cid), c['n'], js_str(c['part']), js_str(c['title']), js_str(c['short']), js_str(c['blurb']), js_str(c['col']),
            ', '.join(js_str(x) for x in c['src'])))
    lignes.append(',\n'.join(champs))
    lignes.append('  ]')
    s = open(MATIERE, encoding='utf-8').read()
    a, b = s.index('/* chapitres:debut */') + len('/* chapitres:debut */'), s.index('  /* chapitres:fin */')
    nouveau = s[:a] + '\n' + '\n'.join(lignes) + '\n' + s[b:]
    if nouveau != s:
        open(MATIERE, 'w', encoding='utf-8').write(nouveau)
    return ids


def ecrire_index(ids):
    s = open(INDEX, encoding='utf-8').read()
    a = s.index('<!-- societes:debut -->') + len('<!-- societes:debut -->')
    b = s.index('<!-- societes:fin -->')
    retrait = re.search(r'\n([ \t]*)<!-- societes:fin -->', s).group(1)
    corps = ''.join('\n%s<script src="js/data/%s.js"></script>' % (retrait, i) for i in ids)
    nouveau = s[:a] + corps + '\n' + retrait + s[b:]
    if nouveau != s:
        open(INDEX, 'w', encoding='utf-8').write(nouveau)


def monter_cache():
    s = open(SW, encoding='utf-8').read()
    s = re.sub(r"cloclo-revision-v(\d+)", lambda m: 'cloclo-revision-v%d' % (int(m.group(1)) + 1), s, count=1)
    open(SW, 'w', encoding='utf-8').write(s)


# ---------------------------------------------------------------- Programme
def chapitres_du_drive(dossier):
    tmp = None
    if not dossier:
        tmp = tempfile.mkdtemp(prefix='drive-')
        dossier = telecharger(tmp)
    try:
        docs = lire_pdfs(dossier)
    finally:
        if tmp:
            shutil.rmtree(tmp, ignore_errors=True)
    return len(docs), decouper(docs)


def ordre(ids):
    return sorted(ids, key=lambda c: int(c[1:]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('action', choices=['verifier', 'enregistrer', 'seed'])
    ap.add_argument('chapitre', nargs='?')
    ap.add_argument('--dossier', help='PDF déjà téléchargés (sinon : téléchargement du Drive)')
    ap.add_argument('--sortie', default=os.path.join(tempfile.gettempdir(), 'cours-drive'))
    ap.add_argument('--titre'); ap.add_argument('--court'); ap.add_argument('--resume')
    args = ap.parse_args()

    nb, chapitres = chapitres_du_drive(args.dossier)
    etat = lire_etat() if os.path.exists(ETAT) else etat_depuis_matiere()

    if args.action == 'seed':
        for cid, c in chapitres.items():
            if cid in etat['chapitres']:
                etat['chapitres'][cid].update(hash=empreinte(c['texte']), src=c['src'], mode='main')
        ecrire_etat(etat)
        log('État enregistré.')
        return

    if args.action == 'verifier':
        os.makedirs(args.sortie, exist_ok=True)
        a_faire = []
        for cid in ordre(chapitres):
            c, connu = chapitres[cid], etat['chapitres'].get(cid)
            if connu and connu.get('hash') == empreinte(c['texte']):
                continue
            chemin = os.path.join(args.sortie, cid + '.txt')
            open(chemin, 'w', encoding='utf-8').write(c['texte'])
            a_faire.append({'chapitre': cid, 'etat': 'modifié' if connu else 'nouveau', 'titre_pdf': c['titre'],
                            'titre_actuel': connu and connu.get('title'), 'sources': c['src'], 'notes': chemin,
                            'fiche': 'js/data/%s.js' % cid})
        print(json.dumps({'pdf': nb, 'chapitres': ordre(chapitres), 'a_faire': a_faire}, ensure_ascii=False, indent=1))
        return

    cid = args.chapitre
    if not cid or cid not in chapitres:
        sys.exit('Chapitre inconnu dans le Drive : %s' % cid)
    if not os.path.exists(os.path.join(ROOT, 'js', 'data', cid + '.js')):
        sys.exit("Rédige d'abord js/data/%s.js" % cid)
    c, n = chapitres[cid], int(cid[1:])
    connu = etat['chapitres'].get(cid)
    if not connu:
        derniere = etat['parts'][-1]
        connu = etat['chapitres'][cid] = {'n': n, 'part': '%s · Leçon %d' % (derniere[0].split(' · ')[0], n),
                                           'col': COULEURS[n % len(COULEURS)], 'title': '', 'short': '', 'blurb': ''}
        derniere[1][-1][1].append(cid)
    for cle, val in (('title', args.titre), ('short', args.court), ('blurb', args.resume)):
        if val:
            connu[cle] = val.strip()
    if not (connu['title'] and connu['short']):
        sys.exit('--titre et --court sont obligatoires pour un nouveau chapitre')
    connu.update(hash=empreinte(c['texte']), src=c['src'], mode='claude')
    ecrire_etat(etat)
    ecrire_index(ecrire_matiere(etat))
    monter_cache()
    log('%s enregistré : %s' % (cid, connu['title']))


if __name__ == '__main__':
    main()
