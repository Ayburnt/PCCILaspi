import { Target, Flag, Zap, Users, Globe, BookOpen } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 1. Header & Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-blue-950 mb-6">About Us</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            The <span className="font-bold text-blue-900">Philippine Chamber of Commerce and Industry (PCCI) Las Piñas City, Inc.</span> is a non-stock, non-profit, non-government business organization. We are comprised of small, medium, and large enterprises representing various sectors, all working together to foster a healthier economy and improve business viability in our community.
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
              <h3 className="text-2xl font-bold text-blue-950">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              PCCI is the voice of Philippine business recognized by government and international institutions. As a proactive catalyst of development, PCCI promotes and supports the drive for globally competitive Philippine enterprises in partnership with government, local chambers, and other business organizations.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-yellow-50 p-8 rounded-lg border-l-8 border-yellow-500 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-500 p-3 rounded-full text-blue-950">
                <Flag size={24} />
              </div>
              <h3 className="text-2xl font-bold text-blue-950">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To provide focused advocacy for business growth and sustainable development by providing business services for the advancement of grassroots entrepreneurship, chamber development, international trade relations, business innovation, and operating efficiency.
            </p>
          </div>
        </div>

        {/* 3. Organizational Thrusts */}
        <div>
          <h3 className="text-2xl font-bold text-center text-blue-950 mb-10">Organizational Thrusts</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition hover:-translate-y-1">
              <Zap className="text-yellow-500 mb-4 w-8 h-8" />
              <h4 className="font-bold text-blue-900 mb-2">MSME Growth</h4>
              <p className="text-sm text-gray-600">Steadfast support for the promotion and growth of micro, small and medium enterprises nationwide.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition hover:-translate-y-1">
              <BookOpen className="text-yellow-500 mb-4 w-8 h-8" />
              <h4 className="font-bold text-blue-900 mb-2">Policy Reform</h4>
              <p className="text-sm text-gray-600">Pioneer policy reform initiatives to improve the business climate and sustain socio-economic development.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition hover:-translate-y-1">
              <Globe className="text-yellow-500 mb-4 w-8 h-8" />
              <h4 className="font-bold text-blue-900 mb-2">Global Networking</h4>
              <p className="text-sm text-gray-600">Spearhead national and international networking through business matching, trade missions, and information sharing.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition hover:-translate-y-1">
              <Users className="text-yellow-500 mb-4 w-8 h-8" />
              <h4 className="font-bold text-blue-900 mb-2">Capacity Building</h4>
              <p className="text-sm text-gray-600">Support capability building for local chambers and industry associations.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}