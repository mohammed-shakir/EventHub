import React, { useState } from 'react';
import { addEvent } from '../api_calls/event';

const AddEventForm = () => {
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        image_url: ''
    });

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addEvent(newEvent);
            window.location.reload();
        } catch (error) {
            console.error('Error adding event', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleChange}
                required
                placeholder="Title"
            />
            <textarea
                name="description"
                value={newEvent.description}
                onChange={handleChange}
                required
                placeholder="Description"
            />
            <input
                type="datetime-local"
                name="start_time"
                value={newEvent.start_time}
                onChange={handleChange}
                required
            />
            <input
                type="datetime-local"
                name="end_time"
                value={newEvent.end_time}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleChange}
                required
                placeholder="Location"
            />
            <input
                type="text"
                name="image_url"
                value={newEvent.image_url}
                onChange={handleChange}
                placeholder="Image URL"
            />
            <button type="submit">Add Event</button>
        </form>
    );
};

export default AddEventForm;
