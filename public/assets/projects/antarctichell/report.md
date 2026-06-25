# AntarcticHell — Survivre à l'enfer blanc

## Présentation du projet

**AntarcticHell** est un **serious game** développé dans le cadre de ma formation en **BUT Informatique** (projet de semestre **T3-T4**). Le joueur y incarne l'**architecte de la station polaire Concordia**, une base de recherche bien réelle située sur le plateau Antarctique, l'un des endroits les plus **hostiles de la planète**.

L'objectif est double : proposer une expérience de jeu engageante tout en **sensibilisant** aux conditions de vie **extrêmes** auxquelles sont confrontés les scientifiques en Antarctique (froid, isolement, obscurité prolongée, promiscuité). C'est cette dimension pédagogique qui fait du projet un *serious game* et non un simple jeu.

## Principe de jeu

Le joueur doit aménager une station composée de **plusieurs étages** et veiller au **bien-être de ses habitants**. Chaque décision a un impact sur la **satisfaction** des résidents, qu'il faut maintenir pour progresser.

Les principales mécaniques sont :

- **Gestion des niveaux** : la station se construit étage par étage, seul le premier étant accessible au départ.
- **Aménagement des espaces** : on place ou retire des objets et du mobilier qui influencent directement la satisfaction des habitants.
- **Gestion de l'ambiance** : les couleurs et l'agencement des pièces jouent un rôle déterminant sur le moral.
- **Suivi des personnages** : chaque résident possède ses propres besoins et son propre niveau de satisfaction, que l'on peut consulter.
- **Système de feedback** : le jeu informe le joueur des conséquences de ses actions.
- **Progression** : l'objectif est de terminer chaque niveau en gardant les habitants satisfaits.

## Choix techniques

L'application a été développée comme une **application web monopage (SPA)** avec une stack moderne :

- **Vue.js 3** comme framework front-end, avec la **Composition API** pour structurer la logique.
- **TypeScript** pour bénéficier d'un typage statique et fiabiliser le code à mesure que le projet grandissait.
- Une architecture **en composants réutilisables**, chaque écran (gestion des étages, des ressources, des personnages…) étant isolé.
- Une **gestion d'état réactive** pour synchroniser en temps réel les ressources placées, les besoins des personnages et leur satisfaction.

## Compétences mises en œuvre

Ce projet m'a permis de mettre en pratique et de consolider plusieurs compétences :

- **Développement front-end** d'une interface réactive et interactive avec Vue.js et TypeScript.
- **Conception de mécaniques de jeu** et modélisation d'un système de simulation (besoins, satisfaction, progression).
- **Architecture logicielle** : découpage en composants, séparation des responsabilités.
- **Travail en équipe** et organisation autour d'une méthodologie de projet.
- **Game design pédagogique** : traduire un message de sensibilisation en mécaniques de jeu.

## Conclusion

AntarcticHell est un projet complet qui mêle **développement web**, **conception de jeu** et **sensibilisation**. Il illustre ma capacité à mener un projet de la conception à la réalisation, en équipe, tout en m'appropriant un framework moderne comme Vue.js.

Le code source est disponible sur [GitHub](https://github.com/Omikrone/AntarcticHell).
