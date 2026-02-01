import React from 'react';
import { Link } from 'react-router-dom';
import type { WriteUp } from '../types';
import { getEventById } from '../data/events';

interface WriteUpCardProps {
    writeup: WriteUp;
}

const WriteUpCard: React.FC<WriteUpCardProps> = ({ writeup }) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Débutant': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Intermédiaire': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Avancé': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const event = writeup.eventId ? getEventById(writeup.eventId) : null;

    return (
        <Link
            to={`/cybersecurity/writeups/${writeup.slug}`}
            className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group block hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
        >
            {/* Image Area */}
            <div className="h-48 overflow-hidden relative">
                <div className="absolute top-3 left-3 z-30">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getDifficultyColor(writeup.difficulty)}`}>
                        {writeup.difficulty}
                    </span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10" />
                <img
                    src={writeup.imageUrl || `https://placehold.co/600x400/1a1a2e/0abde3/png?text=${writeup.title}`}
                    alt={writeup.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col">
                {/* Categories */}
                <div className="flex gap-2 mb-3 flex-wrap">
                    {writeup.categories.map(cat => (
                        <span key={cat} className="text-xs font-mono bg-primary/10 border border-primary/30 text-primary px-2 py-1 rounded">
                            {cat}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {writeup.title}
                </h3>

                <p className="text-text-muted text-sm mb-4 flex-grow">
                    {writeup.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {event && (
                                <span className="text-text-muted text-sm">{event.name}</span>
                            )}
                            {writeup.points && (
                                <span className="text-xs font-bold bg-secondary/20 text-secondary px-2 py-1 rounded">
                                    {writeup.points} pts
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-text-muted text-sm">
                        {formatDate(writeup.date)}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WriteUpCard;