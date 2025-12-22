import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';
import { client } from '../../sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// Helper Component for Social Icons
const SocialIcon = ({ href, Icon, delay }) => {
  // If no href, we render a 'span' (non-clickable) instead of an 'a' tag
  const isPlaceholder = !href || href.trim() === '';

  const commonClasses = `w-9 h-9 rounded-full flex items-center justify-center shadow-lg 
    transform -translate-x-16 group-hover:translate-x-0 transition-all duration-300 ease-out ${delay}`;

  if (isPlaceholder) {
    return (
      <div className={`${commonClasses} bg-white text-slate-300 cursor-not-allowed`}>
        <Icon size={18} />
      </div>
    );
  }

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${commonClasses} bg-white text-slate-700 hover:bg-blue-600 hover:text-white`}
    >
      <Icon size={18} />
    </a>
  );
};

export default function Leadership() {
  const [board, setBoard] = useState({ title: '', description: '', members: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "leadershipBoard"][0]{
      title,
      description,
      members[] | order(order asc){
        name,
        role,
        bio,
        image,
        order,
        socials
      }
    }`;

    client.fetch(query)
      .then((data) => {
        setBoard(data || { title: 'Executive Board', description: '', members: [] });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <TopBar />
      <Navbar />

      <div className="py-20 bg-white mb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{board?.title}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {board?.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-50 rounded-2xl h-[450px] border border-gray-100" />
              ))
            ) : board?.members?.map((leader, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl shadow-sm aspect-[4/5] bg-slate-200">
                  {leader?.image ? (
                    <img 
                      src={urlFor(leader.image).width(500).height(625).url()} 
                      alt={leader.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Users size={60} strokeWidth={1} />
                    </div>
                  )}

                  {/* Social Icons Overlay - Only renders if URL exists */}
                  <div className="absolute top-4 left-4 flex flex-col gap-3 z-10">
                    <SocialIcon href={leader.socials?.facebook} Icon={Facebook} delay="delay-0" />
                    <SocialIcon href={leader.socials?.twitter} Icon={Twitter} delay="delay-75" />
                    <SocialIcon href={leader.socials?.instagram} Icon={Instagram} delay="delay-100" />
                    <SocialIcon href={leader.socials?.linkedin} Icon={Linkedin} delay="delay-150" />
                  </div>

                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="text-center px-2 mb-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-3 min-h-[40px] flex items-center justify-center">
                    {leader.role}
                  </p>
                  
                  {leader.bio && (
                    <p className="text-slate-500 text-sm leading-relaxed border-t pt-3 mt-2">
                      {leader.bio}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {!loading && board?.members?.length === 0 && (
            <div className="text-center py-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Users size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No leadership members found</h3>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}