import React, { useContext } from 'react';
import Navbar from '../components/Navbar.js';
import { UserContext } from '../provider/UserProvider';
import { logout as performLogout } from '../api_calls/user';

const Home = () => {
    const { userProfile } = useContext(UserContext);

    const logout = () => {
        performLogout();
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
