import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import WriteUpCard from '../components/WriteUpCard';
import { getAllCategories, getSortedWriteUps } from '../data/writeups';
import { getEventById } from '../data/events';

const Cybersecurity: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const allCategories = getAllCategories();

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const filteredWriteUps = useMemo(() => {
        const sorted = getSortedWriteUps();
        if (selectedCategories.length === 0) return sorted;
        
        return sorted.filter(writeup =>
            writeup.categories.some(cat => selectedCategories.includes(cat))
        );
    }, [selectedCategories]);

    const groupedWriteUps = useMemo(() => {
        const groups = new Map<string, typeof filteredWriteUps>();
        const independent: typeof filteredWriteUps = [];

        filteredWriteUps.forEach(writeup => {
            if (writeup.eventId) {
                const key = writeup.eventId;
                if (!groups.has(key)) {
                    groups.set(key, []);
                }
                groups.get(key)!.push(writeup);
            } else {
                independent.push(writeup);
            }
        });

        return { groups: Array.from(groups.entries()), independent };
    }, [filteredWriteUps]);

    const clearFilters = () => {
        setSelectedCategories([]);
    };

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

            <div className="glass-card p-6 rounded-3xl relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-[60px] -mr-10 -mt-10"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#2a2a2a] rounded-full flex items-center justify-center font-bold text-secondary text-xl flex-shrink-0">
                            R
                        </div>
                        <div>
                            <p className="text-sm text-text-muted">Root-Me Profile</p>
                            <p className="font-bold text-lg text-white">Omikrone</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <p className="text-sm text-text-muted mb-1">Score</p>
                            <p className="text-3xl font-bold text-primary">3295 pts</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-text-muted mb-1">Classement mondial</p>
                            <p className="text-xl font-bold text-secondary">2924ème</p>
                        </div>
                    </div>

                    <a
                        href="https://www.root-me.org/Omikrone"
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-lg border border-secondary/50 text-secondary hover:bg-secondary hover:text-white transition-all font-medium text-sm whitespace-nowrap"
                    >
                        Voir le profil →
                    </a>
                </div>
            </div>

            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -ml-20 -mt-20"></div>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                        <span className="text-primary">📝</span> Write-ups
                    </h3>
                    <span className="text-text-muted text-sm">
                        {filteredWriteUps.length} article{filteredWriteUps.length !== 1 ? 's' : ''}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-text-muted text-sm self-center mr-2">Filtrer :</span>
                    {allCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                selectedCategories.includes(category)
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-background/50 text-text-muted border-white/10 hover:border-white/30'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                    {selectedCategories.length > 0 && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 rounded-lg text-sm font-medium border border-white/10 hover:border-white/30 text-text-muted hover:text-white"
                        >
                            Effacer
                        </button>
                    )}
                </div>

                <div className="space-y-8">
                    {groupedWriteUps.groups.map(([eventId, writeups]) => {
                        const event = getEventById(eventId);
                        if (!event) return null;
                        
                        return (
                            <div key={eventId}>
                                <div className="mb-4 pb-4 border-b border-white/10">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">{event.name}</h4>
                                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                                <span className="text-text-muted">
                                                    Équipe: {event.teamName}
                                                </span>
                                                <span className="text-secondary font-semibold">
                                                    🏆 {event.rank}
                                                </span>
                                                <span className="text-text-muted">
                                                    {event.score}
                                                </span>
                                            </div>
                                        </div>
                                        {event.resultsUrl && (
                                            <a
                                                href={event.resultsUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm text-primary hover:text-secondary transition-colors flex items-center gap-1"
                                            >
                                                Voir les résultats →
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {writeups.map(writeup => (
                                        <WriteUpCard key={writeup.id} writeup={writeup} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {groupedWriteUps.independent.length > 0 && (
                        <div>
                            <div className="mb-4 pb-4 border-b border-white/10">
                                <h4 className="text-xl font-bold text-white">Write-ups indépendants</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {groupedWriteUps.independent.map(writeup => (
                                    <WriteUpCard key={writeup.id} writeup={writeup} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {filteredWriteUps.length === 0 && (
                    <div className="text-center py-10 text-text-muted">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h4 className="text-lg font-medium mb-2">Aucun write-up trouvé</h4>
                        <p className="text-text-muted text-sm max-w-md mx-auto">
                            Aucun write-up ne correspond aux filtres sélectionnés.
                        </p>
                    </div>
                )}
            </div>

            <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Compétences en sécurité</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {allCategories.map((skill) => (
                        <div
                            key={skill}
                            className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-colors group"
                        >
                            <span className="text-text-muted text-sm group-hover:text-white transition-colors">{skill}</span>
                        </div>
                    ))}
                </div>
            </section>

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