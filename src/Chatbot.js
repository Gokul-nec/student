import React, { useState, useEffect, useRef } from 'react';
import ChatbotLogic from './ChatbotLogic';
import EmergencyContacts from './EmergencyContacts';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const chatbotLogic = new ChatbotLogic();

  // Load chat history on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatbotHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }

    // Add welcome message
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      message: "Hello! I'm your mental health support companion. I'm here to listen, offer support, and help you access resources. How are you feeling today?",
      timestamp: new Date().toISOString(),
      actions: []
    };

    setMessages([welcomeMessage]);
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatbotHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Analyze message and get response
    const analysis = chatbotLogic.analyzeMessage(inputMessage);
    const response = chatbotLogic.getResponse(inputMessage, analysis);

    // Show typing indicator
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: response.message,
        timestamp: new Date().toISOString(),
        actions: response.actions || [],
        responseType: response.type
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Update chat history
      setChatHistory(prev => [...prev, userMessage, botMessage]);

      // Show emergency contacts if it's a crisis response
      if (response.type === 'crisis') {
        setShowEmergency(true);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickAction = (action) => {
    let message = '';

    switch (action.type) {
      case 'breathing':
        message = "I'd like help with breathing exercises";
        break;
      case 'quote':
        message = "Can I get a motivational quote?";
        break;
      case 'strategies':
        message = "I need some coping strategies";
        break;
      case 'talk':
        message = "I want to talk about how I'm feeling";
        break;
      case 'counselor':
        setShowEmergency(true);
        return;
      default:
        message = "Help me";
    }

    setInputMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  const clearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      message: "Chat history cleared. How can I help you today?",
      timestamp: new Date().toISOString(),
      actions: []
    };
    setMessages([welcomeMessage]);
    setChatHistory([]);
    localStorage.removeItem('chatbotHistory');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageIcon = (type) => {
    return type === 'user' ? '👤' : '🤖';
  };

  if (!isOpen) {
    return (
      <div className="chatbot-container">
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          title="Open mental health support chat"
        >
          <span className="chatbot-icon">💬</span>
          <span className="chatbot-text">Need Support?</span>
        </button>
      </div>
    );
  }

  return (
    <div className="chatbot-container open">
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <span className="chatbot-avatar">🤖</span>
          <div className="chatbot-title">
            <h3>Mental Health Support</h3>
            <p>Available 24/7</p>
          </div>
        </div>
        <div className="chatbot-header-actions">
          <button onClick={clearChat} className="header-btn" title="Clear chat">
            🗑️
          </button>
          <button onClick={() => setIsOpen(false)} className="header-btn" title="Close chat">
            ×
          </button>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-avatar">
              {getMessageIcon(msg.type)}
            </div>
            <div className="message-content">
              <div className="message-text">
                {msg.message}
              </div>
              <div className="message-time">
                {formatTime(msg.timestamp)}
              </div>

              {msg.actions && msg.actions.length > 0 && (
                <div className="message-actions">
                  {msg.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="action-btn"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="message-input"
        />
        <button type="submit" className="send-btn" disabled={!inputMessage.trim()}>
          📤
        </button>
      </form>

      <div className="chatbot-quick-actions">
        <button onClick={() => handleQuickAction({type: 'breathing'})} className="quick-btn">
          🫁 Breathing
        </button>
        <button onClick={() => handleQuickAction({type: 'quote'})} className="quick-btn">
          💭 Quote
        </button>
        <button onClick={() => handleQuickAction({type: 'strategies'})} className="quick-btn">
          🛡️ Strategies
        </button>
        <button onClick={() => setShowEmergency(true)} className="quick-btn emergency">
          🚨 Help
        </button>
      </div>

      {showEmergency && (
        <EmergencyContacts onClose={() => setShowEmergency(false)} />
      )}
    </div>
  );
};

export default Chatbot;
