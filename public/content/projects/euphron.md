# Euphron - Un moteur d'échecs UCI en C++

## Introduction & positionnement

Euphron est un moteur d'échecs développé en C++, avec un objectif initial pédagogique. Le but principal était la compréhension des algorithmes de recherche classiques, afin de les implémenter dans mon propre moteur.
L'objectif d'Euphron est un objectif à long terme, celui d'améliorer continuellement ses performances et de l'optimiser. L'objectif à court terme éatit qu'il atteigne un niveau de jeu cohérent, objectif qui a été rempli.

## Architecture interne du moteur

Pour assurer sa modularité et son extensibilité sur le long terme, Euphron est découpé en plusieurs modules distincts:

## Algorithme de recherche

L'algorithme de recherche constitue le coeur du moteur d'échecs Euphron. Il lui permet de chercher le meilleur coup à jouer à partir d'une position donnée. Cet algorithme a beaucoup évolué au fil des versions et à été optimisé au fur et à mesure, cette partie en décrit ses composantes.

### Minimax : Recherche du meilleur coup

La première étape a été d'implémenter l'algorithme classique [Minimax](https://fr.wikipedia.org/wiki/Algorithme_minimax). Cet algorithme consiste d'abord à construire un arbre de recherche des coups possibles à partir d'une position donnée, jusqu'à une certaine profondeur. Concrètement, à partir d'une certaine position, l'algorithme va simuler tous les coups possibles à jouer, il incrémente donc sa profondeur à 1. À partir de chaque position simulée, l'algorithme va ensuite simuler à nouveau tous les coups possibles de la nouvelle position, et ainsi de suite, jusqu'à atteindre une profondeur maximale préalablement définie. Ce sont ces simulations qui constituent l'arbre de recherche du moteur.

Une fois l'arbre de recherhe construit et la profondeur maximale atteinte (on parle alors de *feuilles*), la prochaine étape consiste à évaluer la position finale. Pour cela, j'ai implémentée une fonction d'évaluation très basique, basée uniquement sur la valeur *matérielle* de la position. Pour une position donnée, l'évaluation va faire la somme des valeurs de toutes les pièces présentes sur le plateau, et en faire la différence avec celles de l'adversaire. Ainsi, si l'adversaire possède plus de matériel, l'évaluation de la position sera négative, et positive dans le cas contraire. Pour évaluer la valeur d'une pièce précisé, j'ai utilisé les règles couramment utilisées dans le jeu d'échecs, avec les valeurs des pièces suivantes:
- Pion: 100
- Cavalier: 300
- Fou: 320
- Tour: 500
- Dame: 900
- Roi: +INF

Une fois la position d'une feuille évaluée, l'algorithme *remonte* l'arbre de recherche, en minimisant le score si c'est au tour de l'adversaire, et en le maximisant si c'est au tour du joueur courant (avec la perspective de la position initiale). Par exemple, si l'algorithme atteint un noeud où c'est à l'adversaire de jouer (on dit que c'est une noeud MIN), et que cette adversaire a 2 coups possibles, l'un menant à une position +200 et l'autre à -500 (avec la perspective du joueur initial), l'algorithme va choisir le coup menant à la position -500, car cela constitue alors le meilleur coup possible pour l'adversaire. L'algorithme Minimax est donc un algorithme pessimiste, car il suppose que le joueur adverse chosira toujours le meilleur coup possible, de sa perspective.

Une fois l'arbre des coups entièrement remonté, le moteur connaît ainsi le meilleur hypothétique à jouer dans la position qui lui a été donnée.

### Négamax : Optimisation structurelle de Minimax

L'algorithme minimax se base sur 2 types de noeuds bien distincts: les noeuds MIN (où l'adversaire esssaie de minimiser le score) et les noeuds MAX (où le joueur initial essaie de maximiser son score). Ces 2 typess de noeuds constituent le coeur de l'agorithme, et c'est de là que l'algorithme tire son nom **Minimax**. Le problème avec cette approche est que l'algorithme se comporte différemment en fonction du type de noeuds, ce qui peut rallonger le code, et en compliquer la lecture.

Une solution à cela est d'implémenter une variante de Minimax, l'algorithme [Négamax](https://en.wikipedia.org/wiki/Negamax). Cette variante s'appuie sur l'égalité mathématique suivante:
```
max(a, b) == -min(-a, -b)
```
Cette égalité traduit un fait, c'est que maximiser un score pour un joueur est équivalent à vouloir minimiser le score pour le joueur adverse. De fait, sachant que la fonction d'évaluation est symétrique, vouloir maximiser son propre score ou minimiser celui de l'adversaire revient à la même chose. A partir de là, au lieu d'avoir un comportement différent en fonction du type de noeud (MIN/MAX), on peut simplement essayer de maximiser le score pour le joueur courant de la position. La seule différence sera que lors de la récursivité (pour construire l'arbre de recherche), on n'exécutera plus `score = minimax()` mais plutôt `score = -negamax()`, car il faudra à chaque fois inverser le score de la position.