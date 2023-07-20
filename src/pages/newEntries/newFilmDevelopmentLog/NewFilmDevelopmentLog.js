import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

export function NewFilmDevelopmentLog() {
    const { user: {username} } = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const formatOptions = ['110 film', '35mm', '120 film (Medium)', 'Sheet film (Large)', 'Other'];
    const developmentProcessOptions = ['Black & White', 'C-41 Color', 'E-6 Slide Film'];
    const statusOptions = ['Not started', 'In progress', 'Done'];

    const yesNoOptions = [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
    ];

    async function newDevelopmentLog(log, e) {
        e.preventDefault();
        toggleError(false);
        setLoading(true);
        try {
            await axios.post(`http://localhost:8080/filmdevelopmentlogs/new/${username}`, {
                rollName: log.rollName,
                project: log.project,
                camera: log.camera,
                stock: log.stock,
                format: log.format,
                shotAtIso: log.shotAtIso,
                developmentProcess: log.developmentProcess,
                status: log.status,
                rollStarted: log.rollStarted,
                rollFinished: log.rollFinished,
                exposed: log.exposed,
                developed: log.developed,
                scannend: log.scannend,
                developedByLab: log.developedByLab,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            setAddSuccess(true);
            setTimeout(() => {
                navigate('/filmdevelopmentlogs')
            }, 2000)
        } catch (error) {
            console.error("Oops, something went wrong....", error);
            toggleError(true)
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['form-header']}>
                <h1>New Entry</h1>
                <p>Add a new film development log to your overview</p>
            </header>
            <main className={styles['new-entry-form-container']}>
                <div className={styles['new-entry-form-inner-container']}>
                    {addSuccess ?
                        <section className={styles['new-entry-success-message']}>
                            <h4>New entry saved successfully!</h4>
                            <p>The new film development log was added to your overview.</p>
                        </section>
                        :
                        <section section className={styles['form-container']}>
                            <form className={styles.form} onSubmit={handleSubmit(newDevelopmentLog)}>
                                <label htmlFor="rollName">
                                    Roll Name
                                    <input
                                        type="text"
                                        id="rollName"
                                        className={styles['form-input-field']}
                                        {...register("rollName", {
                                            required: "Roll name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Roll name must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.rollName && <p className={styles['error-label']}>{errors.rollName.message}</p>}
                                <label htmlFor="project">
                                    Project
                                    <input
                                        type="text"
                                        id="project"
                                        className={styles['form-input-field']}
                                        {...register("project", {
                                            minLength: {
                                                value: 3,
                                                message: "Project must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.project && <p className={styles['error-label']}>{errors.project.message}</p>}
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
                                {errors.cemera && <p className={styles['error-label']}>{errors.camera.message}</p>}
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
                                <label htmlFor="format">
                                    Format
                                    <select
                                        id="format"
                                        className={styles['form-select-field']}
                                        {...register("format", {
                                            required: "Please select a format",
                                        })}
                                        autoComplete="off"
                                    >
                                        <option value="">Select Format</option> {'35mm'}
                                        {formatOptions.map((format) => (
                                            <option key={format} value={format}>
                                                {format}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.format && <p className={styles['error-label']}>{errors.format.message}</p>}
                                <label htmlFor="shotAtIso">
                                    Iso
                                    <input
                                        type="number"
                                        id="shotAtIso"
                                        min="0"
                                        className={styles['form-input-field']}
                                        {...register("shotAtIso")}
                                    />
                                </label>
                                <label htmlFor="developmentProcess">
                                    Development Process
                                    <select
                                        id="developmentProcess"
                                        className={styles['form-select-field']}
                                        {...register("developmentProcess", {
                                            required: "Please select a process",
                                        })}
                                    >
                                        <option value="">Select Process</option> {'Black & White'}
                                        {developmentProcessOptions.map((developmentProcess) => (
                                            <option key={developmentProcess} value={developmentProcess}>
                                                {developmentProcess}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.developmentProcess && <p className={styles['error-label']}>{errors.developmentProcess.message}</p>}
                                <label htmlFor="status">
                                    <select
                                        name="status"
                                        className={styles['form-select-field']}
                                        {...register("status")}
                                    >
                                        <option value="">Select Status</option> {'Not started'}
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label htmlFor="rollStarted">
                                    Roll Started
                                    <input
                                        type="date"
                                        id="rollStarted"
                                        className={styles['form-input-field']}
                                        {...register("rollStarted")}
                                    />
                                </label>
                                <label htmlFor="rollFinished">
                                    Roll Started
                                    <input
                                        type="date"
                                        id="rollFinished"
                                        className={styles['form-input-field']}
                                        {...register("rollFinished")}
                                    />
                                </label>
                                <label htmlFor="exposed">
                                    Exposed
                                    <select
                                        id="exposed"
                                        className={styles['form-select-field']}
                                        {...register("exposed", {
                                            required: "Please select an option",
                                        })}
                                    >
                                        <option value="">Select an option</option>
                                        {yesNoOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.exposed && (<p className={styles['error-label']}>{errors.exposed.message}</p>)}
                                <label htmlFor="developed">
                                    Developed
                                    <select
                                        id="developed"
                                        className={styles['form-select-field']}
                                        {...register("developed", {
                                            required: "Please select an option",
                                        })}
                                    >
                                        <option value="">Select an option</option>
                                        {yesNoOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.developed && (<p className={styles['error-label']}>{errors.developed.message}</p>)}
                                <label htmlFor="scannend">
                                    Scanned
                                    <select
                                        id="scannend"
                                        className={styles['form-select-field']}
                                        {...register("scannend", {
                                            required: "Please select an option",
                                        })}
                                    >
                                        <option value="">Select an option</option>
                                        {yesNoOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {errors.scannend && (<p className={styles['error-label']}>{errors.scannend.message}</p>)}
                                <label htmlFor="developedByLab">
                                    Developed by
                                    <input
                                        type="text"
                                        id="developedByLab"
                                        className={styles['form-input-field']}
                                        {...register("developedByLab", {
                                            minLength: {
                                                value: 3,
                                                message: "Developed by lab must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.developedByLab && (<p className={styles['error-label']}>{errors.developedByLab.message}</p>)}
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

export default NewFilmDevelopmentLog;