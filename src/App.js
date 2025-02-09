import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <main>
        <HeroSection />
        <ProjectSection />
      </main>
    </ThemeProvider>
  );
}

export default App;
