import Button from '../../General/Button';
import './UsersContainer.css';
import { useEffect, useState } from 'react';
import { UserStore } from '../../../Stores/UserStore';
import { AllUsersStore } from '../../../Stores/AllUsersStore';
import {ConfirmationModal} from '../../General/ConfirmationModal';
import { UserDetails } from './UserDetails';

function UsersContainer() {
    const token = UserStore.getState().user.token;
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const message = "Are you sure you want to delete this category?";



    return (
        <>
            <ConfirmationModal /* onConfirm={handleDeleteCategory} onCancel={handleDisplayConfirmationModal} message={message} displayModal={displayConfirmationModal} */ />
            <main className="main-users">
                <div className="details-editProfile">
                    <div className="container-table">
                        <table className="table">
                            <thead>
                                <tr className="table-header">
                                    <th>Username</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>#Tasks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body"></tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="users-details-container">
                    <img src="/multimedia/user-avatar.jpg" id="profile-clicked-pic" alt="Profile Pic" />
                    <form id="edit-user-form">
                        <label className="labels-edit-profile" id="email-editProfile-label">Email</label>
                        <input type="email" className="editUser-fields" id="email-editUser" name="email" placeholder="admin@admin.com"/>
                        <label className="labels-edit-profile" id="first name-editProfile-label">First Name</label>
                        <input type="text" className="editUser-fields" id="first name-editUser" name="first name" placeholder="admin"/>
                        <label className="labels-edit-profile" id="last name-editProfile-label">Last Name</label>
                        <input type="text" className="editUser-fields" id="last name-editUser" name="last name" placeholder="admin"/>
                        <label className="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                        <input type="text" className="editUser-fields" id="phone-editUser" name="phone" placeholder="123456789"/>
                        <label className="labels-edit-profile" id="photo url-editProfile-label">Photo URL</label>
                        <input type="url" className="editUser-fields" id="photo url-editUser" name="photo url" placeholder="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"/>
                        <select id="select_role">
                            <option disabled="" value="" id="user_role_loaded"></option>
                            <option value="100" id="Developer">Developer</option>
                            <option value="200" id="Scrum Master">Scrum Master</option>
                            <option value="300" id="Product Owner">Product Owner</option>
                        </select>
                        <Button text="Save" />
                    </form>
                </div> */}
                { <UserDetails /> }
            </main>
        </>
    )
}
export default UsersContainer;
