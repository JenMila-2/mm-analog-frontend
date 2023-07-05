import React, {useContext} from 'react';
import {Navigate, Route} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function PrivateRoute({children, path}) {

    const {isAuth} = useContext(AuthContext);

    return (

        <Route exact path={path}>

            {isAuth ? children
            :
                <Navigate to={{pathname: '/'}}/>
            }
        </Route>
    );
}

export default PrivateRoute;