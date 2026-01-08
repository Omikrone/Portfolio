import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projects";
import MarkdownPage from "../components/MardownPage";
import type { Project } from "../types";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Trouver le projet correspondant au slug
    const foundProject = projectsData.find((p) => p.slug === slug);
    setProject(foundProject || null);

    if (!foundProject) {
      setError("Projet non trouvé");
      setLoading(false);
      return;
    }

    // Charger le contenu Markdown
    fetch(`/content/projects/${slug}.md`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fichier Markdown non trouvé");
        }
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
        <p className="text-secondary mb-6">
          {error || "Ce projet n'existe pas ou a été déplacé."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-slate-800 transition"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* En-tête du projet */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-secondary hover:text-primary mb-6 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux projets
        </Link>

        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          {project.title}
        </h1>

        <p className="text-lg text-secondary mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Liens du projet */}
        <div className="flex flex-wrap gap-4 mb-10">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 bg-primary text-white rounded-lg hover:bg-slate-800 transition font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Voir la démo
            </a>
          )}
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code Source
          </a>
        </div>
      </div>

      {/* Contenu Markdown */}
      <div className="prose prose-lg max-w-none">
        <MarkdownPage content={content} />
      </div>

      {/* Section de navigation */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-slate-800 font-medium transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voir tous les projets
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;