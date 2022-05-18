import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../../dev-data/toast";
import EventListItem from "./EventListItem";
import SearchBar from "../../../components/SearchBar";

const EventList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [price, setPrice] = useState(900);
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
        toast.error(error.response.data.message, toastOptions);
      }
    };
    if (city && price) {
      getEventList();
    }
  }, [city, price]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await baseAPI.delete(`v1/events/${eventId}`);
      toast("Event Deleted", toastOptions);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
  };

  const addEventToProject = (event) => {
    navigate(`/project/schedule/${event._id}/event`, {
      state: {
        event,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
      },
    });
  };

  const eventList = events
    .slice(0, 15)
    .map((event) => (
      <EventListItem
        key={event._id}
        event={event}
        handleDeleteEvent={handleDeleteEvent}
        addEventToProject={addEventToProject}
        canBeAddedToProject={location.state}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <h1 className="text-2xl">Event List</h1>
        <SearchBar />
        <p className="flex flex-row items-center">
          <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
          <span className="ml-2">
            Swipe restaurants right to update / left to remove restaurant
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-row">
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
              <option value={900}>All prices</option>
              <option value={25}>Less than €25</option>
              <option value={40}>Less than €40</option>
              <option value={60}>Less than €60</option>
            </select>
          </div>
        </form>
        <div className="flex-1 m-4 flex-col">{eventList}</div>
      </div>
    </>
  );
};

export default EventList;
