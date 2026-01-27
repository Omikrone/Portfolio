export interface TagColor {
    bg: string;
    border: string;
    text: string;
}

export const projectTypeColors: Record<string, TagColor> = {
    "IA": {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-400"
    },
    "Cybersécurité": {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-400"
    },
    "Algorithmique": {
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-400"
    },
    "API": {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        text: "text-cyan-400"
    },
    "Jeu Vidéo": {
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
        text: "text-pink-400"
    }
};

export const languageColors: Record<string, TagColor> = {
    "Python": {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-400"
    },
    "C++": {
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
        text: "text-indigo-400"
    },
    "TypeScript": {
        bg: "bg-sky-500/10",
        border: "border-sky-500/20",
        text: "text-sky-400"
    },
    "Java": {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-400"
    },
    "JavaScript": {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        text: "text-yellow-400"
    }
};

export const categoryColors: Record<string, TagColor> = {
    "personal": {
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        text: "text-violet-400"
    },
    "school": {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-400"
    }
};

export const getProjectTypeColor = (type: string): TagColor => {
    return projectTypeColors[type] || {
        bg: "bg-gray-500/10",
        border: "border-gray-500/20",
        text: "text-gray-400"
    };
};

export const getLanguageColor = (language: string): TagColor => {
    return languageColors[language] || {
        bg: "bg-gray-500/10",
        border: "border-gray-500/20",
        text: "text-gray-400"
    };
};

export const getCategoryColor = (category: string): TagColor => {
    return categoryColors[category] || {
        bg: "bg-gray-500/10",
        border: "border-gray-500/20",
        text: "text-gray-400"
    };
};
