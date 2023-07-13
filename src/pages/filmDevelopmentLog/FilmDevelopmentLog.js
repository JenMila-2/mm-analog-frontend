import React from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './FilmDevelopmentLog.module.css';

function FilmDevelopmentLog() {
    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Film Development Log</h1>
            </header>
            <DividerNavBar
            label1="Update"
            label2="Add new"
            />
            <main className={styles['development-log-overview']}>
                <SidebarNav />
                <div className={styles['development-log-container']}>

                    <div className={styles['development-log-inner-container']}>

                    </div>

                </div>

            </main>
        </>
    )
}

export default FilmDevelopmentLog;