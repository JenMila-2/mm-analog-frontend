import React from 'react';
import Footer from "../../components/footer/Footer";
import "./About.css";
import portraitJensy from '../../assets/Self_Portrait_Jensy.jpg';


function About() {
    return (
        <>
            <section className="about-section">
                <h1>About</h1>
                <p className="quote">"Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever… It remembers little things, long after you have forgotten everything." - Aaron Siskind</p>
                <div className="image-container">
                <img src={portraitJensy} alt="Photographer" className="photographer-portrait" />
                    <div className="sub-text-container">
                        <p className="sub-text"><strong>send us an email:</strong> info@mmanalog.com</p>
                        <p className="sub-text"><strong>instagram:</strong> @mmanalog</p>
                    </div>
                </div>
                <div className="side-text-right">
                    <p>keep shooting film</p>
                </div>
                <div className="side-text-left">
                    <p>keep shooting film</p>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default About;