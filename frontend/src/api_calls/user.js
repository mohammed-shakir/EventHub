import axios from 'axios';
import { getAuthHeader } from './auth';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/users';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePicture = async (fileData) => {
  const formData = new FormData();
  formData.append('profilePic', fileData);

  try {
    const response = await axios.post(`${BASE_URL}/profile/picture`, formData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginGoogle = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/google`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, profileData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserProfile = async () => {
  try {
      const response = await axios.delete(`${BASE_URL}/profile`, { headers: getAuthHeader() });
      console.log(response.data);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const adminDeleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin_delete_user/${userId}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_all_users`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const logout = () => {
  console.log('Logging out');
  localStorage.removeItem('token');
  window.location.href = '/login';
};
