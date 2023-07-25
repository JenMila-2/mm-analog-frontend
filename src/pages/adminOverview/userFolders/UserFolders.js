import React, {useEffect, useState} from 'react';
import SidebarNav from "../../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../../components/navigation/dividerNavBar/DividerNavBar";
import Modal from "../../../components/modal/Modal";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdOutlineDone} from "react-icons/md";
import axios from 'axios';
import styles from '../ListOverviews.module.css';

function UserFolders() {
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectFolders, setProjectFolders] = useState([]);
    const [totalProjectFolders, setTotalProjectFolders] = useState(0);
    const userFoldersPerPage = 10;

    const handleRowSelect = (id) => {
        const selected = selectedRows.includes(id);
        if (selected) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    useEffect(() => {
        async function fetchUsersProjectFolders() {
            try {
                const response = await axios.get('http://localhost:8080/projectfolders', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                setProjectFolders(response.data);
                setTotalProjectFolders(response.data.length);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        }
        void fetchUsersProjectFolders();
    }, []);

    async function deleteUserProjectFolder(folder) {
        try {
            await axios.delete(`http://localhost:8080/projectfolders/${folder}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            window.location.reload();
        } catch(e) {
            console.error('Oops, something went wrong...', e);
        }
    }

    const paginateUserFolders = (projectFolders) => {
        const startIndex = (currentPage - 1) * userFoldersPerPage;
        const endIndex = Math.min(startIndex + userFoldersPerPage, projectFolders.length);
        return projectFolders.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((folder) => deleteUserProjectFolder(folder));
    };

    const handleModalCancel = () => {
        setModalOpen(false);
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

    return (
        <>
        <header className={styles['title-container']}>
            <h1 className={styles.title}>All Project Folders</h1>
        </header>
            <DividerNavBar
                label1="Users"
                path1="/admin/dashboard/users"
                label2="All Photo Logs"
                path2="/admin/dashboard/photologs"
            />
            <main className={styles['admin-dashboard-overview']}>
                <SidebarNav />
                <div className={styles['admin-dashboard-container']}>
                    <div className={styles['admin-dashboard-inner-container']}>
                        <div className={styles['total-overview-container']}>
                            <h4>User Project Folders Overview</h4>
                            Total project folders: {totalProjectFolders}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Project Title</th>
                                    <th>Project Concept</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginateUserFolders(projectFolders).map((folders) => {
                                    const isSelected = selectedRows.includes(folders.id);
                                    return (
                                        <tr key={folders.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleRowSelect(folders.id)}
                                                />
                                            </td>
                                            <td className={styles['id-column']}>{folders.id}</td>
                                            <td className={styles['username-field']}>{folders.user.username}</td>
                                            <td className={styles['input-field-value']}>{folders.projectTitle}</td>
                                            <td className={styles['input-field-value']}>{folders.projectConcept}</td>
                                            <td>
                                                <RiDeleteBin6Line
                                                    className={`${styles.icon} ${selectedRows.includes(folders.id) ? '' : styles['disabled-icon']}`}
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
                                disabled={projectFolders.length <= currentPage * userFoldersPerPage}
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
                <p>Are you sure you want to delete the selected user folder(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </Modal>
            {addSuccess && (
                <div className={styles['user-projects-success-message']}>Changes saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    );
}
export default UserFolders;
