import React, { useEffect, useState } from 'react';
import SidebarNav from "../../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../../components/navigation/dividerNavBar/DividerNavBar";
import SearchBar from "../../../components/searchbar/SearchBar";
import Modal from "../../../components/modal/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import axios from 'axios';
import styles from '../ListOverviews.module.css';

export function UserDevelopmentLogs() {
    const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [developmentLogs, setDevelopmentLogs] = useState([]);
    const [totalDevelopmentLogs, setTotalDevelopmentLogs] = useState(0);
    const developmentLogsPerPage = 10;
    const renderYesNo = (value) => (value ? 'Yes' : 'No');

    const [searchQueryAdminList, setSearchQueryAdminList] = useState('');
    const handleSearchChange = (event) => {
        setSearchQueryAdminList(event.target.value);
    };

    const handleRowSelect = (id) => {
        const selected = selectedRows.includes(id);
        if (selected) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const paginateUserDevelopmentLogs = (logs) => {
        const startIndex = (currentPage - 1) * developmentLogsPerPage;
        const endIndex = Math.min(startIndex + developmentLogsPerPage, logs.length);
        return logs.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((log) => deleteUserFilmDevelopmentLog(log));
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

    useEffect(() => {
        async function fetchUsersFilmDevelopmentLogs() {
            try {
                const response = await axios.get('http://localhost:8080/filmdevelopmentlogs', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                const filteredDevelopmentLogs = response.data.filter((log) =>
                    Object.values(log).some((value) =>
                        String(value).toLowerCase().includes(searchQueryAdminList.toLowerCase())
                    )
                );
                setDevelopmentLogs(filteredDevelopmentLogs);
                setTotalDevelopmentLogs(filteredDevelopmentLogs.length);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchUsersFilmDevelopmentLogs();
    }, [searchQueryAdminList]);

    async function deleteUserFilmDevelopmentLog(developmentLog) {
        try {
            await axios.delete(`http://localhost:8080/filmdevelopmentlogs/${developmentLog}`, {
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

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>All Film Development Logs</h1>
            </header>
            <DividerNavBar
                label1="Users"
                path1="/admin/dashboard/users"
                label2="All folders"
                path2="/admin/dashboard/projectfolders"
            />
            <main className={styles['admin-dashboard-overview']}>
                <SidebarNav />
                <div className={styles['admin-dashboard-container']}>
                    <div className={styles['admin-dashboard-inner-container']}>
                        <SearchBar
                            searchValue={searchQueryAdminList}
                            handleSearchChange={handleSearchChange}
                            placeholder="Search..."
                        />
                        <div className={styles['total-overview-container']}>
                            <h4>User Film Development Logs Overview</h4>
                            Total film development logs: {totalDevelopmentLogs}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Roll Name</th>
                                    <th>Project</th>
                                    <th>Camera</th>
                                    <th>Stock</th>
                                    <th>Format</th>
                                    <th>Shot at Iso</th>
                                    <th>Development Process</th>
                                    <th>Status</th>
                                    <th>Roll Started</th>
                                    <th>Roll Finished</th>
                                    <th>Exposed</th>
                                    <th>Developed</th>
                                    <th>Scanned</th>
                                    <th>Developed by Lab</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginateUserDevelopmentLogs(developmentLogs).map((logs) => {
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
                                            <td className={styles['input-field-value']}>{logs.rollName}</td>
                                            <td className={styles['input-field-value']}>{logs.project}</td>
                                            <td className={styles['input-field-value']}>{logs.camera}</td>
                                            <td className={styles['input-field-value']}>{logs.stock}</td>
                                            <td className={styles['input-field-value']}>{logs.format}</td>
                                            <td className={styles['input-field-value']}>{logs.shotAtIso}</td>
                                            <td className={styles['input-field-value']}>{logs.developmentProcess}</td>
                                            <td className={styles['input-field-value']}>{logs.status}</td>
                                            <td className={styles['input-field-value']}>{logs.rollStarted}</td>
                                            <td className={styles['input-field-value']}>{logs.rollFinished}</td>
                                            <td className={styles['input-field-value']}>{renderYesNo(logs.exposed)}</td>
                                            <td className={styles['input-field-value']}>{renderYesNo(logs.developed)}</td>
                                            <td className={styles['input-field-value']}>{renderYesNo(logs.scanned)}</td>
                                            <td className={styles['input-field-value']}>{logs.developedByLab}</td>
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
                <p>Are you sure you want to delete the selected user development log(s)?</p>
                <div>
                    <button onClick={handleModalCancel}>Cancel</button>
                    <button onClick={handleModalConfirm}>Delete</button>
                </div>
            </Modal>
            {addSuccess && (
                <div className={styles['admin-change-success-message']}>Changes saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    )
}

export default UserDevelopmentLogs;