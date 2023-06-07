import React, {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleAuth] = useState(false);
    const navigate = useNavigate();

    function login() {
        console.log('User is logged in!');
        toggleAuth(true);
        navigate('./projects');
    }

    function logoff() {
        console.log('User is logged off!');
        toggleAuth(false);
        navigate('./');
    }

    const contextData = {
        isAuth: isAuth,
        login: login,
        logoff: logoff,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
