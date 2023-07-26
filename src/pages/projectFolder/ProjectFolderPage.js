import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProjectFolder.module.css';
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";

export function ProjectFolderPage() {
    const { folderId } = useParams();
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [projectFolderData, setProjectFolderData] = useState([]);
    const [showProjectConcept, setShowProjectConcept] = useState(false);


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
            />
            <main className={styles['project-folder-overview']}>
                <SidebarNav />
                <div className={styles['project-folder-container']}>
                    {/*<div className={styles['photo-grid']}>
                        {images.map((image) => (
                            <div key={image.id} className={styles['photo-item']}>
                                <img src={image.imageUrl} alt={`Image ${image.id}`} />
                            </div>
                        ))}
                    </div>*/}
                </div>
            </main>
        </>
    )
}

export default ProjectFolderPage;