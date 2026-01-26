import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col h-full group">
      
      {/* Link overlay */}
      <Link
        to={`/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Voir le détail du projet ${project.title}`}
      />

      {/* Image */}
      <div className="h-48 overflow-hidden bg-gray-200 relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-20">
        <h3 className="text-lg font-bold text-primary mb-2">
          {project.title}
        </h3>
        <p className="text-secondary text-sm mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto relative z-30">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 text-center py-2 px-3 bg-primary text-white rounded-md text-sm font-medium hover:bg-slate-800 transition"
            >
              Voir la démo
            </a>
          )}
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center py-2 px-3 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition"
          >
            Code Source
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
