import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import coverImage2 from '../../assets/Danny_Feng_1.jpg';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import styles from './Login.module.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [addSuccess, toggleAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const {login, isAuth} = useContext(AuthContext);
    const source = axios.CancelToken.source();

    useEffect(() => {
       /* return function cleanup() {
            source.cancel();
        }*/
    }, []);

    async function logInUser(e) {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: e.username,
                password: e.password,
            }, {
                cancelToken: source.token,
                });
            login(response.data.jwt);
            toggleAddSuccess(true);
        } catch (e) {
            console.error('Oops, an error occurred!', e);
            toggleError(true);
        }
    }

    return (
        <div className={styles['login-container']}>
            <div className={styles['left-section']}>
                <img src={coverImage2} alt="Pink Flowers"/>
            </div>
                <div className={styles['right-section-login']}>
                <h1>Welcome back</h1>
                <p>Nice to see you again!</p>
                <form className={styles['login-form']} onSubmit={logInUser}>
                    <label htmlFor="username-field">
                        Username
                        <input
                            type="text"
                            id="username-field"
                            name="username"
                            value={username}
                            placeholder="Username"
                            required="This field cannot be empty"
                            onChange={(e) => setUsername(e.target.value)}
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
                            required="Please enter a valid password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className="error">Username does not match password.</p> }
                    <button type="submit" className={styles['login-button']}>
                        Log in
                    </button>
                </form>
                <p>Don't have an account? <Link className={styles['signup-link']} to="/signup">Sign up</Link>!</p>
            </div>
            {addSuccess === true && <p>Log in to your account was successful!</p>}
        </div>
    );
}

export default Login;