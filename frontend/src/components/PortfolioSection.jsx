import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal.jsx";

const projects = [
  {
    title: "Financial Dashboard",
    category: "Web Application",
    description: "Real-time financial analytics platform with interactive visualizations and AI-powered insights for enterprise decision making.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    technologies: ["React", "Node.js", "D3.js", "MongoDB", "TypeScript"],
    color: "primary",
    demoLink: "#",
    codeLink: "#",
    featured: true,
    results: "Increased decision-making speed by 47% and reduced analysis time by 58% for enterprise clients."
  },
  {
    title: "ShopEase",
    category: "Mobile App",
    description: "Feature-rich e-commerce application with AR product previews and personalized recommendations driven by machine learning.",
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    technologies: ["Flutter", "Firebase", "GraphQL", "ARKit", "TensorFlow"],
    color: "secondary",
    demoLink: "#",
    codeLink: "#",
    featured: true,
    results: "Increased conversion rates by 32% and boosted average order value by 28% through AI-powered recommendations."
  },
  {
    title: "VirtualEstate",
    category: "Web 3D Experience",
    description: "Immersive 3D virtual real estate tours platform with interactive property exploration and realistic environment rendering.",
    image: "https://pixabay.com/get/g8cdd567bc789008e846f9c650a3eb142f4612ff69ded639c8b2be01252c92a5756a2cdf080d0ac0b8beb3af35e6f6bdb3850df5075c6541c117db1e75f151293_1280.jpg",
    technologies: ["Three.js", "WebGL", "React", "AWS", "Blender"],
    color: "accent",
    demoLink: "#",
    codeLink: "#",
    featured: true,
    results: "Reduced property viewing needs by 42% and increased remote purchase decisions by 35% for real estate clients."
  },
  {
    title: "HealthTrack Pro",
    category: "Mobile Healthcare",
    description: "Comprehensive health monitoring application with wearable integration for real-time health metrics and predictive analytics.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    technologies: ["React Native", "Express.js", "MongoDB", "TensorFlow", "Apple HealthKit"],
    color: "primary",
    demoLink: "#",
    codeLink: "#",
    featured: false,
    results: "Helped users improve health metrics by 23% on average through personalized insights and timely interventions."
  },
  {
    title: "CloudSync",
    category: "Enterprise Solution",
    description: "Secure, scalable file synchronization and collaboration platform for enterprises with advanced permission controls.",
    image: "https://images.unsplash.com/photo-1614064548237-096d3a94b7a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    technologies: ["Next.js", "Go", "PostgreSQL", "Docker", "Kubernetes"],
    color: "secondary",
    demoLink: "#",
    codeLink: "#",
    featured: false,
    results: "Reduced data synchronization times by 76% and improved cross-team collaboration efficiency by 41%."
  },
  {
    title: "AI Content Creator",
    category: "SaaS Platform",
    description: "Intelligent content generation platform that creates SEO-optimized, engaging content across multiple formats and industries.",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    technologies: ["Vue.js", "Python", "FastAPI", "OpenAI", "ElasticSearch"],
    color: "accent",
    demoLink: "#",
    codeLink: "#",
    featured: false,
    results: "Reduced content creation time by 85% while maintaining high engagement rates and improving SEO performance by 53%."
  }
];

const ProjectCard = ({ project, index, setSelectedProject }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <ScrollReveal delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"} distance={30}>
      <motion.div
        className="group rounded-2xl overflow-hidden transition-all duration-500 glass relative"
        whileHover={{ y: -10 }}
        onClick={() => setSelectedProject(project)}
      >
        {/* Modern gradient border effect */}
        <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        </div>

        {/* Card glow effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500 group-hover:duration-200"></div>
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex justify-between items-center mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.span
                className={`text-xs font-medium text-white rounded-full px-3 py-1 ${
                  project.color === 'primary' ? 'bg-[hsl(var(--primary))]' :
                  project.color === 'secondary' ? 'bg-[hsl(var(--secondary))]' :
                  'bg-[hsl(var(--accent))]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {project.category}
              </motion.span>
              {project.featured && (
                <motion.span
                  className="text-xs font-medium text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 ml-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Featured
                </motion.span>
              )}
            </motion.div>
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-sm text-white/80 mb-3 line-clamp-2"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {project.description}
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div className="p-6 bg-[hsl(var(--background))]">
        <div className="flex justify-between items-start mb-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold font-inter">{project.title}</h3>
          </motion.div>
          <div className="flex space-x-3">
            <motion.a
              href={project.demoLink}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={12} />
            </motion.a>
            <motion.a
              href={project.codeLink}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={14} />
            </motion.a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-[hsl(var(--muted-foreground))] mb-4 line-clamp-2 text-sm">
            {project.description}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <motion.span
              key={idx}
              className="text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-full px-3 py-1 border border-transparent hover:border-[hsl(var(--border))] transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <motion.span
              className="text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-full px-3 py-1 border border-transparent hover:border-[hsl(var(--border))] transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              +{project.technologies.length - 3} more
            </motion.span>
          )}
        </motion.div>

        <motion.button
          className={`w-full flex items-center justify-center py-3 rounded-lg text-white relative overflow-hidden group ${
            project.color === 'primary' ? 'bg-[hsl(var(--primary))]' :
            project.color === 'secondary' ? 'bg-[hsl(var(--secondary))]' :
            'bg-[hsl(var(--accent))]'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span className="relative z-10 mr-2 group-hover:mr-4 transition-all duration-300">View Case Study</span>
          <FaCode className="relative z-10 opacity-0 group-hover:opacity-100 transform translate-x-5 group-hover:translate-x-0 transition-all duration-300" />
          <div className="absolute inset-0 w-0 bg-black/20 group-hover:w-full transition-all duration-300 ease-in-out"></div>
        </motion.button>
      </div>
      </motion.div>
    </ScrollReveal>
  );
};

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[hsl(var(--background))] max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center mb-2">
              <span className={`text-xs font-medium text-white rounded-full px-3 py-1 mr-2 ${
                project.color === 'primary' ? 'bg-[hsl(var(--primary))]' :
                project.color === 'secondary' ? 'bg-[hsl(var(--secondary))]' :
                'bg-[hsl(var(--accent))]'
              }`}>
                {project.category}
              </span>
              {project.featured && (
                <span className="text-xs font-medium text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-xl font-bold mb-4">Project Overview</h3>
          <p className="text-slate-500 dark:text-slate-300 mb-6">
            {project.description}
          </p>

          <h3 className="text-xl font-bold mb-4">Results & Impact</h3>
          <div className="p-4 mb-6 bg-[hsl(var(--muted)_/_0.5)] rounded-lg">
            <p className="text-[hsl(var(--foreground))] italic">
              "{project.results}"
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="text-sm bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-full px-3 py-1">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-4">
            <motion.a
              href={project.demoLink}
              className="flex-1 py-3 rounded-lg bg-[hsl(var(--primary))] text-white text-center font-medium hover:bg-[hsl(var(--primary)_/_0.9)] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Live Demo
            </motion.a>
            <motion.a
              href={project.codeLink}
              className="flex-1 py-3 rounded-lg border border-[hsl(var(--border))] text-center font-medium hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Source Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all"
    ? projects
    : filter === "featured"
      ? projects.filter(p => p.featured)
      : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="portfolio" className="py-20 md:py-32 relative" ref={sectionRef}>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[hsl(var(--primary)_/_0.1)] rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 -left-40 w-80 h-80 bg-[hsl(var(--secondary)_/_0.1)] rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal direction="down" distance={50}>
          <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--primary)_/_0.1)] text-[hsl(var(--primary))] font-medium text-sm mb-4">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold font-inter mb-6">Exceptional Projects</h2>
          <p className="text-slate-500 dark:text-slate-300 mb-8">
            Explore our portfolio of successful projects that have delivered remarkable results for clients across various industries.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "all" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)_/_0.8)]"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
            >
              All Projects
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "featured" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)_/_0.8)]"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("featured")}
            >
              Featured
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "web" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)_/_0.8)]"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("web")}
            >
              Web Apps
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "mobile" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)_/_0.8)]"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("mobile")}
            >
              Mobile Apps
            </motion.button>
          </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              setSelectedProject={setSelectedProject}
            />
          ))}
        </div>

        <ScrollReveal delay={0.4} direction="up" distance={30}>
          <div className="text-center mt-12">
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-medium hover:shadow-lg hover:shadow-[hsl(var(--primary)_/_0.2)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project With Us
          </motion.a>
          </div>
        </ScrollReveal>
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default PortfolioSection;
