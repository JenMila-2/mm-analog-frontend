import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

export function NewUsers() {
    const { user: {username} } = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const navigate = useNavigate();
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function newUser(user, e) {
        e.preventDefault();
        toggleError(false);
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/users/register', {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                role: ["user"]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAddSuccess(true);
            setTimeout(() => {
                navigate('/admin/dashboard/users')
            }, 2000)
        } catch (error) {
            console.error("Oops, something went wrong...", error);
            toggleError(true)
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['form-header']}>
                <h1>New Entry</h1>
                <p>Add a new user to the user dashboard</p>
            </header>
            <main className={styles['new-entry-form-container']}>
                <div className={styles['new-entry-form-inner-container']}>
                    {addSuccess ?
                        <section className={styles['new-entry-success-message']}>
                            <h4>New entry saved successfully!</h4>
                            <p>The new user was added to the dashboard.</p>
                        </section>
                        :
                        <section className={styles['form-wrapper']}>
                            <form className={styles.form} onSubmit={handleSubmit(newUser)}>
                                <label htmlFor="name" className={styles['label-form']}>
                                    Name
                                    <input
                                        type="text"
                                        id="name-field"
                                        className={styles['new-entry-input-field']}
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 5,
                                                message: "Film name must have at least 5 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.name && <p className={styles['error-label']}>{errors.name.message}</p>}
                                <label htmlFor="username" className={styles['label-form']}>
                                    Username
                                    <input
                                        type="text"
                                        id="username-field"
                                        className={styles['new-entry-input-field']}
                                        {...register("username", {
                                            required: "Username is required",
                                            minLength: {
                                                value: 5,
                                                message: "Username must have at least 5 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.username && <p className={styles['error-label']}>{errors.username.message}</p>}
                                <label htmlFor="email-field" className={styles['label-form']}>
                                    Email
                                    <input
                                        type="email"
                                        id="email-field"
                                        className={styles['new-entry-input-field']}
                                        {...register("email", {
                                            required: "Email is required",
                                            maxLength: {
                                                value: 75,
                                                message: "Email cannot contain more than 75 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.email && <p className={styles['error-label']}>{errors.email.message}</p>}
                                {error && <p className={styles['error-label']}>Email already exist. Please try another email.</p>}
                                <label htmlFor="password-field" className={styles['label-form']}>
                                    Password
                                    <input
                                        type="password"
                                        id="password-field"
                                        className={styles['new-entry-input-field']}
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
                                {errors.password && <p className={styles['error-label']}>{errors.password.message}</p>}
                                <div className={styles['buttons-container']}>
                                    <button
                                        type="submit"
                                        className={styles['form-button']}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles['form-button']}
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </section>
                    }
                </div>
            </main>
        </>
    )
}

export default NewUsers;
