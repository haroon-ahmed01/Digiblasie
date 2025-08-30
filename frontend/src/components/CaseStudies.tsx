import React from 'react';
import { motion } from 'framer-motion';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'Case Study 1: Instagram Growth Experiment',
      challenge: 'Increase engagement on a new Instagram account with low activity.',
      objective: 'Boost engagement by 200% in 30 days.',
      strategy: 'Posted 3 reels + 2 carousels per week. Used trending audios & hooks. Optimized captions & hashtags.',
      results: 'Engagement grew by 2.2x in 30 days. Avg. likes 30 → 95. Reels 5,000+ views.',
      learning: 'Short-form video content outperformed static posts.'
    },
    {
      title: 'Case Study 2: Small Business Boost',
      challenge: 'A local café wanted more footfall & awareness.',
      objective: 'Drive walk-ins through Instagram marketing.',
      strategy: 'Designed posts on menu & ambience. Ran geo-targeted ads (₹1,000). Student Discount campaign.',
      results: 'Campaign reached 10,000+ locals. 15% increase in footfall.',
      learning: 'Hyperlocal ads + offers convert better.'
    },
    {
      title: 'Case Study 3: Personal Branding',
      challenge: 'Build visibility for a student entrepreneur on LinkedIn.',
      objective: 'Increase profile engagement & connections.',
      strategy: 'Optimized profile. 3 value posts weekly. Leveraged polls & storytelling.',
      results: '400+ new connections. Post impressions 200 → 2,500.',
      learning: 'Authentic storytelling builds trust faster.'
    },
    {
      title: 'Case Study 4: Event Marketing',
      challenge: 'Generate buzz for a college fest.',
      objective: 'Increase participation & visibility.',
      strategy: 'Designed posters + reels. Created hashtags. Ran countdowns & polls.',
      results: 'Page followers +300%. 2,000+ registrations.',
      learning: 'Timely content + interactive features = hype.'
    },
    {
      title: 'Case Study 5: AI + Creativity',
      challenge: 'Create content faster for a startup brand.',
      objective: 'Improve consistency using AI tools.',
      strategy: 'Used AI for designs, captions, ideas. Added human creativity. Daily posting maintained.',
      results: '30 posts in 10 days (3x faster). Consistency improved.',
      learning: 'AI accelerates, human touch engages.'
    },
    {
      title: 'Case Study 6: Ad Campaign Mini-Test',
      challenge: 'Test ad performance with a small budget.',
      objective: 'Drive website clicks via Instagram ads.',
      strategy: '₹500 test with 2 creatives. A/B targeting. Monitored CTR.',
      results: '3,200 impressions, 150 clicks. CTR: 4.6% (above avg).',
      learning: 'Interest targeting delivered better ROI.'
    }
  ];

  return (
    <section id="work" className="py-16 px-5 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 m-0">Case Studies</h2>
          <p className="text-gray-600">Problem → Strategy → Impact</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
            >
              <h3 className="text-[#FF6A00] font-semibold text-lg mb-4">{study.title}</h3>
              
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <strong>Challenge:</strong> {study.challenge}
                </p>
                <p className="text-gray-700">
                  <strong>Objective:</strong> {study.objective}
                </p>
                <p className="text-gray-700">
                  <strong>Strategy:</strong> {study.strategy}
                </p>
                <p className="text-gray-700">
                  <strong>Results:</strong> {study.results}
                </p>
                <p className="text-gray-700">
                  <strong>Key Learning:</strong> {study.learning}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;