import React, { useState, useEffect } from 'react';
import { getProfilePictureUrl } from '../api_calls/user';

const defaultEventImage = '/assets/default/event-background.png';

const EventPicture = ({ imageUrl, eventId }) => {
    const [eventImageUrl, setEventImageUrl] = useState('');

    useEffect(() => {
        const fetchEventImage = async () => {
            try {
                if (imageUrl) {
                    const url = await getProfilePictureUrl(imageUrl); // Adjust the API call as needed
                    setEventImageUrl(url);
                }
            } catch (error) {
                console.error('Error fetching event image', error);
                setEventImageUrl(defaultEventImage);
            }
        };

        fetchEventImage();
    }, [imageUrl, eventId]);

    return (
        <img 
            src={eventImageUrl || defaultEventImage} 
            alt="Event" 
            onError={() => setEventImageUrl(defaultEventImage)}
            style={{ maxWidth: '200px', maxHeight: '200px' }} 
        />
    );
};

export default EventPicture;