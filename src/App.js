import { useState } from 'react';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import CursorTrail from './components/CursorTrail';
import './App.css';

function App() {
  const [darkMode] = useState(true);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <CursorTrail />
      <main>
        <HeroSection />
        <ProjectSection darkMode={darkMode} />
      </main>
    </div>
  );
}

export default App;
