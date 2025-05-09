import { motion } from "framer-motion";
import { FaGoogle, FaSlack, FaShopify, FaSpotify, FaAirbnb } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                <span className="text-white font-bold text-lg">CN</span>
              </div>
              <span className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--primary)_/_0.1)] text-[hsl(var(--primary))] font-medium text-sm">
                Tech Innovation Studio
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              We build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]">digital products</span> that people love
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-500 dark:text-slate-300 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              CodersNexus crafts exceptional digital experiences with cutting-edge technologies, from responsive web apps to mobile solutions.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-medium text-center hover:shadow-lg hover:shadow-[hsl(var(--primary)_/_0.2)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="#services"
                className="px-8 py-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-medium hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Services
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hide animated logo on small/medium screens for cleaner modern look */}
          <motion.div
            className="hidden lg:block lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-full h-[500px] relative perspective-1000">
              {/* Modern 3D Layered Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Background glow */}
                <motion.div
                  className="w-72 h-72 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] rounded-full opacity-80 blur-3xl"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                ></motion.div>

                {/* Floating geometric shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Floating cube */}
                  <motion.div
                    className="absolute w-24 h-24 transform-style-3d"
                    animate={{
                      rotateX: [0, 360],
                      rotateY: [0, 360],
                      z: [0, 30, 0]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                      times: [0, 0.5, 1]
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Cube faces */}
                    <motion.div className="absolute inset-0 w-full h-full bg-[hsl(var(--primary)_/_0.2)] backdrop-blur-md border border-[hsl(var(--primary)_/_0.3)] rounded-lg transform translate-z-12" />
                    <motion.div className="absolute inset-0 w-full h-full bg-[hsl(var(--accent)_/_0.2)] backdrop-blur-md border border-[hsl(var(--accent)_/_0.3)] rounded-lg transform rotateY-180 translate-z-12" />
                    <motion.div className="absolute inset-0 w-full h-full bg-[hsl(var(--secondary)_/_0.2)] backdrop-blur-md border border-[hsl(var(--secondary)_/_0.3)] rounded-lg transform rotateY-90 translate-z-12" />
                    <motion.div className="absolute inset-0 w-full h-full bg-[hsl(var(--primary)_/_0.2)] backdrop-blur-md border border-[hsl(var(--primary)_/_0.3)] rounded-lg transform rotateY-270 translate-z-12" />
                    <motion.div className="absolute inset-0 w-full h-full bg-[hsl(var(--accent)_/_0.2)] backdrop-blur-md border border-[hsl(var(--accent)_/_0.3)] rounded-lg transform rotateX-90 translate-z-12" />
                    <motion.div className="absolute inset-0 w-full h-full bg-[hsl(var(--secondary)_/_0.2)] backdrop-blur-md border border-[hsl(var(--secondary)_/_0.3)] rounded-lg transform rotateX-270 translate-z-12" />
                  </motion.div>

                  {/* Floating ring */}
                  <motion.div
                    className="absolute w-64 h-64 rounded-full border-4 border-[hsl(var(--primary)_/_0.3)] backdrop-blur-sm"
                    animate={{
                      rotateX: [0, 360],
                      rotateY: [360, 0]
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  />

                  {/* Floating ring 2 */}
                  <motion.div
                    className="absolute w-48 h-48 rounded-full border-4 border-[hsl(var(--accent)_/_0.3)] backdrop-blur-sm"
                    animate={{
                      rotateX: [360, 0],
                      rotateY: [0, 360]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  />
                </div>

                {/* Center logo element */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    className="w-32 h-32 glass rounded-2xl flex items-center justify-center shadow-lg border border-[hsl(var(--primary)_/_0.3)]"
                    animate={{
                      y: [0, -15, 0],
                      rotateZ: [0, 5, 0, -5, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="text-4xl font-bold font-inter">
                      <span className="text-[hsl(var(--primary))]">C</span><span className="text-[hsl(var(--accent))]">N</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 md:mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-center text-slate-500 dark:text-slate-300 mb-6">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
            <motion.div
              className="h-8 filter grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.2, filter: "grayscale(0)" }}
            >
              <FaGoogle className="text-3xl" />
            </motion.div>
            <motion.div
              className="h-8 filter grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.2, filter: "grayscale(0)" }}
            >
              <FaSlack className="text-3xl" />
            </motion.div>
            <motion.div
              className="h-8 filter grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.2, filter: "grayscale(0)" }}
            >
              <FaShopify className="text-3xl" />
            </motion.div>
            <motion.div
              className="h-8 filter grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.2, filter: "grayscale(0)" }}
            >
              <FaSpotify className="text-3xl" />
            </motion.div>
            <motion.div
              className="h-8 filter grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.2, filter: "grayscale(0)" }}
            >
              <FaAirbnb className="text-3xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-[hsl(var(--primary)_/_0.3)] rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[hsl(var(--secondary)_/_0.2)] rounded-full filter blur-3xl opacity-50"></div>
    </section>
  );
};

export default HeroSection;
