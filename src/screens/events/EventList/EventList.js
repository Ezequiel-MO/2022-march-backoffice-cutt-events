import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [price, setPrice] = useState(100);

  useEffect(() => {
    const getEventList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/events?city=${city}&price[lte]=${price}`
        );
        setEvents(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEventList();
  }, [city, price]);

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
      <h1>Event List</h1>
      <form>
        <div>
          <label htmlFor="cities">Filter by city:</label>
          <select
            name="cities"
            id="cities"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="Barcelona">Barcelona</option>
            <option value="Valencia">Valencia</option>
            <option value="Madrid">Madrid</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Filter by Price:</label>
          <select
            name="price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value={25}>Less than €25</option>
            <option value={40}>Less than €40</option>
            <option value={60}>Less than €60</option>
            <option value={900}>All prices</option>
          </select>
        </div>
      </form>
      <ul>{eventList}</ul>
    </>
  );
};

export default EventList;
