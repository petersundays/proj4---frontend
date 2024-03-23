import Button from '../../General/Button';
import './UsersContainer.css';
import { useEffect, useState } from 'react';
import { UserStore } from '../../../Stores/UserStore';
import { AllUsersStore } from '../../../Stores/AllUsersStore';
import { ConfirmationModal } from '../../General/ConfirmationModal';
import { UserDetails } from './UserDetails';
import { getTasksFromUser } from '../../../functions/Tasks/GetTasksFromUser.js';


function UsersContainer() {

    const token = UserStore.getState().user.token;

    const DEVELOPER = 100;
    const SCRUM_MASTER = 200;
    const PRODUCT_OWNER = 300;

    const [displayContainer, setDisplayContainer] = useState(false);
    const [newUser, setNewUser] = useState(AllUsersStore.getState().newUser);
    const [users, setUsers] = useState(AllUsersStore.getState().users);
    const [selectedUser, setSelectedUser] = useState(AllUsersStore.getState().selectedUser);
    const [userType, setUserType] = useState(AllUsersStore.getState().userType);
    const [userTasks, setUserTasks] = useState(undefined); 

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const message = "Are you sure you want to delete this category?";

    useEffect(() => {
        async function fetchUsers() {
            const tasks = await getTasksFromUser(selectedUser.username, token);
            setUserTasks(tasks.length);
        }
        fetchUsers();
    }, [selectedUser]);
    
    useEffect(() => {
        AllUsersStore.getState().setUserType(userType);
    }, [userType]);
    useEffect(() => {
        const unsubscribe = AllUsersStore.subscribe((state) => {
            setUsers(state.users);
            setSelectedUser(state.selectedUser);
            setUserType(state.userType);
            setNewUser(state.newUser);
        });
    
        // Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);





    // Chamar de cada vez que se clicar numa linha da tabela
    const showProfileDetails = () => {
        if (newUser) {
            setNewUser(false);
            AllUsersStore.getState().setNewUser(false);
        }
        setDisplayContainer(true);
    }
    const handleDisplayConfirmationModal = () => {
        setDisplayConfirmationModal(!displayConfirmationModal);
    }

    const convertTypeOfUserToString = (type) => {
        switch (type) {
            case DEVELOPER:
                return 'Developer';
            case SCRUM_MASTER:
                return 'Scrum Master';
            case PRODUCT_OWNER:
                return 'Product Owner';
            default:
                return 'Undefined';
        }
    }

    const getUsersToDisplay = () => {
        let filteredUsers = users;

        /* console.log('users:', users);
        console.log('selectedUser:', selectedUser);
        console.log('userType:', userType);
         */
    
        if (selectedUser !== '') {
            filteredUsers = filteredUsers.filter(user => user.username === selectedUser);
        }
    
        if (userType !== '') {
            filteredUsers = filteredUsers.filter(user => user.typeOfUser === userType);
        }
    
        return filteredUsers.map(user => (
            <tr key={user.username}>
                <td><img src={user.photoURL} alt="" /></td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{convertTypeOfUserToString(user.typeOfUser)}</td>
                <td>{userTasks}</td>
                <td>
                    <div className='buttons-container'>
                        <img src={user.erased ? '../../../multimedia/hide.png' : '../../../multimedia/show.png'} id="hide-show" onClick={handleDisplayConfirmationModal} />
                        <img src='../../../multimedia/deleteUser.png' id="hide-show" hidden={user.erased ? false : true} onClick={handleDisplayConfirmationModal} />
                    </div>
                </td>
            </tr>
        ));
    }

    return (
        <>
            <ConfirmationModal /* onConfirm={handleDeleteCategory} onCancel={handleDisplayConfirmationModal} message={message} displayModal={displayConfirmationModal} */ />
            <main className="main-users">
                <div className="details-editProfile">
                    <div className="container-table">
                        <table className="table">
                            <thead>
                                <tr className="table-header">
                                    <th></th>
                                    <th>Username</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>#Tasks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {getUsersToDisplay()}
                            </tbody>
                        </table>
                    </div>
                </div>
                { <UserDetails displayContainer={displayContainer} /> }
            </main>
        </>
    )
}
export default UsersContainer;
