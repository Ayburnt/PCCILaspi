import { useEffect, useState } from 'react';
import { client } from '../../sanityClient'; // Import the connection

export default function NewsFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // This weird string is GROQ - Sanity's query language
    const query = `*[_type == "event"] | order(date desc) {
      title,
      date,
      category
    }`;

    client.fetch(query)
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <section id="news" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Latest News & Updates</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded shadow-sm border-l-4 border-blue-900">
              <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
                {event.category}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mt-2 mb-4 leading-snug">
                {event.title}
              </h3>
              <p className="text-gray-400 text-xs font-medium">
                {event.date}
              </p>
            </div>
          ))}
          
          {events.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center">No upcoming events found.</p>
          )}
        </div>
      </div>
    </section>
  );
}