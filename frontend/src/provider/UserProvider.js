import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../api_calls/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const profile = await getUserProfile();
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Error fetching user profile', error);
                }
            }
            setIsLoading(false);
        };

        fetchUserProfile();
    }, []);

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
