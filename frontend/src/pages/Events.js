import React from 'react';
import Navbar from '../components/Navbar.js';
import AddEventForm from '../components/AddEventForm.js';
import EventList from '../components/EventList.js';
import { getUserProfile } from '../api_calls/user';
import { getEvents } from '../api_calls/event';
import { useState, useEffect } from 'react';

const Events = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [userRegistrations, setUserRegistrations] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                const userRegistrations = await getEvents();
                setUserProfile(profile);
                setUserRegistrations(userRegistrations);
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
            <EventList userRegistrations={userRegistrations} />
        </div>
    );
};

export default Events;