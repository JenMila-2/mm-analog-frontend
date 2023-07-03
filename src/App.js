import React, {useContext} from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import FilmStockInventory from "./pages/filmStockInventory/FilmStockInventory";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import PhotoProjects from "./pages/photoProject/PhotoProjects";
import PhotoLog from "./pages/photoLog/PhotoLog";
import FilmDevelopmentLog from "./pages/filmDevelopmentLog/FilmDevelopmentLog";
import Profile from "./pages/profile/Profile";
import NavBar from "./components/navigation/NavBar/NavBar";
import {AuthContext} from "./context/AuthContext";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/projectfolders" element={<PhotoProjects/>}/>
                <Route path="/photologs" element={<PhotoLog/>}/>
                <Route path="/filmstockinventories" element={<FilmStockInventory/>}/>
                <Route path="/filmdevelopmentlogs" element={<FilmDevelopmentLog/>}/>
                <Route path="/profilesettings" element={<Profile/>}/>
                <Route path="/logoff" />
            </Routes>
        </>
    );
}

export default App;
