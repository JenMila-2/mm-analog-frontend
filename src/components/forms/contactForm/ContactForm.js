import React, {useRef} from 'react';
import styles from "../contactForm/ContactForm.module.css";
import emailjs from '@emailjs/browser';

function ContactForm() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_d1sm3tg', 'template_nobfptr', form.current, 'HVlrVsb2DSbmuLHD_')
            .then((result) => {
                console.log(result.text);
                form.current.reset();
                alert("Email send successfully!")
            }, (error) => {
                console.log(error.text);
                alert("Failed to send email!")
            });
    };

    return (
        <div className={styles['contact-form-container']}>
            <h2 className={styles['contact-form-title']}>contact us</h2>
            <form className={styles['contact-form-inner-container']} ref={form} onSubmit={sendEmail}>
                <label htmlFor="name-field">
                    Name
                    <input
                        type="text"
                        id="name-field"
                        name="name"
                        required
                    />
                </label>
                <label htmlFor="email-field">
                    Email
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        required
                    />
                </label>
                <label htmlFor="message-field">
                    Message
                    <textarea
                        name="message"
                        id="message-field"
                        cols="40"
                        rows="10"
                        placeholder="Leave your message here..."
                    />
                </label>
                <input className={styles['submit-button-large']} type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ContactForm;