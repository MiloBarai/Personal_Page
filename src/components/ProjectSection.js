import { motion } from 'framer-motion';
import { useMagneticHover } from '../hooks/useMagneticHover';
import { useTheme } from '../context/ThemeContext';
import ScrollArrow from './ScrollArrow';
import { useNextSection } from '../hooks/useNextSection';

const ProjectCard = ({ title, description, image, technologies, link }) => {
  const { darkMode } = useTheme();
  const projectButtonRef = useMagneticHover(0.3);

  return (
    <motion.div
      className={`relative w-full max-w-md rounded-xl overflow-hidden transition-all duration-300 ${
        darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
      }`}
      variants={{
        hidden: { 
          opacity: 0,
          x: -50,
          filter: 'blur(10px)'
        },
        visible: { 
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.1
          }
        }
      }}
    >
      <div className="p-5 h-full">
        <motion.div 
          className="w-full h-48 rounded-lg mb-4 overflow-hidden"
          variants={{
            hidden: { scaleX: 0 },
            visible: { 
              scaleX: 1,
              transition: { duration: 0.5 }
            }
          }}
        >
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            variants={{
              hidden: { scale: 1.5, opacity: 0 },
              visible: { 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.4 }
              }
            }}
          />
        </motion.div>
        <motion.h3 
          className={`text-xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4 }
            }
          }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className={`mb-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { duration: 0.4 }
            }
          }}
        >
          {description}
        </motion.p>
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4 }
            }
          }}
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode 
                  ? 'bg-[#4ECCA3]/20 text-[#4ECCA3]' 
                  : 'bg-[#2EAF7D]/20 text-[#2EAF7D]'
              }`}
              variants={{
                hidden: { scale: 0 },
                visible: { 
                  scale: 1,
                  transition: { duration: 0.2 }
                }
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.4 }
            }
          }}
        >
          <motion.a
            ref={projectButtonRef}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-white/10 hover:bg-[#4ECCA3]/20 text-white hover:text-[#4ECCA3] ring-1 ring-white/20 hover:ring-[#4ECCA3]/50' 
                : 'bg-black/5 hover:bg-[#2EAF7D]/20 text-gray-600 hover:text-[#2EAF7D] ring-1 ring-black/10 hover:ring-[#2EAF7D]/50'
            }`}
          >
            View Project
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectRow = ({ projects, rowIndex }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true,
        amount: 0.2 // Trigger when 20% of the element is in view
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3,
            delayChildren: rowIndex * 0.2
          }
        }
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard 
          key={index} 
          {...project} 
        />
      ))}
    </motion.div>
  );
};

const ProjectSection = () => {
  const { darkMode } = useTheme();
  const { hasNext, hasPrevious, scrollToNext, scrollToPrevious } = useNextSection('projects-section');

  const allProjects = [
    {
      title: "Project 1",
      description: "A brief description of your first project and what it does.",
      image: "path/to/image1.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/MiloBarai/project1"
    },
    {
      title: "Project 2",
      description: "Description of your second project with its key features.",
      image: "path/to/image2.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://github.com/MiloBarai/project2"
    },
    // Add more projects as needed
  ];

  // Split projects into rows of 3 (or 2 for medium screens)
  const projectRows = [];
  for (let i = 0; i < allProjects.length; i += 3) {
    projectRows.push(allProjects.slice(i, i + 3));
  }

  return (
    <section id="projects-section" className={`relative min-h-screen py-20 transition-colors duration-300 ${
      darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ 
            once: true,
            amount: 0.5 // Trigger when 50% of the element is in view
          }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          My Projects
        </motion.h2>
        <div className="space-y-16">
          {projectRows.map((rowProjects, index) => (
            <ProjectRow 
              key={index}
              projects={rowProjects}
              rowIndex={index}
            />
          ))}
        </div>
      </div>
      
      <ScrollArrow 
        onClick={scrollToNext}
        hasNext={hasNext}
      />
    </section>
  );
};

export default ProjectSection; 