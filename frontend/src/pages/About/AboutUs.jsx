import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Scale,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Target,
  Flag,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[15vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="PCCI Las Piñas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-blue-900/85" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-xs md:text-sm font-semibold tracking-wider mb-6 uppercase text-blue-200">
              <Building2 size={14} />
              Las Piñas City Chapter
            </span>
          </motion.div>
        </div>
      </div>

      {/* Purpose / Who We Are */}
      <div className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h4 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">
                About Us
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Who We Are
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  The{" "}
                  <span className="font-semibold text-slate-900">
                    Philippine Chamber of Commerce and Industry (PCCI) Las Piñas
                    City, Inc.
                  </span>{" "}
                  is a non-stock, non-profit, non-government business
                  organization.
                </p>
                <p className="mb-6">
                  We are comprised of small, medium, and large enterprises
                  representing various sectors of business, all working together
                  to foster a healthier Philippine economy and improve the
                  viability of business in the community.
                </p>
              </div>

              <div className="bg-slate-50 border-l-4 border-amber-400 p-6 rounded-r-lg mt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Award className="text-amber-500" size={20} /> Trusted
                  Affiliation
                </h3>
                <p className="text-slate-600 text-sm">
                  PCCI Las Piñas City Inc. is a proud affiliate organization of
                  the national{" "}
                  <span className="font-semibold">
                    Philippine Chamber of Commerce and Industry (PCCI)
                  </span>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
                  alt="Business Meeting"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/10"></div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden md:block">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  PCCI
                </div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                  Las Piñas City
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* 2. Vision & Mission */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-blue-50 p-8 md:p-10 rounded-xl border-l-8 border-blue-900 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-900 p-3 rounded-full text-white">
                    <Target size={22} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-950">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  PCCI is the recognized voice of Philippine business among
                  government and international institutions. As a proactive
                  catalyst for development, it promotes globally competitive
                  Philippine enterprises through strong partnerships with
                  government, local chambers, and other business organizations.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-yellow-50 p-8 md:p-10 rounded-xl border-l-8 border-yellow-500 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-yellow-500 p-3 rounded-full text-blue-950">
                    <Flag size={22} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-950">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  To provide focused advocacy for business growth and
                  sustainable development by delivering essential business
                  services that advance grassroots entrepreneurship, chamber
                  development, international trade relations, business
                  innovation, and operational efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organizational Thrusts (Replaces Core Values) */}
      <div className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Organizational Thrusts
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              To operationalize our MISSION and VISION, PCCI adopts the
              following strategic thrusts:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "MSME Support",
                description:
                  "Steadfast support for the promotion and growth of micro, small and medium enterprises nationwide.",
              },
              {
                icon: Scale,
                title: "Policy Reform",
                description:
                  "Pioneer policy reform initiatives to improve the business climate and sustain socio-economic development.",
              },
              {
                icon: Globe,
                title: "Global Networking",
                description:
                  "Spearhead national and international networking through business matching, trade missions, and information sharing.",
              },
              {
                icon: Building2,
                title: "Capability Building",
                description:
                  "Support capability building for local chambers and industry associations.",
              },
            ].map((thrust, index) => {
              const Icon = thrust.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                        {thrust.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {thrust.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
