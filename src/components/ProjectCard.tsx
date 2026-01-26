import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group">
      {/* Image Area */}
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10" />
        <img
          src={project.imageUrl || `https://placehold.co/600x400/png?text=${project.title}`}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col relative z-20">
        <div className="flex gap-2 mb-3 flex-wrap">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-primary">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-text-muted text-sm mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {project.longDescription ? (
            <Link to={`/projects/${project.slug}`} className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center gap-1">
              Lire le rapport <span>→</span>
            </Link>
          ) : (
            <span className="text-xs text-text-muted italic">Pas de rapport détaillé</span>
          )}

          <div className="flex gap-3">
            {project.repoLink && (
              <a href={project.repoLink} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" title="Code Source">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            )}
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" title="Live Demo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
