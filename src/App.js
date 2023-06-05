import React from 'react';
import './App.css';
import NavBar from "./components/navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import ExploreGallery from "./pages/exploreGallery/ExploreGallery";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import PhotoProjects from "./pages/photoProject/PhotoProjects";
import PhotoGallery from "./pages/photoGallery/PhotoGallery";
import Account from "./pages/account/Account";

function App() {
  return (
    <>
        <NavBar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/exploregalleries" element={<ExploreGallery/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/photoproject" element={<PhotoProjects/>}/>
                <Route path="/photogallery" element={<PhotoGallery/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/logoff" />
            </Routes>
    </>
  );
}

export default App;
