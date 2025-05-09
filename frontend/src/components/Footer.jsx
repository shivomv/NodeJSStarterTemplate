import { motion } from "framer-motion";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold font-inter text-xl">CN</span>
              </div>
              <span className="font-inter font-bold text-xl">CodersNexus</span>
            </div>
            <p className="text-slate-400 mb-6">
              Transforming ideas into powerful digital solutions. We create exceptional software that drives business growth.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#1DA1F2" }}
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#0A66C2" }}
              >
                <FaLinkedinIn size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#ffffff" }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#E4405F" }}
              >
                <FaInstagram size={20} />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-inter font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Full-Stack Development</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Mobile App Development</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cloud Architecture</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">AI Integration</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-inter font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-inter font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} CodersNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
