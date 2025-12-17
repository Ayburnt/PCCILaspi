import { useEffect, useState } from 'react';
import { client, urlFor } from '../../sanityClient';

export default function Hero() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "hero"][0]{
      badgeText,
      mainHeading,
      highlightedHeading,
      introText,
      backgroundImage {
        asset -> {
          _id,
          url
        },
        hotspot,
        crop
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      },
      heroHeight,
      overlayOpacity
    }`;

    client
      .fetch(query)
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching hero content:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden ">
        <div className="relative z-10 text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  if (!content) {
    return null;
  }

  const heroHeight = content?.heroHeight || 'h-[80vh]';
  const overlayOpacity = content?.overlayOpacity || 'bg-green-900/80';
  const backgroundImageUrl = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80';

  return (
    <section id="home" className={`relative ${heroHeight} flex items-center justify-center overflow-hidden`}>
      
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImageUrl}
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${overlayOpacity} mix-blend-multiply`}></div>
      </div>

      {/* 2. The Content (Centered & White Text) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <span className="inline-block py-1 px-3 rounded-full bg-green-300 text-blue-900 font-bold tracking-widest uppercase text-xs mb-6 shadow-md">
          {content?.badgeText}
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-sm">
          {content?.mainHeading} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-300">{content?.highlightedHeading}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
          {content?.introText}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href={content?.primaryButton?.link || '#join'} 
            className="bg-yellow-500 text-green-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition shadow-lg transform hover:-translate-y-1"
          >
            {content?.primaryButton?.text}
          </a>
          <a 
            href={content?.secondaryButton?.link || '#about'} 
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition transform hover:-translate-y-1"
          >
            {content?.secondaryButton?.text}
          </a>
        </div>
      </div>
    </section>
  );
}