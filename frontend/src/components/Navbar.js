import React from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../api_calls/user';
import { useState, useEffect } from 'react';

const Navbar = () => {
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
        <nav>
            <h1>Navbar</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/events">Events</Link></li>
                {userProfile && (userProfile.user_role === 'Admin') && <li><Link to="/admin">Admin</Link></li>}
            </ul>
        </nav>
    );
};

export default Navbar;