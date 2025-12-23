import { useEffect, useState, useRef } from 'react';
import { client } from '../../sanityClient'; 
import imageUrlBuilder from '@sanity/image-url'; 
import { ArrowUpRight, Calendar, MapPin, Clock, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const builder = imageUrlBuilder(client);
function urlFor(source) { return builder.image(source); }

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });
};

const scrollbarHideStyle = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
};

export default function EventsFeed() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch up to 12 events to allow for sliding
    const query = `*[_type == "event"] | order(date desc) {
      title, date, category, slug, description, image, location, time, eventType, price
    }[0...12]`;

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="events" className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Events</h2>
                <p className="mt-4 text-slate-500 max-w-2xl text-lg">
                    Join us at our latest conferences, workshops, and networking sessions.
                </p>
            </div>
            
            <div className="flex items-center gap-4">
                <Link to="/events/upcoming" className="hidden md:flex items-center gap-2 text-blue-950 font-semibold hover:text-green-700 transition-colors group mr-2">
                    View All Events 
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                
                {/* Only show arrows if there's excess data (more than 4 items) */}
                {!loading && events.length > 4 && (
                    <div className="flex gap-2">
                        <button onClick={() => scroll('left')} className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 shadow-sm active:scale-95 transition-all">
                            <ChevronLeft size={20} className="text-slate-700" />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 shadow-sm active:scale-95 transition-all">
                            <ChevronRight size={20} className="text-slate-700" />
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Events Slider Container */}
        <div 
          ref={scrollRef}
          style={scrollbarHideStyle}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 px-1"
        >
          {loading && (
             [...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[85%] md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] animate-pulse bg-gray-50 rounded-2xl h-[450px] border border-gray-100" />
             ))
          )}

          {!loading && events.map((event, index) => (
            <Link 
              to={`/events/${event.slug?.current}`} 
              key={index} 
              className="group flex flex-col flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300
                w-[85%] md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]"
            >
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
                
                {event.eventType && (
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border shadow-sm uppercase tracking-wider backdrop-blur-md ${
                      event.eventType === 'upcoming' 
                        ? 'bg-emerald-500/90 text-white border-emerald-400/20' 
                        : 'bg-slate-500/90 text-white border-slate-400/20'
                    }`}>
                      {event.eventType}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400 mb-3 uppercase tracking-tighter">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} />
                        <span>{event.time}</span>
                      </div>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                  {event.title}
                </h3>

                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <MapPin size={14} className="flex-shrink-0 text-slate-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}

                <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
                    {event.description || "Learn more about this event..."}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-sm font-semibold text-blue-950 group-hover:text-green-700 transition-colors">View Details</span>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                        <ArrowUpRight size={16} />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 md:hidden">
             <Link to="/events/upcoming" className="flex items-center justify-center w-full bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-xl font-bold shadow-sm">
                View All Events
            </Link>
        </div>
      </div>
    </section>
  );
}