import React, {useContext, useEffect, useRef, useState} from 'react';
import { SidebarData } from "./SidebarData";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {BsFillCameraFill} from "react-icons/bs";
import styles from './SidebarNav.module.css';

const SidebarNav = () => {
    const { user, logoff } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const leftSidebarClose = useRef(null);
    const toggleSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    };

    const filteredSidebarData = SidebarData.filter(item =>
        item.roles.includes(user?.role)
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (leftSidebarClose.current && !leftSidebarClose.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const sidebarColorClass = user && user.role === 'ROLE_ADMIN' ? styles['sidebar-color-admin'] : styles['sidebar-color-user'];

    return (
        <>
            <div ref={leftSidebarClose} className={`${styles['left-sidebar-nav']} ${sidebarColorClass} ${sidebarOpen ? '' : styles['left-sidebar-closed']}`}>
                <nav>
                    <div className={styles['left-sidebar-icon']} onClick={toggleSidebarOpen}>
                        <BsFillCameraFill />
                    </div>
                    {sidebarOpen && (
                        <ul>
                            {filteredSidebarData.map((item, index) => (
                                <li key={index} className={styles['left-sidebar-item']}>
                                    <NavLink
                                        to={item.path}
                                        className={styles['left-sidebar-item-link']}
                                        onClick={toggleSidebarOpen}
                                    >
                                        <div className={styles['left-sidebar-item-title']}>{item.title}</div>
                                    </NavLink>
                                </li>
                            ))}
                            {user && (
                                <li className={styles['left-sidebar-item']} onClick={logoff}>
                                    <NavLink to="/" className={styles['left-sidebar-item-link']}>
                                        <div className={styles['left-sidebar-item-title']}>Log off</div>
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    )}
                </nav>
            </div>
        </>
    );
};

export default SidebarNav;