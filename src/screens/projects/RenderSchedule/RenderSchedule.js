import React, { useState } from "react";
import { useSelector } from "react-redux";
import baseAPI from "../../../axios/axiosConfig";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";

const RenderSchedule = () => {
  const currentProject = useSelector(selectCurrentProject);
  const [project] = useState(currentProject);

  const handlePatchProject = async () => {
    console.log("SCHEDULE", project["schedule"]);
    console.log("HOTELS", project["hotels"]);
    try {
      const response = await baseAPI.patch(`/v1/projects/${project._id}`, {
        schedule: project["schedule"],
        hotels: project["hotels"],
      });
      console.log("super response ====> ", response);
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
              <td>{hotel.name}</td>
            </tr>
          ))}
          {project["schedule"]?.map((day) => (
            <tr key={day._id} className="border border-white-50">
              <td>{day.date}</td>
              <td>
                {day["morningEvents"].map((event) => (
                  <p key={event._id}>{event.name}</p>
                ))}
              </td>
              <td>
                {day["lunch"].map((event) => (
                  <p key={event._id}>{event.name}</p>
                ))}
              </td>
              <td>
                {day["afternoonEvents"].map((event) => (
                  <p key={event._id}>{event.name}</p>
                ))}
              </td>
              <td>
                {day["dinner"].map((event) => (
                  <p key={event._id}>{event.name}</p>
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
