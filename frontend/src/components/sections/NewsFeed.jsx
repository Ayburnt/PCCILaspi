import { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- Import Link

export default function NewsFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 1. We MUST fetch the 'slug' to link correctly
    const query = `*[_type == "event"] | order(date desc) {
      title,
      date,
      category,
      slug 
    }[0...4]`;

    client.fetch(query)
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-end mb-4">
          <h2 className="text-5xl font-serif font-bold text-gray-900">News</h2>
          <Link to="/news" className="...">View All News</Link>
        </div>
        <div className="w-full h-px bg-gray-200 mb-10"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            // WRAP THE CARD IN A LINK
            <Link
              to={`/news/${event.slug?.current}`}
              key={index}
              className="bg-slate-50 p-6 rounded-lg flex flex-col justify-between hover:shadow-lg transition group border border-transparent hover:border-gray-200 h-full cursor-pointer"
            >
              <div>
                {/* NO IMAGE HERE AS REQUESTED */}

                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                  {event.category || 'Press Release'}
                </span>

                <h3 className="text-xl font-serif font-bold text-blue-950 mb-3 leading-tight line-clamp-4">
                  {event.title}
                </h3>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200/50">
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
          <a href="#" className="bg-blue-950 text-white px-6 py-3 rounded text-sm font-bold w-full block">
            View All News
          </a>
        </div>
      </div>
    </section>
  );
}