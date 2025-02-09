import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8 dark:text-white">Contact</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Get in touch with me
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; 