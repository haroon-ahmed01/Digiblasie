import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import WorkTestimonials from './components/WorkTestimonials';
import VideoGallery from './components/VideoGallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <CaseStudies />
      <WorkTestimonials />
      <VideoGallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;