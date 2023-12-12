import React, { useContext } from 'react';
import Navbar from '../components/Navbar.js';
import AddEventForm from '../components/AddEventForm.js';
import EventList from '../components/EventList.js';
import { UserContext } from '../provider/UserProvider';

const Events = () => {
    const { userProfile } = useContext(UserContext);

    return (
        <div>
            <Navbar />
            <h1>Events</h1>
            {userProfile && (userProfile.user_role === 'Admin' || userProfile.user_role === 'Organizer') && <AddEventForm />}
            <hr />
            <EventList />
        </div>
    );
};

export default Events;
