import React from 'react';
import SidebarNav from "../../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../../components/navigation/dividerNavBar/DividerNavBar";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './UserFolders.module.css';

function UserFolders() {
    return (
        <>
        <header className={styles['heroSection-container']}>
            <h1 className={styles.title}>Overview Project Folders Users</h1>
        </header>
            <DividerNavBar
                label1="Update"
                label2="Add new"
            />
            <main className={styles['folder-overview']}>
                <SidebarNav />
                <div className={styles['folder-overview-container']}>

                    <div className={styles['folder-overview-inner-container']}>

                    </div>

                </div>
            </main>
        </>
    );
}
export default UserFolders;
