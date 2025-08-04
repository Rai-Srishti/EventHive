import axiosInstance from './axiosInstance';
import { config } from './config';

const baseUrl = `${config.serverUrl}/attendee`;

/**
 * Fetch all ticket phases for a specific event
 * @param {number} eventId
 * @returns {Promise<Array>}
 */
export const getPhasesByEventId = async (eventId) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/bookings/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching phases:', error);
    throw error;
  }
};