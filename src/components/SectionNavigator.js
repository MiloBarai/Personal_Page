import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Section names configuration
const SECTION_NAMES = {
  'hero-section': 'Home',
  'projects-section': 'Projects',
  // Add more sections as needed
  // 'skills-section': 'Skills',
  // 'contact-section': 'Contact',
};

const SectionNavigator = () => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Get all sections
    const sectionElements = document.querySelectorAll('section');
    setSections(Array.from(sectionElements));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find which section is currently in view
      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    sections[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSectionName = (section, index) => {
    const id = section.id;
    return SECTION_NAMES[id] || `Section ${index + 1}`;
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.button
          key={index}
          className={`w-4 h-4 rounded-full relative group ${
            darkMode ? 'bg-white/10' : 'bg-black/10'
          }`}
          onClick={() => scrollToSection(index)}
          whileHover={{ scale: 1.2 }}
          initial={false}
        >
          <motion.div
            className={`absolute inset-0 rounded-full transition-colors ${
              activeSection === index
                ? darkMode
                  ? 'bg-[#4ECCA3]'
                  : 'bg-[#2EAF7D]'
                : 'bg-transparent'
            }`}
            initial={false}
            animate={{
              scale: activeSection === index ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Label on hover */}
          <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
            darkMode 
              ? 'bg-white/10 text-white' 
              : 'bg-black/10 text-gray-800'
          }`}>
            {getSectionName(section, index)}
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default SectionNavigator; 