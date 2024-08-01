import React, { useState } from 'react';
import './GoalForm.css'

const GoalForm = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [targetWeight, setTargetWeight] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const goal = { startDate, endDate, targetWeight, userId: 1, WeightEntries: [] }; // Define the goal variable
            const response = await fetch('http://localhost:5099/api/Goal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goal),
            });
            if (response.ok) {
                alert('Goal successfully added!');
                // Reset form or redirect user
            } else {
                throw new Error('Failed to add goal.');
            }
        } catch (error) {
            console.error('Error adding goal:', error);
            alert('Failed to add goal.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="goalForm">
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Target Weight:</label>
                <input
                    type="number"
                    step="0.01"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Set Goal</button>
        </form>
    );
};

export default GoalForm;