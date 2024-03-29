import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import NavBar from "./components/navigation/NavBar/NavBar";
import Home from './pages/home/Home';
import About from './pages/about/About';
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";
import Profile from "./pages/profile/Profile";
import ProjectFolder from './pages/projectFolder/ProjectFolder';
import ProjectFolderPage from "./pages/projectFolder/ProjectFolderPage";
import ProjectFolderList from "./pages/projectFolderList/ProjectFolderList";
import PhotoLog from "./pages/photoLog/PhotoLog";
import FilmStockInventory from "./pages/filmStockInventory/FilmStockInventory";
import FilmDevelopmentLog from "./pages/filmDevelopmentLog/FilmDevelopmentLog";
import UpdateProfileDetails from "./pages/updateProfileDetails/UpdateProfileDetails";
import UpdatePassword from "./pages/updateProfileDetails/UpdatePassword";
import NewFilmStockInventory from "./pages/newEntries/newFilmStockInventory/NewFilmStockInventory";
import NewFilmDevelopmentLog from "./pages/newEntries/newFilmDevelopmentLog/NewFilmDevelopmentLog";
import NewProjectFolder from "./pages/newEntries/newProjectFolder/NewProjectFolder";
import NewPhotoLog from "./pages/newEntries/newPhotoLog/NewPhotoLog";
import UploadImage from "./pages/uploadImage/UploadImage";
import Admin from "./pages/admin/Admin";
import NewUsers from "./pages/newEntries/newUsers/NewUsers";
import UserFolders from "./pages/adminOverview/userFolders/UserFolders";
import UserPhotoLogs from "./pages/adminOverview/userPhotoLogs/UserPhotoLogs";
import UserFilmStockInventories from "./pages/adminOverview/userFilmStockInventories/UserFilmStockInventories";
import UserDevelopmentLogs from "./pages/adminOverview/userDevelopmentLogs/UserDevelopmentLogs";
import DeleteAccount from "./pages/updateProfileDetails/DeleteAccount";
import PageNotFound from "./pages/notFound/PageNotFound";
import './App.css';

function App() {
    const { auth } = useContext(AuthContext);

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
                <Route
                    path="/profile"
                    element={auth ? <Profile /> : <Navigate to="/profile" />}
                />
                <Route
                    path="/projectfolders"
                    element={auth ? <ProjectFolder /> : <Navigate to="/" />}
                />
                <Route
                    path="/projectfolder/:folderId"
                    element={auth ? <ProjectFolderPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/projectfolders/list"
                    element={auth ? <ProjectFolderList /> : <Navigate to="/" />}
                />
                <Route
                    path="/photologs"
                    element={auth ? <PhotoLog /> : <Navigate to="/" />}
                />
                <Route
                    path="/filmstockinventories"
                    element={auth ? <FilmStockInventory /> : <Navigate to="/" />}
                />
                <Route
                    path="/filmdevelopmentlogs"
                    element={auth ? <FilmDevelopmentLog /> : <Navigate to="/" />}
                />
                <Route
                    path="/update/profile"
                    element={auth ? <UpdateProfileDetails /> : <Navigate to="/" />}
                />
                <Route
                    path="/update/password"
                    element={auth ? <UpdatePassword /> : <Navigate to="/" />}
                />
                <Route
                    path="/new/filmstockinventory"
                    element={auth ? <NewFilmStockInventory /> : <Navigate to="/" />}
                />
                <Route
                    path="/new/filmdevelopmentlog"
                    element={auth ? <NewFilmDevelopmentLog /> : <Navigate to="/" />}
                />
                <Route
                    path="/new/projectfolder"
                    element={auth ? <NewProjectFolder /> : <Navigate to="/" />}
                />
                <Route
                    path="/new/photolog"
                    element={auth ? <NewPhotoLog /> : <Navigate to="/" />}
                />
                <Route
                    path="/upload/image"
                    element={auth ? <UploadImage /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/dashboard/users"
                    element={auth ? <Admin /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/add/users"
                    element={auth ? <NewUsers /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/dashboard/projectfolders"
                    element={auth ? <UserFolders /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/dashboard/photologs"
                    element={auth ? <UserPhotoLogs /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/dashboard/filmstockinventories"
                    element={auth ? <UserFilmStockInventories /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin/dashboard/filmdevelopmentlogs"
                    element={auth ? <UserDevelopmentLogs /> : <Navigate to="/" />}
                />
                <Route
                    path="/delete/account"
                    element={auth ? <DeleteAccount /> : <Navigate to="/" />}
                />
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </>
    );
}

export default App;
