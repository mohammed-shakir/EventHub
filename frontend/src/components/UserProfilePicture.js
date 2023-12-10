import React from 'react';

const defaultProfilePic = '/assets/default/pfp.png';

const UserProfilePicture = ({ imageUrl }) => {
    const profilePicUrl = imageUrl || defaultProfilePic;

    return (
        <img 
            src={profilePicUrl} 
            alt="Profile" 
            style={{ maxWidth: '200px', maxHeight: '200px' }} 
            onError={(e) => e.target.src = defaultProfilePic}
        />
    );
};

export default UserProfilePicture;
