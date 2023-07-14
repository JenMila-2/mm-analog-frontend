import React from 'react';
import styles from "./LogModal.module.css";

const LogModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles['log-modal-overlay']}>
            <div className={styles['log-modal-content']}>
                <button className={styles['close-button']} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default LogModal;