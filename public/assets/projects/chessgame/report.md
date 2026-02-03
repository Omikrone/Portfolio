# Chess Game - Un serveur de jeu d'échecs

## Rôle du serveur

Le serveur de jeu a pour mission principale de gérer les **sessions de partie** et d'assurer la communication avec le moteur d'échecs **Euphron**. Il joue le rôle **d'intermédiaire** entre le client web et le moteur.

Il constitue également la **source de vérité** de la partie, en conservant l'état global du plateau à tout moment.

**Fonctionnalités implémentées**

À ce jour, le serveur prend en charge les fonctionnalités suivantes :

**Gestion des sessions :**
- Création de **parties**
- Gestion de **parties simultanées**
- Vérification de la **légalité des coups**
- Suppression des parties terminées ou inactives

**Interopérabilité :**
- Communication avec un moteur d'échecs via le **protocole UCI**

## Architecture générale

Le serveur de jeu agit comme **intermédiaire** entre le client web et le moteur d'échecs. Pour cela, il doit pouvoir communiquer avec ces deux entités.

### Gestion globale des sessions : API REST

Pour permettre la création et la mise à jour des parties, j'ai mis en place une **API REST** utilisant le framework C++ **Crow**. Cette API comporte **trois routes principales** :
- **POST /games** : création d'une nouvelle partie
- **GET /games/<int>** : récupération de l'état actuel d'une partie en cours
- **WebSocket /ws/<int>** : envoi de coups et mise à jour en temps réel de la partie

Pour garantir la sécurité des données échangées, des composants (models, factories, mappers et controllers) ont été mis en place afin d'assurer une **conversion et un traitement sécurisés** des informations.

### Communication avec le moteur d'échecs : Protocole UCI

Pour assurer la communication avec le moteur d'échecs, j'ai choisi d'utiliser le **protocole UCI**. Ce protocole est devenu un **standard** pour l'échange entre une interface graphique et un moteur, et permet d'envoyer des commandes pour mettre à jour la position ou lancer une recherche.

Une liste non exhaustive des commandes UCI est disponible dans la documentation du moteur **Stockfish**. Cette implémentation permettra, à terme, au serveur de communiquer avec **d'autres moteurs** que Euphron.

Bien que la communication UCI se fasse normalement via l'entrée et la sortie standard (**stdin/stdout**), j'ai ajouté une **couche HTTP** pour mieux séparer les modules. Ainsi, le serveur communique avec Euphron via un **WebSocket** vers l'API du moteur, plutôt que par stdin/stdout.

Pour éviter que la connexion avec une instance du moteur ne devienne **bloquante** (par exemple lors du lancement d'une recherche), j'ai parallélisé les échanges en utilisant des **threads**, garantissant un **fonctionnement asynchrone** et fluide.

## Futures améliorations

Plusieurs optimisations et extensions sont encore envisageables pour le serveur de jeu, parmi lesquelles :
- **Compatibilité avec d'autres moteurs UCI**, afin de pouvoir remplacer ou compléter Euphron sans modifier le serveur
- **Sauvegarde des parties dans une base de données**, pour permettre leur reprise ultérieure et l'historique des parties