import React from 'react';
import './Resources.css';

const Resources = () => {
  const tips = [
    "Practice deep breathing: Take slow, deep breaths to calm your mind.",
    "Stay connected: Talk to friends or family about how you're feeling.",
    "Exercise regularly: Physical activity can boost your mood and reduce stress.",
    "Get enough sleep: Aim for 7-9 hours of quality sleep each night.",
    "Eat balanced meals: Nutrition plays a key role in mental health.",
  ];

  return (
    <div className="resources">
      <div className="resources-container">
        <h1>Self-Help Resources</h1>
        <ul className="tips-list">
          {tips.map((tip, index) => (
            <li key={index} className="tip-item">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resources;
