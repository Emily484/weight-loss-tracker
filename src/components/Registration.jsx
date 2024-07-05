import React, { useState } from 'react';
import './Registration.css'

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5099/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful', data);
        // Handle registration success (e.g., redirect, notify user)
      } else {
        console.error('Registration failed', data.message);
        // Handle registration failure
      }
    } catch (error) {
      console.error('Network error', error);
      // Handle network error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registrationForm">
      <h2 className='registrationForm h2'>Registration</h2>
      <div className='registrationForm div'>
        <label className='registrationForm label'>Username:</label>
        <input
          className='registrationForm input'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='registrationForm div'>
        <label className='registrationForm label'>Password:</label>
        <input
          className='registrationForm input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='registrationForm button' type="submit">Register</button>
    </form>
  );
}

export default Registration;