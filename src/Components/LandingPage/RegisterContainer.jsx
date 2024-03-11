import React, { useState } from 'react';
import './RegisterContainer.css';
import { useNavigate } from 'react-router-dom';

function registerContainer() {

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/');
    };

    const [input, setInput] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        photoURL: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const validateInput = () => {

        const valid = true;

        if (input.username === "" || input.password === "" || input.passwordConfirm === "" || input.email === "" || input.firstName === "" || input.lastName === "" || input.phone === "" || input.photoURL === "") {
            document.getElementById("warningMessage4").innerHTML = "All fields are required";
            return;
        } else {
            if ((!/^[a-zA-Z0-9._-]+$/.test(input.username))) {
                document.getElementById("warningMessage4").innerHTML = "Username can only contain letters, numbers, and the following characters: . _ -";
                return;
            } else {
                if (!/^[a-zA-Z0-9._-]+$/.test(input.password)) {
                    document.getElementById("warningMessage4").innerHTML = "Password can only contain letters, numbers, and the following characters: . _ -";
                    return;
                } else {
                    if (input.password !== input.passwordConfirm) {
                        document.getElementById("warningMessage4").innerHTML = "Passwords do not match";
                        return;
                    } else {
                        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(input.email)) {
                            document.getElementById("warningMessage4").innerHTML = "Invalid email";
                            return;
                        } else {
                            if (!/^[a-zA-Z]+$/.test(input.firstName)) {
                                document.getElementById("warningMessage4").innerHTML = "First name can only contain letters";
                                return;
                            } else {
                                if (!/^[a-zA-Z]+$/.test(input.lastName)) {
                                    document.getElementById("warningMessage4").innerHTML = "Last name can only contain letters";
                                    return;
                                } else {
                                    if (!/^[0-9]+$/.test(input.phone)) {
                                        document.getElementById("warningMessage4").innerHTML = "Phone can only contain numbers";
                                        return;
                                    } else {
                                        if (!/^(http|https):\/\/[^ "]+$/.test(input.photoURL)) {
                                            document.getElementById("warningMessage4").innerHTML = "Invalid URL";
                                            return;
                                        } else {
                                            return valid;     
                                        }                               
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    


    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        const registerRequest = "http://localhost:8080/backend_proj4_war_exploded/rest/users/register";

        let newUser = {};

        if (!validateInput()) {
            return;
        } else {
            newUser = {
                username: input.username,
                password: input.password,
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                phone: input.phone,
                photoURL: input.photoURL
            };
            document.getElementById("warningMessage4").innerHTML = "";

            try {
                const response = await fetch(registerRequest, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify(newUser)
                });

                if (response.ok) {
                    navigate('/');
                    console.log('Registration successful');
                } else if (response.status === 409) {
                    alert("Username already in use");
                } else {
                    alert("Something went wrong. Please try again later.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Something went wrong. Please try again later.");
            }
        }
    }


  return (
    <div className="center-container-login">
        <div className="registerPanel">
            <img id="logo-register" src="src\multimedia\logo-scrum-01.png" width="250"/>
            <form id="registrationForm" className="inputs-register">
                <div className="right-inputs">
                    <input type="text" className="inputRegister-fields" id="username-register" name="username" placeholder="Username" required onChange={handleInputChange}/>
                    <input type="password" className="inputRegister-fields" id="password-register" name="password" placeholder="Password" required onChange={handleInputChange}/>
                    <input type="password" className="inputRegister-fields" id="passwordConfirm-register" name="passwordConfirm" placeholder="Confirm Password" required onChange={handleInputChange}/>
                    <input type="email" className="inputRegister-fields" id="email-register" name="email" placeholder="Email" required onChange={handleInputChange}/>
                </div>
                <div className="left-inputs">
                    <input type="text" className="inputRegister-fields" id="firstName-register" name="firstName" placeholder="First Name" required onChange={handleInputChange}/>
                    <input type="text" className="inputRegister-fields" id="lastName-register" name="lastName" placeholder="Last Name" required onChange={handleInputChange}/>
                    <input type="text" className="inputRegister-fields" id="phone-register" name="phone" placeholder="Phone" required onChange={handleInputChange}/>
                    <input type="url" className="inputRegister-fields" id="photoURL-register" name="photoURL" placeholder="Photo URL" required onChange={handleInputChange}/>
                </div>
                <div className="submitButton">
                    <button type="submit" id="registerButton-register" onClick={handleRegisterSubmit}>Register</button>
                </div>
            </form>
            <a id="backToLoginLink" onClick={handleCancelClick}>Cancel</a>
            <p id="warningMessage4"></p>
        </div>
    </div>
    );
}

export default registerContainer;