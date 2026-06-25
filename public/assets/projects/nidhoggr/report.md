# Níðhöggr — StrasTaRoute

## Présentation du projet

**StrasTaRoute (STR)** est une application complète de **gestion et de planification d'événements sportifs**, réalisée en équipe sous le nom de groupe **Níðhöggr** dans le cadre de ma formation en **BUT Informatique**. Elle permet aux organisateurs de **créer, planifier et coordonner** des événements (courses, manifestations) avec des outils avancés de **cartographie**, de **gestion des équipements de sécurité** et de **coordination des équipes** sur le terrain.

Le projet a été pensé comme un **système complet** : une interface web pour les organisateurs, une application mobile pour les équipes de terrain, et une API centrale qui relie le tout.

![Tracé de parcours sur la carte interactive](/assets/projects/nidhoggr/cover.png)

## Une architecture full-stack en plusieurs services

StrasTaRoute est organisé en **plusieurs dépôts** correspondant chacun à un service :

- **`str-web`** — Interface web d'administration développée en **Angular** (avec Angular Material). C'est l'outil principal des organisateurs.
- **`str-mobile`** — Application mobile en **React Native / Expo**, destinée aux équipes sur le terrain (consultation du planning, géolocalisation, prises de photos).
- **`str-api`** — API REST développée avec **NestJS**, s'appuyant sur **PostgreSQL** et l'ORM **Prisma**, avec authentification **JWT**.
- **`str-ci`** — Outils d'**intégration continue** (GitLab CI), git hooks et déploiement via **Docker**.

Cette séparation en services indépendants nous a permis de **travailler en parallèle** au sein de l'équipe tout en maintenant des interfaces claires entre les composants.

## Principales fonctionnalités

### Carte interactive

Au cœur de l'application, une **carte interactive** (basée sur **Leaflet** et **MapLibre GL**) permet de visualiser et gérer en temps réel tous les éléments géographiques d'un événement :

- Tracé de **parcours** et dessin de **zones**
- Placement d'**équipements de sécurité** (barrières, véhicules, etc.)
- Ajout de **points d'attention** (avertissements)
- Affichage des **points d'intérêt** et navigation fluide

### Planification & coordination

![Diagramme de Gantt pour la planification](/assets/projects/nidhoggr/gantt.png)

- **Timeline / diagramme de Gantt** pour planifier le déroulé de l'événement
- **Gestion des équipes** et des **employés** affectés
- Filtrage et recherche avancés sur les événements

### Export & synchronisation mobile

![Synchronisation web ↔ mobile via QR Code](/assets/projects/nidhoggr/sync.png)

- **Export des données** d'un événement en **PDF** et **Excel/CSV**
- **Synchronisation** entre l'interface web et l'application mobile via un **QR Code** : les équipes de terrain récupèrent instantanément le planning et la cartographie de l'événement.

## Compétences mises en œuvre

Ce projet d'envergure m'a permis de mettre en pratique de nombreuses compétences :

- **Développement full-stack** sur trois fronts (web Angular, mobile React Native, API NestJS).
- **Conception et consommation d'une API REST**, modélisation de la base de données avec **Prisma / PostgreSQL**.
- **Authentification et sécurité** (JWT, hachage des mots de passe).
- **Cartographie web** et manipulation de données **géospatiales** (géométries, GPS).
- **Intégration continue et déploiement** (GitLab CI, Docker).
- **Travail en équipe** : organisation multi-dépôts, gestion de branches Git, méthodologie de projet.

> Le code source est hébergé sur le GitLab de l'Université de Strasbourg : [git.unistra.fr/nidhoggr-25](https://git.unistra.fr/nidhoggr-25) *(accès restreint).*
