import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const ScrollReveal = ({ 
  children, 
  width = "100%", 
  delay = 0,
  threshold = 0.2,
  direction = "up", // up, down, left, right
  duration = 0.6,
  distance = 50,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();
  
  // Customize variants based on props
  const customVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={customVariants}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
