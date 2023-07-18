import React, {useContext, useEffect, useRef, useState} from 'react';
import { SidebarData } from "./SidebarData";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {BsFillCameraFill} from "react-icons/bs";
import './SidebarNav.css';

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

    return (
        <>
            <div ref={leftSidebarClose} className={`left-sidebar-nav ${sidebarOpen ? '' : 'sidebar-closed'}`}>
                <nav className="left-sidebar-container">
                    <div className="left-sidebar-icon" onClick={toggleSidebarOpen}>
                        <BsFillCameraFill />
                    </div>
                    {sidebarOpen && (
                        <ul className="left-sidebar-menu">
                            {filteredSidebarData.map((item, index) => (
                                <li key={index} className="left-sidebar-item">
                                    <NavLink
                                        exact
                                        to={item.path}
                                        className="left-sidebar-item-link"
                                        onClick={toggleSidebarOpen}
                                    >
                                        <div className="left-sidebar-item-title">{item.title}</div>
                                    </NavLink>
                                </li>
                            ))}
                            {user && (
                                <li className="left-sidebar-item" onClick={logoff}>
                                    <NavLink exact to="/" className="left-sidebar-item-link">
                                        <div className="left-sidebar-item-title">Log off</div>
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