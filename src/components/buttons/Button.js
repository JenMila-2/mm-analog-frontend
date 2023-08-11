import React from 'react';
import styles from './Button.module.css';

function Button({children, color, clickHandler, disabled}) {
    const buttonClassName = `${styles['main--button']} ${styles[color]}`;

    return (
        <button
            type="button"
            className={buttonClassName}
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;