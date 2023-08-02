import React from 'react';
import HeroSection from "../../components/heroSection/HeroSection";
import HomeSection from "../../components/homeSection/HomeSection";
import Footer from "../../components/footer/Footer";
import ContactForm from "../../components/forms/contactForm/ContactForm";
import image1 from '../../assets/Tibor_Krizsak _1.jpg';
import image2 from '../../assets/Robin_Spielmann_1.jpg';
import styles from "../home/Home.module.css";


function Home() {
    return (
        <>
            <main className="home-container">
                <HeroSection />
                <HomeSection
                    heading="get started"
                    text="“To me, photography is an art of observation. It's about finding something interesting in an ordinary place... I've found it has little to do with the things you see and everything to do with the way you see them.“ | Elliott Erwitt"
                    buttonLabel="Create an account"
                    buttonColor="create-account"
                    buttonPath="/signup"
                    subtext="Keep track of your photo projects and manage your film stock inventory!"
                />
                <HomeSection
                    heading="learn more"
                    text="“There is a creative fraction of a second when you are taking a picture. Your eye must see a composition or an expression that life itself offers you, and you must know with intuition when to click the camera. That is the moment the photographer is creative. Oop! The Moment! Once you miss it, it is gone forever.” | Henri Cartier-Bresson"
                    subtext="Keep film photography alive!"
                    buttonLabel="About us"
                    buttonColor="create-account"
                    buttonPath="/about"
                    imageSource1={image1}
                    imageSource2={image2}
                />
                <ContactForm className={styles['contact-form']} />
                <Footer />
            </main>
        </>
    )
}

export default Home;