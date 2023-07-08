import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import styles from './Profile.module.css';
import {useNavigate} from "react-router-dom";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";


function Profile() {
    const [userData, setUserData] = useState();
    const {user} = useContext(AuthContext);
    const [isAdmin, toggleAdmin] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData(username, token) {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUserData(response.data);
                response.data.authority.map((userRole) => {
                    if (userRole.authority === "ROLE_ADMIN") {
                        return toggleAdmin(true);
                    }
                });

            } catch (e) {
                console.error(e);
            }
        }
        void getData(user, token);
        return function cleanup() {
            source.cancel();
        }
    }, []);

    return (
        <>
            <main className={styles['title-container']}>
            <h1 className={styles.title}>Profile</h1>
            <p>{}</p>
            </main>
            <DividerNavBar />
            <section className={styles['profile-settings-container']}>
                <SidebarNav />
                <div className={styles['profile-settings-inner-container']}>
                    <div className={styles['user-details-field']}>
                        <p>Username</p>
                        <p className={styles['user-details-text']}></p>
                        <span className={styles['change-link']}>Change</span>
                    </div>
                    <div className={styles['user-details-field']}>
                        <p>Email</p>
                        <p></p>
                        <span className={styles['change-link']}>Change</span>
                    </div>
                    <div className={styles['user-details-field']}>
                        <p>Password</p>
                        <p></p>
                        <span className={styles['change-link']}>Change</span>
                    </div>
                    <div className={styles['user-details-field']}>
                        <p><strong>Danger zone!</strong></p>
                        <p className={styles['delete-account-message']}>Delete my account</p>
                        <span className={styles['change-link']}>Delete!</span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile;
