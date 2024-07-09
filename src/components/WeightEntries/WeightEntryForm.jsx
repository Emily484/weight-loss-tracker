import React, { useState } from 'react';
import './WeightEntryForm.css'; // Make sure to create a corresponding CSS file for styling

function WeightEntryForm({ onClose }) {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5099/api/WeightEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight, date}),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Weight entry logged successfully', data);
        // Clear form fields
        setWeight('');
        setDate('');
        // Close the form by calling onClose, which also sets showEntryForm to false
        onClose();
      } else {
        console.error('Failed to log weight entry', data.message);
        // Handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Network error', error);
      // Handle network error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="weightEntryForm">
      <h2 className="weightEntryForm h2">Log New Weight Entry</h2>
      <div className='weightEntryForm div'>
        <label className='weightEntryForm label'>Weight (lb):</label>
        <input
          className='weightEntryForm input'
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className='weightEntryForm div'>
        <label className='weightEntryForm label'>Date:</label>
        <input
          className='weightEntryForm input'
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button className='weightEntryForm button' type="submit">Log Entry</button>
      <button className='weightEntryForm button' type="button" onClick={onClose}>Close</button> {/* Close button */}
    </form>
  );
}

export default WeightEntryForm;