import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import Home from './pages/home/Home';
import About from './pages/about/About';
import FilmStockInventory from "./pages/filmStockInventory/FilmStockInventory";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import ProjectFolder from './pages/projectFolder/projectFolder'
import PhotoLog from "./pages/photoLog/PhotoLog";
import FilmDevelopmentLog from "./pages/filmDevelopmentLog/FilmDevelopmentLog";
import Profile from "./pages/profile/Profile";
import Welcome from "./pages/welcome/Welcome";
import UpdateProfileDetails from "./pages/updateProfileDetails/UpdateProfileDetails";
import NavBar from "./components/navigation/NavBar/NavBar";
import Admin from "./pages/admin/Admin";
import UpdatePassword from "./pages/updateProfileDetails/UpdatePassword";
import UserFolders from "./pages/adminOverview/UserFolders/UserFolders";
import UploadImage from "./pages/uploadImage/UploadImage";
import NewFilmStockInventory from "./pages/newEntries/newFilmStockInventory/NewFilmStockInventory";
import NewFilmDevelopmentLog from "./pages/newEntries/newFilmDevelopmentLog/NewFilmDevelopmentLog";
import NewUsers from "./pages/newEntries/newUsers/NewUsers";
import './App.css';
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
                <Route path="/welcomepage" element={<Welcome/>}/>
                <Route path="/projectfolders" element={<ProjectFolder/>}/>
                <Route path="/photologs" element={<PhotoLog/>}/>
                <Route path="/filmstockinventories" element={<FilmStockInventory/>}/>
                <Route path="/filmdevelopmentlogs" element={<FilmDevelopmentLog/>}/>
                <Route path="/upload/image" element={<UploadImage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/admin/dashboard/users" element={<Admin/>}/>
                <Route path="/admin/dashboard/projectfolders" element={<UserFolders/>}/>
                <Route path="/update/profile" element={<UpdateProfileDetails/>}/>
                <Route path="/update/password" element={<UpdatePassword/>}/>
                <Route path="/new/filmstockinventory" element={<NewFilmStockInventory/>}/>
                <Route path="/new/filmdevelopmentlog" element={<NewFilmDevelopmentLog/>}/>
                <Route path="/admin/add/users" element={<NewUsers/>}/>


                {/*<Route path="/projectfolders" element={isAuth ? <ProjectFolder/> : <Navigate to="/"/>}/>
                <Route path="/photologs" element={isAuth ? <PhotoLog/> : <Navigate to="/"/>}/>
                <Route path="/filmstockinventories" element={isAuth ? <FilmStockInventory/> : <Navigate to="/"/>}/>
                <Route path="/filmdevelopmentlogs" element={isAuth ? <FilmDevelopmentLog/> : <Navigate to="/"/>}/>
                <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
                <Route path="/admin" element={isAuth ? <Admin/> : <Navigate to="/"/>}/>*/}
            </Routes>
        </>
    );
}

export default App;
