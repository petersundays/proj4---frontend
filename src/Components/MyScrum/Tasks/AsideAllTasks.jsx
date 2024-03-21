import React, { useState, useEffect } from 'react';
import Button from '../../General/Button.jsx';
import { UserStore } from '../../../Stores/UserStore.jsx';
import { showErrorMessage } from '../../../functions/Messages/ErrorMessage.js';
import { getAllUsers } from '../../../functions/Users/GetAllUsers.js';
import { getTasksFromUser } from '../../../functions/Tasks/GetTasksFromUser.js';
import { AllTasksStore } from '../../../Stores/AllTasksStore.jsx';
import { getAllTasks } from '../../../functions/Tasks/GetAllTasks.js';

function AsideAllTasks() {

    const token = UserStore.getState().user.token;
    
    const [userSearch, setUserSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    
   
    useEffect(() => {
        getAllUsersFromServer(); 
    }, []);

    useEffect(() => {
        async function fetchTasks() {
            if (selectedUser !== '') {
                const selectedUsersTasks = await getTasksFromUser(selectedUser, token);
                AllTasksStore.setState({ tasks: selectedUsersTasks });
            } else {
                const allTasks = await getAllTasks(token);
                AllTasksStore.setState({ tasks: allTasks });
            }
        }
        fetchTasks();
    }, [selectedUser]);

    const getAllUsersFromServer = async () => {
        try {
            const fetchedUsers = await getAllUsers(token);
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            showErrorMessage('Failed to fetch users. Please try again later.');
        }
    };

    const handleUserSearch = (e) => {
        const searchValue = e.target.value;
        setUserSearch(searchValue);
    
        const matchingUser = users.find(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));
        if (matchingUser) {
            setSelectedUser(matchingUser);
        }
    }

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    }

    const createSelectOptions = () => {
        if (userSearch === '') {
            return users.map(user => (
                <option key={user.username} value={user.username}>{user.username}</option>
            ));
        } else {
            return users
            .filter(user => user.username.toLowerCase().includes(userSearch.toLowerCase()))
            .map(user => (
                <option key={user.username} value={user.username}>{user.username}</option>
            ));
        }
    }


    const handleErasedTasks = async () => {
        const erasedTasks = await getErasedTasks();
        AllTasksStore.setState({ tasks: erasedTasks });
    }


    const getErasedTasks = async () => {
        const getErasedTasks = `http://localhost:8080/backend_proj4_war_exploded/rest/users/erasedTasks`;
        try {
            const response = await fetch(getErasedTasks, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    token: token
                }
            });
            if (response.ok) {
                const erasedTasks = await response.json();
                return erasedTasks;
            } else {
                showErrorMessage('Failed to fetch erased tasks. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching erased tasks:', error);
            showErrorMessage('Failed to fetch erased tasks. Please try again later.');
        }
    }

    return ( 
        <>
            <aside>
                <div className="add-task-container">
                    <h3 id="categories-h3">Search Tasks</h3>
                    <label className="labels-search-category" id="label-category">User</label>
                    <input type="search" id="search-category" placeholder="User" onChange={handleUserSearch}/>
                    <select id="task-category" value={selectedUser} onChange={handleUserChange} required>
                        <option value="" >All Tasks</option>
                        {createSelectOptions()}
                    </select>
                  
                    <div className='space-between'></div>
                    <label className="labels-create-category" id="label-category">Deleted Tasks</label>
                    <Button text="Search" onClick={handleErasedTasks} ></Button>
                </div>
            </aside>
        </>
    );
}

export default AsideAllTasks;
