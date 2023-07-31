import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import axios from 'axios';
import styles from './ProjectFolder.module.css';
import { AuthContext } from "../../context/AuthContext";

export function ProjectFolderPage() {
    const { user: { username } } = useContext(AuthContext);
    const { folderId } = useParams();
    const token = localStorage.getItem('token');
    const [projectFolderData, setProjectFolderData] = useState({});
    const [showProjectConcept, setShowProjectConcept] = useState(false);

    useEffect(() => {
        async function fetchProjectFolderData() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/projectfolders/${folderId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProjectFolderData(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchProjectFolderData();
    }, [folderId, token, username]);

    const { projectTitle, projectConcept } = projectFolderData;

    const toggleProjectConceptVisibility = () => {
        setShowProjectConcept((prevValue) => !prevValue);
    };

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>{projectTitle}</h1>
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
                    <div className={styles['project-folder-inner-container']}>
                        <div className={styles['project-concept-container']}>
                            <button onClick={toggleProjectConceptVisibility} className={styles['project-concept-button']}>
                                {showProjectConcept ? 'Hide Project Concept' : 'Show Project Concept'}
                            </button>
                            {showProjectConcept && <p>{projectConcept}</p>}
                        </div>
                        <div className={styles['photo-grid-container']}>
                            <img src={projectFolderData.file && projectFolderData.file.url} alt=""/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProjectFolderPage;




