import React, { useState, useEffect } from "react";
// 🚨 UPDATE THIS PATH to where you saved your sanityClient.js file 🚨
import { client } from '../../sanityClient'; 
import { Loader2, AlertCircle, Handshake } from "lucide-react";

const Partnership = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const query = `*[_type == "partner"] | order(sortOrder asc) {
            name,
            "logoUrl": logo.asset->url,
            website
        }`;

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
    }, []);

    if (loading) {
        return (
            <section className="bg-slate-50 py-24 flex justify-center items-center">
                <Loader2 className="animate-spin text-green-600 w-10 h-10" />
            </section>
        );
    }

    if (error || partners.length === 0) {
        if (!error && partners.length === 0) return null; 
        
        return (
            <section className="bg-slate-50 py-16 flex flex-col justify-center items-center text-slate-400">
                <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
                <p>{error || "No partners found."}</p>
            </section>
        );
    }

    const marqueeList = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="relative bg-slate-50 py-20 font-sans overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                    <Handshake size={14} />
                    Our Ecosystem
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Industry Leaders</span>
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    We collaborate with world-class organizations to drive innovation and economic growth in Las Piñas.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full group">
                {/* Left Gradient Fade */}
                <div className="absolute top-0 left-0 z-20 h-full w-[150px] md:w-[300px] bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />

                {/* Right Gradient Fade */}
                <div className="absolute top-0 right-0 z-20 h-full w-[150px] md:w-[300px] bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />

                {/* Scrolling Track */}
                <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
                    {marqueeList.map((partner, index) => {
                        const card = (
                            <div
                                className="mx-4 md:mx-6 w-[160px] h-[90px] md:w-[200px] md:h-[110px] bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center p-6 transition-all duration-300 hover:border-green-200 hover:shadow-lg hover:shadow-green-100 hover:-translate-y-1 relative group/card"
                            >
                                <img
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    className="max-w-full max-h-full object-contain transition-all duration-500 transform group-hover/card:scale-110"
                                />
                            </div>
                        );

                        return partner.website ? (
                            <a
                                key={`${partner.name}-${index}`}
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={partner.name}
                                aria-label={partner.name}
                            >
                                {card}
                            </a>
                        ) : (
                            <div key={`${partner.name}-${index}`}>{card}</div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll-left {
                    animation: scrollLeft 60s linear infinite;
                    will-change: transform;
                }
                @media (max-width: 768px) {
                    .animate-scroll-left {
                        animation-duration: 40s;
                    }
                }
            `}</style>
        </section>
    );
};

export default Partnership;