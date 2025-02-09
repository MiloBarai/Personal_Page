import { motion, useAnimationControls } from 'framer-motion';
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMagneticHover } from '../hooks/useMagneticHover';
import CursorTrail from './CursorTrail';

const HeroSection = () => {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });
  const prefix = "Hello, I'm ";
  const name = "Milo";
  const fullText = prefix + name;
  const controls = useAnimationControls();

  const themeButtonRef = useMagneticHover(0.3);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setText(currentText);
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        controls.start({
          backgroundPosition: ["0%", "100%"],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
        });
      }
    };

    setTimeout(() => {
      typeText();
    }, 500);
  }, [controls, fullText]);

  return (
    <section className={`relative min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#0a0a0a]' 
        : 'bg-gray-50'
    }`}>
      <CursorTrail />
      {/* Add blur overlay */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-black/10' 
          : 'bg-white/10'
      }`} />

      {/* Theme toggle */}
      <motion.button
        ref={themeButtonRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-8 right-8 p-2 rounded-full transition-colors duration-300 z-10 ${
          darkMode 
            ? 'bg-white/10 hover:bg-[#4ECCA3]/20 text-white hover:text-[#4ECCA3] ring-1 ring-white/20 hover:ring-[#4ECCA3]/50' 
            : 'bg-black/5 hover:bg-[#2EAF7D]/20 text-gray-600 hover:text-[#2EAF7D] ring-1 ring-black/10 hover:ring-[#2EAF7D]/50'
        }`}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4"
      >
        <motion.h1 
          animate={controls}
          className="text-7xl font-bold tracking-tight"
          style={{ display: 'inline-block' }}
        >
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            {text.slice(0, prefix.length)}
          </span>
          <span className="bg-gradient-to-r from-[#4ECCA3] via-[#2EAF7D] to-[#45B08C] text-transparent bg-clip-text bg-[size:200%] px-2">
            {text.slice(prefix.length)}
          </span>
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="ml-1 inline-block bg-gradient-to-r from-[#4ECCA3] via-[#2EAF7D] to-[#45B08C] text-transparent bg-clip-text"
          >
            |
          </motion.span>
        </motion.h1>

        {/* Reflection */}
        <div className="reflection-container">
          <motion.h1 
            animate={controls}
            className="text-7xl font-bold tracking-tight reflection"
            style={{ display: 'inline-block' }}
          >
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {text.slice(0, prefix.length)}
            </span>
            <span className="bg-gradient-to-r from-[#4ECCA3] via-[#2EAF7D] to-[#45B08C] text-transparent bg-clip-text bg-[size:200%] px-2">
              {text.slice(prefix.length)}
            </span>
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block bg-gradient-to-r from-[#4ECCA3] via-[#2EAF7D] to-[#45B08C] text-transparent bg-clip-text"
            >
              |
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className={`text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Software Developer
        </motion.p>

        {/* Social links */}
        <motion.div 
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <SocialLink href="https://github.com/MiloBarai" icon={<Github size={24} />} darkMode={darkMode} />
          <SocialLink href="https://linkedin.com/in/milo-barai-3a5262120" icon={<Linkedin size={24} />} darkMode={darkMode} />
          <SocialLink href="mailto:your.email@example.com" icon={<Mail size={24} />} darkMode={darkMode} />
        </motion.div>
      </motion.div>
    </section>
  );
};

const SocialLink = ({ href, icon, darkMode }) => {
  const linkRef = useMagneticHover(0.3);
  
  return (
    <motion.a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 rounded-full transition-colors duration-300 ${
        darkMode 
          ? 'bg-white/10 hover:bg-[#4ECCA3]/20 text-white hover:text-[#4ECCA3] ring-1 ring-white/20 hover:ring-[#4ECCA3]/50' 
          : 'bg-black/5 hover:bg-[#2EAF7D]/20 text-gray-600 hover:text-[#2EAF7D] ring-1 ring-black/10 hover:ring-[#2EAF7D]/50'
      }`}
    >
      {icon}
    </motion.a>
  );
};

export default HeroSection; 