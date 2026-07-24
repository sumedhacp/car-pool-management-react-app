import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * BookingSummary displays a comprehensive table of all passenger seat requests.
 */
const BookingSummary = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/booking-summaries');
        setBookings(response.data);
      } catch (err) {
        console.error('Failed to load booking summaries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Passenger Booking Summaries</h2>
        <p className="text-muted">Overview of reserved carpool seats across campus routes.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-5 bg-light rounded shadow-sm">
          <i className="bi bi-journal-x fs-1 text-muted"></i>
          <p className="mt-3 text-muted mb-0">No booking records found.</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3">Passenger Name</th>
                    <th className="py-3">Ride Ref ID</th>
                    <th className="py-3">Seats Requested</th>
                    <th className="py-3 px-4 text-end">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking.id || index}>
                      <td className="px-4 fw-semibold text-muted">#{booking.id || index + 101}</td>
                      <td className="fw-bold">{booking.passengerName}</td>
                      <td>
                        <span className="badge bg-secondary">Ride #{booking.rideId}</span>
                      </td>
                      <td>{booking.seatsRequired} seat(s)</td>
                      <td className="px-4 text-end text-muted">{booking.contactNumber}</td>
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

export default BookingSummary;