import React from "react";
import {
  Briefcase,
  Landmark,
  Users,
  ShieldCheck,
  Award,
  ChevronRight,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const programTracks = [
  {
    title: "SME Development & Mentorship",
    description:
      "Technical assistance and 'Go Negosyo' style mentorship for Las Piñas micro-entrepreneurs to scale operations and improve market reach.",
    icon: Briefcase,
    badge: "Public-Private Initiative",
  },
  {
    title: "Advocacy & Policy Roundtable",
    description:
      "Representing member interests in LGU legislative hearings, focusing on business-friendly ordinances and local tax reforms.",
    icon: Landmark,
    badge: "Official Representation",
  },
  {
    title: "Regulatory Compliance Clinic",
    description:
      "Assistance with business permit renewals, DTI/SEC compliance, and understanding new national government mandates.",
    icon: ShieldCheck,
    badge: "Technical Assistance",
  },
  {
    title: "Trade & Networking Exchange",
    description:
      "B2B matching events and trade fairs connecting local suppliers with larger supply chains across the NCR.",
    icon: Users,
    badge: "Member Exclusive",
  },
];

const impactSignals = [
  {
    label: "Active Members",
    value: "500+",
    detail: "Businesses represented in Las Piñas",
  },
  {
    label: "LGU Resolutions",
    value: "12",
    detail: "Advocacy papers submitted in 2024",
  },
  {
    label: "Network Reach",
    value: "Regional",
    detail: "Affiliated with PCCI National & NCR",
  },
  {
    label: "Trade Volume",
    value: "₱12M+",
    detail: "Facilitated through chamber trade fairs",
  },
];

const journey = [
  {
    title: "Consultation",
    text: "Member businesses present specific constraints or regulatory hurdles to the Secretariat.",
  },
  {
    title: "Strategic Planning",
    text: "Our board committees align requests with current LGU policies and Chamber resources.",
  },
  {
    title: "Mobilization",
    text: "Execution of seminars, trade missions, or direct representation with government agencies.",
  },
  {
    title: "Evaluation",
    text: "Review of outcomes to ensure long-term business sustainability for our members.",
  },
];

export default function Programs() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900">
      <TopBar />
      <Navbar />

      {/* HEADER SECTION: Formal Government/Corporate Style */}
      <header className="bg-[#1a4031] text-white pt-16 pb-20 relative overflow-hidden">
        {/* Background Pattern for Texture */}
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
              Official Programs
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Advancing the Interests of Las Piñas City
          </h1>
          <p className="text-base md:text-xl text-slate-200 font-light max-w-3xl">
            Supports a competitive, sustainable, and responsible business
            community.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* 2. PROGRAM TRACKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 mt-[-1rem] md:mt-8 shadow-2xl border border-gray-200 relative z-20">
          {programTracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.title}
                className="bg-white p-6 md:p-8 flex flex-col gap-4 group hover:bg-slate-50 transition-colors"
              >
                <div className="inline-flex items-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-yellow-600 border border-yellow-200 px-2 py-1 w-fit bg-yellow-50">
                  {track.badge}
                </div>
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
                <button className="mt-4 md:mt-auto inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#155333] hover:text-yellow-600">
                  Request Information <ChevronRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* 3 & 4. PERFORMANCE & ROADMAP SECTION */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Performance Data */}
          <div className="lg:col-span-5 bg-white border-t-4 border-[#155333] p-6 md:p-8 shadow-md order-2 lg:order-1">
            <p className="uppercase text-[10px] font-bold tracking-[0.2em] text-[#155333] mb-2">
              Chamber Performance
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6">
              Strategic Impact Data
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {impactSignals.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-slate-100 pb-4"
                >
                  <div className="pr-4">
                    <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-600 italic">
                      {item.detail}
                    </p>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-[#155333] whitespace-nowrap">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-slate-50 border-l-4 border-slate-300">
              <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">
                * Figures based on the 2024 Annual Secretary’s Report. Verified
                by the PCCI-NCR Membership Committee.
              </p>
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Service Implementation Roadmap
              </h3>
              <div className="h-1 w-20 bg-yellow-500 mt-2"></div>
              <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                PCCI-Las Piñas adheres to a disciplined delivery framework to
                ensure every program provides tangible value to the local
                business community.
              </p>
            </div>

            <div className="space-y-4">
              {journey.map((step, idx) => (
                <div
                  key={step.title}
                  className="flex gap-4 md:gap-6 p-5 md:p-6 bg-white border border-gray-100 hover:border-gray-300 transition-all shadow-sm"
                >
                  <div className="text-2xl md:text-3xl font-bold text-slate-200 italic shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-slate-900 uppercase tracking-wide">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. CALL TO ACTION */}
      <div className="bg-[#f1f1f1] py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
          <div className="max-w-md">
            <h4 className="text-xl font-bold text-[#155333]">
              Collaborate with the Chamber
            </h4>
            <p className="text-slate-600 text-sm mt-1">
              Join our specialized committees or enroll your business in our
              programs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="w-full md:w-auto px-6 py-3 bg-[#155333] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition">
              Contact
            </button>
            <button className="w-full md:w-auto px-6 py-3 border border-[#155333] text-[#155333] text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white transition">
              View FAQ
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
