import React, { useEffect } from 'react';
import "./TasksContainer.css";
import TaskElement from './TaskElement';
import { MyTasksStore } from '../../../Stores/MyTasksStore';
import { AllTasksStore } from '../../../Stores/AllTasksStore';

function TasksContainer() {

    let tasksToRender = [];

    if (window.location.pathname === '/my-scrum') {
        tasksToRender = MyTasksStore.getState().tasks;
    } else if (window.location.pathname === '/my-scrum/all-tasks') {
        tasksToRender = AllTasksStore.getState().tasks;
    }
    
    
    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;

    useEffect(() => {
    }, [tasksToRender]);

    const renderTasks = (stateId) => {
        console.log('CONTAINER.jsx updated:', tasksToRender);

        return tasksToRender
            ? tasksToRender
                .filter(task => task.stateId === stateId) 
                .map(task => <TaskElement key={task.id} task={task} />)
            : null;
    };
    

    return (
        <>
            <div className="titulo-main">
                <h2 className="main-home">To do</h2>
                <div className="panel" id="todo">
                    {renderTasks(LOW)}
                </div>
            </div>
            <div className="titulo-main">
                <h2 className="main-home">Doing</h2>
                <div className="panel" id="doing">
                    {renderTasks(MEDIUM)}
                </div>
            </div>
            <div className="titulo-main">
                <h2 className="main-home">Done</h2>
                <div className="panel" id="done">
                    {renderTasks(HIGH)}
                </div>
            </div>
        </>
    );
}

export default TasksContainer;
