import { useEffect, useState, useMemo } from "react";
import { client } from "../sanityClient";
import {
  ArrowRight,
  Search,
  ChevronDown,
  Calendar,
  Image as ImageIcon,
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const query = `*[_type == "news"] | order(date desc) {
      title,
      date,
      category,
      slug,
      description,
      image {
        asset->{
          url
        }
      }
    }`;

    client
      .fetch(query)
      .then((data) => setNews(data))
      .catch(console.error);
  }, []);

  // Filtered News
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      if (!item.date) return false;

      const d = new Date(item.date);
      const year = d.getFullYear().toString();
      const month = (d.getMonth() + 1).toString();

      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear ? year === selectedYear : true;
      const matchesMonth = selectedMonth ? month === selectedMonth : true;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [news, searchTerm, selectedYear, selectedMonth]);

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const years = [
    ...new Set(
      news
        .map((n) => (n.date ? new Date(n.date).getFullYear() : null))
        .filter(Boolean)
    ),
  ].sort((a, b) => b - a);

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <TopBar />
      <Navbar />

      <div className="max-w-[87rem] mx-auto px-4 py-5">
        {/* Main Layout Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* --- LEFT SIDE: Facebook Embed (35%) --- */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-8 h-fit">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-3">
                Latest Updates
              </h2>
              <div className="w-full flex justify-center overflow-hidden">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPCCIlaspinas&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="100%"
                  height="800"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="PCCI Las Pinas Facebook"
                  className="min-h-[500px]"
                ></iframe>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Search & News Grid (65%) --- */}
          <div className="w-full lg:w-[65%]">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-stretch">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full bg-transparent border-b-2 border-transparent focus:border-blue-900 rounded-lg pl-12 pr-4 py-3 text-gray-700 outline-none transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-1 flex-col sm:flex-row gap-4 md:max-w-md">
                <div className="relative w-full">
                  <select
                    className="w-full appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-100 outline-none transition"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative w-full">
                  <select
                    className="w-full appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-100 outline-none transition"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">All Months</option>
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* News Grid */}
            {/* Changed grid-cols to max 2 because the column width is smaller now */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {paginatedNews.map((item, i) => (
                <Link
                  to={`/news/${item.slug?.current}`}
                  key={i}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="h-78 overflow-hidden relative bg-gray-100">
                    {item.image?.asset?.url ? (
                      <img
                        src={item.image.asset.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-900 shadow-sm">
                      {item.category
                        ? item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)
                        : "Update"}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(item.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg font-sans font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                      {item.description ||
                        "Click to read full details regarding this announcement."}
                    </p>

                    <div className="flex items-center text-blue-900 font-semibold text-sm group/btn">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}

              {filteredNews.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">
                    No articles found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`px-3 py-1 rounded border hover:bg-gray-100 ${
                      currentPage === idx + 1
                        ? "bg-blue-900 text-white"
                        : "bg-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16 pt-16">
        <Footer />
      </div>
    </div>
  );
}
