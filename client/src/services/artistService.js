import axios from 'axios';
import { config } from './config';
import axiosInstance from './axiosInstance';

export const getAllArtists = async () => {
  try {
    const response = await axiosInstance.get(`${config.serverUrl}/host/artists`);
    return response.data; // Expected: array of artist names
  } catch (error) {
    console.error("Error fetching artist list:", error);
    throw error;
  }
};
