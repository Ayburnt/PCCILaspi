import { useEffect, useState } from 'react';
import { Target, Flag, Zap, Users, Globe, BookOpen } from 'lucide-react';
import { client } from '../../sanityClient';

// Icon mapping: Ensure the keys match the strings selected in your Sanity Studio
const iconMap = {
  Users: Users,
  Scale: Zap,
  Globe: Globe,
  Building2: BookOpen,
  TrendingUp: Zap,
  Target: Target,
  Award: Zap,
  ArrowRight: Zap,
  Flag: Flag,
};

export default function AboutSection() {
  const [thrusts, setThrusts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. OPTIMIZATION: Only fetch the data we actually render (thrusts)
    const query = `*[_type == "aboutUs"][0]{
      thrusts[]{
        title,
        description,
        icon
      }
    }`;

    client
      .fetch(query)
      .then((data) => {
        // Safety check in case data is null
        setThrusts(data?.thrusts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching thrusts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="flex justify-center items-center">
          {/* Spinner: Changed to specific logo green */}
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#155333]"></div>
        </div>
      </section>
    );
  }

  // If no thrusts exist, return null or an empty fragment to avoid layout shifts
  if (!thrusts || thrusts.length === 0) {
    return null;
  }

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Optional: Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Organizational Thrusts</h2>
          {/* Divider: Changed to logo green */}
          <div className="mt-2 w-24 h-1 bg-[#155333] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {thrusts.map((thrust, index) => {
            // Fallback to Users icon if the sanity icon string doesn't match
            const Icon = iconMap[thrust.icon] || Users;

            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-xl p-6 h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* 2. UI: Animated Top Gradient Border - Logo Green to Lighter Green */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#155333] to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                
                {/* 3. UI: Styled Icon Container - Green Theme */}
                <div className="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-6 group-hover:bg-[#155333] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#155333] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#155333] transition-colors">
                  {thrust.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {thrust.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}