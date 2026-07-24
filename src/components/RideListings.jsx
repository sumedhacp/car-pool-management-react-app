import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * RideListings component fetches available rides from API and renders them in responsive cards.
 */
const RideListings = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('http://localhost:3000/available-rides');
        setRides(response.data);
      } catch (err) {
        setError('Unable to load available rides. Please check server connectivity.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Available Rides</h2>
          <p className="text-muted mb-0">Find a peer carpool traveling your way.</p>
        </div>
        <Link to="/register-ride" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i> Offer a Ride
        </Link>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && rides.length === 0 && (
        <div className="text-center py-5 bg-light rounded shadow-sm">
          <i className="bi bi-car-front fs-1 text-muted"></i>
          <h5 className="mt-3 text-muted">No rides currently offered</h5>
          <p className="small text-muted">Be the first driver to register a route today!</p>
          <Link to="/register-ride" className="btn btn-primary btn-sm mt-2">
            Register Ride
          </Link>
        </div>
      )}

      <div className="row g-3">
        {rides.map((ride) => (
          <div key={ride._id || ride.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="card-header bg-white border-0 pt-3 d-flex justify-content-between align-items-center">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                  <i className="bi bi-car-front-fill me-1"></i> {ride.vehicleType}
                </span>
                <span className="small text-muted fw-semibold">#{ride.vehicleNumber}</span>
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold text-dark">{ride.driverName}</h5>
                <hr className="text-muted opacity-25" />
                <div className="d-flex flex-column gap-2 mb-3">
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <i className="bi bi-geo-alt-fill text-danger"></i>
                    <span><strong>From:</strong> {ride.pickupLocation}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <i className="bi bi-pin-map-fill text-success"></i>
                    <span><strong>To:</strong> {ride.destination}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <i className="bi bi-clock-fill text-warning"></i>
                    <span><strong>Time:</strong> {ride.departureTime}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-light border-0 d-flex justify-content-between align-items-center py-3">
                <span className={`badge ${ride.availableSeats > 0 ? 'bg-success' : 'bg-danger'} px-2 py-1`}>
                  {ride.availableSeats > 0 ? `${ride.availableSeats} seat(s) left` : 'Fully Booked'}
                </span>
                <Link to="/book-ride" className="btn btn-outline-primary btn-sm fw-semibold">
                  Book Seat
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideListings;