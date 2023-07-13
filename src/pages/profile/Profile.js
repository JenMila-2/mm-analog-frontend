import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './Profile.module.css';


function Profile() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
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

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Profile</h1>
                <p>{user.name}</p>
            </header>
            <DividerNavBar
                label1="Update"
                label2="Password"
                path1="/update/profile"
                path2="/update/password"
            />
            <main className={styles['profile-settings-container']}>
                <SidebarNav />
                <div className={styles['profile-settings-inner-container']}>
                    <div className={styles['user-details-field']}>
                        <p>Username</p>
                        <inpunt className={styles['user-details-text']}>{user.username}</inpunt>
                    </div>
                    <div className={styles['user-details-field']}>
                        <p>Email</p>
                        <p className={styles['user-details-text']}> {user.email}</p>
                        <span><Link to="/update/profile" className={styles['change-link']}>Change</Link></span>
                    </div>
                    <div className={styles['user-details-field']}>
                        <p>Password</p>
                        <p className={styles['user-details-text']}>*******</p>
                        <span><Link to="/update/password" className={styles['change-link']}>Change</Link></span>
                    </div>
                    <div className={styles['user-details-field']}>
                        <p><strong>Danger zone!</strong></p>
                        <p className={styles['delete-account-message']}>Delete my account</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile;

