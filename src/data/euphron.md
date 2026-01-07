# Euphron : Un moteur d'échecs UCI en C++

## Contexte

En tant que passionné du jeu d'échecs, les moteurs et leur évolution au fil du temps m'ont toujours intéressé. Du premier programme d'échecs écrit par Alan Turing en 1952 aux moteurs comme Stockfish tels qu'on les connaît aujourd'hui, c'est un véritable gouffre qui sépare les 2 innovations.

## Motivations & Objectifs

Je voulais comprendre comment un moteur fonctionne fondamentalement au niveau algorithmique, afin de pouvoir en programmer qui puisse à terme me suplanter. Pour cela j'ai choisi en conséquence de ne pas utiliser de librarie externe *pré-faite* (mis à part pour les connexions réseau), afin de vraiment comprendre en profondeur le fonctionnement de mon programme.

Mon objectif principal a donc été de programmer dans un premier temps un jeu d'échecs en C++, qui sera la base de mon moteur, et d'ensuite développer le serveur de jeu ainsi que le moteur **Euphron**.

## Architecture & Conception

### Version 0 (Prototype)

Avant de développer le moteur d'échecs **Euphron**, j'ai d'abord choisi de développer les règles du jeu en lui-même ainsi que le serveur permettant de jouer au jeu d'échecs. Pour la première version de mon jeu d'échecs, pour des raisons de simplicité, j'ai décidé d'implémenter une version naïve du jeu, c'est-à-dire en **POO** (Programmation Orientée Objet), avec une classe pour chaque type de composant du jeu (classe `Chessboard`, classe abstraite `Piece` et toutes les classes qui en dérivent). Cette architecture possède l'avantage d'être plutôt simple d'implémentation, mais n'est pas du tout adaptée pour la recherche à grande échelle des noeuds, nécessaire pour des moteurs compétitifs.

Pour le serveur de jeu, j'ai choisi d'utiliser le framework C++ (Crow)[https://crowcpp.org/master/], car il est plutôt simple d'intégration et supporte les `WebSockets`, ce qui me sera utile plus tard pour la communication avec **Euphron**.

Voici un schéma de l'architecture haut-niveau de la version 0 de mon jeu d'échecs:
[Schéma]


### Version 1 (Version stable)

Après ce premier jeu fonctionnel, pour pouvoir rendre le code modulaire et extensible pour le développement de mon moteur d'échecs, j'ai décidé de séparer la logique du jeu et du serveur. J'ai donc crée ma propre librairie statique `Chessboard`, qui agit comme une interface publique pour manier le jeu. De cette manière, la librarie est à la fois utilisable par le serveur de jeu (pour vérifier la légalité des coups), et par le moteur pour générer ses propres coups.