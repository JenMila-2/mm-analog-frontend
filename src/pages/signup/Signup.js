import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coverImage from '../../assets/Florian_Weichert_1.jpg';
import styles from './Signup.module.css';
import axios from 'axios';

function Signup() {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, toggleError] = useState(false);
    const [addSuccess, toggleAddSucces] = useState(false);

    const source = axios.CancelToken.source();
    const navigate = useNavigate();

    useEffect(() => {
        /*return function cleanup() {
            source.cancel();
        }*/
    }, []);

    async function addNewUser(e) {
        e.preventDefault();
        console.log(name, username, email);

        //toggleError(false);

        try {
            const response = await axios.post('http://localhost:8080/users/register', {
                name: name,
                username: username,
                email: email,
                password: password,
                role: ["user"]
                }, {
                cancelToken: source.token,
                });
            console.log(response.data);
            toggleAddSucces(true);
            navigate('/login');
        } catch(e) {
            console.error("Oops, an error occurred!", e);
            toggleError(true);
        }
    }

    return (
        <div className={styles['signup-container']}>
            <div className={styles['left-section']}>
                <img src={coverImage} alt="Clouds"/>
            </div>
            <div className={styles['right-section']}>
                <h1>Create an account</h1>
                    <p className={styles['sub-text']}>Welcome. Nice to see you!</p>
                {addSuccess === true && <p>Yeaahh, your account has been created!</p>}
                <form className={styles['signup-form']} onSubmit={addNewUser}>
                    <label htmlFor="name-field">
                        Name
                        <input
                            type="text"
                            id="name-field"
                            name="name"
                            value={name}
                            placeholder="Name"
                            required="This field cannot be empty"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="username-field">
                        Username
                        <input
                            type="text"
                            id="username-field"
                            name="Username"
                            value={username}
                            placeholder="username"
                            required="This field cannot be empty"
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
                            placeholder="Email"
                            required="Please enter a valid email"
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
                            placeholder="•••••••••••••••"
                            required="Your password should contain at least 7 characters"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className="error">Email already exist. Please try another email.</p>}
                    <button type="submit" className={styles['create-account-button']}>
                        Create account
                    </button>
                </form>
                <p>Already have an account? <Link className={styles['login-link']} to="/login">Log in</Link>!</p>
            </div>
        </div>
    )
}

export default Signup;