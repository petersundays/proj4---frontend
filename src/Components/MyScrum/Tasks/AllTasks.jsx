import React, { useEffect, useState } from 'react';
import { AllTasksStore } from '../../../Stores/AllTasksStore';
import { UserStore } from '../../../Stores/UserStore';
import TasksContainer from './TasksContainer';

function AllTasks() {

    // Subscribe to AllTasksStore
    const [tasks, setTasks] = useState(AllTasksStore.getState().tasks);

    useEffect(() => {
        {
            getTasks();
        }

        // Atualiza o estado do componente com o estado do store sempre que a store for atualizado
        const unsubscribe = AllTasksStore.subscribe(
            (newTasks) => {
                setTasks(newTasks);
            },
            (state) => state.tasks
        );
        

        return () => {
            unsubscribe();
        };
    }, []);

    const getTasks = async () => {
        const tasks = await getAllTasks();
        AllTasksStore.setState({ tasks: tasks });
    };


    const getAllTasks = async () => {

        const token = UserStore.getState().user.token;
        const getTasks = "http://localhost:8080/backend_proj4_war_exploded/rest/users/tasks";
        try {
            const response = await fetch(getTasks, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    token: token
                }
            });
            if (response.ok) {
                const tasks = await response.json();
                return tasks;
            } else {
                return [];
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <TasksContainer />
    );
}

export default AllTasks;
