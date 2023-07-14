import React, { useContext, useEffect, useState } from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import { AuthContext } from "../../context/AuthContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import styles from './FilmStockInventory.module.css';
import LogModal from "../../components/modal/LogModal";
import { useNavigate } from "react-router-dom";

function FilmStockInventory() {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [inventories, setInventories] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const formatOptions = ['110 film', '35mm', '120 film (Medium)', 'Sheet Film (Large)', 'Other'];
    const [currentPage, setCurrentPage] = useState(1);
    const [totalInventories, setTotalInventories] = useState(0);
    const inventoriesPerPage = 10;

    const handleRowSelect = (id) => {
        const selected = selectedRows.includes(id);
        if (selected) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    useEffect(() => {
        async function fetchInventoriesUser() {
            try {
                const response = await axios.get(`http://localhost:8080/filmstockinventories/user/${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                setInventories(response.data)
                setTotalInventories(response.data.length);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchInventoriesUser();
    }, []);

    async function deleteInventory(id) {
        try {
            await axios.delete(`http://localhost:8080/filmstockinventories/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            window.location.reload();
        } catch (e) {
            console.error('Oops, something went wrong...', e);
        }
    }

    async function updateInventoryEntry(inventory) {
        try {
            const { id, ...data } = inventory;
            await axios.put(`http://localhost:8080/filmstockinventories/${id}`, {
                ...data,
                username: user.username, // Include the username in the update request
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAddSuccess(true);
        } catch (e) {
            console.error('Oops, something went wrong...', e);
        }
        setLoading(false);
    }


    const paginateInventories = (inventories) => {
        const startIndex = (currentPage - 1) * inventoriesPerPage;
        const endIndex = Math.min(startIndex + inventoriesPerPage, inventories.length);
        return inventories.slice(startIndex, endIndex);
    };

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        setModalOpen(false);
        selectedRows.forEach((id) => deleteInventory(id));
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    const handleSave = () => {
        selectedRows.forEach((id) => {
            const updatedInventory = inventories.find((inventory) => inventory.id === id);
            if (updatedInventory) {
                void updateInventoryEntry(updatedInventory);
            }
        });
    };

    const handleUpdate = (e, id, column) => {
        const newValue = e.target.value;
        const updatedInventories = inventories.map((inventory) => {
            if (selectedRows.includes(inventory.id) && inventory.id === id) {
                return {
                    ...inventory,
                    [column]: newValue,
                };
            }
            return inventory;
        });
        setInventories(updatedInventories);
    };

    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Film Stock Inventory</h1>
            </header>
            <DividerNavBar
                label1="Update"
                label2="Add new"
            />
            <main className={styles['film-stock-inventory-overview']}>
                <SidebarNav />
                <div className={styles['film-stock-container']}>
                    <div className={styles['inventory-inner-container']}>
                        <div className={styles['total-inventories-container']}>
                            <h4>Inventories Overview</h4>
                            Total inventories: {totalInventories}
                        </div>

                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Id</th>
                                <th>Film Name</th>
                                <th>Remaining Rolls</th>
                                <th>Brand</th>
                                <th>Stock</th>
                                <th>Format</th>
                                <th>Iso</th>
                                <th>Development Process</th>
                                <th>Storage</th>
                                <th>Rolls Shot</th>
                                <th>Film Exp. Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginateInventories(inventories).map((inventory, index) => {
                                const isSelected = selectedRows.includes(inventory.id);
                                const inventoryIndex = (currentPage - 1) * inventoriesPerPage + index;
                                return (
                                    <tr key={inventory.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleRowSelect(inventory.id)}
                                            />
                                        </td>
                                        <td>{inventory.id}</td>
                                        <td>
                                            <input
                                                type="text"
                                                id="filmStockName"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.filmStockName}
                                                onChange={(e) => handleUpdate(e, inventory.id, "filmStockName")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                id="remainingRolls"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.remainingRolls}
                                                onChange={(e) => handleUpdate(e, inventory.id, "remainingRolls")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="brand"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.brand}
                                                onChange={(e) => handleUpdate(e, inventory.id, "brand")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="stock"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.stock}
                                                onChange={(e) => handleUpdate(e, inventory.id, "stock")}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={inventory.format}
                                                onChange={(e) => handleUpdate(e, inventory.id, "format")}
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
                                                id="iso"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.iso}
                                                onChange={(e) => handleUpdate(e, inventory.id, "iso")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="developmentProcess"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.developmentProcess}
                                                onChange={(e) => handleUpdate(e, inventory.id, "developmentProcess")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="storage"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.storage}
                                                onChange={(e) => handleUpdate(e, inventory.id, "storage")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                id="rollsShot"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.rollsShot}
                                                onChange={(e) => handleUpdate(e, inventory.id, "rollsShot")}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                id="filmExpirationDate"
                                                className={styles['input-field-value']}
                                                defaultValue={inventory.filmExpirationDate}
                                                onChange={(e) => handleUpdate(e, inventory.id, "filmExpirationDate")}
                                            />
                                        </td>
                                        <td>
                                            {isSelected ? (
                                                <button onClick={handleSave}>Save</button>
                                            ) : null}
                                        </td>
                                        <td>
                                            <RiDeleteBin6Line
                                                className={`${styles.icon} ${selectedRows.includes(inventory.id) ? '' : styles.disabledIcon}`}
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
                                disabled={inventories.length <= currentPage * inventoriesPerPage}
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
                <p>Are you sure you want to delete the selected inventory(s)?</p>
                <div>
                    <button onClick={handleModalConfirm}>Delete</button>
                    <button onClick={handleModalCancel}>Cancel</button>
                </div>
            </LogModal>
            {addSuccess && (
                <div className={styles.successMessage}>Update successful!</div>
            )}
        </>
    );
}

export default FilmStockInventory;
