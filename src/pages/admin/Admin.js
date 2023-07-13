import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import UpdateProfileModal from "../../components/modal/UpdateProfileModal";
import {AuthContext} from "../../context/AuthContext";
import {RiDeleteBin6Line} from "react-icons/ri";
import {VscSaveAs} from "react-icons/vsc";
import styles from './Admin.module.css';
import axios from "axios";

function Admin() {
    const [users, setUsers] = useState([]);
    const {user} = useContext(AuthContext);
    const [selectedRows, setSelectedRows] = useState([]);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [totalUsers, setTotalUsers] = useState(0);



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
                setUsers(response.data);
                setTotalUsers(response.data.length);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchUsers();
    }, []);

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
            console.error('Something went wrong...', e);
        }
    }

    async function updateUserDetails(data) {
        try {
            await axios.put(`http//localhost:8080/users/${user.username}`, {
                username: data.username,
                name: data.name,
                email: data.email,
                enabled: data.enabled,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleAddSuccess(true);
        } catch (e) {
            console.error('Oops, something went wrong...')
        }
        setLoading(false);
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
        // Delete the selected users
        selectedRows.forEach((username) => deleteUser(username));
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    return (
        <>
            <header className={styles['admin-dashboard-title']}>
                <h1 className={styles.title}>Admin Dashboard</h1>
            </header>
            <DividerNavBar
                label1="Update"
                label2="Add new"
            />
            <main className={styles['admin-dashboard']}>
                <SidebarNav />
                <div className={styles['admin-dashboard-container']}>
                    <div className={styles['admin-dashboard-inner-container']}>
                        <div className={styles['total-users-container']}>
                            <h4>Users Overview</h4>
                            Total users: {totalUsers}
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginateUsers(users).map((user, index) => {
                                const isSelected = selectedRows.includes(user.username);
                                const userIndex = (currentPage - 1) * usersPerPage + index;
                                return (
                                    <tr key={user.username}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleRowSelect(user.username)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="username"
                                                className={styles['input-field-value']}
                                                defaultValue={user.username}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="name"
                                                className={styles['input-field-value']}
                                                defaultValue={user.name}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="email"
                                                id="email"
                                                className={styles['input-field-value']}
                                                defaultValue={user.email}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="status"
                                                className={styles['status-text']}
                                                defaultValue={user.enabled ? "Active" : "Blocked"}
                                            />
                                        </td>
                                        <td className={styles['authority-text']}>{user.authorities[0].authority}</td>
                                        <td>
                                            <VscSaveAs
                                                className={`${styles.icon} ${selectedRows.includes(user.username) ? '' : styles.disabledIcon}`}
                                            />
                                        </td>
                                        <td>
                                            <RiDeleteBin6Line
                                                className={`${styles.icon} ${selectedRows.includes(user.username) ? '' : styles.disabledIcon}`}
                                                onClick={handleDelete}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
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
            <UpdateProfileModal isOpen={isModalOpen} onClose={handleModalCancel}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete the selected user(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </UpdateProfileModal>
        </>
    );
}

export default Admin;
