import React, {useState} from 'react';
import styles from './HeroSection.module.css';
import image from '../../assets/Sajad_Fi_1.jpg';
import Button from "../buttons/Button";


const HeroSection = () => {
    return (
        <>
        <div className={styles['hero-container']}>
            <div className={styles['hero-background']}>
                <img src={image} alt="" className={styles['hero-image']}/>
            </div>
            <div className={styles['hero-content']}>
                <h1>welcome</h1>
                <p>Keep shooting film!</p>
            </div>
        </div>
            <div className={styles['hero-button-wrapper']}>
                <Button color="login" clickHandler={() => console.log('Button clicked')}>
                    Log In
                </Button>
                <Button color="signup" clickHandler={() => console.log('Button clicked')}>
                    Sign Up
                </Button>
      </div>
    </>
    )
}

export default HeroSection;