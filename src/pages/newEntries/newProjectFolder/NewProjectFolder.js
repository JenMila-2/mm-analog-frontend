import React, { useContext, useState } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

export function NewProjectFolder() {
    const { user: {username} } = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function newProjectFolder(folder, e) {
        e.preventDefault();
        toggleError(false);
        setLoading(true);
        try {
            await axios.post(`http://localhost:8080/projectfolders/new/${username}`, {
                projectTitle: folder.projectTitle,
                projectConcept: folder.projectConcept,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            setAddSuccess(true);
            setTimeout(() => {
                navigate('/projectfolders')
            }, 2000)
        } catch (error) {
            console.error("Oops, something went wrong...", error);
            toggleError(true)
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['form-header']}>
                <h1>New Entry</h1>
                <p>Add a new project folder to your overview</p>
            </header>
            <main className={styles['new-entry-form-container']}>
                <div className={styles['new-entry-form-inner-container']}>
                    {addSuccess ?
                        <section className={styles['new-entry-success-message']}>
                            <h4>New entry saved successfully!</h4>
                            <p>The new project folder was added to your overview.</p>
                        </section>
                        :
                        <section className={styles['form-wrapper']}>
                            <form className={styles.form} onSubmit={handleSubmit(newProjectFolder)}>
                                <label htmlFor="projectTitle" className={styles['label-form']}>
                                    Project Title
                                    <input
                                        type="text"
                                        id="projectTitle"
                                        className={styles['new-entry-input-field']}
                                        {...register("projectTitle", {
                                            required: "Project title is required",
                                            minLength: {
                                                value: 5,
                                                message: "Project title must have at least 5 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.projectTitle && <p className={styles['error-label']}>{errors.projectTitle.message}</p>}
                                <label htmlFor="projectConcept" className={styles['label-form']}>
                                    Project Concept
                                    <textarea
                                        cols="40"
                                        rows="10"
                                        id="projectConcept"
                                        className={styles['new-entry-input-field']}
                                        {...register("projectConcept", {
                                            required: "Project concept is required",
                                            minLength: {
                                                value: 5,
                                                message: "Project concept must be between 5 and 250 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.projectConcept && <p className={styles['error-label']}>{errors.projectConcept.message}</p>}
                                <div className={styles['buttons-container']}>
                                    <button
                                        type="submit"
                                        className={styles['form-button-cancel']}
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles['form-button-save']}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </section>
                    }
                </div>
            </main>
        </>
    )
}

export default NewProjectFolder;