# Projet Échecs — Vue d’ensemble

## Contexte

Passionné par le jeu d’échecs, je me suis très tôt intéressé aux moteurs et à leur évolution au fil du temps.
Du premier programme d’échecs imaginé par Alan Turing en 1952 aux moteurs modernes comme Stockfish, le fossé technologique est immense, tant sur le plan algorithmique que sur celui des performances.

Ce contraste m’a donné envie de comprendre comment un moteur d’échecs fonctionne fondamentalement, au-delà de ses résultats, et d’explorer les mécanismes qui permettent à une machine de raisonner, d’évaluer une position et de choisir un coup.

## Motivations & objectifs

L’objectif principal de ce projet était de comprendre en profondeur le fonctionnement d’un moteur d’échecs au niveau algorithmique, afin de pouvoir concevoir un programme capable, à terme, de rivaliser avec un joueur humain — voire de me surpasser.

Dans cette optique, j’ai fait le choix volontaire de ne pas utiliser de bibliothèques “clé en main”, à l’exception des outils nécessaires aux communications réseau. Cette contrainte m’a permis d’aborder chaque problématique de manière progressive et maîtrisée, depuis la représentation du jeu jusqu’à la recherche de coups optimaux.

Le projet s’est donc structuré en **trois briques** complémentaires, chacune avec une responsabilité claire.

## Les 3 projets

- **Chessboard** : une librairie d’échecs en C++ chargée de **représenter l’état du plateau**, de **valider les coups** et d’**appliquer les règles du jeu.
  → [Chessboard](./chessboard.md)

- **Euphron** : un moteur d’échecs compatible **UCI**, qui implémente les algorithmes de **recherche** et d’**évaluation**.
  → [Euphron](./euphron.md)

- **Chessgame** : un serveur de jeu qui **gère des sessions** et permet d’**interagir avec le moteur à distance**.
  → [Chessgame](./chessgame.md)

## Organisation des modules
Le découpage modulaire suit une logique simple :

```
Client web
	|
	v
Chessgame (serveur)
	|  utilise
	v
Chessboard (librairie règles + plateau)
	|
	|  communique avec
	v
Euphron (moteur UCI)
	|  s'appuie sur
	v
Chessboard
```

- **Chessgame** orchestre une partie (état global, sessions, échanges réseau) et s’appuie sur **Chessboard** pour garantir la **légalité** des coups.
- **Euphron** calcule les coups à jouer (recherche/évaluation) et s’appuie aussi sur **Chessboard** pour générer/appliquer/annuler des coups pendant la recherche.

Ce découpage modulaire m’a permis de travailler sur un système **cohérent**, **extensible** et orienté **performance**, tout en gardant une séparation claire des responsabilités entre les différentes briques du projet.
