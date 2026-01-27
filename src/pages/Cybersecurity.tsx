import React from 'react';
import { Link } from 'react-router-dom';

const Cybersecurity: React.FC = () => {
    return (
        <div className="min-h-screen pb-20 animate-fade-in">
            <header className="mb-12 pt-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-secondary">#</span> Cybersécurité
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Mon parcours dans la sécurité informatique, mes scores CTF et mes write-ups.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* RootMe Stats Card */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden group lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-[60px] -mr-10 -mt-10"></div>

                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="text-secondary">R</span> Root-Me
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

                        <a
                            href="https://www.root-me.org/Omikrone"
                            target="_blank"
                            rel="noreferrer"
                            className="block text-center w-full py-3 rounded-lg border border-secondary/50 text-secondary hover:bg-secondary hover:text-white transition-all font-medium text-sm"
                        >
                            Voir le profil Root-Me
                        </a>
                    </div>
                </div>

                {/* Write-ups Section */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden lg:col-span-2">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -ml-20 -mt-20"></div>

                    <h3 className="text-2xl font-bold mb-6">
                        <span className="text-primary">📝</span> Write-ups
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-surface/30 rounded-xl p-6 border border-white/5 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <h4 className="text-lg font-medium mb-2">Bientôt disponible</h4>
                            <p className="text-text-muted text-sm max-w-md mx-auto">
                                Je travaille actuellement sur des write-ups détaillés de mes challenges CTF préférés.
                                Revenez bientôt pour découvrir mes analyses et solutions!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills in Security */}
            <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Compétences en sécurité</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Web Security', 'Cryptographie', 'Reverse Engineering', 'Network Security', 'Forensics', 'Steganography', 'SQLi / XSS', 'Binary Exploitation'].map((skill) => (
                        <div
                            key={skill}
                            className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-colors"
                        >
                            <span className="text-text-muted text-sm">{skill}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Back to Projects */}
            <div className="mt-12 text-center">
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium"
                >
                    <span>←</span> Retour aux projets
                </Link>
            </div>
        </div>
    );
};

export default Cybersecurity;
