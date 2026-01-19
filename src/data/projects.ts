import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Chessboard library",
    slug: "chessboard",
    description: "Une librairie de jeu d'échecs optimisée pour la performance et utilisable par des moteur d'échecs.",
    tags: ["C++", "Library"],
    imageUrl: "https://placehold.co/600x400/png?text=Dashboard+Preview",
    demoLink: "http://euphron.duckdns.org:49181 ",
    repoLink: "https://github.com/Omikrone/Chessboard",
  },
  {
    id: 2,
    slug: "chessgame",
    title: "Chessgame server",
    description: "Un serveur de jeu pour la gestion de parties d'échecs",
    tags: ["C++", "Websocket", "REST"],
    imageUrl: "https://placehold.co/600x400/png?text=API+Backend",
    demoLink: "http://euphron.duckdns.org:49181/",
    repoLink: "https://github.com/Omikrone/Chessgame",
  },
  {
    id: 3,
    slug: "euphron",
    title: "Chess Engine",
    description: "Un moteur d'échecs C++ implémentant des algorithmes de recherche classiques.",
    tags: ["C++", "Engine", "UCI"],
    imageUrl: "https://placehold.co/600x400/png?text=Chess+Engine",
    repoLink: "https://github.com/Omikrone/Euphron",
  },
];