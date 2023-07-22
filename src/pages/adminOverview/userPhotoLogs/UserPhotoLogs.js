import React, {useEffect, useState} from 'react';
import SidebarNav from "../../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../../components/navigation/dividerNavBar/DividerNavBar";
import LogModal from "../../../components/modal/LogModal";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdOutlineDone} from "react-icons/md";
import axios from 'axios';
import styles from '../ListOverviews.module.css';

export function UserPhotoLogs() {
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [photoLogs, setPhotoLogs] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPhotoLogs, setTotalPhotoLogs] = useState(0);
    const photoLogsPerPage = 10;

    const handleRowSelect = (id) => {
        const selected = selectedRows.includes(id);
        if (selected) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    useEffect(() => {
        async function fetchUsersPhotoLogs() {
            try {
                const response = await axios.get('http://localhost:8080/photologs', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                setPhotoLogs(response.data);
                setTotalPhotoLogs(response.data.length);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        }
        void fetchUsersPhotoLogs();
    }, []);

    async function deleteUserPhotoLog(photoLog) {
        try {
            await axios.delete(`http://localhost:8080/photologs/${photoLog}`, {
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

    const paginateUserPhotoLogs = (logs) => {
        const startIndex = (currentPage - 1) * photoLogsPerPage;
        const endIndex = Math.min(startIndex + photoLogsPerPage, logs.length);
        return photoLogs.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((log) => deleteUserPhotoLog(log));
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
                <h1 className={styles.title}>Users Photo Log</h1>
            </header>
            <DividerNavBar
                label1="Users"
                path1="/admin/dashboard/users"
                label2="Project Folders"
                path2="/admin/dashboard/projectfolders"
            />
            <main className={styles['admin-dashboard-overview']}>
                <SidebarNav />
                <div className={styles['admin-dashboard-container']}>
                    <div className={styles['admin-dashboard-inner-container']}>
                        <div className={styles['total-overview-container']}>
                            <h4>User Photo Log Overview</h4>
                            Total stock inventories: {totalPhotoLogs}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Project Folder</th>
                                    <th>Title</th>
                                    <th>Camera</th>
                                    <th>Stock</th>
                                    <th>Iso</th>
                                    <th>Aperture</th>
                                    <th>Shutter Speed</th>
                                    <th>Exposure Compen.</th>
                                    <th>Date Taken</th>
                                    <th>Notes</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginateUserPhotoLogs(photoLogs).map((logs) => {
                                    const isSelected = selectedRows.includes(logs.id);
                                    return (
                                        <tr key={logs.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleRowSelect(logs.id)}
                                                />
                                            </td>
                                            <td className={styles['id-column']}>{logs.id}</td>
                                            <td className={styles['username-field']}>{logs.user.username}</td>
                                            <td className={styles['input-field-value']}>{logs.projectFolder.projectTitle}</td>
                                            <td className={styles['input-field-value']}>{logs.title}</td>
                                            <td className={styles['input-field-value']}>{logs.camera}</td>
                                            <td className={styles['input-field-value']}>{logs.stock}</td>
                                            <td className={styles['input-field-value']}>{logs.iso}</td>
                                            <td className={styles['input-field-value']}>{logs.aperture}</td>
                                            <td className={styles['input-field-value']}>{logs.shutterSpeed}</td>
                                            <td className={styles['input-field-value']}>{logs.exposureCompensation}</td>
                                            <td className={styles['input-field-value']}>{logs.dateTaken}</td>
                                            <td className={styles['input-field-value']}>{logs.notes}</td>
                                            <td>
                                                <RiDeleteBin6Line
                                                    className={`${styles.icon} ${selectedRows.includes(logs.id) ? '' : styles['disabled-icon']}`}
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
                                disabled={photoLogs.length <= currentPage * photoLogsPerPage}
                                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                className={styles['page-navigation-button']}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <LogModal isOpen={isModalOpen} onClose={handleModalCancel}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete the selected user photo log(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </LogModal>
            {addSuccess && (
                <div className={styles['user-projects-success-message']}>Changes saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    )
}

export default UserPhotoLogs;