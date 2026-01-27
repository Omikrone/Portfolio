import React from 'react';
import { Link } from 'react-router-dom';

const Skills: React.FC = () => {
    const skills = [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
        { category: "Backend", items: ["Node.js", "Python", "PHP/Symfony", "SQL"] },
        { category: "System & Tools", items: ["Linux", "Git", "Docker", "Bash"] },
        { category: "Security", items: ["CTF", "RootMe", "Network Security"] },
    ];

    return (
        <section className="py-20">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Mon expertise technique</h2>
                        <p className="text-text-muted">
                            Une formation solide en informatique (BUT) complétée par une passion autodidacte pour l'IA et la sécurité.
                        </p>
                    </div>
                    <Link
                        to="/cybersecurity"
                        className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm font-medium group"
                    >
                        <span className="text-secondary">#</span> Voir mon profil Cybersécurité
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skills.map((skillGroup) => (
                        <div key={skillGroup.category} className="glass-card p-6 rounded-xl">
                            <h4 className="font-medium text-white mb-4 text-sm uppercase tracking-wide opacity-80">{skillGroup.category}</h4>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item) => (
                                    <span key={item} className="text-sm bg-white/5 px-3 py-1.5 rounded-lg text-text-muted border border-white/5 hover:border-white/20 transition-colors">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

