// src/components/SpeakerCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axiosInstance from '../services/axiosInstance'; // Make sure this file is correctly set up
import 'swiper/css';
import '../assets/css/Artist.css';

const SpeakerCarousel = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axiosInstance.get('/artists');
        setSpeakers(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchSpeakers();
  }, []);

  return (
    <section className="speakers-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title">ARTISTS</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          speed={1500}
          autoplay={{
            delay: 2500,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
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
                  src={speaker.photo} // ensure backend sends full image URL
                  alt={speaker.name}
                  className="speaker-img fixed-artist-image"
                />
                <div className="speaker-info">
                  <h5 className="speaker-name">{speaker.name}</h5>
                  <p className="speaker-title">{speaker.genre}</p>
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
