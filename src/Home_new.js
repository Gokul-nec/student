import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to Student Mental Health Support</h1>
        <p>Your well-being matters. Use this platform to track your mood, get helpful resources, set reminders, and find motivation.</p>
        <div className="home-links">
          <Link to="/mood-tracker" className="home-link">Track Your Mood</Link>
          <Link to="/resources" className="home-link">View Resources</Link>
          <Link to="/reminders" className="home-link">Set Reminders</Link>
          <Link to="/quotes" className="home-link">Get Inspired</Link>
          <Link to="/chatbot" className="home-link">Chat Support</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
