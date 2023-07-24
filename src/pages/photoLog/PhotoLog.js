import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {AuthContext} from "../../context/AuthContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import {MdOutlineDone} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";
import axios from 'axios';
import styles from './PhotoLog.module.css';
import LogModal from "../../components/modal/LogModal";

function PhotoLog() {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [photoLogs, setPhotoLogs] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
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
        async function fetchPhotoLogsUser() {
            try {
                const response = await axios.get(`http://localhost:8080/photologs/user/${user.username}`, {
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
        void fetchPhotoLogsUser();
    }, []);

    async function deletePhotoLog(id) {
        try {
            await axios.delete(`http://localhost:8080/photologs/${id}`, {
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

    async function updatePhotoLogEntry(log) {
        try {
            const { id, ...data} = log;
            await axios.put(
                `http://localhost:8080/photologs/${id}`, {
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

    const paginatePhotoLogs = (logs) => {
        const startIndex = (currentPage - 1) * photoLogsPerPage;
        const endIndex = Math.min(startIndex + photoLogsPerPage, logs.length);
        return logs.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((id) => deletePhotoLog(id));
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            selectedRows.forEach((id) => {
                const updatedPhotoLog = photoLogs.find(
                    (log) => log.id === id
                );
                if (updatedPhotoLog) {
                    void updatePhotoLogEntry(updatedPhotoLog);
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
        const newLog = e.target.value;
        const updatedPhotoLogs = photoLogs.map((log) => {
            if (selectedRows.includes(log.id) && log.id === id) {
                return {
                    ...log,
                    [column]: newLog,
                };
            }
            return log;
        });
        setPhotoLogs(updatedPhotoLogs);
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
                <h1 className={styles.title}>Photo Log</h1>
            </header>
            <DividerNavBar
                label1="Projects"
                path1="/projectfolders"
                label2="Add new"
                path2="/new/photolog"
            />
            <main className={styles['photo-log-overview']}>
                <SidebarNav />
                <div className={styles['photo-log-container']}>
                    <div className={styles['photo-log-inner-container']}>
                        <div className={styles['total-log-container']}>
                            <h4>Photo Log Overview</h4>
                            Total logs: {totalPhotoLogs}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th className={styles['photo-log-table-head']}></th>
                                    <th className={styles['photo-log-table-head']}>Id</th>
                                    <th className={styles['photo-log-table-head']}>Project Folder</th>
                                    <th className={styles['photo-log-table-head']}>Title</th>
                                    <th className={styles['photo-log-table-head']}>Camera</th>
                                    <th className={styles['photo-log-table-head']}>Stock</th>
                                    <th className={styles['photo-log-table-head']}>Iso</th>
                                    <th className={styles['photo-log-table-head']}>Aperture</th>
                                    <th className={styles['photo-log-table-head']}>Shutter Speed</th>
                                    <th className={styles['photo-log-table-head']}>Exposure -/+</th>
                                    <th className={styles['photo-log-table-head']}>Date Taken</th>
                                    <th className={styles['photo-log-table-head']}>Notes</th>
                                    <th className={styles['photo-log-table-head']}>Edit</th>
                                    <th className={styles['photo-log-table-head']}>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatePhotoLogs(photoLogs).map((log, index) => {
                                    const isSelected = selectedRows.includes(log.id);
                                    return (
                                        <tr key={log.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleRowSelect(log.id)}
                                                />
                                            </td>
                                            <td className={styles['id-column']}>{log.id}</td>
                                            <td className={styles['project-folder-field']}>{log.projectFolder.projectTitle}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.title}
                                                    onChange={(e) => handleUpdate(e, log.id, "title")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="camera"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.camera}
                                                    onChange={(e) => handleUpdate(e, log.id, "camera")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="stock"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.stock}
                                                    onChange={(e) => handleUpdate(e, log.id, "stock")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    id="iso"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.iso}
                                                    onChange={(e) => handleUpdate(e, log.id, "iso")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="aperture"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.aperture}
                                                    onChange={(e) => handleUpdate(e, log.id, "aperture")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="shutterSpeed"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.shutterSpeed}
                                                    onChange={(e) => handleUpdate(e, log.id, "shutterSpeed")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="exposureCompensation"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.exposureCompensation}
                                                    onChange={(e) => handleUpdate(e, log.id,"exposureCompensation")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    id="dateTaken"
                                                    className={styles['input-field-value']}
                                                    defaultValue={log.dateTaken}
                                                    onChange={(e) => handleUpdate(e, log.id, "dateTaken")}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    id="notes"
                                                    cols="20"
                                                    rows="4"
                                                    className={styles['textarea-field-value']}
                                                    defaultValue={log.notes}
                                                    onChange={(e) => handleUpdate(e, log.id, "notes")}
                                                />
                                            </td>
                                            <td>
                                                <AiFillEdit
                                                    className={`${styles.icon} ${selectedRows.includes(log.id) ? '' : styles['disabled-icon']}`}/>
                                                {isSelected ? (
                                                    <button onClick={handleSave}>Save</button>
                                                ) : null}
                                            </td>
                                            <td>
                                                <RiDeleteBin6Line
                                                    className={`${styles.icon} ${selectedRows.includes(log.id) ? '' : styles['disabled-icon']}`}
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
                <p>Are you sure you want to delete the selected logs(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </LogModal>
            {addSuccess && (
                <div className={styles['photo-log-success-message']}>Update saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    )
}

export default PhotoLog;