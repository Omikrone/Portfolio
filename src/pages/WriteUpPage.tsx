import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { writeups } from '../data/writeups';

const WriteUpPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const writeup = writeups.find(w => w.slug === slug);

    useEffect(() => {
        if (writeup) {
            fetch(writeup.contentFilePath)
                .then(response => response.text())
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Erreur lors du chargement du write-up:', err);
                    setLoading(false);
                });
        }
    }, [writeup]);

    if (!writeup) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Write-up non trouvé</h1>
                    <Link to="/cybersecurity" className="text-primary hover:underline">
                        Retour aux write-ups
                    </Link>
                </div>
            </div>
        );
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Débutant': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Intermédiaire': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Avancé': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen pb-20 animate-fade-in">
            <header className="mb-12 pt-10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-8">
                        <Link
                            to="/cybersecurity"
                            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium"
                        >
                            <span>←</span> Retour aux write-ups
                        </Link>
                    </div>

                    <div className="glass-card rounded-3xl p-8 mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {writeup.categories.map(cat => (
                                <span key={cat} className="text-sm font-mono bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full">
                                    {cat}
                                </span>
                            ))}
                            <span className={`text-sm font-bold px-3 py-1 rounded-full border ${getDifficultyColor(writeup.difficulty)}`}>
                                {writeup.difficulty}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {writeup.title}
                        </h1>

                        <p className="text-text-muted text-lg mb-6">
                            {writeup.description}
                        </p>

                        <div className="flex flex-wrap gap-4 items-center text-sm text-text-muted">
                            <div className="flex items-center gap-2">
                                <span>📅</span>
                                <span>{new Date(writeup.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>🏆</span>
                                <span>{writeup.eventId}</span>
                                {writeup.points && (
                                    <span className="font-bold text-secondary">
                                        • {writeup.points} points
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-text-muted">Chargement du write-up...</p>
                    </div>
                ) : (
                    <div className="glass-card rounded-3xl p-8">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-2xl md:text-3xl font-bold mb-6 mt-8 pb-3 border-b border-white/10 text-white">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-white">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 text-white">
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p className="leading-relaxed text-text-muted mb-4 text-base">
                                        {children}
                                    </p>
                                ),
                                code: ({ className, children }) => {
                                    const isInline = !className;
                                    if (isInline) {
                                        return (
                                            <code className="bg-white/5 text-accent px-1.5 py-0.5 rounded text-sm font-mono border border-white/10">
                                                {children}
                                            </code>
                                        );
                                    }
                                    return (
                                        <code className={className}>
                                            {children}
                                        </code>
                                    );
                                },
                                pre: ({ children }) => (
                                    <pre className="bg-[#0d1117] text-slate-100 p-4 rounded-lg overflow-x-auto mb-6 border border-white/10">
                                        {children}
                                    </pre>
                                ),
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary underline hover:text-secondary transition-colors"
                                    >
                                        {children}
                                    </a>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside mb-4 space-y-1 text-text-muted">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside mb-4 space-y-1 text-text-muted">
                                        {children}
                                    </ol>
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WriteUpPage;