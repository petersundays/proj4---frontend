import React, { useEffect, useState } from 'react';
import { TasksStore } from '../../../Stores/TasksStore';
import { UserStore } from '../../../Stores/UserStore';
import { getTasksFromUser } from '../../../functions/Tasks.jsx/GetTasksFromUser';
import TasksContainer from './TasksContainer';

function MyTasks() {
    const token = UserStore.getState().user.token;
    const username = UserStore.getState().user.username;

    const [tasksLoaded, setTasksLoaded] = useState(false);

    // Subscribe to TasksStore
    const [tasks, setTasks] = useState(TasksStore.getState().tasks);

    useEffect(() => {
        if (!tasksLoaded) {
            getTasks();
        }

        // Atualiza o estado do componente com o estado do store sempre que a store for atualizado
        const unsubscribe = TasksStore.subscribe(
            (newTasks) => {
                setTasks(newTasks);
            },
            (state) => state.tasks
        );
        

        return () => {
            unsubscribe();
        };
    }, [tasksLoaded]);

    const getTasks = async () => {
        const tasks = await getTasksFromUser(username, token);
        TasksStore.setState({ tasks: tasks });
        setTasksLoaded(true);
        console.log('TASKS STORAGE: ' + TasksStore.getState().tasks);
     };



    return (
        <TasksContainer />
    );
}

export default MyTasks;
