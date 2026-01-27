import React from 'react';

const Skills: React.FC = () => {
    const skills = [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
        { category: "Backend", items: ["Node.js", "Python", "PHP/Symfony", "SQL"] },
        { category: "System & Tools", items: ["Linux", "Git", "Docker", "Bash"] },
        { category: "Security", items: ["CTF", "RootMe", "Network Security"] },
    ];

    return (
        <section className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* RootMe Badge / Stats */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-[60px] -mr-10 -mt-10"></div>

                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="text-secondary">#</span> Cybersecurity
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center font-bold text-secondary text-xl">
                                R
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">RootMe Profile</p>
                                <p className="font-bold text-lg text-white">Omikrone</p>
                            </div>
                        </div>

                        <div className="bg-surface/50 rounded-xl p-4 border border-white/5">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-text-muted text-sm">Score</span>
                                <span className="text-2xl font-bold text-primary">3000+ pts</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-secondary to-primary w-[75%] h-full rounded-full"></div>
                            </div>
                            <p className="text-xs text-text-muted mt-2 text-right">Top 1% Global Rank</p>
                        </div>

                        <a href="https://www.root-me.org/Omikrone" target="_blank" rel="noreferrer" className="block text-center w-full py-2 rounded-lg border border-secondary/50 text-secondary hover:bg-secondary hover:text-white transition-all font-medium text-sm">
                            View Profile
                        </a>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Mon expertise technique</h2>
                        <p className="text-text-muted">
                            Une formation solide en informatique (BUT) complétée par une passion autodidacte pour l'IA et la sécurité.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {skills.map((skillGroup) => (
                            <div key={skillGroup.category} className="glass p-4 rounded-xl">
                                <h4 className="font-medium text-white mb-3 text-sm uppercase tracking-wide opacity-80">{skillGroup.category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((item) => (
                                        <span key={item} className="text-sm bg-white/5 px-2 py-1 rounded text-text-muted border border-white/5">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;
