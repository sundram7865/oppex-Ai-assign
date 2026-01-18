import React, { useState } from 'react';

const AuthForm = ({ onSubmit }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit({ email: email.trim(), password }, isSignup);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p className="toggle-text">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <span onClick={() => !loading && setIsSignup(!isSignup)}>
          {isSignup ? ' Login' : ' Sign up'}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
