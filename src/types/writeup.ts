export interface WriteUp {
    id: number;
    title: string;
    slug: string;
    description: string;
    categories: string[];
    difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
    event: string;
    date: string;
    imageUrl?: string;
    featured?: boolean;
    points?: number;
    contentFilePath: string;
}