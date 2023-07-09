import React from 'react';
import styles from './Welcome.module.css';
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login')
    }

    return(
        <>
            <main className={styles['welcome-page-container']}>
                <h2 className={styles['welcome-title']}>welcome to mm-analog.</h2>
                <div className={styles['welcome-text']}>
                    <p>Thank you for signing up!</p>
                    <p>To access you account please log in using the button below.</p>
                </div>
                <Button type="button" color="login-welcome" clickHandler={handleLoginClick}>
                    Log in to your account
                </Button>

            </main>
        </>
    );
}

export default Welcome;