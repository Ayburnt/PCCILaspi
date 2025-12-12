import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Timer, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';
import { client } from '../../sanityClient';

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event" && eventType == "upcoming"] | order(date asc) {
          _id,
          title,
          slug,
          date,
          time,
          location,
          category,
          attendees,
          description,
          registrationOpen,
          price,
          image {
            asset -> {
              url
            }
          }
        }`;
        
        const data = await client.fetch(query);
        
        // Calculate daysUntil for each event
        const eventsWithDaysUntil = data.map(event => ({
          ...event,
          daysUntil: Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24))
        }));
        
        setEvents(eventsWithDaysUntil);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const sortedEvents = [...events].sort((a, b) => a.daysUntil - b.daysUntil);
  const featuredEvent = sortedEvents[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <TopBar />
      <Navbar />

      {/* Hero / Next Event Highlight */}
      <section className="relative bg-slate-800 py-14 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-900/80"></div>
          {featuredEvent && (
            <img 
              src={featuredEvent.image?.asset?.url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80'} 
              alt="Background" 
              className="w-full h-full object-cover opacity-10 mix-blend-overlay" 
            />
          )}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {loading ? (
             <div className="h-64 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : featuredEvent && (
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6">
                  <Timer size={16} />
                  <span>Next Event in {featuredEvent.daysUntil} Days</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {featuredEvent.title}
                </h1>
                <p className="text-lg text-slate-400 mb-8 max-w-xl">
                  {featuredEvent.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="bg-white text-indigo-900 px-8 py-3.5 rounded-lg font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                    Register Now
                    <ArrowRight size={18} />
                  </button>
                  <button className="px-8 py-3.5 rounded-lg font-semibold text-white border border-slate-600 hover:bg-white/5 transition-colors">
                    View Details
                  </button>
                </div>
              </div>

              {/* Glass Card for Featured Event Details */}
              <div className="w-full md:w-96 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="bg-indigo-600 p-3 rounded-lg text-white">
                          <Calendar size={24} />
                       </div>
                       <div>
                          <p className="text-slate-400 text-sm">Date</p>
                          <p className="text-white font-semibold">
                            {new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="bg-indigo-600 p-3 rounded-lg text-white">
                          <Clock size={24} />
                       </div>
                       <div>
                          <p className="text-slate-400 text-sm">Time</p>
                          <p className="text-white font-semibold">{featuredEvent.time || 'TBD'}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="bg-indigo-600 p-3 rounded-lg text-white">
                          <MapPin size={24} />
                       </div>
                       <div>
                          <p className="text-slate-400 text-sm">Location</p>
                          <p className="text-white font-semibold">{featuredEvent.location}</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid Schedule Section */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Upcoming Schedule</h2>
              <p className="text-slate-500">Browse our events for the upcoming quarter</p>
            </div>
            {/* Legend / Filter could go here */}
          </div>
          
          {/* GRID LAYOUT: 3 Columns on Large Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEvents.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event.slug?.current || event._id}`}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 flex flex-col overflow-hidden"
              >
                
                {/* Image & Date Header */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={event.image?.asset?.url || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop'} 
                    alt={event.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur rounded-lg shadow-lg p-2 text-center min-w-[64px]">
                    <span className="block text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="block text-2xl font-extrabold text-slate-900 leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-4 right-4 z-20">
                     <span className="px-3 py-1 bg-slate-900/80 backdrop-blur text-white text-xs font-bold uppercase rounded-full">
                        {event.category}
                     </span>
                  </div>
                </div>
                
                {/* Content Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  {/* Info Row */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                     <div className="flex items-center text-sm text-slate-500 gap-3">
                        <Clock size={16} className="text-indigo-500" />
                        {event.time}
                     </div>
                     <div className="flex items-center text-sm text-slate-500 gap-3">
                        <MapPin size={16} className="text-indigo-500" />
                        <span className="truncate">{event.location}</span>
                     </div>
                     <div className="flex items-center text-sm text-slate-500 gap-3">
                        <Users size={16} className="text-indigo-500" />
                        {event.attendees} Spots Left
                     </div>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-semibold block">Entry Fee</span>
                      <span className="text-lg font-bold text-slate-900">{event.price}</span>
                    </div>

                    <button 
                      disabled={!event.registrationOpen}
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                        event.registrationOpen 
                          ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-200' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {event.registrationOpen ? (
                         <>
                           Register <Ticket size={16} />
                         </>
                      ) : (
                         'Closed'
                      )}
                    </button>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}