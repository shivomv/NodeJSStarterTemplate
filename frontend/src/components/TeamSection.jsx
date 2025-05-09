import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaLinkedinIn, FaTwitter, FaGithub, FaEnvelope, FaDribbble } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal.jsx";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former Google engineer with 10+ years in tech leadership and product development.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256",
    color: "primary",
    socials: [
      { icon: <FaLinkedinIn />, url: "#" },
      { icon: <FaTwitter />, url: "#" },
      { icon: <FaEnvelope />, url: "#" },
    ]
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "Full-stack architect specializing in scalable cloud solutions and AI integration.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256",
    color: "secondary",
    socials: [
      { icon: <FaLinkedinIn />, url: "#" },
      { icon: <FaGithub />, url: "#" },
      { icon: <FaEnvelope />, url: "#" },
    ]
  },
  {
    name: "Lily Chen",
    role: "Design Lead",
    bio: "Award-winning UI/UX designer with expertise in creating intuitive user experiences.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256",
    color: "accent",
    socials: [
      { icon: <FaLinkedinIn />, url: "#" },
      { icon: <FaDribbble />, url: "#" },
      { icon: <FaEnvelope />, url: "#" },
    ]
  },
  {
    name: "Ahmed Khalid",
    role: "Mobile Lead",
    bio: "Mobile development expert with focus on native Android and cross-platform applications.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256",
    color: "primary",
    socials: [
      { icon: <FaLinkedinIn />, url: "#" },
      { icon: <FaGithub />, url: "#" },
      { icon: <FaEnvelope />, url: "#" },
    ]
  }
];

const TeamMemberCard = ({ member, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <ScrollReveal delay={index * 0.1} direction={index % 2 === 0 ? "up" : "down"} distance={30}>
      <motion.div
        className="relative p-6 rounded-2xl glass transition-all duration-500 text-center group overflow-hidden"
        whileHover={{ y: -10 }}
      >
        {/* Modern gradient border effect */}
        <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        </div>

        {/* Card glow effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500 group-hover:duration-200"></div>

        <div className="relative z-10">
      <div className="relative mx-auto w-32 h-32 mb-6 group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] animate-spin-slow opacity-70"></div>
        <motion.div
          className="absolute inset-1 rounded-full bg-[hsl(var(--background))] flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            className="w-[95%] h-[95%] object-cover rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      </div>

      <motion.h3
        className="text-xl font-bold font-inter mb-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {member.name}
      </motion.h3>

      <motion.div
        className={`font-medium mb-3 ${
          member.color === 'primary' ? 'text-[hsl(var(--primary))]' :
          member.color === 'secondary' ? 'text-[hsl(var(--secondary))]' :
          'text-[hsl(var(--accent))]'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {member.role}
      </motion.div>

      <motion.p
        className="text-[hsl(var(--muted-foreground))] mb-5 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {member.bio}
      </motion.p>
      <motion.div
        className="flex justify-center space-x-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {member.socials.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.url}
            className={`w-9 h-9 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center text-[hsl(var(--muted-foreground))] transition-all duration-300 border border-transparent ${
              member.color === 'primary' ? 'hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]' :
              member.color === 'secondary' ? 'hover:bg-[hsl(var(--secondary))] hover:border-[hsl(var(--secondary))]' :
              'hover:bg-[hsl(var(--accent))] hover:border-[hsl(var(--accent))]'
            } hover:text-white hover:shadow-md`}
            whileHover={{
              scale: 1.2,
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="team" className="py-20 md:py-32 relative" ref={sectionRef}>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[hsl(var(--accent)_/_0.2)] rounded-full filter blur-3xl opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal direction="down" distance={50}>
          <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--accent)_/_0.1)] text-[hsl(var(--accent))] font-medium text-sm mb-4">Meet Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold font-inter mb-6">The minds behind CodersNexus</h2>
          <p className="text-slate-500 dark:text-slate-300">
            Our diverse team of experts brings years of experience in technology and innovation to every project.
          </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
