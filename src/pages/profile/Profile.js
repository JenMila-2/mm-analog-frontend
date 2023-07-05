
import React, {useContext, useEffect, useState} from 'react';
import SidebarNav from "../../components/navigation/Sidebar/SidebarNav";
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';


function Profile() {
    const [profileData, setProfileData] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchProfileData() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer $(token)`,
                    },
                    cancelToken: source.token,
                });

                setProfileData(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchProfileData();

        return function cleanup() {
            source.cancel();
        }
    }, []);

    return (
        <>
            <SidebarNav />
            <section className="profile-settings">
                <h1>Profile</h1>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Authority: {user.authority}</p>
            </section>

            {Object.keys(profileData).length > 0 &&
                <section>
                    <h2>Secret content</h2>
                    <h3>{profileData.title}</h3>
                    <p>{profileData.content}</p>
                </section>
            }
            </>
    )
}

export default Profile;
