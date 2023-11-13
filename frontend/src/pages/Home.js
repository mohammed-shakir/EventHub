import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.js';
import { getUserProfile, logout as performLogout } from '../api_calls/user';

const Home = () => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUserProfile(profile);
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };

        fetchUserProfile();
    }, []);

    const logout = () => {
        performLogout();
        setUserProfile(null);
    };

    return (
        <div>
            <Navbar />
            <h1>Home</h1>
            {userProfile && (
                <div>
                    <p>Email: {userProfile.email}</p>
                    <p>First Name: {userProfile.first_name}</p>
                    <p>Last Name: {userProfile.last_name}</p>
                    <p>Role: {userProfile.user_role}</p>
                </div>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;