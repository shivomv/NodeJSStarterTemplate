import { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import TeamSection from "./components/TeamSection.jsx";
import PortfolioSection from "./components/PortfolioSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import BackgroundCanvas from "./components/BackgroundCanvas.jsx";
import FloatingActionButton from "./components/FloatingActionButton.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { motion, useAnimation } from "framer-motion";

function App() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
    });
  }, [controls]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="codersnexus-theme">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen"
      >
        <BackgroundCanvas />
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <TeamSection />
          <PortfolioSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingActionButton />
        <Toaster />
      </motion.div>
    </ThemeProvider>
  );
}

export default App;
