import React from 'react';
import coverImage from '../../assets/Florian_Weichert_1.jpg';
import './Signup.css';

const Signup = () => {

    return (
        <div className="signup-container">
            <div className="left-section">
                <img src={coverImage} alt="Clouds"/>
            </div>
            <div className="right-section">
                <h1>Create an account</h1>
                    <p className="sub-text">Welcome. Nice to see you!</p>
            </div>
        </div>
    )
}

export default Signup;