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
        console.error('Error fetching bus schedules:', error);
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
      ) : buses.length === 0 ? (
        <div className="text-center py-5 bg-light rounded shadow-sm">
          <i className="bi bi-bus-front fs-1 text-muted"></i>
          <p className="mt-3 text-muted mb-0">No campus bus schedules available.</p>
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
                    <tr key={bus._id || bus.id}>
                      <td className="px-4 fw-bold text-primary">
                        <i className="bi bi-bus-front me-2"></i>
                        {bus.busNumber}
                      </td>
                      <td>{bus.route}</td>
                      <td>{bus.departureTime}</td>
                      <td className="px-4 text-end">
                        <span
                          className={`badge ${
                            bus.status && bus.status.includes('Delayed') ? 'bg-warning text-dark' : 'bg-success'
                          }`}
                        >
                          {bus.status || 'On Time'}
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