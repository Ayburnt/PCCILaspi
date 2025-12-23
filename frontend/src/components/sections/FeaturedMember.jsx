import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../sanityClient'; 

const FeaturedMember = () => {
  const [featuredMembers, setFeaturedMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "member" && featured == true]{
      company,
      logo,
      "slug": slug.current
    }`;

    client.fetch(query).then((data) => {
      setFeaturedMembers(data);
      setLoading(false);
    });
  }, []);

  if (loading || featuredMembers.length === 0) return null;

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center">
          
          {/* Title Section - Z-index para hindi matakpan */}
          <div className="w-full md:w-auto md:flex-shrink-0 md:border-r md:border-gray-300 mb-8 md:mb-0 md:pr-10 text-center md:text-left z-20 bg-white">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">
              Members Directory
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 leading-tight">
              Featured <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Members
              </span>
            </h2>
          </div>

          {/* Marquee Container */}
          <div className="w-full md:flex-1 overflow-hidden relative h-20 flex items-center">
            <motion.div 
              className="flex gap-24 items-center whitespace-nowrap"
              initial={{ x: "100%" }} // Magsisimula sa pinaka-kanan (Right)
              animate={{ x: "-100%" }} // Pupunta sa pinaka-kaliwa (Left)
              transition={{
                repeat: Infinity,
                duration: 20, // Bilis ng takbo (taasan para bumagal)
                ease: "linear",
              }}
            >
              {featuredMembers.map((member, index) => (
                <Link 
                  key={index} 
                  to={`/member/${member.slug}`} 
                  className="flex-shrink-0 inline-block"
                >
                  {member.logo ? (
                    <img
                      src={urlFor(member.logo).height(160).url()}
                      alt={member.company}
                      className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-110 cursor-pointer"
                      // Walang filter-grayscale para manatili ang kulay
                    />
                  ) : (
                    <span className="font-bold text-gray-400 text-lg hover:text-blue-600 transition-colors">
                      {member.company}
                    </span>
                  )}
                </Link>
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FeaturedMember;