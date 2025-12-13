import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import NewsPost from './pages/NewsPost';
import NewsIndex from './pages/NewsIndex';

// Membership Pages
import MembersDirectory from './pages/Membership/MembersDirectory';
import HowToBecomeMember from './pages/Membership/HowToBecomeMember';
import WhyJoinUs from './pages/Membership/WhyJoinUs';
import MemberProfile from './pages/Membership/MemberProfile';

// Events Pages
import UpcomingEvents from './pages/Events/UpcomingEvents';
import PastEvents from './pages/Events/PastEvents';
import EventPost from './pages/Events/EventPost';

// About Pages
import AboutUs from './pages/About/AboutUs';
import Leadership from './pages/About/Leadership';
import ContactUs from './pages/About/ContactUs';

function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/join" element={<JoinPage />} />

      {/* Membership Routes */}
      <Route path="/members-directory" element={<MembersDirectory />} />
      <Route path="/member/:id" element={<MemberProfile />} />
      <Route path="/how-to-become-member" element={<HowToBecomeMember />} />
      <Route path="/why-join-us" element={<WhyJoinUs />} />

      {/* Events Routes */}
      <Route path="/events/upcoming" element={<UpcomingEvents />} />
      <Route path="/events/past" element={<PastEvents />} />
      <Route path="/events/:slug" element={<EventPost />} />

      {/* Events Routes */}
      <Route path="/about/about-us" element={<AboutUs />} />
      <Route path="/about/leadership" element={<Leadership />} />
      <Route path="/about/contact-us" element={<ContactUs />} />

      {/* The Page showing ALL news */}
      <Route path="/news" element={<NewsIndex />} />

      {/* The Page showing ONE specific article */}
      <Route path="/news/:slug" element={<NewsPost />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;