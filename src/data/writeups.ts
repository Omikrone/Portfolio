import type { WriteUp } from '../types';

const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const writeups: WriteUp[] = [
    {
        id: 1,
        title: "24hIUT2025 - Ret2popacola",
        slug: "ret2popacola",
        description: "Solution détaillée d'un challenge de stéganographie avec LSB et outils forensiques.",
        categories: ["pwn", "Reverse Engineering"],
        difficulty: "Intermédiaire",
        event: "24hIUT2025",
        date: "2025-05-24",
        points: 500,
        contentFilePath: getAssetPath("/assets/writeups/ret2popacola/ret2popacola.md")
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