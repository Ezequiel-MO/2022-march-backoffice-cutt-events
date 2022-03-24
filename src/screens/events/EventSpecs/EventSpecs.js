import React from "react";
import baseAPI from "../../../axios/axiosConfig";
import { eventData } from "../../../dev-data/event-data";

const EventSpecs = () => {
  const handleEventCreate = async () => {
    try {
      await baseAPI.post("/v1/events", eventData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleEventCreate}>Create a new event</button>
    </>
  );
};

export default EventSpecs;
