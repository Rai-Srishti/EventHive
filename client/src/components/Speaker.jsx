// src/components/SpeakerCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import speakers from '../assets/sampledata/speakerdata';
import 'swiper/css';
import '../assets/css/Speaker.css';

const SpeakerCarousel = () => {
  return (
    <section className="speakers-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title">TALENTED SPEAKERS</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          speed={1500}
          autoplay={{ delay: 2500, reverseDirection: true, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {speakers.map((speaker, index) => (
            <SwiperSlide key={index}>
              <div className="speaker-card">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="speaker-img"
                />
                <div className="speaker-info">
                  <h5 className="speaker-name">{speaker.name}</h5>
                  <p className="speaker-title">{speaker.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SpeakerCarousel;
