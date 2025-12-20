import React, { useEffect, useState } from 'react';
import { MapPin, Users, Search, ChevronRight, CalendarDays, CheckCircle2, FileText } from 'lucide-react';
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
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <TopBar />
      <Navbar />

      {/* Institutional Filter Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search records by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all"
              />
            </div>

            {/* Year Selection Tabs */}
            <div className="flex items-center border-l border-r border-slate-200">
              <span className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Fiscal Year:</span>
              <div className="flex gap-1 pr-2">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${
                      selectedYear === year
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-12 px-4 max-w-7xl mx-auto mb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-sm font-medium">Retrieving database records...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-300 rounded-md">
            <FileText className="mx-auto h-10 w-10 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No records found</h3>
            <p className="text-slate-500 text-sm">Adjust your search criteria or select a different year.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group bg-white border border-slate-200 overflow-hidden hover:border-emerald-500 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  
                  {/* Image: Standardized Aspect Ratio */}
                  <div className="md:w-72 lg:w-80 shrink-0 bg-slate-100 relative">
                    <img
                      src={event.image?.asset?.url || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop'}
                      alt={event.title}
                      className="w-full h-48 md:h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute top-0 left-0 bg-slate-900 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                      {event.category}
                    </div>
                  </div>

                  {/* Content: Structured and Balanced */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                        {event.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {event.highlights?.map((highlight, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 text-[11px] font-bold border border-slate-200 rounded uppercase">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3 max-w-md">
                          <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                          <div>
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-tighter">Official Outcome</span>
                            <p className="text-sm text-slate-700 leading-snug">{event.success}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 shrink-0">
                          <div className="text-right">
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-tighter">Attendance</span>
                            <span className="text-sm font-bold text-slate-900">{event.attendees} Verified</span>
                          </div>
                          <a 
                            href={`/events/${event.slug?.current || event._id}`}
                            className="flex items-center gap-2 bg-slate-100 hover:bg-emerald-600 hover:text-white px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all"
                          >
                            View Report
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}