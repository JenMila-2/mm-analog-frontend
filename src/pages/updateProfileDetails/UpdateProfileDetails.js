import React, {useContext, useState} from 'react';
import styles from './UpdateProfileDetails.module.css';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useForm} from "react-hook-form";

export function UpdateProfileDetails() {
    const {user} = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function updateProfileDetails(data) {
        toggleError(false);
        toggleAddSuccess(false);
        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/users/${user.username}`, {
                name: data.name,
                email: data.email,
                username: user.username,
                password: user.password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleAddSuccess(true);
            setTimeout(() => {
                navigate('/profile')
            }, 2000);
        } catch (e) {
            console.error("Oops, something went wrong...", e);
            toggleError(true);
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles['update-page-title']}>Update profile details</h1>
                <p>On this page you can update your profile.</p>
                <p>To update you password go to <Link className={styles['link-password']} to={'/update/password'}>update password</Link></p>
            </header>
            <main className={styles['form-container']}>
                <div className={styles['form-inner-container']}>
                    {addSuccess ?
                        <section>
                            <h4>Changes were saved successfully!</h4>
                            <p>In a few moments you will be send back to you profile page.</p>
                        </section>
                        :
                        <>
                            <form className={styles['update-profile-form']} onSubmit={handleSubmit(updateProfileDetails)}>
                                <label htmlFor="name">
                                    Name
                                    <input
                                        type="text"
                                        id="name"
                                        className={styles['form-input']}
                                        defaultValue={user.name}
                                        {...register('name')}
                                    />
                                </label>
                                {errors.name && <p className={styles['error-label']}>{error.name.message}</p>}
                                <label htmlFor="email">
                                    Email
                                    <input
                                        type="text"
                                        id="email"
                                        className={styles['form-input']}
                                        defaultValue={user.email}
                                        {...register("email", {
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Please enter a valid email"
                                            }
                                        })}
                                    />
                                </label>
                                {errors.email && <p className={styles['error-label']}>{error.email.message}</p>}
                                <div className={styles['button-container']}>
                                    <button
                                        type="button"
                                        className={styles['form-buttons']}
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className={styles['form-buttons']}
                                        onClick={() => navigate("./profile")}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                </div>
            </main>
        </>
    );
}

export default UpdateProfileDetails;
