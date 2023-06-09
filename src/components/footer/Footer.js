import React from 'react';
import styles from './Footer.module.css';
import { animateScroll as scroll } from 'react-scroll'
import {Link} from "react-router-dom";

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <body>
        <footer className={styles['footer-container']}>
            <div className={styles['logo-wrapper']}>
                <span className={styles.logo}>mm-analog.</span>
            </div>
            <div className={styles['copyright-wrapper']}>
                <p className={styles['website-copyright']}>@Copyright 2023 mm analog. All Right Reserved.</p>
            </div>
            <div className={styles['link-wrapper']}>
                <Link className={styles['footer-link']} to="/about">About</Link>
                <Link className={styles['footer-link']} to="/">Contact</Link>
            </div>
        </footer>
        </body>
    )
}
export default Footer;