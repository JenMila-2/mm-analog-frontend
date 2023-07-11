import React, {useEffect, useState} from 'react';
import styles from './Admin.module.css';
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import axios from "axios";
import {FaPencilAlt} from "react-icons/fa";
import {RiDeleteBin6Line} from "react-icons/ri";


function Admin() {
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

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

    const handleEdit = (id) => {
        console.log(`Edit row with ID: ${id}`);
    };

    return (
        <>
        <header className={styles['admin-dashboard-title']}>
            <h1 className={styles.title}>Admin Dashboard</h1>
        </header>
            <DividerNavBar
                label1="Change"
                label2="Delete"
            />
            <main className={styles['admin-dashboard']}>
                <SidebarNav />
                <div className={styles['admin-dashboard-container']}>
                    <div className={styles['admin-dashboard-inner-container']}>
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => {
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
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><span className={styles['status-text']}>{user.enabled ? "Active" : "Blocked"}</span></td>
                                    <td className={styles['authority-text']}>{user.authorities[0].authority}</td>
                                    <td>
                                        <FaPencilAlt
                                            className={`${styles.icon} ${selectedRows.includes(user.username) ? '' : styles.disabledIcon}`}
                                            onClick={() => handleEdit(user.username)}
                                        />
                                        <RiDeleteBin6Line
                                            className={`${styles.icon} ${selectedRows.includes(user.username) ? '' : styles.disabledIcon}`}
                                            onClick={() => deleteUser(user.username)}
                                        />
                                    </td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Admin;