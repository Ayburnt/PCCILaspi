import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import EventsFeed from '../components/sections/EventsFeed';
import NewsFeed from '../components/sections/NewsFeed';
import PromoPopup from '../components/sections/PromoPopup';
import Partnership from '../components/sections/Partnership';
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
  return (
    <div className="font-sans text-gray-900 bg-white">
      <TopBar />
      <Navbar />

      <Hero />

      <AboutSection />
      <Partnership />
      <Gallery />


      {/* Animate on scroll */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollVariants}
        transition={scrollTransition}
      >
        <EventsFeed />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollVariants}
        transition={{ ...scrollTransition, delay: 0.2 }}
      >
        <NewsFeed />
      </motion.div>

      <Footer />
      <PromoPopup />
    </div>
  );
};

export default HomePage;
