import React, { useState, useEffect } from 'react';
import './Reminders.css';

const Reminders = () => {
  const [reminders, setReminders] = useState({
    sleep: true,
    hydration: true,
    relaxation: true
  });

  const [notificationStatus, setNotificationStatus] = useState('default');

  useEffect(() => {
    // Check notification permission status
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }

    // Load saved reminder preferences from localStorage
    const savedReminders = localStorage.getItem('reminderSettings');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);
    }
  };

  const handleReminderChange = (reminderType, value) => {
    const updatedReminders = { ...reminders, [reminderType]: value };
    setReminders(updatedReminders);
    localStorage.setItem('reminderSettings', JSON.stringify(updatedReminders));
  };

  const showTestNotification = (type) => {
    if (notificationStatus === 'granted') {
      const messages = {
        sleep: '💤 Time for bed! Getting enough sleep is crucial for your mental health.',
        hydration: '💧 Stay hydrated! Drink a glass of water to keep your mind sharp.',
        relaxation: '🧘 Take a moment to relax. Try some deep breathing exercises.'
      };

      new Notification(`Mental Health Reminder: ${type}`, {
        body: messages[type],
        icon: '/favicon.ico'
      });
    }
  };

  const scheduleReminder = (type, hour, minute) => {
    // This would typically use a more sophisticated scheduling system
    // For now, we'll just show a demo notification
    setTimeout(() => {
      showTestNotification(type);
    }, 5000); // Show after 5 seconds for demo
  };

  return (
    <div className="reminders">
      <div className="reminders-container">
        <h1>Daily Reminders</h1>
        <p>Stay on top of your mental health with personalized reminders.</p>

        <div className="notification-setup">
          <h3>Notification Setup</h3>
          {notificationStatus === 'default' && (
            <button onClick={requestNotificationPermission} className="btn-primary">
              Enable Notifications
            </button>
          )}
          {notificationStatus === 'denied' && (
            <p className="notification-warning">
              Notifications are blocked. Please enable them in your browser settings.
            </p>
          )}
          {notificationStatus === 'granted' && (
            <p className="notification-success">✅ Notifications enabled!</p>
          )}
        </div>

        <div className="reminder-settings">
          <h3>Reminder Settings</h3>

          <div className="reminder-item">
            <div className="reminder-info">
              <h4>💤 Sleep Reminder</h4>
              <p>Get reminded to maintain a healthy sleep schedule</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={reminders.sleep}
                onChange={(e) => handleReminderChange('sleep', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <button
              onClick={() => showTestNotification('sleep')}
              className="btn-secondary"
              disabled={notificationStatus !== 'granted'}
            >
              Test
            </button>
          </div>

          <div className="reminder-item">
            <div className="reminder-info">
              <h4>💧 Hydration Reminder</h4>
              <p>Stay hydrated throughout the day</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={reminders.hydration}
                onChange={(e) => handleReminderChange('hydration', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <button
              onClick={() => showTestNotification('hydration')}
              className="btn-secondary"
              disabled={notificationStatus !== 'granted'}
            >
              Test
            </button>
          </div>

          <div className="reminder-item">
            <div className="reminder-info">
              <h4>🧘 Relaxation Reminder</h4>
              <p>Take breaks to relax and recharge</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={reminders.relaxation}
                onChange={(e) => handleReminderChange('relaxation', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <button
              onClick={() => showTestNotification('relaxation')}
              className="btn-secondary"
              disabled={notificationStatus !== 'granted'}
            >
              Test
            </button>
          </div>
        </div>

        <div className="reminder-demo">
          <h3>Demo: Schedule a Test Reminder</h3>
          <p>Click below to schedule a test reminder (will appear in 5 seconds):</p>
          <div className="demo-buttons">
            <button onClick={() => scheduleReminder('sleep', 22, 0)} className="btn-demo">
              Schedule Sleep Reminder
            </button>
            <button onClick={() => scheduleReminder('hydration', 14, 0)} className="btn-demo">
              Schedule Hydration Reminder
            </button>
            <button onClick={() => scheduleReminder('relaxation', 16, 0)} className="btn-demo">
              Schedule Relaxation Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
