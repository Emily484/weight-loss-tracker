import React, { useState } from 'react';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5099/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful', data);
        // Handle login success (e.g., redirect, store token)
      } else {
        console.error('Login failed', data.message);
        // Handle login failure
      }
    } catch (error) {
      console.error('Network error', error);
      // Handle network error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <h2 className="loginForm h2">Login</h2>
      <div className='loginForm div'>
        <label className='loginForm label'>Username:</label>
        <input
          className='loginForm input'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='loginForm div'>
        <label className='loginForm label'>Password:</label>
        <input
          className='loginForm input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='loginForm button' type="submit">Login</button>
    </form>
  );
}

export default Login;