import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import styles from './Profile.module.css';

function Profile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return <p>Loading...</p>;
    }

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Profile</h1>
                {user.name ? <p>{user.name}</p> : <p>Loading...</p>}
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
                        <p className={styles['user-details-text']}>{user.username}</p>
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
                        <p><Link to="/delete/account" className={styles['delete-account-link']}>Delete my account</Link></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile;
