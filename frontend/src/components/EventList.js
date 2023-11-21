import React, { useState, useEffect } from 'react';
import { getEvents, registerForEvent } from '../api_calls/event';
import { getUserProfile } from '../api_calls/user';
import { useNavigate } from 'react-router-dom';

const EventList = ({ userRegistrations }) => {
    const [events, setEvents] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventsAndProfile = async () => {
            try {
                const events = await getEvents();
                const profile = await getUserProfile();
                setEvents(events);
                setUserProfile(profile);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEventsAndProfile();
    }, []);

    const handleRegister = async (eventId) => {
        try {
            await registerForEvent(eventId);
        } catch (error) {
            console.error('Error registering for event', error);
        }
    };

    return (
        <div>
            <h2>Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.event_id}>
                        <h3>{event.title}</h3>
                        <p>Organized by: {event.first_name} {event.last_name}</p>
                        {event.image_url && <img src={event.image_url} alt={event.title} />}
                        <p>Location: {event.location}</p>
                        <button onClick={() => navigate(`/events/${event.event_id}`)}>View more</button>
                        {userProfile && userProfile.user_id !== event.organizer_id && !userRegistrations.includes(event.event_id) && !event.is_user_registered && (
                            <button onClick={() => handleRegister(event.event_id)}>Register</button>
                        )}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;