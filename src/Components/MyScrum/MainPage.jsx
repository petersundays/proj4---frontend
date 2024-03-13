import React from 'react';
import './MainPage.css';
import AsideAddTask from './AsideAddTask';
import HomeMainContainer from './HomeMainContainer';
import BaseHeader from './baseHeader';
import Footer from './Footer';


function MainPage() {
    return (
        <>
            <BaseHeader/>
            <div className="container"> 
                <AsideAddTask/>
                <HomeMainContainer/>
            </div>
            <Footer/>
        </>
    )
}
export default MainPage;