import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const AboutIntro = () => {
  //<section className="py-5 bg-light">
  return (
    <section className="bg-light">
      <Container>
        <h6 className="text-danger display-6" style={{padding: '45px 0'}}>About EventHive</h6>
        <h2 className="fw-bold">
          Sed Malesuada Massa Lacinia, Dictum Dui A, Dignissim Sem.
        </h2>
        <p className="text-muted py-4" style={{ lineHeight: '2.7' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        
      </Container>
    </section>
  );
};

export default AboutIntro;
