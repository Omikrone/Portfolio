import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';

const Home: React.FC = () => {
    // Get top 3 featured projects
    const featuredProjects = projectsData
        .filter(project => project.featured)
        .slice(0, 3);

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <Hero />

            {/* Featured Projects Section */}
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

            {/* Skills Section */}
            <Skills />
        </div>
    );
};

export default Home;
