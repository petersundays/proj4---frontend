import './AsideAddTask.css';
import React from 'react';
import { UserStore } from '../../Stores/UserStore';

function AsideEditProfile() {
    const username = UserStore.getState().user.username;
    let photoURL = UserStore.getState().user.photoURL;


    return ( 

        <>
            <aside>
                    <h3 id="username-title-aside">{username}</h3>
                    <img src={photoURL} id="edit-profile-pic-aside" draggable="false" alt="Profile Pic" />
            </aside>
    </>
    )
}
export default AsideEditProfile;