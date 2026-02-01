import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center items-start animate-fade-in relative px-4 md:px-0">
            <div className="absolute top-20 right-0 w-48 h-48 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

            <div className="space-y-3 md:space-y-4 max-w-3xl">
                <span className="text-primary font-medium tracking-wider text-xs md:text-sm uppercase glass px-3 py-1 rounded-full inline-block">
                    Bienvenue
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                    Je suis <span className="text-white">Roman</span>, <br />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Étudiant en informatique
                    </span>
                </h1>
                <p className="text-text-muted text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
                    Étudiant en 3ème année de <span className="text-white font-medium">BUT Informatique</span> en alternance.
                    Passionné par l'<span className="text-primary font-medium">Intelligence Artificielle</span> et la <span className="text-secondary font-medium">Cybersécurité</span>.
                    J'explore les technologies de demain.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4">
                    <Link to="/projects" className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] text-center">
                        Voir mes projets
                    </Link>
                    <a href="https://github.com/Omikrone" target="_blank" rel="noreferrer" className="glass hover:bg-white/10 text-white px-6 md:px-8 py-3 rounded-full font-medium transition-all text-center">
                        GitHub
                    </a>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on mobile */}
            <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-text-muted rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
