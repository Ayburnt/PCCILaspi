import React from "react";
import {
  Briefcase,
  TrendingUp,
  Globe,
  Info,
  HeartHandshake,
  PlusCircle,
  ChevronRight,
  Landmark,
  FileText,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const services = [
  {
    name: "Enterprise Development & Skills Upgrading",
    detail:
      "Elevating local competitiveness through professional training, advisory services, and one-on-one mentorship programs for SMEs.",
    icon: Briefcase,
    category: "Development",
  },
  {
    name: "Investment Promotion & Referrals",
    detail:
      "Organizing outbound and inbound trade missions, collateral development, and business referral services to strengthen local investment.",
    icon: TrendingUp,
    category: "Growth",
  },
  {
    name: "Trade Promotion & Matchmaking",
    detail:
      "Physical and virtual trade fairs, B2B matchmaking, and e-commerce platform implementation for wider market access.",
    icon: Globe,
    category: "Trade",
  },
  {
    name: "Information & Communication (IEC)",
    detail:
      "Providing industry forums, conferences, and publications while managing a robust members' database and digital platform engagement.",
    icon: Info,
    category: "Advocacy",
  },
  {
    name: "Corporate Social Responsibility (CSR)",
    detail:
      "Empowering specific sectors and local communities through dedicated social initiatives and community development endeavors.",
    icon: HeartHandshake,
    category: "Community",
  },
  {
    name: "Other Auxiliary Services",
    detail:
      "Business research, industry studies, awards and recognition, dispute resolution, and intellectual property registration assistance.",
    icon: PlusCircle,
    category: "Support",
  },
];

const assurances = [
  "Official representation with local and national government units",
  "Access to PCCI National and Regional trade networks",
  "Standardized business advisory and mentorship playbooks",
  "Diplomatic handling of business disputes and policy advocacy",
];

export default function Services() {
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
              PCCI-Las Piñas Services
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Services & Projects
          </h1>
          <p className="text-base md:text-xl text-slate-200 font-light max-w-3xl">
            PCCI-Las Piñas drives business growth and competitiveness.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        {/* 2. SERVICES CATALOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="group bg-white border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-all flex flex-col items-start"
              >
                <div className="mb-6 p-3 bg-slate-50 text-[#155333] border border-gray-100 group-hover:bg-[#155333] group-hover:text-white transition-colors duration-300">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-[0.2em] mb-2">
                  {service.category}
                </p>

                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#155333] transition-colors">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 ">
                  {service.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3. APPROACH & PROTOCOL SECTION */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Commitment Box */}
          <div className="bg-[#155333] p-8 md:p-12 text-white shadow-xl relative overflow-hidden order-2 lg:order-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -mr-12 -mt-12 rotate-45 hidden md:block" />

            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="text-yellow-500" />
              Institutional Mandate
            </h2>
            <p className="text-green-100/80 text-sm md:text-base leading-relaxed mb-8">
              Our service delivery is anchored on the Chamber's commitment to
              creating a conducive environment for business expansion through
              formal mentorship and strategic promotion.
            </p>
            <ul className="space-y-4">
              {assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-xs md:text-sm"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 bg-yellow-500 shrink-0" />
                  <span className="text-green-50">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process Box (Image) */}
          <div className="bg-white border border-gray-200 h-[250px] md:h-[400px] overflow-hidden order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="PCCI Process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 4. FORMAL FOOTER BANNER */}
      <div className="bg-slate-50 border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h4 className="text-base md:text-lg font-bold  text-[#155333] mb-4 md:mb-2 italic">
            "Building a Dynamic Business Community for a Prosperous Las Piñas."
          </h4>
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            For urgent business assistance or policy concerns, please contact
            our Technical Secretariat directly through our official channels.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
