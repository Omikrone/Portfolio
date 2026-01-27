# Euphron - Un moteur d'échecs UCI en C++

## Introduction & positionnement

Euphron est un moteur d'échecs développé en C++, avec un **objectif initial pédagogique**. Le but principal était de comprendre les algorithmes de recherche classiques, afin de les implémenter dans mon propre moteur.

L'objectif d'Euphron à long terme est d'**améliorer continuellement ses performances** et de l'optimiser. L'objectif à court terme était qu'il atteigne un **niveau de jeu cohérent**, ce qui a été rempli.

## Architecture interne du moteur

Pour assurer sa modularité et son extensibilité sur le long terme, Euphron est découpé en plusieurs modules distincts.

### Algorithme de recherche

L'algorithme de recherche constitue le cœur du moteur d'échecs Euphron. Il lui permet de chercher le meilleur coup à jouer à partir d'une position donnée. Cet algorithme a beaucoup évolué au fil des versions et a été optimisé au fur et à mesure. Cette partie en décrit les composantes.

### Minimax : Recherche du meilleur coup

La première étape a été d'implémenter l'algorithme classique [Minimax](https://fr.wikipedia.org/wiki/Algorithme_minimax). Cet algorithme consiste d'abord à construire un **arbre de recherche** des coups possibles à partir d'une position donnée, jusqu'à une certaine profondeur.

Concrètement, à partir d'une position, l'algorithme simule tous les coups possibles : il incrémente donc sa profondeur de 1. À partir de chaque position simulée, l'algorithme simule ensuite à nouveau tous les coups possibles, et ainsi de suite, jusqu'à atteindre une **profondeur maximale** préalablement définie. Ce sont ces simulations qui constituent l'arbre de recherche du moteur.

Une fois l'arbre de recherche construit et la profondeur maximale atteinte (on parle alors de *feuilles*), la prochaine étape consiste à évaluer la position finale. Pour cela, j'ai implémenté une **fonction d'évaluation** très basique, basée uniquement sur la valeur *matérielle* de la position.

Pour une position donnée, l'évaluation calcule la somme des valeurs de toutes les pièces présentes sur le plateau, puis en fait la différence avec celles de l'adversaire. Ainsi, si l'adversaire possède plus de matériel, l'évaluation de la position sera négative (et positive dans le cas contraire).

Pour évaluer la valeur d'une pièce précise, j'ai utilisé des valeurs classiques :
- **Pion** : `100`
- **Cavalier** : `300`
- **Fou** : `320`
- **Tour** : `500`
- **Dame** : `900`
- **Roi** : `+INF`

Une fois la position d'une feuille évaluée, l'algorithme *remonte* l'arbre de recherche, en minimisant le score si c'est au tour de l'adversaire, et en le maximisant si c'est au tour du joueur courant (dans la perspective de la position initiale).

Par exemple, si l'algorithme atteint un nœud où c'est à l'adversaire de jouer (on dit que c'est un nœud MIN), et que cet adversaire a 2 coups possibles, l'un menant à une position `+200` et l'autre à `-500` (dans la perspective du joueur initial), l'algorithme va choisir le coup menant à la position `-500`, car cela constitue le meilleur coup possible pour l'adversaire.

L'algorithme Minimax est donc un algorithme pessimiste, car il suppose que le joueur adverse choisira toujours le meilleur coup possible, dans sa perspective.

Une fois l'arbre des coups entièrement remonté, le moteur connaît ainsi le meilleur coup hypothétique à jouer dans la position qui lui a été donnée.

### Négamax : Optimisation structurelle de Minimax

L'algorithme minimax se base sur 2 types de nœuds bien distincts : les nœuds MIN (où l'adversaire essaie de minimiser le score) et les nœuds MAX (où le joueur initial essaie de maximiser son score). Ces 2 types de nœuds constituent le cœur de l'algorithme, et c'est de là que l'algorithme tire son nom **Minimax**. Le problème avec cette approche est que l'algorithme se comporte différemment en fonction du type de nœuds, ce qui peut rallonger le code et en compliquer la lecture.

Une solution à cela est d'implémenter une variante de Minimax, l'algorithme [Négamax](https://en.wikipedia.org/wiki/Negamax). Cette variante s'appuie sur l'égalité mathématique suivante :
```
max(a, b) == -min(-a, -b)
```
Cette égalité traduit un fait : maximiser un score pour un joueur est équivalent à minimiser le score pour le joueur adverse. De fait, sachant que la fonction d'évaluation est symétrique, vouloir maximiser son propre score ou minimiser celui de l'adversaire revient à la même chose. À partir de là, au lieu d'avoir un comportement différent en fonction du type de nœud (MIN/MAX), on peut simplement essayer de maximiser le score pour le joueur courant de la position. La seule différence sera que lors de la récursivité (pour construire l'arbre de recherche), on n'exécutera plus `score = minimax()` mais plutôt `score = -negamax()`, car il faudra à chaque fois inverser le score de la position.

### Élagage Alpha-Bêta : Optimisation de l'efficacité de Minimax

La faiblesse principale de l'algorithme minimax réside dans son principe même : il explore tous les coups possibles d'une position donnée. Pour une profondeur faible, cela n'est pas très dérangeant, mais dès que l'on augmente un peu la profondeur maximale (> 3), le nombre de nœuds à explorer explose, et en conséquence la durée de l'algorithme également. Le problème, c'est que minimax explore absolument tous les nœuds, même ceux qui ne seront jamais sélectionnés. Imaginons que nous sommes à une profondeur donnée dans un nœud MIN, et que nous avons exploré tous les nœuds enfants sauf le dernier ; le score minimal trouvé est de -100. Si le meilleur score du nœud parent (donc un nœud MAX) est supérieur à -100, il ne sert à rien d'explorer le dernier nœud enfant du nœud MIN courant, car celui-ci ne sera jamais sélectionné par le nœud parent. Bien sûr, l'algorithme minimax n'a aucune notion de cela, donc il explore quand même le dernier nœud, ce qui constitue une perte de performance non négligeable.

[L'élagage Alpha-Bêta](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) résout ce problème fondamental du Minimax. Il introduit en plus 2 nombres, α et β, qui constituent respectivement la borne inférieure et la borne supérieure à ne pas dépasser. On commence par initialiser `α = -INF` et `β = +INF`. Ces variables sont ensuite passées par valeur aux nœuds enfants, de sorte que chaque nœud possède ses propres variables α et β. Ensuite, en remontant l'arbre, on met à jour α avec `α = max(α, score)` (dans le cas d'un nœud MAX) pour chaque score trouvé dans les nœuds enfants, et β avec `β = min(β, score)` (dans le cas d'un nœud MIN). Enfin, si l'on trouve `α >= β`, on peut arrêter d'explorer les nœuds enfants, car cela signifie qu'on a déjà trouvé le meilleur score possible.

Pour implémenter l'élagage alpha-bêta dans l'algorithme négamax, ça a été un peu plus compliqué, car il n'y a pas la notion de nœuds MIN et MAX. La solution apportée a été d'inverser à chaque appel récursif les valeurs α et β, et de mettre à jour β uniquement. En somme, l'appel récursif devient généralement quelque chose du style `score = -negamax(-beta, -alpha)` (selon les conventions choisies).

Ainsi, l'élagage Alpha-Bêta nous permet d'éviter d'explorer de nombreux nœuds inutiles, et améliore grandement l'efficacité de minimax (et négamax). On peut donc se permettre d'explorer plus loin dans l'arbre, avec le même résultat hypothétique que minimax.

### MVV-LVA : Augmentation du nombre de coupures de Alpha-Bêta

L'algorithme Alpha-Bêta nous permet de *couper* de nombreuses branches inutiles, et ainsi d'augmenter la performance de minimax. Mais il devient particulièrement performant lors de valeurs α et β extrêmes, car on a alors plus de chances que α dépasse β, ce qui lui permettra de couper les futurs nœuds. C'est dans ce cadre précis que s'insère l'utilité de trier préalablement les nœuds que l'on souhaite explorer, par exemple avec la méthode MVV-LVA.

Le [tri MVV-LVA](https://www.chessprogramming.org/MVV-LVA) (*Most Valuable Victim - Least Valuable Attacker*) consiste à d'abord explorer les captures qui semblent être gagnantes avant les autres coups, pour espérer des mises à jour abruptes de α et β, de sorte qu'on ait besoin d'explorer le nombre minimal de coups possibles. Tout d'abord, pour une position donnée, on génère tous les coups légaux possibles. Pour chaque coup, on calcule son score MVV-LVA, c'est-à-dire que l'on soustrait le score de la pièce qui capture au score de la pièce capturée. Pour un coup sans capture, son score MVV-LVA est de 0. Ensuite, il nous suffit de trier les coups dans l'ordre décroissant de leur score MVV-LVA, avant de commencer l'exploration.

### Quiescence Search : Une solution à l'effet d'horizon

Un problème majeur que j'ai rencontré lors du développement de mon moteur d'échecs était dû à [l'effet d'horizon](https://www.chessprogramming.org/Horizon_Effect). Lorsque le moteur atteignait la profondeur maximale prédéfinie, il évaluait la position telle quelle, sans prendre en compte si celle-ci était instable. Par exemple, si le moteur estimait avoir une position gagnante à la profondeur maximale, mais qu'il perdait inévitablement la dame au prochain coup, il allait quand même choisir cette variation, alors qu'à terme, nous savons qu'elle est perdante. C'est ce que l'on appelle communément l'effet d'horizon, car le moteur ne *voit* pas plus loin que la profondeur maximale définie.

Une solution partielle à ce problème est d'implémenter la [quiescence search](https://www.chessprogramming.org/Quiescence_Search) (= recherche de calme), qui permet au moteur de continuer sa recherche jusqu'à ce qu'il atteigne une **position calme**.

Une fois la profondeur maximale atteinte, on génère tous les coups de captures immédiates possibles, et on continue à appliquer l'algorithme **Alpha-Bêta** sur ces nœuds. La quiescence search s'arrête lorsqu'il n'y a plus de captures directes possibles : cela signifie alors que l'on a atteint une position calme. Cette extension ralentit la recherche (car elle ne fait pas partie de la recherche principale), mais c'est un mal nécessaire pour éviter des coups absurdes de la part du moteur.

## Interface UCI

Pour que mon moteur soit compatible avec mon serveur de jeu ainsi qu'avec d'autres moteurs ou GUI, j'ai décidé d'implémenter une interface [UCI](https://www.chessprogramming.org/UCI) (*Universal Chess Interface*) standard, afin de pouvoir communiquer avec Euphron. **UCI** est un protocole qui définit certaines commandes pour un moteur d'échecs, par exemple pour lancer une recherche avec `go depth 5`.

Implémenter cette interface m'a forcé à utiliser des **threads**, car les commandes sont censées être asynchrones. En effet, l'utilisateur doit pouvoir lancer une recherche avec `go`, mais également pouvoir l'interrompre lorsqu'il le souhaite avec `stop`.

Par ailleurs, le protocole UCI se fait en temps normal sur l'entrée et la sortie standard (**stdin/stdout**). Cependant, pour des raisons de modularité, j'ai décidé d'implémenter en plus un **wrapper HTTP**, de sorte qu'Euphron expose un point d'API pour l'entrée et la sortie de commandes.

## Performances et limites

Aujourd'hui, Euphron en est à sa version **0.3.0**, et atteint des performances raisonnables. Avec **5 secondes** de réflexion, il atteint généralement une profondeur de **4 à 5** (sans compter la profondeur supplémentaire engendrée par la *quiescence search*), et permet ainsi de jouer des parties correctes. Je n'ai pas encore eu l'occasion de tester son Elo avec des GUI spécialement faits pour cela, mais si je devais l'estimer, je dirais qu'il tourne autour de **700 à 750 Elo**, ce qui correspond à un niveau de débutant confirmé.

Toutefois, Euphron possède encore certaines **limites fondamentales**, qui l'empêchent d'avoir un meilleur niveau. La principale limite ne se situe pas dans ses algorithmes de recherche, mais plutôt dans la performance de la librairie d'échecs sur laquelle il s'appuie, [Chessboard](https://github.com/Omikrone/Chessboard).

En effet, pour construire son arbre de recherche, Euphron génère des millions de coups, et si la librairie d'échecs est lente, alors elle ralentira inévitablement le moteur. La première étape pour améliorer la performance de mon moteur sera donc d'abord d'optimiser ma librairie.

Ensuite, Euphron possède aussi une autre limite fondamentale : son évaluation de position se fait uniquement sur le **matériel**. Cela induit qu'il n'a pas vraiment de *plan* durant une partie, et qu'il réalise des coups assez absurdes lorsqu'il n'y a pas de gains matériels directs.

## Futures améliorations

De nombreuses améliorations possibles sont encore à implémenter pour améliorer la performance d'Euphron, dont :
- **Évaluation positionnelle**
- **Recherche multi-threads**
- **Implémentation de tables de transpositions**
