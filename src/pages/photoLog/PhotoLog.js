import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import Modal from "../../components/modal/Modal";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdOutlineDone} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";
import axios from 'axios';
import styles from '../styles/TableOverviewStyling.module.css';

function PhotoLog() {
    const { user } = useContext(AuthContext);
    const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [photoLogs, setPhotoLogs] = useState([]);
    const [totalPhotoLogs, setTotalPhotoLogs] = useState(0);
    const photoLogsPerPage = 10;

    const exposureCompensationOptions = ['-3', '-2', '-1', '0', '+1', '+2', '+3'];
    const shutterSpeedOptions = ['30', '15', '8', '4', '2', '1/2', '1/4', '1/8', '1/15', '1/30', '1/60', '1/125', '1/250', '1/500', '1/1000', '1/2000'];
    const apertureOptions = ['f/1', 'f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22', 'f/32', 'f/45'];

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRowSelect = (id) => {
        const selected = selectedRows.includes(id);
        if (selected) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

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
        const newPhotoLog = e.target.value;
        const updatedPhotoLogs = photoLogs.map((log) => {
            if (selectedRows.includes(log.id) && log.id === id) {
                return {
                    ...log,
                    [column]: newPhotoLog,
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
                const filteredPhotoLogs = response.data.filter((log) =>
                    Object.values(log).some((value) =>
                        String(value).toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
                setPhotoLogs(filteredPhotoLogs );
                setTotalPhotoLogs(filteredPhotoLogs.length);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchPhotoLogsUser();
    }, [searchQuery]);

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
            const { id, ...data } = log;
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

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Photo Logs</h1>
            </header>
            <DividerNavBar
                label1="Projects"
                path1="/projectfolders"
                label2="Add new"
                path2="/new/photolog"
            />
            <main className={styles['table-log-overview']}>
                <SidebarNav />
                <div className={styles['table-log-container']}>
                    <div className={styles['table-log-inner-container']}>
                        <SearchBar
                            searchValue={searchQuery}
                            handleSearchChange={handleSearchChange}
                            placeholder="Search..."
                        />
                        <div className={styles['table-total-container']}>
                            <h4>Photo Logs Overview</h4>
                            Total photo logs: {totalPhotoLogs}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Project Folder</th>
                                    <th>Title</th>
                                    <th>Camera</th>
                                    <th>Stock</th>
                                    <th>Iso</th>
                                    <th>Aperture</th>
                                    <th>Shutter Speed</th>
                                    <th>Exposure -/+</th>
                                    <th>Date Taken</th>
                                    <th>Notes</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatePhotoLogs(photoLogs).map((log) => {
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
                                                <select
                                                    value={log.aperture}
                                                    onChange={(e) => handleUpdate(e, log.id, "aperture")}
                                                    className={styles['input-field-value']}
                                                >
                                                    <option value="">Select Aperture</option>
                                                    {apertureOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={log.shutterSpeed}
                                                    onChange={(e) => handleUpdate(e, log.id, "shutterSpeed")}
                                                    className={styles['input-field-value']}
                                                >
                                                    <option value="">Select Shutter Speed</option>
                                                    {shutterSpeedOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={log.exposureCompensation}
                                                    onChange={(e) => handleUpdate(e, log.id, "exposureCompensation")}
                                                    className={styles['input-field-value']}
                                                >
                                                    <option value="">Select Exposure</option>
                                                    {exposureCompensationOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
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
                                                    className={styles['photo-log-textarea-field']}
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
            <Modal isOpen={isModalOpen} onClose={handleModalCancel}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete the selected photo log(s)?</p>
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

export default PhotoLog;