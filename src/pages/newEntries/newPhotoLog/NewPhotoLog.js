import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

export function NewPhotoLog() {
    const { user: { username } } = useContext(AuthContext);
    const {register, formState: { errors }, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectFolders, setProjectFolders] = useState([]);
    const [folderId, setFolderId] = useState('');
    const exposureCompensationOptions = ['-3', '-2', '-1', '0', '+1', '+2', '+3'];
    const shutterSpeedOptions = ['30', '15', '8', '4', '2', '1/2', '1/4', '1/8', '1/15', '1/30', '1/60', '1/125', '1/250', '1/500', '1/1000', '1/2000'];
    const apertureOptions = ['f/1', 'f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22', 'f/32', 'f/45'];

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
                <p>Add a new photo log to your overview</p>
            </header>
            <main className={styles['new-entry-form-container']}>
                <div className={styles['new-entry-form-inner-container']}>
                    {addSuccess ?
                        <section className={styles['new-entry-success-message']}>
                            <h4>New entry saved successfully!</h4>
                            <p>The new photo log was added to your overview.</p>
                        </section>
                        :
                        <section className={styles['form-wrapper']}>
                            <form className={styles.form} onSubmit={handleSubmit(newPhotoLog)}>
                                <label htmlFor="projectFolder" className={styles['label-form']}>
                                    Project Folder
                                    <select
                                        id="projectFolder"
                                        className={styles['new-entry-select-field']}
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
                                <label htmlFor="title" className={styles['label-form']}>
                                    Title
                                    <input
                                        type="text"
                                        id="title"
                                        className={styles['new-entry-input-field']}
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
                                <label htmlFor="camera" className={styles['label-form']}>
                                    Camera
                                    <input
                                        type="text"
                                        id="camera"
                                        className={styles['new-entry-input-field']}
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
                                <label htmlFor="stock" className={styles['label-form']}>
                                    Stock
                                    <input
                                        type="text"
                                        id="stock"
                                        className={styles['new-entry-input-field']}
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
                                <label htmlFor="iso" className={styles['label-form']}>
                                    Iso
                                    <input
                                        type="number"
                                        id="iso"
                                        min="0"
                                        className={styles['new-entry-input-field']}
                                        {...register("iso")}
                                    />
                                </label>
                                <label htmlFor="aperture" className={styles['label-form']}>
                                    Aperture
                                    <select
                                        id="aperture"
                                        className={styles['new-entry-select-field']}
                                        {...register("aperture")}
                                        autoComplete="off"
                                    >
                                        <option value="">Select Aperture</option> {''}
                                        {apertureOptions.map((aperture) => (
                                            <option key={aperture} value={aperture}>
                                                {aperture}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.aperture && <p className={styles['error-label']}>{errors.aperture.message}</p>}
                                <label htmlFor="shutterSpeed" className={styles['label-form']}>
                                    Shutter Speed
                                    <select
                                        id="shutterSpeed"
                                        className={styles['new-entry-select-field']}
                                        {...register("shutterSpeed")}
                                        autoComplete="off"
                                    >
                                        <option value="">Select Shutter Speed</option> {''}
                                        {shutterSpeedOptions.map((shutterSpeed) => (
                                            <option key={shutterSpeed} value={shutterSpeed}>
                                                {shutterSpeed}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.shutterSpeed && <p className={styles['error-label']}>{errors.shutterSpeed.message}</p>}
                                <label htmlFor="exposureCompensation" className={styles['label-form']}>
                                    Exposure -/+
                                    <select
                                        id="exposureCompensation"
                                        className={styles['new-entry-select-field']}
                                        {...register("exposureCompensation")}
                                        autoComplete="off"
                                    >
                                        <option value="">Select Exposure</option> {'0'}
                                        {exposureCompensationOptions.map((exposureCompensation) => (
                                            <option key={exposureCompensation} value={exposureCompensation}>
                                                {exposureCompensation}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.exposureCompensation && <p className={styles['error-label']}>{errors.exposureCompensation.message}</p>}
                                <label htmlFor="dateTaken" className={styles['label-form']}>
                                    Date Taken
                                    <input
                                        type="date"
                                        id="dateTaken"
                                        className={styles['new-entry-input-field']}
                                        {...register("dateTaken")}
                                        autoComplete="off"
                                    />
                                </label>
                                <label htmlFor="notes" className={styles['label-form']}>
                                    Notes
                                    <input
                                        type="text"
                                        id="notes"
                                        className={styles['new-entry-input-field']}
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
