import { useState } from 'react';
import './PriorityButtons.css';

function PriorityButtons({ onSelectPriority }) {
    
    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;

    const [priority, setPriority] = useState('');

    const handlePriority = (e, priorityValue) => {
        if (priorityValue === 'Low') {
            priorityValue = LOW;
        } else if (priorityValue === 'Medium') {
            priorityValue = MEDIUM;
        } else if (priorityValue === 'High') {
            priorityValue = HIGH;
        }

        setPriority(priorityValue);
        e.target.classList.add('selected');
        onSelectPriority(priorityValue); 
    }

    return (
        <div className="priority-buttons-home">
            <button className="priority-button-home low" id="low-button-home" onClick={(e) => handlePriority(e, 'Low')}>Low</button>
            <button className="priority-button-home medium" id="medium-button-home" onClick={(e) => handlePriority(e, 'Medium')}>Medium</button>
            <button className="priority-button-home high" id="high-button-home" onClick={(e) => handlePriority(e, 'High')}>High</button>
        </div>
    );
}

export default PriorityButtons;
