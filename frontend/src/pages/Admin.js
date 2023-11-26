import React from 'react';
import AdminPanel from '../components/AdminPanel';
import Navbar from '../components/Navbar.js';
import { getUserProfile } from '../api_calls/user';
import { useState, useEffect } from 'react';

const Admin = () => {
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

    return (
        <div>
            <Navbar />
            <h1>Admin</h1>
            {userProfile && (userProfile.user_role === 'Admin') && <AdminPanel />}
        </div>
    );
};

export default Admin;