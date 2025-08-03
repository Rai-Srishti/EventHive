// import axios from "axios";
// import axiosInstance from "./axiosInstance";

// const API_BASE_URL = '/auth'; 

// export const loginUser = async (email, password) => {
//   try {
//     const response = await axiosInstance.post(`${API_BASE_URL}/login`, { email, password });
//     return response.data;  // Will return token, role, etc.
//   } catch (error) {
//     throw error.response?.data?.message || "Login failed";
//   }
// };

// export const registerUser = async (userData) => {
//   try {
//     const response = await axiosInstance.post(`${API_BASE_URL}/signup`, userData);
//     return response.data; // Expected to return ApiResponse with message
//   } catch (error) {
//     throw error.response?.data?.message || 'Registration failed';
//   }
// };



import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL1 = '/auth'; 

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL1}/login`, { email, password });
    return response.data;  // Will return token, role, etc.
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};


const API_BASE_URL = 'http://localhost:8080/auth';
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data; // Expected to return ApiResponse with message
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};
