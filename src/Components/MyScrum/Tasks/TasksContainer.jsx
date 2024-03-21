import React, { useEffect, useState } from 'react';
import "./TasksContainer.css";
import TaskElement from './TaskElement';
import { MyTasksStore } from '../../../Stores/MyTasksStore';
import { AllTasksStore } from '../../../Stores/AllTasksStore';
import { TasksByCategoryStore } from '../../../Stores/TasksByCategoryStore';
import { UserStore } from '../../../Stores/UserStore';

function TasksContainer() {
    const [tasksToRender, setTasksToRender] = useState([]);
    const typeOfUser = UserStore.getState().user.typeOfUser;
    
    const LOW = 100;
    const MEDIUM = 200;
    const HIGH = 300;
    
    const DEVELOPER = 100;
    const SCRUM_MASTER = 200;
    const PRODUCT_OWNER = 300;


    useEffect(() => {
        const updateTasks = () => {
            let tasks = [];
            if (window.location.pathname === '/my-scrum') {
                tasks = MyTasksStore.getState().tasks;
            } else if (window.location.pathname === '/my-scrum/all-tasks') {
                console.log('all tasks' + AllTasksStore.getState().tasks);
                tasks = AllTasksStore.getState().tasks;
            } else if (window.location.pathname === '/my-scrum/categories') {
                tasks = TasksByCategoryStore.getState().tasks;
            }
            setTasksToRender(tasks);
        };

        updateTasks();

        const unsubscribeMyTasks = MyTasksStore.subscribe(updateTasks);
        const unsubscribeAllTasks = AllTasksStore.subscribe(updateTasks);
        const unsubscribeTasksByCategory = TasksByCategoryStore.subscribe(updateTasks);

        return () => {
            unsubscribeMyTasks();
            unsubscribeAllTasks();
            unsubscribeTasksByCategory();
        };
    }, []);

    const filteredTasks = (stateId) => {
        if (typeOfUser === DEVELOPER) {
            return tasksToRender
                .filter(task => task.stateId === stateId && task.erase === false) 
                .map(task => <TaskElement key={task.id} task={task} />)
        } else {
            return tasksToRender
                .filter(task => task.stateId === stateId)
                .map(task => <TaskElement key={task.id} task={task} />)
        }
    }

    const renderTasks = (stateId) => {
        return tasksToRender
            ? filteredTasks(stateId)
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
