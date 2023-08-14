import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../buttons/Button";
import image from '../../assets/Sajad_Fi_1.jpg';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleSignupClick = () => {
        navigate('/signup')
    }

    return (
        <>
            <main className={styles['hero-container']}>
                <div className={styles['hero-background']}>
                    <img src={image} alt="" className={styles['hero-image']}/>
                </div>
                <div className={styles['hero-content']}>
                    <h1 className={styles['hero-title']}>welcome</h1>
                    <p className={styles['hero-sub-title']}>Keep shooting film!</p>
                </div>
            </main>
            {!auth && (
                <div className={styles['hero-button-wrapper']}>
                    <Button type="button" color="login" clickHandler={handleLoginClick}>
                        Log In
                    </Button>
                    <Button type="button" color="signup" clickHandler={handleSignupClick}>
                        Sign Up
                    </Button>
                </div>
            )}
        </>
    )
}

export default HeroSection;