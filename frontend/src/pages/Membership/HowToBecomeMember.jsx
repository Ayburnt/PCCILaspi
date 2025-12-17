import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  Building2,
  UserCheck,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  FileText,
  ChevronDown,
  Info
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";

// Map of icon names from CMS to Lucide components
const iconMap = {
  Building2,
  UserCheck,
  ShieldCheck,
  Briefcase,
};

// --- MAIN PAGE COMPONENT ---
export default function HowToBecomeMember() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "membershipInfo"][0]{
      title,
      tagline,
      description,
      heroBackgroundImage {
        asset -> {
          _id,
          url
        },
        hotspot,
        crop
      },
      qualificationsTitle,
      qualifications[]{
        title,
        description,
        icon
      },
      requirementsTitle,
      requirements,
      requirementsNote,
      processTitle,
      processDescription,
      bankDetailsTitle,
      bankName,
      bankBranch,
      accountName
    }`;
    client
      .fetch(query)
      .then((data) => {
        setContent(data || null);
      })
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  const bgImage = useMemo(() => {
    if (content?.heroBackgroundImage) {
      try {
        return urlFor(content.heroBackgroundImage).width(2070).url();
      } catch (e) {
        // fall through to default
      }
    }
    return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";
  }, [content]);

  return (
    <div className="min-h-screen font-sans selection:bg-green-200 selection:text-slate-900">
      <TopBar />
      <Navbar />

      {/* GLOBAL BACKGROUND - Preserved as requested */}
      <div
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-400 text-sm font-medium tracking-wider uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              How to Become a Member?
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              {content?.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-500">
                {content?.tagline || "Elite of Las Pinas"}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
              {content?.description || (
                "Connect with industry leaders, influence policy, and grow your enterprise with the Philippine Chamber of Commerce and Industry - Makati."
              )}
            </p>

           <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              {/* Start Application Button with icon */}
              <button
                onClick={() =>
                  document
                    .getElementById("application-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                Start Application
                <ChevronDown className="w-6 h-6 text-white animate-bounce" />
              </button>

              {/* Download Requirements Button */}
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg font-semibold transition-all">
                Download Requirements
              </button>
            </div>
          </div>
        </section>

        {/* QUALIFICATIONS GRID */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {content?.qualificationsTitle || "Membership Qualifications"}
                </h2>
                <div className="h-1 w-20 bg-green-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(content?.qualifications || []).map((q, idx) => {
                  const Icon = iconMap[q.icon] || Building2;
                  return (
                    <div
                      key={idx}
                      className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green-500/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {q.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {q.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* --- MAIN APPLICATION SECTION (Revised for Responsiveness) --- */}
        <section
          id="application-section"
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                {content?.processTitle || (
                  <>
                    Application <span className="text-green-400">Process</span>
                  </>
                )}
              </h2>
              <p className="text-slate-300 max-w-3xl text-lg">
                {content?.processDescription || (
                  "Please prepare the requirements listed below. Once you have settled the membership dues, kindly fill out the application form."
                )}
              </p>
            </div>

            {/* THE FLEX CONTAINER: Left (Requirements & Bank) and Right (Ready to Apply) */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              
              {/* LEFT COLUMN: Requirements & Bank Info (5/12 width on desktop) */}
              <div className="lg:w-5/12 w-full space-y-6">
                
                {/* Requirements Card */}
                <div className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <FileText className="text-green-400" size={24} />{" "}
                      {content?.requirementsTitle || "Documentary Requirements"}
                    </h3>
                  </div>

                  <div className="grid gap-4">
                    {(content?.requirements || []).map((req, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                          <Check
                            size={12}
                            className="text-green-400"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-slate-300 text-sm font-medium">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                      {content?.requirementsNote && (
                      <p className="text-sm text-slate-400 italic">
                        <Info size={16} className="inline mr-1 text-green-500"/>
                        {content.requirementsNote}
                      </p>
                      )}
                  </div>
                </div>

                {/* Bank Details Mini Card (Always before the Ready to Apply card) */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h4 className="text-green-400 font-bold uppercase tracking-wider text-xs mb-4">{content?.bankDetailsTitle || "Bank Details for Payment"}</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Bank Name</p>
                            <p className="text-white font-semibold">{content?.bankName || "Banco de Oro (BDO)"}</p>
                            <p className="text-xs text-slate-400">{content?.bankBranch || "Arnaiz San Lorenzo Branch"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Account Name</p>
                            <p className="text-white font-semibold text-sm">{content?.accountName || "Philippine Chamber of Commerce and Industry – Makati City, Inc."}</p>
                        </div>
                    </div>
                </div>

              </div>

              {/* RIGHT COLUMN: READY TO APPLY CARD (7/12 width on desktop) */}
              <div className="lg:w-7/12 w-full">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border-t-4 border-green-500 flex flex-col items-center text-center space-y-6">
                  
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <FileText size={40} />
                  </div>

                  <h3 className="text-3xl font-bold text-slate-900">
                    Ready to Apply?
                  </h3>
                  
                  <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                    We have streamlined our membership process. Proceed to our online application page to view the fee schedule, confirm payment details, and submit your form.
                  </p>

                  <div className="w-full pt-4">
                    {/* Make sure '/join' matches the route in your App.js for the JoinPage component */}
                    <Link 
                      to="/join" 
                      className="group w-full bg-green-500 hover:bg-green-400 text-white py-4 font-bold uppercase rounded-xl transition-all shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-3 text-lg"
                    >
                      Proceed to Application 
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <p className="text-sm text-slate-400 pt-2">
                    Takes approximately 5-10 minutes
                  </p>

                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}