import { useEffect, useState } from 'react';
import { Target, Flag, Zap, Users, Globe, BookOpen } from 'lucide-react';
import { client } from '../../sanityClient';

// Icon mapping for Lucide icons
const iconMap = {
  Users,
  Scale: Zap,
  Globe,
  Building2: BookOpen,
  TrendingUp: Zap,
  Target,
  Award: Zap,
  ArrowRight: Zap,
  Flag,
};

export default function AboutSection() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "aboutUs"][0]{
      whoWeAreTitle,
      whoWeAreMainText,
      visionTitle,
      visionStatement,
      missionTitle,
      missionStatement,
      thrustsTitle,
      thrusts[]{
        title,
        description,
        icon
      }
    }`;

    client
      .fetch(query)
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching about content:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 1. Header & Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-blue-950 mb-6">{content?.whoWeAreTitle || "About Us"}</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content?.whoWeAreMainText}
          </p>
        </div>

        {/* 2. Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="bg-blue-50 p-8 rounded-lg border-l-8 border-blue-900 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-900 p-3 rounded-full text-white">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-blue-950">{content?.visionTitle || "Our Vision"}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {content?.visionStatement}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-yellow-50 p-8 rounded-lg border-l-8 border-yellow-500 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-500 p-3 rounded-full text-blue-950">
                <Flag size={24} />
              </div>
              <h3 className="text-2xl font-bold text-blue-950">{content?.missionTitle || "Our Mission"}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {content?.missionStatement}
            </p>
          </div>
        </div>

        {/* 3. Organizational Thrusts */}
        <div>
          <h3 className="text-2xl font-bold text-center text-blue-950 mb-10">{content?.thrustsTitle || "Organizational Thrusts"}</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content?.thrusts && content.thrusts.length > 0 ? (
              content.thrusts.map((thrust, index) => {
                const Icon = iconMap[thrust.icon] || Users;
                return (
                  <div key={index} className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition hover:-translate-y-1">
                    <Icon className="text-yellow-500 mb-4 w-8 h-8" />
                    <h4 className="font-bold text-blue-900 mb-2">{thrust.title}</h4>
                    <p className="text-sm text-gray-600">{thrust.description}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600 col-span-full text-center">No thrusts available.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}