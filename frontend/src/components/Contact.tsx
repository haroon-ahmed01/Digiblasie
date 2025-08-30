import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you within 1 business day.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#FF6A00] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 m-0">Start a Project</h2>
          <p className="text-gray-600">Get a Free Audit or Proposal</p>
        </motion.div>
        
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6A00] focus:outline-none transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6A00] focus:outline-none transition-colors"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="company" className="block font-semibold text-gray-900 mb-2">
              Company / Brand
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Company name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6A00] focus:outline-none transition-colors"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="message" className="block font-semibold text-gray-900 mb-2">
              Tell us about your goals
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Traffic, leads, revenue… what does success look like?"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6A00] focus:outline-none resize-vertical transition-colors"
            />
          </div>
          
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-start">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-[#FF6A00] text-white shadow-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {isSubmitting ? 'Sending....' : 'Send Request'}
            </motion.button>
            <span className="text-gray-600 text-sm pt-3">
              We'll get back within 1 business day.
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;