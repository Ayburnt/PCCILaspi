import React, { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  CalendarOff,
  ChevronLeft,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { client } from "../../sanityClient";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate] = useState(new Date());

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

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
        const eventsWithDaysUntil = data.map((event) => ({
          ...event,
          daysUntil: Math.ceil(
            (new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)
          ),
        }));

        setEvents(eventsWithDaysUntil);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // --- PAGINATION CALCULATIONS ---
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when changing page
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-3 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </span>
          <div className="flex gap-2">
            <ChevronLeft
              size={14}
              className="text-slate-400 cursor-pointer hover:text-slate-900"
            />
            <ChevronRight
              size={14}
              className="text-slate-400 cursor-pointer hover:text-slate-900"
            />
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
              <span
                key={`day-${index}`}
                className="text-[10px] font-black text-slate-400 uppercase"
              >
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {blanks.map((b) => (
              <div key={`b-${b}`} />
            ))}
            {days.map((d) => {
              const isToday = d === currentDate.getDate();
              const hasEvent = events.some(
                (e) =>
                  new Date(e.date).getDate() === d &&
                  new Date(e.date).getMonth() === currentDate.getMonth()
              );

              return (
                <div
                  key={d}
                  className={`py-1.5 text-[11px] font-medium border rounded-sm transition-colors
                    ${
                      isToday
                        ? "bg-emerald-700 text-white border-emerald-700"
                        : "border-transparent text-slate-600"
                    }
                    ${
                      hasEvent && !isToday
                        ? "bg-yellow-50 text-emerald-800 border-yellow-200 font-bold"
                        : ""
                    }
                  `}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <TopBar />
      <Navbar />

      <header className="bg-[#155333] border-b border-slate-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Upcoming Events </span>
          </nav>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Schedule of Proceedings
          </h1>
          <p className="text-green-100/70 max-w-2xl border-l-2 border-yellow-500 pl-4 text-sm leading-relaxed">
            Official repository of upcoming institutional engagements, public
            summits, and organizational briefings.
          </p>
        </div>
      </header>

      <main className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Event Calendar
              </label>
              {renderCalendar()}
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-md">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-emerald-700 rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Accessing Schedule...
                </p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-md bg-slate-100">
                <CalendarOff className="mx-auto h-12 w-12 text-slate-200 mb-4" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  No Active Schedules
                </h3>
                <Link
                  to="/events/past"
                  className="inline-block mt-2 text-sm font-semibold bg-emerald-50 text-emerald-700 hover:text-white hover:bg-emerald-500 px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  View Past Events →
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentEvents.map((event) => (
                    <div
                      key={event._id}
                      className="bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col shadow-sm hover:border-emerald-600 group transition-colors"
                    >
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        <img
                          src={
                            event.image?.asset?.url ||
                            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop"
                          }
                          alt={event.title}
                          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute top-0 right-0 bg-emerald-800 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                          {event.category}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex gap-3 mb-4">
                          <div className="text-center shrink-0 border-r border-slate-100 pr-3">
                            <span className="block text-[10px] font-black text-emerald-700 uppercase">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                { month: "short" }
                              )}
                            </span>
                            <span className="block text-xl font-bold text-slate-900 leading-none">
                              {new Date(event.date).getDate()}
                            </span>
                          </div>
                          <h3 className="text-md font-bold text-slate-900 leading-tight group-hover:text-emerald-700">
                            {event.title}
                          </h3>
                        </div>

                        <div className="space-y-2 py-3 border-t border-slate-50 mb-4 text-[11px]">
                          <div className="flex items-center gap-3">
                            <Clock size={14} className="text-slate-400" />
                            <span className="font-bold text-slate-500 uppercase w-12">
                              Time:
                            </span>
                            <span className="text-slate-700">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin size={14} className="text-slate-400" />
                            <span className="font-bold text-slate-500 uppercase w-12">
                              Venue:
                            </span>
                            <span className="text-slate-700 truncate">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-black block tracking-tighter">
                              Registration Fee
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                              {event.price}
                            </span>
                          </div>

                          <Link
                            to={`/events/${event.slug?.current || event._id}`}
                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border ${
                              event.registrationOpen
                                ? "bg-slate-900 text-white border-slate-900 hover:bg-emerald-800"
                                : "bg-white text-slate-300 border-slate-200 cursor-not-allowed"
                            }`}
                          >
                            {event.registrationOpen ? "View Details" : "Closed"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- PAGINATION CONTROLS --- */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 text-[10px] font-bold rounded border transition-all ${
                            currentPage === number
                              ? "bg-emerald-700 text-white border-emerald-700 shadow-md"
                              : "bg-white text-slate-600 border-slate-200 hover:border-emerald-700"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
