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

