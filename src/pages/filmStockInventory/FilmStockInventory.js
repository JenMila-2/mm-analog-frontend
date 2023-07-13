import React from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import DividerNavBar from "../../components/navigation/dividerNavBar/DividerNavBar";
import {AuthContext} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './FilmStockInventory.module.css';

function FilmStockInventory() {
    return (
        <main className="film-stock-inventory">
            <h1>Film Stock Inventory</h1>
        </main>
    )
}

export default FilmStockInventory;