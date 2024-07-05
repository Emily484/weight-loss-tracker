import React, { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className='App-container'>
      {showLogin ? <Login /> : <Registration />}
      <button className='App-toggle-button' onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
}

export default App;
