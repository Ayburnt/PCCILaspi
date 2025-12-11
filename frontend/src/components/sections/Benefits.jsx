import { Shield, Users, BookOpen, TrendingUp } from 'lucide-react';

const BenefitItem = ({ icon: Icon, title, text }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900">
        <Icon size={24} />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

export default function Benefits() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join PSME Las Piñas?</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Just like the Chamber of Commerce supports businesses, we support the professional growth of Mechanical Engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <BenefitItem 
            icon={Shield} 
            title="Advocacy & Representation" 
            text="We actively advocate for the full implementation of RA 8495 (Mechanical Engineering Law) in Las Piñas, ensuring your license is respected and valued."
          />
          <BenefitItem 
            icon={Users} 
            title="Networking Opportunities" 
            text="Connect with fellow PMEs, RMEs, and CPMs. Access a network of industry leaders, suppliers, and potential employers within the South Metro area."
          />
          <BenefitItem 
            icon={BookOpen} 
            title="CPD & Education" 
            text="Regular technical seminars and workshops to keep your skills sharp and earn required CPD units for PRC license renewal."
          />
          <BenefitItem 
            icon={TrendingUp} 
            title="Business Development" 
            text="For engineering consultants and contractors, we provide direct support through referrals and industry matching programs."
          />
        </div>
      </div>
    </section>
  );
}