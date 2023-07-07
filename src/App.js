import React, {useContext} from 'react';
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import FilmStockInventory from "./pages/filmStockInventory/FilmStockInventory";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import ProjectFolder from './pages/projectFolder/projectFolder'
import PhotoLog from "./pages/photoLog/PhotoLog";
import FilmDevelopmentLog from "./pages/filmDevelopmentLog/FilmDevelopmentLog";
import Profile from "./pages/profile/Profile";
import NavBar from "./components/navigation/NavBar/NavBar";
import {AuthContext} from "./context/AuthContext";
import Admin from "./pages/admin/Admin";
import PrivateRoute from "./helpers/PrivateRoute";

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
                <Route path="/projectfolders" element={isAuth ? <ProjectFolder/> : <Navigate to="/"/>}/>
                <Route path="/photologs" element={isAuth ? <PhotoLog/> : <Navigate to="/"/>}/>
                <Route path="/filmstockinventories" element={isAuth ? <FilmStockInventory/> : <Navigate to="/"/>}/>
                <Route path="/filmdevelopmentlogs" element={isAuth ? <FilmDevelopmentLog/> : <Navigate to="/"/>}/>
                {/*<Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>*/}
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/admin" element={isAuth ? <Admin/> : <Navigate to="/"/>}/>
            </Routes>
        </>
    );
}

export default App;
