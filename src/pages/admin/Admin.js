import React, {useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import Modal from "../../components/modal/Modal";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdOutlineDone} from "react-icons/md";
import axios from "axios"
import styles from './Admin.module.css';

function Admin() {
    const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const usersPerPage = 10;

    const [searchQueryUser, setSearchQueryUser] = useState('');
    const handleSearchChange = (event) => {
        setSearchQueryUser(event.target.value);
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
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8080/users', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                const filteredUsers = response.data.filter((user) =>
                    Object.values(user).some((value) =>
                        String(value).toLowerCase().includes(searchQueryUser.toLowerCase())
                    )
                );
                setUsers(filteredUsers);
                setTotalUsers(filteredUsers.length);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchUsers();
    }, [searchQueryUser]);

    async function deleteUser(username) {
        try {
            await axios.delete(`http://localhost:8080/users/${username}`, {
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

    const paginateUsers = (users) => {
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = Math.min(startIndex + usersPerPage, users.length);
        return users.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((username) => deleteUser(username));
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
                <h1 className={styles.title}>Users</h1>
            </header>
            <DividerNavBar
                label1="All folders"
                path1="/admin/dashboard/projectfolders"
                label2="Add user"
                path2="/admin/add/users"
            />
            <main className={styles['admin-dashboard-overview']}>
                <SidebarNav />
                <div className={styles['admin-dashboard-container']}>
                    <div className={styles['admin-dashboard-inner-container']}>
                        <SearchBar
                            searchValue={searchQueryUser}
                            handleSearchChange={handleSearchChange}
                            placeholder="Search..."
                        />
                        <div className={styles['total-users-container']}>
                            <h4>Users Overview</h4>
                            Total users: {totalUsers}
                        </div>
                        <div className={styles['table-wrapper']}>
                        <table className={styles['users-dashboard-table']}>
                            <thead>
                            <tr>
                                <th className={styles['users-table-head']}></th>
                                <th className={styles['users-table-head']}>Username</th>
                                <th className={styles['users-table-head']}>Name</th>
                                <th className={styles['users-table-head']}>Email</th>
                                <th className={styles['users-table-head']}>Status</th>
                                <th className={styles['users-table-head']}>Role</th>
                                <th className={styles['users-table-head']}>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginateUsers(users).map((user) => {
                                const isSelected = selectedRows.includes(user.username);
                                return (
                                    <tr key={user.username}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleRowSelect(user.username)}
                                            />
                                        </td>
                                        <td className={styles['username-field']}>{user.username}</td>
                                        <td className={styles['input-field-value']}>{user.name}</td>
                                        <td className={styles['input-field-value']}>{user.email}</td>
                                        <td><span className={styles['status-text']}>{user.enabled ? "Active" : "Blocked"}</span></td>
                                        <td className={styles['authority-text']}>{user.authorities[0].authority}</td>
                                        <td>
                                            <RiDeleteBin6Line
                                                className={`${styles.icon} ${selectedRows.includes(user.username) ? '' : styles['disabled-icon']}`}
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
                                disabled={users.length <= currentPage * usersPerPage}
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
                <p>Are you sure you want to delete the selected user(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </Modal>
            {addSuccess && (
                <div className={styles['admin-success-message']}>Changes saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    );
}

export default Admin;
