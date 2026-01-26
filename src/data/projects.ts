import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Mnemos",
    slug: "mnemos",
    description: "Un modèle de langage (LLM) implémenté from scratch en Python, basé sur l'architecture Transformer.",
    tags: ["Python", "AI", "Transformer", "Deep Learning"],
    imageUrl: "/content/images/mnemos_preview.jpg", // Placeholder path
    repoLink: "https://youtube.com", // Placeholder or need user input? User said "j'ai déjà inclu un rapport", content exists in mnemos.md
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
    imageUrl: "https://placehold.co/600x400/png?text=Chessboard",
    demoLink: "http://euphron.duckdns.org:49181",
    repoLink: "https://github.com/Omikrone/Chessboard",
    category: 'personal'
  },
  {
    id: 3,
    title: "Chessgame Server",
    slug: "chessgame",
    description: "Un serveur de jeu pour la gestion de parties d'échecs avec WebSockets.",
    tags: ["C++", "Websocket", "REST"],
    imageUrl: "https://placehold.co/600x400/png?text=Chess+Server",
    demoLink: "http://euphron.duckdns.org:49181/",
    repoLink: "https://github.com/Omikrone/Chessgame",
    category: 'personal'
  },
  {
    id: 4,
    title: "Euphron Chess Engine",
    slug: "euphron",
    description: "Un moteur d'échecs C++ implémentant des algorithmes de recherche classiques (Alpha-Beta, etc.).",
    tags: ["C++", "Engine", "UCI"],
    imageUrl: "https://placehold.co/600x400/png?text=Euphron+Engine",
    repoLink: "https://github.com/Omikrone/Euphron",
    category: 'personal'
  },
  // School Projects Placeholders
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
    title: "Sujet de Stage / Alternance",
    slug: "stage-but",
    description: "Développement d'outils internes pour l'entreprise d'accueil.",
    tags: ["Fullstack", "Enterprise"],
    imageUrl: "https://placehold.co/600x400/png?text=Internship",
    category: 'school'
  }
];