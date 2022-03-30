import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";

const AddScheduleToProject = () => {
  const navigate = useNavigate();
  const currentProject = useSelector(selectCurrentProject);

  const renderSchedule = currentProject.schedule.map((day, index) => (
    <li key={day.date}>
      {day.date}
      <ul>
        <li
          onClick={() =>
            navigate(`/event-list`, {
              state: {
                timeOfEvent: "morningEvents",
                dayOfEvent: index,
              },
            })
          }
        >
          Add morning events to {day.date}
        </li>
        <li
          onClick={() =>
            navigate(`/restaurant-list`, {
              state: {
                timeOfEvent: "lunch",
                dayOfEvent: index,
              },
            })
          }
        >
          Add lunch venues ...
        </li>
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

  return <ul>{renderSchedule}</ul>;
};

export default AddScheduleToProject;
