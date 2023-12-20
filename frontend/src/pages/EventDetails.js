import React, { useEffect, useState, useContext, useRef } from 'react';
import Navbar from '../components/Navbar.js';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent, deleteEvent, uploadEventPicture } from '../api_calls/event';
import { getCategories } from '../api_calls/category';
import { UserContext } from '../provider/UserProvider';
import EventPicture from '../components/EventPicture';

const EventDetails = () => {
    const [event, setEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState({});
    const [categories, setCategories] = useState([]);
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { userProfile } = useContext(UserContext);

    const fileInputRef = useRef(null);

    const formatDateForInput = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toISOString().slice(0, 16);
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
                setUpdatedEvent({
                    ...eventData,
                    start_time: formatDateForInput(eventData.start_time),
                    end_time: formatDateForInput(eventData.end_time)
                });
            } catch (error) {
                console.error('Error fetching event details', error);
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

        fetchEventDetails();
        fetchCategories();
    }, [eventId]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleChange = (e) => {
        setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (file) => {
        try {
            const response = await uploadEventPicture(file);
            return response.filePath;
        } catch (error) {
            console.error('Error uploading event picture', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = event.image_url;
            if (fileInputRef.current && fileInputRef.current.files[0]) {
                imageUrl = await handleFileUpload(fileInputRef.current.files[0]);
            }

            const updatedData = { ...updatedEvent, image_url: imageUrl };
            await updateEvent(eventId, updatedData);
            setEvent(updatedData);
            toggleEditMode();
        } catch (error) {
            console.error('Error updating event', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteEvent(eventId);
            navigate('/events');
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    if (!event || !userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            {!editMode ? (
                <>
                    <h1>{event.title}</h1>
                    <EventPicture imageUrl={event.image_url} />
                    <p>Location: {event.location}</p>
                    <p>About: {event.description}</p>
                    <p>Start Time: {event.start_time}</p>
                    <p>End Time: {event.end_time}</p>
                    <h3>Registered Users</h3>
                    <ul>
                        {event.registeredUsers.map(user => (
                            <li key={user.user_id}>{user.first_name} {user.last_name}</li>
                        ))}
                    </ul>
                    <hr />
                    { (userProfile.user_role === 'Admin' || event.organizer_id === userProfile.user_id) && (
                        <>
                            <button onClick={toggleEditMode}>Edit Event</button>
                            <button onClick={handleDelete}>Delete Event</button>
                        </>
                    )}
                </>
            ) : (
                <form onSubmit={handleUpdate}>
                    <h1>Edit Event</h1>
                    <input type="text" name="title" value={updatedEvent.title} onChange={handleChange} required placeholder="Title"/>
                    <textarea name="description" value={updatedEvent.description} onChange={handleChange} required placeholder="Description"/>
                    <input type="datetime-local" name="start_time" value={updatedEvent.start_time} onChange={handleChange} required />
                    <input type="datetime-local" name="end_time" value={updatedEvent.end_time} onChange={handleChange} required />
                    <input type="text" name="location" value={updatedEvent.location} onChange={handleChange} required placeholder="Location"/>
                    <select name="category_id" value={updatedEvent.category_id || 0} onChange={handleChange}>
                        {categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>{category.name}</option>
                        ))}
                    </select>
                    <p />
                    <input type="file" ref={fileInputRef} />
                    <button type="submit">Update Event</button>
                    <button type="button" onClick={toggleEditMode}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default EventDetails;