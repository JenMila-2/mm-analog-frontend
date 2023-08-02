import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import Modal from "../../components/modal/Modal";
import {AuthContext} from "../../context/AuthContext";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdOutlineDone} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";
import axios from 'axios';
import styles from './FilmDevelopmentLog.module.css';

function FilmDevelopmentLog() {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [developmentLogs, setDevelopmentLogs] = useState([]);
    const [totalDevelopmentLogs, setTotalDevelopmentLogs] = useState(0);
    const developmentLogsPerPage = 10;
    const formatOptions = ['110 film', '35mm', '120 film (Medium)', 'Sheet film (Large)', 'Other'];
    const developmentProcessOptions = ['Black & White', 'C-41 Color', 'E-6 Slide Film'];
    const statusOptions = ['Not started', 'In progress', 'Done'];

    const yesNoOptions = [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
    ];

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

    useEffect(() => {
        async function fetchDevelopmentLogsUser() {
            try {
                const response = await axios.get(`http://localhost:8080/filmdevelopmentlogs/user/${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                const filteredDevelopmentLogs = response.data.filter((log) =>
                    Object.values(log).some((value) =>
                        String(value).toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
                setDevelopmentLogs(filteredDevelopmentLogs);
                setTotalDevelopmentLogs(filteredDevelopmentLogs.length);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        }
        void fetchDevelopmentLogsUser();
    }, [searchQuery]);

    async function deleteDevelopmentLog(id) {
        try {
            await axios.delete(`http://localhost:8080/filmdevelopmentlogs/${id}`, {
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

    async function updateDevelopmentLogEntry(log) {
        try {
            const { id, ...data } = log;
            await axios.put(
                `http://localhost:8080/filmdevelopmentlogs/${id}`, {
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

    const paginateLogs = (logs) => {
        const startIndex = (currentPage - 1) * developmentLogsPerPage;
        const endIndex = Math.min(startIndex + developmentLogsPerPage, logs.length);
        return logs.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((id) => deleteDevelopmentLog(id));
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            selectedRows.forEach((id) => {
                const updatedDevelopmentLog = developmentLogs.find(
                    (log) => log.id === id
                );
                if (updatedDevelopmentLog) {
                    void updateDevelopmentLogEntry(updatedDevelopmentLog);
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
        const updatedDevelopmentLogs = developmentLogs.map((log) => {
            if (selectedRows.includes(log.id) && log.id === id) {
                return {
                    ...log,
                    [column]: newLog,
                };
            }
            return log;
        });
        setDevelopmentLogs(updatedDevelopmentLogs);
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
                <h1 className={styles.title}>Film Development Logs</h1>
            </header>
            <DividerNavBar
            label1="Projects"
            path1="/projectfolders"
            label2="Add new"
            path2="/new/filmdevelopmentlog"
            />
            <main className={styles['development-log-overview']}>
                <SidebarNav />
                <div className={styles['development-log-container']}>
                    <div className={styles['development-log-inner-container']}>
                        <SearchBar
                            searchValue={searchQuery}
                            handleSearchChange={handleSearchChange}
                            placeholder="Search..."
                        />
                        <div className={styles['total-log-container']}>
                            <h4>Film Development Logs Overview</h4>
                            Total film development logs: {totalDevelopmentLogs}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Project</th>
                                    <th>Camera</th>
                                    <th>Stock</th>
                                    <th>Format</th>
                                    <th>Shot at iso</th>
                                    <th>Process</th>
                                    <th>Status</th>
                                    <th>Roll started</th>
                                    <th>Roll Finished</th>
                                    <th>Exposed</th>
                                    <th>Developed</th>
                                    <th>Scanned</th>
                                    <th>Developed by</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginateLogs(developmentLogs).map((log, index) => {
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
                                        <td>
                                            <input
                                                type="text"
                                                id="rollName"
                                                className={styles['input-field-value']}
                                                defaultValue={log.rollName}
                                                onChange={(e) => handleUpdate(e, log.id, "rollName")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="project"
                                                className={styles['input-field-value']}
                                                defaultValue={log.project}
                                                onChange={(e) => handleUpdate(e, log.id, "project")}
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
                                            <select
                                                value={log.format}
                                                onChange={(e) => handleUpdate(e, log.id, "format")}
                                                className={styles['input-field-value']}
                                            >
                                                <option value="">Select Format</option>
                                                {formatOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                id="shotAtIso"
                                                className={styles['input-field-value']}
                                                defaultValue={log.shotAtIso}
                                                min="0"
                                                onChange={(e) => handleUpdate(e, log.id, "shotAtIso")}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={log.developmentProcess}
                                                onChange={(e) => handleUpdate(e, log.id, "developmentProcess")}
                                                className={styles['input-field-value']}
                                            >
                                                <option value="">Select Process</option>
                                                {developmentProcessOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={log.status}
                                                onChange={(e) => handleUpdate(e, log.id, "status")}
                                                className={styles['input-field-value']}
                                            >
                                                <option value="">Select Status</option>
                                                {statusOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                id="rollStarted"
                                                className={styles['input-field-value']}
                                                defaultValue={log.rollStarted}
                                                onChange={(e) => handleUpdate(e, log.id, "rollStarted")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                id="rollFinished"
                                                className={styles['input-field-value']}
                                                defaultValue={log.rollFinished}
                                                onChange={(e) => handleUpdate(e, log.id, "rollFinished")}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={log.exposed}
                                                onChange={(e) => handleUpdate(e, log.id, "exposed")}
                                                className={styles['input-field-value']}
                                            >
                                                {yesNoOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={log.developed}
                                                onChange={(e) => handleUpdate(e, log.id, "developed")}
                                                className={styles['input-field-value']}
                                            >
                                                {yesNoOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={log.scanned}
                                                onChange={(e) => handleUpdate(e, log.id, "scanned")}
                                                className={styles['input-field-value']}
                                            >
                                                {yesNoOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="developedByLab"
                                                className={styles['input-field-value']}
                                                defaultValue={log.developedByLab}
                                                onChange={(e) => handleUpdate(e, log.id, "developedByLab")}
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
                                disabled={developmentLogs.length <= currentPage * developmentLogsPerPage}
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
                <p>Are you sure you want to delete the selected film stock development log(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </Modal>
            {addSuccess && (
                <div className={styles['log-update-success-message']}>Changes saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    );
}

export default FilmDevelopmentLog;