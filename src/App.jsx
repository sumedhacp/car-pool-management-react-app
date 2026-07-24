import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/Dashboard';
import RideListings from './components/RideListings';
import RegisterRide from './components/RegisterRide';
import BookPassengerings from './components/BookPassengerings';
import CampusTransport from './components/CampusTransport';
import BookingSummary from './components/BookingSummary';

/**
 * Root Application Component setting up React Router paths and layout structure.
 */
function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/available-rides" element={<RideListings />} />
            <Route path="/register-ride" element={<RegisterRide />} />
            <Route path="/book-ride" element={<BookPassengerings />} />
            <Route path="/campus-buses" element={<CampusTransport />} />
            <Route path="/booking-summaries" element={<BookingSummary />} />
          </Routes>
        </main>
        <footer className="bg-white border-top py-3 text-center text-muted small">
          © {new Date().getFullYear()} CampusCommute. Smart Campus Transport & Carpooling.
        </footer>
      </div>
    </Router>
  );
}

export default App;