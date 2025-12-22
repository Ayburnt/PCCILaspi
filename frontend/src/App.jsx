import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JoinPage from "./pages/JoinPage";
import NewsPost from "./pages/NewsPost";
import NewsIndex from "./pages/NewsIndex";
import useDynamicFavicon from "./hooks/useDynamicFavicon";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";


// Membership Pages
import MembersDirectory from "./pages/Membership/MembersDirectory";
import HowToBecomeMember from "./pages/Membership/HowToBecomeMember";
import WhyJoinUs from "./pages/Membership/WhyJoinUs";
import MemberProfile from "./pages/Membership/MemberProfile";

// Events Pages
import UpcomingEvents from "./pages/Events/UpcomingEvents";
import PastEvents from "./pages/Events/PastEvents";
import EventPost from "./pages/Events/EventPost";

// About Pages
import AboutUs from "./pages/About/AboutUs";
import History from "./pages/About/History";
import Leadership from "./pages/About/Leadership";
import ContactUs from "./pages/About/ContactUs";

// Programs Pages
import Programs from './pages/Programs/Programs';
import Advocacy from './pages/Programs/Advocacy';
import Services from './pages/Programs/Services';
import Project from './pages/Programs/Project';

function AnimatedRoutes() {
  const location = useLocation();

  useDynamicFavicon();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/join" element={<JoinPage />} />

      {/* Admin Routes */}

      {/* Membership Routes */}
      <Route path="/members-directory" element={<MembersDirectory />} />
      <Route path="/member/:slug" element={<MemberProfile />} />
      <Route path="/how-to-become-member" element={<HowToBecomeMember />} />
      <Route path="/why-join-us" element={<WhyJoinUs />} />

      {/* Events Routes */}
      <Route path="/events/upcoming" element={<UpcomingEvents />} />
      <Route path="/events/past" element={<PastEvents />} />
      <Route path="/events/:slug" element={<EventPost />} />

      {/* Programs Routes */}
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/advocacy" element={<Advocacy />} />
      <Route path="/programs/services" element={<Services />} />
      <Route path="/programs/projects" element={<Project/>}/>

      {/* About Routes */}
      <Route path="/about/about-us" element={<AboutUs />} />
      <Route path="/about/history" element={<History />} />
      <Route path="/about/leadership" element={<Leadership />} />
      <Route path="/about/contact-us" element={<ContactUs />} />

      {/* News */}
      <Route path="/news" element={<NewsIndex />} />
      <Route path="/news/:slug" element={<NewsPost />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <ScrollToTopButton />
    </Router>
  );
}