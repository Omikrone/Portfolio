import React from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Home: React.FC = () => {
  return (
    <div>
       {/* Section Hero : Présentation concise */}
      <section className="mb-16 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold text-primary sm:text-5xl sm:tracking-tight lg:text-6xl">
            Salut, je suis <span className='text-blue-600'>Roman</span>.
        </h1>
        <p className="mt-5 max-w-xl mx-auto sm:mx-0 text-xl text-secondary">
          Étudiant en 3ème année de BUT Informatique. Passionné par le développement fullstack et l'architecture logicielle.
        </p>
        <div className="mt-8 flex justify-center sm:justify-start gap-4">
            <a href="#projets" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-slate-800 transition">
                Voir mes projets
            </a>
            {/* Lien vers ton CV PDF par exemple */}
             <a href="/cv.pdf" target="_blank" className="inline-flex items-center justify-center px-5 py-3 border border-slate-300 shadow-sm text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition">
                Mon CV
            </a>
        </div>
      </section>

      {/* Section Grille de Projets */}
      <section id="projets">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">Réalisations récentes</h2>
            {/* Un petit trait déco */}
            <div className="h-1 flex-grow mx-4 bg-slate-100 rounded ml-8 hidden sm:block"></div>
        </div>
        
        {/* Grille Responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur grand écran */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;