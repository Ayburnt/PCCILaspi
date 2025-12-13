import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TopBar from "../components/layout/TopBar";
import MembershipForm from "../components/sections/MembershipForm";
import {
  Download,
  ArrowRight,
  ArrowLeft,
  Users,
  Briefcase,
  Globe,
  Handshake,
  CheckCircle,
  Quote,
} from "lucide-react";

const JoinPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <TopBar />
      <Navbar />

      {/* ================= HERO SECTION WITH PHOTO BACKGROUND ================= */}
      <div className="relative bg-blue-900 h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            alt="PCCI Manila Meeting"
            className="w-full h-full object-cover opacity-40"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-blue-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center -mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400 text-blue-100 text-sm font-semibold mb-4 backdrop-blur-sm">
            Join the Premier Business Chamber
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white">
            Be a PCCI-Las Pinas <br className="hidden md:block" /> Member
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Connect with industry leaders, influence policy, and accelerate your
            business growth.
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      {/* This container overlaps the hero section for a modern look */}
      <div className="max-w-6xl mx-auto px-4 pb-20 relative z-20 -mt-20">
        {/* VIEW TOGGLE LOGIC */}
        {showForm ? (
          /* ================= FORM VIEW ================= */
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 animate-fade-in-up">
            <button
              onClick={() => setShowForm(false)}
              className="group mb-8 text-gray-500 hover:text-blue-900 flex items-center gap-2 font-medium transition-colors"
            >
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                <ArrowLeft size={20} />
              </div>
              Back to Overview
            </button>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                  Membership Application
                </h2>
                <p className="text-gray-500 mt-2">
                  Please fill out the details below to begin your journey.
                </p>
              </div>
              <MembershipForm />
            </div>
          </div>
        ) : (
          /* ================= OVERVIEW VIEW ================= */
          <div className="space-y-12">
          {/* 1. APPLICATION PROCESS (MODERN OVERLAY STYLE) */}
<section className="relative bg-white rounded-2xl shadow-2xl p-10 md:p-16 overflow-hidden">

  {/* Soft background glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100 opacity-70 pointer-events-none" />

  <div className="relative z-10">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold tracking-wide">
        Application Process
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        How to Become a PCCI-Manila Member
      </h2>
      <p className="text-gray-600 text-lg">
        A clear, guided process designed for application.
      </p>
    </div>

    {/* Steps */}
    <div className="relative grid md:grid-cols-4 gap-10">

      {/* MAIN PROGRESS LINE */}
      <div className="hidden md:block absolute top-[30px] left-0 w-full h-[3px] bg-gradient-to-r from-blue-200 via-blue-500 to-indigo-400 rounded-full" />

      {[
        {
          step: '01',
          title: 'Submit Application',
          desc: 'Complete the online membership form with your business details.',
        },
        {
          step: '02',
          title: 'Application Review',
          desc: 'Our membership committee evaluates your submission.',
        },
        {
          step: '03',
          title: 'Payment Process',
          desc: 'Receive your invoice and payment instructions.',
        },
        {
          step: '04',
          title: 'Welcome Onboard',
          desc: 'Get your certificate and unlock member benefits.',
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className="relative flex flex-col items-center text-center"
        >
          {/* STEP NODE */}
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-lg shadow-xl ring-4 ring-white">
              {item.step}
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl -z-10" />
          </div>

          {/* CARD */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-xs">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


            <div className="grid lg:grid-cols-2 gap-8">
              {/* 3. TESTIMONIALS */}
              <section className="bg-white rounded-2xl shadow-md p-8 border-l-8 border-blue-900">
                <div className="flex items-center gap-3 mb-6">
                  <Quote className="text-blue-200 fill-current" size={40} />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Member Stories
                  </h2>
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                      "Joining PCCI-Las Piñas was one of the best business
                      decisions we've made. The connections have been
                      invaluable."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                        MS
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Maria Santos</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          CEO, TechVision Solutions
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="relative">
                    <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                      "As a small business, we weren’t sure if it would be worth
                      it—but PCCI-Las Piñas proved its value many times over."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                        AR
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Antonio Reyes</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Founder, Green Earth
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. CALL TO ACTION CARD */}
              <section className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl p-8 text-white flex flex-col justify-center items-center text-center">
                <CheckCircle size={48} className="text-blue-300 mb-6" />
                <h2 className="text-3xl font-bold mb-4">Ready to Grow?</h2>
                <p className="text-blue-100 mb-8 max-w-md">
                  Take the first step toward expanding your network and securing
                  your business future.
                </p>

                <div className="w-full space-y-4 max-w-xs">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-white text-blue-900 px-6 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    Apply for Membership <ArrowRight size={20} />
                  </button>

                  <a
                    href="/membership-form.pdf"
                    download
                    className="w-full border border-blue-400/50 bg-blue-800/50 backdrop-blur-sm px-6 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Download size={18} /> Download PDF Form
                  </a>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JoinPage;
