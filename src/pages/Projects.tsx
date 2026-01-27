import React, { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { getProjectTypeColor, getLanguageColor, getCategoryColor } from '../utils/tagColors';

const Projects: React.FC = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'personal' | 'school'>('all');

    // Extract unique values for filters
    const allTypes = useMemo(() =>
        Array.from(new Set(projectsData.map(p => p.type))).sort(),
        []
    );
    const allLanguages = useMemo(() =>
        Array.from(new Set(projectsData.flatMap(p => p.languages))).sort(),
        []
    );

    // Toggle filter selection
    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleLanguage = (lang: string) => {
        setSelectedLanguages(prev =>
            prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
        );
    };

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projectsData.filter(project => {
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(project.type);
            const matchesLanguage = selectedLanguages.length === 0 ||
                project.languages.some(lang => selectedLanguages.includes(lang));
            const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

            return matchesType && matchesLanguage && matchesCategory;
        });
    }, [selectedTypes, selectedLanguages, selectedCategory]);

    // Clear all filters
    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedLanguages([]);
        setSelectedCategory('all');
    };

    const hasActiveFilters = selectedTypes.length > 0 || selectedLanguages.length > 0 || selectedCategory !== 'all';

    return (
        <div className="min-h-screen pb-20 animate-fade-in">
            <header className="mb-12 pt-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Projets</h1>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Explorez mes réalisations en développement logiciel, intelligence artificielle et sécurité informatique.
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="glass-card rounded-2xl p-6 space-y-6">
                    {/* Category Filter */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wide">Catégorie</h3>
                        <div className="flex flex-wrap gap-2">
                            {['all', 'personal', 'school'].map((cat) => {
                                const isSelected = selectedCategory === cat;
                                const categoryColor = cat !== 'all' ? getCategoryColor(cat) : null;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat as any)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected && categoryColor
                                                ? `${categoryColor.bg} ${categoryColor.border} ${categoryColor.text}`
                                                : isSelected
                                                    ? 'bg-white text-black border-white'
                                                    : 'bg-background/50 text-text-muted border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        {cat === 'all' ? 'Tous' : cat === 'school' ? 'Scolaire' : 'Personnel'}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wide">Type de projet</h3>
                        <div className="flex flex-wrap gap-2">
                            {allTypes.map((type) => {
                                const isSelected = selectedTypes.includes(type);
                                const typeColor = getProjectTypeColor(type);
                                return (
                                    <button
                                        key={type}
                                        onClick={() => toggleType(type)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                                                ? `${typeColor.bg} ${typeColor.border} ${typeColor.text}`
                                                : 'bg-background/50 text-text-muted border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Language Filter */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wide">Langage</h3>
                        <div className="flex flex-wrap gap-2">
                            {allLanguages.map((lang) => {
                                const isSelected = selectedLanguages.includes(lang);
                                const langColor = getLanguageColor(lang);
                                return (
                                    <button
                                        key={lang}
                                        onClick={() => toggleLanguage(lang)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                                                ? `${langColor.bg} ${langColor.border} ${langColor.text}`
                                                : 'bg-background/50 text-text-muted border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {hasActiveFilters && (
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-sm text-text-muted">
                                {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
                            </span>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-primary hover:text-white transition-colors"
                            >
                                Effacer les filtres
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-text-muted">
                    <p className="text-lg mb-2">Aucun projet trouvé</p>
                    <p className="text-sm">Essayez de modifier vos filtres</p>
                </div>
            )}
        </div>
    );
};

export default Projects;
