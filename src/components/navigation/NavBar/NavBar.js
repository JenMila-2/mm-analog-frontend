import React, {useContext, useEffect, useRef, useState} from 'react';
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {loggedInNavItems, publicNavItems} from "./NavBarData";
import './NavBar.css';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";

const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarClose = useRef(null);
    const {isAuth} = useContext(AuthContext);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarClose.current && !sidebarClose.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navigationItems = isAuth ? loggedInNavItems : publicNavItems;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-icon" onClick={toggleSidebar}>
                        <HiOutlineMenuAlt4 />
                    </div>
                </div>
            </nav>
            <aside ref={sidebarClose} className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <ul className="sidebar-menu">
                    {navigationItems.map((item, index) => (
                        <li key={index} className="sidebar-item">
                            <NavLink to={item.path} onClick={() => setSidebarOpen(false)}>
                                <span className="sidebar-item-icon">{item.icon}</span>
                                <span className="sidebar-item-title">{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="logo-name">mm-analog.</div>
        </>
    );
};

export default NavBar;
