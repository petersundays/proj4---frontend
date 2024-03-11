import './AsideAddTask.css';

function AsideAddTask() {

    return ( 

        <>
                <aside>
                    <div className="add-task-container">
                        <h3 id="addTask-h3">Add task</h3>
                        <input type="text" id="taskName" placeholder="Title (required)" maxLength="15"/>
                        <textarea id="taskDescription" placeholder="Description (required)"></textarea>
                        <label className="labels-task-priority" id="label-priority">Priority</label>
                            <div className="priority-buttons-home">
                                <button className="priority-button-home low" id="low-button-home">Low</button>
                                <button className="priority-button-home medium" id="medium-button-home">Medium</button>
                                <button className="priority-button-home high" id="high-button-home">High</button>
                            </div>
                        <label className="labels-task-dates" id="label-startDate">Start date</label>
                        <input type="date" id="task-startDate" required/>
                        <label className="labels-task-dates" id="label-limitDate">End date</label>
                        <input type="date" id="task-limitDate" required/>
                        <label className="labels-task-category" id="label-category">Category</label>
                        <select id="task-category" defaultValue={""} required/>
                        <button id="addTask">Add task</button>
                        <p id="warningMessage2"></p>
                    </div>
                </aside>
    </>
    )
}
export default AsideAddTask;