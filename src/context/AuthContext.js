import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            const decodedToken = jwt_decode(token);
            void getUserData(decodedToken.sub, token);
            } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, []);

    function login(token) {
        const decodedToken = jwt_decode(token);
        localStorage.setItem('token', token);
        void getUserData(decodedToken.sub, token, "/profile");
    }

    function logoff(e) {
        localStorage.clear();
        e.preventDefault();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('User is logged off!');
        navigate('/');
    }

    async function getUserData(username, token) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.authorities[0].authority,
                },
                status: 'done',
            });
            if (response.data.authorities[0].authority === "ROLE_ADMIN") {
                navigate('/admin');
            } else {
                navigate('/profile')
            }
        }  catch (e) {
                console.error("Oops, an error occurred", e);
                localStorage.clear();
            }
        }

        const contextData = {
            isAuth: isAuth.isAuth,
            user: isAuth.user,
            login: login,
            logoff: logoff,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
