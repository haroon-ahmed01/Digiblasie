import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Bewise from '../assets/our_video_reels/Bewise.mp4';
import srk1 from '../assets/our_video_reels/srk1.mp4';
import srk2 from '../assets/our_video_reels/srk2.mp4';
import srk3 from '../assets/our_video_reels/srk3.mp4';
import indiaStores from '../assets/our_video_reels/indiaStores.mp4';
import VisionExcellence1 from '../assets/our_video_reels/VisionExcellence1.mp4';
import VisionExcellence2 from '../assets/our_video_reels/VisionExcellence2.mp4';
import BeWise from '../assets/videothumnail/BeWise.png';
import IS from '../assets/videothumnail/IS.png';
import SRKJ from '../assets/videothumnail/SRKJ.png';
import VE from '../assets/videothumnail/VE.png';



const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      thumbnail: BeWise,
      videoUrl: Bewise,
      title: 'Educational Campaign Video'
    },
    {
      thumbnail: SRKJ,
      videoUrl: srk1,
      title: 'Brand Awareness Reel'
    },
    {
      thumbnail: SRKJ,
      videoUrl: srk2,
      title: 'Product Showcase Video'
    },
    {
      thumbnail: SRKJ,
      videoUrl: srk3,
      title: 'Social Media Campaign'
    },
    {
      thumbnail: IS,
      videoUrl: indiaStores,
      title: 'Client Success Story'
    },
    {
      thumbnail: VE,
      videoUrl: VisionExcellence1,
      title: 'Creative Process Reel'
    },
    {
      thumbnail: VE,
      videoUrl: VisionExcellence2,
      title: 'Creative Process Reel'
    }
  ];

  return (
    <>
      <section id="video-gallery" className="py-16 px-5 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10"
          >
            Our Video Reels
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedVideo(video.videoUrl)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                  >
                    <Play size={24} className="text-[#FF6A00] ml-1" fill="currentColor" />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-semibold text-sm">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Popup */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-auto rounded-2xl max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoGallery;