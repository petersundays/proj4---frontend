import { useEffect, useState } from 'react';
import { AllUsersStore } from '../../../Stores/AllUsersStore';
import Button from '../../General/Button';
import './UserDetails.css';
import { RegisterUser } from '../../../functions/Users/RegisterUser';
import { showErrorMessage } from '../../../functions/Messages/ErrorMessage';
import userAvatar from '../../../../multimedia/user-avatar.jpg';
import { showInfoMessage } from '../../../functions/Messages/InfoMessage';
import { UserStore } from '../../../Stores/UserStore';
import { showSuccessMessage } from '../../../functions/Messages/SuccessMessage';

export function UserDetails () {

    const [displayContainer, setDisplayContainer] = useState(AllUsersStore.getState().displayContainer); 
    const [newUser, setNewUser] = useState(AllUsersStore.getState().newUser);

    const DEVELOPER = 100;
    const SCRUM_MASTER = 200;
    const PRODUCT_OWNER = 300;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [role, setRole] = useState(undefined);

    const userToEdit = AllUsersStore.getState().userToEdit;
    const userToEditData = {
        username: userToEdit.username,
        email: userToEdit.email,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        phone: userToEdit.phone,
        photoURL: userToEdit.photoURL,
        typeOfUser: userToEdit.typeOfUser
    }

    useEffect(() => {
        const unsubscribe = AllUsersStore.subscribe((state) => {
            setDisplayContainer(state.displayContainer);
            setNewUser(state.newUser);
        });

        setRole(userToEdit.typeOfUser);
        
        return () => unsubscribe();
    }, [userToEdit]);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'first name':
                setFirstName(value);
                break;
            case 'last name':
                setLastName(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'photo url':
                setPhotoUrl(value);
                break;
            case 'role':
                if (value === '100') {
                    setRole(DEVELOPER);
                } else if (value === '200') {
                    setRole(SCRUM_MASTER);
                }
                else if (value === '300') {
                    setRole(PRODUCT_OWNER);
                }
                break;
            default:
                break;
        }
    }

    const handlePhotoURLChange = (e) => {
        const newPhotoURL = e.target.value;
        const img = new Image();

        img.src = newPhotoURL;
        img.onload = () => {
            setPhotoUrl(newPhotoURL);
        };
        img.onerror = () => {
            
                
                setPhotoUrl(userAvatar);
       
        };
    };

    const handlePhotoUrlAndInputChange = (e) => {
        handleInputs(e);
        handlePhotoURLChange(e);
    };

    const clearInputs = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setPhotoUrl('');
        setRole(undefined);
    }

    const areInputsUnchanged = () => {
        return email === '' && firstName === '' && lastName === '' && phone === '' && photoUrl === '' && role === undefined;
    }

    const inputsThatChanged = () => {
        let updatedUser = {};
    
        if (firstName !== userToEdit.firstName) {
            updatedUser.firstName = firstName;
        }
        if (lastName !== userToEdit.lastName) {
            updatedUser.lastName = lastName;
        }
        if (phone !== userToEdit.phone) {
            updatedUser.phone = phone;
        }
        if (photoUrl !== userToEdit.photoURL) {
            updatedUser.photoURL = photoUrl;
            console.log('photoUrl', photoUrl);
            console.log('userToEdit.photoURL', userToEdit.photoURL);
        }
        if (role !== userToEdit.typeOfUser) {
            updatedUser.typeOfUser = role;
        }
    
        return updatedUser;
    };

    const handleCancelButton = () => {
        if (newUser) {
            clearInputs();
            setNewUser(false);
            AllUsersStore.getState().setNewUser(false);
            setDisplayContainer(false);
            AllUsersStore.getState().setDisplayContainer(false);
        } else {
            clearInputs();
            setDisplayContainer(false);
            AllUsersStore.getState().setDisplayContainer(false);
        }
    }


    const handleSaveButton = async (e) => {
        e.preventDefault();
        if (newUser) {
            await registerNewUser();
        } else {
            console.log('userToEditData', userToEditData);
            await handleSubmitProfileChanges(e);
        }
    }
    
    const registerNewUser = async (event) => {
        event.preventDefault();

        let registredSuccessfully = false;
    
        if (password !== confirmPassword) {
            showErrorMessage("Passwords don't match.");
            return;
        } else {

            const userToRegister = {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                photoURL: photoUrl,
                typeOfUser: role
            }

            try {
                registredSuccessfully = await RegisterUser(event, userToRegister);
                
            } catch (error) {
                console.error('Error:', error);
                showErrorMessage("Something went wrong. Please try again later.");
            }

            if (registredSuccessfully) {
                if (newUser) {
                    
                    AllUsersStore.getState().setNewUser(false);
                    AllUsersStore.getState().setDisplayContainer(false);
                    AllUsersStore.getState().addUser(userToRegister);
                    setNewUser(false);
                    setDisplayContainer(false);
                    clearInputs();
                }
            }
        }
    }


    const handleSubmitProfileChanges = async (e) => {
        e.preventDefault();

        if (areInputsUnchanged()) {
            showInfoMessage('No changes were made');
            setDisplayContainer(false);
            AllUsersStore.getState().setDisplayContainer(false);
        } else {

            const updatedUser = inputsThatChanged();
            
            const token = UserStore.getState().user.token;
            const updateRequest = `http://localhost:8080/backend_proj4_war_exploded/rest/users/update-profile/${userToEdit.username}`;
            try {
                const response = await fetch(updateRequest, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        token: token
                    },
                    body: JSON.stringify(updatedUser)
                });

                if (response.ok) {
                    const user = await response.json();
                    UserStore.getState().updateUser(updatedUser);
                    showSuccessMessage('Profile updated successfully');
                    clearInputs();
                    setDisplayContainer(false);
                    AllUsersStore.getState().setDisplayContainer(false);
                } else {
                    const error = await response.text();
                    showErrorMessage('Error: ' + error);
                }
            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Something went wrong. Please try again later.');
            }
        }

    };
    

    return (
        <div className={ `users-details-container ${!displayContainer ? 'hidden' : ''}` }>
            <h3 id="label-title" >{newUser ? "Register New User" : userToEditData.username}</h3>
            <img src={newUser ? userAvatar : userToEditData.photoURL} id="profile-clicked-pic" alt="Profile Pic" />
            <form id="edit-user-form">
                <label className="labels-edit-profile" id="username-editProfile-label" hidden={newUser ? false : true}>Username</label>
                <input type="text" className="editUser-fields" id="username-editUser" name="username" placeholder={newUser ? "Username" : ''} onChange={handleInputs} value={username} hidden={newUser ? false : true}/>
                <label className="labels-edit-profile" id="password-editProfile-label" hidden={newUser ? false : true}>Password</label>
                <input type="password" className="editUser-fields" id="confirmPassword-editUser" name="password" placeholder={newUser ? "Password" : ''} onChange={handleInputs} value={password} hidden={newUser ? false : true}/>
                <label className="labels-edit-profile" id="confirmPassword-editProfile-label" hidden={newUser ? false : true}>Confirm Password</label>
                <input type="password" className="editUser-fields" id="confirmPassword-editUser" name="confirmPassword" placeholder={newUser ? "Confirm Password" : ''} onChange={handleInputs} value={confirmPassword} hidden={newUser ? false : true}/>
                <label className="labels-edit-profile" id="email-editProfile-label" >Email</label>
                <input type="email" className="editUser-fields" id="email-editUser" name="email" placeholder={newUser ? "Email" : userToEditData.email} onChange={handleInputs} value={email}/>
                <label className="labels-edit-profile" id="first name-editProfile-label">First Name</label>
                <input type="text" className="editUser-fields" id="first name-editUser" name="first name" placeholder={newUser ? "First Name" : userToEditData.firstName} onChange={handleInputs} value={firstName}/>
                <label className="labels-edit-profile" id="last name-editProfile-label">Last Name</label>
                <input type="text" className="editUser-fields" id="last name-editUser" name="last name" placeholder={newUser ? "Last Name" : userToEditData.lastName} onChange={handleInputs} value={lastName}/>
                <label className="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                <input type="text" className="editUser-fields" id="phone-editUser" name="phone" placeholder={newUser ? "Phone" : userToEditData.phone} onChange={handleInputs} value={phone}/>
                <label className="labels-edit-profile" id="photo url-editProfile-label">Photo URL</label>
                <input type="url" className="editUser-fields" id="photo url-editUser" name="photo url" placeholder={newUser ? userAvatar : userToEditData.photoURL} onChange={handlePhotoUrlAndInputChange} /* value={newUser ? userAvatar : userToEditData.photoURL} *//>
                <select id="select_role" name="role" onChange={handleInputs} value={role}>
                    <option disabled="" value="" id="user_role_loaded" ></option>
                    <option value="100" id="Developer" selected={userToEdit.typeOfUser === DEVELOPER}>Developer</option>
                    <option value="200" id="Scrum Master" selected={userToEdit.typeOfUser === SCRUM_MASTER}>Scrum Master</option>
                    <option value="300" id="Product Owner" selected={userToEdit.typeOfUser === PRODUCT_OWNER}>Product Owner</option>
                </select>
                <div className='buttons-container'>
                    <Button width="94px" marginRight= '5px' text="Save" onClick={handleSaveButton}/>
                    <Button width="94px" marginLeft= '5px' text="Cancel" onClick={handleCancelButton}/>

                </div>
            </form>
    </div>
    )
}