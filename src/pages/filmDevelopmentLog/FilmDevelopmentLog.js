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
            <main className="film-development-log">
                <h1>Film Development Log</h1>
            </main>
        </>
    )
}

export default FilmDevelopmentLog;