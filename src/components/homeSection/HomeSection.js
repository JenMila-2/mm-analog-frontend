import React from 'react';
import styles from './HomeSection.module.css';
import Button from '../buttons/Button';

const HomeSection = ({heading, text, subtext, imageSource1, imageSource2, altText}) => {
    return (
        <section className={styles['section-container']}>
            <div className={styles['section-content']}>
                <h2 className={styles['section-heading']}>{heading}</h2>
                <p className={styles['section-text']}>{text}</p>
                <Button color="create-account" clickHandler={() => console.log('Button clicked')}>
                    Create an account
                </Button>
                <p className={styles['sub-section-text']}>{subtext}</p>
            </div>

            <div className={styles.images}>
                <img src={imageSource1} alt={altText} className={styles.image1} />
                <img src={imageSource2} alt={altText} className={styles.image2} />
            </div>
        </section>
    );
};

export default HomeSection;