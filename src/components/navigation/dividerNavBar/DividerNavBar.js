import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./DividerNavBar.module.css";
import Button from "../../buttons/Button";

const DividerNavBar = () => {

    const navigate = useNavigate();
    const handleProjectClick = () => {
        navigate('/projectfolders')
    }

    const handleInventoryClick = () => {
        navigate('/filmstockinventories')
    }

    return (
        <div className={styles['divider-navbar-container']}>
            <div className={styles.border}>
                <Button type="button" color="nav-button-small" clickHandler={handleProjectClick}>
                    Projects
                </Button>
                <Button type="button" color="nav-button-small" clickHandler={handleInventoryClick}>
                    Inventory
                </Button>
            </div>
        </div>
    );
}

export default DividerNavBar;