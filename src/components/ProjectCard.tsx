import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { getProjectTypeColor, getLanguageColor, getCategoryColor } from '../utils/tagColors';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const typeColor = getProjectTypeColor(project.type);
  const categoryColor = getCategoryColor(project.category);

  const formatProjectDate = () => {
    if (!project.endYear || project.startYear === project.endYear) {
      return project.startYear.toString();
    }
    return `${project.startYear} — ${project.endYear}`;
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
      {/* Image Area */}
      <Link to={`/projects/${project.slug}`} className="h-48 overflow-hidden relative block">

        {/* Badge de Date en haut à droite */}
        <div className="absolute top-3 right-3 z-30">
          <span className="bg-background/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10 shadow-lg">
            {formatProjectDate()}
          </span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10" />
        <img
          src={project.imageUrl || `https://placehold.co/600x400/png?text=${project.title}`}
          alt={`Aperçu du projet ${project.title}`}
          loading="lazy"
          decoding="async"
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col relative z-20">
        <div className="flex gap-2 mb-3 flex-wrap">

          {/* Type Tag */}
          <span className={`text-xs font-mono ${typeColor.bg} border ${typeColor.border} px-2 py-1 rounded ${typeColor.text}`}>
            {project.type}
          </span>

          {/* Language Tags */}
          {project.languages.map(lang => {
            const langColor = getLanguageColor(lang);
            return (
              <span key={lang} className={`text-xs font-mono ${langColor.bg} border ${langColor.border} px-2 py-1 rounded ${langColor.text}`}>
                {lang}
              </span>
            );
          })}

          {/* Context Tag */}
          <span className={`text-xs font-mono ${categoryColor.bg} border ${categoryColor.border} px-2 py-1 rounded ${categoryColor.text}`}>
            {project.category === 'personal' ? 'Personnel' : 'Scolaire'}
          </span>
        </div>

        <Link to={`/projects/${project.slug}`} className="block flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-text-muted text-sm mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="mb-6">
            {project.longDescription ? (
              <span className="text-sm font-medium text-white group-hover:text-primary transition-colors flex items-center gap-1">
                Voir les détails <span>→</span>
              </span>
            ) : (
              <span className="text-sm font-medium text-white group-hover:text-primary transition-colors flex items-center gap-1">
                Voir le projet <span>→</span>
              </span>
            )}
          </div>
        </Link>

        <div className="flex items-center justify-end mt-auto gap-3">
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
                title="Code Source"
                aria-label={`Code source du projet ${project.title} (nouvel onglet)`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm"
                title="Live Demo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Démo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

export default ProjectCard;
