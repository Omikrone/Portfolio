import type { WriteUp } from '../types';

const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const writeups: WriteUp[] = [
    {
        id: 1,
        title: "Challenge de stéganographie - CTF RootMe",
        slug: "stegano-challenge-1",
        description: "Solution détaillée d'un challenge de stéganographie avec LSB et outils forensiques.",
        categories: ["Steganography", "Forensics"],
        difficulty: "Intermédiaire",
        platform: "Root-Me",
        date: "2024-01-15",
        points: 100,
        contentFilePath: getAssetPath("/assets/writeups/stegano-challenge-1/stegano-challenge-1.md")
    },
    {
        id: 2,
        title: "Reverse engineering d'un binaire Linux",
        slug: "reverse-elf-challenge",
        description: "Analyse d'un binaire ELF 64 bits avec protection NX et analyse de fonctions vulnérables.",
        categories: ["Reverse Engineering", "Binary Exploitation"],
        difficulty: "Avancé",
        platform: "PicoCTF",
        date: "2024-02-01",
        points: 250,
        contentFilePath: getAssetPath("/assets/writeups/reverse-elf-challenge/reverse-elf-challenge.md")
    },
    {
        id: 3,
        title: "Exploitation Web - Injection SQL avancée",
        slug: "web-sqli-advanced",
        description: "Bypass de WAF et exploitation de SQL injection time-based sur une application moderne.",
        categories: ["Web Security", "SQLi / XSS"],
        difficulty: "Intermédiaire",
        platform: "HackTheBox",
        date: "2024-01-22",
        points: 150,
        contentFilePath: getAssetPath("/assets/writeups/web-sqli-advanced/web-sqli-advanced.md")
    },
    {
        id: 4,
        title: "Cryptanalyse d'un chiffrement maison",
        slug: "crypto-custom-cipher",
        description: "Analyse et cassage d'un chiffrement personnalisé développé pour un CTF.",
        categories: ["Cryptographie"],
        difficulty: "Débutant",
        platform: "CTFd",
        date: "2024-01-10",
        points: 50,
        contentFilePath: getAssetPath("/assets/writeups/crypto-custom-cipher/crypto-custom-cipher.md")
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