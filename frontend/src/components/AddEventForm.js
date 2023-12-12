import React, { useState } from 'react';
import { addEvent } from '../api_calls/event';
import { getCategories } from '../api_calls/category';
import { useEffect } from 'react';

const AddEventForm = () => {
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        image_url: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryData = await getCategories();
                setCategories(categoryData);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, []);

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
            <h2>Add Event</h2>
            <input type="text" name="title" value={newEvent.title} onChange={handleChange} required placeholder="Title" />
            <textarea name="description" value={newEvent.description} onChange={handleChange} required placeholder="Description" />
            <input type="datetime-local" name="start_time" value={newEvent.start_time} onChange={handleChange} required />
            <input type="datetime-local" name="end_time" value={newEvent.end_time} onChange={handleChange} required />
            <input type="text" name="location" value={newEvent.location} onChange={handleChange} required placeholder="Location" />
            <input type="text" name="image_url" value={newEvent.image_url} onChange={handleChange} placeholder="Image URL" />
            <select
                name="category_id"
                value={newEvent.category_id}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="submit">Add Event</button>
        </form>
    );
};

export default AddEventForm;