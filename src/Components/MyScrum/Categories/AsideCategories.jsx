import '../../General/Asides.css';
import React, { useState } from 'react';
import Button from '../../General/Button.jsx';
import { UserStore } from '../../../Stores/UserStore.jsx';
import { showErrorMessage } from '../../../functions/Messages/ErrorMessage';
import { showSuccessMessage } from '../../../functions/Messages/SuccessMessage'; 

function AsideCategories() {

    const [newCategory, setNewCategory] = useState('');

    const handleNewCategory = (e) => {
        setNewCategory(e.target.value);
    }

    const createCategory = async (e) => {

        const token = UserStore.getState().user.token;
        const category = {
            name: newCategory
          }

        const newCategoryUrl = "http://localhost:8080/backend_proj4_war_exploded/rest/users/newCategory";

        try {
          const response = await fetch(newCategoryUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': '*/*',
                  token: token
              },
              body: JSON.stringify(category)
          });

          if (response.ok) {
              showSuccessMessage("'", category.name,"'", " category created successfully!");
              
          } else {
              const error = await response.text();
              showErrorMessage('Error: ' + error);
          }
        } catch (error) {
            console.error('Error:', error);
            showErrorMessage('Something went wrong. Please try again later.');
        }
    }


    return ( 

        <>
            <aside>
                <div className="add-task-container">
                    <h3 id="categories-h3">Categories</h3>
                    <label className="labels-search-category" id="label-category">Search</label>
                    <input type="search" id="search-category" placeholder="Category"/>
                    <select id="task-category" defaultValue={""} required/>
                    <div id='category-buttons-container'>
                        <Button text="Edit" width="120px" ></Button>
                        <Button text="Search" width="120px" ></Button>
                    </div>
                    <div className='space-between'></div>
                    <label className="labels-create-category" id="label-category">New Category</label>
                    <input type="text" id="create-category-name" placeholder="Category Name" onChange={handleNewCategory}/>
                    <Button text="Create" onClick={createCategory}></Button>
                </div>
            </aside>
    </>
    )
}
export default AsideCategories;