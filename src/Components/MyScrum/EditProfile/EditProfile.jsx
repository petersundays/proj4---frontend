import React from 'react';
import './EditProfile.css';
import Button from '../../General/Button';
import { UserStore } from '../../../Stores/UserStore';
import AsideEditProfile from './AsideEditProfile';


function EditProfile() {

    const username = UserStore.getState().user.username;
    let firstName = UserStore.getState().user.firstName;
    let lastName = UserStore.getState().user.lastName;
    let email = UserStore.getState().user.email;
    let phone = UserStore.getState().user.phone;
    let photoURL = UserStore.getState().user.photoURL;
    


    return (
        <>
            <AsideEditProfile />
            <div id="cancel-modal" className="modal">
                <div className="modal-content">
                    <p>Cancel changes?</p>
                    <Button className="modal-button" id="confirm-cancel-button">Yes</Button>
                    <Button className="modal-button" id="continue-editing-button">No</Button>
                </div>
            </div> 

            <main className="main-editProfile">
                    <div id="div-editProfile">
                        <label id="username-title-editProfile">{username}</label> {/* Alterar para o first name do utilizador */}
                        <img src={photoURL} id="edit-profile-pic" draggable="false" alt="Profile Pic" />
                    </div>
                    {/* <label id="typeOfUser-title-editProfile"></label> */}
                    <form className="editProfile-register" id="edit-profile-form">
                        <div className="editProfile-fieldsContainer">
                            <div className="left-fields-editProfile">
                                <label className="labels-edit-profile" id="email-editProfile-label">Email</label>
                                <input type="email" className="editProfile-fields" id="email-editProfile" name="email" placeholder={email} />

                                <label className="labels-edit-profile" id="firstName-editProfile-label">First Name</label>
                                <input type="text" className="editProfile-fields" id="firstName-editProfile" name="firstName" placeholder={firstName} />
                                <label className="labels-edit-profile" id="lastName-editProfile-label">Last Name</label>
                                <input type="text" className="editProfile-fields" id="lastName-editProfile" name="lastName" placeholder={lastName} />
                                <label className="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                                <input type="text" className="editProfile-fields" id="phone-editProfile" name="phone" placeholder={phone} />
                                <label className="labels-edit-profile" id="photoURL-editProfile-label">Photo URL</label>
                                <input type="url" className="editProfile-fields" id="photoURL-editProfile" name="photoURL" placeholder={photoURL} />
                            </div>
                            <div className="right-fields-editProfile"></div>
                        </div>
                        <div className="editProfile-Buttons">
                            <button type="button" id="profile-changePass-button">Change Password</button>
                            <button type="submit" id="profile-save-button">Save</button>
                        </div>
                    </form>
                    
            </main>

            {/* Password Modal */}
            <div id="passwordModal">
                <div className="modalContent">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                    </div>
                    {/* Form de alteração da password */}
                    <form id="changePasswordForm">
                        <input type="password" id="profile_oldPassword" name="profile_oldPassword" placeholder="Current Password:" required />
                        <input type="password" id="profile_newPassword" name="profile_newPassword" placeholder="New Password" required />
                        <input type="password" id="profile_confirmPassword" name="profile_confirmPassword" placeholder="Confirm New Password" required />
                        <input type="submit" id="profile_savePass" value="Save" />
                    </form>
                </div>
            </div>
        </>
    );
}
export default EditProfile;