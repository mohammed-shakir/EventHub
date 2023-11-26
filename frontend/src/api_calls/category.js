import axios from 'axios';
import { getAuthHeader } from './auth';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/categories';

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get_categories`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add_category`, categoryData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update_category/${categoryId}`, categoryData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete_category/${categoryId}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};
