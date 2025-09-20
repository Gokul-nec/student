import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Student Mental Health Support</h1>
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/mood-tracker" className="navbar-link">Mood Tracker</Link></li>
          <li><Link to="/resources" className="navbar-link">Resources</Link></li>
          <li><Link to="/reminders" className="navbar-link">Reminders</Link></li>
          <li><Link to="/quotes" className="navbar-link">Quotes</Link></li>
          <li><Link to="/chatbot" className="navbar-link">Chat Support</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
