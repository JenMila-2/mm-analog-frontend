import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from 'axios';
import styles from './Signup.module.css';
import coverImage from '../../assets/Florian_Weichert_1.jpg';

function Signup() {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [error, toggleError] = useState(false);
    const [addSuccess, setAddSucces] = useState(false);
    const source = axios.CancelToken.source();
    const navigate = useNavigate();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function addNewUser(data, e) {
        e.preventDefault();
        toggleError(false);
        try {
            const response = await axios.post('http://localhost:8080/users/register', {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"]
                }, {
                cancelToken: source.token,
                });
            console.log(response.data);
            setAddSucces(true);
            navigate('/welcomepage');
        } catch(error) {
            console.error("Oops, an error occurred!", error);
            toggleError(true);
        }
    }

    return (
        <main className={styles['signup-container']}>
            <div className={styles['left-section']}>
                <img src={coverImage} alt="Clouds"/>
            </div>
            <div className={styles['right-section-signup']}>
                <h1>Create an account</h1>
                    <p className={styles['sub-text']}>Welcome. Nice to see you!</p>
                {addSuccess === true && <p>Yeaahh, your account has been created!</p>}
                <form className={styles['signup-form']} onSubmit={handleSubmit(addNewUser)}>
                    <label htmlFor="name-field" className={styles['signup-form-label']}>
                        Name
                        <input
                            type="text"
                            id="name-field"
                            className={styles['signup-input-field']}
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 5,
                                    message: "Name must have at least 5 characters",
                                },
                            })}
                            placeholder="Name"
                            autoComplete="off"
                        />
                    </label>
                    {errors.name && <p className={styles['signup-error-label']}>{errors.name.message}</p>}
                    <label htmlFor="username-field" className={styles['signup-form-label']}>
                        Username
                        <input
                            type="text"
                            id="username-field"
                            className={styles['signup-input-field']}
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 5,
                                    message: "Username must have at least 5 characters",
                                },
                            })}
                            placeholder="Username"
                            autoComplete="off"
                        />
                    </label>
                    {errors.username && <p className={styles['signup-error-label']}>{errors.username.message}</p>}
                    <label htmlFor="email-field" className={styles['signup-form-label']}>
                        Email
                        <input
                            type="email"
                            id="email-field"
                            className={styles['signup-input-field']}
                            {...register("email", {
                                required: "Email is required",
                                maxLength: {
                                    value: 75,
                                    message: "Email cannot contain more than 75 characters",
                                },
                            })}
                            placeholder="Email"
                            autoComplete="off"
                        />
                    </label>
                    {errors.email && <p className={styles['signup-error-label']}>{errors.email.message}</p>}
                    {error && <p className={styles['signup-error-label']}>Email already exist. Please try a different email.</p>}
                    <label htmlFor="password-field" className={styles['signup-form-label']}>
                        Password
                        <input
                            type="password"
                            id="password-field"
                            className={styles['signup-input-field']}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 7,
                                    message: "Password must contain at least 7 characters",
                                },
                            })}
                            placeholder="Password"
                            autoComplete="off"
                        />
                    </label>
                    {errors.password && <p className={styles['signup-error-label']}>{errors.password.message}</p>}
                    <button type="submit" className={styles['create-account-button']}>
                        Create account
                    </button>
                </form>
                <p>Already have an account? <Link className={styles['login-link']} to="/login">Log in</Link>!</p>
            </div>
        </main>
    )
}

export default Signup;