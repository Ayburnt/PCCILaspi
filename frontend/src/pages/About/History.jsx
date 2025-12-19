import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Zap,
  Clock,
  Briefcase,
  Star,
  BookOpen,
  CheckCircle2,
  ListOrdered,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { client, urlFor } from '../../sanityClient'; 

// ----------------------------------------------------------------------
// TEMPORARY FIX: Simple Portable Text Renderer Placeholder
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
// ----------------------------------------------------------------------


// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Icon Mapper
const iconMap = {
  Calendar, Zap, Clock, Briefcase, Star
};

// Component to render individual timeline events
const TimelineEvent = ({ event, index }) => {
  const Icon = iconMap[event.icon] || Clock;

  return (
    <motion.div
      variants={fadeInUp}
      className={`flex ${index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"} flex-col items-center w-full my-8`}
    >
      {/* Event Details (Left or Right) */}
      <div className="w-full lg:w-5/12 p-4 text-center lg:text-left">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-green-100 transition-all duration-300 group"
        >
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <Icon size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-green-700 transition-colors">{event.year}</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            {event.description}
          </p>
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div className="hidden lg:flex w-2/12 justify-center relative">
        <div className="h-full w-0.5 bg-slate-200 absolute inset-y-0" />
        <div className="w-5 h-5 bg-green-600 rounded-full z-10 border-4 border-white shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
      
      {/* Spacing for mobile layout */}
      <div className="w-full lg:w-5/12" />
    </motion.div>
  );
};


export default function HistoryPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      "milestones": milestoneSection.milestones[]{ year, description, icon },

      "keyAchievementsTitle": keyAchievementsSection.keyAchievementsTitle,
      "keyAchievementsSubtitle": keyAchievementsSection.keyAchievementsSubtitle,
      "keyAchievements": keyAchievementsSection.keyAchievements,
    }`;

    client.fetch(query).then((data) => {
      setContent(data);
      setLoading(false);
    }).catch((error) => {
      console.error("Failed to fetch history content:", error);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-green-900 rounded-full animate-spin"></div>
    </div>
  );

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center text-slate-700">
      <p>Error loading history content. Please check the Sanity Studio data and network connection.</p>
    </div>
  );

  // 1. Sort milestones descending (latest date at top)
  // Assuming 'year' is a string or number representing the year.
  // If year is just a string like "2023", this works. 
  // If it's complex text, you might need better parsing.
  const sortedMilestones = content?.milestones ? 
    [...content.milestones].sort((a, b) => parseInt(b.year) - parseInt(a.year)) 
    : [];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* 1. HERO SECTION: Immersive & Corporate Green */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax feel */}
        <div className="absolute inset-0 z-0">
          <img
            src={content?.heroBackgroundImage ? urlFor(content.heroBackgroundImage).url() : "https://images.unsplash.com/photo-1549490349-8676d1e44a49?q=80&w=2070&auto=format&fit=crop"}
            alt="Hero Background"
            className="w-full h-full object-cover scale-105"
          />
          {/* Corporate Gradient Overlay (Darker Green) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-green-900/80 to-emerald-900/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 mt-2 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium text-white shadow-sm">
                <Calendar size={16} className="text-emerald-400" />
                {content?.heroBadgeText || "Our Legacy"}
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              {content?.heroTitle || "A Proud History of Service and Growth"}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {content?.heroSubtitle || "Tracing the journey that shaped our organization and community."}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* 2. BRIEF HISTORY: Split Layout */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image Side */}
            <motion.div variants={fadeInUp} className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={content?.briefHistoryImage ? urlFor(content.briefHistoryImage).url() : "https://images.unsplash.com/photo-1543269865-cbe4261d7a31?q=80&w=1770&auto=format&fit=crop"}
                  alt="Brief History"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-green-900/10 mix-blend-multiply" />
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-10 -right-6 md:-right-12 bg-white p-6 md:p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                    <BookOpen size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">The Foundation</span>
                </div>
                <p className="text-slate-800 font-bold leading-tight">
                  "Our story is a testament to resilience and unwavering commitment to economic progress."
                </p>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <h4 className="text-green-700 font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-green-700"></span> Beginning
              </h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
                {content?.briefHistoryTitle || "The Genesis of Our Organization"}
              </h2>
              
              <div className="prose prose-lg text-slate-600 space-y-6">
                <SanityBlockContent blocks={content?.briefHistoryText} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. MILESTONE TIMELINE: Center-aligned design */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-green-700 font-bold uppercase tracking-widest text-xs mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-[2px] bg-green-700"></span> The Journey
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {content?.milestoneTitle || "Major Historical Milestones"}
            </h2>
            <p className="text-slate-600 text-lg">
              {content?.milestoneSubtitle || "Key dates and events that defined our trajectory over the decades."}
            </p>
          </div>

          {/* Timeline Wrapper */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto relative pt-8"
          >
            {/* The main vertical line (hidden on mobile) */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-slate-200 h-full" />

            {/* Render Timeline Events using the SORTED list */}
            {sortedMilestones.map((event, index) => (
              <TimelineEvent key={index} event={event} index={index} />
            ))}
          </motion.div>
          
        </div>
      </section>

      {/* 4. KEY ACHIEVEMENTS: Simple List Style */}
      {content?.keyAchievements?.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3 flex items-center justify-center gap-2">
                <span className="w-8 h-[2px] bg-emerald-600"></span> Achievements
              </h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {content?.keyAchievementsTitle || "Notable Accomplishments"}
              </h2>
              <p className="text-slate-600 text-lg">
                {content?.keyAchievementsSubtitle || "A look at the major successes achieved through collective effort."}
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto"
            >
              {content.keyAchievements.map((achievement, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300 border-b border-slate-100"
                >
                  <div className="p-2 bg-green-50 rounded-full text-green-600 mt-1 shrink-0">
                    <ListOrdered size={20} />
                  </div>
                  <p className="text-slate-700 font-medium text-lg leading-relaxed">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
}