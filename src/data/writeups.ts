import type { WriteUp } from '../types';

const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const writeups: WriteUp[] = [
    {
        id: 1,
        title: "24hIUT2025 - Ret2popacola",
        slug: "ret2popacola",
        description: "Analyse et Exploitation d'une vulnérabilité de type buffer overflow.",
        categories: ["Pwn", "Reverse Engineering"],
        difficulty: "Intermédiaire",
        eventId: "24hIUT2025",
        date: "2025-05-24",
        points: 500,
        contentFilePath: getAssetPath("/assets/writeups/ret2popacola/ret2popacola.md")
    },
    {
        id: 2,
        title: "24hIUT2025 - ReverseTheDuck",
        slug: "reverse-the-duck",
        description: "Analyse et Reverse Engineering d'un binaire Rubber Ducky.",
        categories: ["Reverse Engineering"],
        difficulty: "Débutant",
        eventId: "24hIUT2025",
        date: "2025-05-24",
        points: 500,
        contentFilePath: getAssetPath("/assets/writeups/reverse-the-duck/reverse-the-duck.md")
    },
    {
        id: 3,
        title: "24hIUT2025 - Freizh Exam",
        slug: "freizh-exam",
        description: "Analyse et Reverse Engineering d'un binaire ELF.",
        categories: ["Reverse Engineering"],
        difficulty: "Débutant",
        eventId: "24hIUT2025",
        date: "2025-05-24",
        points: 500,
        contentFilePath: getAssetPath("/assets/writeups/freizh-exam/freizh-exam.md")
    },
    {
        id: 4,
        title: "24hIUT2025 - Blog Cola 1/2",
        slug: "blog-cola-1-2",
        description: "Analyse et Exploitation d'une faille XSS dans un blog.",
        categories: ["Web"],
        difficulty: "Débutant",
        eventId: "24hIUT2025",
        date: "2025-05-24",
        points: 500,
        contentFilePath: getAssetPath("/assets/writeups/blog-cola-1-2/blog-cola-1-2.md")
    },
    {
        id: 5,
        title: "24hIUT2025 - Blog Cola 2/2",
        slug: "blog-cola-2-2",
        description: "Analyse et Exploitation d'une faille XSS avancée dans un blog.",
        categories: ["Web"],
        difficulty: "Intermédiaire",
        eventId: "24hIUT2025",
        date: "2025-05-24",
        points: 500,
        contentFilePath: getAssetPath("/assets/writeups/blog-cola-2-2/blog-cola-2-2.md")
    },
    {
        id: 6,
        title: "24hIUT2025 - Intern Work",
        slug: "intern-work",
        description: "Analyse et Exploitation d'une faille SQL dans une page d'authentification.",
        categories: ["Web"],
        difficulty: "Débutant",
        eventId: "24hIUT2025",
        date: "2025-05-24",
        points: 500,
        contentFilePath: getAssetPath("/assets/writeups/intern-work/intern-work.md")
    }
];

export const getAllCategories = (): string[] => {
    const categories = new Set<string>();
    writeups.forEach(writeup => {
        writeup.categories.forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
};

export const getSortedWriteUps = (): WriteUp[] => {
    return [...writeups].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};