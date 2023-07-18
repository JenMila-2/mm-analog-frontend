import React, {useContext, useEffect, useRef, useState} from 'react';
import {adminNavItems, publicNavItems, userNavItems} from "./NavBarData";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {HiOutlineMenuAlt4} from "react-icons/hi";
import './NavBar.css';

const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarClose = useRef(null);
    const {user, logoff} = useContext(AuthContext);

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

   let navigationItems;

    if (user && user.role === 'ROLE_ADMIN') {
        navigationItems = adminNavItems;
    } else if (user && user.role === 'ROLE_USER') {
        navigationItems = userNavItems;
    } else {
        navigationItems = publicNavItems;
    }

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
                    {user && (
                        <li className="sidebar-item" onClick={logoff}>
                            <NavLink to="/" onClick={() => setSidebarOpen(false)}>
                                <span className="sidebar-item-title">Log off</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </aside>
            <div className="logo-name">mm-analog.</div>
        </>
    );
};

export default NavBar;
