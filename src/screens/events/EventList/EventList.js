import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";

const EventList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [price, setPrice] = useState(null);
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

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
    if (city && price) {
      getEventList();
    }
  }, [city, price]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await baseAPI.delete(`v1/events/${eventId}`);
      alert("Event Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const AddEventToProject = (event) => {
    navigate(`/project/schedule/${event._id}/event`, {
      state: {
        event,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
      },
    });
  };

  const eventList = events.slice(0, 15).map((event) => (
    <tr key={event._id}>
      <td>{event.name}</td>
      <td>{event.city}</td>
      <td>{event.price}</td>
      <td
        className="hover:cursor-pointer"
        onClick={() => navigate(`/event/${event._id}/update`)}
      >
        <Icon
          icon="arcticons:huawei-system-update"
          color="#ea5933"
          width="30"
        />
      </td>
      <td
        className="hover:cursor-pointer"
        onClick={() => handleDeleteEvent(event._id)}
      >
        <Icon icon="ei:trash" color="#ea5933" width="30" />
      </td>
      {location.state ? (
        <td
          className="hover:cursor-pointer"
          onClick={() => AddEventToProject(event)}
        >
          <Icon icon="ic:twotone-add-circle" color="#ea5933" width="25" />
        </td>
      ) : null}
    </tr>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Event List</h1>
      <hr />
      <div className="container grid grid-cols-4 gap-4 my-4">
        <form className="text-orange-50">
          {!currentProjectIsLive ? (
            <div className="block relative w-64">
              <label htmlFor="cities">Filter by city:</label>
              <select
                name="cities"
                id="cities"
                className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Barcelona">Barcelona</option>
                <option value="Valencia">Valencia</option>
                <option value="Madrid">Madrid</option>
              </select>
            </div>
          ) : null}
          <div className="block relative w-64">
            <label htmlFor="price">Filter by Price:</label>
            <select
              name="price"
              id="price"
              className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            >
              <option value={25}>Less than €25</option>
              <option value={40}>Less than €40</option>
              <option value={60}>Less than €60</option>
              <option value={900}>All prices</option>
            </select>
          </div>
        </form>
        <table className="table-auto col-span-3">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th>Event Title</th>
              <th>City</th>
              <th>Tour Price</th>
              <th>Update</th>
              <th>Delete</th>
              {location.state && <th>Add To Project</th>}
            </tr>
          </thead>
          <tbody className="text-white-50">{eventList}</tbody>
        </table>
      </div>
    </>
  );
};

export default EventList;
