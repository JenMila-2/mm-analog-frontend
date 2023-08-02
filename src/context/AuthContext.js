import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import isTokenValid from "../helpers/isTokenValid";
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
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
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, []);

    function login(JWT) {
        console.log("User was successfully logged in");
        const decodedToken = jwt_decode(JWT);
        localStorage.setItem('token', JWT);
        void getUserData(decodedToken.sub, JWT);
        navigate("/profile");
    }

    function logoff(e) {
        localStorage.clear();
        e.preventDefault();
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('User is logged off!');
        navigate('/');
    }

    async function getUserData(id, JWT) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            console.log(response.data);

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    password: response.data.password,
                    role: response.data.authorities[0].authority,
                    name: response.data.name,
                    email: response.data.email,
                },
                status: 'done',
            });
        } catch (e) {
            console.error("Oops, something went wrong...", e);
            localStorage.clear();
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        auth: auth.isAuth,
        user: auth.user,
        login: login,
        logoff: logoff,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
