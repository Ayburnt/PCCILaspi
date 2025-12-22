import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";

const NewMember = () => {
  const [newMembers, setNewMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "member" && isNewMember == true]{
      company,
      logo,
      "slug": slug.current
    }`;

    client.fetch(query).then((data) => {
      setNewMembers(data);
      setLoading(false);
    });
  }, []);

  if (loading || newMembers.length === 0) return null;

  const isSingle = newMembers.length === 1;
  // Duplicate list more times to ensure smooth infinite loop on wide screens
  const displayLogos = isSingle ? newMembers : [...newMembers, ...newMembers, ...newMembers];

  return (
    <section className="w-full bg-white border-b border-gray-200 py-12">
      <div className="container mx-auto px-8 md:px-8">
        <div className="flex flex-row items-center overflow-hidden">
          
          {/* LEFT LABEL */}
          <div className="flex-shrink-0 flex items-center pr-4 md:pr-6 border-r border-gray-300 z-20 bg-white relative">
            <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
              New Members
            </span>
          </div>

          {/* MARQUEE AREA */}
          <div className="flex-1 overflow-hidden relative ml-4 md:ml-6">
            {!isSingle && (
              <>
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              </>
            )}

            <motion.div
              className={`flex items-center ${
                isSingle ? "justify-start" : ""
              }`}
              animate={isSingle ? {} : { x: ["0%", "-33.33%"] }}
              transition={{
                ease: "linear",
                duration: 30,
                repeat: Infinity,
              }}
              style={{ width: "fit-content" }}
            >
              {displayLogos.map((member, index) => (
                <div key={index} className="flex-shrink-0 px-6 md:px-8">
                  <Link to={`/member/${member.slug}`} className="block">
                    {member.logo ? (
                      <img
                        src={urlFor(member.logo).height(80).url()}
                        alt={member.company}
                        /* FIXED: Removed grayscale and opacity classes */
                        className="h-6 md:h-8 w-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    ) : (
                      <span className="font-semibold text-gray-500 text-sm whitespace-nowrap hover:text-blue-600 transition-colors">
                        {member.company}
                      </span>
                    )}
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMember;