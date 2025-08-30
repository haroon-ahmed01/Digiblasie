import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'
import image1 from '../assets/work_testimonials_image/image1.png';
import image2 from '../assets/work_testimonials_image/image2.png';
import image3 from '../assets/work_testimonials_image/image3.png';
import image4 from '../assets/work_testimonials_image/image4.png';
import image5 from '../assets/work_testimonials_image/image5.png';


const WorkTestimonials = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string, caption: string} | null>(null);

  const workItems = [
    {
      src: image1,
      alt: 'Educational Campaign poster ',
      caption: 'poster  created for Educational campaign.'
    },
    {
      src: image2,
      alt: 'Engagement Campaign poster ',
      caption: 'poster  highlighting the Engagement campaign.'
    },
    {
      src: image3,
      alt: 'Real Estate poster ',
      caption: 'Real Estate promotional poster .'
    },
    {
      src: image4,
      alt: 'Course Awareness poster ',
      caption: 'poster  for a course awareness campaign.'
    },
    {
      src: image5,
      alt: 'Coaching Centre poster ',
      caption: 'poster  for a coaching centre.'
    }
  ];

  return (
    <>
      <section id="freelancing-clients" className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Work Testimonials</h2>
            <p className="text-gray-600">Freelance images & Reels Showcase</p>
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth">
            {workItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="flex-shrink-0 w-56 h-72 bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-2 hover:border-[#FF6A00]"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-44 object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
                />
                <p className="text-sm text-gray-700 text-center leading-tight hover:text-[#FF6A00] transition-colors">
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white p-5 rounded-2xl max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[70vh] object-contain rounded-lg mb-4"
              />
              <p className="text-center text-gray-700">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkTestimonials;