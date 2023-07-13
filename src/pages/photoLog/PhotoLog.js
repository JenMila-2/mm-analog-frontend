import React from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './PhotoLog.module.css';

function PhotoLog() {
    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Photo Logs</h1>
            </header>
            <DividerNavBar
                label1="Update"
                label2="Add new"
            />
            <main className={styles['photo-log-overview']}>
                <SidebarNav />
                <div className={styles['photo-log-container']}>

                    <div className={styles['photo-log-inner-container']}>

                    </div>

                </div>

            </main>
        </>
    )
}

export default PhotoLog;