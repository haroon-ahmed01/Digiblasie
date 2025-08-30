import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';


const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 pb-12 border-t border-gray-200 mt-10"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap gap-5 items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={logo}
              alt="DigiBlasie Logo" 
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-bold tracking-wide text-gray-900">DigiBlasie</span>
          </motion.div>
          
          <div className="text-sm text-gray-600 font-mono">
            © {currentYear} Digiblasie
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;