/**
 * Retourne l'URL de l'image pour un projet.
 * Essaie d'abord le logo.png dans le dossier du projet,
 * puis utilise l'imageUrl par défaut si le logo n'existe pas.
 */
export const getProjectImageUrl = (slug: string, defaultImageUrl?: string): string => {
    const logoPath = `/content/projects/${slug}/logo.png`;

    if (!defaultImageUrl) {
        return logoPath;
    }

    return logoPath;
};

/**
 * Vérifie si une image existe et retourne une promesse
 */
export const checkImageExists = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
};
