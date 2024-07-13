import React, { useEffect, useState } from 'react';
import './WeightEntryList.css'

function WeightEntryList() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

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

  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedEntry = { ...editingEntry };
    if (updatedEntry.date) {
      const date = new Date(updatedEntry.date);
      const adjustedDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
      updatedEntry.date = adjustedDate.toISOString().split('T')[0]; // Convert back to YYYY-MM-DD format
    }

    try {
      const response = await fetch(`http://localhost:5099/api/WeightEntry/${editingEntry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingEntry),
      });
      if (response.ok) {
        // Update the entries state with the updated entry
        setEntries(entries.map(entry => entry.id === editingEntry.id ? editingEntry : entry));
        setEditingEntry(null); // Reset editingEntry to null after successful update
      } else {
        console.error('Failed to update weight entry');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='weightEntriesContainer'>
      <h2 className='weightEntriesTitle'>Weight Entries</h2>
      {editingEntry && (
        <form onSubmit={handleUpdate} className="editEntryForm">
          <input
            className='editEntryForm input'
            type="number"
            value={editingEntry.weight}
            onChange={(e) => setEditingEntry({ ...editingEntry, weight: e.target.value })}
            placeholder="Weight"
          />
          <input
            className='editEntryForm input'
            type="date"
            value={editingEntry.date}
            onChange={(e) => setEditingEntry({ ...editingEntry, date: e.target.value })}
            placeholder="Date"
          />
          <button className="editEntryForm button" type="submit">Update Entry</button>
          <button className="editEntryForm button" type="button" onClick={() => setEditingEntry(null)}>Cancel</button>
        </form>
      )}
      <ul className='weightEntriesList'>
        {entries.map((entry) => (
          <li className='weightEntryItem' key={entry.id}>
            {new Date(entry.date).toLocaleDateString()}: {entry.weight} lbs
            <button className="editButton" onClick={() => handleEdit(entry)}>Edit</button> 
            <button className="deleteButton" onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeightEntryList;