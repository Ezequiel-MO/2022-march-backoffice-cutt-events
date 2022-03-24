import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { updateEvent } from "../../../dev-data/event-data";

const EventUpdate = () => {
  const [updatedEvent, setUpdatedEvent] = useState({});
  const [originalEvent, setOriginalEvent] = useState({});

  const handleEventUpdate = async (eventId) => {
    try {
      const updated = await baseAPI.patch(`v1/events/${eventId}`, updateEvent);
      setUpdatedEvent(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSingleEvent = async (eventId) => {
    try {
      const recovered = await baseAPI.get(`v1/events/${eventId}`);
      setOriginalEvent(recovered);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {JSON.stringify(originalEvent)}
      <hr />
      {JSON.stringify(updatedEvent)}
      <button onClick={() => handleGetSingleEvent("623c603f5f2681300d9312db")}>
        Recover an event
      </button>
      <button onClick={() => handleEventUpdate("623c603f5f2681300d9312db")}>
        Amend an existingn event
      </button>
    </>
  );
};

export default EventUpdate;
