import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";
import {
  REMOVE_EVENT_FROM_SCHEDULE,
  REMOVE_HOTEL_FROM_PROJECT,
  selectCurrentProject,
} from "../../../redux/features/CurrentProjectSlice";

const RenderSchedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);
  const [project, setProject] = useState(currentProject);

  useEffect(() => {
    setProject(currentProject);
  }, [currentProject]);

  const handleDeleteHotel = (hotelId) => {
    dispatch(REMOVE_HOTEL_FROM_PROJECT(hotelId));
    toast.success("Hotel Removed", toastOptions);
  };

  const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
    console.log(dayOfEvent, timeOfEvent, eventId);
    dispatch(REMOVE_EVENT_FROM_SCHEDULE({ dayOfEvent, timeOfEvent, eventId }));
    toast.success("Event Removed", toastOptions);
  };

  const handlePatchProject = async () => {
    try {
      await baseAPI.patch(`/v1/projects/${project._id}`, {
        schedule: project["schedule"],
        hotels: project["hotels"],
      });
      toast.success("Project Completed, congratulations !!", toastOptions);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container w-3/4 flex flex-col">
      <table className="table-auto border-collapse border border-white-50 text-white-50">
        <thead>
          <tr className="border-b border-white-50 text-left">
            <th>Code</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Group Name</th>
            <th>Location</th>
            <th>Number of Pax</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white-50 text-left">
            <td>{project["code"]}</td>
            <td>{project["arrivalDay"]}</td>
            <td>{project["departureDay"]}</td>
            <td>{project["groupName"]}</td>
            <td>{project["groupLocation"]}</td>
            <td>{project["nrPax"]}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table-auto border-collapse border border-white-50 text-white-50">
        <thead>
          <tr className="border-b border-white-50 text-left">
            <th>Hotels/ Days</th>
            <th>Morning Events</th>
            <th>Lunch Options</th>
            <th>Afternoon Events</th>
            <th>Dinner Options</th>
          </tr>
        </thead>
        <tbody>
          {project["hotels"]?.map((hotel) => (
            <tr key={hotel._id}>
              <td className="flex flex-row items-center">
                {hotel.name}
                <span
                  className="ml-2 cursor-pointer"
                  onClick={() => handleDeleteHotel(hotel._id)}
                >
                  <Icon icon="lucide:delete" color="#ea5933" />
                </span>
              </td>
            </tr>
          ))}
          {project["schedule"]?.map((day, index) => (
            <tr key={day._id} className="border border-white-100">
              <td>{day.date}</td>
              <td>
                {day["morningEvents"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "morningEvents", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
              <td>
                {day["lunch"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "lunch", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
              <td>
                {day["afternoonEvents"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "afternoonEvents", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
              <td>
                {day["dinner"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "dinner", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="h-12 mt-4 inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={handlePatchProject}
      >
        Save Final Project
      </button>
    </div>
  );
};

export default RenderSchedule;
