import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coverImage from '../../assets/Florian_Weichert_1.jpg';
import styles from './Signup.module.css';
import axios from 'axios';
import {useForm} from "react-hook-form";

function Signup() {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [error, toggleError] = useState(false);
    const [addSuccess, toggleAddSucces] = useState(false);
    const source = axios.CancelToken.source();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        /*return function cleanup() {
            source.cancel();
        }*/
    }, []);

    const [users, setUsers] = useState([]);

    async function addNewUser(e) {
        //e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/register', {
                name: e.name,
                username: e.username,
                email: e.email,
                password: e.password,
                role: ["user"]
                }, {
                cancelToken: source.token,
                });
            console.log(response.data);
            toggleAddSucces(true);
            navigate('/login');
        } catch(error) {
            console.error("Oops, an error occurred!", error);
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
                <form className={styles['signup-form']} onSubmit={handleSubmit(addNewUser)}>
                    <label htmlFor="name-field">
                        Name
                        <input
                            type="text"
                            id="name-field"
                            {...register("name", {
                                required: "This field cannot be empty",
                                maxLength: {
                                    value: 75,
                                    message: "Name cannot contain more than 75 characters",
                                },
                            })}
                            placeholder="Name"
                            autoComplete="off"
                        />
                    </label>
                    <label htmlFor="username-field">
                        Username
                        <input
                            type="text"
                            id="username-field"
                            {...register("username", {
                                required: "This field cannot be empty",
                                maxLength: {
                                    value: 75,
                                    message: "Username cannot contain more than 75 characters",
                                },
                            })}
                            placeholder="Username"
                            autoComplete="off"
                        />
                    </label>
                    <label htmlFor="email-field">
                        Email
                        <input
                            type="email"
                            id="email-field"
                            {...register("email", {
                                required: "This field cannot be empty",
                                maxLength: {
                                    value: 75,
                                    message: "Email cannot contain more than 75 characters",
                                },
                            })}
                            placeholder="Email"
                            autoComplete="off"
                        />
                    </label>
                    <label htmlFor="password-field">
                        Password
                        <input
                            type="password"
                            id="password-field"
                            {...register("password", {
                                required: "This field cannot be empty",
                                minLength: {
                                    value: 7,
                                    message: "Password must contain at least 7 characters",
                                },
                            })}
                            placeholder="Password"
                            autoComplete="off"
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