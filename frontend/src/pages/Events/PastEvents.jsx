import React, { useEffect, useState } from 'react';
import { MapPin, Users, Search, ArrowLeft, CalendarDays, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';
import { client } from '../../sanityClient';

export default function PastEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event" && eventType == "past"] | order(date desc) {
          _id,
          title,
          slug,
          date,
          location,
          category,
          attendees,
          highlights,
          year,
          success,
          image {
            asset -> {
              url
            }
          }
        }`;
        
        const data = await client.fetch(query);
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const years = ['2024', '2023', '2022'];
  const filteredEvents = events.filter(
    e => (e.year || '2024') === selectedYear && e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <TopBar />
      <Navbar />
      {/* Modern Corporate Hero */}
      <section className="relative bg-slate-900 py-14 px-4 overflow-hidden">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" 
            alt="Event Background" 
            className="w-full h-full object-cover opacity-20" 
          />
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-green-900/50"></div>
        </div>

        {/* Abstract Animated Blobs (Kept for modern feel) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h5 className="text-green-400 font-semibold tracking-wider uppercase text-sm mb-3">
              Archive & Retrospectives
            </h5>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Our Legacy of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-white">
                Impactful Events
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Explore the milestones that have defined our community. From industry summits to networking galas, browse our history of connecting business leaders.
            </p>
          </div>
        </div>
      </section>
      {/* Floating Filter Bar */}
      <section className="sticky top-20 z-40 px-4 -mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md bg-white/95">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search past events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
              />
            </div>

            {/* Year Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedYear === year
                      ? 'bg-white text-green-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 text-sm">Loading archive...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
              <CalendarDays className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <h3 className="text-lg font-medium text-slate-900">No events found</h3>
              <p className="text-slate-500">Try adjusting your search terms or year.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300 overflow-hidden relative" // Added relative here
                >
                  {/* Link wraps the entire card for better UX */}
                  <a href={`/events/${event.slug?.current || event._id}`} className="block h-full"> 
                    <div className="flex flex-col md:flex-row h-full">
                      
                      {/* Image Section */}
                      <div className="md:w-1/3 relative overflow-hidden h-56 md:h-auto">
                        <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                        <img
                          src={event.image?.asset?.url || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop'}
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur text-green-900 text-xs font-bold tracking-wide uppercase rounded-md shadow-sm">
                            {event.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                        
                        {/* VIEW ICON - Positioned absolutely relative to the main card container */}
                        <div className="absolute top-0 right-0 m-4 md:m-6 p-3 rounded-full bg-green-500/10 text-green-600 opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-out z-20">
                            <ArrowLeft size={20} className="rotate-0 group-hover:rotate-45 transition-transform" />
                        </div>
                        {/* END VIEW ICON */}

                        <div>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                            <span className="font-semibold text-green-600 flex items-center gap-1.5">
                              <CalendarDays size={16} />
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={16} />
                              {event.location}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-700 transition-colors">
                            {event.title}
                          </h3>

                          {/* Highlights Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {event.highlights.map((highlight, i) => (
                              <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                           {/* Key Takeaway / Success Metric */}
                          <div className="flex gap-3">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-0.5">Impact & Outcome</p>
                              <p className="text-sm text-slate-700 font-medium">{event.success}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-500 md:text-right">
                             <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                               <Users size={14} className="text-slate-400" />
                               <span className="font-semibold text-slate-700">{event.attendees}</span> Attendees
                             </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}