import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import ProjectCard from "../../components/projectCard/ProjectCard";
import axios from 'axios';
import styles from './ProjectFolder.module.css';

function ProjectFolder() {
    const { user } = useContext(AuthContext);
    const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');
    const [projectFolder, setProjectFolder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectFoldersPerPage = 6;

    useEffect(() => {
        async function fetchProjectFoldersUser() {
            try {
                const response = await axios.get(`http://localhost:8080/projectfolders/user/${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                setProjectFolder(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchProjectFoldersUser();
    }, []);

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Photo Projects</h1>
            </header>
            <DividerNavBar
                label1="List projects"
                path1="/projectfolders/list"
                label2="Add new"
                path2="/new/projectfolder"
            />
            <main className={styles['project-folder-overview']}>
                <SidebarNav />
                <div className={styles['project-folder-container']}>
                    <div className={styles['project-folder-inner-container']}>
                        <div className={styles['project-folder-card-container']}>
                            {projectFolder.slice(
                                (currentPage - 1) * projectFoldersPerPage,
                                currentPage * projectFoldersPerPage
                            ).map((folder) => (
                                <Link
                                    key={folder.id}
                                    to={`/projectfolder/${folder.id}`}
                                    className={styles['project-card-link']}
                                >
                                    <ProjectCard
                                        img={folder.coverImageUrl}
                                        label={folder.projectTitle}
                                        imageDescription={folder.description}
                                    />
                                </Link>
                            ))}
                        </div>
                        <div className={styles['page-navigation-container']}>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                className={styles['page-navigation-button']}
                            >
                                Previous
                            </button>
                            <button
                                disabled={projectFolder.length <= currentPage * projectFoldersPerPage}
                                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                className={styles['page-navigation-button']}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProjectFolder;
