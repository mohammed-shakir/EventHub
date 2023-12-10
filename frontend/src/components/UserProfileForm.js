import React, { useRef, useContext } from 'react';
import { UserContext } from '../provider/UserProvider';
import { updateUserProfile, deleteUserProfile, logout, uploadProfilePicture } from '../api_calls/user';
import UserProfilePicture from './UserProfilePicture';

const UserProfileForm = () => {
    const { userProfile, setUserProfile } = useContext(UserContext);
    const fileInputRef = useRef(null);

    if (!userProfile) {
        return <div>Loading user profile...</div>;
    }

    const handleChange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUserProfile(userProfile);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await deleteUserProfile();
                logout();
            } catch (error) {
                console.error('Error deleting account', error);
            }
        }
    };

    const handleProfilePicUpload = async () => {
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            const file = fileInputRef.current.files[0];
            try {
                const response = await uploadProfilePicture(file);
                setUserProfile({ ...userProfile, profile_picture_url: response.filePath });
            } catch (error) {
                console.error('Error uploading profile picture', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <UserProfilePicture imageUrl={userProfile.profile_picture_url} />
            <p />
            <input type="email" name="email" value={userProfile.email} onChange={handleChange} required placeholder="Email" />
            <input type="text" name="first_name" value={userProfile.first_name} onChange={handleChange} required placeholder="First Name" />
            <input type="text" name="last_name" value={userProfile.last_name} onChange={handleChange} required placeholder="Last Name" />
            <textarea name="bio" value={userProfile.bio || ""} onChange={handleChange} placeholder="Bio" />
            <button type="submit">Update Profile</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
            <p />
            <input type="file" ref={fileInputRef} />
            <button type="button" onClick={handleProfilePicUpload}>Upload</button>
        </form>
    );
};

export default UserProfileForm;
