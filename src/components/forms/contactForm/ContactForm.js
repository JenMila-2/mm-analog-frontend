import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import styles from "../contactForm/ContactForm.module.css";

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
        <main className={styles['contact-form-container']}>
            <h2 className={styles['contact-form-title']}>contact us</h2>
            <form className={styles['contact-form-inner-container']} ref={form} onSubmit={sendEmail}>
                <label htmlFor="name-field" className={styles['label-contact-form']}>
                    Name
                    <input
                        type="text"
                        id="name-field"
                        name="name"
                        required
                        className={styles['input-contact-form']}
                    />
                </label>
                <label htmlFor="email-field" className={styles['label-contact-form']}>
                    Email
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        required
                        className={styles['input-contact-form']}
                    />
                </label>
                <label htmlFor="message-field" className={styles['label-contact-form']}>
                    Message
                    <textarea
                        name="message"
                        id="message-field"
                        cols="40"
                        rows="10"
                        className={styles['textarea-contact-form']}
                        placeholder="Leave your message here..."
                    />
                </label>
                <input className={styles['submit-button-large']} type="submit" value="Submit" />
            </form>
        </main>
    )
}

export default ContactForm;