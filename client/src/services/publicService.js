// src/services/publicService.js
import axios from 'axios';
import { config } from './config';

export const getAllPublicEvents = async () => {
  try {
    const response = await axios.get(`${config.serverUrl}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching public events:', error);
    throw error;
  }
};

export const getPublicEventById = async (eventId) => {
  const response = await axios.get(`${config.serverUrl}/event-details/${eventId}`);
  return response.data;
};


export const getAllPublicArtists = async () => {
  try {
    const response = await axios.get(`${config.serverUrl}/artists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching public artists:', error);
    throw error;
  }
};
