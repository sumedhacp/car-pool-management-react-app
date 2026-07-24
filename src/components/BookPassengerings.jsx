import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * BookPassengerings component provides seat booking interface with client side validation.
 */
const BookPassengerings = () => {
  const [availableRides, setAvailableRides] = useState([]);
  const [formData, setFormData] = useState({
    rideId: '',
    passengerName: '',
    contactNumber: '',
    seatsRequired: 1,
  });

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    axios
      .get('http://localhost:3000/available-rides')
      .then((res) => setAvailableRides(res.data))
      .catch((err) => console.error('Error fetching ride list:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedRide = availableRides.find(
      (r) => String(r._id || r.id) === String(formData.rideId)
    );

    if (!formData.rideId || !formData.passengerName || !formData.contactNumber) {
      setAlert({ show: true, type: 'danger', message: 'Please fill in all mandatory fields.' });
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      setAlert({ show: true, type: 'danger', message: 'Please enter a valid 10-digit contact number.' });
      return;
    }

    if (selectedRide && Number(formData.seatsRequired) > Number(selectedRide.availableSeats)) {
      setAlert({
        show: true,
        type: 'danger',
        message: `Seats requested exceed available limit (${selectedRide.availableSeats} left).`,
      });
      return;
    }

    try {
      await axios.post('http://localhost:3000/book-ride', {
        ...formData,
        seatsRequired: Number(formData.seatsRequired),
      });

      setAlert({ show: true, type: 'success', message: 'Booking confirmed successfully!' });

      setFormData({
        rideId: '',
        passengerName: '',
        contactNumber: '',
        seatsRequired: 1,
      });

      const updatedRides = await axios.get('http://localhost:3000/available-rides');
      setAvailableRides(updatedRides.data);
    } catch (err) {
      setAlert({ show: true, type: 'danger', message: 'Failed to process booking.' });
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-success text-white py-3">
              <h4 className="mb-0 fw-bold">
                <i className="bi bi-ticket-perforated me-2"></i>Book Passenger Seat
              </h4>
            </div>
            <div className="card-body p-4">
              {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  {alert.message}
                  <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Available Ride</label>
                  <select
                    className="form-select"
                    name="rideId"
                    value={formData.rideId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose a Route --</option>
                    {availableRides
                      .filter((ride) => ride.availableSeats > 0)
                      .map((ride) => (
                        <option key={ride._id || ride.id} value={ride._id || ride.id}>
                          {ride.pickupLocation} to {ride.destination} ({ride.driverName} - {ride.departureTime}) - [{ride.availableSeats} seats left]
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Passenger Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="passengerName"
                    value={formData.passengerName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Contact Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Seats Required</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="form-control"
                      name="seatsRequired"
                      value={formData.seatsRequired}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
                  Confirm Seat Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPassengerings;