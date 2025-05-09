import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaServer,
  FaRobot,
  FaChartLine,
  FaCheck,
  FaArrowRight
} from "react-icons/fa";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";

const services = [
  {
    icon: <FaLaptopCode className="text-2xl" />,
    title: "Full-Stack Development",
    description: "End-to-end web application development using cutting-edge technologies for scalable, high-performance solutions.",
    longDescription: "We build complete web applications that deliver exceptional user experiences with a focus on performance, security, and scalability. Our full-stack expertise ensures seamless integration between frontend and backend components.",
    features: [
      "Modern frontend with React, Vue, or Angular",
      "Robust backends using Node.js, Python, or Go",
      "Database design and optimization",
      "RESTful and GraphQL API development",
      "Authentication and security implementation",
      "Performance optimization and caching"
    ],
    caseStudy: "Helped a fintech startup increase system performance by 300% while reducing infrastructure costs by 40% through a complete full-stack overhaul.",
    color: "primary"
  },
  {
    icon: <FaMobileAlt className="text-2xl" />,
    title: "Mobile App Development",
    description: "Cross-platform and native mobile applications for Android and iOS with seamless performance and intuitive UX.",
    longDescription: "We create mobile experiences that users love, delivering native-quality applications across iOS and Android platforms. Our mobile solutions prioritize performance, offline capabilities, and responsive designs.",
    features: [
      "Native iOS development with Swift",
      "Native Android development with Kotlin",
      "Cross-platform with React Native or Flutter",
      "Offline-first architecture and local storage",
      "Integration with device hardware features",
      "App Store optimization and deployment"
    ],
    caseStudy: "Developed a mobile app for a retail client that increased customer engagement by 78% and boosted mobile sales by 45% within three months of launch.",
    color: "secondary"
  },
  {
    icon: <FaPaintBrush className="text-2xl" />,
    title: "UI/UX Design",
    description: "User-centered design creating intuitive, accessible interfaces that engage users and boost conversion rates.",
    longDescription: "We transform complex requirements into intuitive user interfaces that delight users and achieve business objectives. Our design process prioritizes usability, accessibility, and visual appeal to create memorable digital experiences.",
    features: [
      "User research and persona development",
      "Wireframing and prototyping",
      "Visual design and branding consistency",
      "Interaction design and micro-animations",
      "Accessibility compliance (WCAG)",
      "Usability testing and iterative refinement"
    ],
    caseStudy: "Redesigned an e-commerce platform's checkout flow, reducing cart abandonment by 32% and increasing conversion rates by 26%.",
    color: "accent"
  },
  {
    icon: <FaServer className="text-2xl" />,
    title: "Cloud Architecture",
    description: "Scalable, resilient cloud infrastructure designed for optimal performance, security, and cost-efficiency.",
    longDescription: "We architect and implement cloud solutions that ensure your applications are scalable, secure, and cost-effective. Our expertise spans all major cloud providers with a focus on automation and infrastructure as code.",
    features: [
      "AWS, Azure, and Google Cloud expertise",
      "Serverless architecture implementation",
      "Containerization with Docker and Kubernetes",
      "CI/CD pipeline automation",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Security and compliance implementation"
    ],
    caseStudy: "Migrated a legacy system to a microservices architecture, reducing deployment time from days to minutes and scaling to handle 10x the previous load.",
    color: "primary"
  },
  {
    icon: <FaRobot className="text-2xl" />,
    title: "AI Integration",
    description: "Implementing machine learning and AI capabilities to deliver smarter, more personalized user experiences.",
    longDescription: "We bring the power of artificial intelligence to your applications, enabling predictive capabilities, automation, and intelligent data processing. Our AI solutions enhance user experiences and unlock new business opportunities.",
    features: [
      "Machine learning model development",
      "Natural language processing integration",
      "Recommendation systems implementation",
      "Computer vision and image recognition",
      "Predictive analytics solutions",
      "AI-powered chatbots and virtual assistants"
    ],
    caseStudy: "Implemented an AI-driven recommendation engine that increased average order value by 34% and improved customer retention by 28%.",
    color: "secondary"
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    title: "Digital Strategy",
    description: "Strategic planning and consulting to help businesses leverage technology for measurable growth and ROI.",
    longDescription: "We partner with businesses to develop comprehensive digital strategies that align technology investments with business objectives. Our strategic approach identifies opportunities for innovation and disruption.",
    features: [
      "Digital transformation roadmapping",
      "Technology stack assessment and recommendations",
      "Competitive analysis and market positioning",
      "User journey mapping and optimization",
      "Data-driven decision making frameworks",
      "ROI analysis and performance metrics"
    ],
    caseStudy: "Developed a digital transformation strategy for a traditional retailer, resulting in 220% growth in digital revenue within 18 months.",
    color: "accent"
  }
];

const ServiceCard = ({ icon, title, description, features, color, index, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <ScrollReveal delay={index * 0.1} direction="up" distance={30}>
      <motion.div
        className="group relative p-8 rounded-2xl glass transition-all duration-300 cursor-pointer"
        whileHover={{ y: -5 }}
        onClick={onClick}
      >
      {/* Modern gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      </div>

      {/* Card glow effect */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500 group-hover:duration-200"></div>

      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
          color === 'primary' ? 'bg-[hsl(var(--primary)_/_0.1)] text-[hsl(var(--primary))]' :
          color === 'secondary' ? 'bg-[hsl(var(--secondary)_/_0.1)] text-[hsl(var(--secondary))]' :
          'bg-[hsl(var(--accent)_/_0.1)] text-[hsl(var(--accent))]'
        }`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold font-inter mb-4">{title}</h3>
        <p className="text-slate-500 dark:text-slate-300 mb-6">
          {description}
        </p>
        <div className="mb-6">
          <h4 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-slate-100 mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className={`mr-2 mt-1 ${
                  color === 'primary' ? 'text-[hsl(var(--primary))]' :
                  color === 'secondary' ? 'text-[hsl(var(--secondary))]' :
                  'text-[hsl(var(--accent))]'
                }`}>
                  <FaCheck size={12} />
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <motion.button
          className={`inline-flex items-center font-medium relative overflow-hidden group-hover:pr-8 ${
            color === 'primary' ? 'text-[hsl(var(--primary))]' :
            color === 'secondary' ? 'text-[hsl(var(--secondary))]' :
            'text-[hsl(var(--accent))]'
          }`}
          whileHover={{ x: 5 }}
        >
          <span className="relative z-10">Explore Service</span>
          <FaArrowRight className="ml-2 text-sm absolute right-0 opacity-0 group-hover:opacity-100 transform -translate-x-5 group-hover:translate-x-0 transition-all duration-300" />
        </motion.button>
      </div>
      </motion.div>
    </ScrollReveal>
  );
};

const ServiceDetailModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-slate-900 max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative h-20 flex items-center px-8 ${
          service.color === 'primary' ? 'bg-[hsl(var(--primary))]' :
          service.color === 'secondary' ? 'bg-[hsl(var(--secondary))]' :
          'bg-[hsl(var(--accent))]'
        }`}>
          <button
            className="absolute top-1/2 right-4 w-10 h-10 -mt-5 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mr-4 text-white">
              {service.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-xl font-bold mb-4">Overview</h3>
          <p className="text-slate-500 dark:text-slate-300 mb-6">
            {service.longDescription}
          </p>

          <h3 className="text-xl font-bold mb-4">What We Offer</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <span className={`mr-2 mt-1 ${
                  service.color === 'primary' ? 'text-[hsl(var(--primary))]' :
                  service.color === 'secondary' ? 'text-[hsl(var(--secondary))]' :
                  'text-[hsl(var(--accent))]'
                }`}>
                  <FaCheck />
                </span>
                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4">Success Stories</h3>
          <div className="p-4 mb-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <p className="text-slate-700 dark:text-slate-200 italic">
              "{service.caseStudy}"
            </p>
          </div>

          <div className="flex space-x-4">
            <motion.a
              href="#contact"
              className={`flex-1 py-3 rounded-lg text-white text-center font-medium transition-colors ${
                service.color === 'primary' ? 'bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)_/_0.9)]' :
                service.color === 'secondary' ? 'bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)_/_0.9)]' :
                'bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)_/_0.9)]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Discuss Your Project
            </motion.a>
            <motion.button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-[hsl(var(--border))] text-center font-medium hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Other Services
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-20 md:py-32 relative" ref={sectionRef}>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[hsl(var(--accent)_/_0.1)] rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-40 right-0 w-80 h-80 bg-[hsl(var(--primary)_/_0.1)] rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal direction="down" distance={50}>
          <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--secondary)_/_0.1)] text-[hsl(var(--secondary))] font-medium text-sm mb-4">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold font-inter mb-6">Expert Solutions for Digital Success</h2>
          <p className="text-slate-500 dark:text-slate-300">
            Our team of experienced developers and designers create custom solutions that drive business growth, enhance user engagement, and deliver measurable results.
          </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              color={service.color}
              index={index}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>

        <ScrollReveal delay={0.6} direction="up" distance={30}>
          <div className="text-center mt-16">
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-medium hover:shadow-lg hover:shadow-[hsl(var(--primary)_/_0.2)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discuss Your Project With Us
          </motion.a>
          </div>
        </ScrollReveal>
      </div>

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default ServicesSection;
