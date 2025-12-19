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
    <div className="bg-[#f8f9fa] min-h-screen text-slate-900">
      <TopBar />
      <Navbar />

      {/* 1. INSTITUTIONAL HEADER */}
      <div className="bg-[#155333] border-b-4 border-yellow-500 py-12">
        <div className="max-w-[87rem] mx-auto px-12">
          <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <FileText size={14} /> PCCI-Las Piñas Media Bulletin
          </div>
          <h1 className="text-4xl font-bold  text-white tracking-tight mb-6">
            News, Announcements & Bulletins
          </h1>
          <p className="mt-4 text-green-100/70 max-w-2xl text-sm leading-relaxed border-l-4 border-yellow-500 pl-4 italic">
            Providing transparency and timely updates on the chamber's initiatives, 
            legislative advocacy, and business community developments in Las Piñas.
          </p>
        </div>
      </div>

      <div className="max-w-[87rem] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* --- LEFT SIDE: OFFICIAL FEED (30%) --- */}
          <aside className="w-full lg:w-[30%] lg:sticky lg:top-8 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                  Official Social Feed
                </h2>
                <Share2 size={16} className="text-gray-400" />
              </div>
              <div className="p-2 bg-gray-100">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPCCIlaspinas&tabs=timeline&width=500&height=800&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                  width="100%"
                  height="700"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="min-h-[500px]"
                  title="Official Facebook Page"
                ></iframe>
              </div>
            </div>
            
           
          </aside>

          {/* --- RIGHT SIDE: ARCHIVE & NEWS (70%) --- */}
          <div className="w-full lg:w-[70%] order-1 lg:order-2">
            
            {/* Archive Filter Bar */}
            <div className="bg-white border border-gray-200 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 text-sm focus:bg-white focus:border-[#155333] transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-200 pl-3 pr-8 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer outline-none focus:border-[#155333]"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-200 pl-3 pr-8 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer outline-none focus:border-[#155333]"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">All Months</option>
                    {months.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* News List/Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedNews.map((item, i) => (
                <Link
                  to={`/news/${item.slug?.current}`}
                  key={i}
                  className="group bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:border-[#155333] transition-colors"
                >
                  <div className="h-56 relative overflow-hidden bg-gray-100">
                    {item.image?.asset?.url ? (
                      <img
                        src={item.image.asset.url}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div className="absolute top-0 right-0 bg-[#155333] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {item.category || "Official Release"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow border-l-4 border-transparent group-hover:border-[#155333] transition-all">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      <Calendar size={12} className="text-yellow-600" />
                      <span>{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-3 leading-tight group-hover:underline">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-6">
                      {item.description || "Refer to the full article for detailed information regarding this official announcement."}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#155333]">Read Bulletin</span>
                      <ArrowRight size={14} className="text-[#155333] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredNews.length === 0 && (
              <div className="py-24 text-center border-2 border-dashed border-gray-200">
                <Search size={40} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 font-serif">No Records Found</h3>
                <p className="text-sm text-gray-500">Adjust filters to search the archive.</p>
              </div>
            )}

            {/* Pagination: Institutional Style */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronDown className="rotate-90" size={16} />
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`min-w-[40px] h-10 border text-xs font-bold transition-colors ${
                      currentPage === idx + 1
                        ? "bg-[#155333] border-[#155333] text-white"
                        : "bg-white border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronDown className="-rotate-90" size={16} />
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