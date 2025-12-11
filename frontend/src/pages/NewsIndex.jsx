import { useEffect, useState, useMemo } from 'react';
import { client } from '../sanityClient';
import { ArrowRight, Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';

export default function NewsIndex() {
  const [events, setEvents] = useState([]);
  
  // --- FILTER STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Fetch Data
  useEffect(() => {
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

  // --- FILTER LOGIC ---
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      const eventYear = eventDate.getFullYear().toString();
      const eventMonth = (eventDate.getMonth() + 1).toString(); // 1-12

      // 1. Search Filter (Title)
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Year Filter
      const matchesYear = selectedYear ? eventYear === selectedYear : true;

      // 3. Month Filter
      const matchesMonth = selectedMonth ? eventMonth === selectedMonth : true;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [events, searchTerm, selectedYear, selectedMonth]);

  // Generate Year Options dynamically based on available events
  const years = [...new Set(events.map(e => e.date ? new Date(e.date).getFullYear() : null).filter(Boolean))].sort((a,b) => b-a);
  
  const months = [
    { value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' },
    { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' },
    { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' },
    { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' }
  ];

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

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* --- SEARCH & FILTER BAR (Matches Reference) --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 p-1">
            {/* Search Input */}
            <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search News..." 
                    className="w-full bg-gray-100 border-none rounded pl-12 pr-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-900 focus:bg-white transition outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Year Dropdown */}
            <div className="relative min-w-[150px]">
                <select 
                    className="w-full appearance-none bg-gray-100 rounded px-4 py-3 text-gray-700 pr-10 focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none cursor-pointer"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Month Dropdown */}
            <div className="relative min-w-[150px]">
                <select 
                    className="w-full appearance-none bg-gray-100 rounded px-4 py-3 text-gray-700 pr-10 focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none cursor-pointer"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">Month</option>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
        </div>

        {/* --- NEWS GRID (Using filteredEvents) --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event, index) => (
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

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {event.description || "No description available."}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                 <span className="text-xs text-gray-400">{event.date}</span>
                 <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-900 transition-colors">
                    <ArrowRight className="text-blue-900 w-4 h-4 group-hover:text-white transition" />
                 </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {filteredEvents.length === 0 && events.length > 0 && (
             <div className="col-span-4 text-center py-20">
                <p className="text-gray-400 text-lg">No articles found matching your filters.</p>
                <button 
                    onClick={() => { setSearchTerm(''); setSelectedYear(''); setSelectedMonth(''); }}
                    className="mt-4 text-blue-900 font-bold underline"
                >
                    Clear Filters
                </button>
             </div>
          )}

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