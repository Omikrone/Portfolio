import type { Project } from "../types";

const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Mnemos",
    slug: "mnemos",
    description: "Un modèle de langage (LLM) implémenté from scratch en Python, basé sur l'architecture Transformer.",
    type: "IA",
    languages: ["Python"],
    imageUrl: getAssetPath("/assets/projects/mnemos/logo.png"),
    demoLink: "http://mnemos.duckdns.org:49182",
    repoLink: "https://github.com/Omikrone/Mnemos",
    category: 'personal',
    featured: true,
    longDescription: true,
    startYear: 2025,
    endYear: 2026
  },
  {
    id: 2,
    title: "Chessboard Library",
    slug: "chessboard",
    description: "Une librairie de jeu d'échecs optimisée pour la performance et utilisable par des moteur d'échecs.",
    type: "Algorithmique",
    languages: ["C++"],
    imageUrl: getAssetPath("/assets/projects/chessboard/logo.png"),
    demoLink: "http://euphron.duckdns.org:49181",
    repoLink: "https://github.com/Omikrone/Chessboard",
    category: 'personal',
    featured: true,
    longDescription: true,
    startYear: 2025,
    endYear: 2026
  },
  {
    id: 3,
    title: "Chessgame Server",
    slug: "chessgame",
    description: "Un serveur de jeu pour la gestion de parties d'échecs avec WebSockets.",
    type: "API",
    languages: ["C++"],
    imageUrl: getAssetPath("/assets/projects/chessgame/logo.png"),
    demoLink: "http://euphron.duckdns.org:49181/",
    repoLink: "https://github.com/Omikrone/Chessgame",
    category: 'personal',
    longDescription: true,
    startYear: 2025,
    endYear: 2026
  },
  {
    id: 4,
    title: "Euphron Chess Engine",
    slug: "euphron",
    description: "Un moteur d'échecs C++ implémentant des algorithmes de recherche classiques (Alpha-Beta, etc.).",
    type: "Algorithmique",
    languages: ["C++"],
    imageUrl: getAssetPath("/assets/projects/euphron/logo.png"),
    demoLink: "http://euphron.duckdns.org:49181",
    repoLink: "https://github.com/Omikrone/Euphron",
    category: 'personal',
    featured: true,
    longDescription: true,
    startYear: 2025,
    endYear: 2026
  },
  {
    id: 5,
    title: "Janus",
    slug: "janus",
    description: "Une backdoor en C++ persistante pour Windows.",
    type: "Cybersécurité",
    languages: ["C++"],
    imageUrl: getAssetPath("/assets/projects/janus/logo.png"),
    repoLink: "https://github.com/Omikrone/Janus",
    category: 'personal',
    startYear: 2023,
    endYear: 2025
  },
  {
    id: 6,
    title: "Osabot",
    slug: "osabot",
    description: "Un bot Discord de support pour le serveur Minecraft Osalys",
    type: "Développement",
    languages: ["Python"],
    imageUrl: getAssetPath("/assets/projects/osabot/logo.png"),
    repoLink: "https://github.com/Omikrone/Osabot",
    category: 'personal',
    startYear: 2020,
    endYear: 2022
  },
  {
    id: 7,
    title: "Bookify Mobile",
    slug: "bookify-mobile",
    description: "Développement d'une application mobile pour la gestion des livres.",
    type: "Développement",
    languages: ["Java"],
    imageUrl: getAssetPath("/assets/projects/bookify-mobile/logo.png"),
    repoLink: "https://github.com/Omikrone/bookify-mobile",
    category: 'school',
    startYear: 2025,
    endYear: 2025
  },
  {
    id: 101,
    title: "AntarcticHell",
    slug: "antarctichell",
    description: "Développement d'un serious game sur les conditions climatiques extrêmes en Antarctique.",
    type: "Jeu Vidéo",
    languages: ["TypeScript"],
    imageUrl: getAssetPath("/assets/projects/antarctichell/logo.png"),
    repoLink: "https://github.com/Omikrone/AntarcticHell",
    category: 'school',
    startYear: 2025,
    endYear: 2025
  },
  {
    id: 102,
    title: "Labyrinthe",
    slug: "labyrinthe",
    description: "Création d'une version numérique du jeu de société 'Labyrinthe' avec fonctionnalités multijoueurs.",
    type: "Jeu Vidéo",
    languages: ["Python"],
    imageUrl: getAssetPath("/assets/projects/labyrinthe/logo.png"),
    repoLink: "https://github.com/Omikrone/Labyrinthe",
    category: 'school',
    startYear: 2024,
    endYear: 2024
  },
  {
    id: 103,
    title: "POOkemon",
    slug: "pookemon",
    description: "Développement d'un jeu de type Pokémon en Java à jouer dans la console.",
    type: "Jeu Vidéo",
    languages: ["Java"],
    imageUrl: getAssetPath("/assets/projects/pookemon/logo.png"),
    repoLink: "https://github.com/Omikrone/POOkemon",
    category: 'school',
    startYear: 2024,
    endYear: 2024
  },
  {
    id: 104,
    title: "Sujet de Stage - Zenbot",
    slug: "stage-but",
    description: "Développement d'un chatbot de support technique se basant sur des techniques de RAG.",
    type: "IA",
    languages: ["Python"],
    imageUrl: getAssetPath("/assets/projects/stage-but/logo.png"),
    category: 'school',
    startYear: 2025,
    endYear: 2025
  }
];

export const getSortedProjects = (): Project[] => {
  return [...projectsData].sort((a, b) => {
    if (a.endYear && b.endYear) {
      return b.endYear - a.endYear;
    }
    if (a.endYear && !b.endYear) return -1;
    if (!a.endYear && b.endYear) return 1;
    return 0;
  });
};