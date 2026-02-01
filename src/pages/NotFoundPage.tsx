import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-secondary mb-6">
        Page non trouvée
      </h2>
      <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-slate-800 transition font-medium"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;