import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';

const Navbar = () => {
    const { userProfile } = useContext(UserContext);

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
