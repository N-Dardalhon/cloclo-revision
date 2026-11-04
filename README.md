# Site de révision L3 : droit des biens et contrats spéciaux

Site statique (HTML/CSS/JS, aucune installation) : fiches, flashcards à répétition espacée, QCM, vrai/faux, articles à compléter, cas pratiques, schémas interactifs, examen blanc, XP, séries et badges. La progression est enregistrée dans le navigateur.

## Mettre en ligne (GitHub Pages)
1. Créer un dépôt GitHub (public) et y déposer **tout le contenu de ce dossier** (index.html à la racine).
2. Settings → Pages → *Deploy from a branch* → `main` / `/ (root)` → Save.
3. Le site est disponible à `https://<pseudo>.github.io/<depot>/` après ~1 minute.

## Matières
Un sélecteur (en haut du menu) permet de passer d'une matière à l'autre. Chaque matière a sa propre progression (XP, séries, badges).
- **Droit des biens** : `js/data/c1.js` … `c5.js`, schémas dans `js/data/trees.js`.
- **Contrats spéciaux (la vente)** : `js/data/v1.js` … `v9.js`, schémas dans `js/data/trees-vente.js`.

## Personnaliser
- Matières, chapitres, prénom et dates de partiel : `MATIERES` et `SITE` dans `js/data/core.js`.
- Date du partiel : page Progrès → Réglages.

## Hors ligne
Le site s'installe comme une appli (PWA) et fonctionne sans connexion après la première visite.
