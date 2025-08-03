const BASE_URL = "http://localhost:8080/auth";

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

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
