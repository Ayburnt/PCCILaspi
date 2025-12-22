import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, Layers, FileText, ArrowRight } from 'lucide-react';
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { client, urlFor } from "../../sanityClient";

export default function Project() {
  const scrollRef = useRef(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "projectsPage"][0]{
      header{
        badgeText,
        title,
        highlightedText,
        description,
        backgroundImage
      },
      projectsSection{label,title},
      projects[]{title,category,status,description,image},
      footer{quote,registryLabel}
    }`;

    client
      .fetch(query)
      .then((data) => {
        setContent(data);
      })
      .catch((err) => {
        console.error("Failed to fetch projects content:", err);
        setContent(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // === NEW: Automatic Swipe Logic ===
  useEffect(() => {
    if (!loading && content?.projects) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          
          if (scrollLeft + clientWidth >= scrollWidth - 1) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [loading, content]);

  const SkeletonCard = () => (
    <div className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] border-r border-slate-100 flex flex-col h-full animate-pulse">
      <div className="h-64 bg-slate-200"></div>
      <div className="p-8 space-y-4 flex-grow bg-white">
        <div className="h-4 bg-slate-200 w-1/3 rounded"></div>
        <div className="h-8 bg-slate-200 w-3/4 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 w-full rounded"></div>
          <div className="h-4 bg-slate-200 w-full rounded"></div>
          <div className="h-4 bg-slate-200 w-2/3 rounded"></div>
        </div>
        <div className="h-4 bg-slate-200 w-1/4 rounded mt-6"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 overflow-hidden">
        <TopBar />
        <Navbar />
        <div className="h-[500px] bg-slate-200 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 pb-24">
          <div className="bg-white p-8 rounded-t-lg shadow-xl h-32 animate-pulse mb-1"></div>
          <div className="flex overflow-hidden bg-white shadow-xl rounded-b-lg border-t border-slate-100">
             <SkeletonCard />
             <SkeletonCard />
             <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">System Notice</h3>
          <p className="text-slate-600 mb-6">Unable to retrieve projects data from the registry.</p>
          <button onClick={() => window.location.reload()} className="text-sm font-bold text-[#155333] hover:underline">
            Try Reloading
          </button>
        </div>
      </div>
    );
  }

  const { header, projectsSection, projects, footer } = content;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-[#155333] selection:text-white">
      <TopBar />
      <Navbar />

      <header className="relative bg-[#064e3b] text-white overflow-hidden">
        {header?.backgroundImage ? (
          <div className="absolute inset-0 opacity-30">
            <img
              src={urlFor(header.backgroundImage).width(1920).url()}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 z-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 pb-40 md:pb-52 flex flex-col items-start justify-center z-10 mb-1 md:mb-5">
          <div className="flex items-center gap-2 mb-6 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            <LayoutGrid size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              {header.badgeText || "Institutional Portfolio"}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            {header.title} <br />
            <span className="text-yellow-400">
              {header.highlightedText}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed border-l-2 border-yellow-500/50 pl-6">
            {header.description}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 -mt-36 relative z-20 pb-24">
        
        <div className="bg-white p-8 md:p-10 border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-t-2xl flex flex-col md:flex-row justify-between items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-3 text-[#155333]">
              <Layers className="w-5 h-5" />
              <span className="font-bold uppercase tracking-widest text-xs">{projectsSection.label || "Project Highlights"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif">
             {projectsSection.title}
            </h2>
          </div>
          {/* Alisin na natin ang dating buttons dito */}
        </div>

        {/* 3. GALLERY CONTAINER WITH SIDE BUTTONS */}
        <div className="relative group/container">
          {/* Left Button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full items-center justify-center border border-slate-200 bg-white/90 backdrop-blur-sm text-slate-600 hover:bg-[#155333] hover:text-white shadow-xl transition-all duration-300 opacity-0 group-hover/container:opacity-100 hidden md:flex"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full items-center justify-center border border-slate-200 bg-white/90 backdrop-blur-sm text-slate-600 hover:bg-[#155333] hover:text-white shadow-xl transition-all duration-300 opacity-0 group-hover/container:opacity-100 hidden md:flex"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative bg-white border-x border-b border-slate-200 shadow-2xl shadow-slate-200/50 rounded-b-2xl overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => {
                const imageUrl = project.image ? urlFor(project.image).width(800).url() : 'https://via.placeholder.com/600x400';
                
                return (
                  <div 
                    key={project._key || index}
                    className="group min-w-full md:min-w-[50%] lg:min-w-[33.333%] snap-start border-r border-slate-100 flex flex-col relative h-auto"
                  >
                    <div className="relative h-72 bg-slate-100 overflow-hidden">
                      <div className="absolute top-5 left-5 z-10">
                         <span className="backdrop-blur-md bg-white/90 text-[#155333] border border-white/50 text-[10px] font-extrabold px-3 py-1.5 uppercase tracking-wider rounded shadow-sm">
                           {project.status}
                         </span>
                      </div>
                      
                      <img 
                        src={imageUrl}
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow bg-white group-hover:bg-slate-50/50 transition-colors duration-300 relative">
                      <div className="mb-4">
                          <span className="inline-block py-1 px-2 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                          {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#155333] transition-colors font-serif">
                          {project.title}
                          </h3>
                      </div>
                      
                      <p className="text-sm text-slate-600 leading-7 line-clamp-3 mb-6">
                        {project.description}
                      </p>

                      <div className="absolute bottom-0 left-0 h-[3px] bg-[#155333] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

     {/* FOOTER SECTION */}
<div className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 relative overflow-hidden">
  {/* The pattern: Changed gradient color to a lighter emerald/green so it's visible on dark bg */}
  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
  
  <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
    {/* Icon Container: Darkened the circle and lightened the icon */}
    <div className="w-16 h-16 mx-auto mb-8 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-700">
      <LayoutGrid className="w-6 h-6 text-yellow-500" />
    </div>

    {/* Quote: Changed from slate-800 to slate-100 (near white) for contrast */}
    <h4 className="text-2xl md:text-4xl font-serif text-slate-100 mb-10 italic leading-tight">
      "{footer.quote}"
    </h4>

    <div className="flex flex-col items-center gap-4">
      {/* Accent Line: Kept yellow, but it pops better now */}
      <div className="w-24 h-1 bg-yellow-500 rounded-full"></div>
      
      {/* Label: Changed slate-500 to slate-400 for better legibility on dark background */}
      <p className="text-xs text-slate-400 uppercase tracking-[0.3em] font-bold mt-2">
        {footer.registryLabel || "Official Project Registry"} &copy; {new Date().getFullYear()}
      </p>
    </div>
  </div>
</div>

      <Footer />
    </div>
  );
}