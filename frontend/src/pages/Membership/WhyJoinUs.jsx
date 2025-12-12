import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Scale, 
  Lightbulb, 
  Heart, 
  Building2, 
  ShieldCheck, 
  Landmark, 
  Users, 
  Briefcase, 
  Gavel, 
  Eye, 
  Laptop,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';
import { client, urlFor } from '../../sanityClient';

// Icon mapping
const iconMap = {
  Network,
  Scale,
  Lightbulb,
  Heart,
  Building2,
  ShieldCheck,
  Landmark,
  Users,
  Briefcase,
  Gavel,
  Eye,
  Laptop,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function WhyJoinUs() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "whyJoinUs"][0]{
      heroBadgeText,
      heroTitle,
      heroHighlight,
      heroTagline,
      heroBackgroundImage,
      heroCTAText,
      pillarsTitle,
      pillarsDescription,
      corePillars[]{title, description, icon, iconColor, bgColor},
      govSectionBadge,
      govSectionTitle,
      govSectionDescription,
      govAdvantages[]{title, description, icon, iconColor},
      governmentCouncilsTitle,
      governmentCouncils[]{name, icon},
      agenciesTitle,
      agencies,
      ctaTitle,
      ctaDescription,
      ctaButtonText
    }`;
    client
      .fetch(query)
      .then((data) => setContent(data || null))
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  const bgImage = content?.heroBackgroundImage
    ? urlFor(content.heroBackgroundImage).width(2070).url()
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  return (
        <div className="min-h-screen bg-slate-50 font-sans">

      <TopBar />
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="City Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-blue-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs md:text-sm font-semibold tracking-wider mb-6 uppercase text-blue-200">
              {content?.heroBadgeText || 'WHY JOIN US?'}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              {content?.heroTitle || 'Powering Business'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-amber-200">
                {content?.heroHighlight || 'In The Financial Capital'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              {content?.heroTagline || 'Connect with government leaders, influence policy, and expand your enterprise with PCCI Makati.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/join" 
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                {content?.heroCTAText || 'Become a Member'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- CORE PILLARS SECTION (4 IN A ROW) --- */}
      <div className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {content?.pillarsTitle || 'Why Join PCCI Las Pinas?'}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {content?.pillarsDescription || 'We provide the ecosystem you need to thrive in the competitive Las Pinas landscape.'}
            </p>
          </motion.div>

          {/* GRID: 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content?.corePillars || []).map((pillar, index) => {
              const Icon = iconMap[pillar.icon] || Building2;
              return (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className={`group relative bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full`}
                >
                  {/* Top colored border effect on hover */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${(pillar.iconColor || 'text-blue-600').replace('text', 'bg')} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-xl`}></div>

                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-lg ${pillar.bgColor || 'bg-blue-50'} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={pillar.iconColor || 'text-blue-600'} size={28} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-800 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- THE STRATEGIC EDGE (GOVT RELATIONS) --- */}
      <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Column: Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-amber-400"></div>
                <span className="text-amber-400 font-bold tracking-widest text-xs uppercase">
                  {content?.govSectionBadge || 'Strategic Advantage'}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {content?.govSectionTitle || 'Direct Collaboration with Local Government'}
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {content?.govSectionDescription || "One of the most powerful benefits of PCCI Makati is our integration with the Makati City Government. We don't just watch from the sidelines; we are part of the conversation."}
              </p>
              
              <div className="space-y-8">
                {(content?.govAdvantages || []).map((advantage, idx) => {
                  const Icon = iconMap[advantage.icon] || Gavel;
                  return (
                    <div key={idx} className="flex gap-4 group">
                      <div className="bg-slate-800 p-3 rounded-lg h-fit group-hover:bg-blue-600/20 transition-colors">
                        <Icon className={advantage.iconColor || 'text-blue-400'} size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{advantage.title}</h4>
                        <p className="text-slate-400 text-sm">{advantage.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: The Council Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
                <h4 className="text-xl font-bold mb-6 text-center text-slate-100">
                  {content?.governmentCouncilsTitle || 'We Sit On The Boards Of:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content?.governmentCouncils || []).map((council, idx) => {
                    const Icon = iconMap[council.icon] || Building2;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors border border-white/5">
                        <div className="text-amber-400 shrink-0">
                           <Icon size={18} />
                        </div>
                        <span className="font-medium text-sm text-slate-200">{council.name}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-4">
                    {content?.agenciesTitle || 'Productive Relationships With Agencies'}
                  </p>
                  <div className="flex justify-center gap-6 font-bold text-white text-lg flex-wrap">
                    {(content?.agencies || ['DTI', 'DOLE', 'DSWD']).map((agency, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="text-slate-600">•</span>}
                        <span className="hover:text-blue-400 transition-colors cursor-default">{agency}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-24 bg-white to-slate-900  text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              {content?.ctaTitle || 'Ready to Elevate Your Business?'}
            </h2>
            <p className="text-xl  mb-10 font-light">
              {content?.ctaDescription || 'Join hundreds of successful businesses in Makati. Your growth journey starts here.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/how-to-become-member" 
                className="bg-transparent border border-black px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all"
              >
                {content?.ctaButtonText || 'Apply for Membership'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}