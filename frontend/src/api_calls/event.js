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


export const getEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
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