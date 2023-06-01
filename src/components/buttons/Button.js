import React from 'react';
import './Button.css';

function Button({children, color, clickHandler, disabled}) {
    const buttonClassName = `main--button ${color}`;


    return (
        <button
            type="button"
            className={buttonClassName}
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;