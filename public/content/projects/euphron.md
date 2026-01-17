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

### Elagage Alpha-Bêta : Optimisation de l'efficacité de Minimax

La faiblesse principale de l'algorithme minimax réside en son principe lui-même, c'est qu'il explore tous les coups possibles d'une position donnée. Pour une profondeur faible, cela n'est pas très dérangeant, mais dès que l'on augmente un peu la profondeur maximale (> 3), le nombre de noeuds à explorer explose, et en conséquence la durée de l'algorithme également. Le problème, c'est que minimax explore absolument tous les noeuds, même ceux qui ne seront jamais explorés. Imaginons que nous sommes à une profondeur donnée dans un noeud MIN, et que nous avons explorés tous les noeuds enfants sauf le dernier, le score minimal trouvé est de -100. Si meilleur score du noeud parent (donc un noeud MAX) est supérieur à -100, il ne sert à rien d'explorer le dernier noeud enfant du noeud MIN courant, car celui-ci ne sera jamais sélectionné par le noeud parent. Bien sûr, l'algorithme minimax n'a aucune notion de cela, donc il explore quand même le dernier noeud, ce qui constitue une perte de performance non négligeable.

[L'élagage Alpha-Bêta](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) résout ce problème fondamental du Minimax. Il introduit en plus 2 nombres, α et β, qui constituent respectivement la borne inférieur et la borne supérieure à ne pas dépasser. On commence par initialiser `α = -INF` et `β = +INF`. Ces variables sont ensuite passées par valeur aux noeuds enfants, de sorte à ce que chaque noeud possède ses propres variables α et β. Ensuite, en remontant l'arbre, on met à jour α avec `α = max(α, score)` (dans le cas d'un noeud MIN) pour chaque score trouvé dans les noeuds enfants, et β avec `β = min(β, score)` (dans le cas d'un noeud MAX). Enfin, si l'on trouve `α >= β`, on peut arrêter d'explorer les noeuds enfants, car cela signifie qu'on a déjà trouvé le meilleur score possible.

Pour implémenter l'élagage alha-bêta dans l'algorithme négamax, ça a été un peu plus compliqué, car il n'y a pas la notion de noeuds MIN et MAX. La solution apportée a été d'inverser à chaque appel récursif les valeurs α et β, et de mettre à jour le β uniquement. En somme, l'appel récursif devient `score = -negamax(beta, alpha)` au lieu de `score = minimax(alpha, beta)`.

Ainsi, l'élagage Alpha-Bêta nous permet d'éviter d'explorer de nombreux noeuds inutiles, et améliore grandement l'efficacité de minimax (et négamax). On peut donc se permettre d'explorer plus loin dans l'arbre, avec le même résultat hypothétique que minimax.

### MVV-LVA : Augmentation du nombre de coupures de Alpha-Bêta

L'algorithme Alpha-Bêta nous permet de *couper* de nombreuses branches inutiles, et ainsi d'augmenter la performance de minimax. Mais il devient particulièrement performant lors de valeurs α et β extrêmes, car on a alors plus de chances que α dépasse β, ce qui lui permettra de couper les futurs noeuds. C'est dans ce cadre précis que s'insère l'utilitéde trier préalablement les noeuds que l'on souhaite explorer, par exemple avec la méthode MVV-LVA.

Le [tri MVV-LVA](https://www.chessprogramming.org/MVV-LVA) (*Most Valuable Victim - Least Valuable Attacker*) consiste à d'abord explorer les captures qui semblent être gagnantes avant les autres coups, pour espérer des mises à jour abruptes de α et β, de sorte à ce qu'on ait besoin d'explorer le nombre minimal de coups possibles. Tout d'abord, pour une position donnée, on génère tous les coups légaux possibles. Pour chaque coup, on calcule son score MVV-LVA, c'est-à-dire que l'on soustrait le score de la pièce que l'on capture au score de la pièce qui capture. Pour un coup sans capture, son score MVV-LVA est de 0. Ensuite il nous suffit de trier les coups dans l'ordre décroissant de leur score MVV-LVA, avant de commencer l'exploration.

### Quiescence Search : Une solution à l'effet d'horizon

Un problème majeur que j'ai rencontré lors du développement de mon moteur d'échecs était dû à [l'effet d'horizon](https://www.chessprogramming.org/Horizon_Effect). Lorsque le moteur atteignait la profondeur maximale prédéfinie, il évaluait la position telle quelle, sans prendre en compte si celle-ci était instable. Par exemple, si le moteur estimait avoir une position gagnante à la profondeur maximale, mais qu'il perdait inévitablement la dame au prochain coup, il allait quand même choisir cette variation, alors qu'à terme, nous savons qu'elle est perdante. C'est ce que l'on appelle communément l'effet d'horizon, car le moteur ne *voit* pas plus loin que la profondeur maximale définie.

Une solution partielle à ce problème est d'implémenter la [quiescence search](https://www.chessprogramming.org/Quiescence_Search) (= recherche de calme), qui permet au moteur de continuer sa recherche jusqu'à ce qu'il atteigne une position calme. Une fois la profondeur maximale atteinte, on génère tous les coups de captures immédiates possibles, et on continue à appliquer alpha-bêta sur ces noeuds. La quiescence search est ensuite arrêtée lorsqu'il n'y a plus de captures directes possibles, cela signifie alors que l'on a atteint une position calme. Cette extension ralentit l'algorithme alpha-bêta, car cela ne fait pas partie de la recherche principale, mais c'est un mal nécessaire pour éviter des coups absurdes de la part du moteur.