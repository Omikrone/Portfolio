# Challenge de stéganographie - "Hidden in Plain Sight"

## Description du challenge
**Points**: 100 points  
**Catégorie**: Steganography  
**Difficulté**: Intermédiaire  
**Plateforme**: Root-Me  

L'objectif est de retrouver un flag caché dans une image PNG apparemment normale.

## Analyse initiale

Commençons par vérifier le type de fichier et ses métadonnées :

```bash
file challenge.png
exiftool challenge.png
```