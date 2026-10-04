# Hanzi Coach — HSK Trainer

## Présentation du projet

**Hanzi Coach** est une **application Android hors ligne** pour apprendre à **lire et à écrire le chinois simplifié**, du **HSK 1 au HSK 6**. Apprenant moi-même le chinois, je voulais un outil qui fasse réellement **écrire** les caractères, et pas seulement les reconnaître : l'application fait tracer chaque caractère au doigt et **vérifie chaque trait**.

Les révisions sont planifiées avec l'algorithme de **répétition espacée FSRS 6**, et le **rythme d'apprentissage s'ajuste tout seul** d'après les performances mesurées. L'interface est entièrement en français.

> **Statut : prototype (v0.1.0).** L'application est fonctionnelle de bout en bout ; l'APK est disponible dans les [Releases GitHub](https://github.com/Omikrone/HSK-Trainer/releases) (Android 8.0+).

## Une séance d'apprentissage

![Tracé guidé, écriture de mémoire et reconnaissance du sens](/assets/projects/hanzi-coach/seance.png)

- **Écriture vérifiée trait par trait** : nombre, ordre, direction et géométrie de chaque trait sont contrôlés, en mode guidé ou libre. Un rattrapage manuel couvre les cas où la reconnaissance se trompe.
- **Cinq types d'exercice** : tracé d'un caractère, tracé d'un mot case par case, reconnaissance du sens parmi quatre propositions, saisie du pinyin avec les tons, et phrases à trou tirées de phrases authentiques.
- **Une mémoire par compétence** : écrire, reconnaître et prononcer ont chacun leur propre état FSRS — savoir lire un caractère ne dit rien de la capacité à l'écrire.

## Un rythme qui se régule tout seul

![Accueil, progression et résultat d'un HSK blanc](/assets/projects/hanzi-coach/suivi.png)

- **Objectif daté** : on choisit un niveau HSK et une date ; l'application en déduit la durée de séance nécessaire et affiche chaque jour l'écart entre le rythme demandé et le rythme réellement tenu.
- **Rythme adaptatif** : le nombre de nouveautés par jour n'est pas un réglage. Il est recalculé chaque jour à partir du retard accumulé et du taux de réussite des 14 derniers jours (**boucle de rétroaction**).
- **HSK blanc chronométré** : 30 questions en 20 minutes, sur le modèle des épreuves écrites officielles, générées à partir du corpus de phrases.
- **Suivi de progression** : grilles de maîtrise par niveau, historique d'activité, charge de révision à venir, sauvegarde et restauration complètes en JSON.

## Points techniques

| Domaine | Ce qui a été fait |
| --- | --- |
| **Algorithme** | Implémentation de **FSRS 6 en Kotlin pur**, un planificateur de séance qui répartit un budget de temps entre découvertes, révisions et rattrapages, et un régulateur de rythme à boucle de rétroaction. |
| **Reconnaissance du tracé** | Comparaison **géométrique** des traits saisis avec les médianes de *Make Me a Hanzi* (ordre, sens, position, forme). |
| **Données** | **Pipeline Python** reproductible qui fusionne la liste officielle HSK 3.0, le dictionnaire CFDICT et Tatoeba (conversion traditionnel → simplifié, segmentation). Chaque source est épinglée par empreinte SHA-256, et le résultat est compilé en base SQLite au build. |
| **Persistance** | Deux bases **Room** (catalogue en lecture seule, progression avec migrations testées) et **DataStore** pour les réglages. |
| **Qualité** | **363 tests unitaires** JVM, 25 tests instrumentés (requêtes et migrations Room) et 58 tests Python. La CI vérifie que la base embarquée correspond au schéma Room compilé. |
| **Build** | Tâche Gradle personnalisée qui génère la base du catalogue avant le packaging, APK release minifié avec R8 et publié par **GitHub Actions**. |

Le tout est **100 % hors ligne** : le catalogue embarqué compte **1 940 caractères, 5 399 mots et 15 730 phrases**, sans compte ni réseau.

## Architecture

L'application suit une architecture en couches, avec injection de dépendances manuelle :

```
app/src/main/java/fr/hanzicoach/
├── domain/     FSRS, planificateur de séance, régulation du rythme, validation des traits, pinyin
├── data/       dépôts, bases Room (catalogue, progression), sauvegarde JSON
├── ui/         écrans Compose : accueil, séance, caractères, progrès, HSK blanc, paramètres
├── reminder/   rappel quotidien
└── di/         conteneur de dépendances
tools/          pipeline Python de génération du catalogue et du corpus
```

La couche `domain` est du **Kotlin pur, sans dépendance Android**, ce qui permet de tester toute la logique métier (FSRS, planification, régulation) sur la JVM.

## Compétences mises en œuvre

- **Développement mobile natif** : Kotlin, Jetpack Compose, Material 3, Coroutines/Flow, Navigation Compose.
- **Algorithmique appliquée** : répétition espacée, planification sous contrainte de temps, régulation par rétroaction, reconnaissance géométrique de tracés.
- **Ingénierie des données** : pipeline reproductible multi-sources, gestion des licences (CC BY-SA, CC BY, Arphic).
- **Qualité logicielle** : tests unitaires et instrumentés, migrations de base testées, intégration continue.
- **Conception documentée** : un [journal de conception](https://github.com/Omikrone/HSK-Trainer/blob/main/docs/CONCEPTION.md) justifie chaque règle de l'application par le problème concret qu'elle corrige.
