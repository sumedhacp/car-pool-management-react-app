import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Top Navigation Bar component using Bootstrap navigation classes and React Router NavLink components.
 */
const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-car-front-fill fs-4 text-warning"></i>
          <span>CampusCommute</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/">
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/available-rides">
                <i className="bi bi-card-list me-1"></i> Available Rides
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/register-ride">
                <i className="bi bi-plus-circle me-1"></i> Offer Ride
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/book-ride">
                <i className="bi bi-ticket-perforated me-1"></i> Book Seat
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/campus-buses">
                <i className="bi bi-bus-front me-1"></i> Campus Buses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} to="/booking-summaries">
                <i className="bi bi-receipt me-1"></i> Bookings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;