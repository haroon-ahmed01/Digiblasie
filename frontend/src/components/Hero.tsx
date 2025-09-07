import React from 'react';
import { motion } from 'framer-motion';
import header_image from '../assets/header_image.jpg';


const Hero = () => {
  return (
    <section className="py-18 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block text-xs font-extrabold tracking-widest uppercase text-[#FF6A00] mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Where Creativity Meets Strategy – Welcome to DigiBlaise
            </motion.span>
            
            <motion.h1 
              className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We turn Attention into{' '}
              <span className="bg-gradient-to-r from-[#FF6A00] to-[#ff944d] bg-clip-text text-transparent">
                Measurable Growth
              </span>
              .
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-700 max-w-2xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              DigiBlaise blends confidence, dedication, and unique ideas to deliver futuristic marketing across social, search, and brand experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold bg-[#FF6A00] text-white shadow-lg hover:bg-black transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Proposal
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '100%', label: 'On-Time Delivery' },
                { value: '24/7', label: 'Client Support' },
                { value: '100%', label: 'Tailored Packages – Pay only for what you need' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 border border-gray-200 p-4 rounded-2xl text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#FF6A00]/8 to-transparent rounded-3xl p-5 border border-gray-200 shadow-xl">
              <img 
                src={header_image}
                alt="Digital Marketing Strategy"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;