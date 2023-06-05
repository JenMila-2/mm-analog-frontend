import React from 'react';

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        loggedIn: true,
        public: true,
    },

    {
        title: "Explore galleries",
        path: "/exploregalleries",
        loggedIn: true,
        public: true,
    },

    {
        title: "About",
        path: "/about",
        loggedIn: true,
        public: true,
    },

    {
        title: "Contact",
        loggedIn: true,
        public: true,
    },

    {
        title: "My projects",
        path: "/projects",
        loggedIn: true,
        public: false,

    },

    {
        title: "My photo gallery",
        path: "/photogallery",
        loggedIn: true,
        public: false,
    },

    {
        title: "Account Settings",
        path: "/accountsettings",
        loggedIn: true,
        public: false,
    },

    {
        title: "Sign up",
        path: "/signup",
        loggedIn: false,
        public: true,
    },

    {
        title: "Log in",
        path: "/login",
        loggedIn: false,
        public: true,
    },

    {
        title: "Log off",
        path: "/logoff",
        loggedIn: true,
        public: false,
    },
]
