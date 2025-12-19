import React from "react";
import {
  Landmark,
  Scale,
  ArrowRight,
  TrendingUp,
  Leaf,
  FileText,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const advocacyPillars = [
  {
    title: "Legislative Advocacy",
    description:
      "Actively representing the business sector in the formulation of local ordinances and national policies to ensure a pro-enterprise environment.",
    icon: Landmark,
  },
  {
    title: "Economic Integration",
    description:
      "Creating pathways for MSMEs to integrate into global value chains through trade liberalization and market access initiatives.",
    icon: TrendingUp,
  },
  {
    title: "Environmental Governance",
    description:
      "Promoting the Sustainable Development Goals (SDGs) and climate resilience within the local industrial sectors.",
    icon: Leaf,
  },
  {
    title: "Ethical Leadership",
    description:
      "Championing Corporate Good Governance and Intellectual Property rights to foster a culture of integrity and innovation.",
    icon: Scale,
  },
];

const sectoralMandate = [
  ["Agriculture & Fishery", "Banking & Finance", "Energy and Power", "Environment"],
  ["Industry & Trade", "Infrastructure", "Science & Technology", "MSME Development"],
  ["Tourism", "Retail & Franchise", "Transport & Logistics", "Youth & IP"],
];

const currentInitiatives = [
  {
    title: "Local Government Dialogue",
    description:
      "Bi-annual consultative sessions with the Las Piñas City Council regarding business permit streamlining and local taxation.",
    status: "Active Mandate",
  },
  {
    title: "Digital Transformation Roadmap",
    description:
      "Assisting traditional retail and franchise sectors in adopting secure, scalable financial technologies.",
    status: "Quarterly Program",
  },
  {
    title: "Green Industry Initiative",
    description:
      "Policy advocacy for incentives for businesses adopting renewable energy and sustainable waste management.",
    status: "Policy Focus",
  },
];

export default function Advocacy() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <TopBar />
      <Navbar />

      {/* 1. INSTITUTIONAL HERO SECTION */}
      <div className="relative bg-[#155333] border-b-4 border-yellow-500 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16 relative z-10">
          <div className="flex items-center gap-2 text-yellow-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <div className="h-px w-6 md:w-8 bg-yellow-500"></div>
            PCCI-Las Piñas Advocacy
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-serif text-white max-w-4xl leading-tight">
            Driving Change Together
          </h1>

          <p className="mt-6 md:mt-8 text-sm md:text-lg text-green-50/80 max-w-3xl font-sans leading-relaxed italic border-l-4 border-yellow-500 pl-4 md:pl-6">
            "Provide a high-level summary or mission statement that defines the
            organization's purpose and its commitment to the stakeholders or
            community it serves."
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-16">
        
        {/* Advocacy Pillars - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 shadow-xl">
          {advocacyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`bg-white p-6 md:p-8 border-slate-200 
                  ${idx !== advocacyPillars.length - 1 ? 'border-b sm:border-r lg:last:border-r-0' : ''}`}
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-900 flex items-center justify-center mb-6">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-4 uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-[1.6] font-sans">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sectoral Representation Section */}
        <div className="mt-20 md:mt-32">
          <div className="flex flex-col items-center text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tighter">
              Sectoral Representation
            </h2>
            <div className="h-1 w-16 bg-emerald-800 mt-4"></div>
            <p className="mt-6 text-slate-600 max-w-2xl font-sans text-sm md:text-base">
              Our advocacy initiatives span across diverse economic pillars,
              ensuring comprehensive support for every facet of the Las Piñas
              business landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 bg-white border border-slate-200 p-8 md:p-12 shadow-sm">
            {sectoralMandate.map((column, idx) => (
              <ul key={idx} className="space-y-4">
                {column.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-sans font-medium text-sm md:text-base">
                    <div className="w-1.5 h-1.5 bg-yellow-600 rotate-45 shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Strategic Initiatives - Formal List */}
        <div className="mt-20 md:mt-32">
          <div className="bg-[#31694E] text-white p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
              <FileText className="text-yellow-500" />
              Strategic Initiatives & Programs
            </h2>
          </div>
          <div className="bg-white border border-slate-200">
            {currentInitiatives.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-6 md:p-8 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <div className="max-w-2xl mb-6 lg:mb-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 font-sans border border-emerald-200 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 mt-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 mt-1 font-sans text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-emerald-800 font-bold text-xs md:text-sm uppercase tracking-wider group self-start lg:self-center">
                   Details
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Official Action Cards */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          <div className="border-t-4 border-emerald-800 pt-8 flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Policy Dialogue Participation
            </h3>
            <p className="mt-4 text-slate-600 font-sans leading-relaxed text-sm md:text-base grow">
              PCCI-Las Piñas members are invited to participate in technical
              working groups and public hearings. Your industry insights are
              vital for formulating effective policy responses.
            </p>
            <a
              href="#"
              className="mt-6 inline-block bg-emerald-800 text-white text-center px-8 py-3 font-sans font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-emerald-900 transition shadow-md"
            >
              Apply for Committee
            </a>
          </div>

          <div className="border-t-4 border-yellow-600 pt-8 flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Regulatory Updates
            </h3>
            <p className="mt-4 text-slate-600 font-sans leading-relaxed text-sm md:text-base grow">
              Stay informed on the latest circulars from the DTI, BIR, and Local Government
              Unit mandates affecting your corporate operations.
            </p>
            <a
              href="#"
              className="mt-6 inline-block border-2 border-slate-900 text-slate-900 text-center px-8 py-3 font-sans font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition"
            >
              Subscribe to Briefings
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}