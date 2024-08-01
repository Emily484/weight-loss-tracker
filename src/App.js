import React from 'react';
import { AuthProvider, useAuth } from './context/AuthController.jsx';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import WeightEntryForm from './components/WeightEntries/WeightEntryForm';
import WeightEntryList from './components/WeightEntries/WeightEntryList';
import GoalForm from './components/Goals/GoalForm.jsx'
import GoalList from './components/Goals/GoalList.jsx'
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = React.useState(false);
  const [showEntryForm, setShowEntryForm] = React.useState(false);

  if (isAuthenticated) {
    return (
      <>
       {/* <WeightEntryList /> */}
       <GoalForm />
       <GoalList />
       {showEntryForm ? (
            <WeightEntryForm onClose={() => setShowEntryForm(false)} />
          ) :
          (
            <>
            <WeightEntryList />
            <button className='showEntryFormButton' onClick={() => setShowEntryForm(true)}>+</button>
            </>
          )
        }
      </>
   );
  }

  return (
    <div className='App-container'>
      {showLogin ? <Login /> : <Registration />}
      <button className='App-toggle-button' onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
