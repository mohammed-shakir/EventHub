import React, { useState, useEffect } from 'react';
import { getEvents } from '../api_calls/event';

const EventList = () => {
    const [events, setEvents] = useState([]);

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
                        <p>{event.description}</p>
                        <p>Start Time: {event.start_time}</p>
                        <p>End Time: {event.end_time}</p>
                        <p>Location: {event.location}</p>
                        {event.image_url && <img src={event.image_url} alt={event.title} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;