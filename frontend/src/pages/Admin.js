import React, { useContext } from 'react';
import AdminPanel from '../components/AdminPanel';
import Navbar from '../components/Navbar.js';
import { UserContext } from '../provider/UserProvider';

const Admin = () => {
    const { userProfile } = useContext(UserContext);

    return (
        <div>
            <Navbar />
            <h1>Admin</h1>
            {userProfile && (userProfile.user_role === 'Admin') && <AdminPanel />}
        </div>
    );
};

export default Admin;
