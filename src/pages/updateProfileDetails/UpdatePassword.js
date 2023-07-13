import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import UpdateProfileModal from "../../components/modal/UpdateProfileModal";
import axios from "axios";
import styles from './UpdatePassword.module.css';

export function UpdatePassword() {
    const {user} = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    async function updatePassword(password) {
        toggleError(false);
        toggleAddSuccess(false);
        setLoading(true);

        try {
            await axios.put(`http://localhost:8080/users/$user{user.username}`, {
                password: password.password,
                name: user.name,
                email: user.email,
                username: user.username,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleAddSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (e) {
            console.error('Oops, something went wrong...', e);
            toggleError(true);
        }
        setLoading(false);
    }

    const handleSaveButtonClick = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        handleSubmit(updatePassword)();
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles['update-page-title']}>Update password</h1>
                <p>On this page you can update your password.</p>
                <p>To update your profile details go to <Link className={styles['update-link-profile']} to={'/update/profile'}>update profile</Link></p>
            </header>
            <main className={styles['form-container']}>
                <div className={styles['form-inner-container']}>
                    {addSuccess ?
                        <section>
                            <h4>Your new password has been saved!</h4>
                            <p>In a few moments you will be send back to your profile page.</p>
                        </section>
                        :
                        <>
                            <form onSubmit={handleSubmit(updatePassword)} className={styles['update-password-form']}>
                                <div className={styles['form-text-container']}>
                                    <p>Choose a strong password!</p>
                                    <p>Make sure you use at least one capital, one number and one special character.</p>
                                </div>
                                <label htmlFor="password">
                                    Enter new password
                                    <input
                                        type="text"
                                        id="password"
                                        className={styles['form-input']}
                                        placeholder="New password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 7,
                                                message: "Password should be at least 7 characters long"
                                            }
                                        })}
                                    />
                                </label>
                                {errors.password && <p className={styles['error-label']}>{error.password.message}</p>}
                                <div className={styles['button-container']}>
                                    <button
                                        type="button"
                                        className={styles['form-buttons']}
                                        onClick={handleSubmit(handleSaveButtonClick)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className={styles['form-buttons']}
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                            <UpdateProfileModal isOpen={isModalOpen} onClose={handleModalCancel}>
                                <h3>Confirm Save</h3>
                                <p>Are you sure you want to update your password?</p>
                                <div>
                                    <button onClick={handleModalConfirm}>Save</button>
                                    <button onClick={handleModalCancel}>Cancel</button>
                                </div>
                            </UpdateProfileModal>
                        </>
                    }
                </div>
            </main>
            </>
    );
}

export default UpdatePassword;