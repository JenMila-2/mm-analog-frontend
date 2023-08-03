import React from 'react';
import styles from './SearchBar.module.css';
import {AiOutlineSearch} from "react-icons/ai";

function SearchBar({ searchValue, handleSearchChange, placeholder}) {
    return (
        <div className={styles['search-bar-container']}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleSearchChange}
                className={styles['search-bar']}
            />
        </div>
    )
}

export default SearchBar;