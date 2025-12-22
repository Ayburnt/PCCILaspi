import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Landmark,
  Users,
  ShieldCheck,
  Award,
  ChevronRight,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { client } from "../../sanityClient";

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
    const query = `*[_type == "programsPage"][0]{
      header{badgeText,title,description},
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
        <div className="w-16 h-16 border-4 border-slate-200 border-t-[#155333] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        <p>
          Unable to load Programs content. Please check Sanity data or network.
        </p>
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
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 font-sans selection:bg-[#155333] selection:text-white">
      <TopBar />
      <Navbar />

      {/* HEADER SECTION (UNCHANGED AS REQUESTED) */}
      <header className="bg-[#1a4031] text-white pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-500 w-1.5 h-8"></div>
            <span className="uppercase tracking-widest text-xs md:text-sm font-bold text-yellow-500">
              {header.badgeText}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {header.title}
          </h1>
          <p className="text-base md:text-xl text-slate-200 font-light max-w-3xl">
            {header.description}
          </p>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* 2. PROGRAM TRACKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 mt-[-1rem] md:mt-8 shadow-xl border border-gray-200 relative z-20">
          {programTracks.map((track, index) => {
            const Icon = iconMap[track.icon] || Briefcase;
            return (
              <div
                key={track.title || index}
                className="bg-white p-6 md:p-8 flex flex-col gap-4 group hover:bg-slate-50 transition-colors"
              >
                {track.badge && (
                  <div className="inline-flex items-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-yellow-600 border border-yellow-200 px-2 py-1 w-fit bg-yellow-50">
                    {track.badge}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-5">
                  <div className="p-3 bg-slate-100 text-[#155333] group-hover:bg-[#155333] group-hover:text-white transition-colors shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 tracking-tight">
                      {track.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed ">
                      {track.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 & 4. PERFORMANCE & ROADMAP SECTION */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Performance Data Dashboard */}
          <div className="lg:col-span-5 order-2 lg:order-1">
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
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                          {item.label}
                        </p>
                        {item.detail && (
                          <p className="text-xs text-slate-400 font-medium">
                            {item.detail}
                          </p>
                        )}
                      </div>
                      <div className="text-2xl font-extrabold text-[#155333] tabular-nums tracking-tight">
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
                          <span className="text-amber-700 text-[10px] font-bold">
                            i
                          </span>
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

          {/* Implementation Roadmap */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="mb-10 pl-2">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                {roadmap.title}
              </h3>
              <div className="h-1.5 w-24 bg-gradient-to-r from-yellow-500 to-yellow-200 mt-3 rounded-full"></div>
              {roadmap.description && (
                <p className="mt-5 text-base text-slate-600 leading-relaxed max-w-2xl">
                  {roadmap.description}
                </p>
              )}
            </div>

            <div className="relative space-y-2">
              {/* Vertical Connector Line (Optional visual guide) */}
              <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200 hidden md:block"></div>

              {steps.map((step, idx) => (
                <div
                  key={step.title || idx}
                  className="group relative flex flex-col md:flex-row gap-6 p-6 bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all hover:shadow-lg"
                >
                  {/* Step Number Bubble */}
                  <div className="hidden md:flex shrink-0 w-14 h-14 bg-slate-100 rounded-full border-4 border-white shadow-sm items-center justify-center text-xl font-bold text-[#155333] z-10 group-hover:bg-[#155333] group-hover:text-yellow-400 transition-colors duration-300">
                    {idx + 1}
                  </div>

                  {/* Content */}
                  <div className="relative w-full">
                    {/* Large Watermark Number for Mobile/Decor */}
                    <span className="absolute -top-4 -right-4 text-8xl font-black text-slate-50 opacity-50 select-none pointer-events-none z-0">
                      {idx + 1}
                    </span>

                    <div className="relative z-10">
                      <h4 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                        <span className="md:hidden text-[#155333]">
                          Step {idx + 1}:
                        </span>{" "}
                        {step.title}
                      </h4>
                      <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. CALL TO ACTION - Modern Ribbon */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#155333] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {callToAction.title}
            </h4>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              {callToAction.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            {callToAction.primaryText && (
              <a
                href={callToAction.primaryLink || "#"}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 text-xs md:text-sm font-bold uppercase tracking-widest rounded-sm transition-colors shadow-lg shadow-yellow-500/20"
              >
                {callToAction.primaryText}
              </a>
            )}
            {callToAction.secondaryText && (
              <a
                href={callToAction.secondaryLink || "#"}
                className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-600 hover:border-white text-white text-xs md:text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-slate-900 transition-all"
              >
                {callToAction.secondaryText}
              </a>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
