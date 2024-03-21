import React, { useEffect, useState } from 'react';
import './PriorityButtons.css';

function PriorityButtons({ onSelectPriority, priority = null, taskErased }) {
    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;

    const [selectedPriority, setSelectedPriority] = useState(null);

    useEffect(() => {
        setSelectedPriority(priority);
    }, []);

    const handlePriority = (priorityValue) => {
        if (priorityValue === 'Low') {
            setSelectedPriority(LOW);
            onSelectPriority(LOW);
        } else if (priorityValue === 'Medium') {
            setSelectedPriority(MEDIUM);
            onSelectPriority(MEDIUM);
        } else if (priorityValue === 'High') {
            setSelectedPriority(HIGH);
            onSelectPriority(HIGH);
        } 
    };

    return (
        <div className="priority-buttons-home">
            <button
                className={`priority-button-home low ${selectedPriority === LOW ? 'selected' : ''}`}
                onClick={() => handlePriority('Low')}
                disabled={taskErased}
            >
                Low
            </button>
            <button
                className={`priority-button-home medium ${selectedPriority === MEDIUM ? 'selected' : ''}`}
                onClick={() => handlePriority('Medium')}
                disabled={taskErased}
            >
                Medium
            </button>
            <button
                className={`priority-button-home high ${selectedPriority === HIGH ? 'selected' : ''}`}
                onClick={() => handlePriority('High')}
                disabled={taskErased}
            >
                High
            </button>
        </div>
    );
}

export default PriorityButtons;
