import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProjectFolder.module.css';
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";

export function ProjectFolderPage() {
    const { folderId, imageName } = useParams();
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [projectFolderData, setProjectFolderData] = useState([]);
    const [showProjectConcept, setShowProjectConcept] = useState(false);
    const [imageData, setImageData] = useState([]);


    useEffect(() => {
        async function fetchProjectFolderData() {
            try {
                const response = await axios.get(`http://localhost:8080/projectfolders/${folderId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjectFolderData(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchProjectFolderData();
    }, [folderId]);

    const { projectTitle, images, projectConcept } = projectFolderData;

    const toggleProjectConceptVisibility = () => {
        setShowProjectConcept((prevValue) => !prevValue);
    };

    useEffect(() => {
        async function fetchImagesData() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/projectfolders/${folderId}/images/${imageName}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setImageData(response.data);
                console.log('Image Data:', response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchImagesData();
    }, [folderId, imageName, token]);

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>{projectTitle}</h1>
                <div className={styles['project-concept-container']}>
                    <button onClick={toggleProjectConceptVisibility} className={styles['project-concept-button']}>
                        {showProjectConcept ? 'Hide Project Concept' : 'Show Project Concept'}
                    </button>
                    {showProjectConcept && <p>{projectConcept}</p>}
                </div>
            </header>
            <DividerNavBar
                label1="Photo Logs"
                path1="/photologs"
                label2="Upload Photo"
                path2="/upload/image"
            />
            <main className={styles['project-folder-overview']}>
                <SidebarNav />
                <div className={styles['project-folder-container']}>
                    <div className={styles['photo-grid']}>
                        {imageData.map((image) => (
                            <div key={image.name} className={styles['photo-item']}>
                                {image.file && <img src={image.file.url} alt={image.name}/>}
                                {/*<img
                                    src={`http://localhost:8080/projectfolders/${folderId}/images/${image.name}`}
                                    alt={`Image ${image.name}`}
                                />*/}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProjectFolderPage;