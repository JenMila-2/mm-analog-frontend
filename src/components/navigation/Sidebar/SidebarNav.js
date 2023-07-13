import React, {useContext} from 'react';
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import './SidebarNav.css';
import {AuthContext} from "../../../context/AuthContext";

const SidebarNav = () => {

    const { user, logoff } = useContext(AuthContext);

    const filteredSidebarData = SidebarData.filter(item =>
        item.roles.includes(user?.role)
    );
    return (
        <div className="left-sidebar-nav">
            <nav className="left-sidebar-container">
                <ul className="left-sidebar-menu">
                    {filteredSidebarData.map((item, index) => (
                        <li key={index} className="left-sidebar-item">
                            <NavLink
                                exact
                                to={item.path}
                                className="left-sidebar-item-link"
                                activeClassName="active"
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
            </nav>
        </div>
    );
};

export default SidebarNav;