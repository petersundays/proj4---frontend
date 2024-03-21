import React, { useState, useEffect } from 'react';
import '../../General/Asides.css';
import { ConfirmationModal } from '../../General/ConfirmationModal.jsx';
import Button from '../../General/Button.jsx';

function AsideUsers() {

      

    return ( 
        <>
            <ConfirmationModal /* onConfirm={handleDeleteCategory} onCancel={handleDisplayConfirmationModal} message={message} displayModal={displayConfirmationModal} */ />
            <aside>
                <div className="aside-users-container">
                    <h3 id="addTask-h3">Users</h3>
                    {/* <label className="usersType">Type</label>
                    <select className='usersType-select' id="usersType" name="usersType">
                        <option value="All">All</option>
                        <option value="300">Product Owners</option>
                        <option value="200">Scrum Masters</option>
                        <option value="100">Developers</option>
                    </select>
                    <div className="spacebetween-users"></div>
                    <label className="usersVisibility">Visibility</label>
                    <select id="usersVisibility" name="usersVisibility" >
                        <option value="All" disabled selected>Select an option</option>
                        <option value="All">All</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    <Button text="Search"/>
 */}
                    <input type="search" id="search-input" placeholder="Search" />
                    <select id="task-category" /* value={selectedCategory} onChange={handleCategoryChange}  */required>
                        <option value="" >All users</option>
                        {/* {createSelectOptions()} */}
                    </select>
                    <div id='category-buttons-container'>
                        <Button text="Search" width="120px" ></Button>
                        <Button text="Delete" width="120px" ></Button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default AsideUsers;
