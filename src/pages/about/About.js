import React from 'react';
import Footer from "../../components/footer/Footer";
import portraitJensy from '../../assets/Self_Portrait_Jensy.jpg';
import styles from "./About.module.css";

function About() {
    return (
        <>
            <main className={styles['about-section']}>
                <h1 className={styles['page-title']}>About</h1>
                <p className={styles.quote}>"Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever… It remembers little things, long after you have forgotten everything." - Aaron Siskind</p>
                <div className={styles['image-container']}>
                    <img src={portraitJensy} alt="Photographer Jensy" className={styles['photographer-portrait']} />
                </div>
                <div className={styles['sub-text-container']}>
                    <p className={styles['sub-text']}><strong>send us an email:</strong> mmanalogphotography@gmail.com</p>
                    <p className={styles['sub-text']}><strong>instagram:</strong> @mmanalogphotography <i>(fake)</i></p>
                </div>
                <div className={styles['side-text-right']}>
                    <p>keep shooting film</p>
                </div>
                <div className={styles['side-text-left']}>
                    <p>keep shooting film</p>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default About;