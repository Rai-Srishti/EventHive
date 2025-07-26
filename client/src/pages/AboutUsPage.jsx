import React from 'react';
import { useLocation } from 'react-router-dom';
import AboutIntro from '../components/AboutUs/AboutIntro';
import WhyChooseUs from '../components/AboutUs/WhyChooseUs';
import EventHiveStory from '../components/AboutUs/EventHiveStory';
import Testimonials from '../components/AboutUs/Testimonials';
import StatsCounter from "../components/StatsCounter";
import Artist from "../components/Artist";
import ContactSection from '../components/AboutUs/ContactSection';
import '../assets/css/EventPage.css';

const AboutUsPage = () => {
  
  const location = useLocation();
  const pathname = location.pathname;
  const isPublic = !pathname.startsWith('/host') && !pathname.startsWith('/attendee');
  
  return (
    <>
      <div className="events-page">
      {/* Banner Section */}
      <div className="events-banner py-5">
        <div className="banner-content mx-5 px-4">
          <p className="fw-bold display-1">About Us</p>
          {isPublic && (
              <p>
                <span className="h5" style={{ color: '#ffffff' }}>Home</span>{' '}
                <span className="h5" style={{ color: '#e91e63' }}>&gt;</span>{' '}
                <span className="h5" style={{ color: '#e91e63' }}>About Us</span>
              </p>
            )}
        </div>
      </div>
      
        </div>
      

      <AboutIntro />
      <WhyChooseUs />
      <EventHiveStory />
      <StatsCounter />
      <Artist />
      <Testimonials />
      <ContactSection/>
      
    </>
  );
};

export default AboutUsPage;
