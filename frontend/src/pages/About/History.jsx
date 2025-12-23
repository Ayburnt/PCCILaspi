import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Zap,
  Clock,
  Briefcase,
  Star,
  ListOrdered,
  ChevronRight,
  User,
  Quote
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { client, urlFor } from '../../sanityClient';

// ... (SanityBlockContent remains the same)

const SanityBlockContent = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;
  const content = blocks.map(block => {
    if (block._type === 'block' && block.children) {
      return block.children.map(span => span.text).join('');
    }
    return '';
  }).join('\n');
  return <p className="leading-relaxed whitespace-pre-line">{content}</p>;
};

// --- ANIMATION VARIANTS ---
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// --- IMPROVED TIMELINE EVENT CARD (PRESIDENTIAL STYLE) ---
const TimelineEvent = ({ event, index }) => {
  const isTop = index % 2 === 0;
  // Logic to use the 'image' from schema, fallback to icon, fallback to default
  const imageUrl = event.image?.asset?.url 
    ? urlFor(event.image).width(300).height(300).url() 
    : (event.icon?.asset?.url ? urlFor(event.icon).url() : null);

  return (
    <div className="flex-shrink-0 w-[400px] relative flex flex-col items-center group">
      {/* Connector Line to Main Track */}
      <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-28 bg-gradient-to-b from-green-300 to-transparent 
        ${isTop ? "bottom-[50%] bg-gradient-to-t" : "top-[50%]"} z-0`} 
      />

      {/* The Card Container */}
      <div className={`w-full px-4 relative z-10 ${isTop ? "mb-32" : "mt-32 order-last"}`}>
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          {/* Decorative Header */}
          <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-400" />
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              {/* Profile Image / Icon */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100">
                   {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={event.year} 
                        className="w-full h-full object-cover"
                      />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <User size={32} />
                      </div>
                   )}
                </div>
              
              </div>
              
              <Quote className="text-green-100 fill-green-50" size={40} />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1 font-serif">
                {event.name}
              </h3>
              <p className="text-sm font-medium text-green-600 mb-3">{event.year}</p>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                {event.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Central Axis Node */}
      <div className="absolute top-1/2 -translate-y-1/2 z-20">
        <div className="relative flex items-center justify-center">
          <div className="w-4 h-4 bg-green-600 rounded-full ring-4 ring-white shadow-md z-10 group-hover:scale-125 transition-transform duration-300" />
          <div className="absolute w-8 h-8 bg-green-200 rounded-full animate-pulse opacity-50" />
        </div>
      </div>
    </div>
  );
};

// --- SCROLL TIMELINE CONTAINER ---
const ScrollTimeline = ({ milestones, title, subtitle }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const distance = trackRef.current.scrollWidth - window.innerWidth;
        setScrollDistance(distance > 0 ? distance : 0);
      }
    };

    const timeoutId = setTimeout(calculateDistance, 200);
    window.addEventListener("resize", calculateDistance);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateDistance);
    };
  }, [milestones]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-slate-50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="absolute top-10 left-0 w-full z-30 pointer-events-none">
          <div className="container mx-auto px-6 text-center">
             <span className="text-green-600 font-bold tracking-wider text-sm uppercase mb-2 block">Our Leadership Legacy</span>
             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{title}</h2>
             <p className="text-slate-500 max-w-2xl mx-auto text-lg">{subtitle}</p>
          </div>
        </div>

        {/* Timeline Track */}
        <div className="relative w-full">
          {/* Main Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-slate-200 via-green-200 to-slate-200 -translate-y-1/2" />
          
          <motion.div 
            ref={trackRef}
            style={{ x }} 
            className="flex px-[10vw] w-max items-center py-20"
          >
            {milestones.map((event, index) => (
              <TimelineEvent key={index} event={event} index={index} />
            ))}
             
             {/* End of Timeline Marker */}
             <div className="ml-20 flex flex-col items-center justify-center opacity-50">
                <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center">
                    <span className="text-slate-400 font-bold">Today</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-0 w-full text-center z-30">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 text-slate-500 text-sm font-medium shadow-sm">
            <Clock size={16} className="text-green-600"/> 
            <span>Scroll down to navigate through history</span>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-3xl mix-blend-multiply" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl mix-blend-multiply" />
        </div>

      </div>
    </section>
  );
};

export default function HistoryPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // UPDATED QUERY TO FETCH IMAGE AND ICON
    const query = `*[_type == "historyPage"][0]{
      "heroTitle": heroSection.heroTitle,
      "heroSubtitle": heroSection.heroSubtitle,
      "heroBadgeText": heroSection.heroBadgeText,
      "heroBackgroundImage": heroSection.heroBackgroundImage { asset -> { _id, url } },
      "briefHistoryTitle": briefHistorySection.briefHistoryTitle,
      "briefHistoryText": briefHistorySection.briefHistoryText,
      "briefHistoryImage": briefHistorySection.briefHistoryImage { asset -> { _id, url } },
      "milestoneTitle": milestoneSection.milestoneTitle,
      "milestoneSubtitle": milestoneSection.milestoneSubtitle,
      "milestones": milestoneSection.milestones[]{ 
        year,
        name,
        description, 
        image { asset -> { _id, url } }, 
        icon { asset -> { _id, url } } 
      },
      "keyAchievementsTitle": keyAchievementsSection.keyAchievementsTitle,
      "keyAchievementsSubtitle": keyAchievementsSection.keyAchievementsSubtitle,
      "keyAchievements": keyAchievementsSection.keyAchievements,
    }`;

    client.fetch(query).then((data) => {
      setContent(data);
      setLoading(false);
    }).catch(err => { 
      console.error(err); 
      setLoading(false); 
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-green-900 rounded-full animate-spin"></div>
    </div>
  );

  const sortedMilestones = content?.milestones ? 
    [...content.milestones].sort((a, b) => parseInt(a.year) - parseInt(b.year)) 
    : [];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={content?.heroBackgroundImage ? urlFor(content.heroBackgroundImage).url() : ""}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-green-900/80 to-emerald-900/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-6">
              <Calendar size={16} className="text-emerald-400" /> {content?.heroBadgeText || "Our Legacy"}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{content?.heroTitle}</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">{content?.heroSubtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* BRIEF HISTORY */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={content?.briefHistoryImage ? urlFor(content.briefHistoryImage).url() : ""}
                alt="History"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">{content?.briefHistoryTitle}</h2>
              <div className="prose prose-slate prose-lg text-justify text-slate-600">
                <SanityBlockContent blocks={content?.briefHistoryText} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SCROLL TIMELINE (PAST PRESIDENTS) */}
      {sortedMilestones.length > 0 && (
        <ScrollTimeline 
          milestones={sortedMilestones} 
          title={content?.milestoneTitle} 
          subtitle={content?.milestoneSubtitle} 
        />
      )}

      {/* KEY ACHIEVEMENTS */}
      {content?.keyAchievements?.length > 0 && (
        <section className="py-24 relative z-10 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{content?.keyAchievementsTitle}</h2>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-6 px-6">
            {content.keyAchievements.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                    {i + 1}
                  </div>
                </div>
                <span className="text-slate-700 text-lg leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
}