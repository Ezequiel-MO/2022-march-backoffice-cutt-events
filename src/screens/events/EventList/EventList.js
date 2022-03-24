import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";

const EventList = () => {
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
    <li key={event._id}>{event.name}</li>
  ));
  return (
    <>
      <ul>{eventList}</ul>

      <button onClick={handleGetEventList}>Get Event List</button>
      <button onClick={() => handleDeleteEvent("6239b84a280a9aac2e73fc95")}>
        Delete Event
      </button>
    </>
  );
};

export default EventList;
