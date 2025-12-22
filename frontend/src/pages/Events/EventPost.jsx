import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";

export default function EventPost() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const query = `*[_type == "event" && slug.current == $slug][0]`;
    client
      .fetch(query, { slug })
      .then((data) => setEvent(data))
      .catch(console.error);
  }, [slug]);

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* --- Header Row: Back Button (Left) + Tags (Right) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
          {/* Left Side: Back Button */}
          <Link
            to={
              event.eventType === "past" ? "/events/past" : "/events/upcoming"
            }
            className="group flex items-center gap-2 text-slate-600 hover:text-green-700 transition-colors font-semibold text-sm"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to {event.eventType === "past" ? "Past" : "Upcoming"} Events
          </Link>

          {/* Right Side: Meta Tags */}
          <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider">
              {event.category}
            </span>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                <Calendar size={14} className="text-slate-400" /> {event.date}
              </span>

              {event.location && (
                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                  <MapPin size={14} className="text-slate-400" />{" "}
                  {event.location}
                </span>
              )}

              {event.time && (
                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                  <Clock size={14} className="text-slate-400" /> {event.time}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* --- Title --- */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
          {event.title}
        </h1>

        {/* --- Featured Image --- */}
        {event.image?.asset ? (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
            <img
              src={urlFor(event.image).width(1200).url()}
              alt={event.title}
              className="w-full h-full object-cover"
              style={{
                aspectRatio: `${event.image.asset.metadata?.dimensions?.width} / ${event.image.asset.metadata?.dimensions?.height}`,
              }}
            />
          </div>
        ) : null}
        {/* --- Quick Info Grid --- */}
        {(event.attendees || event.price) && (
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded-2xl mb-12 border border-slate-100">
            {event.price && (
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">
                  Entry Fee
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {event.price}
                </p>
              </div>
            )}
            {event.attendees && (
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">
                  Capacity / Attendees
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {event.attendees}
                </p>
              </div>
            )}
          </div>
        )}

        {/* --- Content Sections --- */}
        <div className="space-y-12 ">
          {/* Short Description */}
          {event.description && (
            <p className="text-xl text-slate-600 leading-relaxed font-light border-l-4 border-green-500 pl-6">
              {event.description}
            </p>
          )}

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Event Highlights
              </h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {event.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <CheckCircle2
                      className="text-green-600 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-slate-700 text-sm font-medium">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Body Text */}
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600">
            {event.body ? <PortableText value={event.body} /> : null}
          </div>

          {/* Past Event Outcome */}
          {event.eventType === "past" && event.success && (
            <div className="bg-green-900 text-white p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                Success Story
              </h3>
              <p className="text-green-50 leading-relaxed italic text-lg">
                "{event.success}"
              </p>
            </div>
          )}

          {/* Registration / Event Link Button */}
          <div className="flex justify-left pt-8">
            <a
              href="https://event.sari-sari.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-10 rounded-md transition-all duration-300 shadow-lg hover:shadow-green-200"
            >
              Register at Sari-Sari
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}