import React, {useContext, useState} from 'react';
import styles from './UpdateProfileDetails.module.css';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useForm} from "react-hook-form";
import UpdateProfileModal from "../../components/modal/UpdateProfileModal";

export function UpdateProfileDetails() {
    const {user} = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

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
        handleSubmit(updateProfileDetails)();
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles['update-page-title']}>Update profile details</h1>
                <p>On this page you can update your profile.</p>
                <p>To update your password go to <Link className={styles['link-password']} to={'/update/password'}>update password</Link></p>
            </header>
            <main className={styles['form-container']}>
                <div className={styles['form-inner-container']}>
                    {addSuccess ?
                        <section>
                            <h4>Changes were saved successfully!</h4>
                            <p>In a few moments you will be send back to your profile page.</p>
                        </section>
                        :
                        <>
                            <form className={styles['update-profile-form']} onSubmit={handleSubmit(updateProfileDetails)}>
                                <label htmlFor="name">
                                   New name
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
                                    New email
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
                                <p>Are you sure you want to save the changes?</p>
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

export default UpdateProfileDetails;
