
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/auth'; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data; // Expected to return ApiResponse with message
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};
