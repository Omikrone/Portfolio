# Chessboard - Une librairie d'échecs optimisée

## Rôle de la librairie

Cette librairie sert **d'interface publique** et fournit l'ensemble des méthodes nécessaires pour gérer une partie d'échecs. Elle permet notamment d'appliquer et de retirer des coups, tout en vérifiant que les règles du jeu sont respectées.

La librairie statique **Chessboard** constitue ainsi une brique fondamentale du système, utilisable aussi bien par le moteur **Euphron** que par le serveur **Chessgame**, afin de garantir la légalité des coups.

## Fonctionnalités implémentées

À ce jour, les fonctionnalités suivantes ont été intégrées :

**Règles du jeu :**
- Génération des **coups légaux** pour une position donnée
- Gestion des **règles spéciales** : prise en passant, roque, promotion…
- Vérification et application d'un coup sur le plateau
- Retrait d'un coup (utile pour la recherche du moteur)
- Sauvegarde des coups d'une partie dans un **historique**
- Hachage d'une position avec le [hachage Zobrist](https://fr.wikipedia.org/wiki/Fonction_de_hachage_de_Zobrist) (pour la détection d'une fin de partie)

**Interopérabilité :**
- Import et export d'une position au format [FEN](https://fr.wikipedia.org/wiki/Notation_Forsyth-Edwards) (Forsyth-Edwards Notation)
- Conversion d'un coup au format **UCI** (pour compatibilité avec le moteur)

## Architecture & structure

La structure de la librairie Chessboard a beaucoup évolué au fil des versions, avec une évolution majeure entre la version 0 et la version 1 actuelle.

### Version 0 : Programmation Orientée Objet

La version 0 correspond à la première version fonctionnelle du jeu, lorsque la librairie Chessboard était encore étroitement liée au serveur Chessgame. Pour des raisons de simplicité, le jeu avait été implémenté selon le paradigme de la **POO** (*Programmation Orientée Objet*), chaque composant étant représenté par une classe distincte (classe Piece, Square, etc.).

Cette architecture avait l'avantage d'être simple à mettre en œuvre et m'a permis d'obtenir une bonne vision d'ensemble dès le début. Cependant, son principal inconvénient était la **performance**. En effet, la génération de tous les coups légaux d'une position prenait environ **2 ms**. Cela peut sembler négligeable, mais un moteur doit explorer des millions de positions : en pratique, l'utilisation de cette librairie limitait rapidement la recherche en termes de temps. Il était donc nécessaire de trouver une approche plus efficace.

### Version 1 : Utilisation de Bitboards

Après quelques recherches, j'ai constaté que la grande majorité des moteurs d'échecs modernes utilisaient une représentation très différente du jeu : les **bitboards**. Un bitboard est une structure de données sous forme de **tableau de bits**, chaque bit correspondant à une case du plateau.

Ainsi, au lieu de représenter le plateau par un tableau d'objets Piece, on le représente par un **entier non signé de 64 bits**, chaque bit correspondant à l'état d'une case du plateau de 64 cases.

On peut représenter la position de toutes les pièces avec une variable comme suit (pseudo-code) :
```cpp
uint64_t all_pieces = 
  1 1 1 1 1 1 1 1
  1 1 1 1 1 1 1 1
  0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0
  1 1 1 1 1 1 1 1
  1 1 1 1 1 1 1 1
```

Cette représentation permet de connaître la position de toutes les pièces sur le plateau, mais elle ne permet ni de distinguer le type de pièce (pion, tour, etc.), ni sa couleur (blanche ou noire).

La solution consiste à créer **14 autres bitboards** (6 pour chaque type de pièce × 2 couleurs, plus 2 supplémentaires pour les positions de toutes les pièces d'une même couleur). Au total, on obtient donc **15 entiers non signés** qui, combinés, permettent de représenter l'ensemble des pièces sur le plateau.

### Optimisation des bitboards

Cette structure de données pour représenter l'état d'un plateau est extrêmement efficace, principalement pour deux raisons :

**Mémoire :** au lieu de stocker 64 objets distincts (chacun possédant ses propres attributs), on ne conserve que 15 entiers en mémoire. Cela représente un **gain de place significatif** et permet une meilleure utilisation des **caches CPU**.

**Temps d'exécution :** dans la version 0, déplacer une pièce impliquait d'accéder à l'index correspondant dans le tableau, de récupérer l'adresse de l'objet, de mettre à jour l'adresse de la case d'arrivée, et, le cas échéant, de libérer la mémoire de la pièce capturée (une gestion améliorée avec unique_ptr).

Avec les bitboards, la même opération est beaucoup plus rapide : il suffit d'effectuer un **décalage de bits** pour déplacer la pièce. Pour synchroniser les autres bitboards, on réalise simplement un OR entre le bitboard de la pièce concernée, ceux des couleurs, et celui de l'état global. Comme ce ne sont que des **instructions CPU simples** (AND, OR, NOT, XOR), la mise à jour du plateau devient extrêmement rapide.

Ainsi, pour générer tous les coups légaux d'une position donnée, le programme prend environ **60 µs**, soit **33× plus rapide** que l'implémentation naïve en POO.

### Tables de mouvements pré-calculées

La majeure partie du temps de génération des coups légaux est consacrée aux mouvements spécifiques à chaque type de pièce. Pour gérer cela, j'ai créé une classe **MoveGenerator** qui calcule pour chaque pièce ses mouvements bruts (sans vérifier les règles comme l'échec au roi).

Cependant, ce système peut rester relativement coûteux, même avec les bitboards. Pour y remédier, j'ai mis en place des **tables de mouvements pré-calculées**, générées au lancement du programme. Ces tables concernent uniquement les **rois, cavaliers et pions**, car les mouvements des autres pièces dépendent de trop de facteurs différents.

Au démarrage, pour chaque position possible de ces pièces, on calcule toutes les cases de destination possibles. Cela pourrait sembler gourmand en mémoire, mais ce n’est pas le cas : un bitboard est simplement un entier non signé de 64 bits, donc très léger.

Ce léger coût mémoire est largement compensé par le **gain de performance** : pour générer les coups des pièces dont les mouvements sont pré-calculés, il suffit de récupérer la table correspondant à leur position initiale, plutôt que de recalculer la logique des mouvements. L'accès se fait ainsi en **O(1)**.

## Intégration dans Euphron et Chessgame

L'intégration de cette librairie par les autres modules est relativement simple. Une approche efficace consiste à cloner directement le dépôt via le fichier de configuration **CMakeLists.txt** avec l'instruction suivante :

```cmake
FetchContent_Declare(
  chess
  GIT_REPOSITORY https://github.com/Omikrone/Chessboard
  GIT_TAG v1.5.0
)
FetchContent_MakeAvailable(chess)
```
Ainsi, à chaque compilation du moteur ou du serveur de jeu, la version spécifiée de la librairie est automatiquement disponible. Les modules **Euphron** et **Chessgame** peuvent alors inclure `game.hpp` et utiliser directement les méthodes de la librairie, comme `get_legal_moves()`.

## Difficultés rencontrées

La majorité des difficultés est apparue lors de la mise en place des bitboards, car le **débogage** est beaucoup plus complexe que dans la version naïve, où un seul plateau regroupait toutes les pièces, contrairement aux **15 bitboards distincts** de la version actuelle.

De plus, la vérification et la mise à jour des **droits de roque**, ainsi que la gestion de la **prise en passant**, se sont révélées particulièrement délicates et m'ont posé plusieurs problèmes au début.

## Futures améliorations

Plusieurs optimisations restent envisageables pour améliorer encore les performances de la librairie, parmi lesquelles :

- **Implémentation de [Magic Bitboards](https://www.chessprogramming.org/Magic_Bitboards)** pour le fou, la tour et la dame
- **Stockage des positions des rois** afin d’éviter de les rechercher à chaque génération de coups
- **Détection de nulle** en cas de matériel insuffisant pour mater