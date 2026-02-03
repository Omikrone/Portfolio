# Mnemos - Un modèle de langage basé sur les transformeurs

## Introduction et positionnement

Depuis la publication du papier de recherche [Attention is all you need](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) en **2017** par des chercheurs de **Google**, les modèles de langage ont connu un **réel essor**, conduisant à une véritable **révolution** dans le domaine de l'**intelligence artificielle**. Cette avancée a notamment permis l'apparition des **agents conversationnels** tels que nous les connaissons aujourd'hui, comme **ChatGPT** ou **Gemini**. Dès la sortie de **GPT-3.5**, j'ai moi-même été impressionné par ses capacités, sans pour autant comprendre à l'époque les mécanismes sous-jacents à ces modèles.

On observe aujourd'hui une évolution toujours plus impressionnante de ces systèmes, qui commencent à **raisonner**, à devenir de **véritables agents**, tandis que leur évolution future reste encore très floue. C'est précisément dans ce contexte que j'ai souhaité comprendre concrètement le fonctionnement de ces modèles, ainsi que leur architecture fondamentale : **le transformeur**.

J'ai ainsi décidé de créer mon propre modèle de langage, **Mnemos**, en référence à la divinité grecque de la mémoire, **Mnémosyne**. Mnemos est un modèle de langage implémenté **from scratch**, sans recours à des bibliothèques tierces (à l'exception de **NumPy/CuPy** pour la manipulation des vecteurs), en **Python**. 

**L'objectif de ce projet est avant tout pédagogique** : comprendre concrètement comment les différentes briques constituant un transformeur interagissent entre elles. À terme, le but est que le modèle puisse parler de manière relativement naturelle, en limitant les erreurs, et en produisant un texte cohérent et porteur de sens.

## Architecture du modèle

**Mnemos** est un modèle de langage basé sur l'**architecture Transformer**. Il repose sur plusieurs **briques fondamentales** qui lui permettent de générer du texte.

### BPE Tokenizer : Encodage du texte d'entrée

Pour entraîner un modèle de langage sur du texte humain, la première étape consiste à **encoder** ce texte de manière à ce qu'il soit exploitable par un ordinateur. En effet, un ordinateur ne comprend ni les lettres ni les mots : il ne manipule que des **nombres** (d'où, par exemple, la création de tables comme l'**ASCII**). Il est donc nécessaire de transformer le texte d'entraînement en une suite de nombres avant de l'utiliser comme entrée du modèle. C'est précisément le rôle d'un **tokenizer**.

Pour cela, il faut tout d'abord créer un **vocabulaire**, c'est-à-dire une table associant chaque token à un identifiant numérique unique. Une solution très simple consiste à attribuer un identifiant à chaque lettre, de sorte que le modèle dispose d'un alphabet comme vocabulaire. Cependant, cette approche présente plusieurs **limites** :

- Le vocabulaire est **extrêmement restreint** (26 lettres, auxquelles s'ajoutent éventuellement des chiffres et caractères spéciaux dans le cas du français)
- Elle ne reflète pas réellement la **logique de construction des mots** dans une langue
- Avec cette méthode, appelée **character-level tokenizer**, le modèle peine à capturer les nuances du langage et atteint rapidement un **plafond de performance**

À l'inverse, une autre solution consiste à tokenizer le texte au niveau des **mots**. On rencontre alors le problème opposé : la taille du vocabulaire **explose**, ce qui rend l'entraînement du modèle beaucoup plus coûteux, voire **impraticable**.

Après avoir exploré les différentes solutions existantes, j'ai décidé d'implémenter un tokenizer **BPE (Byte-Pair Encoding)**, qui constitue un **bon compromis** entre ces deux approches. L'avantage principal de cette méthode est que la **taille du vocabulaire est configurable**, tout en conservant une structure proche du langage naturel. Le **BPE** est un algorithme qui construit progressivement un vocabulaire à partir de la **fréquence des tokens**. 

**Concrètement**, il débute avec un vocabulaire de type **char-level** (l'alphabet), puis fusionne progressivement les tokens les plus fréquemment adjacents dans le texte.

**Par exemple**, lors de la première itération :
- Si la combinaison des caractères `'e'` et `'m'`, formant le token `'em'`, est la **plus fréquente** dans le corpus, alors ce nouveau token est ajouté au vocabulaire
- À l'itération suivante, si la combinaison `'em'` et `'i'`, formant `'emi'`, est à son tour la plus fréquente, ces deux tokens sont **fusionnés** et ajoutés au vocabulaire
- Le processus se poursuit ainsi jusqu'à atteindre la **taille de vocabulaire définie** au préalable

On observe alors que le texte est naturellement découpé en **syllabes** ou en **sous-mots fréquents**, ce qui permet au modèle de mieux capturer la structure du langage.

### Embeddings : Enrichissement du vocabulaire

L'un des **principes clés** des transformeurs repose sur ce que l'on appelle les **embeddings**. Un embedding est une **représentation vectorielle** (d'une dimension définie au préalable) d'un token du vocabulaire. Ces vecteurs permettent au modèle d'encoder le **sens d'un token** et de l'enrichir progressivement au cours de l'entraînement. 

**Concrètement**, si le mot « demain » fait partie du vocabulaire, il n'est plus simplement représenté par un **identifiant numérique** (par exemple `42`), mais par un **vecteur de poids ajustables** (par exemple `[0.11, -0.23, …]`).

Ainsi, à la fin de l'entraînement, on peut espérer que deux mots de **sens proche** (comme « demain » et « aujourd'hui ») auront une **faible distance cosinus** entre leurs vecteurs, tandis que deux mots sans lien sémantique présenteront une distance plus élevée. Dans les transformeurs, la représentation finale d'un token est obtenue par la **somme de deux types d'embeddings**.

#### Token Embedding : Capture du sens du mot

Le **token embedding** est une matrice de taille `(VOCAB_SIZE, EMBEDDING_DIM)`, dans laquelle chaque ligne correspond au vecteur de dimension `EMBEDDING_DIM` associé à un token du vocabulaire. Cette matrice est **apprise durant l'entraînement** et permet d'encoder la **sémantique propre** à chaque token.

#### Positional Embedding : Ordre des tokens

Le **positional embedding** est une matrice de taille `(MAX_SEQ_LEN, EMBEDDING_DIM)`, où `MAX_SEQ_LEN` correspond au nombre maximal de tokens fournis au modèle lors de l'entraînement. Contrairement aux modèles récurrents, le transformeur **n'intègre pas naturellement la notion d'ordre** ; le positional embedding permet donc au modèle de prendre en compte la **position des tokens** dans la séquence et d'apprendre l'ordre des mots.

## Mécanisme d'attention

Avant l'apparition des transformeurs, l'un des **problèmes majeurs** des modèles existants (comme les **RNN**) résidait dans leur **caractère séquentiel**. Cela signifie que l'information était transmise d'un token au suivant, tout au long de la séquence. 

**Par exemple**, dans une phrase comme : *« Le chat qui a traversé la rue était noir »*, l'accord au masculin et au singulier du mot « chat » était difficile à conserver, car l'information se **diluait progressivement** au fil de la séquence.

Le nouveau **mécanisme dit de l'attention**, introduit avec l'architecture des transformeurs, vient **résoudre ce problème fondamental** et constitue ainsi la **véritable révolution** de cette architecture.

### Self Attention

Le mécanisme d'**auto-attention** utilisé dans les transformeurs repose sur l'utilisation de **trois vecteurs de poids** :

- Un vecteur de **requête (query)**, qui représente les informations recherchées par un token
- Un vecteur de **clé (key)**, qui contient les informations portées par un token
- Un vecteur de **valeur (value)**, qui, une fois pondéré par les poids d'attention de la séquence, permet d'extraire les informations pertinentes pour un token donné

L'utilisation de ces trois matrices permet à chaque token d'accorder **plus ou moins d'attention** aux autres tokens de la séquence, en fonction des informations qu'il recherche et de celles que les autres possèdent. Ce mécanisme présente l'avantage d'être **indépendant de l'ordre séquentiel strict** des tokens. Une fois les scores d'attention calculés, l'application d'une fonction **softmax** permet d'obtenir une **distribution de probabilités** indiquant quels tokens sont les plus importants pour le token en cours.

Dans le cadre d'un modèle de langage **auto-régressif**, l'auto-attention doit cependant être **masquée**. Cela signifie qu'un token ne peut porter son attention que sur les **tokens précédents** de la séquence, et non sur les tokens futurs. Ce **masque causal** est essentiel pour empêcher le modèle de tricher en accédant à des informations qu'il n'est pas censé connaître au moment de la prédiction.

### Multi-Head Attention

Un des inconvénients de l'auto-attention à **une seule tête** est la **perte potentielle d'informations** pour chaque token. En effet, le calcul d'un unique score d'attention peut conduire à une représentation trop simplifiée. Une solution consiste alors à utiliser **plusieurs têtes d'attention**, chacune calculant indépendamment ses propres scores. 

Cela permet à chaque tête de se concentrer sur un **aspect différent** de la séquence, comme :
- Les **accords grammaticaux**
- La **structure syntaxique**
- Les **relations sémantiques**

Les sorties des différentes têtes sont ensuite **concaténées** afin de former une représentation plus riche. Dans le cadre de mon modèle actuel, après quelques expérimentations empiriques et compte tenu de mes contraintes de temps et de matériel, j'ai choisi d'utiliser **quatre têtes d'attention**, ce qui constitue un bon compromis entre performance et complexité.

## Perceptron multicouche

Après le mécanisme d'attention, l'architecture du transformeur est complétée par l'ajout d'un **perceptron multicouche** (Multilayer Perceptron, ou **MLP**). Ce composant permet d'introduire de la **non-linéarité** dans le modèle, notamment grâce à l'utilisation d'une **fonction d'activation**, tout en traitant chaque token de manière indépendante. Le perceptron multicouche prend en entrée la sortie de l'attention multi-têtes et projette ces vecteurs dans une **dimension cachée** afin d'extraire des motifs plus abstraits.

Une fois les données projetées dans cet **espace latent**, une fonction d'activation est appliquée. Dans mon cas, j'ai choisi la fonction **ReLU**, définie par `f(x) = max(0, x)`. Cette fonction permet d'introduire de la **non-linéarité** dans le réseau de neurones, ce qui est essentiel pour apprendre des structures complexes. Après l'application de la ReLU, les données sont ensuite **reprojetées** afin de revenir à la dimension de la couche d'entrée.

De manière générale, il est recommandé de choisir une dimension cachée **deux à quatre fois supérieure** à celle de la couche d'entrée. En suivant cette règle, et afin de ne pas faire exploser le temps d'entraînement de mon modèle, j'ai opté pour :
- **Dimension d'entrée** : `256`
- **Dimension cachée** : `1024`

### Empilement des blocs Transformer

L'enchaînement du mécanisme d'attention et du perceptron multicouche constitue le **cœur** de ce que l'on appelle un **bloc Transformer**. Afin d'améliorer la qualité des prédictions et de permettre au modèle d'apprendre des représentations plus complexes, il est courant d'**empiler plusieurs blocs successivement**, la sortie d'un bloc servant alors d'entrée au suivant.

Avec mes contraintes de matériel et de temps, j'ai choisi d'utiliser **deux blocs Transformer**, ce qui m'a déjà permis d'obtenir des résultats encourageants.

## Entraînement du modèle

Pour entraîner mon modèle, j'ai choisi d'utiliser l'approche classique pour ce type d'architecture : l'**apprentissage auto-supervisé**. Cette méthode consiste à fournir au modèle des séquences de tokens en entrée et à lui faire prédire le **token suivant** sous la forme d'une **distribution de probabilités**. Il est alors possible de mesurer l'**erreur de prédiction** à l'aide d'une **fonction de perte**, puis d'ajuster les paramètres du modèle en conséquence.

Voici la **pipeline d'entraînement** que j'ai utilisée pour entraîner la version actuelle de Mnemos.

### Données d'entraînement

Mnemos étant avant tout un projet à **vocation pédagogique**, et mes ressources matérielles étant limitées, j'ai choisi d'entraîner le modèle sur un corpus d'environ **50 Mo de texte**. Le jeu de données utilisé est un extrait des **débats de l'Assemblée nationale**, qui a notamment servi à l'entraînement du LLM français **Claire**. Ces données sont disponibles en open source sur [HuggingFace](https://huggingface.co/datasets/OpenLLM-France/Claire-Dialogue-French-0.1/tree/main/FR/AssembleeNationale_13).

Ce choix me semblait pertinent dans la mesure où :
- Les dialogues sont **bien structurés**
- Ils présentent une **bonne qualité de français**

Néanmoins, avec du recul, l'utilisation d'un vocabulaire aussi **riche et spécifique** pour un modèle de taille aussi modeste que le mien n'était probablement pas idéale, et a pu **complexifier inutilement** l'apprentissage.

### Nettoyage du corpus & Batching

Une fois les données d'entraînement extraites, il a été nécessaire de **nettoyer le corpus**, notamment en :
- Supprimant les **espaces superflus**
- Supprimant les **caractères indésirables**

Le texte est ensuite **tokenisé** à l'aide du vocabulaire généré au préalable. Enfin, le corpus d'entraînement est découpé en **batchs (lots)** afin de pouvoir **paralléliser l'entraînement** et d'améliorer l'efficacité des calculs.

### Calcul de la perte d'entropie croisée

L'étape suivante consiste à faire passer les séquences de tokens à travers le modèle, qui produit en sortie une **distribution de probabilités** après normalisation par une fonction **softmax**. Il suffit alors de comparer cette distribution à la **valeur cible**, c'est-à-dire le token correct à prédire. Pour cela, on utilise la **perte d'entropie croisée**, qui, dans notre cas, se calcule simplement comme suit :

```
L = -log(P)
```

où `P` correspond à la **probabilité prédite** pour le token correct.

Cette perte permet de mesurer à quel point le modèle se trompe : **plus sa valeur est faible, meilleure est la prédiction**. Il convient toutefois de rester prudent dans son interprétation, car la perte n'est pas la seule métrique pertinente pour suivre l'évolution de l'entraînement. En particulier, la **taille du vocabulaire** influe directement sur la valeur de la perte : plus le vocabulaire est large, plus la prédiction d'une distribution de probabilités correcte devient difficile, ce qui tend à **augmenter mécaniquement** la valeur de la perte.

### Calcul du gradient & Rétropropagation

La dernière étape de l'entraînement consiste à effectuer le **chemin inverse** à travers le modèle, une fois la perte calculée. Pour cela, on calcule, **couche par couche**, la contribution de chacune d'entre elles (attention, MLP, etc.) à l'**erreur globale**. Les poids de chaque couche sont ensuite **ajustés** en fonction du **taux d'apprentissage** défini au préalable.

De cette manière, le modèle est **progressivement mis à jour** tout au long de l'entraînement, avec pour objectif de **réduire la valeur de la fonction de perte** au fil des itérations.

## Résultats et limites

À l'heure actuelle, **Mnemos** en est encore au stade de **proof of concept (POC)**, dans sa **version 0.4.0**. Le modèle n'est pas encore capable de produire du texte correct sans commettre de nombreuses **fautes d'orthographe** ou de **grammaire**. Néanmoins, une **amélioration nette** a été observée au fil des versions, ce qui reste très encourageant.

Avec un vocabulaire de **1024 tokens**, la dernière version du modèle atteint une perte d'environ **1.4**, ce qui demeure satisfaisant compte tenu de la taille du modèle et des ressources utilisées.

Lors de l'utilisation de prompts, on observe que Mnemos parvient à **reproduire la structure** des phrases et des mots, ce qui est déjà remarquable pour un modèle de cette taille. En revanche, le **contenu généré** reste souvent **incohérent**, voire difficilement compréhensible. 

Ces **limitations** s'expliquent principalement par :
- La **taille** et la **diversité restreintes** du corpus d'entraînement
- La **capacité limitée** du modèle lui-même

## Futures améliorations

De nombreuses **pistes d'amélioration** restent à explorer afin d'augmenter les performances de Mnemos, notamment :

- **Implémentation d'un optimiseur plus performant** pour la rétropropagation
- **Ajustement et recherche d'hyperparamètres**
- **Mnemos-Chess** (projet à venir)