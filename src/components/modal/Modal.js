import React from 'react';
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                <button className={styles['close-button']} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;