import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  computeTotalDays,
  whichDay,
} from "../../../helperFunctions/helperFunctions";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";

const AddScheduleToProject = () => {
  const navigate = useNavigate();
  const { arrivalDay, departureDay } = useSelector(selectCurrentProject);
  const diffDays = computeTotalDays(arrivalDay, departureDay);
  const [days, setDays] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= diffDays; i++) {
      setDays((days) => [
        ...days,
        {
          date: whichDay(i, diffDays),
          morningEvents: [],
          lunch: [],
          afternoonEvents: [],
          dinner: [],
          transfer_in: [],
          transfer_out: [],
        },
      ]);
    }
    return () => {
      setDays([]);
    };
  }, []);

  const renderSchedule = days?.map((day) => (
    <li key={day.date}>
      {day.date}
      <ul>
        <li
          onClick={() =>
            navigate(`/event-list`, {
              state: { timeOfEvent: day.morningEvents, dayOfEvent: day.date },
            })
          }
        >
          Add morning events to {day.date}
        </li>
        <li>Add lunch venues ...</li>
        <li>Add any afternoon events</li>
        <li>Add dinner venues ...</li>
        {day.date === "Arrival Day" ? (
          <li>Add transfer in </li>
        ) : day.date === "Departure Day" ? (
          <li>Add transfer out</li>
        ) : null}
      </ul>
    </li>
  ));

  //render a list of all days contained between currentProject start and end date
  return <ul>{renderSchedule}</ul>;
};

export default AddScheduleToProject;
