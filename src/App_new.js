import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import MoodTracker from './MoodTracker';
import Resources from './Resources';
import Reminders from './Reminders';
import Quotes from './Quotes';
import Chatbot from './Chatbot';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
        {/* Chatbot is always available as a floating widget on every page */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
