import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Mnemos",
    slug: "mnemos",
    description: "Un modèle de langage (LLM) implémenté from scratch en Python, basé sur l'architecture Transformer.",
    tags: ["Python", "AI", "Transformer", "Deep Learning"],
    imageUrl: "/content/projects/mnemos/logo.png",
    repoLink: "https://github/Omikrone/Mnemos",
    category: 'personal',
    featured: true,
    longDescription: true
  },
  {
    id: 2,
    title: "Chessboard Library",
    slug: "chessboard",
    description: "Une librairie de jeu d'échecs optimisée pour la performance et utilisable par des moteur d'échecs.",
    tags: ["C++", "Library", "Performance"],
    imageUrl: "/content/projects/chessboard/logo.png",
    demoLink: "http://euphron.duckdns.org:49181",
    repoLink: "https://github.com/Omikrone/Chessboard",
    category: 'personal',
    featured: true,
    longDescription: true
  },
  {
    id: 3,
    title: "Chessgame Server",
    slug: "chessgame",
    description: "Un serveur de jeu pour la gestion de parties d'échecs avec WebSockets.",
    tags: ["C++", "Websocket", "REST"],
    imageUrl: "/content/projects/chessgame/logo.png",
    demoLink: "http://euphron.duckdns.org:49181/",
    repoLink: "https://github.com/Omikrone/Chessgame",
    category: 'personal',
    longDescription: true
  },
  {
    id: 4,
    title: "Euphron Chess Engine",
    slug: "euphron",
    description: "Un moteur d'échecs C++ implémentant des algorithmes de recherche classiques (Alpha-Beta, etc.).",
    tags: ["C++", "Engine", "UCI"],
    imageUrl: "/content/projects/euphron/logo.png",
    repoLink: "https://github.com/Omikrone/Euphron",
    category: 'personal',
    featured: true,
    longDescription: true
  },
  {
    id: 5,
    title: "Janus",
    slug: "janus",
    description: "Une backdoor en C++ persistante pour Windows.",
    tags: ["C++", "Windows", "Backdoor"],
    imageUrl: "/content/projects/janus/logo.png",
    repoLink: "https://github.com/Omikrone/Janus",
    category: 'personal',
  },
  {
    id: 101,
    title: "AntarcticHell",
    slug: "antarctichell",
    description: "Développement d'un serious game sur les conditions climatiques extrêmes en Antarctique.",
    tags: ["PHP", "Symfony", "MySQL"],
    imageUrl: "https://placehold.co/600x400/png?text=School+Project",
    category: 'school'
  },
  {
    id: 102,
    title: "Labyrinthe",
    slug: "labyrinthe",
    description: "Création d'une version numérique du jeu de société 'Labyrinthe' avec fonctionnalités multijoueurs.",
    tags: ["Python", "Machine Learning", "Recommender Systems"],
    imageUrl: "https://placehold.co/600x400/png?text=Final+Year+Project",
    category: 'school'
  },
  {
    id: 103,
    title: "POOkemon",
    slug: "pookemon",
    description: "Développement d'un jeu de type Pokémon en Java à jouer dans la console.",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    imageUrl: "https://placehold.co/600x400/png?text=School+Project",
    category: 'school'
  },
  {
    id: 104,
    title: "Sujet de Stage - Zenbot",
    slug: "stage-but",
    description: "Développement d'un chatbot de support technique se basant sur des techniques de RAG.",
    tags: ["RAG", "Enterprise"],
    imageUrl: "https://placehold.co/600x400/png?text=Internship",
    category: 'school'
  }
];