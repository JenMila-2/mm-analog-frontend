import React from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './projectFolder.module.css';

function PhotoProject() {
    return (
        <>
            <header className={styles['title-container']}>
                <h1 className={styles.title}>Photo Projects</h1>
            </header>
            <DividerNavBar
                label1="Photo Logs"
                path1="/photologs"
                label2="Add new"
            />
            <main className={styles['projects-overview']}>
                <SidebarNav />
                <div className={styles['projects-container']}>

                    <div className={styles['projects-inner-container']}>

                    </div>

                </div>

            </main>
        </>
    )
}

export default PhotoProject;