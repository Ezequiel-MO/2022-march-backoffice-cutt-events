import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import baseAPI from "../../../axios/axiosConfig";

const AddScheduleToProject = () => {
  const navigate = useNavigate();
  const currentProject = useSelector(selectCurrentProject);

  const handlePatchProject = async () => {
    try {
      const response = await baseAPI.patch(
        `/v1/projects/${currentProject._id}`,
        {
          schedule: currentProject.schedule,
          hotels: currentProject.hotels,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSchedule = currentProject.schedule.map((day, index) => (
    <li key={day.date}>
      {day.date}
      <ul>
        <li
          onClick={() =>
            navigate(`/event/list`, {
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
            navigate(`/restaurant/list`, {
              state: {
                timeOfEvent: "lunch",
                dayOfEvent: index,
              },
            })
          }
        >
          Add lunch venues ...
        </li>
        <li
          onClick={() =>
            navigate(`/event/list`, {
              state: {
                timeOfEvent: "afternoonEvents",
                dayOfEvent: index,
              },
            })
          }
        >
          Add any afternoon events
        </li>
        <li
          onClick={() =>
            navigate(`/restaurant/list`, {
              state: {
                timeOfEvent: "dinner",
                dayOfEvent: index,
              },
            })
          }
        >
          Add dinner venues ...
        </li>
        {day.date === "Arrival Day" ? (
          <li
            onClick={() =>
              navigate(`/project/schedule/transfers_in_out`, {
                state: {
                  timeOfEvent: "transfer_in",
                  dayOfEvent: index,
                },
              })
            }
          >
            Add transfer in
          </li>
        ) : day.date === "Departure Day" ? (
          <li
            onClick={() =>
              navigate(`/project/schedule/transfers_in_out`, {
                state: {
                  timeOfEvent: "transfer_out",
                  dayOfEvent: index,
                },
              })
            }
          >
            Add transfer out
          </li>
        ) : null}
      </ul>
    </li>
  ));

  return (
    <>
      <ul>{renderSchedule}</ul>
      <button onClick={handlePatchProject}>
        I'm ready to save my final project
      </button>
    </>
  );
};

export default AddScheduleToProject;
