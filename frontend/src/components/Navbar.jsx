import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "../hooks/useScrollPosition.js";
import { useMobile } from "../hooks/use-mobile.jsx";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isMobile = useMobile();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 50
          ? "glass py-3 border-b border-[hsl(var(--border))]"
          : "py-5 bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">CN</span>
          </div>
          <span className="font-inter font-bold text-xl tracking-tight">CodersNexus</span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-10">
          <a href="#services" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors relative group">
            Services
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[hsl(var(--primary))] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#team" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors relative group">
            Team
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[hsl(var(--primary))] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#portfolio" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors relative group">
            Portfolio
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[hsl(var(--primary))] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors relative group">
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[hsl(var(--primary))] group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))]"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </motion.button>

          <motion.a
            href="#contact"
            className="hidden md:flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>

          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))]"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            className="md:hidden glass border-t border-[hsl(var(--border))]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <a href="#services" className="font-medium py-2 hover:text-[hsl(var(--primary))] transition-colors" onClick={closeMobileMenu}>Services</a>
              <a href="#team" className="font-medium py-2 hover:text-[hsl(var(--primary))] transition-colors" onClick={closeMobileMenu}>Team</a>
              <a href="#portfolio" className="font-medium py-2 hover:text-[hsl(var(--primary))] transition-colors" onClick={closeMobileMenu}>Portfolio</a>
              <a href="#contact" className="font-medium py-2 hover:text-[hsl(var(--primary))] transition-colors" onClick={closeMobileMenu}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
