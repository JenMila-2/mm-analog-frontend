import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from './UpdateProfileDetails.module.css';
import {AiOutlineUserDelete} from "react-icons/ai";

export function DeleteAccount() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleCancel = () => {
        navigate(-1);
    };

    async function deleteMyAccount(username) {
        try {
            await axios.delete(`http://localhost:8080/users/${user.username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            window.location.reload();
        } catch (e) {
            console.error('Oops, something went wrong...', e)
        }
    }

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles['delete-page-title']}>Delete My Account</h1>
                <p className={styles['delete-page-sub-text']}>On this page you can delete your account!</p>
                <div className={styles['delete-icon-container']}>
                    <AiOutlineUserDelete />
                </div>
            </header>
            <main className={styles['delete-page-container']}>
                <p className={styles['delete-page-sub-text']}>If you delete your account your account will be permanently removed from our database.</p>
                <p className={styles['delete-warning-sub-text']}>Warning: deleting your account cannot be undone!</p>
                <div className={styles['delete-button-containers']}>
                    <button className={styles['cancel-delete-account-button']} onClick={handleCancel}>Cancel</button>
                    <button className={styles['confirm-delete-account-button']} onClick={deleteMyAccount}>Yes, Delete My Account</button>
                </div>
            </main>

        </>
    )
}

export default DeleteAccount;