import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import Modal from "../../components/modal/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import styles from '../styles/TableOverviewStyling.module.css';

export function ProjectFolderList() {
    const { user } = useContext(AuthContext);
    const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectFolders, setProjectFolders] = useState([]);
    const [totalProjectFolders, setTotalProjectFolders] = useState(0);
    const projectFoldersPerPage = 10;

    const [searchQueryFolderList, setSearchQueryFolderList] = useState('');
    const handleSearchChange = (event) => {
        setSearchQueryFolderList(event.target.value);
    };

    const handleRowSelect = (id) => {
        const selected = selectedRows.includes(id);
        if (selected) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const paginateProjectFolders = (projectFolders) => {
        const startIndex = (currentPage - 1) * projectFoldersPerPage;
        const endIndex = Math.min(startIndex + projectFoldersPerPage, projectFolders.length);
        return projectFolders.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((id) => deleteProjectFolder(id));
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            selectedRows.forEach((id) => {
                const updatedProjectFolder = projectFolders.find(
                    (folder) => folder.id === id
                );
                if (updatedProjectFolder) {
                    void updateProjectFolderEntry(updatedProjectFolder);
                }
            });
            setAddSuccess(true);
        } catch (error) {
            console.error('Oops, something went wrong...', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (e, id, column) => {
        const newProjectFolder = e.target.value;
        const updatedProjectFolders = projectFolders.map((log) => {
            if (selectedRows.includes(log.id) && log.id === id) {
                return {
                    ...log,
                    [column]: newProjectFolder,
                };
            }
            return log;
        });
        setProjectFolders(updatedProjectFolders);
    };

    useEffect(() => {
        if (addSuccess) {
            const timeoutId = setTimeout(() => {
                setAddSuccess(false);
                window.location.reload();
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [addSuccess]);

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
                const filteredProjectFolders = response.data.filter((folder) =>
                    Object.values(folder).some((value) =>
                        String(value).toLowerCase().includes(searchQueryFolderList.toLowerCase())
                    )
                );
                setProjectFolders(filteredProjectFolders);
                setTotalProjectFolders(filteredProjectFolders.length);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchProjectFoldersUser();
    }, [searchQueryFolderList]);

    async function deleteProjectFolder(id) {
        try {
            await axios.delete(`http://localhost:8080/projectfolders/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            window.location.reload();
        } catch (e) {
            console.error('Oops, something went wrong...', e)
        }
    }

    async function updateProjectFolderEntry(folder) {
        try {
            const { id, ...data } = folder;
            await axios.put(
                `http://localhost:8080/projectfolders/${id}`, {
                    ...data,
                    username: user.username,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAddSuccess(true);
        } catch (e) {
            console.error('Oops, something went wrong...', e);
        }
        setLoading(false);
    }

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Project Folders List Overview</h1>
            </header>
            <DividerNavBar
                label1="Projects"
                path1="/projectfolders"
                label2="Add new"
                path2="/new/projectfolder"
            />
            <main className={styles['table-log-overview']}>
                <SidebarNav />
                <div className={styles['table-log-container']}>
                    <div className={styles['table-log-inner-container']}>
                        <SearchBar
                            searchValue={searchQueryFolderList}
                            handleSearchChange={handleSearchChange}
                            placeholder="Search..."
                        />
                        <div className={styles['table-total-container']}>
                            <h4>Project Folders Overview</h4>
                            Total project folders: {totalProjectFolders}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Project Title</th>
                                    <th>Project Concept</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginateProjectFolders(projectFolders).map((folder, index) => {
                                    const isSelected = selectedRows.includes(folder.id);
                                    return (
                                        <tr key={folder.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleRowSelect(folder.id)}
                                                />
                                            </td>
                                            <td className={styles['id-column']}>{folder.id}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="projectTitle"
                                                    className={styles['folder-input-field']}
                                                    defaultValue={folder.projectTitle}
                                                    onChange={(e) => handleUpdate(e, folder.id, "projectTitle")}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    id="projectConcept"
                                                    cols="20"
                                                    rows="4"
                                                    className={styles['folder-textarea-field']}
                                                    defaultValue={folder.projectConcept}
                                                    onChange={(e) => handleUpdate(e, folder.id, "projectConcept")}
                                                />
                                            </td>
                                            <td>
                                                <AiFillEdit
                                                    className={`${styles.icon} ${selectedRows.includes(folder.id) ? '' : styles['disabled-icon']}`}/>
                                                {isSelected ? (
                                                    <button onClick={handleSave}>Save</button>
                                                ) : null}
                                            </td>
                                            <td>
                                                <RiDeleteBin6Line
                                                    className={`${styles.icon} ${selectedRows.includes(folder.id) ? '' : styles['disabled-icon']}`}
                                                    onClick={handleDelete}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
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
                                disabled={projectFolders.length <= currentPage * projectFoldersPerPage}
                                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                className={styles['page-navigation-button']}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Modal isOpen={isModalOpen} onClose={handleModalCancel}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete the selected project folder(s)?</p>
                <div>
                    <button onClick={handleModalCancel}>Cancel</button>
                    <button onClick={handleModalConfirm}>Delete</button>
                </div>
            </Modal>
            {addSuccess && (
                <div className={styles['update-success-message']}>Changes saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    )
}

export default ProjectFolderList;