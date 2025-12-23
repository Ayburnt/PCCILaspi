import { useEffect, useState, useMemo } from "react";
import { client } from "../sanityClient";
import {
  ArrowRight,
  Search,
  ChevronDown,
  Calendar,
  Image as ImageIcon,
  FileText,
  Filter,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TopBar from "../components/layout/TopBar";

export default function NewsIndex() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const query = `*[_type == "news"] | order(date desc) {
      title,
      date,
      category,
      slug,
      description,
      image { asset->{ url } }
    }`;

    client.fetch(query).then((data) => setNews(data)).catch(console.error);
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      if (!item.date) return false;
      const d = new Date(item.date);
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear ? d.getFullYear().toString() === selectedYear : true;
      const matchesMonth = selectedMonth ? (d.getMonth() + 1).toString() === selectedMonth : true;
      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [news, searchTerm, selectedYear, selectedMonth]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const years = [...new Set(news.map((n) => n.date ? new Date(n.date).getFullYear() : null).filter(Boolean))].sort((a, b) => b - a);

  const months = [
    { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
    { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
    { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
    { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      <TopBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- SIDEBAR (33%) - LEFT ON DESKTOP --- */}
          {/* order-2 on mobile (bottom), lg:order-1 on desktop (left) */}
          <aside className="w-full lg:w-1/3 order-2 lg:order-1 space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <Share2 size={16} className="text-[#155333]" />
                  Latest Activity
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Social</span>
              </div>
              
              <div className="p-0">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPCCIlaspinas&tabs=timeline&width=500&height=800&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                  width="100%"
                  height="600"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="min-h-[600px] w-full"
                  title="Official Facebook Page"
                ></iframe>
              </div>
              
              <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                <a 
                  href="https://www.facebook.com/PCCIlaspinas" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#155333] hover:underline"
                >
                  View on Facebook &rarr;
                </a>
              </div>
            </div>
          </aside>

          {/* --- MAIN NEWS ARCHIVE (66%) - RIGHT ON DESKTOP --- */}
          {/* order-1 on mobile (top), lg:order-2 on desktop (right) */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            
            {/* Control Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-grow w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search archives..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#155333]/20 focus:border-[#155333] transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mr-2 hidden md:flex">
                  <Filter size={14} /> Filters:
                </div>
                
                <div className="relative flex-1 md:flex-none">
                  <select
                    className="w-full appearance-none bg-white border border-gray-200 rounded-md pl-3 pr-8 py-2.5 text-sm text-slate-700 font-medium hover:border-gray-300 focus:ring-2 focus:ring-[#155333]/20 focus:border-[#155333] outline-none cursor-pointer transition-all"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Year</option>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative flex-1 md:flex-none">
                  <select
                    className="w-full appearance-none bg-white border border-gray-200 rounded-md pl-3 pr-8 py-2.5 text-sm text-slate-700 font-medium hover:border-gray-300 focus:ring-2 focus:ring-[#155333]/20 focus:border-[#155333] outline-none cursor-pointer transition-all"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Month</option>
                    {months.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedNews.map((item, i) => (
                <Link
                  to={`/news/${item.slug?.current}`}
                  key={i}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                >
                  <div className="h-52 relative overflow-hidden bg-gray-100">
                    {item.image?.asset?.url ? (
                      <img
                        src={item.image.asset.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#155333] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                      {item.category || "Update"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-3">
                      <Calendar size={14} className="text-[#155333]" />
                      <span>{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#155333] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {item.description || "Click to read the full details regarding this official announcement."}
                    </p>

                    <div className="mt-auto flex items-center text-[#155333] font-semibold text-sm">
                      Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredNews.length === 0 && (
              <div className="py-20 text-center bg-white border border-gray-200 rounded-lg">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">No updates found</h3>
                <button 
                  onClick={() => {setSearchTerm(""); setSelectedYear(""); setSelectedMonth("")}}
                  className="mt-4 text-sm text-[#155333] font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
                >
                  <ChevronDown className="rotate-90" size={18} />
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`w-9 h-9 rounded-md text-sm font-semibold transition-all ${
                      currentPage === idx + 1
                        ? "bg-[#155333] text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600 disabled:opacity-50 transition-colors"
                >
                  <ChevronDown className="-rotate-90" size={18} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}