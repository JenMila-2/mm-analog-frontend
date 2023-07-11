import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import styles from './Profile.module.css';
import {useNavigate} from "react-router-dom";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";


function Profile() {
    const {user, auth} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [isAdmin, toggleAdmin] = useState(false);
    const navigate = useNavigate();

    const [userData, setUserData] = useState();

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
                response.data.authorities.map((userRole) => {
                    if (userRole.authority === "ROLE_ADMIN") {
                        return toggleAdmin(true);
                    }
                });
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
                <p>{}</p>
            </header>
            <DividerNavBar
                label1="Projects"
                label2="Inventory"
                path1="/projectfolders"
                path2="/filmstockinventories"
            />
            <main className={styles['profile-settings-container']}>
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
            </main>
        </>
    )
}

export default Profile;

