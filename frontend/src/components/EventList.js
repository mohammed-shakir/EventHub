import React, { useState, useEffect } from 'react';
import { getEvents, registerForEvent } from '../api_calls/event';
import { getCategories } from '../api_calls/category';
import { useNavigate } from 'react-router-dom';
import EventPicture from './EventPicture';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
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

        const fetchCategories = async () => {
            try {
                const categoryData = await getCategories();
                setCategories(categoryData);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchEvents();
        fetchCategories();
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

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.category_id === categoryId);
        return category ? category.name : 'Unknown';
    };

    return (
        <div>
            <h2>Event Listings</h2>
            <ul>
                {events.map(event => (
                    <li key={event.event_id}>
                        <h3>{event.title}</h3>
                        <p>Organized by: {event.organizer_name}</p>
                        <p><EventPicture imageUrl={event.image_url} /></p>
                        <p>Location: {event.location}</p>
                        <p>Category: {getCategoryName(event.category_id)}</p>
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