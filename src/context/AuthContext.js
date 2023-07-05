import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode(token);
            void fetchUserData(decoded.sub, token);
            } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, []);

    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        void fetchUserData(decoded.sub, JWT);
    }

    function logoff() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        console.log('User is logged off!');
        navigate('/');
    }

    async function fetchUserData(username, token) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data,
                    role: response.data.authorities[0].authority,
                },
                status: 'done',
            });

            if (response.data.authorities[0].authority === "ROLE_ADMIN") {
                navigate('/admin');
            } else {
                navigate('/profilesettings')
            }
        } catch (e) {
                console.error(e);
                toggleIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
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
