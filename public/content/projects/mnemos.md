# Mnemos - Un modèle de langage basé sur les transformer

## Introduction et positionnement

Depuis la publication du papier de recherche [*Attention is all you need*](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) en 2017 par des chercheurs de Google, les modèles de langages ont vécu un réel essort, qui a conduit a une réelle révolution dans le domaine de l'IA. Cela a permis notamment l'apparition des agents conversationnels, tels qu'on les connaît aujourd'hui, comme ChatGPT ou Gemini. Dès la sortie de GPT2, j'ai été moi-même impressioné par ses capacités, mais je n'avais alors aucune idée du fonctionnement derrière ces modèles.

On observe aujourd'hui une évolution toujours plus impressionnate de ces modèles qui se mettent à raisonner, devenir des agents, et leur évolution dans le futur reste complètement flou. C'est dans ce cadre précis que je voulais comprendre concrètement le fonctionnement de ces modèles, ainsi que leur architecture de base, le [Transformeur](https://fr.wikipedia.org/wiki/Transformeur).

J'ai donc décidé de créer mon propre modèle de langage, **Mnemos**, en référence à la déesse grecque de la mémoire *Mnémosyne*. Mnemos est donc un modèle de langage implémenté *from scratch* sans utilisation de bibliothèque tierce (mis à part Numpy/CuPy pour les vecteurs) en Python. L'objectif de ce projet était surtout pédagogique, pour comprendre concrètement comment les différentes briques du Transformeur fonctionnaient. Le but à terme est qu'il puisse *parler* à peu près normalement, sans faire trop d'erreur, et que le texte de sortie ait un certain sens.

## Architecture du modèle

**Mnemos** est donc un modèle de langage basé sur l'architecture *Transformer* et possède plusieurs briques fondamentales qui lui permettent de génerer du texte.

### BPE Tokenizer : Encodage du texte d'entrée

Pour entraîner un modèle de langage sur du texte humain, la première étape est d'encoder ce texte de sorte à ce qu'il soit assimilable par un ordinateur. En effet, un ordinateur ne comprend ni de lettres ni de mots, il peut seulement manier des nombres (d'où la cration de tables ASCII). Il faut donc tranformer le texte d'entraînement en suite de nombre, avant de donner celui-ci en entrée au modèle, c'est à ça que sert un tokenizer. 

Pour cela, on doit en premier lieu créer un vocabulaire, c'est-à-dure une table qui relie un certain token à un nombre unique. Une solution très simple est d'attribuer à chaque lettre unique son propre identifiant, de sorte à ce que le modèle possède un alphabet comme vocabulaire. Le problème avec cette solution est qu'elle produit un vocabulaire très restreint (26 tokens distincts + éventuellement chiffres et caractères spéciaux dans le cas du français) et qu'elle ne reproduit pas vraiment la logique de la construction de mots dans un langage. Avec cette méthode (on parle alors de *Character-level tokenizer*), le modèle ne pourra pas distinguer les réelles nuances du langage, et plafonnera en conséquence très rapidement. Une autre solution consiste à tokenizer le texte en fonction des mots, mais on obtient alors le problème inverse, c'est que la taille du vocabulaire explose, et qu'il devient rapidement impossible d'entraîner un modèle dessus.

Après avoir explorer les différentes solutions existantes, j'ai décidé d'implémenter un tokenizer BPE (*Byte-Pair Encoding*), qui est une bonne solution pour pallier aux problèmes précédemment cités. Avec cette méthode d'encodage, l'avantage principal réside dans le fait que la taille du vocabulaire est configurable, tout en gardant une structure similaire au langage. L'encodage BPE est un algorithme qui construit un vocabulaire à partir de la fréquence d'un token. Concrètement, il commence avec un vocabulaire *char-level* (= l'alphabet) et fusionne les caractères avec les caractères présents dans le texte. C'est ainsi qu'il forme les *paires* de tokens, et ceux-ci sont ajoutés au vocabulaire en fonction de leur fréquence. Par exemple, à la première itération sur le texte, si la combinaison des caractères 'e' + 'm' = 'em' est la plus fréquente dans le texte, alors elle sera ajouté au vocabulaire. À la deuxième itération, si la combinaison de 'em' + 'i' = 'emi' est la combinaison la plus fréquente, alors les 2 tokens seront fusionnés et ajoutés au vocabulaire. L'algorithme s'arrête ainsi lorsque le vocabulaire atteint la taille configuré préalablement, et l'on observe que le texte a été séparé en syllabes / mots communs.

### Embeddings : Enrichissement du vocabulaire

Un des principes clés du Transformer repose sur ce que l'on appelle les embedding. Un embedding est une représentation vectorielle (d'une dimesnion préalablement configurée) d'un token du vocabulaire. Ces vecteurs permettent au modèle d'encapsuler le sens d'un token, et donc de l'enrichir au fur et à mesure de l'entraînement. Concrètement, si le mot "demain" fait partie du vocabulaire, grâce aux embeddings, il ne sera plus simplement représenté comme un ID (ex. 42), mais plutôt comme une suite de poids ajustables (ex. [0.11, -0.23, ...]). Ainsi, à la fin de l'entraînement, on peut espérer que 2 mots au sens proche ("demain" et "aujourd'hui") auront une faible distance cosinus, tandis que 2 mots sans rapport auront une distance élevée. Les embeddings des transformers sont la somme de 2 types d'embeddings.

#### Token Embedding : Capture du sens du mot

Le token embedding est une matrice de taille (VOCAB_SIZE, EMBEDDING_DIM), dans laquelle chaque ligne correspond au vecteur de n-dimensions associé à un token du vocabulaire. Il permet d'encapsuler le sens du token.

#### Positional Embedding : Ordre des tokens

Le positional embedding est une matrice de taille (MAX_SEQ_LEN, EMBEDDING_DIM), avec MAX_SEQ_LEN le nombre de token que l'on donne au modèle durant l'entraînement. Il permet au modèle d'apprendre au modèle l'ordre des mots au cours de l'entraînement.