import './RegisterContainer.css';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';

function registerContainer() {

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/');
    };


  return (
    <div className="center-container-login">
        <div className="registerPanel">
            <img id="logo-register" src="src\multimedia\logo-scrum-01.png" width="250"/>
            <form id="registrationForm" className="inputs-register">
                <div className="right-inputs">
                    <input type="text" className="inputRegister-fields" id="username-register" name="username" placeholder="Username" required/>
                    <input type="password" className="inputRegister-fields" id="password-register" name="password" placeholder="Password" required/>
                    <input type="password" className="inputRegister-fields" id="passwordConfirm-register" name="passwordConfirm" placeholder="Confirm Password" required/>
                    <input type="email" className="inputRegister-fields" id="email-register" name="email" placeholder="Email" required/>
                </div>
                <div className="left-inputs">
                    <input type="text" className="inputRegister-fields" id="firstName-register" name="firstName" placeholder="First Name" required/>
                    <input type="text" className="inputRegister-fields" id="lastName-register" name="lastName" placeholder="Last Name" required/>
                    <input type="text" className="inputRegister-fields" id="phone-register" name="phone" placeholder="Phone" required/>
                    <input type="url" className="inputRegister-fields" id="photoURL-register" name="photoURL" placeholder="Photo URL" required/>
                </div>
                <div className="submitButton">
                    <button type="submit" id="registerButton-register">Register</button>
                </div>
            </form>
            <a id="backToLoginLink" onClick={handleCancelClick}>Cancel</a>
            <p id="warningMessage4"></p>
        </div>
    </div>
    );
}

export default registerContainer;