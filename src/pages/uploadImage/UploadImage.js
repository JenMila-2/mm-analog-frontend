import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {MdOutlineDone} from "react-icons/md";
import axios from 'axios';
import styles from './UploadImage.module.css';

function UploadImage() {
    const { user: {username} } = useContext(AuthContext);
    const {register, formState: { errors } } = useForm();
    const token = localStorage.getItem('token');
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [photoLogId, setPhotoLogId] = useState("");
    const [photoLogs, setPhotoLogs] = useState([]);
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const navigate = useNavigate();

    function showSuccessMessage() {
        setAddSuccess(true);
        setTimeout(() => {
            setAddSuccess(false);
            navigate("/projectfolders");
        }, 3000);
    }

    function handleCancel() {
        navigate(-1);
    }

    function handleImageChange(e) {
        const uploadImage = e.target.files[0];
        console.log(uploadImage);

        setFile(uploadImage);

        setPreviewUrl(URL.createObjectURL(uploadImage));
    }

    useEffect(() => {
        async function fetchPhotoLogs() {
            try {
                const response = await axios.get(`http://localhost:8080/photologs/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhotoLogs(response.data);
            } catch (error) {
                console.error("Error fetching photo logs", error);
            }
        }
        void fetchPhotoLogs();
    }, [username, token]);

    async function sendImage(e) {
        e.preventDefault();
        toggleError(false);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                `http://localhost:8080/photologs/${photoLogId}/photo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setFile(null);
            setPreviewUrl(null);
            setPhotoLogId("");
            showSuccessMessage();
        } catch (error) {
            console.error("Error uploading image", error);
            toggleError(true);
        }
    }

    return (
        <>
            {addSuccess && (
                <div className={styles['success-message']}>Image uploaded successfully! <MdOutlineDone className={styles['check-icon']}/> </div>
            )}
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Upload Image</h1>
                <p className={styles['header-subtext']}>Make sure you create the photo log first or select an existing photo log from the list.</p>
                <p className={styles['header-subtext']}>To create a new photo log go to <Link to={'/new/photolog'} className={styles['link-to-photo-log-upload']}>new photo log</Link></p>
                <br/>
                <p className={styles['header-subtext']}>If you select a photo log that already has a photo assigned to it, the existing photo will be replaced with the new upload.</p>
                <br/>
            </header>
            <DividerNavBar
                label1="Projects"
                path1="/projectfolders"
                label2="Photo Log List"
                path2="/photologs"
            />
            <main className={styles['upload-image-overview']}>
                <SidebarNav />
                <div className={styles['upload-image-container']}>
                    <div className={styles['upload-image-inner-container']}>
                        <form onSubmit={sendImage} className={styles.form}>
                            <label htmlFor="photo-log-image" className={styles['image-label']}>
                                Choose an image
                                <input
                                    type="file"
                                    name="image-field"
                                    id="photo-log-image"
                                    onChange={handleImageChange}
                                    className={styles['image-upload-field']}
                                />
                            </label>
                            {previewUrl &&
                                <label className={styles['upload-form-label']}>
                                    Preview of image
                                    <img src={previewUrl} alt="preview" className={styles['uploaded-image']}/>
                                </label>
                            }
                            <label htmlFor="photoLog" className={styles['upload-form-label']}>
                                Photo Log
                                <select
                                    id="photoLog"
                                    className={styles['photo-log-select-field']}
                                    {...register("photoLog", {
                                        required: "Photo log is required",
                                    })}
                                    autoComplete="off"
                                    value={photoLogId}
                                    onChange={(e) => setPhotoLogId(e.target.value)}
                                >
                                    <option value="">Select a photo log</option>
                                    {photoLogs.map((log) => (
                                        <option key={log.id} value={log.id}>
                                            {log.title}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            {errors.photoLog && <p className={styles['upload-error-label']}>{errors.photoLog.message}</p>}
                            {error && <p className={styles['upload-error-label']}>Please select a photo log before uploading an image!</p>}
                            <div className={styles['upload-button-container']}>
                                <button type="button" onClick={handleCancel} className={styles['upload-cancel-button']}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles['upload-image-button']}>
                                    Upload Image
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default UploadImage;