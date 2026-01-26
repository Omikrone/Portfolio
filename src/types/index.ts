export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    imageUrl?: string;
    demoLink?: string;
    repoLink?: string;
    category: 'personal' | 'school';
    featured?: boolean;
    longDescription?: boolean; // If true, tries to load markdown from /content/projects/{slug}.md
}