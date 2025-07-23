import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    // 🔒 You can replace this with actual API/email logic
    alert(`Email sent!\nFrom: ${email}\nMessage: ${body}`);
    setEmail('');
    setBody('');
  };

  return (
    <section className="py-5 bg-white">
      <Container>
        <p className="text-center mb-5 display-6">Contact Us</p>
        <Row className="align-items-center">
          {/* Left: Map */}
          <Col md={6} className="mb-4 mb-md-0">
            <div className="ratio ratio-4x3 rounded shadow">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0209736229396!2d-122.42177448468258!3d37.779280379757575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cfe8c4d0f%3A0x8baf91c8b5dd08e9!2sCity%20Hall!5e0!3m2!1sen!2sus!4v1676636580934!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>

          {/* Right: Contact Form */}
          <Col md={6}>
            <Form onSubmit={handleSend}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your message here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
