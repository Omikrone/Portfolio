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
        <div className="animate-fade-in pb-12 md:pb-20">
            <section className="mb-8 md:mb-16">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Profil
                </h1>
                <p className="text-base md:text-xl text-text-muted max-w-3xl leading-relaxed">
                    Développeur passionné avec 7 ans d'expérience en programmation, je me spécialise 
                    dans l'intelligence artificielle et la cybersécurité.
                </p>
            </section>

            <section className="mb-12 md:mb-20">
                <div className="glass-card rounded-3xl p-6 md:p-8 lg:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img src="/assets/profile/portrait.jpg" alt="Portrait de Roman Nitzsche" loading="lazy" decoding="async" width={128} height={128} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-grow">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Roman Nitzsche</h2>
                            <p className="text-text-muted leading-relaxed mb-6">
                                Étudiant en BUT Informatique à l'IUT d'Illkirch, je me passionne pour le développement
                                de projets innovants mêlant programmation bas-niveau et intelligence artificielle.
                                Mon parcours franco-allemand m'a apporté une ouverture d'esprit et une rigueur
                                que j'applique dans chacun de mes projets.
                            </p>
                            <p className="text-text-muted leading-relaxed mb-6">
                                Avec 7 ans d'expérience en programmation, mes centres d'intérêt tournent principalement 
                                autour de l'<span className="text-white font-medium">intelligence artificielle</span> et 
                                de la <span className="text-white font-medium">cybersécurité</span>, deux domaines 
                                complémentaires qui me permettent d'explorer la technologie sous différents angles.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
                                <div className="text-center p-3 md:p-4 rounded-xl bg-white/5">
                                    <div className="text-xl md:text-2xl font-bold text-primary">7</div>
                                    <div className="text-[10px] md:text-xs text-text-muted">Années de pratique</div>
                                </div>
                                <div className="text-center p-3 md:p-4 rounded-xl bg-white/5">
                                    <div className="text-xl md:text-2xl font-bold text-primary">8</div>
                                    <div className="text-[10px] md:text-xs text-text-muted">Langages de programmation</div>
                                </div>
                                <div className="text-center p-3 md:p-4 rounded-xl bg-white/5">
                                    <div className="text-xl md:text-2xl font-bold text-primary">IA & Cyber</div>
                                    <div className="text-[10px] md:text-xs text-text-muted">Intérêts</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-white/5">
                                    <div className="text-2xl font-bold text-primary">🇫🇷🇩🇪</div>
                                    <div className="text-xs text-text-muted">Franco-Allemand</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-20 space-y-12">
                <div className="glass-card rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="text-2xl">🌍</span> Langues
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🇫🇷</span>
                                <h4 className="font-semibold text-white">Français</h4>
                            </div>
                            <p className="text-sm text-text-muted">Langue maternelle</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🇩🇪</span>
                                <h4 className="font-semibold text-white">Allemand</h4>
                            </div>
                            <p className="text-sm text-text-muted">Langue paternelle</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🇬🇧</span>
                                <h4 className="font-semibold text-white">Anglais</h4>
                            </div>
                            <p className="text-sm text-text-muted">Maîtrise fluide</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">🇨🇳</span>
                                <h4 className="font-semibold text-white">Chinois</h4>
                            </div>
                            <p className="text-sm text-text-muted">En apprentissage</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="text-2xl">💻</span> Stack Technique
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Langages de Programmation</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Python', 'C/C++', 'TypeScript', 'JavaScript', 'Java', 'C#', 'Bash', 'PHP', 'SQL'].map((lang) => (
                                    <span key={lang} className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-white text-sm font-medium">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-3">Frameworks & Libraries</h4>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Angular', 'Laravel', 'Express', 'Next.js', 'React Native'].map((framework) => (
                                    <span key={framework} className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/30 text-white text-sm font-medium">
                                        {framework}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-3">Outils & Environnement</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Docker', 'Git', 'Figma', 'Linux', 'VS Code'].map((tool) => (
                                    <span key={tool} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-text-muted text-sm font-medium">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-10">Mon parcours</h2>

                <div className="relative">
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20" />

                    <div className="space-y-8">
                        {timeline.map((item, index) => (
                            <div key={index} className="relative pl-12 md:pl-20">
                                <div className={`absolute left-2 md:left-6 w-4 h-4 rounded-full border-2 ${item.type === 'work'
                                        ? 'bg-secondary border-secondary'
                                        : 'bg-primary border-primary'
                                    }`} />

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
                        <a
                            href="/assets/profile/cv.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Voir mon CV
                        </a>
                        <a
                            href="/assets/profile/cv.pdf"
                            download="CV_Roman_Nitzsche.pdf"
                            className="glass hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Télécharger CV
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
