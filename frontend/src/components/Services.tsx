import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      chip: 'Social Media',
      title: 'Social Media Marketing',
      description: 'End-to-end content, calendar, and distribution across Instagram, LinkedIn, YouTube & more.',
      features: ['Content strategy', 'Reels & shorts', 'Community mgmt', 'Influencer collabs']
    },
    {
      chip: 'SEO',
      title: 'Search Engine Optimization',
      description: 'Technical, on-page, and content SEO to rank for high-intent keywords and grow organic traffic.',
      features: ['Site audits', 'Keyword research', 'Link building', 'Content hubs']
    },
    {
      chip: 'Paid',
      title: 'Performance Advertising',
      description: 'ROI-focused campaigns across Meta, Google, and programmatic with rigorous testing.',
      features: ['Funnel mapping', 'Creative testing', 'Budget pacing', 'Attribution']
    },
    {
      chip: 'Brand',
      title: 'Brand & Creative',
      description: 'Identity systems, guidelines, and sales assets built for consistency and impact.',
      features: ['Logo & visual system', 'Pitch decks', 'Landing pages', 'Design ops']
    },
    {
      chip: 'Full stack',
      title: 'Web Development',
      description: 'Fast, accessible marketing sites with SEO-ready architecture.',
      features: ['HTML/CSS/JS', 'Performance', 'Accessibility', 'Analytics']
    },
    {
      chip: 'Content',
      title: 'Content & Video',
      description: 'Human-centered copy and snackable videos to fuel every stage of the funnel.',
      features: ['Copywriting', 'Explainers', 'UGC', 'Case films']
    }
  ];

  return (
    <section id="services" className="py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 m-0">Services</h2>
          <p className="text-gray-600">What we do Best</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="inline-block text-xs font-bold tracking-wider uppercase text-white bg-[#FF6A00] px-3 py-2 rounded-full mb-3">
                {service.chip}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {service.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="bg-gray-100 border border-gray-200 px-3 py-2 rounded-xl text-sm text-gray-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;