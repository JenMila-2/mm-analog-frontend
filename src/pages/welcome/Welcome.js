import React from 'react';
import styles from './Welcome.module.css';
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";
import {BsCameraFill} from "react-icons/bs";
import Footer from "../../components/footer/Footer";

function Welcome() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login')
    }

    return(
        <>
            <main className={styles['welcome-page-container']}>
                <h2 className={styles['welcome-title']}>Hi, welcome to mm-analog.</h2>
                <div className={styles['welcome-text']}>
                    <p>Thank you for signing up!</p>
                    <span className={styles['camera-icon']}><BsCameraFill/></span>
                    <p>We hope you enjoy using our application!</p>
                    <p>To get started please log in using the button below.</p>
                </div>
                <Button type="button" color="login-welcome" clickHandler={handleLoginClick}>
                    Log in to your account
                </Button>
                <p className={styles['photo-quote']}>"Photography has no rules, it is not a sport. It is the result which counts, no matter how it is achieved."</p>
                <p>- Bill Brandt</p>
            </main>
            <Footer />
        </>
    );
}

export default Welcome;