import React, { useState, useEffect, useRef } from 'react';
import { getUserProfile, updateUserProfile, deleteUserProfile, logout, uploadProfilePicture } from '../api_calls/user';

const UserProfileForm = () => {
    const [profile, setProfile] = useState({
        email: '',
        first_name: '',
        last_name: '',
        profile_picture_url: '',
        bio: '',
    });

    const fileInputRef = useRef(null);
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserProfile();
                setProfile(prevState => ({
                    ...prevState,
                    email: userProfile.email || '',
                    first_name: userProfile.first_name || '',
                    last_name: userProfile.last_name || '',
                    profile_picture_url: userProfile.profile_picture_url || '',
                    bio: userProfile.bio || '',
                }));
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };
    
        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUserProfile(profile);
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
                setProfile({ ...profile, profile_picture_url: response.url });
            } catch (error) {
                console.error('Error uploading profile picture', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                placeholder="Email"
            />
            <input
                type="text"
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
                required
                placeholder="First Name"
            />
            <input
                type="text"
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
                required
                placeholder="Last Name"
            />
            {/*<input
                type="text"
                name="profile_picture_url"
                value={profile.profile_picture_url}
                onChange={handleChange}
                placeholder="Profile Picture URL"
            />*/}
            <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Bio"
            />
            <button type="submit">Update Profile</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
            <input type="file" ref={fileInputRef} />
            <button type="button" onClick={handleProfilePicUpload}>Upload</button>
        </form>
    );
};

export default UserProfileForm;