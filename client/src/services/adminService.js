import axios from 'axios';
import { config } from './config';

const API = "http://localhost:8080/admin";

export const fetchPendingEvents = async () => {
  try {
    const response = await axios.get(`${API}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending events", error);
    throw error;
  }
};

export const approveEvent = async (eventId) => {
  try {
    const response = await axios.put(`${API}/events/${eventId}`);
    return response.data.message;
  } catch (error) {
    throw error;
  }
};