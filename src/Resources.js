import React, { useState, useEffect } from 'react';
import './Resources.css';

const Resources = () => {
  // Sample resources data - in a real app, this would come from an API
  const initialResources = [
    {
      id: 1,
      title: "Understanding Anxiety: A Beginner's Guide",
      description: "Learn about the science behind anxiety and practical strategies to manage it in daily life.",
      type: "articles",
      category: "Mental Health Education",
      content: "Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily life. This comprehensive guide covers the biological, psychological, and environmental factors that contribute to anxiety disorders.",
      url: "#",
      duration: "10 min read",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "5-Minute Breathing Exercise for Stress Relief",
      description: "A simple guided breathing technique to help you relax and reduce stress in just 5 minutes.",
      type: "breathing",
      category: "Stress Management",
      content: "This 5-minute breathing exercise uses the 4-7-8 technique: inhale for 4 counts, hold for 7 counts, exhale for 8 counts.",
      url: "#",
      duration: "5 minutes",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Mindfulness Meditation for Better Sleep",
      description: "A 15-minute guided meditation to help you relax and prepare for a restful night's sleep.",
      type: "meditation",
      category: "Sleep & Relaxation",
      content: "This guided meditation focuses on body scan techniques and progressive muscle relaxation to help quiet the mind before bedtime.",
      url: "#",
      duration: "15 minutes",
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "Building Resilience: Daily Mental Health Checklist",
      description: "A comprehensive daily checklist to help you maintain good mental health habits.",
      type: "checklists",
      category: "Self-Care",
      content: "Daily practices including gratitude journaling, physical activity, social connection, and mindfulness exercises.",
      url: "#",
      duration: "Daily",
      difficulty: "Beginner"
    },
    {
      id: 5,
      title: "Managing Panic Attacks: Expert Strategies",
      description: "Evidence-based techniques from mental health professionals for managing panic attacks.",
      type: "articles",
      category: "Mental Health Education",
      content: "Learn about the physiology of panic attacks and proven techniques including grounding exercises and cognitive behavioral strategies.",
      url: "#",
      duration: "15 min read",
      difficulty: "Intermediate"
    },
    {
      id: 6,
      title: "Progressive Muscle Relaxation Video Guide",
      description: "A step-by-step video tutorial on progressive muscle relaxation for stress and anxiety relief.",
      type: "videos",
      category: "Stress Management",
      content: "This video demonstrates the systematic tensing and relaxing of muscle groups to release physical tension and promote relaxation.",
      url: "#",
      duration: "12 minutes",
      difficulty: "Beginner"
    },
    {
      id: 7,
      title: "Cognitive Behavioral Techniques for Depression",
      description: "Learn practical CBT techniques to challenge negative thought patterns and improve mood.",
      type: "articles",
      category: "Mental Health Education",
      content: "This article covers cognitive restructuring, behavioral activation, and other evidence-based CBT techniques for managing depression.",
      url: "#",
      duration: "20 min read",
      difficulty: "Intermediate"
    },
    {
      id: 8,
      title: "Morning Mindfulness Routine",
      description: "Start your day with this 10-minute mindfulness practice to set a positive tone.",
      type: "meditation",
      category: "Mindfulness",
      content: "A guided morning meditation focusing on intention setting, gratitude, and present-moment awareness.",
      url: "#",
      duration: "10 minutes",
      difficulty: "Beginner"
    },
    {
      id: 9,
      title: "Workplace Stress Management Checklist",
      description: "A practical checklist for managing stress in professional environments.",
      type: "checklists",
      category: "Stress Management",
      content: "Strategies for boundary setting, time management, communication, and self-care in the workplace.",
      url: "#",
      duration: "Daily",
      difficulty: "Intermediate"
    },
    {
      id: 10,
      title: "Deep Breathing Techniques for Anxiety",
      description: "Advanced breathing exercises for managing anxiety and panic symptoms.",
      type: "breathing",
      category: "Anxiety Management",
      content: "Learn box breathing, alternate nostril breathing, and other advanced techniques for anxiety relief.",
      url: "#",
      duration: "8 minutes",
      difficulty: "Intermediate"
    }
  ];

  const [resources, setResources] = useState(initialResources);
  const [filteredResources, setFilteredResources] = useState(initialResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [resourceUsage, setResourceUsage] = useState({});
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedResources')) || [];
    const savedUsage = JSON.parse(localStorage.getItem('resourceUsage')) || {};

    setBookmarkedResources(savedBookmarks);
    setResourceUsage(savedUsage);
  }, []);

  // Filter resources based on search term, type, and bookmark filter
  useEffect(() => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Filter by bookmarks
    if (showBookmarksOnly) {
      filtered = filtered.filter(resource => bookmarkedResources.includes(resource.id));
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedType, showBookmarksOnly, resources, bookmarkedResources]);

  // Get mood history for recommendations
  const getMoodHistory = () => {
    const moodEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    return moodEntries.slice(-7); // Last 7 days
  };

  // Generate recommendations based on mood history
  const getRecommendedResources = () => {
    const moodHistory = getMoodHistory();
    if (moodHistory.length === 0) return [];

    const avgMood = moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length;

    // Recommend different resources based on average mood
    if (avgMood <= 3) {
      // Low mood - recommend uplifting content
      return resources.filter(r =>
        r.type === 'meditation' ||
        r.type === 'breathing' ||
        r.category === 'Self-Care'
      ).slice(0, 3);
    } else if (avgMood <= 6) {
      // Medium mood - recommend educational content
      return resources.filter(r =>
        r.type === 'articles' ||
        r.type === 'videos'
      ).slice(0, 3);
    } else {
      // High mood - recommend maintenance content
      return resources.filter(r =>
        r.type === 'checklists' ||
        r.category === 'Mindfulness'
      ).slice(0, 3);
    }
  };

  const handleBookmark = (resourceId) => {
    let updatedBookmarks;
    if (bookmarkedResources.includes(resourceId)) {
      updatedBookmarks = bookmarkedResources.filter(id => id !== resourceId);
    } else {
      updatedBookmarks = [...bookmarkedResources, resourceId];
    }

    setBookmarkedResources(updatedBookmarks);
    localStorage.setItem('bookmarkedResources', JSON.stringify(updatedBookmarks));
  };

  const handleResourceClick = (resourceId) => {
    const updatedUsage = {
      ...resourceUsage,
      [resourceId]: (resourceUsage[resourceId] || 0) + 1
    };
    setResourceUsage(updatedUsage);
    localStorage.setItem('resourceUsage', JSON.stringify(updatedUsage));
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'articles': return '📄';
      case 'videos': return '🎥';
      case 'breathing': return '🫁';
      case 'meditation': return '🧘';
      case 'checklists': return '✅';
      default: return '📚';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'articles': return 'Article';
      case 'videos': return 'Video';
      case 'breathing': return 'Breathing Exercise';
      case 'meditation': return 'Guided Meditation';
      case 'checklists': return 'Self-Help Checklist';
      default: return 'Resource';
    }
  };

  const recommendedResources = getRecommendedResources();

  return (
    <div className="resources">
      <div className="resources-container">
        <div className="resources-header">
          <h1>🧠 Mental Health Resources</h1>
          <p className="resources-subtitle">
            Discover tools, techniques, and information to support your mental wellness journey
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filters">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="articles">Articles</option>
              <option value="videos">Videos</option>
              <option value="breathing">Breathing Exercises</option>
              <option value="meditation">Guided Meditation</option>
              <option value="checklists">Self-Help Checklists</option>
            </select>

            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`bookmark-filter-btn ${showBookmarksOnly ? 'active' : ''}`}
            >
              {showBookmarksOnly ? '💖 Bookmarked' : '🤍 All Resources'}
            </button>
          </div>
        </div>

        {/* Recommended Resources Section */}
        {recommendedResources.length > 0 && !showBookmarksOnly && (
          <div className="recommended-section">
            <h2>💡 Recommended for You</h2>
            <p className="section-subtitle">Based on your recent mood entries</p>
            <div className="resources-grid">
              {recommendedResources.map(resource => (
                <div key={resource.id} className="resource-card recommended">
                  <div className="resource-header">
                    <span className="resource-icon">{getResourceIcon(resource.type)}</span>
                    <span className="resource-type">{getTypeLabel(resource.type)}</span>
                    <button
                      onClick={() => handleBookmark(resource.id)}
                      className={`bookmark-btn ${bookmarkedResources.includes(resource.id) ? 'bookmarked' : ''}`}
                    >
                      {bookmarkedResources.includes(resource.id) ? '💖' : '🤍'}
                    </button>
                  </div>
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-meta">
                    <span className="duration">⏱️ {resource.duration}</span>
                    <span className="difficulty">🎯 {resource.difficulty}</span>
                  </div>
                  <button
                    onClick={() => handleResourceClick(resource.id)}
                    className="view-resource-btn"
                  >
                    View Resource
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Resources Section */}
        <div className="resources-section">
          <div className="section-header">
            <h2>{showBookmarksOnly ? '💖 Bookmarked Resources' : '📚 All Resources'}</h2>
            <p className="section-subtitle">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredResources.length === 0 ? (
            <div className="no-resources">
              <p>No resources found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setShowBookmarksOnly(false);
                }}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="resources-grid">
              {filteredResources.map(resource => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-header">
                    <span className="resource-icon">{getResourceIcon(resource.type)}</span>
                    <span className="resource-type">{getTypeLabel(resource.type)}</span>
                    <button
                      onClick={() => handleBookmark(resource.id)}
                      className={`bookmark-btn ${bookmarkedResources.includes(resource.id) ? 'bookmarked' : ''}`}
                    >
                      {bookmarkedResources.includes(resource.id) ? '💖' : '🤍'}
                    </button>
                  </div>
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-meta">
                    <span className="duration">⏱️ {resource.duration}</span>
                    <span className="difficulty">🎯 {resource.difficulty}</span>
                    {resourceUsage[resource.id] && (
                      <span className="usage-count">👁️ {resourceUsage[resource.id]} view{resourceUsage[resource.id] !== 1 ? 's' : ''}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleResourceClick(resource.id)}
                    className="view-resource-btn"
                  >
                    View Resource
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Statistics */}
        {Object.keys(resourceUsage).length > 0 && (
          <div className="usage-stats">
            <h3>📊 Your Activity</h3>
            <p>You've accessed {Object.keys(resourceUsage).length} different resource{Object.keys(resourceUsage).length !== 1 ? 's' : ''}</p>
            <p>Total views: {Object.values(resourceUsage).reduce((sum, count) => sum + count, 0)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
