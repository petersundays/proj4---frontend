import React from 'react';
import './MainPage.css';
import AsideAddTask from './AsideAddTask';
import HomeMainContainer from './HomeMainContainer';
import BaseHeader from './baseHeader';

function MainPage() {
    return (
        <>
            <BaseHeader/>
            <div class="container"> 
                <AsideAddTask/>
                <HomeMainContainer/>
            </div>
        </>
    )
}
export default MainPage;