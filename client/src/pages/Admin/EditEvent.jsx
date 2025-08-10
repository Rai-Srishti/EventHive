import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchEventById,
  fetchAllArtists,
  updateEditedEvent,
} from "../../services/adminService";
import "../../assets/css/Admin/EditEvent.css";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchEventById(id);
        setEventData(data);
        if (data.artist?.artistId) {
          setSelectedArtistId(data.artist.artistId);
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error fetching event details.",
        });
      }
    };

    const loadArtists = async () => {
      try {
        const artistList = await fetchAllArtists();
        setArtists(artistList);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error loading artists.",
        });
      }
    };

    loadEvent();
    loadArtists();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...eventData,
      artist: { artistId: selectedArtistId },
    };

    try {
      const msg = await updateEditedEvent(id, updatedData);
      await Swal.fire({
        icon: "success",
        title: "Event Updated",
        text: msg,
        confirmButtonText: "OK",
      });
      navigate("/admin/events");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update event.",
      });
    }
  };

  if (!eventData) return <p>Loading...</p>;

  const readOnlyStyle = {
    backgroundColor: "#f4f3f3ff", // darker gray
    color: "#333",
    fontWeight: "500",
  };

  return (
    <div className="edit-event-container">
      <div className="edit-event-box">
        <h2 className="profile-title">Edit Event</h2>
        <form onSubmit={handleSubmit} className="edit-event-form">
          <div className="form-group">
            <label>Host:</label>
            <input
              type="text"
              value={`${eventData.host?.firstName || ""} ${eventData.host?.lastName || ""}`}
              readOnly
              style={readOnlyStyle}
            />
          </div>

          <div className="form-group">
            <label>Event Date:</label>
            <input
              type="text"
              value={new Date(eventData.eventDate).toLocaleString()}
              readOnly
              style={readOnlyStyle}
            />
          </div>

          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={eventData.city}
              readOnly
              style={readOnlyStyle}
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={eventData.address}
              readOnly
              style={readOnlyStyle}
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Artist:</label>
            <input
              type="text"
              value={
                artists.find((a) => a.artistId === selectedArtistId)?.name ||
                eventData.artist?.name ||
                ""
              }
              readOnly
              style={readOnlyStyle}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
