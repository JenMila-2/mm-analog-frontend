import React from 'react';
import { Link } from "react-router-dom";
import styles from './PageNotFound.module.css';
import pageNotFoundImage from '../../assets/Page_not_found_2.png';

function PageNotFound() {
    return (
        <main className={styles['page-not-found-container']}>
            <h1 className={styles['page-not-found-404-title']}>404</h1>
            <h2 className={styles['page-not-found-title']}>The requested page was not found!</h2>
            <div className={styles['page-not-found-image-container']}>
                <img className={styles['page-not-found-image']} src={pageNotFoundImage} alt=""/>
            </div>
            <p>Do you want to float back to the home page? Click <Link className={styles['link-to-home']} to="/">here</Link>!</p>
        </main>
    )
}

export default PageNotFound;