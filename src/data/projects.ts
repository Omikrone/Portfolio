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
    id: 101,
    title: "Projet Web - E-Commerce",
    slug: "school-ecommerce",
    description: "Réalisation d'une site e-commerce en PHP/Symfony durant ma 2ème année de BUT.",
    tags: ["PHP", "Symfony", "MySQL"],
    imageUrl: "https://placehold.co/600x400/png?text=School+Project",
    category: 'school'
  },
  {
    id: 102,
    title: "Sujet de Stage - Zenbot",
    slug: "stage-but",
    description: "Développement d'un chatbot de support technique se basant sur des techniques de RAG.",
    tags: ["RAG", "Enterprise"],
    imageUrl: "https://placehold.co/600x400/png?text=Internship",
    category: 'school'
  }
];