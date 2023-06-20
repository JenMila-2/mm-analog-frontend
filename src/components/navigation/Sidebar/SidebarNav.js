import React from 'react';
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import './SidebarNav.css';

const SidebarNav = () => {
    return (
        <div className="left-sidebar-nav">
            <nav className="left-sidebar-container">
                <ul className="left-sidebar-menu">
                    {SidebarData.map((item, index) => (
                        <li key={index} className="left-sidebar-item">
                            <NavLink
                                exact
                                to={item.path}
                                className="left-sidebar-item-link"
                                activeClassName="active"
                            >
                                <div className="left-sidebar-item-icon">{item.icon}</div>
                                <div className="left-sidebar-item-title">{item.title}</div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarNav;