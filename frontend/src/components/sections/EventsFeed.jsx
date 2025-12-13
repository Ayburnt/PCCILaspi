import { useEffect, useState } from 'react';
import { client } from '../../sanityClient'; 
import imageUrlBuilder from '@sanity/image-url'; 
import { ArrowUpRight, Calendar, MapPin, Users, Clock, Image as ImageIcon } from 'lucide-react';
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

export default function EventsFeed() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "event"] | order(date desc) {
      title,
      date,
      category,
      slug,
      description,
      image,
      location,
      time,
      eventType,
      price
    }[0...4]`;

    client.fetch(query)
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="events" className="py-16 mb-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    Upcoming Events
                </h2>
                <p className="mt-4 text-slate-500 max-w-2xl text-lg">
                    Join us at our latest conferences, workshops, and networking sessions.
                </p>
            </div>
            <Link 
                to="/events/upcoming" 
                className="hidden md:flex items-center gap-2 text-blue-950 font-semibold hover:text-blue-700 transition-colors group"
            >
                View All Events 
                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Loading State */}
          {loading && (
             [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-50 rounded-2xl h-96 border border-gray-100" />
             ))
          )}

          {!loading && events.map((event, index) => (
            <Link 
              to={`/events/${event.slug?.current}`} 
              key={index} 
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                {event.image ? (
                  <img 
                    src={urlFor(event.image).width(600).height(450).url()} 
                    alt={event.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Calendar size={40} strokeWidth={1.5} />
                  </div>
                )}
                
                {/* Glassmorphism Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 shadow-sm uppercase tracking-wider">
                    {event.category || 'Event'}
                  </span>
                </div>

                {/* Event Type Badge (Upcoming/Past) */}
                {event.eventType && (
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border shadow-sm uppercase tracking-wider ${
                      event.eventType === 'upcoming' 
                        ? 'bg-emerald-500/90 backdrop-blur-md text-white border-emerald-400/20' 
                        : 'bg-slate-500/90 backdrop-blur-md text-white border-slate-400/20'
                    }`}>
                      {event.eventType}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1">
                
                {/* Date & Time Row */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors">
                  {event.title}
                </h3>

                {/* Location */}
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}

                <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                    {event.description || "Learn more about this event..."}
                </p>

                {/* Price Tag */}
                {event.price && (
                  <div className="mb-4">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg">
                      {event.price}
                    </span>
                  </div>
                )}

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-sm font-semibold text-blue-950 group-hover:text-blue-700 transition-colors">
                     View Details
                   </span>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <ArrowUpRight size={16} />
                   </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {!loading && events.length === 0 && (
            <div className="col-span-4 text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-slate-200">
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Calendar size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No events found</h3>
                <p className="text-slate-500 mt-1">Check back later for upcoming events.</p>
            </div>
          )}
        </div>
        
        {/* Mobile View All Button (Only visible on small screens) */}
        <div className="mt-10 md:hidden">
             <Link to="/events/upcoming" className="flex items-center justify-center w-full bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-xl font-bold shadow-sm active:scale-95 transition-transform">
                View All Events
            </Link>
        </div>
      </div>
    </section>
  );
}
