import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Table, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { FaUserCircle } from 'react-icons/fa';
import Footer from '../../components/Footer';
import '../../assets/css/HostAnalytics.css';

// Sample Data
const sampleGraphData = [
  { month: 'Jan', attendance: 40 },
  { month: 'Feb', attendance: 55 },
  { month: 'Mar', attendance: 75 },
  { month: 'Apr', attendance: 50 },
  { month: 'May', attendance: 90 }
];

const sampleEvents = [
  { id: 1, name: 'Tech Conference', type: 'Conference', date: '2025-08-01', status: 'Active' },
  { id: 2, name: 'Live Concert', type: 'Concert', date: '2025-08-20', status: 'Upcoming' },
  { id: 3, name: 'AI Webinar', type: 'Webinar', date: '2025-09-05', status: 'Completed' }
];

const HostDashboard = () => {
  const [graphData, setGraphData] = useState([]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    setGraphData(sampleGraphData);
    setEventData(sampleEvents);
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
   
      {/* Page Title */}
      <Container className="my-4">
        <h4 className="text-center fw-bold">ANALYTICS</h4>
      </Container>

      {/* Graph Section */}
      <Container className="mb-5">
        <div className="bg-white shadow rounded p-4">
          <h5 className="text-center mb-3">Event Attendance Trend</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#4e73df" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Container>

      {/* Events Table Section */}
      <Container className="mb-5">
        <div className="bg-white shadow rounded p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Events Table</h5>
            <Button variant="outline-primary" size="sm">View All</Button>
          </div>
          <div className="table-responsive">
            <Table hover className="custom-table align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventData.map((event, index) => (
                  <tr key={event.id}>
                    <td>{index + 1}</td>
                    <td>{event.name}</td>
                    <td>{event.type}</td>
                    <td>{event.date}</td>
                    <td>
                      <span className={`badge status-badge status-${event.status.toLowerCase()}`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HostDashboard;
