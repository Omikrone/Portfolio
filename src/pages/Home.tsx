import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';

const Home: React.FC = () => {
    const featuredProjects = projectsData
        .filter(project => project.featured)
        .slice(0, 3);

    return (
        <div className="space-y-20 pb-20">
            <Hero />

            <section className="animate-fade-in-up delay-200">
                <div className="flex justify-between items-end mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Projets à la une</h2>
                        <p className="text-text-muted">Une sélection de mes travaux les plus récents</p>
                    </div>
                    <Link
                        to="/projects"
                        className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium group"
                    >
                        Voir tous les projets
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div className="mt-8 md:hidden flex justify-center">
                    <Link
                        to="/projects"
                        className="text-primary hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        Voir tous les projets
                        <span>→</span>
                    </Link>
                </div>
            </section>

            <section className="animate-fade-in-up delay-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        to="/projects"
                        className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">💼</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Projets</h3>
                        <p className="text-text-muted text-sm mb-4">
                            Découvrez mes réalisations en développement web, IA, et programmation système
                        </p>
                        <span className="text-primary text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                            Explorer <span>→</span>
                        </span>
                    </Link>

                    <Link
                        to="/cybersecurity"
                        className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🔐</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">Cybersécurité</h3>
                        <p className="text-text-muted text-sm mb-4">
                            Mon profil Root-Me, mes participations aux CTF et mes write-ups détaillés
                        </p>
                        <span className="text-secondary text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                            Découvrir <span>→</span>
                        </span>
                    </Link>

                    <Link
                        to="/about"
                        className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">👨‍💻</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">À propos</h3>
                        <p className="text-text-muted text-sm mb-4">
                            Mon parcours, mes compétences techniques et ma stack complète
                        </p>
                        <span className="text-blue-400 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                            En savoir plus <span>→</span>
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
