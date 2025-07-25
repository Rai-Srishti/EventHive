import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMicrophoneAlt, FaUserTie, FaCheck } from 'react-icons/fa';
import { GiSpeaker } from 'react-icons/gi';
import { MdGroups } from 'react-icons/md';
import WhyChooseUsCard from './WhyChooseUsCard';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <GiSpeaker />,
      title: "We Always Provide Intelligent Speaker"
    },
    {
      icon: <FaMicrophoneAlt />,
      title: "A Good Answer Brings Best Knowledge"
    },
    {
      icon: <FaUserTie />,
      title: "We Are Always Dedicated to Our Guest"
    },
    {
      icon: <MdGroups />,
      title: "We Provide Friendly Environment"
    }
  ];

  const points = [
    "Free Certificate",
    "24/7 Support",
    "Conference Lunch",
    "All Type Event",
    "Conference Snacks"
  ];

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Feature Cards */}
          <Col lg={6}>
            <Row className="g-4">
              {features.map((feature, idx) => (
                <Col key={idx} md={6}>
                  <WhyChooseUsCard icon={feature.icon} title={feature.title} />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Right Side - Text Content */}
          <Col lg={6}>
            <h6 className="text-danger mb-3 display-6">Why Choose us</h6>
            <h2 className="fw-bold mb-4">
              Sed Malesuada Massa Lacinia, Dictum Dui A, Dignissim Sem.
            </h2>
            <p className="text-muted mb-4 py-3" style={{ lineHeight: '2' }}>
              Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus tortor eget magna. 
              Donec mattis posuere pharetra. Donec vestibulum ornare velit ut sollicitudin. Pellentesque in faucibus purus.
            </p>
            <Row>
              {points.map((point, idx) => (
                <Col key={idx} xs={6} className="mb-2 d-flex align-items-center">
                  <FaCheck className="text-success me-2" />
                  <strong>{point}</strong>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
