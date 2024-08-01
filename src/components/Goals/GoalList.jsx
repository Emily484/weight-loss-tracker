import React, { useState, useEffect } from 'react';
import './GoalList.css'; // Assume you have similar styling as GoalForm.css

const GoalList = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch('http://localhost:5099/api/Goal/2');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setGoals(Array.isArray(data) ? data : [data]); // Ensure data is always an array
            } catch (error) {
                console.error("Failed to fetch goals:", error);
            }
        };
    
        fetchGoals();
    }, []);

    return (
        <div className="goalList">
            <h2>Existing Goals</h2>
            {goals.length > 0 ? (
                <ul>
                    {goals.map((goal) => (
                        <li key={goal.id}>
                            <div>Start Date: {new Date(goal.startDate).toLocaleDateString()}</div>
                            <div>End Date: {new Date(goal.endDate).toLocaleDateString()}</div>
                            <div>Target Weight: {goal.targetWeight} kg</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No goals found.</p>
            )}
        </div>
    );
};

export default GoalList;