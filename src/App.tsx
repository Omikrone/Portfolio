import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Cybersecurity from './pages/Cybersecurity';
import WriteUpPage from './pages/WriteUpPage';

const basename = "/";

function App() {
  return (
    <BrowserRouter basename={basename}>
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
    </BrowserRouter>
  );
}

export default App;