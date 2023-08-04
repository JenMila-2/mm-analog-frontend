import React, { useContext, useState } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

export function NewFilmDevelopmentLog() {
    const { user: {username} } = useContext(AuthContext);
    const { register, formState: {errors}, handleSubmit } = useForm();
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
                        <section className={styles['form-wrapper']}>
                            <form className={styles.form} onSubmit={handleSubmit(newDevelopmentLog)}>
                                <label htmlFor="rollName" className={styles['label-form']}>
                                    Roll Name
                                    <input
                                        type="text"
                                        id="rollName"
                                        className={styles['new-entry-input-field']}
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
                                <label htmlFor="project" className={styles['label-form']}>
                                    Project
                                    <input
                                        type="text"
                                        id="project"
                                        className={styles['new-entry-input-field']}
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
                                {errors.cemera && <p className={styles['error-label']}>{errors.camera.message}</p>}
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
                                <label htmlFor="format" className={styles['label-form']}>
                                    Format
                                    <select
                                        id="format"
                                        className={styles['new-entry-select-field']}
                                        {...register("format", )}
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
                                <label htmlFor="shotAtIso" className={styles['label-form']}>
                                    Iso
                                    <input
                                        type="number"
                                        id="shotAtIso"
                                        min="0"
                                        className={styles['new-entry-input-field']}
                                        {...register("shotAtIso")}
                                    />
                                </label>
                                <label htmlFor="developmentProcess" className={styles['label-form']}>
                                    Development Process
                                    <select
                                        id="developmentProcess"
                                        className={styles['new-entry-select-field']}
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
                                <label htmlFor="status" className={styles['label-form']}>
                                    Status
                                    <select
                                        name="status"
                                        className={styles['new-entry-select-field']}
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
                                <label htmlFor="rollStarted" className={styles['label-form']}>
                                    Roll Started
                                    <input
                                        type="date"
                                        id="rollStarted"
                                        className={styles['new-entry-input-field']}
                                        {...register("rollStarted")}
                                    />
                                </label>
                                <label htmlFor="rollFinished" className={styles['label-form']}>
                                    Roll Finished
                                    <input
                                        type="date"
                                        id="rollFinished"
                                        className={styles['new-entry-input-field']}
                                        {...register("rollFinished")}
                                    />
                                </label>
                                <label htmlFor="exposed" className={styles['label-form']}>
                                    Exposed
                                    <select
                                        id="exposed"
                                        className={styles['new-entry-select-field']}
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
                                <label htmlFor="developed" className={styles['label-form']}>
                                    Developed
                                    <select
                                        id="developed"
                                        className={styles['new-entry-select-field']}
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
                                <label htmlFor="scannend" className={styles['label-form']}>
                                    Scanned
                                    <select
                                        id="scannend"
                                        className={styles['new-entry-select-field']}
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
                                <label htmlFor="developedByLab" className={styles['label-form']}>
                                    Developed by
                                    <input
                                        type="text"
                                        id="developedByLab"
                                        className={styles['new-entry-input-field']}
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

export default NewFilmDevelopmentLog;