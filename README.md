# Site de révision L3 : droit des biens et contrats spéciaux

Site statique (HTML/CSS/JS, aucune installation) : fiches, flashcards à répétition espacée, QCM, vrai/faux, articles à compléter, cas pratiques, schémas interactifs, examen blanc, XP, séries et badges. La progression est enregistrée dans le navigateur.

## Mettre en ligne (GitHub Pages)
1. Créer un dépôt GitHub (public) et y déposer **tout le contenu de ce dossier** (index.html à la racine).
2. Settings → Pages → *Deploy from a branch* → `main` / `/ (root)` → Save.
3. Le site est disponible à `https://<pseudo>.github.io/<depot>/` après ~1 minute.

## Fiches de cours
Chaque fiche a un **sommaire à gauche** : tous les titres (sections, paragraphes, sous-parties de la section en cours), la progression de lecture et le temps restant. Un clic mène au titre, et l'adresse de la page pointe vers lui (`#/fiche/c1/<titre>`), donc on peut la garder en favori. Sur petit écran, le bouton **Sommaire** en bas (ou la touche `S`) ouvre le sommaire en tiroir.

## Matières
Un sélecteur (en haut du menu) permet de passer d'une matière à l'autre. Chaque matière a sa propre progression (XP, séries, badges).
- **Droit des biens** : `js/data/c1.js` … `c5.js`, schémas dans `js/data/trees.js`.
- **Contrats spéciaux (la vente)** : `js/data/v1.js` … `v12.js` (cours complet : jusqu'aux vices cachés, à la garantie de conformité, à l'obligation de sécurité et aux obligations de l'acheteur), schémas dans `js/data/trees-vente.js`.
- **Droit des sociétés (mineure L3)** : `js/data/societes.js` (la matière et la liste des chapitres) et `js/data/s0.js` … `s9.js`, tirés des notes de cours partagées sur Google Drive ; épreuves dans `js/data/epreuves-societes.js`, schémas dans `js/data/trees-societes.js`.

### Nouveaux cours depuis le Drive
Dans Claude Code, taper **`/cours-drive`** (ou demander « récupère les cours de Julia ») : Claude télécharge le dossier Drive « Droit des sociétés » (partagé par lien), repère les leçons nouvelles ou complétées (empreintes dans `tools/societes_etat.json`), rédige leurs fiches, flashcards, QCM et glossaire, puis les inscrit sur le site avec `tools/drive_sync.py`. Aucune clé d'API : tout passe par l'abonnement Claude. Les consignes sont dans `.claude/skills/cours-drive/SKILL.md`.

## Épreuves type partiel
Page Jouer → *Épreuves type partiel* : dissertations, commentaires, cas pratiques et questions, dont beaucoup **hors du cours** (servitudes, usufruit, indivision, vices cachés, droit de la consommation, CVIM…). Chaque sujet : analyse guidée du sujet (anti hors-sujet), kit de survie, plan corrigé, points attendus. Aussi : méthode anti hors-sujet et exercice « Lire un sujet ». Données : `js/data/epreuves-biens.js`, `js/data/epreuves-vente.js` et `js/data/epreuves-societes.js`.

## Le prof (dans le cerveau caché)
Bouton **Le prof** du cerveau (`js/prof.js`) : un tuteur qui raisonne sur tout le cours (fiches, cartes, articles, arrêts, pièges, épreuves). Il comprend l'intention (définition, différence entre deux notions, conditions, pourquoi, exemple, cas pratique, plan, « interroge-moi », « par quoi je commence »), tolère les fautes, se souvient du sujet, affiche son raisonnement pendant que les neurones s'allument, corrige les réponses écrites et retient les notions ratées.
- **Cours** (bouton *Cours*, ou « fais-moi cours sur la possession ») : la fiche découpée en parties, expliquée une par une, avec « ce qu'il faut retenir » et une question de vérification ; réexplication autrement si ce n'est pas compris ; progression mémorisée (« reprends le cours »).
- **Cas pratique** (bouton *Cas pratique*, ou coller les faits et la question) : le prof repère les problèmes de droit (un par schéma de raisonnement), donne le plan de copie et, pour chaque problème, ce qu'il faut écrire : problème de droit, majeure (articles du cours), mineure (les faits à citer), conclusion. *Résoudre pas à pas* déroule le schéma question par question en montrant la phrase des faits à regarder, puis rédige la copie. On peut aussi demander « donne-moi un cas pratique », rédiger sa réponse et recevoir une correction notée avec le corrigé.
- **Restitution** (« je te restitue le chapitre 5 ») : on récite sans regarder (écrit ou micro), le prof liste ce qui est retenu et ce qui manque, et note sur 20.
- **Le savais-tu ?** (« apprends-moi quelque chose ») : une notion, un arrêt ou un chiffre pas encore maîtrisé.
- **Vue d'ensemble** (« explique-moi le droit des biens », « résume le chapitre 2 ») : le fil rouge de la matière, le plan et les notions de base, ou le chemin d'un chapitre partie par partie.
- **Moteur simple** : hors ligne et gratuit, par défaut ; il assemble ses réponses à partir des passages du cours.
- **IA locale** (⚙ dans le cerveau, `js/llm.js`) : un vrai modèle de langage (Qwen 3.5, 0,5 à 2,4 Go selon le modèle choisi) tourne dans le navigateur grâce à WebGPU, via WebLLM. Pour chaque question, le prof cherche les passages du cours qui y répondent et le modèle rédige une vraie explication à partir d'eux, en tenant compte de la conversation. Gratuit, sans compte, rien ne quitte l'appareil ; le modèle est téléchargé une fois depuis Hugging Face puis gardé en cache (le service worker ne touche jamais à ce cache).
- **Mode Claude** (⚙ dans le cerveau) : avec une clé API Anthropic personnelle, le prof passe sur Claude, qui cherche lui-même dans le cours avec des outils, répond hors cours et note dans la répétition espacée. La clé reste dans le navigateur ; chaque question est facturée sur le compte Anthropic.

## Personnaliser
- Matières, chapitres, prénom et dates de partiel : `MATIERES` et `SITE` dans `js/data/core.js`.
- Date du partiel : page Progrès → Réglages.

## Hors ligne
Le site s'installe comme une appli (PWA) et fonctionne sans connexion après la première visite.
