import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection'; // <--- The new About Section
import EventsFeed from '../components/sections/EventsFeed';
import NewsFeed from '../components/sections/NewsFeed';
import PromoPopup from '../components/sections/PromoPopup';

const HomePage = () => {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <TopBar />
      <Navbar />
      
      <Hero />
      
      {/* Replaced the old Benefits section with the new PCCI About info */}
      <AboutSection /> 
      
      <EventsFeed />
      
      <NewsFeed />
      
      <Footer />
      <PromoPopup />
    </div>
  );
};

// --- THIS LINE WAS MISSING OR BROKEN ---
export default HomePage;