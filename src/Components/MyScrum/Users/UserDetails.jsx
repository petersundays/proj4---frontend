import { useEffect, useState } from 'react';
import { AllUsersStore } from '../../../Stores/AllUsersStore';
import Button from '../../General/Button';
import './UserDetails.css';
import { RegisterUser } from '../../../functions/Users/RegisterUser';
import { showErrorMessage } from '../../../functions/Messages/ErrorMessage';

export function UserDetails () {

    const [displayContainer, setDisplayContainer] = useState(AllUsersStore.getState().displayContainer); 
    const [newUser, setNewUser] = useState(AllUsersStore.getState().newUser);

    const DEVELOPER = 100;
    const SCRUM_MASTER = 200;
    const PRODUCT_OWNER = 300;

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [role, setRole] = useState(DEVELOPER);


    useEffect(() => {
        AllUsersStore.subscribe((state) => {
            setDisplayContainer(state.displayContainer);
            setNewUser(state.newUser);
        });
    }, []);


    const handleInputs = (e) => {
        const { name, value } = e.target;
        switch (name) {
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

    const clearInputs = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setPhotoUrl('');
        setRole(null);
    }


    const handleSaveButton = async (event) => {
        event.preventDefault();
        console.log('Role:', role);
        let registredSuccessfully = false;
        
        //MUDAR ISTO!!!!
        
        const username = email.split('@')[0];
        const password = '123456'; //MUDAR ISTO!!!!

        //MUDAR ISTO!!!!
        

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

        console.log(userToRegister);

        try {
            await RegisterUser(event, userToRegister);
            registredSuccessfully = true;
        } catch (error) {
            console.error('Error:', error);
            showErrorMessage("Something went wrong. Please try again later.");
        }
        console.log('Registred:', registredSuccessfully);
        if (registredSuccessfully) {
            if (newUser) {
                setNewUser(false);
                AllUsersStore.getState().setNewUser(false);
                setDisplayContainer(false);
                AllUsersStore.getState().setDisplayContainer(false);
                clearInputs();
                AllUsersStore.getState().addUser(userToRegister);
            }
        }
    }

    const handleCancelButton = () => {
        if (newUser) {
            setNewUser(false);
            AllUsersStore.getState().setNewUser(false);
            setDisplayContainer(false);
            AllUsersStore.getState().setDisplayContainer(false);
        }
    }
    

    return (
        <div className={ `users-details-container ${!displayContainer ? 'hidden' : ''}` }>
            <h3 id="label-user-details" >{newUser ? "Register New User" : ''}</h3>
            <img src="/multimedia/user-avatar.jpg" id="profile-clicked-pic" alt="Profile Pic" />
            <form id="edit-user-form">
                <label className="labels-edit-profile" id="email-editProfile-label" >Email</label>
                <input type="email" className="editUser-fields" id="email-editUser" name="email" placeholder={newUser ? "Email" : ''} onChange={handleInputs} value={email}/>
                <label className="labels-edit-profile" id="first name-editProfile-label">First Name</label>
                <input type="text" className="editUser-fields" id="first name-editUser" name="first name" placeholder={newUser ? "First Name" : ''} onChange={handleInputs} value={firstName}/>
                <label className="labels-edit-profile" id="last name-editProfile-label">Last Name</label>
                <input type="text" className="editUser-fields" id="last name-editUser" name="last name" placeholder={newUser ? "Last Name" : ''} onChange={handleInputs} value={lastName}/>
                <label className="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                <input type="text" className="editUser-fields" id="phone-editUser" name="phone" placeholder={newUser ? "Phone" : ''} onChange={handleInputs} value={phone}/>
                <label className="labels-edit-profile" id="photo url-editProfile-label">Photo URL</label>
                <input type="url" className="editUser-fields" id="photo url-editUser" name="photo url" placeholder={newUser ? "Profile Picture" : ''} onChange={handleInputs} value={photoUrl}/>
                <select id="select_role" name="role" onChange={handleInputs} value={role}>
                    <option disabled="" value="" id="user_role_loaded" ></option>
                    <option value="100" id="Developer">Developer</option>
                    <option value="200" id="Scrum Master">Scrum Master</option>
                    <option value="300" id="Product Owner">Product Owner</option>
                </select>
                <div className='buttons-container'>
                    <Button width="94px" marginRight= '5px' text="Save" onClick={handleSaveButton}/>
                    <Button width="94px" marginLeft= '5px' text="Cancel" onClick={handleCancelButton}/>

                </div>
            </form>
    </div>
    )
}