import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./MainPage.css";
import AsideAddTask from "./AsideAddTask";
import TasksContainer from "./TasksContainer";
import BaseHeader from "./baseHeader";
import Footer from "./Footer";
import EditProfile from "./EditProfile/EditProfile";
import AsideEditProfile from "./EditProfile/AsideEditProfile";

function MainPage() {
    return (
        <>
            <BaseHeader />
            <div className="container" id="container">
                <Routes>
                    <Route path="/" element={<TasksContainer />} />
                    <Route path="edit-profile" element={<EditProfile />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default MainPage;