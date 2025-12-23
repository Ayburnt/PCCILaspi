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

  // Walang duplication, isang set lang ng data ang gagamitin
  const displayLogos = newMembers;

  return (
    <section className="w-full bg-white border-b border-gray-200 py-12 mb-8 overflow-hidden">
      <div className="container mx-auto px-8 md:px-8">
        <div className="flex flex-row items-center">
          
          {/* LEFT LABEL - Z-index para laging nasa ibabaw habang dumadaan ang logo */}
          <div className="flex-shrink-0 flex items-center pr-4 md:pr-6 border-r border-gray-300 z-20 bg-white relative">
            <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
              New Members
            </span>
          </div>

          {/* MARQUEE AREA */}
          <div className="flex-1 overflow-hidden relative ml-4 md:ml-6 flex items-center">
            <motion.div
              className="flex items-center gap-12 whitespace-nowrap"
              initial={{ x: "100%" }} // Magsisimula sa pinaka-kanan (Right)
              animate={{ x: "-100%" }} // Tatakbo hanggang pinaka-kaliwa (Left)
              transition={{
                ease: "linear",
                duration: 15, // Bilis ng takbo
                repeat: Infinity,
              }}
              style={{ width: "fit-content" }}
            >
              {displayLogos.map((member, index) => (
                <div key={index} className="flex-shrink-0">
                  <Link to={`/member/${member.slug}`} className="block">
                    {member.logo ? (
                      <img
                        src={urlFor(member.logo).height(80).url()}
                        alt={member.company}
                        className="h-6 md:h-8 w-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    ) : (
                      <span className="font-semibold text-gray-500 text-sm hover:text-blue-600 transition-colors">
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