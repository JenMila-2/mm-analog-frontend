import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './Login.module.css';
import coverImage2 from '../../assets/Danny_Feng_1.jpg';

function Login() {
    const { register, formState: {errors}, reset, handleSubmit } = useForm();
    const { login, logoff, auth } = useContext(AuthContext);
    const source = axios.CancelToken.source();
    const [error, toggleError] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);

    async function loginUser(data) {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password,
            }, {
                cancelToken: source.token,
            })
            login(response.data.jwt);
            setAddSuccess(true);
            reset();
        } catch (error) {
            console.error('Oops, something went wrong...', error);
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
                <p className={styles['sub-text']}>Nice to see you again!</p>
                {!auth ?
                    <form className={styles['login-form']} onSubmit={handleSubmit(loginUser)}>
                        <label htmlFor="username-field" className={styles['login-form-label']}>
                            Username
                            <input
                                type="text"
                                id="username-field"
                                className={styles['login-input-field']}
                                {...register("username", {
                                    required: "Username is required"
                                })}
                                placeholder="Username"
                            />
                        </label>
                        {errors.username && <p className={styles['login-error-label']}>{errors.username.message}</p>}
                        <label htmlFor="password-field" className={styles['login-form-label']}>
                            Password
                            <input
                                type="password"
                                id="password-field"
                                className={styles['login-input-field']}
                                {...register("password", {
                                    required: "Please enter a valid password"
                                })}
                                placeholder="•••••••••••••••"
                            />
                        </label>
                        {errors.password && <p className={styles['login-error-label']}>{errors.password.message}</p>}
                        <button
                            type="submit"
                            className={styles['login-button']}>
                            Log in
                        </button>
                    </form>
                    :
                    <button
                        type="button"
                        className={styles['login-button']}
                        onClick={logoff}>
                        Log off
                    </button>
                }
                {error && <p className={styles['login-error-label']}>Oops, something went wrong... Please check your credentials and try again!</p> }
                <p>Don't have an account? <Link className={styles['signup-link']} to="/signup">Sign up</Link>!</p>
            </div>
            {addSuccess === true && <p>Log in to your account was successful!</p>}
        </main>
    );
}

export default Login;