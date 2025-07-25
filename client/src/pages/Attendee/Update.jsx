import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import Footer from '../../components/Footer';


function Update() {
    return (
        <div>

            <Container className="my-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ fontSize: '2rem', color: '#343a40' }}>
                        Update Your Profile Information
                    </h2>
                    <div style={{ width: '80px', height: '4px', backgroundColor: '#dc3545', margin: '0.5rem auto 0' }} />
                </div>
                <Form className="mx-auto p-4 border rounded shadow-sm w-100" style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className="text-start d-block"><strong>Name</strong></Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-start d-block"><strong>Email</strong></Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label className="text-start d-block"><strong>Phone Number</strong></Form.Label>
                        <Form.Control type="text" placeholder="Enter your phone number" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formLocation">
                        <Form.Label className="text-start d-block"><strong>Location</strong></Form.Label>
                        <Form.Control type="text" placeholder="Enter your location" />
                    </Form.Group>

                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                        <Button variant="danger" type="submit">Update</Button>
                        <Button variant="secondary">Cancel</Button>
                    </div>
                </Form>
            </Container>

           
        </div>
    );
}

export default Update;
