import { motion } from 'framer-motion';

const SkillsSection = () => {
  return (
    <section className="min-h-screen py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8 dark:text-white">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Add your skills here */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection; 