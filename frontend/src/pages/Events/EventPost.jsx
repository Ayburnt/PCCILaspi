import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, CheckCircle2, Tag } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';

export default function EventPost() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const query = `*[_type == "event" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          date,
          time,
          location,
          category,
          eventType,
          attendees,
          highlights,
          year,
          success,
          description,
          registrationOpen,
          price,
          body,
          image {
            asset -> {
              url
            }
          }
        }`;
        
        const data = await client.fetch(query, { slug });
        setEvent(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar />
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 text-sm">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar />
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Event Not Found</h2>
          <p className="text-slate-600 mb-8">The event you're looking for doesn't exist.</p>
          <Link to="/events/all" className="text-indigo-600 font-semibold hover:text-indigo-700">
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const isPastEvent = event.eventType === 'past';

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <Navbar />

      {/* Hero Section with Event Image */}
      <section className="relative bg-slate-700 h-[50vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        {event.image?.asset?.url && (
          <div className="absolute inset-0">
            <img 
              src={event.image.asset.url}
              alt={event.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-12 w-full">
            <Link 
              to={isPastEvent ? "/events/past" : "/events/upcoming"}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={20} /> Back to {isPastEvent ? 'Past' : 'Upcoming'} Events
            </Link>

            {/* Event Type Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold uppercase ${
                isPastEvent 
                  ? 'bg-slate-600/90 text-white' 
                  : 'bg-green-500/90 text-white'
              }`}>
                {event.eventType}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {event.title}
            </h1>

            {/* Quick Info Row */}
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-indigo-300" />
                <span className="font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-indigo-300" />
                  <span>{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-indigo-300" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            
            {/* Category & Price Bar */}
            <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
              <div className="flex items-center gap-3">
                <Tag className="text-indigo-600" size={20} />
                <span className="text-sm text-slate-500 uppercase font-semibold">Category</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-900 rounded-full text-sm font-bold">
                  {event.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
                  {isPastEvent ? 'Attendance' : 'Entry Fee'}
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {event.price || 'Free'}
                </p>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Event</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Event Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200">
                      <CheckCircle2 className="text-indigo-600 flex-shrink-0" size={20} />
                      <span className="text-slate-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Body Content (Portable Text) */}
            {event.body && (
              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Full Details</h2>
                <div className="bg-white p-8 rounded-xl border border-slate-200">
                  <PortableText value={event.body} />
                </div>
              </div>
            )}

            {/* Success Metric (for past events) */}
            {isPastEvent && event.success && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-200 mb-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Impact & Outcome</h3>
                    <p className="text-emerald-800 text-lg leading-relaxed">
                      {event.success}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Event Info Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Event Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                    <Calendar className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Date</p>
                      <p className="text-slate-900 font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {event.time && (
                    <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                      <Clock className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Time</p>
                        <p className="text-slate-900 font-medium">{event.time}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                    <MapPin className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Location</p>
                      <p className="text-slate-900 font-medium">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
                        {isPastEvent ? 'Total Attendees' : 'Available Spots'}
                      </p>
                      <p className="text-slate-900 font-medium">{event.attendees}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                {!isPastEvent && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <button 
                      disabled={!event.registrationOpen}
                      className={`w-full py-3 px-6 rounded-lg font-bold text-sm transition-all ${
                        event.registrationOpen
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                    </button>
                  </div>
                )}
              </div>

              {/* Share Section */}
              <div className="bg-slate-100 p-6 rounded-xl">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Share This Event</h3>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-white hover:bg-slate-50 rounded-lg font-medium text-slate-700 text-sm transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 py-2 bg-white hover:bg-slate-50 rounded-lg font-medium text-slate-700 text-sm transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 py-2 bg-white hover:bg-slate-50 rounded-lg font-medium text-slate-700 text-sm transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
