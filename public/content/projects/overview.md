# Projet Échecs — Vue d’ensemble

## Contexte

Passionné par le jeu d’échecs, je me suis très tôt intéressé aux moteurs et à leur évolution au fil du temps.
Du premier programme d’échecs imaginé par Alan Turing en 1952 aux moteurs modernes comme Stockfish, le fossé technologique est immense, tant sur le plan algorithmique que sur celui des performances.

Ce contraste m’a donné envie de comprendre comment un moteur d’échecs fonctionne fondamentalement, au-delà de ses résultats, et d’explorer les mécanismes qui permettent à une machine de raisonner, d’évaluer une position et de choisir un coup.

## Motivations & objectifs

L’objectif principal de ce projet était de comprendre en profondeur le fonctionnement d’un moteur d’échecs au niveau algorithmique, afin de pouvoir concevoir un programme capable, à terme, de rivaliser avec un joueur humain — voire de me surpasser.

Dans cette optique, j’ai fait le choix volontaire de ne pas utiliser de bibliothèques “clé en main”, à l’exception des outils nécessaires aux communications réseau. Cette contrainte m’a permis d’aborder chaque problématique de manière progressive et maîtrisée, depuis la représentation du jeu jusqu’à la recherche de coups optimaux.

Le projet s’est donc structuré en **trois briques** complémentaires, chacune avec une responsabilité claire:

- **Chessboard** : une librairie d’échecs en C++ chargée de **représenter l’état du plateau**, de **valider les coups** et d’**appliquer les règles du jeu.
  → [Chessboard](./chessboard.md)

- **Euphron** : un moteur d’échecs compatible **UCI**, qui implémente les algorithmes de **recherche** et d’**évaluation**.
  → [Euphron](./euphron.md)

- **Chessgame** : un serveur de jeu qui **gère des sessions** et permet d’**interagir avec le moteur à distance**.
  → [Chessgame](./chessgame.md)

