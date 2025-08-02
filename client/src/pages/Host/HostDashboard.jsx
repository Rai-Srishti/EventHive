import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Button
} from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { getEventsByHostId } from '../../services/hostService';
import Footer from '../../components/Footer';

const HostDashboard = () => {
  const [graphData, setGraphData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const hostId = 1; // Replace with dynamic value if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventsByHostId(hostId);
        const events = Array.isArray(response) ? response : [];

        console.log("Events from /host/{hostId}:", events);
        console.log("Sample event object:", events[0]);

        setEventData(events);

        const graph = events
          .filter(event => event.eventDate)
          .map((event) => {
            const date = new Date(event.eventDate);
            const month = isNaN(date) ? 'Unknown' : date.toLocaleString('default', { month: 'short' });

            return {
              month,
              attendance: Math.floor(Math.random() * 50) + 30 // Dummy attendance
            };
          });

        const grouped = graph.reduce((acc, cur) => {
          const existing = acc.find(item => item.month === cur.month);
          if (existing) {
            existing.attendance += cur.attendance;
          } else {
            acc.push({ ...cur });
          }
          return acc;
        }, []);

        setGraphData(grouped);
      } catch (error) {
        console.error(" Error fetching events:", error);
        setEventData([]);
        setGraphData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <Container className="my-4">
        <h4 className="text-center fw-bold">ANALYTICS</h4>
      </Container>

      {/* Graph */}
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

      {/* Table */}
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
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center">Loading...</td></tr>
                ) : eventData.length > 0 ? (
                  eventData.map((event, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{event.eventName || 'Untitled'}</td>
                      <td>{event.category || 'N/A'}</td>
                      <td>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'Invalid Date'}</td>
                      <td>
                        <span
                          style={{
                            backgroundColor: '#e0e0e0',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            color: '#333',
                            fontSize: '0.85rem'
                          }}
                        >
                          {event.status || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="text-center text-muted">No events found.</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default HostDashboard;
