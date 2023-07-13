import React from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './FilmStockInventory.module.css';

function FilmStockInventory() {
    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Film Stock Inventory</h1>
            </header>
            <DividerNavBar
                label1="Update"
                label2="Add new"
            />
            <main className={styles['film-stock-inventory']}>
                <SidebarNav />
                <div className={styles['film-stock-container']}>

                    <div className={styles['inventory-inner-container']}>

                    </div>

                </div>

            </main>
        </>
    )
}

export default FilmStockInventory;