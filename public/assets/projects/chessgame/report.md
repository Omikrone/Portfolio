# Chess Game - Un serveur de jeu d'échecs

## Rôle du serveur

Le serveur de jeu a pour rôle principal de gérer les **sessions de jeu** ainsi que la **communication** avec le moteur d'échecs `Euphron`. Il agit comme **intermédiaire** entre le client web et le moteur d'échecs.

C'est aussi la **source de vérité** de la partie, car il contient l'**état global** du plateau.

## Fonctionnalités implémentées

À ce jour, les fonctionnalités suivantes ont été implémentées :

**Gestion de sessions :**
- Création d'une partie
- Gestion de parties parallèles
- Vérification de la légalité des coups
- Destruction de parties terminées ou inactives

**Interopérabilité :**
- Protocole UCI pour communiquer avec un moteur d'échecs
- Communication avec un client web

## Architecture générale

Le serveur de jeu agit comme **intermédiaire** entre le client web et le moteur d'échecs. Pour cela, il doit pouvoir communiquer avec ces deux entités.

### Gestion globale des sessions : API REST

Afin de permettre la **création** ainsi que la **mise à jour** d'une partie, j'ai mis en place une **API REST** avec le framework C++ [Crow](https://crowcpp.org/master/). Celle-ci comporte trois routes principales :

- `POST /games` : création d'une nouvelle partie
- `GET /games/<int>` : récupération de l'état actuel d'une partie en cours
- `WebSocket /ws/<int>` : jouer des coups et mettre à jour la partie

Pour assurer la **sécurité** des données transmises, j'ai également mis en place des composants (`models`, `factories`, `mappers` et `controllers`) permettant la conversion sécurisée des données.

### Communication avec le moteur d'échecs : Protocole UCI

Afin d'assurer la communication avec le moteur d'échecs, j'ai choisi d'utiliser le protocole [UCI](https://www.chessprogramming.org/UCI). Ce protocole est devenu un standard pour la communication entre un GUI et un moteur d'échecs, et permet d'envoyer des commandes à ce dernier afin de mettre à jour sa position ou de lancer une recherche.

Une liste non exhaustive des commandes UCI est disponible dans la documentation du moteur [Stockfish](https://official-stockfish.github.io/docs/stockfish-wiki/UCI-&-Commands.html). Cette implémentation permettra plus tard à mon serveur de communiquer avec d'autres moteurs d'échecs que `Euphron`.

La communication UCI se fait normalement via l'entrée et la sortie standard (**stdin/stdout**). Cependant, pour des raisons de séparation des modules, j'ai décidé d'ajouter une **couche HTTP** autour de l'UCI.

De cette manière, le serveur ne communique pas avec `Euphron` via l'entrée et la sortie standard, mais plutôt via un **WebSocket** avec l'API d'Euphron. Pour assurer que la connexion avec une instance du moteur ne soit pas bloquante (lorsqu'on démarre une recherche par exemple), j'ai dû paralléliser les connexions via des **threads**.

## Futures améliorations

De nombreuses améliorations possibles sont encore à implémenter pour améliorer le serveur de jeu, dont :

- **Compatibilité avec d'autres moteurs UCI**
- **Sauvegarde de parties** dans une base de données