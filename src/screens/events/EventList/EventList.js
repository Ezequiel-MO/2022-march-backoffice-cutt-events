import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const handleGetEventList = async () => {
    try {
      const response = await baseAPI.get("v1/events");
      setEvents(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await baseAPI.delete(`v1/events/${eventId}`);
      alert("Event Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const eventList = events.map((event) => (
    <li key={event._id}>
      {event.name}
      <button
        onClick={() =>
          navigate("/event-update", {
            state: {
              eventId: event._id,
              eventName: event.name,
            },
          })
        }
      >
        Update an Event
      </button>
      <button onClick={() => handleDeleteEvent(event._id)}>Delete Event</button>
    </li>
  ));

  return (
    <>
      <ul>{eventList}</ul>
      <button onClick={handleGetEventList}>Get Event List</button>
    </>
  );
};

export default EventList;
