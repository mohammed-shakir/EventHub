import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.js';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent, deleteEvent } from '../api_calls/event';
import { getUserProfile } from '../api_calls/user';

const EventDetails = () => {
    const [event, setEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState({});
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchEventAndUser = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
                setUpdatedEvent(eventData);
                const profile = await getUserProfile();
                setUserProfile(profile);
            } catch (error) {
                console.error('Error fetching event details', error);
            }
        };

        fetchEventAndUser();
    }, [eventId]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleChange = (e) => {
        setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await updateEvent(eventId, updatedEvent);
            setEvent(updatedEvent);
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
                    <img src={event.image_url} alt={event.title} />
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
                    <input type="text" name="image_url" value={updatedEvent.image_url} onChange={handleChange} placeholder="Image URL"/>
                    <button type="submit">Update Event</button>
                    <button type="button" onClick={toggleEditMode}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default EventDetails;