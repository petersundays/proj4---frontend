import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import { UserStore } from '../../../Stores/UserStore';
import AsideEditProfile from './AsideEditProfile';
import Button from '../../General/Button';

function EditProfile() {
    
    const user = UserStore.getState().user;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ ...user }); 
    const [photoURL, setPhotoURL] = useState(user.photoURL);


    const handlePhotoURLChangeOnAside = (event) => {
        const newPhotoURL = event.target.value;
        const img = new Image();

        img.src = newPhotoURL;
        img.onload = () => {
            setPhotoURL(newPhotoURL);
            /* PictureEditionStore.setState({ photoURL: newPhotoURL }); */
        };
        img.onerror = () => {
            setPhotoURL(user.photoURL);
/*             PictureEditionStore.setState({ photoURL: originalPhotoURL });
 */        };
    };


    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangeAndPhotoURLChange = (event) => {
        handleInputChange(event);
        handlePhotoURLChangeOnAside(event);
    };

  /*    const handlePhotoURLChange = (event) => {
        const newPhotoURL = event.target.value;
        setFormData({ ...formData, photoURL: newPhotoURL });
    }; */

    const areInputsUnchanged = () => {
        return (
            formData.firstName === user.firstName &&
            formData.lastName === user.lastName &&
            formData.email === user.email &&
            formData.phone === user.phone &&
            formData.photoURL === user.photoURL
        );
    };

    const inputsThatChanged = () => {
        if (formData.firstName === user.firstName) {
            formData.firstName = null;
        }
        if (formData.lastName === user.lastName) {
            formData.lastName = null;
        }
        if (formData.email === user.email) {
            formData.email = null;
        }
        if (formData.phone === user.phone) {
            formData.phone = null;
        }
        if (formData.photoURL === user.photoURL) {
            formData.photoURL = null;
        }
    };
          

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (areInputsUnchanged()) {
            alert('No changes were made');
            navigate('/my-scrum');
        } else {

            inputsThatChanged();
            console.log('Form Data:', formData);
            
            const token = UserStore.getState().user.token;
            const updateRequest = `http://localhost:8080/backend_proj4_war_exploded/rest/users/update-profile/${user.username}`;
            try {
                const response = await fetch(updateRequest, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        token: token
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const user = await response.json();
                    UserStore.getState().updateUser(formData);
                    alert('Profile updated successfully');
                    navigate('/my-scrum');
                } else {
                    const error = await response.text();
                    alert('Error ELSE: ' + error);
                }
            } catch (error) {
                console.error('Error CATCH:', error);
                alert('Something went wrong. Please try again later.');
            }
        }

    };

    const handleCancel = () => {
        console.log('Cancel');
    };



    return (
        <>
            <AsideEditProfile photoURL={photoURL} />
            <div id="cancel-modal" className="modal">
                <div className="modal-content">
                    <p>Cancel changes?</p>
                    <Button text="Yes" onClick={handleCancel} />
                    <Button text="No" />
                </div>
            </div>

            <main className="main-editProfile">
                <form className="editProfile-register" id="edit-profile-form" onSubmit={handleSubmit}>
                    <div className="editProfile-fieldsContainer">
                        <div className="left-fields-editProfile">
                            <label className="labels-edit-profile" id="email-editProfile-label">Email</label>
                            <input type="email" className="editProfile-fields" id="email-editProfile" name="email" placeholder={user.email} onChange={handleInputChange} />
                            <label className="labels-edit-profile" id="firstName-editProfile-label">First Name</label>
                            <input type="text" className="editProfile-fields" id="firstName-editProfile" name="firstName" placeholder={user.firstName} onChange={handleInputChange} />
                            <label className="labels-edit-profile" id="lastName-editProfile-label">Last Name</label>
                            <input type="text" className="editProfile-fields" id="lastName-editProfile" name="lastName" placeholder={user.lastName} onChange={handleInputChange} />
                            <label className="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                            <input type="text" className="editProfile-fields" id="phone-editProfile" name="phone" placeholder={user.phone} onChange={handleInputChange} />
                            <label className="labels-edit-profile" id="photoURL-editProfile-label">Profile Picture</label>
                            <input type="url" className="editProfile-fields" id="photoURL-editProfile" name="photoURL" placeholder={user.photoURL} onChange={handleInputChangeAndPhotoURLChange} />
                        </div>
                    </div>
                    <div className="editProfile-Buttons">
                        <Button text="Change Password" />
                        <Button text="Cancel" onClick={handleCancel} />
                        <Button type="submit" text="Save" disabled={areInputsUnchanged()} />
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
