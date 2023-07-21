import React from 'react';

export const SidebarData = [
    {
        title: "Photo Projects",
        path: "/projectfolders",
        roles: ['ROLE_USER'],
    },

    {
        title: "Stock Inventory",
        path: "/filmstockinventories",
        roles: ['ROLE_USER'],
    },

    {
        title: "Development Log",
        path: "/filmdevelopmentlogs",
        roles: ['ROLE_USER'],
    },

    {
        title: "Profile",
        path: "/profile",
        roles: ['ROLE_USER'],
    },

    {
        title: "Users Overview",
        path: "/admin/dashboard/users",
        roles: ['ROLE_ADMIN'],
    },

    {
        title: "User Folders",
        path: "/admin/dashboard/projectfolders",
        roles: ['ROLE_ADMIN'],
    },

    {
        title: "User Development Logs",
        path: "/admin/dashboard/filmdevelopmentlogs",
        roles: ['ROLE_ADMIN'],
    },

    {
        title: "Admin Profile",
        path: "/profile",
        roles: ['ROLE_ADMIN'],
    },
]