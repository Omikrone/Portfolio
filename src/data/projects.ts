import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Dashboard Analytique",
    description: "Interface d'administration React avec graphiques interactifs (Recharts) et gestion d'état globale.",
    tags: ["React", "TypeScript", "Tailwind", "Recharts"],
    imageUrl: "https://placehold.co/600x400/png?text=Dashboard+Preview",
    demoLink: "https://example.com",
    repoLink: "https://github.com",
  },
  {
    id: 2,
    title: "API RESTful Node.js",
    description: "Backend pour une application e-commerce. Authentification JWT, tests unitaires et documentation Swagger.",
    tags: ["Node.js", "Express", "MongoDB", "Jest"],
    imageUrl: "https://placehold.co/600x400/png?text=API+Backend",
    repoLink: "https://github.com",
  },
    {
    id: 3,
    title: "Application Mobile Flutter",
    description: "Projet scolaire de 2ème année pour la gestion de notes de frais en entreprise, cross-platform.",
    tags: ["Flutter", "Dart", "Firebase"],
    imageUrl: "https://placehold.co/600x400/png?text=Mobile+App",
    repoLink: "https://github.com",
  },
];