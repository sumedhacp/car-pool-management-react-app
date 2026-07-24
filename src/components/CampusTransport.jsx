import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * CampusTransport renders official campus bus schedules in a structured Bootstrap table.
 */
const CampusTransport = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:3000/campus-buses');
        setBuses(response.data);
      } catch (error) {
        // Fallback default sample data if endpoint is unpopulated
        setBuses([
          { id: 1, busNumber: 'B-101', route: 'Hostel Block A -> Main Academic Building', departureTime: '08:15 AM', status: 'On Time' },
          { id: 2, busNumber: 'B-102', route: 'South Campus Gate -> Library Square', departureTime: '08:45 AM', status: 'On Time' },
          { id: 3, busNumber: 'B-103', route: 'North Gate -> Tech Park Campus', departureTime: '09:15 AM', status: 'Delayed 5 mins' },
          { id: 4, busNumber: 'B-104', route: 'Sports Complex -> Main Gate Metro', departureTime: '05:30 PM', status: 'On Time' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusSchedules();
  }, []);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Campus Shuttle Timetable</h2>
        <p className="text-muted">Official institutional transportation schedule & status updates.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status"></div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 px-4">Bus No.</th>
                    <th className="py-3">Route Coverage</th>
                    <th className="py-3">Scheduled Time</th>
                    <th className="py-3 px-4 text-end">Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id}>
                      <td className="px-4 fw-bold text-primary">
                        <i className="bi bi-bus-front me-2"></i>
                        {bus.busNumber}
                      </td>
                      <td>{bus.route}</td>
                      <td>{bus.departureTime}</td>
                      <td className="px-4 text-end">
                        <span
                          className={`badge ${
                            bus.status.includes('Delayed') ? 'bg-warning text-dark' : 'bg-success'
                          }`}
                        >
                          {bus.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusTransport;