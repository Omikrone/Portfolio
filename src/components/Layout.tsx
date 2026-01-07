import React from 'react';
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header Navbar */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Portfolio</h1>
          <nav className="space-x-6 text-sm font-medium text-secondary">
            <Link to="/" className="hover:text-primary transition">Accueil</Link>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-secondary text-sm border-t">
        <p>© {new Date().getFullYear()} - Développé avec React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Layout;