export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoLink?: string;
  repoLink: string;
}