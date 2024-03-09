import React, { useState } from 'react';
import RegisterContainer from './RegisterContainer';

function loginContainer() {

    const [showRegister, setShowRegister] = useState(false);

    if (showRegister) {
        return <RegisterContainer />;
    }

    return (
            
        <div className="loginpanel">
                    <img src="src\multimedia\logo-scrum-01.png" id="logo-login" width="250"/>
                    <form id="login-form" className="input-login">
                        <input type="text" id="username" placeholder="username" required/>
                        <input type="password" id="password" placeholder="password" required/>
                        <button id="loginButton">Login</button>
                        <button id="registerButton" onClick={() => setShowRegister(true)}>Register</button>
                    </form>
                    <p id="warningMessage"></p>
                </div>
    );
}
export default loginContainer;