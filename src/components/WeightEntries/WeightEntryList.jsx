import React, { useEffect, useState } from 'react';
import './WeightEntryList.css'

function WeightEntryList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('http://localhost:5099/api/WeightEntry');
        const data = await response.json();
        if (response.ok) {
          setEntries(data);
        } else {
          console.error('Failed to fetch weight entries');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5099/api/WeightEntry/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the entry from the state to update the UI
        setEntries(entries.filter(entry => entry.id !== id));
      } else {
        console.error('Failed to delete weight entry');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleEdit = (id) => {
    // Implement the logic to edit an entry.
    // This could involve setting the current entry to be edited in the state
    // and showing a form where the user can update the entry details.
    console.log('Edit functionality not implemented yet');
  };

  return (
    <div className='weightEntriesContainer'>
      <h2 className='weightEntriesTitle'>Weight Entries</h2>
      <ul className='weightEntriesList'>
        {entries.map((entry) => (
          <li className='weightEntryItem' key={entry.id}>
            {new Date(entry.date).toLocaleDateString()}: {entry.weight} lbs
            <button className="editButton" onClick={() => handleEdit(entry.id)}>Edit</button> 
            <button className="deleteButton" onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeightEntryList;