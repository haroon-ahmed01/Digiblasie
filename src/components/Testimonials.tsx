import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Aameena Mehek',
      role: 'Founder',
      content: 'Our Founder, Aameena Mehek, began her professional journey as a Marketing Intern, where she discovered the power of storytelling and strategy in building brands. That experience shaped her vision for DigiBlaise, a company that connects creativity with data-driven results. Today, her leadership continues to inspire us to craft marketing that not only reaches people but truly resonates with them.'
    },
    {
      name: 'Saqlin Mustaq',
      role: 'Chief Executive Officer',
      content: 'Our Chief Executive Officer, Saqlin Mustaq, stepped into the world of marketing as an intern, where he learned firsthand how impactful the right strategy can be in driving growth. That early experience gave him a strong foundation in understanding both businesses and audiences. Today, he leads DigiBlaise with the same passion, ensuring every campaign we create delivers value and makes a lasting impact.'
    },
    {
      name: 'Sruthi Sundar',
      role: 'Chief Operating Officer',
      content: 'Our Chief Operating Officer, Sruthi, started her journey as a Java Developer Intern. That experience not only sharpened her technical skills but also sparked her belief that technology and creativity can work hand in hand. Today, she brings that same passion into DigiBlaise, helping businesses grow with a perfect blend of tech and marketing. Her journey is a reminder that curiosity and persistence can turn simple beginnings into impactful leadership.'
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 m-0">Our Team's Journey</h2>
          <p className="text-gray-600">From Interns to Leaders</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg min-h-[280px] flex flex-col hover:shadow-xl hover:border-[#FF6A00] transition-all duration-300"
            >
              <div className="flex-1">
                <h4 className="text-[#FF6A00] font-semibold text-lg mb-2">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-4">
                  {testimonial.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;