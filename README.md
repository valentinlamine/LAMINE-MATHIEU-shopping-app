# LAMINE-MATHIEU-shopping-app

Ce projet a été réalisé par Valentin Lamine et Philippe Mathieu dans le cadre d'un devoir scolaire visant à reproduire un
site de vente grâce à l'utilisation de nodeJS, d'une API et d'une base de données en backend ainsi que l'utilisation de html/css
et javascript pour le frontend.

# Utilisation du projet

Pour accéder au projet, il faut tout d'abord le cloner dans un dossier vide avec la commande :

```bash
git clone https://github.com/valentinlamine/LAMINE-MATHIEU-shopping-app.git
```

Ensuite, il faut lancer le serveur node JS pour pouvoir faire les requêtes à l'api. Pour ce faire, il faut se placer dans le dossier backend et lancer le serveur grâce aux commandes suivantes :

```
cd .\backend\
npm start
```

Il faut bien entendu avoir installé nodejs sur sa machine et le serveur express.

# Organisation des dossiers

Le projet est organisé en plusieurs dossiers :

## dossier frontend

Contient tous les dossiers et pages html pour le frontend du site.

* Dans le dossier [css,](frontend/css) on retrouve toutes les feuilles de styles pour le design du site :

  * [cart.css](frontend/css/cart.css) pour le design du panier.
  * [detail.css](frontend/css/detail.css) pour le design de la page détail.
  * [font.css](frontend/css/font.css) pour le design de la police d'écriture.
  * [load.css](frontend/css/load.css) pour le design pendant le chargement de la page.
  * [style.css](frontend/css/style.css) pour le design de la page index.
* Dans le dossier [fonts,](frontend/fonts) on retrouve les différentes polices d'écriture utilisées pour le site.
* Dans le dossier [img,](frontend/img) on retrouve les différentes images utilisées pour le site.
* Dans le dossier [script,](frontend/script) on retrouve les différents scripts js utilisés pour le frontend :

  * [cart.js](frontend/script/cart.js) pour les scripts pour le panier.
  * [detail.js](frontend/script/detail.js) pour les scripts de la page detail.
  * [main.js](frontend/script/main.js) pour les scripts de la page index.

## dossier backend

Le dossier backed comprend les différents dossiers pour le bon fonctionnement du backend :

Le dossier [controllers](backend/controllers) comprend la base de donnée et le script pour récupérer ses données :

* [data.json](backend/controllers/data.json) comprend la base de données.
* [main.js](backend/controllers/main.js) contient le script pour récupérer les données de la base de données.

Le dossier [node_modules](backend/node_modules) contient les fichiers pour le bon fonctionnement de NodeJS.

Le dossier [routes](backend/routes) contient les différentes routes.

Le fichier [app.js](backend/app.js) permet de mettre en place l'application express et de démarrer le serveur.

# Répartition des tâches

## --BACKEND--

- Création de la base de données : Philippe
- Création des assets de la base de données : Valentin
- Base du serveur NodeJS Express : Phillipe & Valentin
- Création des routes : Valentin
- Création du rate limiter : Valentin
- Finition du serveur Backend : Valentin
- Finition de l'API : Valentin
- Documentation de l'API : Valentin

## --FRONTEND--

- Correction de BUG : Philippe & Valentin
- Création de la page détails : Philippe
- Création du Header : Philippe
- Création du footer : Philippe
- Création des cards : Philippe
- Création du design de la page index : Valentin
- Redesign index et détail : Valentin
- Création du README.MD : Philippe
- Création du Système et design de panier : Valentin
- Création du filtre de base : Philippe
- Amélioration en filtres multiples : Valentin
- Création formulaire unique carte : Valentin
- Système de tri unique : Philippe & Valentin
- Système de tri multiple : Valentin
- Système du panier (localstorage + fonctionnel) : Valentin
- Système de redirection page details : Philippe
