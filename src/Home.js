import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to Student Mental Health Support</h1>
        <p>Your well-being matters. Use this platform to track your mood and access helpful resources.</p>
        <div className="home-links">
          <a href="/mood-tracker" className="home-link">Track Your Mood</a>
          <a href="/resources" className="home-link">View Resources</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
