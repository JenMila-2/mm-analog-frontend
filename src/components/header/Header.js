import React from 'react';
import './Header.css';

function Header({ image, title }) {
    return (
        <header>
            <img src={image} alt={title}/>
            <h1>{title}</h1>
        </header>
    );
}

export default Header;