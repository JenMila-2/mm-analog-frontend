import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import Button from '../buttons/Button';
import styles from './HomeSection.module.css';

const HomeSection = ({heading, text, subtext, altText, buttonLabel, buttonColor, buttonPath, imageSource1, imageSource2}) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    if (auth) {
        return null;
    }

    return (
        <section className={styles['section-container']}>
            {imageSource1 && imageSource2 && (
                <div className={styles['image-outer-container']}>
                    <div className={styles['image-inner-container']}>
                        <img src={imageSource1} alt={altText} className={styles.image1} />
                        <img src={imageSource2} alt={altText} className={styles.image2} />
                    </div>
                </div>
            )}
            <div className={styles['section-content']}>
                <h2 className={styles['section-title']}>{heading}</h2>
                <p className={styles['section-text']}>{text}</p>
                <Button type="button" color={buttonColor} clickHandler={() => navigate(buttonPath)}>
                    {buttonLabel}
                </Button>
                <p className={styles['section-sub-text']}>{subtext}</p>
            </div>
        </section>
    );
};

export default HomeSection;