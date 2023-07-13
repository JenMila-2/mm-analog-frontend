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
        roles: ['ROLE_ADMIN', 'ROLE_USER'],
    },

    {
        title: "Admin Dashboard",
        path: "/admin/dashboard",
        roles: ['ROLE_ADMIN'],
    },

    {
        title: "User Folders",
        path: "/overview/projectfolders",
        roles: ['ROLE_ADMIN'],
    },
]