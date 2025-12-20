// frontend/src/pages/Programs/Advocacy.jsx
import React, { useState, useEffect } from "react";
import {
  Building2,
  Waves,
  FileCheck,
  Ban,
  Smartphone,
  Users,
  CarFront,
  GraduationCap,
  ChevronRight,
  Printer,
  Download,
  Target,
  Quote,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import sanityClient from "../../sanityClient";
import { Link } from "react-router-dom";

// Icon mapping
const iconMap = {
  Waves,
  FileCheck,
  Ban,
  Smartphone,
  Users,
  CarFront,
  GraduationCap,
  Building2,
};

// Image URL builder
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

// Portable Text components
const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mb-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function AdvocacyPage() {
  const [advocacyPage, setAdvocacyPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdvocacyData();
  }, []);

  const fetchAdvocacyData = async () => {
    try {
      setLoading(true);
      const query = `*[_type == "advocacyPage" && _id == "advocacyPage"][0] {
        heroSection,
        executiveSummary {
          ...,
          agendaPdf {
            asset-> {
              _id,
              url,
              originalFilename
            }
          }
        },
        programs[] {
          order,
          localTitle,
          engTitle,
          icon,
          image,
          content,
          isActive,
          positionPaper {
            asset-> {
              _id,
              url,
              originalFilename
            }
          }
        } | order(order asc),
        callToAction
      }`;
      
      const data = await sanityClient.fetch(query);
      setAdvocacyPage(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching advocacy data:", err);
      setError("Failed to load advocacy page");
      setLoading(false);
    }
  };

  const handleDownloadPDF = (pdfAsset, filename) => {
    if (pdfAsset?.url) {
      const link = document.createElement('a');
      link.href = pdfAsset.url;
      link.download = pdfAsset.originalFilename || filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("PDF not available.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#064e3b]"></div>
            <p className="mt-4 text-slate-600">Loading advocacy page...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !advocacyPage) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-red-600">
            <p className="text-xl font-semibold">{error || "Content not found"}</p>
            <button 
              onClick={fetchAdvocacyData}
              className="mt-4 px-6 py-2 bg-[#064e3b] text-white rounded hover:bg-[#065f4a]"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { heroSection, executiveSummary, programs, callToAction } = advocacyPage;
  const activePrograms = programs?.filter(p => p.isActive) || [];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* === HERO SECTION === */}
      <div className="relative bg-[#064e3b] text-white overflow-hidden">
        {heroSection?.backgroundImage ? (
          <div className="absolute inset-0 opacity-30">
            <img
              src={urlFor(heroSection.backgroundImage).width(1920).url()}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        )}
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-24 flex flex-col items-start justify-center">
          <div className="flex items-center gap-2 mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            <Building2 size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              {heroSection?.badge || 'Chamber Advocacy Series 2025'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            {heroSection?.title || 'Building a Resilient'} <br />
            <span className="text-yellow-400">
              {heroSection?.highlightedText || 'Business Community'}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed">
            {heroSection?.subtitle || 'PCCI-Las Piñas is dedicated to shaping policies that foster economic growth, sustainability, and innovation in the city.'}
          </p>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 pb-20">
        {/* EXECUTIVE SUMMARY BOX */}
        <section className="bg-white rounded-sm shadow-xl border-t-4 border-yellow-500 p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-8">
              <h2 className="text-2xl font-serif font-bold text-[#064e3b] mb-2">
                {executiveSummary?.mandateTitle || 'Our Mandate'}
              </h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                {executiveSummary?.mandateSubtitle || 'Mission Statement'}
              </p>
              <div className="flex flex-col gap-3">
                {executiveSummary?.agendaPdf?.asset?.url && (
                  <button 
                    onClick={() => handleDownloadPDF(executiveSummary.agendaPdf.asset, '2025-Agenda.pdf')}
                    className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-[#064e3b] group transition-colors"
                  >
                    <span className="bg-slate-100 p-2 rounded group-hover:bg-[#064e3b] group-hover:text-white transition-colors">
                      <Download size={16} />
                    </span>
                    {executiveSummary?.downloadAgendaLabel || 'Download 2025 Agenda (PDF)'}
                  </button>
                )}
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-[#064e3b] group transition-colors"
                >
                  <span className="bg-slate-100 p-2 rounded group-hover:bg-[#064e3b] group-hover:text-white transition-colors">
                    <Printer size={16} />
                  </span>
                  {executiveSummary?.printSummaryLabel || 'Print Summary'}
                </button>
              </div>
            </div>
            <div className="md:w-2/3">
              <Quote className="text-yellow-500 mb-4 w-10 h-10 opacity-50" />
              <p className="text-lg text-slate-700 leading-relaxed font-light italic">
                "{executiveSummary?.quoteText || 'The Philippine Chamber of Commerce and Industry - Las Piñas is committed to advocating for policies that support local businesses. Our agenda is designed to create a more resilient, efficient, and prosperous city for all stakeholders.'}"
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px bg-slate-300 flex-1"></div>
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Official Policy Document
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA GRID - ALTERNATING OR CARDS */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <Target className="text-[#064e3b] w-8 h-8" />
            <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
              Priority Programs & Action Plans
            </h3>
          </div>

          {activePrograms.map((item, index) => {
            const Icon = iconMap[item.icon] || Building2;
            const imageUrl = item.image ? urlFor(item.image).width(800).url() : null;
            
            return (
              <div
                key={index}
                className="group bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
              >
                {/* LEFT: TITLE & META */}
                <div className="md:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#064e3b] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white rounded shadow-sm text-[#064e3b]">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-slate-200 select-none">
                        0{item.order}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-[#064e3b] mb-1 leading-tight">
                      {item.localTitle}
                    </h4>
                    <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                      {item.engTitle}
                    </h5>
                  </div>

                  {/* Mobile Image (Visible only on small screens) */}
                  {imageUrl && (
                    <div className="md:hidden mt-4 h-60 w-full rounded overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={item.engTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="hidden md:block mt-8">
                    <span className="text-xs text-slate-400 flex items-center gap-1 uppercase">
                      ACTIVE MANDATE
                    </span>
                  </div>
                </div>

                {/* MIDDLE: CONTENT */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="prose prose-slate prose-sm md:prose-base max-w-none text-slate-600 text-justify leading-relaxed">
                    <PortableText 
                      value={item.content} 
                      components={portableTextComponents}
                    />
                  </div>
                  
                  {/* Mobile Download Button */}
                  {item.positionPaper?.asset?.url && (
                    <div className="md:hidden mt-6">
                      <button 
                        onClick={() => handleDownloadPDF(item.positionPaper.asset, `${item.engTitle}.pdf`)}
                        className="w-full px-4 py-2 bg-[#064e3b] text-white rounded text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#065f4a] transition-colors"
                      >
                        <Download size={16} />
                        Download Position Paper
                      </button>
                    </div>
                  )}
                </div>

                {/* RIGHT: DESKTOP IMAGE VISUAL */}
                {imageUrl && (
                  <div className="hidden md:block md:w-2/6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#064e3b]/10 group-hover:bg-[#064e3b]/0 transition-colors z-10"></div>
                    <img
                      src={imageUrl}
                      alt={item.engTitle}
                      className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* CALL TO ACTION */}
      <section className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-white font-serif font-bold mb-4">
            {callToAction?.title || 'Partner with Us for Change'}
          </h2>
          <p className="mb-8 font-light text-lg">
            {callToAction?.description || 'Are you a business owner in Las Piñas? Join our committees and help shape the policies that affect your industry.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={callToAction?.primaryButtonLink || '/join'}
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors"
            >
              {callToAction?.primaryButtonText || 'Become a Member'}
            </Link>
            <Link
              to={callToAction?.secondaryButtonLink || '/contact'}
              className="border border-slate-600 hover:border-white text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors"
            >
              {callToAction?.secondaryButtonText || 'Contact Secretariat'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}