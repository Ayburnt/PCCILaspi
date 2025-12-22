import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const isSingle = featuredMembers.length === 1;
  const displayLogos = isSingle ? featuredMembers : [...featuredMembers, ...featuredMembers];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-8">
        
        <div className="flex flex-col md:flex-row items-center">
          
          <div className="w-full md:w-auto md:flex-shrink-0 md:border-r md:border-gray-300 mb-8 md:mb-0 md:pr-10 text-center md:text-left z-20 bg-white">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">
              Our Members
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 leading-tight">
              Featured <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Members</span>
            </h2>
          </div>

          <div className="w-full md:flex-1 md:pl-10 overflow-hidden relative ">
            
            {!isSingle && (
              <>
                <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
              </>
            )}

            <motion.div 
              className={`flex items-center ${isSingle ? 'justify-center md:justify-start' : ''}`}
              animate={isSingle ? {} : { x: ["0%", "-50%"] }}
              transition={{ 
                ease: "linear", 
                duration: 25, 
                repeat: Infinity 
              }}
              style={{ width: "fit-content" }}
            >
              {displayLogos.map((member, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 px-8 md:px-12"
                >
                  {member.logo ? (
                    <img
                      src={urlFor(member.logo).height(160).url()}
                      alt={member.company}
                      /* Tinanggal ang grayscale, opacity-50, at grayscale hover classes */
                      className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
                    />
                  ) : (
                    <span className="font-bold text-gray-400 text-lg whitespace-nowrap">
                      {member.company}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FeaturedMember;