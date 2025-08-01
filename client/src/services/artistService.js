import axios from 'axios';
import { config } from './config';

export const getAllArtists = async () => {
  try {
    const response = await axios.get(`${config.serverUrl}/host/artists`);
    return response.data; // Expected: array of artist names
  } catch (error) {
    console.error("Error fetching artist list:", error);
    throw error;
  }
};
