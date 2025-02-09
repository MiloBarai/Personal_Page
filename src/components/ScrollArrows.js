import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ScrollArrows = ({ onUpClick, onDownClick, hasNext, hasPrevious }) => {
  const { darkMode } = useTheme();

  const buttonClasses = `absolute left-1/2 transform -translate-x-1/2 p-3 rounded-full transition-colors ${
    darkMode 
      ? 'bg-white/10 hover:bg-[#4ECCA3]/20 text-white hover:text-[#4ECCA3]' 
      : 'bg-black/5 hover:bg-[#2EAF7D]/20 text-gray-600 hover:text-[#2EAF7D]'
  }`;

  return (
    <>
      {hasPrevious && (
        <motion.button
          onClick={onUpClick}
          className={`${buttonClasses} top-8`}
          initial={{ y: 0 }}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
      
      {hasNext && (
        <motion.button
          onClick={onDownClick}
          className={`${buttonClasses} bottom-8`}
          initial={{ y: 0 }}
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown size={24} />
        </motion.button>
      )}
    </>
  );
};

export default ScrollArrows; 