# Droit des biens — site de révision (L3)

Site statique (HTML/CSS/JS, aucune installation) : fiches, flashcards à répétition espacée, QCM, vrai/faux, articles à compléter, cas pratiques, schémas interactifs, examen blanc, XP, séries et badges. La progression est enregistrée dans le navigateur.

## Mettre en ligne (GitHub Pages)
1. Créer un dépôt GitHub (public) et y déposer **tout le contenu de ce dossier** (index.html à la racine).
2. Settings → Pages → *Deploy from a branch* → `main` / `/ (root)` → Save.
3. Le site est disponible à `https://<pseudo>.github.io/<depot>/` après ~1 minute.

## Personnaliser
- Prénom et date du partiel préréglés : `SITE.name` et `SITE.exam` (dans `js/data/core.js`) (sinon le site le demande à la première visite).
- Contenu : `js/data/c1.js` … `c5.js` (un fichier par chapitre), `js/data/trees.js` (schémas).
- Date du partiel : page Progrès → Réglages.

## Hors ligne
Le site s'installe comme une appli (PWA) et fonctionne sans connexion après la première visite.
