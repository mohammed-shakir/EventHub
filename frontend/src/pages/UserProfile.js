import React from 'react';
import Navbar from '../components/Navbar.js';
import UserProfileForm from '../components/UserProfileForm.js';

const UserProfile = () => {
    return (
        <div>
            <Navbar />
            <h1>User Profile</h1>
            <UserProfileForm />
        </div>
    );
};

export default UserProfile;
