import { useEffect, useState, useRef } from 'react';
import { client } from '../../sanityClient'; 
import imageUrlBuilder from '@sanity/image-url'; 
import { ArrowUpRight, Calendar, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * UTILS & CONFIG
 */
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// Inline CSS to hide scrollbars while maintaining functionality
const scrollbarHideStyle = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
};

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetches more than 4 to allow sliding into "excess" data
    const query = `*[_type == "news"] | order(date desc) {
      title,
      date,
      category,
      slug,
      description,
      image 
    }[0...12]`;

    client.fetch(query)
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /**
   * SLIDER LOGIC
   * clientWidth represents the width of the visible container.
   * Scrolling by clientWidth moves exactly one "page" of cards.
   */
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="news" className="py-12  bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    News & Updates
                </h2>
                <p className="mt-4 text-slate-500 max-w-2xl text-lg">
                    Insights and announcements from our team.
                </p>
            </div>
            
            {/* Navigation Arrows & View All */}
            <div className="flex items-center gap-4">
                <Link 
                    to="/news" 
                    className="hidden md:flex items-center gap-2 text-blue-950 font-semibold hover:text-green-700 transition-colors group mr-4"
                >
                    View All News 
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm active:scale-95"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={20} className="text-slate-700" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm active:scale-95"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={20} className="text-slate-700" />
                    </button>
                </div>
            </div>
        </div>

        {/* News Slider Container */}
        <div 
          ref={scrollRef}
          style={scrollbarHideStyle}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-2"
        >
          
          {/* Loading State */}
          {loading && (
             [...Array(4)].map((_, i) => (
                <div 
                    key={i} 
                    className="flex-shrink-0 w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] animate-pulse bg-white rounded-2xl h-96 border border-gray-100" 
                />
             ))
          )}

          {/* News Items */}
          {!loading && news.map((item, index) => (
            <Link 
              to={`/news/${item.slug?.current}`} 
              key={index} 
              className="group flex flex-col flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300
                /* Width Logic: 4 cards per row on LG screen */
                w-[85%] 
                md:w-[calc(50%-12px)] 
                lg:w-[calc(25%-18px)]"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                {item?.image?.asset ? (
                  <img 
                    src={urlFor(item.image).width(600).height(450).url()} 
                    alt={item?.title || 'News'} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={40} strokeWidth={1.5} />
                  </div>
                )}
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/20 shadow-sm uppercase tracking-wider">
                    {item.category || 'News'}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(item.date)}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
                    {item.description || "Read full details about this update..."}
                </p>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-950 group-hover:text-green-700 transition-colors">
                      Read More
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                         <ArrowUpRight size={16} />
                    </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {!loading && news.length === 0 && (
            <div className="w-full text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
                <h3 className="text-lg font-medium text-slate-900">No news found</h3>
            </div>
          )}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-4 md:hidden">
             <Link to="/news" className="flex items-center justify-center w-full bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-xl font-bold shadow-sm active:scale-95 transition-transform">
                View All News
            </Link>
        </div>
      </div>
    </section>
  );
}