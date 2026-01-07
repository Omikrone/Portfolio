# Euphron — Un moteur d’échecs UCI en C++

## Contexte

Passionné par le jeu d’échecs, je me suis très tôt intéressé aux moteurs et à leur évolution au fil du temps.
Du premier programme d’échecs imaginé par Alan Turing en 1952 aux moteurs modernes comme Stockfish, le fossé technologique est immense, tant sur le plan algorithmique que sur celui des performances.

Ce contraste m’a donné envie de comprendre comment un moteur d’échecs fonctionne fondamentalement, au-delà de ses résultats, et d’explorer les mécanismes qui permettent à une machine de raisonner, d’évaluer une position et de choisir un coup.

## Motivations & objectifs

L’objectif principal de ce projet était de comprendre en profondeur le fonctionnement d’un moteur d’échecs au niveau algorithmique, afin de pouvoir concevoir un programme capable, à terme, de rivaliser avec un joueur humain — voire de me surpasser.

Dans cette optique, j’ai fait le choix volontaire de ne pas utiliser de bibliothèques “clé en main”, à l’exception des outils nécessaires aux communications réseau. Cette contrainte m’a permis d’aborder chaque problématique de manière progressive et maîtrisée, depuis la représentation du jeu jusqu’à la recherche de coups optimaux.

Le projet s’est donc structuré en plusieurs étapes :

- Le développement d’une librairie de jeu d’échecs en C++, chargée de représenter l’état du plateau, de valider les coups et d’appliquer les règles du jeu
→ [Chessboard](./chessboard.md)

La conception d’un moteur d’échecs compatible UCI, implémentant les algorithmes de recherche et d’évaluation
→ [Euphron](./euphron.md)

La mise en place d’un serveur de jeu, permettant de gérer des sessions et d’interagir avec le moteur à distance
→ [Chessgame](./chessgame.md)

Ce découpage modulaire m’a permis de travailler sur un système cohérent, extensible et orienté performance, tout en gardant une séparation claire des responsabilités entre les différentes briques du projet.

## Architecture & Conception

### Version 0 (Prototype)

Avant de développer le moteur d'échecs **Euphron**, j'ai d'abord choisi de développer les règles du jeu en lui-même ainsi que le serveur permettant de jouer au jeu d'échecs. Pour la première version de mon jeu d'échecs, pour des raisons de simplicité, j'ai décidé d'implémenter une version naïve du jeu, c'est-à-dire en **POO** (Programmation Orientée Objet), avec une classe pour chaque type de composant du jeu (classe `Chessboard`, classe abstraite `Piece` et toutes les classes qui en dérivent). Cette architecture possède l'avantage d'être plutôt simple d'implémentation, mais n'est pas du tout adaptée pour la recherche à grande échelle des noeuds, nécessaire pour des moteurs compétitifs.

Pour le serveur de jeu, j'ai choisi d'utiliser le framework C++ (Crow)[https://crowcpp.org/master/], car il est plutôt simple d'intégration et supporte les `WebSockets`, ce qui me sera utile plus tard pour la communication avec **Euphron**.

Voici un schéma de l'architecture haut-niveau de la version 0 de mon jeu d'échecs:
[Schéma]


### Version 1 (Version stable)

Après ce premier jeu fonctionnel, pour pouvoir rendre le code modulaire et extensible pour le développement de mon moteur d'échecs, j'ai décidé de séparer la logique du jeu et du serveur. J'ai donc crée ma propre librairie statique `Chessboard`, qui agit comme une interface publique pour manier le jeu. De cette manière, la librarie est à la fois utilisable par le serveur de jeu (pour vérifier la légalité des coups), et par le moteur pour générer ses propres coups.