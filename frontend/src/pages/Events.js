import React from 'react';
import Navbar from '../components/Navbar.js';
import AddEventForm from '../components/AddEventForm.js';
import EventList from '../components/EventList.js';

const Events = () => {
    return (
        <div>
            <Navbar />
            <h1>Events</h1>
            <AddEventForm />
            <EventList />
        </div>
    );
};

export default Events;