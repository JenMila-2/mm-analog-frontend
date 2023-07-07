import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import coverImage2 from '../../assets/Danny_Feng_1.jpg';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import styles from './Login.module.css';
import {useForm} from 'react-hook-form';


function Login() {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {login, logoff, isAuth} = useContext(AuthContext);
    const [error, toggleError] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);
    const source = axios.CancelToken.source();
    const navigate = useNavigate();

    useEffect(() => {
       return function cleanup() {
            source.cancel();
        }
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
        } catch (error) {
            console.error('Oops, an error occurred!', error);
            toggleError(true);
        }
    }

    return (
        <main className={styles['login-container']}>
            <div className={styles['left-section']}>
                <img src={coverImage2} alt="Pink Flowers"/>
            </div>
                <div className={styles['right-section-login']}>
                <h1>Welcome back</h1>
                <p>Nice to see you again!</p>
                    {!isAuth ?
                <form className={styles['login-form']} onSubmit={handleSubmit(logInUser)}>
                    <label htmlFor="username-field">
                        Username
                        <input
                            type="text"
                            id="username-field"
                            {...register("username", {
                            required: "This field cannot be empty"
                            })}
                            placeholder="Username"
                        />
                    </label>
                    {errors.username && <p className={styles['error-message-label']} >{error.username.message}</p>}
                    <label htmlFor="password-field">
                        Password
                        <input
                            type="password"
                            id="password-field"
                            {...register("password", {
                                required: "Please enter a valid password"
                            })}
                            placeholder="•••••••••••••••"
                        />
                    </label>
                    {errors.password && <p className={styles['error-message-label']} >{error.password.message}</p>}
                    <button
                        type="submit"
                        className={styles['login-button']}>
                        Log in
                    </button>
                </form>
                        :
                <p>Don't have an account? <Link className={styles['signup-link']} to="/signup">Sign up</Link>!</p>
                    }
            </div>
            {addSuccess === true && <p>Log in to your account was successful!</p>}
        </main>
    );
}

export default Login;