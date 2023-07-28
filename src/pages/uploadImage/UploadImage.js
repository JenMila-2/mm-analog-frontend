import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import axios from 'axios';
import styles from './UploadImage.module.css';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {MdOutlineDone} from "react-icons/md";

function UploadImage() {
    const { user: {username} } = useContext(AuthContext);
    const {register, formState: { errors }, handleSubmit} = useForm();
    const token = localStorage.getItem('token');
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [folderId, setFolderId] = useState("");
    const [projectFolders, setProjectFolders] = useState([]);
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


    async function sendImage(e) {
        e.preventDefault();
        toggleError(false);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(`http://localhost:8080/projectfolders/${folderId}/upload/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data);
            setFile(null);
            setPreviewUrl(null);
            setFolderId("");
            showSuccessMessage();
        } catch (error) {
            console.error("Error uploading image:", error);
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
            </header>
            <DividerNavBar
                label1="Projects"
                path1="/projectfolders"
                label2="Photo Logs"
                path2="/photologs"
            />
            <main className={styles['upload-image-overview']}>
                <SidebarNav />
                <div className={styles['upload-image-container']}>
                    <div className={styles['upload-image-inner-container']}>
                        <form onSubmit={sendImage} className={styles.form}>
                            <label htmlFor="project-image" className={styles['image-label']}>
                                Choose an image
                                <input
                                    type="file"
                                    name="image-field"
                                    id="project-image"
                                    onChange={handleImageChange}
                                    className={styles['image-upload-field']}
                                />
                            </label>
                            {previewUrl &&
                                <label className={styles['preview-image-label']}>
                                    Preview of image
                                    <img src={previewUrl} alt="Image" className={styles['uploaded-image']}/>
                                </label>
                            }
                            <label htmlFor="projectFolder" className={styles['image-label']}>
                                Project Folder
                                <select
                                    id="projectFolder"
                                    className={styles['project-folder-select-field']}
                                    {...register("projectFolder", {
                                        required: "Project Folder is required",
                                        message: "Select project folder before continuing",
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
                            {errors.projectFolder && <p className={styles['upload-error-label']}>{errors.projectFolder.message}</p>}
                            {error && <p className={styles['upload-error-label']}>Project Folder is required</p>}
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