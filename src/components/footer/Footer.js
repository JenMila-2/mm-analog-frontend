import React from 'react';
import { Link } from "react-router-dom";
import styles from './Footer.module.css';

const Footer = () => {

    return (
        <>
            <div className={styles['footer-outer-container']}>
                <footer className={styles['footer-inner-container']}>
                    <div className={styles['logo-wrapper']}>
                        <span className={styles.logo}>mm-analog.</span>
                    </div>
                    <div className={styles['copyright-wrapper']}>
                        <p className={styles['website-copyright']}>@Copyright 2023 mm-analog. All Right Reserved.</p>
                    </div>
                    <div className={styles['link-wrapper']}>
                        <Link className={styles['footer-link']} to="/about">About</Link>
                        <Link className={styles['footer-link']} to="/">Contact</Link>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer;