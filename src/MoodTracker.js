import React, { useState, useEffect } from 'react';
import './MoodTracker.css';

const MoodTracker = () => {
  const [mood, setMood] = useState(5);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Component initialization if needed
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      mood,
      notes,
      date: new Date().toISOString(),
    };
    const savedMoods = JSON.parse(localStorage.getItem('moodEntries')) || [];
    savedMoods.push(entry);
    localStorage.setItem('moodEntries', JSON.stringify(savedMoods));
    setSubmitted(true);
    setNotes('');
    setMood(5);
    setTimeout(() => setSubmitted(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="mood-tracker">
      <div className="mood-tracker-container">
        <h1>Mood Tracker</h1>
        <form onSubmit={handleSubmit} className="mood-form">
          <div className="form-group">
            <label htmlFor="mood-slider">How are you feeling? (1-10)</label>
            <input
              type="range"
              id="mood-slider"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="mood-slider"
            />
            <span className="mood-value">{mood}</span>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about your mood..."
              className="notes-textarea"
            />
          </div>
          <button type="submit" className="submit-btn">Save Mood</button>
        </form>
        {submitted && <p className="success-message">Mood saved!</p>}
      </div>
    </div>
  );
};

export default MoodTracker;
