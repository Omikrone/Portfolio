export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: string;
    languages: string[];
    skills?: string[];
    imageUrl?: string;
    demoLink?: string;
    repoLink?: string;
    category: 'personal' | 'school' | 'professional';
    featured?: boolean;
    longDescription?: boolean;
    startYear: number;
    endYear: number;
}