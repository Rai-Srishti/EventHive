import axiosInstance from './axiosInstance';
import { config } from './config';

const baseUrl = `${config.serverUrl}/attendee`;

export const getAllEvents = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/event-details/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw error;
  }
};

export const getEventPhases = async (eventId) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/bookings/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event phases:', error);
    throw error;
  }
};

export const purchaseTicket = async (phaseId, quantity) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/purchase-ticket`, null, {
      params: { phaseId, quantity }
    });
    return response.data;
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    throw error;
  }
};

export const cancelTicket = async (ticketId) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/cancel-ticket/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling ticket:', error);
    throw error;
  }
};

export const getMyBookings = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/my-bookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my bookings:', error);
    throw error;
  }
};

export const getWalletBalance = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/wallet`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw error;
  }
};

export const getAllArtists = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/artists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};