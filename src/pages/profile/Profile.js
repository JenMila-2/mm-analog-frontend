import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import styles from './Profile.module.css';
import {useNavigate} from "react-router-dom";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {useForm} from "react-hook-form";


function Profile() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [success, toggleSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();
        async function getData(id, token) {
            try {
                const response = await axios.get(`http://localhost:8080/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUserData(response.data);
            } catch (e) {
                console.error("An error occurred!", e);
            }
        }
        void getData(user, token);
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function changeUserDetails(c) {
        try {
            await axios.put(`http://localhost:8080/users/${user.username}`, {
                name: c.name,
                email: c.email,
                password: c.password,
                username: c.username,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleSuccess(true);
            setTimeout(() => {
                navigate('/profile')
            }, 2000)
        } catch (e) {
            console.error("Something went wrong...", e)
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Profile</h1>
                <p>{user.name}</p>
            </header>
            <DividerNavBar
                label1="Projects"
                label2="Inventory"
                path1="/projectfolders"
                path2="/filmstockinventories"
            />
            <main className={styles['profile-settings-container']}>
                <SidebarNav />
                <form className={styles['profile-settings-inner-container']} onSubmit={handleSubmit(changeUserDetails)}>
                    <div className={styles['user-details-field']}>
                        <label htmlFor="username-field">
                            Username
                        <input
                            type="text"
                            id='username'
                            className={styles['user-details-input']}
                            defaultValue={user.username}
                            {...register("username")}/>
                        </label>
                    </div>
                    <div className={styles['user-details-field']}>
                        <label htmlFor="email-field">
                            Email
                            <input
                                type="text"
                                id='email'
                                className={styles['user-details-input']}
                                defaultValue={user.email}
                                {...register("email")}/>
                        </label>
                    </div>
                    <div className={styles['user-details-field']}>
                        <label htmlFor="password-field">
                            Password
                            <input
                                type="password"
                                id='password'
                                className={styles['user-details-input']}
                                defaultValue={user.password}
                                {...register("password")}/>
                        </label>
                    </div>
                    <div className={styles['buttons-container']}>
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
                        onClick={() => navigate}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
            <div className={styles['delete-user-section']}>
                <p><strong>Danger zone!</strong></p>
                <p className={styles['delete-account-message']}>Delete my account</p>
            </div>
        </>
    )
}

export default Profile;

