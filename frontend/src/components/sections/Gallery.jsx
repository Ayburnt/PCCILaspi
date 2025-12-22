import React, { useEffect, useState } from "react";
import { client, urlFor } from '../../sanityClient';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the first gallery document found
    client
      .fetch(`*[_type == "gallery"][0]`)
      .then((data) => {
        setGalleryData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 font-medium text-gray-600">Loading Gallery...</div>;
  if (!galleryData || !galleryData.images) return null;

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header Section - Now fully dynamic */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {galleryData.title || "Our Gallery"}
            </h2>
          </div>

          {/* Connected to 'subtitle' field from Sanity */}
          {galleryData.subtitle && (
            <p className="text-gray-500 max-w-md mt-6 md:mt-0 text-center md:text-right italic leading-relaxed">
              {galleryData.subtitle}
            </p>
          )}
        </div>

        {/* Slider Wrapper */}
        <div className="relative px-4 md:px-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={galleryData.images.length > 3} // Only loop if we have enough slides
            slidesPerView={1}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
            }}
            className="pb-20 !overflow-visible"
          >
            {galleryData.images.map((item, index) => (
              <SwiperSlide key={item._key || index} className="transition-all duration-500">
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[4/5] md:aspect-[16/10]">

                  {/* Image with proper Alt text from Sanity */}
                  {item.asset && (
                    <img
                      src={urlFor(item).width(1200).height(800).fit('max').url()}
                      alt={item.alt || galleryData.title || "Gallery Image"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-x-4 bottom-4 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-white text-xl font-bold">
                      {item.title || "Moment Captured"}
                    </h3>
                    <p className="text-white/80 text-xs mt-1 uppercase tracking-widest font-semibold">
                      View Detail
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Scoped Styles for Swiper Customization */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          background: white !important;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
          color: #2563eb !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }

        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }

        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px !important;
          border-radius: 4px !important;
        }

        /* Focus effect for the center slide */
        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.5;
          filter: grayscale(40%) blur(1px);
          transform: scale(0.85) !important;
        }
      `}</style>
    </section>
  );
};

export default Gallery;