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

export const updateEventByHost = async (eventId, dto) => {
  try {
    const response = await axios.put(`${config.serverUrl}/host/event/${eventId}`, dto);
    return response.data;
  } catch (err) {
    console.error('Error updating event:', err);
    throw err;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const response = await axios.get(`${config.serverUrl}/host/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  const response = await axios.delete(`${config.serverUrl}/host/event/${eventId}`);
  return response.data;
};



