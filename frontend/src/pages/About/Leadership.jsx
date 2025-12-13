import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Badge } from 'lucide-react';
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

export default function Leadership() {
  const [board, setBoard] = useState({ title: 'Executive Board', description: '', members: [] });
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
        order
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

      {/* Leadership Grid */}
      <div className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{board?.title || 'Executive Board'}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {board?.description || 'Our dedicated team of business leaders guiding PCCI Las Piñas toward success'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading && (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-50 rounded-2xl h-96 border border-gray-100" />
              ))
            )}
            {!loading && board?.members?.map((leader, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="group text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl h-72 bg-slate-200">
                  {leader?.image ? (
                    <img 
                      src={urlFor(leader.image).width(600).height(450).url()} 
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Users size={40} strokeWidth={1.5} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{leader.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 uppercase tracking-wide text-sm">{leader.role}</p>
                {leader.bio && (
                  <p className="text-slate-500 text-sm leading-relaxed">{leader.bio}</p>
                )}
              </motion.div>
            ))}
            {!loading && (!board?.members || board.members.length === 0) && (
              <div className="col-span-4 text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No leadership members found</h3>
                <p className="text-slate-500 mt-1">Add members in Sanity Studio under Leadership Board.</p>
              </div>
            )}
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}
