import React, { useState, useRef } from 'react';
import { addEvent, uploadEventPicture } from '../api_calls/event';
import { getCategories } from '../api_calls/category';
import { useEffect } from 'react';

const AddEventForm = () => {
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
    });
    const fileInputRef = useRef(null);

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

    const handleFileUpload = async (file) => {
        try {
            const response = await uploadEventPicture(file);
            return response.filePath;
        } catch (error) {
            console.error('Error uploading event picture', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let imageUrl = '';
            if (fileInputRef.current && fileInputRef.current.files[0]) {
                imageUrl = await handleFileUpload(fileInputRef.current.files[0]);
            }

            await addEvent({ ...newEvent, image_url: imageUrl });
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
            <p />
            <input type="file" ref={fileInputRef} />
            <button type="submit">Add Event</button>
        </form>
    );
};

export default AddEventForm;