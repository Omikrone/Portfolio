# Chess Game - Un serveur de jeu d'échecs

## Rôle du serveur

Le serveur de jeu a pour rôle principal la gestion des sessions de jeu ainsi que la communication avec le moteur d'échecs `Euphron`. Il agit comme intermédiaire et médiateur entre le client web et le moteur d'échecs. C'est aussi la source de vérité de la partie, car il contient l'état global du plateau.

## Fonctionnalités implémentées

À ce jour, les fonctionnalités suivantes ont été implémentées:

**Gestion de sessions:**
- Création d'une partie
- Gestion de parties parallèles
- Vérification de la légalité d'une partie
- Destruction de parties terminées ou inactives

**Interopérabilité:**
- Protocole UCI pour communiquer avec un moteur d'échecs
- Communication avec un client Web

## Architecture générale

Le serveur de jeu agit comme intermédiaire entre le client web et le moteur d'échecs, il doit donc pouvoir communiquer avec ces deux entités.

### Gestion globale des sessions: API REST

Afin de permettre la création ainsi que la mise à jour d'une partie, j'ai mis en place une API REST avec le framework C++ [Crow](https://crowcpp.org/master/). Celle-ci comporte deux routes principales:
- Une route `POST` `/games` permettant de créer une nouvelle partie
- Une route `GET` `/games/<int>` qui permet de récupérer l'état actuel d'une partie en cours
- Une route WebSocket `/ws/<int>` pour jouer des coups et mettre à jour la partie

Pour assurer la sécurité des données transmises, j'ai également mis en place des `models`, `factories`, `mappers` et `controllers` permettant la conversion sécurisée des données.

### Communication avec le moteur d'échecs: Protocole UCI

Afin d'assurer la communication avec le moteur d'échecs, j'ai choisi d'utiliser le protocole [UCI](https://www.chessprogramming.org/UCI). Ce protocole est devenu un standard pour la communication entre un GUI et un moteur d'échecs, et permet d'envoyer des commandes à ce dernier, afin de mettre à jour sa position, ou alors de lancer une recherche. Une liste non exhaustive des commandes UCI est disponible dans la documentation du moteur [Stockfish](https://official-stockfish.github.io/docs/stockfish-wiki/UCI-&-Commands.html). Cette implémentation permettra plus tard à mon serveur de communiquer avec d'autres moteurs d'échecs autres que `Euphron`.

La communication UCI se fait normalement via l'entrée et la sortie standard d'un moteur, cependant, pour des raisons de séparation des modules, j'ai décidé d'ajouter une couche HTTP autour de cette UCI. De cette manière, le serveur ne communique pas avec `Euphron` via l'entrée et sortie standard, mais plutôt via un websocket avec l'API d'Euphron. Pour assurer que la connexion avec une instance du moteur ne soit pas bloquante (lorsqu'on démarre une recherche par exemple), j'ai dû assurer la parallélisation des connexions via des threads.

## Futures améliorations

De nombreuses améliorations possibles sont encore à implémenter pour améliorer le serveur de jeu, dont:
- Compatibilité avec d'autres moteurs UCI
- Sauvegarde de parties dans une base de données