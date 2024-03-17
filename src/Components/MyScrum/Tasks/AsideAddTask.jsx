import '../../General/Asides.css';
import React from 'react';
import PriorityButtons from '../../General/PriorityButtons.jsx';
import Button from '../../General/Button.jsx';

function AsideAddTask() {

    return ( 

        <>
            <aside>
                <div className="add-task-container">
                    <h3 id="addTask-h3">Add task</h3>
                    <input type="text" id="taskName" placeholder="Title (required)" maxLength="15"/>
                    <textarea id="taskDescription" placeholder="Description (required)"></textarea>
                    <label className="labels-task-priority" id="label-priority">Priority</label>
                    <PriorityButtons/>
                    <label className="labels-task-dates" id="label-startDate">Start date</label>
                    <input type="date" id="task-startDate" required/>
                    <label className="labels-task-dates" id="label-limitDate">End date</label>
                    <input type="date" id="task-limitDate" required/>
                    <label className="labels-task-category" id="label-category">Category</label>
                    <select id="task-category" defaultValue={""} required/>
                    <Button text="Add Task"></Button>
                    <p id="warningMessage2"></p>
                </div>
            </aside>
    </>
    )
}
export default AsideAddTask;