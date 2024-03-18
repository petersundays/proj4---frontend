import React, { useEffect, useState } from 'react';
import "./TasksContainer.css";
import TaskElement from './TaskElement';
import { TasksStore } from '../../../Stores/TasksStore';

function TasksContainer() {
    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const unsubscribe = TasksStore.subscribe(
            (newTasks) => {
                console.log('newTasks: ', newTasks);
                setTasks(newTasks.tasks); // Access the tasks array from the newTasks object
            },
            (state) => state.tasks
        );

        // Initialize tasks when the component mounts
        setTasks(TasksStore.getState().tasks);

        return () => {
            unsubscribe();
        };
    }, []);

    const renderTasks = (stateId) => {
        return tasks
            .filter(task => task.stateId === stateId) 
            .map(task => <TaskElement key={task.id} task={task} />);
           
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
