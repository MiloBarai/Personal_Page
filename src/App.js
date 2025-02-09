import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import SectionNavigator from './components/SectionNavigator';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="relative">
        <SectionNavigator />
        <main>
          <HeroSection />
          <ProjectSection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
