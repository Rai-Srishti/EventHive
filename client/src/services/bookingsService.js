import axiosInstance from './axiosInstance';
import { config } from './config';

const baseUrl = `${config.serverUrl}/attendee`;

export const getPhasesByEventId = async (eventId) => {
  const res = await axiosInstance.get(`${baseUrl}/bookings/${eventId}`);
  return res.data;
};

export const purchaseTicket = async (phaseId, quantity) => {
  const res = await axiosInstance.post(`${baseUrl}/purchase-ticket`, null, {
    params: { phaseId, quantity },
  });
  return res.data;
};
