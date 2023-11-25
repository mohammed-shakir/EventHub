import React, { useState, useEffect } from 'react';
import { getEvents, registerForEvent } from '../api_calls/event';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await getEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, []);

    const handleRegister = async (eventId) => {
        try {
            await registerForEvent(eventId);
            const updatedEvents = await getEvents();
            setEvents(updatedEvents);
        } catch (error) {
            console.error('Error registering for event', error);
        }
    };

    return (
        <div>
            <h2>Event Listings</h2>
            <ul>
                {events.map(event => (
                    <li key={event.event_id}>
                        <h3>{event.title}</h3>
                        <p>Organized by: {event.organizer_name}</p>
                        <p>{event.image_url && <img src={event.image_url} alt={event.title} />}</p>
                        <p>Location: {event.location}</p>
                        <button onClick={() => navigate(`/events/${event.event_id}`)}>View more</button>
                        {!event.is_registered && (
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
