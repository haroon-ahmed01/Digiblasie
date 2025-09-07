import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Case Studies' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 border-b border-gray-200 shadow-sm' 
          : 'bg-white/70'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5">
        <nav className="flex items-center justify-between h-18 py-4">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={logo}
              alt="DigiBlaise Logo" 
              className="h-16 w-16 rounded-full object-cover"
            />
            <span className="text-lg font-extrabold tracking-wide text-gray-900">
              DigiBlaise
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="bg-[#FF6A00] text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:bg-black transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Free Audit
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden grid gap-2 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-[#FF6A00] text-white px-4 py-3 rounded-xl font-bold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Free Audit
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;