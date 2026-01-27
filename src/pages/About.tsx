import React from 'react';

interface TimelineItem {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    type: 'education' | 'work';
}

const timeline: TimelineItem[] = [
    {
        year: '2020 - 2023',
        title: 'BAC Général & Abitur',
        subtitle: 'Lycée International des Pontonniers, Strasbourg',
        description: 'Spécialités Mathématiques et Physique-Chimie. Obtention du BAC français mention Bien et du BAC allemand (Abitur) en parallèle dans le cadre du cursus international franco-allemand.',
        type: 'education'
    },
    {
        year: '2023 - 2026',
        title: 'BUT Informatique',
        subtitle: 'IUT Robert Schuman, Illkirch',
        description: 'Formation en développement logiciel, bases de données, réseaux, algorithmique et intelligence artificielle. Parcours orienté vers le développement d\'applications.',
        type: 'education'
    },
    {
        year: '2025',
        title: 'Stage - Développeur IA',
        subtitle: 'Zen Conseil (2,5 mois)',
        description: 'Développement d\'un chatbot de support technique intelligent basé sur la technique RAG (Retrieval-Augmented Generation) pour le support technique. Utilisation de Python, FAISS et des modèles de langage.',
        type: 'work'
    },
    {
        year: '2025 - 2026',
        title: 'Alternance - Développeur',
        subtitle: 'Cabinet d\'étude de la qualité de l\'air',
        description: 'Développement d\'interfaces web pour afficher et manier les résultats d\'études de la qualité de l\'air. Programmation embarquée pour ajouter des fonctionnalités aux capteurs.',
        type: 'work'
    }
];

const About: React.FC = () => {
    return (
        <div className="animate-fade-in pb-20">
            {/* Hero Section */}
            <section className="mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    À propos
                </h1>
                <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
                    Passionné par l'informatique et l'intelligence artificielle, je suis un développeur
                    en formation avec un intérêt particulier pour les systèmes complexes,
                    l'algorithmique et le machine learning.
                </p>
            </section>

            {/* About Me Card */}
            <section className="mb-20">
                <div className="glass-card rounded-3xl p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar/Icon */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl md:text-5xl">👨‍💻</span>
                        </div>

                        <div className="flex-grow">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Roman</h2>
                            <p className="text-text-muted leading-relaxed mb-6">
                                Étudiant en BUT Informatique à l'IUT d'Illkirch, je me passionne pour le développement
                                de projets innovants mêlant programmation bas-niveau et intelligence artificielle.
                                Mon parcours franco-allemand m'a apporté une ouverture d'esprit et une rigueur
                                que j'applique dans chacun de mes projets.
                            </p>
                            <p className="text-text-muted leading-relaxed">
                                Mes domaines de prédilection incluent le <span className="text-white font-medium">C++</span> pour
                                les performances, <span className="text-white font-medium">Python</span> pour l'IA et le prototypage,
                                ainsi que les technologies web modernes comme <span className="text-white font-medium">React</span> et <span className="text-white font-medium">TypeScript</span>.
                            </p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-bold text-primary">3+</div>
                                    <div className="text-xs text-text-muted">Années de code</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-bold text-primary">5+</div>
                                    <div className="text-xs text-text-muted">Langages</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-bold text-primary">IA</div>
                                    <div className="text-xs text-text-muted">Spécialité</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-bold text-primary">🇫🇷🇩🇪</div>
                                    <div className="text-xs text-text-muted">Bilingue</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section>
                <h2 className="text-3xl font-bold mb-10">Mon parcours</h2>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20" />

                    {/* Timeline Items */}
                    <div className="space-y-8">
                        {timeline.map((item, index) => (
                            <div key={index} className="relative pl-12 md:pl-20">
                                {/* Timeline Dot */}
                                <div className={`absolute left-2 md:left-6 w-4 h-4 rounded-full border-2 ${item.type === 'work'
                                        ? 'bg-secondary border-secondary'
                                        : 'bg-primary border-primary'
                                    }`} />

                                {/* Content Card */}
                                <div className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-colors">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className={`text-xs font-mono px-3 py-1 rounded ${item.type === 'work'
                                                ? 'bg-secondary/20 text-secondary border border-secondary/30'
                                                : 'bg-primary/20 text-primary border border-primary/30'
                                            }`}>
                                            {item.year}
                                        </span>
                                        <span className={`text-xs font-mono px-2 py-1 rounded ${item.type === 'work'
                                                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            }`}>
                                            {item.type === 'work' ? '💼 Expérience' : '🎓 Formation'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                    <p className="text-primary text-sm mb-3">{item.subtitle}</p>
                                    <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="mt-20 text-center">
                <div className="glass-card rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Envie de collaborer ?</h2>
                    <p className="text-text-muted mb-8 max-w-xl mx-auto">
                        Je suis toujours ouvert aux nouvelles opportunités et aux projets intéressants.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://github.com/Omikrone"
                            target="_blank"
                            rel="noreferrer"
                            className="glass hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/roman-nitzsche-63b548306/"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
