import React, { useState, useEffect } from 'react';
import { getEvents } from '../api_calls/event';
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

    return (
        <div>
            <h2>Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.event_id}>
                        <h3>{event.title}</h3>
                        <p>{event.image_url && <img src={event.image_url} alt={event.title} />}</p>
                        <button onClick={() => navigate(`/events/${event.event_id}`)}>View more</button>
                        <p>Location: {event.location}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;