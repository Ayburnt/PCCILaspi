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

  useEffect(() => {
    client
      .fetch(`*[_type == "gallery"][0]`)
      .then((data) => setGalleryData(data))
      .catch(console.error);
  }, []);

  if (!galleryData || !galleryData.images) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
              {galleryData.title || "Gallery"}
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          <p className="text-gray-500 max-w-md mt-4 md:mt-0 text-center md:text-right italic">
            Capturing moments that define our company culture and milestones.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative px-10"> 
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
            }}
            className="pb-20"
          >
            {galleryData.images.map((item, index) => (
              <SwiperSlide key={item._key || index} className="transition-all duration-500">
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[4/5] md:aspect-[16/10]">
                  {/* Image */}
                  <img
                    src={urlFor(item).width(1200).url()}
                    alt={item.title || "Gallery Image"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-x-4 bottom-4 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-white text-xl font-bold">{item.title || "Company Insight"}</h3>
                    <p className="text-white/80 text-sm mt-1 uppercase tracking-widest">Our Workspace</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        /* Custom Navigation Styling */
        .swiper-button-next, .swiper-button-prev {
          background: rgba(255, 255, 255, 0.9) !important;
          width: 55px !important;
          height: 55px !important;
          border-radius: 50% !important;
          color: #1a1a1a !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #eee;
        }

        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: 900;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1 !important;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 30px;
          border-radius: 6px;
        }

        /* Make non-active slides slightly transparent */
        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.4;
          filter: grayscale(100%);
          transform: scale(0.9) !important;
        }
      `}</style>
    </section>
  );
};

export default Gallery;