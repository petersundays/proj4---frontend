import React from 'react';
import "./EditTask.css";
import Button from '../../General/Button';
import PriorityButtons from '../../General/PriorityButtons';
import { EditTaskStore } from '../../../Stores/EditTaskStore';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function EditTask() {

    const location = useLocation();
    console.log('LOCATION:', location.state);

    if (location.state != null && location.state.task != undefined) {

        const taskToEditId = location.state.task;
        console.log('TASK TO EDIT:', taskToEditId);
    } else {
        useNavigate('/my-scrum');
    }
    

    return (
        <>
            <main className="main-task">
                <div className="detalhes-task">
                    <div>
                        <textarea id="titulo-task" placeholder='Task Title' ></textarea>
                    </div>
                    <div>
                        <textarea className="text-task" id="descricao-task" placeholder='Task Description'></textarea>
                    </div>
                    <div className="task-save">
                        <Button text="Save"></Button>
                        <Button text="Cancel"></Button>                    
                    </div>
                </div>
                <div className="task-buttons">
                    <div className="status-and-priority">
                        <div className="task-status">
                            <h4 className="taskH4">status</h4>
                            <div className="status-buttons">
                                <button className="status-button todo" id="todo-button">To do</button>
                                <button className="status-button doing" id="doing-button">Doing</button>
                                <button className="status-button done" id="done-button">Done</button>
                            </div>
                        </div>
                        <div className="task-priority">
                            <h4 className="taskH4">priority</h4>
                            <div className="priority-buttons">
                                <PriorityButtons ></PriorityButtons>
                            </div>
                        </div>
                        <div className="dates">
                            <h4 className="taskH4">Dates</h4>
                            <div className="startDateDiv">
                                <label className="label-start-date">Start date: </label>
                                <input type="date" id="startDate-editTask" ></input> 
                        
                                <label className='label-end-date'>End date: </label>
                                <input type="date" id="endDate-editTask" ></input> 
                            </div>
                        </div>
                        <div className="category">
                            <h4 className="taskH4">Category</h4>
                            <div id="div-dropdown">
                                <select id="task-category-edit" required>
                                    <option value="" disabled >Category</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
    </main>

        </>
    ); 
}
export default EditTask;