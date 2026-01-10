# Chessboard - Une librairie d'échecs optimisée

## Rôle de la librairie

Cette librairie a pour rôle d'agir comme une interface publique et de fournir toutes les méthodes nécessaires à une partie d'échecs. Elle permet notamment d'appliquer les coups d'une partie, de les retirer, et de vérifier que les règles du jeu soient respectées.

La librairie statique `Chessboard` est donc une brique fondamentale du jeu, qui permet d'être à la fois utilisée par le moteur `Euphron`, ainsi que par le serveur de jeu `Chessgame`, pour vérifier la légalité des coups.

## Fonctionnalités implémentées:

À ce jour, les fonctionnalités suivantes ont été implémentées:

**Règles du jeu:**
- Génération des coups légaux pour une position donnée
- Vérification des règles spéciales : prise en passant, roque, promotion...
- Vérification et application d'un coup sur le plateau
- Retrait d'un coup (utile pour la recherche du moteur)
- Sauvegarde des coups d'une partie dans un historique
- Hachage d'une position avec le [hachage Zobrist](https://fr.wikipedia.org/wiki/Fonction_de_hachage_de_Zobrist) (pour la détection d'une fin de partie)

**Interopérabilité:**
- Import et export d'une position sous forme de [FEN](https://fr.wikipedia.org/wiki/Notation_Forsyth-Edwards) (Forsyth-Edwards Notation)
- Conversion d'un coup en format UCI (pour la compatibilité avec le moteur)

## Architecture & structure

La structure de la librarie `Chessboard` a beaucoup évolué au fil des versions, elle a subi notamment une évolution majeure entre la version 0 et la version 1 actuelle.

### Version 0 : Programmation Orientée Objet

La version 0 était la première était la première version fonctionnelle du jeu, lorsque la *librarie* `Chessboard` était encore intrinsèquement liée au serveur de jeu `Chessgame`. À ce stade, pour raisons de simplicité, j'avais implémentée le jeu sous forme de POO (Programmation Orientée Objet), avec chaque composant du jeu représenté par une classe distinct (classe `Piece`, `Square`, ect.). Cette version avait l'avantage d'être simple d'implémentation, et m'a fourni une bonne vision d'ensemble au début. Cependant, le problème majeur avec cette architecture était la performance. En effet, pour générer tous les coups légaux d'une position, le programme mettait environ 2 ms. Cela pourrait paraître à première vue dérisoire, sauf qu'un moteur est censé explorer des millions de positions, et s'il utilise cette librarie, il sera très vite limité dans sa recherche en terme de temps. Il fallait donc que je trouve une autre solution.

### Version 1 : Utilisation de Bitboards

Après quelques recherches, j'ai compris que l'énorme majorité des moteurs d'échecs modernes utilisaient une toute autre représentation du jeu, celle sous forme de [biboards](https://fr.wikipedia.org/wiki/Bitboard). Un bitboard est simplement une structure de données sous forme de tableau de bits, où chaque bit correspond à une case du plateau d'échecs. De cette manière, au lieu que notre plateau soit représenté par un tableau d'objets de type `Piece`, il n'est représenté plus que par un entier non signé de 64 bits (car un plateau d'échecs possède 64 cases). 
Nous pouvons donc représenter la position des différentes pièces avec la variable suivante (pseudo-code):
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

Nous avons donc maintenant la représentation des positions de toutes les pièces sur un plateau d'échecs. Le problème est que nous ne pouvons ni distinguer le type d'une pièce (si c'est un pion ou une tour par exemple), ni sa couleur (blanche ou noire). La solution est de créer 14 autres bitboards (6 pour chaque type de pièce * 2 pour chaque couleur + 2 pour les positions des pièces d'une même couleur), qui stocke chacun la position d'un type de pièce spécifique pour une couleur. Nous avons donc au total 15 entiers non signés qui, ensemble, permettent de représenter la position de toutes les pièces sur le plateau.

### Optimisation des bitboards

Cette structure de données pour représenter l'état d'un plateau est extrêment efficace principalement pour 2 raisons.
La première concerne l'utilisation de la mémoire, car au lieu de stocker 64 objets distincts (chacun possédant ses propres attributs), nous ne stockons plus que 15 nombres en mémoire, c'est donc un gain de place, et permet également une utilisation des caches plus optimisée.
La deuxième concerne la complexité temporelle. En effet, avec la structure de la version 0, pour déplacer une pièce par exemple, il était nécessaire d'accéder à l'index du tableau correspondant à la position de la pièce, de récupérer l'adresse de l'objet pointé, et de mettre à jour l'adresse de l'objet pointé par la case d'arrivée. Par ailleurs, il ne fallait pas oublier de libérer la mémoire de la pièce présente sur la case d'arrivée, si celle-ci était capturée (gestion de la mémoire que j'avais améliorée avec l'utilisation de `unique_ptr`). Avec l'utilisation de bitboards, la même opération est beaucoup plus rapide, car il nous suffit de réaliser un décalage de bits pour déplacer la pièce. Enfin, pour synchroniser le reste des bitboards, on doit juste faire un OR entre le bitboard de la pièce concernée, et ceux des boards de couleurs et celui de l'état global. Comme ce ne sont que des instructions CPU (AND, OR, NOT, XOR), la mise à jour du plateau est extrêmement rapide, ce qui constitue un atout essentiel pour la recherche d'un moteur. Ainsi, pour générer les coups légaux d'une position donnée, le programme met environ 60µs, soit ~33x plus rapide que l'implémentation naïve en POO.

### Tables de mouvements pré-calculées

La plus grosse partie de la durée de la génération des coups légaux se situe dans la génération des mouvements qui diffèrent entre les types de pièces. En effet, pour cela, j'ai une classe `MoveGenerator`, qui génère pour chaque pièce ses mouvement *bruts* (sans vérifications des règles comme l'échec au roi). Le problème avec ce système est qu'il peut être particulièrement coûteux, même avec le système de bitboards. Pour pallier partiellement à ce défaut, j'ai mis en place des tables de mouvements pré-calculées, lesquelles sont générées au lancement du programme. Ces tables concernent uniquement les rois, cavaliers et pions, les mouvements des autres pièces dépendant de trop de facteurs différents.
Au démarrage du programme donc, pour chaque position possible des pièces énoncées précédemment, on calcule ses différentes cases de destination possibles. Cela peut paraître à première vue assez lourd pour la mémoire, mais ça ne l'est pas tant que ça, car on rappelle qu'un bitboard est simplement un entier non signé de 64 bits, donc c'est très léger poour la mémoire. Ce léger défaut est largement contrebalancé au niveau de la performance, car dès lors, pour générer les coups des pièces donc les mouvements ont été pré-calculés, il suffit simplement de récupérer la table correspondant à sa position initiale au lieude regénérer la logique des mouvement, l'accès se fait donc en O(1).

## Intégration dans Euphron et Chessgame

L'intégration de cette librairie par les autres modules est relativement simple, une bonne solution est de directement cloner le repo à partir du fichier de configuration `CMakeLists.txt`, avec l'instruction suivante:
```cmake
FetchContent_Declare(
  chess
  GIT_REPOSITORY https://github.com/Omikrone/Chessboard
  GIT_TAG v1.5.0
)
FetchContent_MakeAvailable(chess)
```

De cette manière, à chaque compilation du moteur ou du serveur de jeu, la verison spécifiée de la librarie sera automatiquement mise à disposition. Ainsi, les modules `Euphron` et `Chessgame` peuvent inclure `game.hpp`, et directement utiliser les méthodes de la librairie, par exemple `get_legal_moves()`.

## Difficultés rencontrées

La plupart des difficultées rencontrées se situent au niveau de la mise en place des bitboards, car le débuggage était beaucoup plus compliqué que dans la version naïve, quand j'avais un seul gros plateau avec toutes les pièces plutôt que 15 bitboards différents. 
Par ailleurs, la vérification et la mise à jour des droits de roque ainsique celle de la prise en passant a été particulièrement compliquée et m'a posé quelques problèmes au début.

## Futures améliorations

De nombreuses améliorations possibles sont encore à implémenter pour améliorer la performance de la librarie, dont:
- Implémentation de [Magic Bitboards](https://www.chessprogramming.org/Magic_Bitboards) pour le fou, la tour et la dame
- Stockage des positions des rois (pour éviter de les chercher à chaque fois)
- Détéction de nulle pour cause de matériel insuffisant pour mater