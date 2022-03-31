import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ADD_EVENT_TO_SCHEDULE,
  selectCurrentProject,
} from "../../../redux/features/CurrentProjectSlice";
import baseAPI from "../../../axios/axiosConfig";

const AddTransfersINOUTToSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [city, setCity] = useState("Barcelona");
  const [vehicleCapacity, setVehicleCapacity] = useState(20);
  const [transfers, setTransfers] = useState([]);

  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getTransferList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/transfers?city=${city}&vehicleCapacity=${vehicleCapacity}`
        );
        setTransfers(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTransferList();
  }, [city, vehicleCapacity]);

  const handleAddTransfer = (transfer) => {
    dispatch(
      ADD_EVENT_TO_SCHEDULE({
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
        event: transfer,
      })
    );
    alert("Transfer added");
    navigate("/project/schedule");
  };

  const transferList = transfers.map((transfer) => (
    <li key={transfer._id}>
      {transfer.company} <span>{transfer.vehicleType}</span>
      <span>{transfer.transfer_in_out}</span>
      <button onClick={() => handleAddTransfer(transfer)}>
        {location.state.timeOfEvent === "transfer_in" ? (
          <p>Add Transfer In to the schedule</p>
        ) : (
          <p>Add Transfer Out to the schedule</p>
        )}
      </button>
    </li>
  ));

  return (
    <>
      <form>
        {!currentProjectIsLive ? (
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
        ) : null}
        <div>
          <label htmlFor="vehicleCapacity">Filter by Vehicle Size:</label>
          <select
            name="vehicleCapacity"
            id="vehicleCapacity"
            onChange={(e) => setVehicleCapacity(parseInt(e.target.value))}
          >
            <option value={20}>Mini Bus</option>
            <option value={30}>30-seater Bus</option>
            <option value={50}>50-seater Bus</option>
            <option value={70}>70-seater Bus</option>
          </select>
        </div>
      </form>
      <ul>{transferList}</ul>
    </>
  );
};

export default AddTransfersINOUTToSchedule;
