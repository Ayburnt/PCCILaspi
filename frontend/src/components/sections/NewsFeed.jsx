import { useEffect, useState } from 'react';
import { client } from '../../sanityClient'; 
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 1. Added 'description' to the query so we can show the snippet
    const query = `*[_type == "event"] | order(date desc) {
      title,
      date,
      category,
      slug,
      description 
    }[0...4]`; 

    client.fetch(query)
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-4">
            <h2 className="text-5xl font-serif font-bold text-gray-900">News</h2>
            <Link to="/news" className="hidden md:block bg-blue-950 text-white px-6 py-3 rounded text-sm font-bold hover:bg-blue-900 transition">
                View All News
            </Link>
        </div>
        <div className="w-full h-px bg-gray-200 mb-10"></div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <Link 
              to={`/news/${event.slug?.current}`} 
              key={index} 
              className="bg-slate-50 p-6 rounded-lg flex flex-col justify-between hover:shadow-lg transition group border border-transparent hover:border-gray-200 h-full cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                  {event.category || 'Press Release'}
                </span>
                
                <h3 className="text-xl font-serif font-bold text-blue-950 mb-3 leading-tight line-clamp-3">
                  {event.title}
                </h3>

                {/* --- 2. ADDED DESCRIPTION SNIPPET --- */}
                {/* line-clamp-3 limits it to 3 lines just like your reference */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {event.description || "Click to read full details..."}
                </p>
                {/* ------------------------------------ */}
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200/50">
                 <span className="text-xs text-gray-400">{event.date}</span>
                 <ArrowRight className="text-blue-950 w-5 h-5 transform group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}

          {events.length === 0 && (
            <div className="col-span-4 text-center py-10 text-gray-400 bg-slate-50 rounded">
                Loading latest news...
            </div>
          )}
        </div>
        
        {/* Mobile View All */}
        <div className="mt-8 md:hidden text-center">
            <Link to="/news" className="bg-blue-950 text-white px-6 py-3 rounded text-sm font-bold w-full block">
                View All News
            </Link>
        </div>
      </div>
    </section>
  );
}