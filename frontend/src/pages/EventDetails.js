import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.js';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api_calls/event';

const EventDetails = () => {
    const [event, setEvent] = useState(null);
    const { eventId } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event details', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <h1>{event.title}</h1>
            <img src={event.image_url} alt={event.title} />
            <p>Location: {event.location}</p>
            <p>About: {event.description}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
        </div>
    );
};

export default EventDetails;