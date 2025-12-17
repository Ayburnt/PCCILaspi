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

  useEffect(() => {
    const query = `*[_type == "event" && slug.current == $slug][0]`;
    client.fetch(query, { slug })
      .then((data) => setEvent(data))
      .catch(console.error);
  }, [slug]);

  if (!event) return <div className="text-center py-20">Loading event...</div>;

  return (
    <div className="bg-white min-h-screen">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-12">

        <Link 
          to={event.eventType === 'past' ? '/events/past' : '/events/upcoming'} 
          className="text-black-900 font-bold flex items-center gap-2 mb-8"
        >
          <ArrowLeft size={20} /> Back to {event.eventType === 'past' ? 'Past' : 'Upcoming'} Events
        </Link>

        {/* Category + Date + Location */}
        <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4 border-b pb-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="bg-blue-100 text-green-900 px-2 py-1 rounded font-bold uppercase text-xs">
              {event.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {event.date}
            </span>
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {event.location}
              </span>
            )}
            {event.time && (
              <span className="flex items-center gap-1">
                <Clock size={14} /> {event.time}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-green-980 mb-8">
          {event.title}
        </h1>

        {/* Image */}
        {event.image?.asset && (
          <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={urlFor(event.image).width(1200).url()} 
              alt={event.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Event Info Details */}
        {(event.attendees || event.price) && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
            <div className="flex gap-8 flex-wrap">
              {event.price && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Entry Fee</p>
                  <p className="text-lg font-bold text-gray-900">{event.price}</p>
                </div>
              )}
              {event.attendees && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Attendees</p>
                  <p className="text-lg font-bold text-gray-900">{event.attendees}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {event.description && (
          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Highlights</h2>
            <ul className="space-y-3">
              {event.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body */}
        <div className="prose prose-lg max-w-none">
          {event.body ? <PortableText value={event.body} /> : null}
        </div>

        {/* Success Metric (for past events) */}
        {event.eventType === 'past' && event.success && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg mt-10">
            <h3 className="text-lg font-bold text-green-900 mb-3">Event Outcome</h3>
            <p className="text-green-800 leading-relaxed">{event.success}</p>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
