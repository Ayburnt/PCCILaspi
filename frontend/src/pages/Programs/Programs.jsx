import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Landmark,
  Users,
  ShieldCheck,
  Award,
  ChevronRight,
  TrendingUp,
  FileText,
  CheckCircle2,
  Building2, // Added for the new Hero icon
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { client } from "../../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Initialize Sanity Image Builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const iconMap = {
  Briefcase,
  Landmark,
  Users,
  ShieldCheck,
  Award,
  ChevronRight,
};

export default function Programs() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Added backgroundImage and highlightedText to the query
    const query = `*[_type == "programsPage"][0]{
      header{
        badgeText,
        title,
        highlightedText,
        description,
        backgroundImage
      },
      programTracks[]{title,description,badge,icon},
      performance{sectionLabel,heading,note,stats[]{label,value,detail}},
      roadmap{title,description,steps[]{title,text}},
      callToAction{title,description,primaryText,primaryLink,secondaryText,secondaryLink}
    }`;

    client
      .fetch(query)
      .then((data) => setContent(data))
      .catch((err) => {
        console.error("Failed to fetch programs content:", err);
        setContent(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[3px] border-slate-200 border-t-[#155333] rounded-full animate-spin"></div>
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Loading Data...</span>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center max-w-md">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">System Notice</h3>
          <p className="text-slate-600">
            Unable to retrieve program data. Please verify network connection.
          </p>
        </div>
      </div>
    );
  }

  const header = content.header || {};
  const programTracks = content.programTracks || [];
  const performance = content.performance || {};
  const stats = performance.stats || [];
  const roadmap = content.roadmap || {};
  const steps = roadmap.steps || [];
  const callToAction = content.callToAction || {};

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-[#155333] selection:text-white">
      <TopBar />
      <Navbar />

      {/* === HERO SECTION === */}
      <header className="relative bg-[#064e3b] text-white overflow-hidden">
        {header?.backgroundImage ? (
          <div className="absolute inset-0 opacity-30">
            <img
              src={urlFor(header.backgroundImage).width(1920).url()}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        )}

        {/* Decorative Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 z-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-start justify-center z-10">
          <div className="flex items-center gap-2 mb-6 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            <Building2 size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              {header.badgeText}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            {header.title} <br />
            <span className="text-yellow-400">
              {header.highlightedText}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed border-l-2 border-yellow-500/50 pl-6">
            {header.description}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-24">
        
        {/* SECTION 1: PROGRAM TRACKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programTracks.map((track, index) => {
            const Icon = iconMap[track.icon] || Briefcase;
            return (
              <div
                key={track.title || index}
                className="group bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-[#155333] transition-colors duration-300"></div>

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-md flex items-center justify-center text-[#155333] group-hover:bg-[#155333] group-hover:text-white transition-colors duration-300">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    {track.badge && (
                      <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 rounded-sm">
                        {track.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#155333] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {track.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 2 & 3: STRATEGIC IMPACT & ROADMAP */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Performance Data Dashboard */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden sticky top-24">
              <div className="bg-[#155333] p-6 text-white flex justify-between items-center">
                <div>
                  <p className="uppercase text-[10px] font-bold tracking-[0.2em] text-yellow-400 opacity-90 mb-1">
                    {performance.sectionLabel}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {performance.heading}
                  </h2>
                </div>
                <TrendingUp className="text-white opacity-20" size={40} />
              </div>

              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  {stats.map((item, idx) => (
                    <div
                      key={item.label || idx}
                      className="flex items-end justify-between border-b border-dashed border-slate-200 pb-4 last:border-0"
                    >
                      <div className="pr-4">
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-1">
                          {item.label}
                        </p>
                        {item.detail && (
                          <p className="text-xs text-slate-400 font-medium">
                            {item.detail}
                          </p>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-[#155333] tabular-nums tracking-tight">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {performance.note && (
                  <div className="mt-8 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md">
                    <div className="flex gap-3">
                      <div className="shrink-0 mt-0.5">
                        <div className="w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center">
                          <span className="text-amber-700 text-[10px] font-bold">i</span>
                        </div>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed font-medium">
                        {performance.note}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Roadmap / Process Flow */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            <div className="mb-12 border-b border-slate-200 pb-8 px-4 md:px-2">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
                {roadmap.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {roadmap.description}
              </p>
            </div>

            <div className="relative pl-4 md:pl-8 space-y-12">
              <div className="absolute left-[23px] md:left-[39px] top-2 bottom-4 w-px bg-slate-300"></div>

              {steps.map((step, idx) => (
                <div key={idx} className="relative flex gap-6 md:gap-8 group">
                  <div className="shrink-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-slate-50 border-[3px] border-[#155333] z-10 mt-1.5 shadow-[0_0_0_4px_rgba(248,250,252,1)] group-hover:scale-110 transition-transform duration-300"></div>
                  
                  <div className="pb-2">
                    <span className="inline-block mb-2 text-xs font-bold text-[#155333] uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded border border-green-100">
                      Step {idx + 1}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#155333] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="relative flex gap-8">
                <div className="shrink-0 w-6 h-6 rounded-full bg-[#155333] flex items-center justify-center z-10 ml-[9px] md:ml-[1px] shadow-[0_0_0_4px_rgba(248,250,252,1)]">
                   <CheckCircle2 size={14} className="text-white" />
                </div>
                <div className="pt-0.5">
                   <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA SECTION */}
      <section className="bg-slate-900 border-t-4 border-yellow-500 py-20 relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#155333]/30 to-transparent pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {callToAction.title}
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {callToAction.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {callToAction.primaryText && (
              <a
                href={callToAction.primaryLink || "#"}
                className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 text-sm font-bold uppercase tracking-widest rounded-sm transition-all shadow-lg hover:shadow-yellow-500/20"
              >
                {callToAction.primaryText}
              </a>
            )}
            {callToAction.secondaryText && (
              <a
                href={callToAction.secondaryLink || "#"}
                className="w-full sm:w-auto px-8 py-4 border border-slate-600 hover:border-white text-white hover:text-slate-900 hover:bg-white text-sm font-bold uppercase tracking-widest rounded-sm transition-all"
              >
                {callToAction.secondaryText}
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}