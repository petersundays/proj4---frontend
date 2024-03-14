import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./MainPage.css";
import AsideAddTask from "./AsideAddTask";
import HomeMainContainer from "./HomeMainContainer";
import BaseHeader from "./baseHeader";
import Footer from "./Footer";
import EditProfile from "./EditProfile/EditProfile";

function MainPage() {
    return (
        <>
            <BaseHeader />
            <div className="container" id="container">
                <AsideAddTask />
                <Routes>
                    <Route path="/" element={<HomeMainContainer />} />
                    <Route path="edit-profile" element={<EditProfile />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default MainPage;