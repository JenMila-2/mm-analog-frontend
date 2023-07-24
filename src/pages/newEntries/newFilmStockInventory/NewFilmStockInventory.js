import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from 'axios';
import styles from '../NewEntries.module.css';

function NewFilmStockInventory() {
    const { user: {username} } = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();
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
            <p>Add a new film stock inventory to your stock overview</p>
        </header>
            <main className={styles['new-entry-form-container']}>
                <div className={styles['new-entry-form-inner-container']}>
                    {addSuccess ?
                        <section className={styles['new-entry-success-message']}>
                        <h4>New entry saved successfully!</h4>
                        <p>The new film stock inventory was added to your overview.</p>
                        </section>
                        :
                        <section className={styles['form-container']}>
                            <form className={styles.form} onSubmit={handleSubmit(newInventory)}>
                                <label htmlFor="filmStockName">
                                    Film Name
                                    <input
                                        type="text"
                                        id="filmStockName"
                                        className={styles['form-input-field']}
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
                                <label htmlFor="remainingRolls">
                                    Remaining Rolls
                                    <input 
                                        type="number"
                                        id="remainingRolls"
                                        min="0"
                                        className={styles['form-input-field']}
                                        {...register("remainingRolls", {
                                            required: "Remaining rolls is required"
                                        })}
                                        autoComplete="off"
                                    />
                                </label>
                                {errors.remainingRolls && <p className={styles['error-label']}>{errors.remainingRolls.message}</p>}
                                <label htmlFor="brand">
                                    Brand
                                    <input
                                        type="text"
                                        id="brand"
                                        className={styles['form-input-field']}
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
                                <label htmlFor="stock">
                                    Stock
                                    <input
                                        type="text"
                                        id="stock"
                                        className={styles['form-input-field']}
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
                                <label htmlFor="storage">
                                    Storage
                                    <input
                                        type="text"
                                        id="storage"
                                        className={styles['form-input-field']}
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
                                <label htmlFor="rollsShot">
                                    Rolls Shot
                                    <input
                                        type="number"
                                        id="rollsShot"
                                        min="0"
                                        className={styles['form-input-field']}
                                        {...register("rollsShot")}
                                    />
                                </label>
                                <label htmlFor="filmExpirationDate">
                                    Film Expiration Date
                                    <input
                                        type="date"
                                        id="filmExpirationDate"
                                        className={styles['form-input-field']}
                                        {...register("filmExpirationDate")}
                                    />
                                </label>
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

export default NewFilmStockInventory;