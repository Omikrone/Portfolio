# Euphron - Un moteur d'échecs UCI en C++

## Introduction & positionnement

**Euphron** est un moteur d'échecs développé en **C++**, dont le objectif initial est **pédagogique**. Il a été conçu pour comprendre et expérimenter les **algorithmes classiques de recherche**, en les implémentant directement dans mon moteur.

À long terme, Euphron vise à améliorer continuellement ses **performances** et à être optimisé pour la **compétition**. À court terme, l'objectif était d'atteindre un **niveau de jeu cohérent**, objectif qui a été pleinement atteint.

## Architecture interne du moteur

Pour garantir sa **modularité** et son **extensibilité** sur le long terme, Euphron est structuré en **plusieurs modules distincts**, chacun ayant une responsabilité claire.

### Algorithme de recherche

L'**algorithme de recherche** constitue le **cœur du moteur**. Il permet de déterminer le **meilleur coup** à jouer à partir d'une position donnée. Cet algorithme a beaucoup évolué au fil des versions et a été optimisé progressivement. La section suivante en décrit les principales composantes.

### Minimax : Recherche du meilleur coup

La première étape a été l'implémentation de l'algorithme classique **Minimax**. Cet algorithme consiste à construire un **arbre de recherche** représentant tous les coups possibles à partir d'une position donnée, jusqu'à une **profondeur maximale** prédéfinie.

Concrètement, à partir d'une position initiale, l'algorithme simule tous les **coups légaux**, puis répète ce processus pour chaque position générée, incrémentant à chaque fois la profondeur de recherche, jusqu'à atteindre la profondeur maximale. Les positions atteintes à ce stade correspondent aux **feuilles de l'arbre de recherche**.

Une fois ces positions finales atteintes, l'algorithme évalue chaque position à l'aide d'une **fonction d'évaluation**. Dans cette première version, cette fonction est très simple et se base uniquement sur la **valeur matérielle** des pièces présentes sur le plateau.

Pour une position donnée, l'évaluation consiste à calculer la **somme des valeurs** de toutes les pièces présentes sur le plateau, puis à en faire la différence avec celles de l'adversaire. Ainsi, si l'adversaire possède plus de matériel, l'évaluation de la position sera **négative**, et **positive** dans le cas inverse.

Les valeurs attribuées aux pièces sont classiques :
- **Pion** : 100
- **Cavalier** : 300
- **Fou** : 320
- **Tour** : 500
- **Dame** : 900
- **Roi** : +INF

Une fois la position d'une feuille évaluée, l'algorithme remonte l'arbre de recherche, en **minimisant** le score pour un nœud de l'adversaire (**nœud MIN**) et en le **maximisant** pour un nœud du joueur courant (**nœud MAX**), toujours dans la perspective de la position initiale.

Par exemple, si l’algorithme atteint un nœud MIN où l’adversaire a deux coups possibles, l’un menant à une position +200 et l’autre à -500 (selon le point de vue du joueur initial), l’algorithme sélectionnera le coup menant à -500, car il s’agit du meilleur coup possible pour l’adversaire.

L'algorithme Minimax est donc **pessimiste**, puisqu'il part du principe que l'adversaire choisira toujours le meilleur coup possible selon sa perspective.

Une fois que l'arbre des coups a été entièrement remonté, le moteur connaît ainsi le **meilleur coup hypothétique** à jouer pour la position initiale.

### Négamax : Optimisation structurelle de Minimax

L’algorithme Minimax repose sur deux types de nœuds distincts : les nœuds MIN (où l’adversaire cherche à minimiser le score) et les nœuds MAX (où le joueur initial cherche à le maximiser). Ces deux types de nœuds forment le cœur de Minimax, d’où son nom. Cependant, cette distinction entraîne un code plus long et plus complexe à lire, car le comportement dépend du type de nœud.

Une solution consiste à utiliser une variante de Minimax, l'algorithme **Négamax**. Celui-ci repose sur l'**égalité mathématique** suivante :

max(a, b) == -min(-a, -b)


Cette égalité traduit un principe simple : **maximiser le score** pour un joueur revient à **minimiser le score** pour l'adversaire. Puisque la fonction d'évaluation est **symétrique**, maximiser son propre score ou minimiser celui de l'adversaire revient au même.

Grâce à Négamax, il n’est plus nécessaire de différencier les nœuds MIN et MAX : on se contente de maximiser le score pour le joueur courant. Lors de la récursion pour construire l’arbre de recherche, il suffit d’inverser le score à chaque étape : au lieu de score = minimax(), on utilise score = -negamax(), ce qui simplifie le code tout en conservant la logique du jeu.

### Élagage Alpha-Bêta : Optimisation de l'efficacité de Minimax

La principale limite de l'algorithme Minimax est qu'il explore **tous les coups possibles** d'une position donnée. Pour de faibles profondeurs, cela reste acceptable, mais dès que la profondeur maximale dépasse 3, le nombre de nœuds à explorer croît de **manière exponentielle**, et la durée de calcul augmente considérablement. Minimax examine même des nœuds qui **ne seront jamais sélectionnés**.

Par exemple, supposons qu’on se trouve à un nœud MIN et que tous les enfants ont été explorés sauf le dernier. Si le score minimal trouvé est -100 et que le meilleur score du nœud parent (MAX) est supérieur à -100, il est inutile d’explorer ce dernier enfant, car il ne pourra jamais influencer la décision du nœud parent. Minimax, ignorant cette information, explore quand même ce nœud, ce qui entraîne une perte de performance.

L'**élagage Alpha-Bêta** corrige cette inefficacité. Il introduit **deux bornes**, **α** et **β**, représentant respectivement la **borne inférieure** et la **borne supérieure** à ne pas dépasser. On initialise α = -INF et β = +INF, puis ces valeurs sont transmises aux nœuds enfants pour qu'ils disposent de leurs propres bornes.

Lors de la remontée de l’arbre, on met à jour :

α = max(α, score) pour un nœud MAX

β = min(β, score) pour un nœud MIN

Si à un moment α >= β, l’exploration des nœuds enfants peut être interrompue, car on sait que le meilleur score possible a déjà été trouvé. Cette technique permet de réduire drastiquement le nombre de nœuds explorés, améliorant ainsi l’efficacité du moteur.

L’intégration de l’élagage Alpha-Bêta dans l’algorithme Négamax est un peu plus subtile, car Négamax ne distingue pas explicitement les nœuds MIN et MAX. La solution consiste à inverser les valeurs α et β à chaque appel récursif, et à mettre à jour uniquement β. Concrètement, un appel récursif prend la forme :

score = -negamax(-beta, -alpha)
(selon les conventions adoptées).

Grâce à cette approche, l’élagage Alpha-Bêta permet d’éviter l’exploration de nombreux nœuds inutiles, améliorant ainsi considérablement l’efficacité de Minimax et Négamax. On peut ainsi explorer plus profondément l’arbre de recherche sans augmenter le temps de calcul, tout en obtenant le même résultat hypothétique qu’avec Minimax classique.

### MVV-LVA : Augmentation du nombre de coupures de Alpha-Bêta

L’algorithme Alpha-Bêta permet déjà de couper de nombreuses branches inutiles, améliorant ainsi la performance de Minimax. Cependant, son efficacité maximale est atteinte lorsque les valeurs α et β sont extrêmes, car les chances que α ≥ β augmentent, permettant d’arrêter plus tôt l’exploration de certains nœuds. Dans ce contexte, il est utile de trier les nœuds à explorer afin de maximiser les coupures dès les premiers coups examinés.

Le tri **MVV-LVA** (*Most Valuable Victim – Least Valuable Attacker*) consiste à explorer en priorité les **captures les plus avantageuses**. Pour chaque position :

On génère tous les **coups légaux**.

Pour chaque coup, on calcule un **score MVV-LVA**, défini comme la différence entre la valeur de la pièce capturée et celle de la pièce qui capture. Un coup sans capture reçoit un score de 0.

On trie ensuite les coups dans l’ordre décroissant de leur score MVV-LVA, avant de lancer l’exploration.

Cette approche permet d’augmenter le nombre de coupures Alpha-Bêta, réduisant ainsi le nombre total de coups à examiner et améliorant significativement l’efficacité du moteur.

### Quiescence Search : Une solution à l'effet d'horizon

Un problème majeur rencontré lors du développement d'Euphron est l'**effet d'horizon**. Lorsque le moteur atteint la profondeur maximale prédéfinie, il évalue la position telle quelle, sans tenir compte de son **instabilité**. Par exemple, le moteur peut considérer qu'une position est gagnante, alors qu'il perdra inévitablement la dame au coup suivant. Dans ce cas, la variation choisie est en réalité perdante, car le moteur ne voit pas au-delà de la profondeur maximale.

Une solution partielle consiste à implémenter la **Quiescence Search**, ou **recherche de calme**, qui prolonge la recherche jusqu'à atteindre une **position stable**.

Concrètement, une fois la profondeur maximale atteinte, le moteur génère tous les **coups de capture immédiats** possibles et applique l'algorithme Alpha-Bêta uniquement sur ces nœuds. La recherche s'arrête dès qu'aucune capture directe n'est possible, indiquant qu'une **position calme** a été atteinte.

Cette extension ralentit légèrement la recherche, mais elle est essentielle pour éviter que le moteur ne choisisse des coups manifestement mauvais à cause de l’effet d’horizon.

## Interface UCI

Pour assurer la compatibilité avec mon serveur de jeu ainsi qu'avec d'autres moteurs ou interfaces graphiques, j'ai implémenté une **interface UCI** (*Universal Chess Interface*) standard. UCI définit un **ensemble de commandes** permettant à un moteur d'échecs de recevoir des instructions, par exemple `go depth 5` pour lancer une recherche jusqu'à une certaine profondeur.

L'implémentation de cette interface a nécessité l'utilisation de **threads**, car les commandes doivent être **asynchrones**. L'utilisateur doit pouvoir lancer une recherche avec `go`, tout en pouvant interrompre cette recherche à tout moment avec la commande `stop`.

Bien que le protocole UCI utilise normalement l'entrée et la sortie standard (**stdin/stdout**), j'ai ajouté un **wrapper HTTP** pour améliorer la modularité. Euphron expose ainsi un **point d'API** permettant de transmettre les commandes et de récupérer les résultats via HTTP, tout en conservant la compatibilité avec le protocole UCI classique.

## Performances et limites

À ce jour, Euphron en est à sa version **0.3.0** et affiche des **performances raisonnables**. Avec **5 secondes de réflexion**, il atteint généralement une profondeur de **4 à 5 coups**, sans compter la profondeur supplémentaire apportée par la Quiescence Search. Cela lui permet de jouer des parties correctes. Je n'ai pas encore testé son **Elo** avec des interfaces spécialisées, mais une estimation approximative le situe autour de **700 à 750**, ce qui correspond à un niveau de **débutant confirmé**.

Toutefois, Euphron présente encore plusieurs limites fondamentales. La première n'est pas liée à l'algorithme de recherche, mais à la performance de la librairie d'échecs sur laquelle il s'appuie, **Chessboard**. Le moteur génère des **millions de coups** pour construire son arbre de recherche, et si la librairie est lente, elle devient rapidement un **goulot d'étranglement**. Optimiser Chessboard constitue donc la première étape pour améliorer la performance globale du moteur.

Une autre limite majeure réside dans l'**évaluation des positions**, qui se base uniquement sur le matériel. Euphron ne développe donc pas de **plan stratégique** et peut réaliser des coups absurdes lorsqu'aucun gain matériel direct n'est disponible.

## Futures améliorations

Plusieurs axes d’amélioration restent envisageables pour augmenter les performances et le niveau de jeu d’Euphron :

**Évaluation positionnelle :** intégrer des critères stratégiques (contrôle du centre, sécurité du roi, structure de pions, etc.) afin que le moteur ne se base plus uniquement sur le matériel.

**Recherche multi-threads :** paralléliser la construction de l'arbre de recherche pour exploiter pleinement les processeurs modernes et accélérer la recherche.

**Tables de transposition :** mémoriser les positions déjà évaluées pour éviter de recalculer plusieurs fois les mêmes nœuds, réduisant ainsi le temps de recherche.

Ces améliorations permettront à Euphron d’atteindre un niveau de jeu supérieur et d’explorer l’arbre de recherche plus profondément tout en conservant un temps de calcul raisonnable.
