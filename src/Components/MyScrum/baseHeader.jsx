import React from 'react';
import './baseHeader.css';
import { UserStore } from '../../Stores/UserStore';


function BaseHeader() {

    console.log("UserStore: ", UserStore.getState().user);
    let firstName = "";
    if (UserStore.getState().user.firstName !== undefined) {
        firstName = UserStore.getState().user.firstName;
    } else {
        firstName = "First Name";
    }

    let photoURL = "";
    if (UserStore.getState().user.photoURL !== undefined) {
        console.log("PHOTO: ", UserStore.getState().user.photoURL);
        photoURL = UserStore.getState().user.photoURL;
    } else {
        console.log("No photo url");
        photoURL = "multimedia/user-avatar.jpg";
    }


    return (
        <>
            <header>
                <img src="./multimedia/logo-scrum-05.png" id="logo-header" height="50" draggable="false"/>
                <nav className="nav-menu-left">
                    <ul id="menu">
                        <li id="nav-home"><a href="home.html" draggable="false">My Scrum</a></li>
                        <li id="nav-all-tasks"><a>All Tasks</a></li>
                    </ul>
                </nav>
                <div className="nav-menu-right">
                    <img src={photoURL} id="profile-pic" draggable="false"/>
                    <a href="edit-profile.html" id="first-name-label" draggable="false">{firstName}</a>
                    <button className="logout-button" id="logout-button-header">
                        <img src="multimedia/logout.png" alt="Logout Icon" draggable="false"/>
                        Logout
                    </button>
                </div>
            </header>
        </>
    );
}
export default BaseHeader; 