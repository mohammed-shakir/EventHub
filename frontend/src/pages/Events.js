import React from 'react';
import Navbar from '../components/Navbar.js';
import AddEventForm from '../components/AddEventForm.js';
import EventList from '../components/EventList.js';
import { getUserProfile } from '../api_calls/user';
import { useState, useEffect } from 'react';

const Events = () => {
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
            <h1>Events</h1>
            {userProfile && (userProfile.user_role === 'Admin' || userProfile.user_role === 'Organizer') && <AddEventForm />}
            <hr />
            <EventList />
        </div>
    );
};

export default Events;