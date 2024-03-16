import '../../General/Asides.css';
import React from 'react';
import Button from '../../General/Button.jsx';

function AsideCategories() {

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
                    <input type="text" id="create-category-name" placeholder="Category Name"/>
                    <Button text="Create"></Button>
                </div>
            </aside>
    </>
    )
}
export default AsideCategories;