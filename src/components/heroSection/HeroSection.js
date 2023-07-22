import React, {useContext, useState} from 'react';
import styles from './HeroSection.module.css';
import image from '../../assets/Sajad_Fi_1.jpg';
import Button from "../buttons/Button";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


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
        <div className={styles['hero-container']}>
            <div className={styles['hero-background']}>
                <img src={image} alt="" className={styles['hero-image']}/>
            </div>
            <div className={styles['hero-content']}>
                <h1>welcome</h1>
                <p>Keep shooting film!</p>
            </div>
        </div>
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