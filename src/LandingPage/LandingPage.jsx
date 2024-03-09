import	React from 'react';
import './LandingPage.css';
import loginContainer from './LoginContainer';

function LandingPage() {
    return (
        <>
        
            <div className="center-container-login">
                 {loginContainer()}
            </div>
        </>
    );
}
export default LandingPage;