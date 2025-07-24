import React from 'react';
import AboutIntro from '../components/AboutUs/AboutIntro';
import WhyChooseUs from '../components/AboutUs/WhyChooseUs';
import EventHiveStory from '../components/AboutUs/EventHiveStory';
import Testimonials from '../components/AboutUs/Testimonials';
import Footer from "../components/Footer";
import StatsCounter from "../components/StatsCounter";
import Speaker from "../components/Speaker";
import { Container } from 'react-bootstrap';
import ContactSection from '../components/AboutUs/ContactSection';

const AboutUs = () => {
  return (
    <>
      <div
        style={{
          
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          position: 'relative',
          height: '400px', 
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Container>
            <p className="fw-bold display-1" >About Us</p>
            <p>
              <span style={{ color: '#fff' }} className='h5'>Home</span>{' '}
              <span style={{ color: '#e91e63' }} className='h5'>&gt;</span>{' '}
              <span style={{ color: '#e91e63' }} className='h5'>About Us</span>
            </p>
          </Container>
        </div>
      </div>

      <AboutIntro />
      <WhyChooseUs />
      <EventHiveStory />
      <StatsCounter />
      <Speaker />
      <Testimonials />
      <ContactSection/>
      
    </>
  );
};

export default AboutUs;
