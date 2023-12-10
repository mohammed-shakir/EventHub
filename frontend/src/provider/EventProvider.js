import React, { createContext, useState, useEffect } from 'react';
import { getEvents } from '../api_calls/event';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await getEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{ events, setEvents, isLoading }}>
            {children}
        </EventContext.Provider>
    );
};
