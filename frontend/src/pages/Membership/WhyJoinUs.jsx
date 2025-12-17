import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Lightbulb, 
  Heart, 
  Building2, 
  Users, 
  Briefcase, 
  Gavel, 
  ArrowRight,
  Gift,
  Megaphone,
  Scale,
  Eye,
  Laptop,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';
import { client, urlFor } from '../../sanityClient';

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

// Icon mapping for Lucide icons
const iconMap = {
  Network,
  Lightbulb,
  Heart,
  Building2,
  Users,
  Briefcase,
  Gavel,
  Gift,
  Megaphone,
  Scale,
  Eye,
  Laptop,
  ShieldCheck,
  Landmark
};

export default function WhyJoinUs() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhyJoinUsContent = async () => {
      try {
        const query = `*[_type == "whyJoinUs"][0]{
          heroBadgeText,
          heroTitle,
          heroHighlight,
          heroTagline,
          heroBackgroundImage,
          heroCTAText,
          pillarsTitle,
          pillarsDescription,
          corePillars[]{
            title,
            description,
            icon,
            iconColor,
            bgColor
          },
          govSectionBadge,
          govSectionTitle,
          govSectionDescription,
          govAdvantages[]{
            title,
            description,
            icon,
            iconColor
          },
          governmentCouncilsTitle,
          governmentCouncils[]{
            name,
            icon
          },
          agenciesTitle,
          agencies,
          ctaTitle,
          ctaDescription,
          ctaButtonText
        }`;
        
        const data = await client.fetch(query);
        setPageData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Why Join Us content:', error);
        setLoading(false);
      }
    };

    fetchWhyJoinUsContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600">No content available. Please seed the data.</p>
        </div>
      </div>
    );
  }
  
 

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <TopBar />
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={pageData.heroBackgroundImage ? urlFor(pageData.heroBackgroundImage).url() : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"} 
            alt="Las Pinas City" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-green-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs md:text-sm font-semibold tracking-wider mb-6 uppercase text-green-200">
              {pageData.heroBadgeText || 'WHY JOIN US?'}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              {pageData.heroTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-amber-200">
                {pageData.heroHighlight || 'PCCI Las Piñas'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mx-auto mb-10 font-light leading-relaxed">
              {pageData.heroTagline }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/membership-form" 
                className="group bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
              >
                {pageData.heroCTAText || 'Go to Membership Form'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- BENEFITS GRID SECTION --- */}
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
              {pageData.pillarsTitle || 'Why Join PCCI Las Piñas?'}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {pageData.pillarsDescription || 'Unlock the ecosystem you need to thrive in the competitive Las Piñas landscape.'}
            </p>
          </motion.div>

          {/* GRID: 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(pageData.corePillars || benefits).map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || benefit.icon || Network;
              const iconColor = benefit.iconColor || benefit.color || 'text-green-600';
              const bgColor = benefit.bgColor || benefit.bg || 'bg-green-50';
              
              return (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className={`group relative bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full`}
                >
                  {/* Top colored border effect on hover */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${iconColor.replace('text', 'bg')} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-xl`}></div>

                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-lg ${bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={iconColor} size={28} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-800 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- CLOSING LETTER SECTION --- */}
      <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <Building2 className="text-amber-400" size={32} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
              "Together, we can drive economic progress in Las Piñas."
            </h3>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Joining the PCCI Las Piñas City Chapter not only signifies your commitment to your business’s growth but also to the prosperity of our local community. We look forward to the possibility of welcoming you into our fold.
            </p>

            <p className="text-slate-400 text-md leading-relaxed mb-12">
              Please consider this invitation and feel free to reach out for more information or to discuss membership options. We are eager to meet you at our next event, where you can learn more about what we do and how we can mutually benefit from your involvement.
            </p>

            <div className="border-t border-slate-700 pt-8 inline-block px-12">
              <p className="text-white font-serif italic text-lg">Best regards,</p>
              <p className="text-amber-400 font-bold mt-2 uppercase tracking-widest">The Membership Committee</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- FINAL CTA SECTION --- */}
      <div className="py-16 bg-white border-t border-slate-100 text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            {pageData.ctaTitle && (
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {pageData.ctaTitle}
              </h3>
            )}
            {pageData.ctaDescription && (
              <p className="text-slate-600 mb-8 text-lg">
                {pageData.ctaDescription}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/membership-form" 
                className="bg-green-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-green-700 shadow-xl shadow-green-200 transition-all flex items-center justify-center gap-2"
              >
                {pageData.ctaButtonText || 'Go to Membership Form'}
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 