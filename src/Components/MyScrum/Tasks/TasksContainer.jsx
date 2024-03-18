import React, { useEffect } from 'react';
import "./TasksContainer.css";
import TaskElement from './TaskElement';

function TasksContainer( {tasks} ) {
    const tasksToRender = tasks.tasks;

    
    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;

    useEffect(() => {
    }, [tasks]);

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
