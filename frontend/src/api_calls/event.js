import axios from 'axios';
import { getAuthHeader } from './auth';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/events';

export const addEvent = async (eventData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addEvent`, eventData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadEventPicture = async (fileData) => {
    const formData = new FormData();
    formData.append('eventPic', fileData);

    try {
        const response = await axios.post(`${BASE_URL}/uploadEventPicture`, formData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${eventId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkUserRegistrationForEvent = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/checkRegistration/${eventId}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerForEvent = async (eventId) => {
    try {
        const response = await axios.post(`${BASE_URL}/register/${eventId}`, {}, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${eventId}`, eventData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${eventId}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/admin_delete_event/${eventId}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
