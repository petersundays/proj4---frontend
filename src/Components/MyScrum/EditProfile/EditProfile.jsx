import React, { useState } from 'react';
import './EditProfile.css';
import { UserStore } from '../../../Stores/UserStore';
import { PictureEditionStore } from '../../../Stores/PictureEditionStore';
import AsideEditProfile from './AsideEditProfile';
import Button from '../../General/Button';


function EditProfile() {

    const originalPhotoURL = UserStore.getState().user.photoURL;
    const [photoURL, setPhotoURL] = useState(originalPhotoURL);

    const handlePhotoURLChange = (event) => {
        const newPhotoURL = event.target.value;
        const img = new Image();

        img.src = newPhotoURL;
        img.onload = () => {
            setPhotoURL(newPhotoURL);
            PictureEditionStore.setState({ photoURL: newPhotoURL });
        };
        img.onerror = () => {
            setPhotoURL(originalPhotoURL);
            PictureEditionStore.setState({ photoURL: originalPhotoURL });
        };
    };

    let firstName = UserStore.getState().user.firstName;
    let lastName = UserStore.getState().user.lastName;
    let email = UserStore.getState().user.email;
    let phone = UserStore.getState().user.phone;  


    return (
        <>
            <AsideEditProfile photoURL={photoURL} />
            <div id="cancel-modal" className="modal">
                <div className="modal-content">
                    <p>Cancel changes?</p>
                    <Button text="Yes"></Button>
                    <Button text="No"></Button>
                </div>
            </div> 

            <main className="main-editProfile"> 
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
                            <input type="url" className="editProfile-fields" id="photoURL-editProfile" name="photoURL" placeholder={originalPhotoURL} onChange={handlePhotoURLChange} />
                        </div>
                    </div>
                    <div className="editProfile-Buttons">
                        <Button text="Change Password"></Button>
                        <Button text="Cancel"></Button>
                        <Button type="submit" text="Save"></Button>
                    </div>
                </form>       
            </main>

            <div id="passwordModal">
                <div className="modalContent">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                    </div>
                
                    <form id="changePasswordForm">
                        <input type="password" id="profile_oldPassword" name="profile_oldPassword" placeholder="Current Password:" required />
                        <input type="password" id="profile_newPassword" name="profile_newPassword" placeholder="New Password" required />
                        <input type="password" id="profile_confirmPassword" name="profile_confirmPassword" placeholder="Confirm New Password" required />
                        <Button type="submit" text="Save" />
                    </form>
                </div>
            </div>
        </>
    );
}
export default EditProfile;