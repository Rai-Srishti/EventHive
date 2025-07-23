import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Testimonial = () => {
  return (
    <section className="py-5">
      <Container>
        <h6 className="text-danger display-6">Testimonial</h6>
        <h2 className="fw-bold py-4">WHAT PEOPLE SAY ABOUT EVENTHIVE.</h2>
        <Row className="mt-4">
          <Col md={6}>
            <p className='text-muted' style={{ lineHeight:'1.9'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <Row>
                <Col md={4}>
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Scarlett"
                    className="img-fluid rounded-circle"
                  />
                </Col>
                <Col md={8}>
                  <h5>Scarlett Eleanor</h5>
                  <p className="text-muted">Marketing</p>
                  <p>
                    Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus tortor eget magna...
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonial;
