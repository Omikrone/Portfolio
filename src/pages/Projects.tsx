import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';

const Projects: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'personal' | 'school'>('all');

    const filteredProjects = projectsData.filter(project =>
        filter === 'all' ? true : project.category === filter
    );

    return (
        <div className="min-h-screen pb-20 animate-fade-in">
            <header className="mb-16 pt-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Projets</h1>
                <p className="text-text-muted max-w-2xl mx-auto">
                    Explorez mes réalisations en développement logiciel, intelligence artificielle et sécurité informatique.
                </p>

                {/* Filter Controls */}
                <div className="flex justify-center gap-2 mt-8">
                    {['all', 'personal', 'school'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all capitalize border ${filter === f
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-text-muted border-white/10 hover:border-white/30'
                                }`}
                        >
                            {f === 'all' ? 'Tous' : f === 'school' ? 'Scolaire' : 'Personnel'}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-text-muted">
                    Aucun projet trouvé dans cette catégorie pour le moment.
                </div>
            )}
        </div>
    );
};

export default Projects;
