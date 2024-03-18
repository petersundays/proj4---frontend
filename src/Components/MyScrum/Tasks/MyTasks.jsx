import React, { useEffect, useState } from 'react';
import { MyTasksStore } from '../../../Stores/MyTasksStore';
import { UserStore } from '../../../Stores/UserStore';
import { getTasksFromUser } from '../../../functions/Tasks.jsx/GetTasksFromUser';
import TasksContainer from './TasksContainer';

function MyTasks() {
    const token = UserStore.getState().user.token;
    const username = UserStore.getState().user.username;

    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [tasks, setTasks] = useState({ tasks: [] });
    
    useEffect(() => {
        console.log('MyTasksStore updated:', MyTasksStore.getState().tasks);
        if (!tasksLoaded) {
            getTasks();
        }

        // Atualiza o estado do componente com o estado do store sempre que a store for atualizado
        const unsubscribe = MyTasksStore.subscribe(
            (newTasks) => {
                setTasks(newTasks);
            },
            (state) => state.tasks,
            console.log('MYTASKS.jsx subscribe:', MyTasksStore.getState().tasks)
        );
        

        return () => {
            unsubscribe();
        };
    }, []);


    const getTasks = async () => {
        const tasks = await getTasksFromUser(username, token);
        MyTasksStore.setState({ tasks: tasks });
        setTasksLoaded(true);
        console.log('GET TASKS:', tasks);
     };
     

    return (
        <TasksContainer tasks={tasks} />
    );
}

export default MyTasks;


