import { motion, useAnimationControls } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [text, setText] = useState("");
  const prefix = "Hello, I'm ";
  const name = "Milo";
  const fullText = prefix + name;
  const controls = useAnimationControls();

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
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#121212] text-white overflow-hidden">
      {/* Gradient Orb Effects */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-[0.05] animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-[0.05] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-[0.05] animate-blob animation-delay-4000" />

      {/* Theme toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-8 right-8 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-300"
      >
        <span className="sr-only">Toggle theme</span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
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
          className="text-7xl font-bold mb-8 tracking-tight"
          style={{ display: 'inline-block' }}
        >
          <span className="text-gray-300">
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="text-xl text-gray-400 mb-8"
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
          <SocialLink href="https://github.com/yourusername" icon={<Github size={24} />} />
          <SocialLink href="https://linkedin.com/in/yourusername" icon={<Linkedin size={24} />} />
          <SocialLink href="mailto:your.email@example.com" icon={<Mail size={24} />} />
        </motion.div>
      </motion.div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
    </section>
  );
};

const SocialLink = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-300 hover:text-[#4ECCA3] text-gray-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);

export default HeroSection; 