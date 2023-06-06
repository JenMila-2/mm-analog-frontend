import React, {useEffect, useRef, useState} from 'react';
import { SidebarData} from "./SidebarData";
import {NavLink} from "react-router-dom";
import './SidebarNav.css'
import {CgMenuGridR} from "react-icons/cg";

const SidebarNav = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const leftSidebarClose = useRef(null);
    const toggleSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    };

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
        <div ref={leftSidebarClose} className={`left-sidebar-nav ${sidebarOpen ? '' : 'sidebarClosed'} `}>
           <nav className="left-sidebar-container">
                <div className="left-menu-icon" onClick={toggleSidebarOpen}>
                    <CgMenuGridR />
                </div>
               <ul className="left-sidebar-menu">
                   {SidebarData.map((item, index) => (
                       <li key={index} className="left-sidebar-item">
                           <NavLink
                               exact
                               to={item.path}
                               className="left-sidebar-item-link"
                               acttiveClassName="active"
                               onClick={toggleSidebarOpen}
                               >
                           <div className="left-sidebar-item-icon">{item.icon}</div>
                           {sidebarOpen && <div className="left-sidebar-item-title">{item.title}</div>}
                           </NavLink>
                       </li>
                   ))}
               </ul>
            </nav>
        </div>
        </>
    );
};

export default SidebarNav;