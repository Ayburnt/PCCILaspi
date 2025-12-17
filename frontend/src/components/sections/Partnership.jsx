import React, { useState, useEffect } from "react";
// 🚨 UPDATE THIS PATH to where you saved your sanityClient.js file 🚨
import { client } from '../../sanityClient'; // Imported as 'client'

const Partnership = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // GROQ Query: Fetch all documents of type 'partner', order them by the 'sortOrder' field, 
        // and extract the partner's name and the direct URL of the logo image asset.
        const query = `*[_type == "partner"] | order(sortOrder asc) {
            name,
            "logoUrl": logo.asset->url
        }`;

        // FIX: Change sanityClient.fetch(query) to client.fetch(query)
        client 
            .fetch(query)
            .then((data) => {
                setPartners(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching partner data from Sanity:", err);
                setError("Failed to load partner logos.");
                setLoading(false);
            });
    }, []); // Empty dependency array ensures this runs only once on mount

    // --- Loading and Error States ---
    if (loading) {
        return (
            <section className="bg-slate-50 py-16 font-sans text-center">
                <p className="text-slate-500">Loading industry partners...</p>
            </section>
        );
    }

    if (error || partners.length === 0) {
        return (
            <section className="bg-slate-50 py-16 font-sans text-center">
                {/* 🚨 Check 1: Ensure you have 'partner' documents published in Sanity Studio! */}
                <p className="text-red-500">{error || "No partners found in the CMS."}</p>
            </section>
        );
    }

    // Duplicate the list to create the infinite loop effect for the marquee
    const marqueeList = [...partners, ...partners];

    return (
        <section className="bg-slate-50 py-16 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                    Sponsors
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Collaborating with world-class leaders to deliver excellence.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full">

                {/* Left Gradient Fade */}
                <div className="absolute top-0 left-0 z-10 h-full w-[100px] md:w-[200px] bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />

                {/* Right Gradient Fade */}
                <div className="absolute top-0 right-0 z-10 h-full w-[100px] md:w-[200px] bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

                {/* Scrolling Track */}
                <div className="flex w-max animate-scroll-left group hover:[animation-play-state:paused]">
                    {/* We use the fetched and duplicated list (marqueeList) */}
                    {marqueeList.map((partner, index) => (
                        <div
                            key={index}
                            className="mx-4 w-[180px] h-[100px] md:w-[220px] md:h-[120px] bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center p-6 transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:scale-105"
                        >
                            <img
                                // Use the fetched logoUrl from Sanity
                                src={partner.logoUrl}
                                // Use the fetched name for accessibility
                                alt={partner.name}
                                className="max-w-full max-h-full object-contain transition-all duration-500 hover:grayscale-0 hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Internal CSS for the Animation (Ideally this is in a global CSS file or a dedicated CSS module) */}
            <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Moves half the total width of the doubled list */
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scrollLeft 40s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default Partnership;