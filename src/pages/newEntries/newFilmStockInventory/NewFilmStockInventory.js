import React, { useContext, useState } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

function NewFilmStockInventory() {
    const { user: {username} } = useContext(AuthContext);
    const { register, formState: {errors}, handleSubmit } = useForm();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);

    const formatOptions = ['110 film', '35mm', '120 film (Medium)', 'Sheet film (Large)', 'Other'];
    const developmentProcessOptions = ['Black & White', 'C-41 Color', 'E-6 Slide Film'];

    async function newInventory(inventory, e) {
        e.preventDefault();
        toggleError(false);
        setLoading(true);
        try {
            await axios.post(`http://localhost:8080/filmstockinventories/new/${username}`, {
                filmStockName: inventory.filmStockName,
                remainingRolls: inventory.remainingRolls,
                brand: inventory.brand,
                stock: inventory.stock,
                format: inventory.format,
                iso: inventory.iso,
                developmentProcess: inventory.developmentProcess,
                storage: inventory.storage,
                rollsShot: inventory.rollsShot,
                filmExpirationDate: inventory.filmExpirationDate,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            setAddSuccess(true);
            setTimeout(() => {
                navigate('/filmstockinventories')
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
                <p>Add a new film stock inventory to your overview</p>
            </header>
            <main className={styles['new-entry-form-container']}>
                <div className={styles['new-entry-form-inner-container']}>
                    {addSuccess ?
                        <section className={styles['new-entry-success-message']}>
                            <h4>New entry saved successfully!</h4>
                            <p>The new film stock inventory was added to your overview.</p>
                        </section>
                        :
                        <section className={styles['form-wrapper']}>
                            <form className={styles.form} onSubmit={handleSubmit(newInventory)}>
                                <label htmlFor="filmStockName" className={styles['label-form']}>
                                    Film Name
                                    <input
                                        type="text"
                                        id="filmStockName"
                                        className={styles['new-entry-input-field']}
                                        {...register("filmStockName", {
                                            required: "Film name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Film name must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.filmStockName && <p className={styles['error-label']}>{errors.filmStockName.message}</p>}
                                <label htmlFor="remainingRolls" className={styles['label-form']}>
                                    Remaining Rolls
                                    <input
                                        type="number"
                                        id="remainingRolls"
                                        min="0"
                                        className={styles['new-entry-input-field']}
                                        {...register("remainingRolls", {
                                            required: "Remaining rolls is required"
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.remainingRolls && <p className={styles['error-label']}>{errors.remainingRolls.message}</p>}
                                <label htmlFor="brand" className={styles['label-form']}>
                                    Brand
                                    <input
                                        type="text"
                                        id="brand"
                                        className={styles['new-entry-input-field']}
                                        {...register("brand", {
                                            required: "Brand is required",
                                            minLength: {
                                                value: 3,
                                                message: "Brand must have at least 3 characters",
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.brand && <p className={styles['error-label']}>{errors.brand.message}</p>}
                                <label htmlFor="stock" className={styles['label-form']}>
                                    Stock
                                    <input
                                        type="text"
                                        id="stock"
                                        className={styles['new-entry-input-field']}
                                        {...register("stock", {
                                            minLength: {
                                                value: 3,
                                                message: "Stock must have at least 3 characters"
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
                                <label htmlFor="storage" className={styles['label-form']}>
                                    Storage
                                    <input
                                        type="text"
                                        id="storage"
                                        className={styles['new-entry-input-field']}
                                        {...register("storage", {
                                            minLength: {
                                                value: 3,
                                                message: "Storage must have at least 3 characters"
                                            },
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.storage && <p className={styles['error-label']}>{errors.storage.message}</p>}
                                <label htmlFor="rollsShot" className={styles['label-form']}>
                                    Rolls Shot
                                    <input
                                        type="number"
                                        id="rollsShot"
                                        min="0"
                                        className={styles['new-entry-input-field']}
                                        {...register("rollsShot")}
                                    />
                                </label>
                                <label htmlFor="filmExpirationDate" className={styles['label-form']}>
                                    Film Expiration Date
                                    <input
                                        type="date"
                                        id="filmExpirationDate"
                                        className={styles['new-entry-input-field']}
                                        {...register("filmExpirationDate")}
                                    />
                                </label>
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

export default NewFilmStockInventory;