import { useEffect, useState } from 'react';
import { client } from '../sanityClient';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';

export default function NewsIndex() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 1. Added 'description' to the fetch query
    const query = `*[_type == "event"] | order(date desc) {
      title,
      date,
      category,
      slug,
      description
    }`;

    client.fetch(query)
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      <TopBar />
      <Navbar />

      {/* Page Header */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-950 mb-4">News & Updates</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Stay updated with the latest announcements, press releases, and events from the chamber.
          </p>
        </div>
      </div>

      {/* The News Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <Link 
              to={`/news/${event.slug?.current}`} 
              key={index} 
              className="bg-white border border-gray-100 p-6 rounded-lg flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition duration-300 group h-full"
            >
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                  {event.category || 'Press Release'}
                </span>
                
                <h3 className="text-xl font-serif font-bold text-blue-950 mb-3 leading-tight line-clamp-3">
                  {event.title}
                </h3>

                {/* --- 2. ADDED DESCRIPTION WITH TRUNCATION --- */}
                {/* line-clamp-3 means: "Show only 3 lines, then add ..." */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {event.description || "No description available."}
                </p>
                {/* --------------------------------------------- */}
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                 <span className="text-xs text-gray-400">{event.date}</span>
                 <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-900 transition-colors">
                    <ArrowRight className="text-blue-900 w-4 h-4 group-hover:text-white transition" />
                 </div>
              </div>
            </Link>
          ))}

          {events.length === 0 && (
            <div className="col-span-4 text-center py-20 text-gray-400">
                Loading articles...
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}