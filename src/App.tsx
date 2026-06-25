import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Cybersecurity = lazy(() => import('./pages/Cybersecurity'));
const WriteUpPage = lazy(() => import('./pages/WriteUpPage'));

const basename = "/";

const PageFallback = () => (
  <output className="flex justify-center items-center min-h-[50vh]" aria-label="Chargement">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </output>
);

function App() {
  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="about" element={<About />} />
            <Route path="cybersecurity" element={<Cybersecurity />} />
            <Route path="cybersecurity/writeups/:slug" element={<WriteUpPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
