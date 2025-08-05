import axios from 'axios';
import { config } from './config';
import axiosInstance from './axiosInstance';

export const getEventsByHostId = async (hostId) => {
  try {
    const response = await axiosInstance.get(`${config.serverUrl}/host/${hostId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events for host:', error);
    throw error;
  }
};

export const insertNewEvent = (formData, hostId) => {
  return axiosInstance.post(`http://localhost:8080/host/event?hostId=${hostId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const updateEventByHost = async (eventId, dto) => {
  try {
    const response = await axiosInstance.put(`${config.serverUrl}/host/event/${eventId}`, dto);
    return response.data;
  } catch (err) {
    console.error('Error updating event:', err);
    throw err;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const response = await axiosInstance.get(`${config.serverUrl}/host/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  const response = await axiosInstance.delete(`${config.serverUrl}/host/event/${eventId}`);
  return response.data;
};



export async function validateTicket(ticketId) {
  try {
    const response = await axiosInstance.post('/host/validate-ticket', {
      id: ticketId,
      method: 'QR_SCAN',
    });

    return response.data; // e.g., { status: 'VALIDATED' }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    }
    throw 'Failed to validate ticket';
  }
}