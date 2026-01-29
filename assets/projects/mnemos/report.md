# Mnemos - Un modèle de langage basé sur les transformer

## Introduction et positionnement

Depuis la publication du papier de recherche [*Attention is all you need*](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) en 2017 par des chercheurs de Google, les modèles de langages ont vécu un réel essort, qui a conduit a une réelle révolution dans le domaine de l'IA. Cela a permis notamment l'apparition des agents conversationnels, tels qu'on les connaît aujourd'hui, comme ChatGPT ou Gemini. Dès la sortie de GPT3.5, j'ai été moi-même impressioné par ses capacités, mais je n'avais alors aucune idée du fonctionnement derrière ces modèles.

On observe aujourd'hui une évolution toujours plus impressionnate de ces modèles qui se mettent à raisonner, devenir des agents, et leur évolution dans le futur reste complètement flou. C'est dans ce cadre précis que je voulais comprendre concrètement le fonctionnement de ces modèles, ainsi que leur architecture de base, le [Transformeur](https://fr.wikipedia.org/wiki/Transformeur).

J'ai donc décidé de créer mon propre modèle de langage, **Mnemos**, en référence à la divinité grecque de la mémoire *Mnémosyne*. Mnemos est donc un modèle de langage implémenté *from scratch* sans utilisation de bibliothèque tierce (mis à part Numpy/CuPy pour les vecteurs) en Python. L'objectif de ce projet était surtout pédagogique, pour comprendre concrètement comment les différentes briques du Transformeur fonctionnaient. Le but à terme est qu'il puisse *parler* à peu près normalement, sans faire trop d'erreur, et que le texte de sortie ait un certain sens.

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

## Mécanisme d'attention

Avant l'apparition des Transformer, un des problèmes majeurs des modèles existants (comme les RNN) résidait dans le fait que ces derniers étaient dits *séquentiels*, c'est-à-dire que l'information d'un token au suivant, tout le long de la séquence. Par exemple, pour une phrase du type : "Le chat qui a traversé la rue était noir", l'accord du masculin et du singulier du mot "chat" était compliqué à garder, car l'information se diluait au fil de la séquence. Le nouveau mécanisme dit de **l'attention** introduit dans l'architecture du Transformer vient résoudre ce problème fondamental, et constitue ainsi la réelle révolution de cette architecture.

### Self Attention

Le mécanisme d'[auto-attention](https://www.ibm.com/fr-fr/think/topics/attention-mechanism) utilisé dans les Transformers se base sur l'utilisation de 3 vecteurs de poids:
- Un vecteur de **requête** qui représente les informations recherchées par un token
- Un vecteur de **clé** qui contient les différentes informations contenues par un token
- Un vecteur de **valeur** qui, multipliés par les poids de l'attention de la séquence en cours, permet de récupérer les informations importantes pour un certain token

L'utilisation de ces 3 matrices permet à chaque token d'appliquer plus ou moins d'attention aux autres tokens de la séquence, en fonction des informations que celui-ci cherchent, et que les autres possèdent. Ainsi, ce mécanisme possède l'avantage d'être indépendant de l'ordre des tokens.
Ensuite, il suffit d'appliquer un **softmax** sur les poids d'attention de la séquence pour obtenir une distribution de probabilité, qui indique quels tokens sont les plus importants pour le token en cours. 

En plus de l'auto-attention, il faut faire bien attention à ce que celle-ci soit *masquée*, c'est-à-dire que l'attention d'un token ne doit dépendre que des tokens précédents, et non des tokens futurs de la séquence. En effet, ce masque causal est important pour que le modèle ne puisse pas *tricher*.

### Multi-Head Attention

Un des problèmes engendrés par l'auto-attention (à une seule tête) est la perte d'informations pour chaque token. En effet, lorsque l'on pondère les poids d'attention entre chaque token, l'on perd de l'information sur un token précis. Une solution à ce problème est d'implémenter plusieurs têtes d'attention, qui calculeront chacune un score d'attention indépendamment des autres. Ceci permet à chacune de se concentrer sur un aspect différent de la séquence, par exemple les accords, la structure, ect. Ensuite, il suffit de concatétener les différents scores d'attention calculés.

Pour mon modèle actuel, après quelques expérimentations empiriques et avec mes contraintes de temps/matériel, j'ai trouvé que 4 têtes d'attention était un bon compromis.

## Perceptron multicouche

Après le mécanisme d'attention, pour compléter l'architecture du Transformer, il a fallu encore y ajouter un **perceptron multicouche**. Ce perceptron multicouche permet d'introduire de la non-linéarité (avec notamment la fonction d'activation) et de traiter chaque token individuellement. Ce réseau prend entrée la sortie de l'aattention multi-têtes et projette ces vecteurs dans une dimension cachée, pour extraire des motifs plus abstraits. Une fois les données projetées, on applique ensuite une fonction d'activation, j'ai choisi la ReLU dans mon cas. Cette fonction est définie comme `f(x) = max(0, x)` et permet ainsi d'iontroduire de la non-linéarité dans le réseaux de neurones, essentiel pour apprendre des structures complexes. Une fois la ReLU appliquée, il faut encore compréssé les données de la couche cachée, pour qu'elles reviennent à leur taille de la couche d'entrée.

Généralement, il est préconisé d'avoir une taille de dimension cachée 2x ou 4x supérieur à celle de la couche d'entrée. En suivant ce conseil, et pour ne pas faire exploser la durée d'entraînement de mon modèle, j'ai décidé d'utiliser une taille de couche d'entrée à 256 dimensions, et celle de la couche cachée à 1024 dimensions.

### Empilement des blocs Transformer

L'attention suivi du perceptron multicouche constitue le coeur de ce que l'on appelle un bloc Transformer. Pour obtenir des meilleures prédictions et apprendre au modèle des représentations plus complexes, il est intéressant *d'empiler* plusieurs blocs à la suite, afin que la sortie du premier constitue l'entrée du deuxième.

Avce mes contraintes de matériel et de temps, je suis monté à 2 blocs Transformer, ce qui m'a déjà permis d'avoir quelques résultats.

## Entraînement du modèle

Pour entraîner mon modèle, j'ai décidé d'utiliser la manière standard pour ce type de modèle : **l'apprentissage auto-supervisé**. Cette manière d'entraîner Mnemos consiste à lui donner des séquences de tokens en entrée, et à lui faire prédire le prochain token, via une distribution de probabilité. Ensuite, on peut mesurer son *taux d'erreur* avec une fonction de perte, et ainsi ajuster les paramètres du modèle en fonction. Voici exactement la pipeline d'entraînement que j'ai utilisé pour entraîner mon modèle actuel.

### Données d'entraînement

Comme Mnemos est avant tout un projet purement pédagogique, et mes ressources matérielles étant limitées, j'ai décidé d'entraîner mon modèle sur un fichier de texte de 50 Mo. J'ai choisi un extrait des débats à l'assemblée nationale, qui a été utilisé pour entraîner un LLM nommé Claire. Ses données d'entraînement sont disponibles en OpenSource sur [HuggingFace](https://huggingface.co/datasets/OpenLLM-France/Claire-Dialogue-French-0.1/tree/main/FR/AssembleeNationale_13). Cela me paraîssait intéressant, car les dialgoues étaient structurés, et contenaient une *bonne* qualité de français. Cependant, avec du recul, avoir un vocabulaire aussi complexe pour un aussi petit modèle que le mien n'était peut-être pas la meilleure idée.

### Nettoyage du corpus & Batching

Une fois les données d'entraînementr extraites, il a fallu que je nettoie le corpus, notamment en supprimant les espaces supplémentaires et acarctères indésirables. Ensuite, il faut tokenizer le corpus grâce au vocabulaire que l'on a préalablement généré, et l'on divise enfin le texte d'entrainement en *batchs* (en lots), pour pouvoir paralléliser l'entraînement.

### Calcul de la perte d'entropie croisée

La prochaine étape est de faire passer les séquence de tokens à travers le modèle, qui va nous sortir une distribution de probabilités, après que l'on ait normalisé avec softmax. Il suffit ensuite de calculer la différence entre la distribution que le modèle a prédit, et le token correct. Pour cla, on utilise la perte d'entropie croisée qui, dans notre cas, se calcule simplement avec:
`L = -log(P)` avec P la probbabilité prédite du token correct.

Cette perte nous permet de savoir à quel point le modèle est *en tort*, plus elle est basse, mieux c'est. Cependant, il faut faire attention, car la perte n'est pas la seule métrique à prendre en compte lorsque l'on souhaite suivre l'avancement de l'entraînement de son modèle. En effet, la taille du vocabulaire influe directement sur la valeur de la perte, car plus le vocabulaire est grand, plus il sera compliqué de prédire la bonne distribution de probabilités.

### Calcul du gradient & Rétropropagation

la dernière étape consiste à faire le chemin inverse à travers le modèle, après avoir calculé la perte. Pour cela, on calcule couche par couche la responsabilité de chacune (Attention, MLP, ect.), et l'on essaie d'ajuster les poids de chaque couche en fonction du taux d'apprentissage que l'on a préalablement défini. De cette manière, le modèle est censé s'ajuster tout au long de l'entraînement, et sa perte est censée diminuer.

## Résultats et limites

Aujourd'hui, Mnemos en est encore au stade de POC, à sa version 0.4.0. Il ne eput toujours pas parler correctement sans commettre de fautes d'orthographe ou de grammaire, mais j'ai cependant observé une nette amélioration au fil des versions, ce qui est encourageant. Avec un vocabulaire de 1024 tokens, j'ai obtenu une perte de 1.4 sur la dernière version du modèle, ce qui reste satisfaisant.

Lors de prompts on observe que Mnemos arrive à reproduire la structure de phrases et de mots, ce qui est déjà impressionnant pour un modèle de cette taille, mais ses propos restent incohérents / incompréhensibles. Cela est dû à plusieurs limites, notamment la taille / variété du corpus d'apprentissage, et bien sûr la taille du modèle en lui-même.

## Futures améliorations

De nombreuses améliorations possibles sont encore à implémenter pour améliorer la performance de Mnemos, dont :
- **Implémentation d'un meilleur optimiseur pour la rétro-propagation**
- **Ajustement des paramètres**
- **Mnemos-Chess** (projet à venir)
