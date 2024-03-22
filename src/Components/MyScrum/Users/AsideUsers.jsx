import React, { useState, useEffect } from 'react';
import '../../General/Asides.css';
import Button from '../../General/Button.jsx';
import { AllUsersStore } from '../../../Stores/AllUsersStore.jsx';
import { UserStore } from '../../../Stores/UserStore.jsx';
import { getAllUsers } from '../../../functions/Users/GetAllUsers.js';

function AsideUsers() {

    const token = UserStore.getState().user.token;
    const [users, setUsers] = useState(AllUsersStore.getState().users);
    const [userSearch, setUserSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    



    useEffect(() => {
        getAllUsersFromServer(); 
    }, []);

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
    
        if (searchValue === '') {
            setSelectedUser('');
        } else {
            const matchingUser = users.find(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));
            if (matchingUser) {
                setSelectedUser(matchingUser.username);
            }
        }
    }

    const handleUserChange = async (e) => {
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

      

    return ( 
        <>
            <aside>
                <div className="aside-users-container">
                    <h3 id="addTask-h3">Users</h3>
                    {/* <label className="usersType">Type</label>
                    <select className='usersType-select' id="usersType" name="usersType">
                        <option value="All">All</option>
                        <option value="300">Product Owners</option>
                        <option value="200">Scrum Masters</option>
                        <option value="100">Developers</option>
                    </select>
                    <div className="spacebetween-users"></div>
                    <label className="usersVisibility">Visibility</label>
                    <select id="usersVisibility" name="usersVisibility" >
                        <option value="All" disabled selected>Select an option</option>
                        <option value="All">All</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    <Button text="Search"/>
 */}
                    <input type="search" id="search-input" placeholder="User" onChange={handleUserSearch} />
                    <select id="task-category" value={selectedUser} onChange={handleUserChange} required>
                        <option value="" >All users</option>
                        {createSelectOptions()} 
                    </select>
                        <Button text="Register New User" width="180px" ></Button>
                </div>
            </aside>
        </>
    );
}

export default AsideUsers;
