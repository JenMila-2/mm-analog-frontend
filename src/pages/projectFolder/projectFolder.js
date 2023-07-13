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
            <SidebarNav />
            <main className="projects">
            <h1>My Photo Projects</h1>
            </main>
            </>
    )
}

export default PhotoProject;