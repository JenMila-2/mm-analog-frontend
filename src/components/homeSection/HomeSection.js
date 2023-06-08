import React from 'react';
import styles from './HomeSection.module.css';
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';

const HomeSection = ({heading, text, subtext, altText, buttonLabel, buttonColor, buttonPath, imageSource1, imageSource2}) => {
    const navigate = useNavigate();
    return (
        <section className={styles['section-container']}>
            {imageSource1 && imageSource2 && (
                <div className={styles.images}>
                    <img src={imageSource1} alt={altText} className={styles.image1} />
                    <img src={imageSource2} alt={altText} className={styles.image2} />
                </div>
            )}
            <div className={styles['section-content']}>
                <h2 className={styles['section-heading']}>{heading}</h2>
                <p className={styles['section-text']}>{text}</p>
                <Button type="button" color={buttonColor} clickHandler={() => navigate(buttonPath)}>
                    {buttonLabel}
                </Button>
                <p className={styles['sub-section-text']}>{subtext}</p>
            </div>
        </section>

    );
};

export default HomeSection;