import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../Components/MyScrum/Main/MainPage.css';
import BaseHeader from '../Components/MyScrum/Main/baseHeader';
import Footer from '../Components/MyScrum/Main/Footer';
import CategoriesPage from './CategoriesPage';
import MyTasksPage from './MyTasksPage';
import AllTasksPage from './AllTasksPage';
import EditProfilePage from './EditProfilePage';
import EditTaskPage from './EditTaskPage';
import UsersPage from './UsersPage';

function MainPage() {
    return (
        <>
            <BaseHeader />
            <div className="container" id="container">
                <Routes>
                    <Route path="/" element={< MyTasksPage />} />
                    <Route path="edit-profile" element={<EditProfilePage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="all-tasks" element={<AllTasksPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="edit-task" element={<EditTaskPage />} />

                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default MainPage;