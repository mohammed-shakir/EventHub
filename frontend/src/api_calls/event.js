import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/events';

export const addEvent = async (eventData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addEvent`, eventData);
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