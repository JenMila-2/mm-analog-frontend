import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

export function NewPhotoLog() {
    const { user: { username } } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectFolders, setProjectFolders] = useState([]);
    const [folderId, setFolderId] = useState('');

    useEffect(() => {
        async function fetchProjectFolders() {
            try {
                const response = await axios.get(`http://localhost:8080/projectfolders/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjectFolders(response.data);
            } catch (error) {
                console.error("Error fetching project folders", error);
            }
        }

        void fetchProjectFolders();
    }, [username, token]);

    async function newPhotoLog(photoLog, e) {
        e.preventDefault();
        toggleError(false);
        setLoading(true);
        try {
            await axios.post(`http://localhost:8080/photologs/new/${username}/folder/${folderId}`, {
                title: photoLog.title,
                camera: photoLog.camera,
                stock: photoLog.stock,
                iso: photoLog.iso,
                aperture: photoLog.aperture,
                shutterSpeed: photoLog.shutterSpeed,
                exposureCompensation: photoLog.exposureCompensation,
                dateTaken: photoLog.dateTaken,
                notes: photoLog.notes,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAddSuccess(true);
            setTimeout(() => {
                navigate('/photologs')
            }, 2000)
        } catch (error) {
            console.error("Oops, something went wrong...", error);
            toggleError(true);
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['form-header']}>
                <h1>New Entry</h1>
                <p>Add a new photo log to your stock overview</p>
            </header>
            <main className={styles['new-entry-form-container']}>
                <div className={styles['new-entry-form-inner-container']}>
                    {addSuccess ?
                        <section className={styles['new-entry-success-message']}>
                            <h4>New entry saved successfully!</h4>
                            <p>The new photo log was added to your overview.</p>
                        </section>
                        :
                        <section className={styles['form-container']}>
                            <form className={styles.form} onSubmit={handleSubmit(newPhotoLog)}>
                                <label htmlFor="projectFolder">
                                    Project Folder
                                    <select
                                        id="projectFolder"
                                        className={styles['form-select-field']}
                                        {...register("projectFolder", {
                                            required: "Project Folder is required",
                                        })}
                                        autoComplete="off"
                                        value={folderId}
                                        onChange={(e) => setFolderId(e.target.value)}
                                    >
                                        <option value="">Select a project folder</option>
                                        {projectFolders.map((folder) => (
                                            <option key={folder.id} value={folder.id}>
                                                {folder.projectTitle}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.projectFolder && <p className={styles['error-label']}>{errors.projectFolder.message}</p>}
                                <label htmlFor="title">
                                    Title
                                    <input
                                        type="text"
                                        id="title"
                                        className={styles['form-input-field']}
                                        {...register("title", {
                                            required: "Title is required",
                                            minLength: {
                                                value: 3,
                                                message: "Title must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.title && <p className={styles['error-label']}>{errors.title.message}</p>}
                                <label htmlFor="camera">
                                    Camera
                                    <input
                                        type="text"
                                        id="camera"
                                        className={styles['form-input-field']}
                                        {...register("camera", {
                                            minLength: {
                                                value: 3,
                                                message: "Camera must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.camera && <p className={styles['error-label']}>{errors.camera.message}</p>}
                                <label htmlFor="stock">
                                    Stock
                                    <input
                                        type="text"
                                        id="stock"
                                        className={styles['form-input-field']}
                                        {...register("stock", {
                                            minLength: {
                                                value: 3,
                                                message: "Stock must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.stock && <p className={styles['error-label']}>{errors.stock.message}</p>}
                                <label htmlFor="iso">
                                    Iso
                                    <input
                                        type="number"
                                        id="iso"
                                        min="0"
                                        className={styles['form-input-field']}
                                        {...register("iso")}
                                    />
                                </label>
                                <label htmlFor="aperture">
                                    Aperture
                                    <input
                                        type="text"
                                        id="aperture"
                                        className={styles['form-input-field']}
                                        {...register("aperture", {
                                            minLength: {
                                                value: 3,
                                                message: "Aperture must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.aperture && <p className={styles['error-label']}>{errors.aperture.message}</p>}
                                <label htmlFor="shutterSpeed">
                                    Shutter Speed
                                    <input
                                        type="text"
                                        id="shutterSpeed"
                                        className={styles['form-input-field']}
                                        {...register("shutterSpeed", {
                                            minLength: {
                                                value: 3,
                                                message: "Shutter Speed must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.shutterSpeed && <p className={styles['error-label']}>{errors.shutterSpeed.message}</p>}
                                <label htmlFor="exposureCompensation">
                                    Exposure -/+
                                    <input
                                        type="text"
                                        id="exposureCompensation"
                                        className={styles['form-input-field']}
                                        {...register("exposureCompensation", {
                                            maxLength: {
                                                value: 5,
                                                message: "Exposure compensation cannot contain more than 5 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.exposureCompensation && <p className={styles['error-label']}>{errors.exposureCompensation.message}</p>}
                                <label htmlFor="dateTaken">
                                    Date Taken
                                    <input
                                        type="date"
                                        id="dateTaken"
                                        className={styles['form-input-field']}
                                        {...register("dateTaken")}
                                        autoComplete="off"
                                    />
                                </label>
                                <label htmlFor="notes">
                                    Notes
                                    <input
                                        type="text"
                                        id="notes"
                                        className={styles['form-input-field']}
                                        {...register("notes", {
                                            maxLength: {
                                                value: 250,
                                                message: "Notes cannot contain more than 250 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.notes && <p className={styles['error-label']}>{errors.notes.message}</p>}
                                <div className={styles['buttons-container']}>
                                    <button
                                        type="submit"
                                        className={styles['form-button']}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles['form-button']}
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
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

export default NewPhotoLog;
