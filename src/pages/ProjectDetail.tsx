import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { projectsData } from '../data/projects';
import { getProjectTypeColor, getLanguageColor, getCategoryColor } from '../utils/tagColors';

const ProjectDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = projectsData.find(p => p.slug === slug);
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (project?.longDescription) {
            fetch(`./content/projects/${slug}/report.md`)
                .then(res => {
                    if (res.ok) return res.text();
                    throw new Error('Content not found');
                })
                .then(text => {
                    setMarkdownContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [slug, project]);

    if (!project) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Projet introuvable</h2>
                <Link to="/projects" className="text-primary hover:text-white">Retour aux projets</Link>
            </div>
        );
    }

    const typeColor = getProjectTypeColor(project.type);
    const categoryColor = getCategoryColor(project.category);

    return (
        <div className="animate-fade-in pb-20">
            {/* Back Link */}
            <div className="mb-8">
                <Link to="/projects" className="text-sm text-text-muted hover:text-white transition-colors flex items-center gap-2">
                    ← Retour aux projets
                </Link>
            </div>

            {/* Banner Image */}
            {project.imageUrl && (
                <div className="mb-12 rounded-3xl overflow-hidden h-64 md:h-96 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Header */}
            <header className="mb-12 border-b border-white/10 pb-8">
                <div className="flex flex-wrap gap-3 mb-6">
                    {/* Type Tag */}
                    <span className={`text-sm font-mono ${typeColor.bg} border ${typeColor.border} px-3 py-1 rounded ${typeColor.text}`}>
                        {project.type}
                    </span>

                    {/* Language Tags */}
                    {project.languages.map(lang => {
                        const langColor = getLanguageColor(lang);
                        return (
                            <span key={lang} className={`text-sm font-mono ${langColor.bg} border ${langColor.border} px-3 py-1 rounded ${langColor.text}`}>
                                {lang}
                            </span>
                        );
                    })}

                    {/* Context Tag */}
                    <span className={`text-sm font-mono ${categoryColor.bg} border ${categoryColor.border} px-3 py-1 rounded ${categoryColor.text}`}>
                        {project.category === 'personal' ? 'Personnel' : 'Scolaire'}
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {project.title}
                </h1>
                <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
                    {project.description}
                </p>

                <div className="flex gap-4 mt-8">
                    {project.repoLink && (
                        <a href={project.repoLink} target="_blank" rel="noreferrer" className="glass hover:bg-white/10 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            Code Source
                        </a>
                    )}
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noreferrer" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            Live Demo
                        </a>
                    )}
                </div>
            </header>

            {/* Content Body */}
            <div className="max-w-4xl">
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-white/5 rounded w-3/4"></div>
                        <div className="h-4 bg-white/5 rounded w-full"></div>
                        <div className="h-4 bg-white/5 rounded w-5/6"></div>
                    </div>
                ) : project.longDescription && markdownContent ? (
                    <MarkdownRenderer content={markdownContent} />
                ) : (
                    <div className="p-8 border border-white/5 rounded-2xl bg-white/5 text-center text-text-muted">
                        Pas de description détaillée disponible pour ce projet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
