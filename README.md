# LAMINE-MATHIEU-shopping-app
Ce projet a été réalisé par Valentin Lamine et Philippe Mathieu dans le cadre d'un devoir scolaire visant à reproduire un 
site de vente grace à l'utilisation de nodeJS, d'une API et d'une base de données en backend ainsi que l'utilisation de html/css 
et javascript pour le frontend.

# Utilisation du projet 

Pour accéder au projet il faut tout d'abord le cloner dans un dossier vide avec la commande :
```bash
git clone https://github.com/valentinlamine/LAMINE-MATHIEU-shopping-app.git
```
Ensuite il faut lancer le serveur node JS pour pouvoir faire les requêtes à l'api. Pour ce faire il faut ce placer dans le dossier backend 
et lancer le serveur grâce aux commandes suivantes :
```
cd .\backend\
npm start
```
Il faut bien entendu avoir installer nodejs sur sa machine et le serveur express.

# Organisation des dossiers

Le projet est organisé en plusieurs dossiers :

## dossier frontend 

Contient tout les dossiers et pages html pour le frontend du site.

-Dans le dossier [css](css) on retrouve tout les feuilles de styles pour le design du site:

-[cart.css](css/cart.css) pour le design du panier.
-[detail.css](css/detail.css) pour le design de la page détail.
-[font.css](css/font.css) pour le design de la police d'écriture.
-[load.css](css/load.css) pour le design pendant le chargement de la page.
-[style.css](css/style.css) pour le design de la page index.

-Dans le dossier [fonts](fonts) on retrouve les différentes police d'écriture utilisées pour le site. 

-Dans le dossier [img](img) on retrouve les différentes images utilisées pour le site.

-Dans le dossier [script](script) on retrouve les différents scripts js utilisés pour le frontend :

-[cart.js](script/cart.js) pour les scripts pour le panier.
-[detail.js](script/detail.js) pour les scripts de la page detail.
-[main.js](script/main.js) pour les scripts de la page index.

## dossier backend 

le dossier backed comprends les différents dossiers pour le bon fonctionnement du backend:

Le dossier [controllers](backend/controllers) comprends la base de donnée et le script pour récuperer ses données:

-[data.json](backend/controllers/data.json) comprend la base de données.
-[main.js](backend/controllers/main.js) contient le script pour récupérer les données de la base de données.

le dossier [node_modules](backend/node_modules) contient les fichiers pour le bon fonctionnement de NodeJS.

Le dossier [routes](backend/routes) contient les différentes routes.

Le fichier [app.js](backend/app.js) permet de mettre en place l'application express et de démarrer le serveur. 

# Répartition des tâches 

## --BACKEND--
- Création de la base de données : Philippe 
- Création des assets de la base de données : Valentin
- Base du serveur NodeJS Express : Phillpe & Valentin
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