import React, { useState, useEffect } from 'react';
import './Quotes.css';

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState('all');

  const quotes = [
    {
      id: 1,
      text: "You are stronger than you think.",
      author: "Unknown",
      category: "strength"
    },
    {
      id: 2,
      text: "Every moment is a fresh beginning.",
      author: "T.S. Eliot",
      category: "positivity"
    },
    {
      id: 3,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "motivation"
    },
    {
      id: 4,
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
      category: "strength"
    },
    {
      id: 5,
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      category: "positivity"
    },
    {
      id: 6,
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "motivation"
    },
    {
      id: 7,
      text: "You are never too old to set another goal or to dream a new dream.",
      author: "C.S. Lewis",
      category: "positivity"
    },
    {
      id: 8,
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "strength"
    },
    {
      id: 9,
      text: "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt",
      category: "motivation"
    },
    {
      id: 10,
      text: "In the middle of every difficulty lies opportunity.",
      author: "Albert Einstein",
      category: "positivity"
    },
    {
      id: 11,
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson",
      category: "strength"
    },
    {
      id: 12,
      text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
      author: "A.A. Milne",
      category: "motivation"
    }
  ];

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Get random quote on component mount
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const filteredQuotes = category === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === category);

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    setCurrentQuote(filteredQuotes[randomIndex]);
  };

  const addToFavorites = (quote) => {
    if (!favorites.find(fav => fav.id === quote.id)) {
      const updatedFavorites = [...favorites, quote];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (quoteId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== quoteId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (quoteId) => {
    return favorites.some(fav => fav.id === quoteId);
  };

  const filteredQuotes = category === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === category);

  return (
    <div className="quotes">
      <div className="quotes-container">
        <h1>Motivational Quotes</h1>
        <p>Find inspiration and motivation for your mental health journey.</p>

        <div className="quote-controls">
          <div className="category-filter">
            <label htmlFor="category-select">Category:</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">All Quotes</option>
              <option value="motivation">Motivation</option>
              <option value="strength">Strength</option>
              <option value="positivity">Positivity</option>
            </select>
          </div>

          <button onClick={getRandomQuote} className="btn-random">
            🎲 New Quote
          </button>
        </div>

        <div className="current-quote">
          <div className="quote-card">
            <blockquote className="quote-text">
              "{currentQuote.text}"
            </blockquote>
            <cite className="quote-author">— {currentQuote.author}</cite>
            <div className="quote-actions">
              <button
                onClick={() => addToFavorites(currentQuote)}
                className={`btn-favorite ${isFavorite(currentQuote.id) ? 'active' : ''}`}
                disabled={isFavorite(currentQuote.id)}
              >
                {isFavorite(currentQuote.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        </div>

        <div className="favorites-section">
          <h3>Your Favorite Quotes ({favorites.length})</h3>
          {favorites.length === 0 ? (
            <p className="no-favorites">No favorite quotes yet. Click the heart to save quotes!</p>
          ) : (
            <div className="favorites-grid">
              {favorites.map((quote) => (
                <div key={quote.id} className="favorite-card">
                  <blockquote className="favorite-text">"{quote.text}"</blockquote>
                  <cite className="favorite-author">— {quote.author}</cite>
                  <button
                    onClick={() => removeFromFavorites(quote.id)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="quotes-collection">
          <h3>All Quotes ({filteredQuotes.length})</h3>
          <div className="quotes-grid">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="quote-item">
                <blockquote className="item-text">"{quote.text}"</blockquote>
                <cite className="item-author">— {quote.author}</cite>
                <button
                  onClick={() => setCurrentQuote(quote)}
                  className="btn-view"
                >
                  View Full
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
