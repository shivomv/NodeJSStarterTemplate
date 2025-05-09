import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaComment, FaRocket, FaEnvelope } from 'react-icons/fa';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const buttonVariants = {
    closed: {
      rotate: 0,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
    },
    open: {
      rotate: 45,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-center gap-4 mb-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.a
              href="#contact"
              className="w-12 h-12 rounded-full bg-[hsl(var(--accent))] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
              <span className="absolute right-14 bg-[hsl(var(--accent))] text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Contact Us
              </span>
            </motion.a>
            
            <motion.a
              href="#services"
              className="w-12 h-12 rounded-full bg-[hsl(var(--secondary))] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket />
              <span className="absolute right-14 bg-[hsl(var(--secondary))] text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Our Services
              </span>
            </motion.a>
            
            <motion.button
              className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open('https://calendly.com', '_blank');
              }}
            >
              <FaComment />
              <span className="absolute right-14 bg-[hsl(var(--primary))] text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Schedule a Call
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        className="w-16 h-16 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none"
        onClick={toggleOpen}
        variants={buttonVariants}
        animate={isOpen ? 'open' : 'closed'}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus className="text-xl" />
        <span className="sr-only">Open menu</span>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
