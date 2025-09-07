import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const highlights = [
    {
      icon: '🎨',
      title: 'Brand-First Design',
      description: 'Orange, black & white design system'
    },
    {
      icon: '📈',
      title: 'Full-Funnel Strategy',
      description: 'Awareness → Consideration → Conversion → Loyalty'
    },
    {
      icon: '⚡',
      title: 'Rapid Experimentation',
      description: 'A/B testing and optimization cadence'
    },
    {
      icon: '📊',
      title: 'Transparent Reporting',
      description: 'Actionable insights and clear metrics'
    },
    {
      icon: '✍️',
      title: 'Content that Converts',
      description: 'From copywriting to campaigns, we create content that drives clicks, shares, and sales.'
    },
    {
      icon: '🎯',
      title: 'Personalized Campaigns',
      description: 'Tailored strategies that connect brands with the right audience at the right time.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A00]/3 to-[#FF6A00]/1 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 m-0">About DigiBlaise</h2>
          <p className="text-gray-600">Confidence · Dedication · Unique Ideas · Futuristic Work</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-10"
        >
          <p className="text-lg leading-relaxed text-gray-700">
            We are a results-driven digital marketing studio helping brands grow across paid, owned, and earned channels. Our approach blends creative storytelling with analytics, so every impression moves the metric that matters.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#FF6A00] cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl flex-shrink-0 mt-1">{highlight.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{highlight.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
