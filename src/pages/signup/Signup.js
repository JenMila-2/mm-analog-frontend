import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coverImage from '../../assets/Florian_Weichert_1.jpg';
import './Signup.css';
import axios from 'axios';
import Button from "../../components/buttons/Button";

function Signup() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const source = axios.CancelToken.source();
    const navigate = useNavigate;

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            // koppelen aan backend zodra backend gereed is
            await axios.post('https://localhost:8080/users/register', {
                name: name,
                username: username,
                email: email,
                password: password,
                }, {
                cancelToken: source.token,
                });

            navigate.push('./login');
        } catch(e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div className="signup-container">
            <div className="left-section">
                <img src={coverImage} alt="Clouds"/>
            </div>
            <div className="right-section">
                <h1>Create an account</h1>
                    <p className="sub-text">Welcome. Nice to see you!</p>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="name-field">
                        Name
                        <input
                            type="text"
                            id="name-field"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="username-field">
                        Username
                        <input
                            type="text"
                            id="username-field"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="email-field">
                        Email
                        <input
                            type="email"
                            id="email-field"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password-field">
                        Password
                        <input
                            type="password"
                            id="password-field"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className="error">Email already exist. Please try another email.</p>}
                    <Button
                        type="button"
                        color="create-account"
                        className="create-account-button"
                        disabled={loading}
                    >
                        Create an account
                    </Button>
                </form>
                <p>Already have an account? <Link to="/login">Log in</Link>!</p>
            </div>
        </div>
    )
}

export default Signup;