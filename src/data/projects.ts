import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Chessboard library",
    slug: "chessboard",
    description: "Une librairie de jeu d'échecs optimisée pour la performance et utilisable par des moteur d'échecs.",
    tags: ["React", "TypeScript", "Tailwind", "Recharts"],
    imageUrl: "https://placehold.co/600x400/png?text=Dashboard+Preview",
    demoLink: "https://example.com",
    repoLink: "https://github.com/Omikrone/Chessboard",
  },
  {
    id: 2,
    slug: "test1",
    title: "API RESTful Node.js",
    description: "Backend pour une application e-commerce. Authentification JWT, tests unitaires et documentation Swagger.",
    tags: ["Node.js", "Express", "MongoDB", "Jest"],
    imageUrl: "https://placehold.co/600x400/png?text=API+Backend",
    repoLink: "https://github.com",
  },
    {
    id: 3,
    slug: "test2",
    title: "Application Mobile Flutter",
    description: "Projet scolaire de 2ème année pour la gestion de notes de frais en entreprise, cross-platform.",
    tags: ["Flutter", "Dart", "Firebase"],
    imageUrl: "https://placehold.co/600x400/png?text=Mobile+App",
    repoLink: "https://github.com",
  },
];