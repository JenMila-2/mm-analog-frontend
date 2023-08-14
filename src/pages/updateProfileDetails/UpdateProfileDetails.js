import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import styles from './UpdateProfileDetails.module.css';

export function UpdateProfileDetails() {
    const { user } = useContext(AuthContext);
    const { register, formState: {errors}, handleSubmit } = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

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

    async function updateProfileDetails(data) {
        toggleError(false);
        setAddSuccess(false);
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
            setAddSuccess(true);
            setTimeout(() => {
                navigate('/profile')
            }, 2000);
        } catch (e) {
            console.error('Oops, something went wrong...', e);
            toggleError(true);
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles['update-profile-title']}>Update profile details</h1>
                <p className={styles['update-profile-sub-text']}>On this page you can update your profile details. After saving your changes it can take a few minutes before the changes are visible. Refreshing the page may be needed.</p>
                <p>To update your password go to <Link className={styles['update-link-profile']} to={'/update/password'}>update password</Link></p>
            </header>
            <main className={styles['profile-update-form-container']}>
                <div className={styles['profile-update-form-inner-container']}>
                    {addSuccess ?
                        <section>
                            <h4>Changes were saved successfully!</h4>
                            <p>In a few moments you will be send back to your profile page.</p>
                        </section>
                        :
                        <>
                            <form className={styles['update-profile-form']} onSubmit={handleSubmit(updateProfileDetails)}>
                                <label htmlFor="name" className={styles['update-profile-label']}>
                                    New name
                                    <input
                                        type="text"
                                        id="name"
                                        defaultValue={user.name}
                                        className={styles['update-profile-input']}
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 5,
                                                message: "Name must have at least 5 characters long"
                                            }
                                        })}
                                    />
                                </label>
                                {errors.name && <p className={styles['error-label']}>{errors.name.message}</p>}
                                <label htmlFor="email" className={styles['update-profile-label']}>
                                    New email
                                    <input
                                        type="text"
                                        id="email"
                                        defaultValue={user.email}
                                        className={styles['update-profile-input']}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Please enter a valid email"
                                            }
                                        })}
                                    />
                                </label>
                                {errors.email && <p className={styles['error-label']}>{errors.email.message}</p>}
                                <div className={styles['button-container']}>
                                    <button
                                        type="button"
                                        className={styles['form-button-cancel']}
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className={styles['form-button-save']}
                                        onClick={handleSubmit(handleSaveButtonClick)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                            <Modal isOpen={isModalOpen} onClose={handleModalCancel}>
                                <h3>Confirm Save</h3>
                                <p>Are you sure you want to save the changes?</p>
                                <div>
                                    <button onClick={handleModalCancel}>Cancel</button>
                                    <button onClick={handleModalConfirm}>Save</button>
                                </div>
                            </Modal>
                        </>
                    }
                </div>
            </main>
        </>
    );
}

export default UpdateProfileDetails;
