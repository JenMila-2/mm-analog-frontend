import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import coverImage2 from '../../assets/Danny_Feng_1.jpg';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import Button from "../../components/buttons/Button";
import styles from './Login.module.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);

    const {login} = useContext(AuthContext);
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        toggleError(false);

        try {
            const response = await axios.post('https://localhost:8080/users/{username}', {
                username: username,
                password: password,
            }, {
                cancelToken: source.token,
                });

            console.log(response.data)

            login(response.data.accessToken);
        } catch (e) {
            console.error(e);
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
                <form className={styles['login-form']} onSubmit={handleSubmit}>
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
                    {error && <p className="error">Username does not match password.</p> }
                    <Button
                        type="button"
                        color="login-large"
                        className={styles['login-button']}
                    >
                        Log in
                    </Button>
                </form>
                <p>Don't have an account? <Link className={styles['signup-link']} to="/signup">Sign up</Link>!</p>
            </div>
        </div>
    )
}

export default Login;