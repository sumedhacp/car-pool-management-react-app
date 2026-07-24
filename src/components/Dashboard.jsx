import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalRides: 0,
    activeDrivers: 0,
    campusBuses: 0,
    popularRoutes: 4,
    dailyRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ridesRes, bookingsRes, busesRes] = await Promise.allSettled([
          axios.get('http://localhost:3000/available-rides'),
          axios.get('http://localhost:3000/booking-summaries'),
          axios.get('http://localhost:3000/campus-buses'),
        ]);

        const rides = ridesRes.status === 'fulfilled' ? ridesRes.value.data : [];
        const bookings = bookingsRes.status === 'fulfilled' ? bookingsRes.value.data : [];
        const buses = busesRes.status === 'fulfilled' ? busesRes.value.data : [];

        const uniqueDrivers = new Set(
          rides.map((r) => r?.driverName).filter(Boolean)
        ).size;

        setMetrics((prev) => ({
          ...prev,
          totalRides: rides.length,
          activeDrivers: uniqueDrivers,
          campusBuses: buses.length,
          dailyRequests: bookings.length,
        }));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { title: 'Available Rides', value: metrics.totalRides, icon: 'bi-car-front', color: 'primary', link: '/available-rides' },
    { title: 'Active Drivers', value: metrics.activeDrivers, icon: 'bi-person-badge', color: 'success', link: '/register-ride' },
    { title: 'Campus Buses', value: metrics.campusBuses, icon: 'bi-bus-front-fill', color: 'info', link: '/campus-buses' },
    { title: 'Popular Routes', value: metrics.popularRoutes, icon: 'bi-signpost-split', color: 'warning', link: '/available-rides' },
    { title: 'Daily Requests', value: metrics.dailyRequests, icon: 'bi-ticket-detailed', color: 'secondary', link: '/booking-summaries' },
  ];

  return (
    <div className="container py-4">
      <div className="mb-4 text-center text-md-start">
        <h2 className="fw-bold text-dark mb-1">Campus Transport Overview</h2>
        <p className="text-muted">Real-time statistics for carpooling and scheduled campus shuttles.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {cards.map((card, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div className={`card border-0 shadow-sm h-100 border-start border-4 border-${card.color}`}>
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted small fw-bold text-uppercase">{card.title}</span>
                    <h2 className="fw-bold my-1">{card.value}</h2>
                    <Link to={card.link} className={`text-${card.color} text-decoration-none small fw-semibold`}>
                      View details
                    </Link>
                  </div>
                  <div className={`p-3 bg-${card.color} bg-opacity-10 text-${card.color} rounded-circle`}>
                    <i className={`bi ${card.icon} fs-2`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
              <div>
                <h5 className="fw-bold mb-1">Commuting today?</h5>
                <p className="text-muted mb-0">Share a ride with your campus peers or check shuttle timings.</p>
              </div>
              <div className="d-flex gap-2">
                <Link to="/register-ride" className="btn btn-primary px-4">
                  <i className="bi bi-plus-lg me-1"></i> Offer Ride
                </Link>
                <Link to="/book-ride" className="btn btn-outline-success px-4">
                  <i className="bi bi-search me-1"></i> Find Ride
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;