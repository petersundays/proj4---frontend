import React from 'react';
import { Link } from "react-router-dom";
import './baseHeader.css';
import { UserStore } from '../../../Stores/UserStore';
import { TasksStore } from '../../../Stores/TasksStore';
import { CategoriesStore } from '../../../Stores/CategoriesStore';
import { useNavigate } from 'react-router-dom';



function BaseHeader() {

    let firstName = "";
    if (UserStore.getState().user.firstName !== undefined) {
        firstName = UserStore.getState().user.firstName;
    } else {
        firstName = "First Name";
    }

    let photoURL = "";
    if (UserStore.getState().user.photoURL !== undefined) {
        photoURL = UserStore.getState().user.photoURL;
    } else {
        photoURL = "multimedia/user-avatar.jpg";
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        UserStore.setState({ user: {} });
        TasksStore.setState({ tasks: [] });
        CategoriesStore.setState({ categories: [] });

        navigate('/');
    };


    return (
        <>
            <header>
                <img src='/multimedia/logo-scrum-05.png' id="logo-header" height="50" draggable="false"/>
                <nav className="nav-menu-left">
                    <ul id="menu">
                        <li id="nav-home"><Link to="/my-scrum" draggable="false">My Scrum</Link></li>
                        <li id="nav-all-tasks"><a draggable="false">All Tasks</a></li>
                        <li id="nav-categories"><Link to="/my-scrum/categories" draggable="false">Categories</Link></li>

                    </ul>
                </nav>
                <div className="nav-menu-right">
                    <img src={photoURL} id="profile-pic" draggable="false"/>
                    <Link to="/my-scrum/edit-profile" id="first-name-label" draggable="false" >{firstName}</Link>
                    <button className="logout-button" id="logout-button-header" onClick={handleLogout}>
                        <img src="/multimedia/logout.png" alt="Logout Icon" draggable="false"/>
                        Logout
                    </button>
                </div>
            </header>
          
        </>
    );
}
export default BaseHeader; 