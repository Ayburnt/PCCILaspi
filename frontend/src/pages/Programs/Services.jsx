import React, { useEffect, useState } from "react";
import {
  Briefcase,
  FileText,
  ChevronRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { client } from "../../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Initialize Sanity Image Builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Services() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimized query to include Hero background and highlighted text
    const query = `*[_type == "servicesPage" && _id == "servicesPage"][0]{
      header{
        badgeText,
        title,
        highlightedText,
        description,
        backgroundImage{asset->, alt}
      },
      assurances,
      approachBox,
      processImage{asset->, alt},
      footerBanner,
      services[]{
        name,
        detail,
        category,
        icon{asset->, alt}
      }
    }`;

    client
      .fetch(query)
      .then((data) => {
        setPage(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[3px] border-slate-200 border-t-[#155333] rounded-full animate-spin"></div>
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Loading Services...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-[#155333] selection:text-white">
      <TopBar />
      <Navbar />

      {/* === 1. HERO SECTION === */}
      <header className="relative bg-[#064e3b] text-white overflow-hidden">
        {page?.header?.backgroundImage ? (
          <div className="absolute inset-0 opacity-30">
            <img
              src={urlFor(page.header.backgroundImage).width(1920).url()}
              alt={page.header.backgroundImage.alt || "Hero background"}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        )}

        {/* Decorative Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 z-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-24 pb-40 md:pb-52 flex flex-col items-start justify-center z-10">
          <div className="flex items-center gap-2 mb-6 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            <Briefcase size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              {page?.header?.badgeText || "Department Services"}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            {page?.header?.title} <br />
            <span className="text-yellow-400">
              {page?.header?.highlightedText}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed border-l-2 border-yellow-500/50 pl-6">
            {page?.header?.description}
          </p>
        </div>
      </header>

      {/* === 2. MAIN CONTENT (ELEVATED CARDS) === */}
      <main className="max-w-7xl mx-auto px-6 -mt-36 relative z-20 pb-24">
        
        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {(page?.services || []).map((service, index) => {
            const iconUrl = service.icon?.asset?.url || null;
            return (
              <div
                key={index}
                className="group relative bg-white border border-slate-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col rounded-lg overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#155333] group-hover:bg-yellow-500 transition-colors"></div>

                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-green-50 border border-green-100 rounded-md text-[#155333] group-hover:bg-[#155333] group-hover:text-white transition-all">
                      {iconUrl ? (
                        <img src={iconUrl} alt={service.icon?.alt} className="w-6 h-6 object-contain" />
                      ) : (
                        <Briefcase size={22} strokeWidth={1.5} />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-200 px-2 py-1 rounded-sm bg-slate-50">
                      {service.category || "General"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#155333] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.detail}
                  </p>
                </div>

                <div className="px-8 py-4 bg-slate-100 border-t border-slate-100 mt-auto">
                  <div className="flex items-center text-[#155333] text-sm font-semibold group-hover:underline decoration-yellow-500 underline-offset-4 cursor-pointer">
                    View Details <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* === 3. APPROACH & MANDATE SECTION === */}
        <div className="bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text Content */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6 text-[#155333]">
                <Activity className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest text-sm">Our Mandate</span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                {page?.approachBox?.title || "Strategic Implementation"}
              </h2>
              
              <p className="text-slate-600 text-base leading-relaxed mb-8 border-l-2 border-yellow-500 pl-4">
                {page?.approachBox?.description}
              </p>

              <div className="bg-slate-50 p-6 border border-slate-100 rounded-lg">
                <h4 className="text-sm font-bold text-slate-900 uppercase mb-4 border-b border-slate-200 pb-2">
                  Core Assurances
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {(page?.assurances || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <ShieldCheck className="w-5 h-5 text-[#155333] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative h-80 lg:h-auto bg-slate-200">
              {page?.processImage?.asset && (
                <img
                  src={urlFor(page.processImage).width(800).height(1000).url()}
                  alt={page.processImage.alt}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
                />
              )}
              <div className="absolute inset-0 bg-[#155333] opacity-20 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </main>

      {/* === 4. FOOTER BANNER === */}
      <div className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FileText className="w-12 h-12 text-slate-100 mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl font-serif text-slate-100 mb-8 leading-tight italic">
            "{page?.footerBanner?.quote}"
          </blockquote>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xs text-slate-400 uppercase tracking-[0.3em] font-bold">
            {page?.footerBanner?.note}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}