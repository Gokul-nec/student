import React from 'react';

const EmergencyContacts = ({ onClose }) => {
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 confidential support for people in distress",
      type: "crisis"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 crisis counseling via text message",
      type: "crisis"
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "24/7 support for domestic violence situations",
      type: "crisis"
    },
    {
      name: "Substance Abuse and Mental Health Services",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service",
      type: "support"
    },
    {
      name: "Veterans Crisis Line",
      phone: "988 (Press 1)",
      description: "24/7 support for veterans and their families",
      type: "crisis"
    },
    {
      name: "Trans Lifeline",
      phone: "877-565-8860",
      description: "Peer support for transgender people",
      type: "support"
    }
  ];

  const handleCall = (phone) => {
    if (phone.startsWith('Text')) {
      window.location.href = `sms:${phone.split(' to ')[1]}`;
    } else {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleOnlineChat = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="emergency-contacts-overlay">
      <div className="emergency-contacts-modal">
        <div className="emergency-header">
          <h2>🚨 Emergency Resources</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="emergency-content">
          <div className="emergency-intro">
            <p><strong>You are not alone.</strong> Help is available 24/7 from trained professionals.</p>
            <p>If you're in immediate danger, please call emergency services (911) or go to your nearest emergency room.</p>
          </div>

          <div className="contacts-grid">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className={`contact-card ${contact.type}`}>
                <div className="contact-info">
                  <h3>{contact.name}</h3>
                  <p className="contact-phone">{contact.phone}</p>
                  <p className="contact-description">{contact.description}</p>
                </div>
                <div className="contact-actions">
                  <button
                    onClick={() => handleCall(contact.phone)}
                    className="call-btn"
                  >
                    📞 Call Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="online-resources">
            <h3>💬 Online Support</h3>
            <div className="online-buttons">
              <button
                onClick={() => handleOnlineChat('https://suicidepreventionlifeline.org/chat/')}
                className="online-btn"
              >
                Chat with Lifeline
              </button>
              <button
                onClick={() => handleOnlineChat('https://www.crisistextline.org/')}
                className="online-btn"
              >
                Crisis Text Chat
              </button>
            </div>
          </div>

          <div className="counselor-section">
            <h3>🧑‍⚕️ Professional Help</h3>
            <p>If you'd like to speak with a licensed counselor:</p>
            <button className="counselor-btn">
              Connect with Counselor
            </button>
            <p className="counselor-note">
              <small>Available during business hours. Response within 24 hours.</small>
            </p>
          </div>

          <div className="self-care-reminder">
            <h3>💙 Take Care of Yourself</h3>
            <ul>
              <li>Reach out to a trusted friend or family member</li>
              <li>Practice deep breathing exercises</li>
              <li>Go for a walk in nature if possible</li>
              <li>Write down your thoughts and feelings</li>
              <li>Remember: This feeling won't last forever</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
