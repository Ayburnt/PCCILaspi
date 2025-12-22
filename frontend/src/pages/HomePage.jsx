import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Layout Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';

// Section Components
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import EventsFeed from '../components/sections/EventsFeed';
import NewsFeed from '../components/sections/NewsFeed';
import PromoPopup from '../components/sections/PromoPopup';
import Partnership from '../components/sections/Partnership';
import FeaturedMember from '../components/sections/FeaturedMember';
import Gallery from '../components/sections/Gallery';

const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const scrollTransition = {
  duration: 0.6,
  ease: 'easeOut'
};

const HomePage = () => {
  useEffect(() => {
    // 1. Inject the Noupe script
    const script = document.createElement('script');
    script.src = 'https://www.noupe.com/embed/019b441ec49c7c8f9d542f9e8edf0b3287ec.js';
    script.async = true;
    
    // 2. Append to body so the floating chat bot ("X" button) works correctly
    document.body.appendChild(script);

    // 3. Cleanup on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden relative">
      {/* Global CSS fix for Noupe responsiveness and clickability */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Ensures the floating Noupe widget stays on top of all Framer Motion layers */
        #noupe-widget-container, 
        .noupe-chat-window, 
        .noupe-launcher {
          z-index: 9999 !important;
          pointer-events: auto !important;
        }

        /* Prevent the Noupe embed from breaking mobile layout */
        iframe[src*="noupe"], .noupe-embed-container {
          max-width: 100vw !important;
          width: 100% !important;
        }
      `}} />

      <TopBar />
      <Navbar />

      <Hero />

      <AboutSection /> 
      
      <FeaturedMember />
      
      {/* Animate on scroll: Events */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollVariants}
        transition={scrollTransition}
      >
        <EventsFeed />
      </motion.div>

      {/* Animate on scroll: News */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollVariants}
        transition={{ ...scrollTransition, delay: 0.2 }}
      >
        <NewsFeed />
      </motion.div>
      <Partnership />

          
      {/* Project Gallery Section */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-24">
        <Gallery />
      </div>


      <Footer />
      <PromoPopup />
    </div>
  );
};

export default HomePage;