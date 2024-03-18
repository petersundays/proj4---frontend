import React, { useState } from 'react';
import './PriorityButtons.css';

function PriorityButtons({ onSelectPriority }) {
    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;

    const [selectedPriority, setSelectedPriority] = useState(null);

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
            >
                Low
            </button>
            <button
                className={`priority-button-home medium ${selectedPriority === MEDIUM ? 'selected' : ''}`}
                onClick={() => handlePriority('Medium')}
            >
                Medium
            </button>
            <button
                className={`priority-button-home high ${selectedPriority === HIGH ? 'selected' : ''}`}
                onClick={() => handlePriority('High')}
            >
                High
            </button>
        </div>
    );
}

export default PriorityButtons;
