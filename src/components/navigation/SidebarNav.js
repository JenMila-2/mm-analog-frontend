import React, {useState} from 'react';
import { SidebarData} from "./SidebarData";
import {NavLink} from "react-router-dom";
import './SidebarNav.css'
import {MdKeyboardDoubleArrowLeft} from "react-icons/md";

const SidebarNav = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const toggleSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    };

    return (
        <>
        <div className={`left-sidebar-nav ${sidebarOpen ? '' : 'sidebarClosed'} `}>
           <div className="left-sidebar-container">
                <div className="arrow-icon" onClick={toggleSidebarOpen}>
                    <MdKeyboardDoubleArrowLeft />
                </div>
               <ul className="left-sidebar-menu">
                   {SidebarData.map((item, index) => (
                       <li key={index} className="left-sidebar-item">
                           <NavLink
                               exact
                               to={item.path}
                               className="sidebar-item-link"
                               acttiveClassName="active"
                               onClick={toggleSidebarOpen}
                               >
                           <div className="sidebar-item-icon">{item.icon}</div>
                           {sidebarOpen && <div className="sidebar-item-title">{item.title}</div>}
                           </NavLink>
                       </li>
                   ))}
               </ul>
            </div>
        </div>
        </>
    );
};

export default SidebarNav;