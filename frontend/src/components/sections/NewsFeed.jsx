import { useEffect, useState } from 'react';
import { client } from '../../sanityClient'; 
import imageUrlBuilder from '@sanity/image-url'; 
import { ArrowUpRight, Calendar, Image as ImageIcon } from 'lucide-react'; // Added Calendar & updated Arrow
import { Link } from 'react-router-dom';

// Configure the image builder
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

// Helper to format dates professionally (e.g., "Oct 24, 2024")
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "news"] | order(date desc) {
      title,
      date,
      category,
      slug,
      description,
      image 
    }[0...4]`;

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

  return (
    <section id="news" className="py-5 mb-10  bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    News & Updates
                </h2>
                <p className="mt-4 text-slate-500 max-w-2xl text-lg">
                    Insights, announcements, and articles from our team.
                </p>
            </div>
            <Link 
                to="/news" 
                className="hidden md:flex items-center gap-2 text-blue-950 font-semibold hover:text-blue-700 transition-colors group"
            >
                View All News 
                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Loading State */}
          {loading && (
             [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl h-96 border border-gray-100" />
             ))
          )}

          {!loading && news.map((item, index) => (
            <Link 
              to={`/news/${item.slug?.current}`} 
              key={index} 
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                {item?.image?.asset ? (
                  <img 
                    src={urlFor(item.image).width(600).height(450).url()} 
                    alt={item?.title || 'News Image'} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={40} strokeWidth={1.5} />
                  </div>
                )}
                
                {/* Glassmorphism Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 shadow-sm uppercase tracking-wider">
                    {item.category || 'News'}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1">
                
                {/* Date Row */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(item.date)}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
                    {item.description || "Read full details about this update..."}
                </p>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-sm font-semibold text-blue-950 group-hover:text-blue-700 transition-colors">
                     Read More
                   </span>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <ArrowUpRight size={16} />
                   </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {!loading && news.length === 0 && (
            <div className="col-span-4 text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <ImageIcon size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No news found</h3>
                <p className="text-slate-500 mt-1">Check back later for updates.</p>
            </div>
          )}
        </div>
        
        {/* Mobile View All Button (Only visible on small screens) */}
        <div className="mt-10 md:hidden">
             <Link to="/news" className="flex items-center justify-center w-full bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-xl font-bold shadow-sm active:scale-95 transition-transform">
                View All News
            </Link>
        </div>
      </div>
    </section>
  );
}