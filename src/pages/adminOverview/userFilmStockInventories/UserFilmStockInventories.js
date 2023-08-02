import React, {useEffect, useState} from 'react';
import SidebarNav from "../../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../../components/navigation/dividerNavBar/DividerNavBar";
import SearchBar from "../../../components/searchbar/SearchBar";
import Modal from "../../../components/modal/Modal";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdOutlineDone} from "react-icons/md";
import axios from 'axios';
import styles from '../ListOverviews.module.css';

export function UserFilmStockInventories() {
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [stockInventories, setStockInventories] = useState([]);
    const [totalStockInventories, setTotalStockInventories] = useState(0);
    const stockInventoriesPerPage = 10;

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

    useEffect(() => {
        async function fetchUsersFilmStockInventories() {
            try {
                const response = await axios.get('http://localhost:8080/filmstockinventories', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                const filteredStockInventories = response.data.filter((inventory) =>
                    Object.values(inventory).some((value) =>
                        String(value).toLowerCase().includes(searchQueryAdminList.toLowerCase())
                    )
                );
                setStockInventories(filteredStockInventories);
                setTotalStockInventories(filteredStockInventories.length);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        }
        void fetchUsersFilmStockInventories();
    }, [searchQueryAdminList]);

    async function deleteUserFilmStockInventory(inventory) {
        try {
            await axios.delete(`http://localhost:8080/filmstockinventories/${inventory}`, {
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

    const paginateUserFilmStockInventories = (inventories) => {
        const startIndex = (currentPage - 1) * stockInventoriesPerPage;
        const endIndex = Math.min(startIndex + stockInventoriesPerPage, inventories.length);
        return inventories.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((inventory) => deleteUserFilmStockInventory(inventory));
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
                <h1 className={styles.title}>All Film Stock Inventories</h1>
            </header>
            <DividerNavBar
                label1="Users"
                path1="/admin/dashboard/users"
                label2="All Folders"
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
                            <h4>User Film Stock Inventories Overview</h4>
                            Total film stock inventories: {totalStockInventories}
                        </div>
                        <div className={styles['table-wrapper']}>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Film Name</th>
                                    <th>Remaining Rolls</th>
                                    <th>Brand</th>
                                    <th>Stock</th>
                                    <th>Format</th>
                                    <th>Iso</th>
                                    <th>Development Process</th>
                                    <th>Storage</th>
                                    <th>Rolls Shot</th>
                                    <th>Film Expiration Date</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginateUserFilmStockInventories(stockInventories).map((inventories) => {
                                    const isSelected = selectedRows.includes(inventories.id);
                                    return (
                                        <tr key={inventories.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleRowSelect(inventories.id)}
                                                />
                                            </td>
                                            <td className={styles['id-column']}>{inventories.id}</td>
                                            <td className={styles['username-field']}>{inventories.user.username}</td>
                                            <td className={styles['input-field-value']}>{inventories.filmStockName}</td>
                                            <td className={styles['input-field-value']}>{inventories.remainingRolls}</td>
                                            <td className={styles['input-field-value']}>{inventories.brand}</td>
                                            <td className={styles['input-field-value']}>{inventories.stock}</td>
                                            <td className={styles['input-field-value']}>{inventories.format}</td>
                                            <td className={styles['input-field-value']}>{inventories.iso}</td>
                                            <td className={styles['input-field-value']}>{inventories.developmentProcess}</td>
                                            <td className={styles['input-field-value']}>{inventories.storage}</td>
                                            <td className={styles['input-field-value']}>{inventories.rollsShot}</td>
                                            <td className={styles['input-field-value']}>{inventories.filmExpirationDate}</td>
                                            <td>
                                                <RiDeleteBin6Line
                                                    className={`${styles.icon} ${selectedRows.includes(inventories.id) ? '' : styles['disabled-icon']}`}
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
                                disabled={stockInventories.length <= currentPage * stockInventoriesPerPage}
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
                <p>Are you sure you want to delete the selected user film stock inventory(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </Modal>
            {addSuccess && (
                <div className={styles['user-projects-success-message']}>Changes saved successfully! <MdOutlineDone className={styles['check-icon']}/></div>
            )}
        </>
    )
}

export default UserFilmStockInventories;