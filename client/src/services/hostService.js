import axios from 'axios';
import { config } from './config';

export const getEventsByHostId = async (hostId) => {
  try {
    const response = await axios.get(`${config.serverUrl}/host/${hostId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events for host:', error);
    throw error;
  }
};

export const insertNewEvent = (formData, hostId) => {
  return axios.post(`http://localhost:8080/host/event?hostId=${hostId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};



