import React, { useEffect, useState } from 'react';
import { getAllUsers, adminDeleteUser, getUserProfile } from '../api_calls/user';
import { getEvents, adminDeleteEvent } from '../api_calls/event';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
      const fetchAdminProfile = async () => {
          try {
              const profile = await getUserProfile();
              setAdminProfile(profile);
          } catch (error) {
              console.error('Error fetching user profile', error);
          }
      };

      fetchAdminProfile();
  }, []);

  useEffect(() => {
    fetchAllUsersAndAllEvents();
  }, []);

  const fetchAllUsersAndAllEvents = async () => {
    try {
      const usersData = await getAllUsers();
      const eventsData = await getEvents();
      setUsers(usersData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching users and events', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    await adminDeleteUser(userId);
    fetchAllUsersAndAllEvents();
  };

  const handleDeleteEvent = async (eventId) => {
    await adminDeleteEvent(eventId);
    fetchAllUsersAndAllEvents();
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>All Users</h2>
        {users.map(user => (
          <div key={user.user_id}>
            <span>{user.email} - {user.user_role}</span>
            {user.user_id !== adminProfile.user_id && (
              <button onClick={() => handleDeleteUser(user.user_id)}>Delete User</button>
            )}
          </div>
        ))}
        <h2>All Events</h2>
        {events.map(event => (
          <div key={event.event_id}>
            <span>{event.title} - {event.start_time}</span>
            <button onClick={() => handleDeleteEvent(event.event_id)}>Delete Event</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;