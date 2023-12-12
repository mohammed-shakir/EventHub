import React from 'react';

const defaultEventImage = '/assets/default/event-background.png';

const EventPicture = ({ imageUrl }) => {
    const eventPicUrl = imageUrl || defaultEventImage;

    return (
        <img 
            src={eventPicUrl} 
            alt="Event" 
            style={{ maxWidth: '400px', maxHeight: '200px' }}
            onError={(e) => e.target.src = defaultEventImage}
        />
    );
};

export default EventPicture;