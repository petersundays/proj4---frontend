import React from "react";
import '../Components/MyScrum/Main/MainPage.css';
import TasksContainer from '../Components/MyScrum/Tasks/TasksContainer';
import BaseHeader from '../Components/MyScrum/Main/baseHeader';
import Footer from '../Components/MyScrum/Main/Footer';
import AsideCategories from "../Components/MyScrum//Categories/AsideCategories";

function CategoriesPage() {
    return (
        <>
            
                <AsideCategories />
                <TasksContainer />
                   
                    
            
        </>
    );
}

export default CategoriesPage;