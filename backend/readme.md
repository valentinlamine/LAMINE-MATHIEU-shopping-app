# Documentation API-HTSO

## Fonctionnemment

L'API HowToSellOnline réalisé par [Valentin LAMINE](github.com/valentinlamine) permet de récupérer les données des iPhones, iPads et iMacs nécessaires à la boutique du côté front-end de ce projet.

Cette API est une **REST API**, Elle repose sur un serveur express basé sur NodeJS.

À l'heure actuelle elle ne possède aucune authentification particulière, elle est cependant dotée d'un limiteur de reqûete configuré pour que l'on puisse envoyer au maximum 30 requêtes par minutes.

## Utilisation de l'API

Pour utiliser l'API, il faut donc utiliser un lien web, actuellement configuré en localhost sur le port 3000, il faudra pour utiliser l'API se servir du lien suivant : 

```
http://localhost:3000/
```

Puis à la suite de cette base d'url on utilise la fonctionnalité que l'on souhaite 

## Fonctionnalités

### 1 - GetItems

#### Définition

Fonctionnalité principale de l'API qui permet de récupérer la liste de tous les objets présente dans sa base de données.

#### Appel

```
http://localhost:3000/items
```

#### Exemple 

```json
{
    "message": "Items found successfully !",
    "items": [
        {
            "id": "1",
            "name": "iPhone SE",
            "price": [
                ...
            ],
            "release_date": "2022-03-18",
            "colors": [
                ...
            ],
            "images": {
                ...
            },
            "currency": "USD",
            "storage": [
                ...
            ],
            "reduction": "0",
            "description": "...",
            "size": "4.7"
        },
	{
	...
	}
	]
}
```

### 2 - GetItem

#### Définition

Renvoie l'item correspondant à l'id donné dans l'url, gestion d'erreur pour id inconnu

#### Appel

```
http://localhost:3000/item/1
```

#### Exemple

```json
{
    "message": "Item found successfully !",
    "item": {
        "id": "1",
        "name": "iPhone SE",
        "price": [
            "559",
            "629",
            "759"
        ],
        "release_date": "2022-03-18",
        "colors": [
            "black",
            "white",
            "red"
        ],
        "images": {
            "red": [
                "img/1/1_red.jpg",
                "img/1/2_red.jpg",
                "img/1/3_red.jpg"
            ],
            "black": [
                "img/1/1_black.jpg",
                "img/1/2_black.jpg",
                "img/1/3_black.jpg"
            ],
            "white": [
                "img/1/1_white.jpg",
                "img/1/2_white.jpg",
                "img/1/3_white.jpg"
            ]
        },
        "currency": "USD",
        "storage": [
            "64GB",
            "128GB",
            "256GB"
        ],
        "reduction": "0",
        "description": "...",
        "size": "4.7"
    }
}
```

### 3 - GetIphone

#### Définition

Renvoie la liste de tous les iphones présent dans la base de données

#### Appel

```
http://localhost:3000/iphone
```

#### Exemple

```json
{
    "message": "Items found successfully !",
    "items": [
        {
            "id": "1",
            "name": "iPhone SE",
            "price": [
                "559",
                "629",
                "759"
            ],
            "release_date": "2022-03-18",
            "colors": [
                "black",
                "white",
                "red"
            ],
            "images": {
                ...
            },
            "currency": "USD",
            "storage": [
                "64GB",
                "128GB",
                "256GB"
            ],
            "reduction": "0",
            "description": "...",
            "size": "4.7"
        },
	{
	...
	}
	]
}
```

### 4 - GetIpad

#### Définition

Renvoie la liste de tous les ipads présent dans la base de données

#### Appel

```
http://localhost:3000/ipad
```

#### Exemple

```json
{
    "message": "Items found successfully !",
    "items": [
        {
            "id": "6",
            "name": "iPad Pro",
            "price": [
                "1069",
                "1199",
                "1449",
                "1949",
                "2249"
            ],
            "release_date": "2020-03-20",
            "colors": [
                "grey",
                "white"
            ],
            "images": {
                "grey": [
                    "img/6/1_grey.jpg",
                    "img/6/2_grey.jpg",
                    "img/6/3_grey.jpg"
                ],
                "white": [
                    "img/6/1_white.jpg",
                    "img/6/2_white.jpg",
                    "img/6/3_white.jpg"
                ]
            },
            "currency": "USD",
            "storage": [
                "128GB",
                "256GB",
                "512GB",
                "1TB",
                "2TB"
            ],
            "reduction": "0",
            "description": "...",
            "size": "11"
        },
	{
	...
	}
	]
}
```

### 5 - GetMac

#### Définition

Renvoie la liste de tous les macs présent dans la base de données

#### Appel

```
http://localhost:3000/mac
```

#### Exemple 

```json
{
    "message": "Items found successfully !",
    "items": [
        {
            "id": "10",
            "name": "MacBoock Air",
            "price": [
                "1499",
                "1849"
            ],
            "release_date": "2022-07-15",
            "colors": [
                "black",
                "white",
                "grey"
            ],
            "images": {
                "black": [
                    "img/10/1_black.jpg"
                ],
                "white": [
                    "img/10/1_white.jpg"
                ],
                "grey": [
                    "img/10/1_grey.jpg"
                ]
            },
            "currency": "USD",
            "storage": [
                "256GB",
                "512GB"
            ],
            "reduction": "0",
            "description": "...",
            "size": "13.6"
        },
	{
	...
	}
	]
}
```
