import React from 'react';
import './EditProfile.css';
import { UserStore } from '../../../Stores/UserStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import MainPage from '../MainPage';

function EditProfile() {
    return (
        <>
            <div id="cancel-modal" className="modal">
                <div className="modal-content">
                    <p>Cancel changes?</p>
                    <button className="modal-button" id="confirm-cancel-button">Yes</button>
                    <button className="modal-button" id="continue-editing-button">No</button>
                </div>
            </div>

            <main className="main-editProfile">
                <div className="details-editProfile">
                    <label id="username-title-editProfile">Username</label> {/* Alterar para o first name do utilizador */}
                    <label id="typeOfUser-title-editProfile"></label>
                    <form className="editProfile-register" id="edit-profile-form">
                        <div className="editProfile-fieldsContainer">
                            <div className="left-fields-editProfile">
                                <label className="labels-edit-profile" id="email-editProfile-label">Email</label>
                                <input type="email" className="editProfile-fields" id="email-editProfile" name="email" placeholder="" />

                                <label className="labels-edit-profile" id="firstName-editProfile-label">First Name</label>
                                <input type="text" className="editProfile-fields" id="firstName-editProfile" name="firstName" placeholder="" />
                                <label className="labels-edit-profile" id="lastName-editProfile-label">Last Name</label>
                                <input type="text" className="editProfile-fields" id="lastName-editProfile" name="lastName" placeholder="" />
                                <label className="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                                <input type="text" className="editProfile-fields" id="phone-editProfile" name="phone" placeholder="" />
                                <label className="labels-edit-profile" id="photoURL-editProfile-label">Photo URL</label>
                                <input type="url" className="editProfile-fields" id="photoURL-editProfile" name="photoURL" placeholder="" />
                            </div>
                            <div className="right-fields-editProfile"></div>
                        </div>
                        <div className="editProfile-Buttons">
                            <button type="button" id="profile-changePass-button">Change Password</button>
                            <button type="submit" id="profile-save-button">Save</button>
                        </div>
                    </form>
                </div>
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