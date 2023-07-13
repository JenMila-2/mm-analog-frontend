import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./DividerNavBar.module.css";
import Button from "../../buttons/Button";

const DividerNavBar = ({label1, path1, label2, path2}) => {
    const navigate = useNavigate();
    const handleClickButtonOne = () => {
        navigate(path1)
    }

    const handleClickButtonTwo = () => {
        navigate(path2)
    }

    return (
        <div className={styles['divider-navbar-container']}>
            <div className={styles.border}>
                <Button type="button" color="nav-button-small" clickHandler={handleClickButtonOne}>
                    {label1}
                </Button>
                <Button type="button" color="nav-button-small" clickHandler={handleClickButtonTwo}>
                    {label2}
                </Button>
            </div>
        </div>
    );
}

export default DividerNavBar;