import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';


import AuthForm from './components/AuthForm';
import StatusDisplay from './components/StatusDisplay';
import { loginUser, signupUser } from './api/auth';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch {
      localStorage.removeItem('token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleAuth = async (credentials, isSignup) => {
    try {
      if (isSignup) {
        await signupUser(credentials);
        alert('Signup successful! Please login to continue.');
      } else {
        const res = await loginUser(credentials);
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Action failed'));
    }
  };

  return (
    <div className="app-container">
      {!token ? (
        <AuthForm onSubmit={handleAuth} />
      ) : (
        user && <StatusDisplay user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
