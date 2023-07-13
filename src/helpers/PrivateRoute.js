import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function PrivateRoute({children}) {

    const {isAuth} = useContext(AuthContext);

    return (
        isAuth === true ? children : <Navigate to="/login" />
    );
}

export default PrivateRoute;