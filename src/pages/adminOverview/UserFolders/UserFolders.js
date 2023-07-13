import React from 'react';
import styles from './UserFolders.module.css';
import DividerNavBar from "../../../components/navigation/dividerNavBar/DividerNavBar";
import SidebarNav from "../../../components/navigation/Sidebar/SidebarNav";
export function UserFolders() {
    return (
        <>
        <header className={styles['header-container']}>
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
    )
}

export default UserFolders;
