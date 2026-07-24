import React, { useState } from 'react';
import axios from 'axios';

/**
 * RegisterRide component handles driver registration for offering rides using controlled inputs.
 */
const RegisterRide = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    vehicleType: 'Car',
    vehicleNumber: '',
    pickupLocation: '',
    destination: '',
    departureTime: '',
    availableSeats: 1,
  });

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field Validations
    if (
      !formData.driverName ||
      !formData.vehicleNumber ||
      !formData.pickupLocation ||
      !formData.destination ||
      !formData.departureTime
    ) {
      setAlert({ show: true, type: 'danger', message: 'Please complete all required fields.' });
      return;
    }

    if (Number(formData.availableSeats) <= 0) {
      setAlert({ show: true, type: 'danger', message: 'Available seats must be a positive number.' });
      return;
    }

    try {
      await axios.post('http://localhost:3000/add-ride', formData);
      setAlert({ show: true, type: 'success', message: 'Ride successfully registered!' });
      
      // Reset form on success
      setFormData({
        driverName: '',
        vehicleType: 'Car',
        vehicleNumber: '',
        pickupLocation: '',
        destination: '',
        departureTime: '',
        availableSeats: 1,
      });
    } catch (err) {
      setAlert({ show: true, type: 'danger', message: 'Failed to post ride. Please try again.' });
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white py-3">
              <h4 className="mb-0 fw-bold">
                <i className="bi bi-plus-circle me-2"></i>Offer a Ride
              </h4>
            </div>
            <div className="card-body p-4">
              {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAlert({ show: false })}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Driver Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Vehicle Type</label>
                    <select
                      className="form-select"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                    >
                      <option value="Car">Car</option>
                      <option value="Bike/Scooter">Bike/Scooter</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Vehicle Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      placeholder="e.g. KL-07-BX-1234"
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Pickup Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="e.g. North Gate"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Destination</label>
                    <input
                      type="text"
                      className="form-control"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g. Metro Station"
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Departure Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Available Seats</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      name="availableSeats"
                      value={formData.availableSeats}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                  Submit Ride Offer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRide;