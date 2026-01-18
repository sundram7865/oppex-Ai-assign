import React, { useState } from 'react';
import { validate } from '../api/auth';

const StatusDisplay = ({ user, onLogout }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [justValidated, setJustValidated] = useState(false);

  const handleEmailValidation = async () => {
    setLoading(true);
    setMessage('');
    try {

      await validate(user.email);
      
      setJustValidated(true);
      setMessage('✅ Email validated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Validation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const isUserValidated = user.isValidated || justValidated;

  return (
    <div className="status-container">
      <div className={`card-content ${isUserValidated ? 'success' : 'warning'}`}>
        <div className={isUserValidated ? 'icon-success' : 'icon-warning'}>
          {isUserValidated ? '✓' : '!'}
        </div>
        
        <h2>
          {isUserValidated
            ? 'Your email is validated. You can access the portal.'
            : 'You need to validate your email to access the portal.'}
        </h2>

      
        {!isUserValidated && (
          <button
            className="primary-btn"
            onClick={handleEmailValidation}
            disabled={loading}
          >
            {loading ? 'Validating...' : 'Validate Email'}
          </button>
        )}
      </div>

      {message && <p className="status-message">{message}</p>}
      
     
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default StatusDisplay;