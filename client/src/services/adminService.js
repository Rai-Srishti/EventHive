import axios from 'axios';
import axiosInstance from './axiosInstance';

const API = "/admin";

export const fetchPendingEvents = async () => {
  try {
    const response = await axiosInstance.get(`${API}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending events", error);
    throw error;
  }
};

export const approveEvent = async (eventId) => {
  try {
    const response = await axiosInstance.put(`${API}/events/${eventId}`);
    return response.data.message;
  } catch (error) {
    throw error;
  }
};

export const fetchAllHosts = async () => {
  try {
    const response = await axiosInstance.get(`${API}/hosts`);
    return response.data; // list of AdminUserResponseDTO
  } catch (error) {
    console.error("Error fetching hosts:", error);
    throw error;
  }
};

// 2. Block a host (based on cancellation count > 5)
export const blockHost = async (hostId) => {
  try {
    const response = await axiosInstance.put(`${API}/hosts/block/${hostId}`);
    return response.data.message;
  } catch (error) {
    console.error(`Error blocking host with ID ${hostId}`, error);
    throw error;
  }
};

// 3. Unblock a host
export const unblockHost = async (hostId) => {
  try {
    const response = await axiosInstance.put(`${API}/hosts/unblock/${hostId}`);
    return response.data.message;
  } catch (error) {
    console.error(`Error unblocking host with ID ${hostId}`, error);
    throw error;
  }
};


export const fetchAllAttendees = async () => {
  const response = await axiosInstance.get(`${API}/attendee`);
  return response.data;
};

// Block attendee
export const blockAttendee = async (attendeeId) => {
  const response = await axiosInstance.put(`${API}/attendee/block/${attendeeId}`);
  return response.data.message;
};

// Unblock attendee
export const unblockAttendee = async (attendeeId) => {
  const response = await axiosInstance.put(`${API}/attendee/unblock/${attendeeId}`);
  return response.data.message;
};


export const fetchApprovedEvents = async () => {
  try {
    const response = await axiosInstance.get(`${API}/events/approved`);
    return response.data;
  } catch (error) {
    console.error("Error fetching approved events:", error);
    throw error;
  }
};

// Fetch all artists
export const fetchAllArtists = async () => {
  try {
    const response = await axiosInstance.get(`${API}/artists`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};


// fetchEventById service
export const fetchEventById = async (eventId) => {
  try {
    const response = await axiosInstance.get(`${API}/events/edit/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

// updateEditedEvent service
export const updateEditedEvent = async (eventId, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API}/events/edit/${eventId}`, updatedData); 
    return response.data.message;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// fetch admin profile
export const fetchAdminProfile = async () => {
  const response = await axiosInstance.get(`${API}/profile`);
  return response.data;
};


//update Admin Profile
export const updateAdminProfile = async (updatedData) => {
  const response = await axiosInstance.put(`${API}/profile/update`, updatedData);
  return response.data.message;
};
