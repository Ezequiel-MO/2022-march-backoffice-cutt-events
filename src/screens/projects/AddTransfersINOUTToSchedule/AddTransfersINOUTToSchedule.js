import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ADD_EVENT_TO_SCHEDULE,
  selectCurrentProject,
} from "../../../redux/features/CurrentProjectSlice";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";

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
    toast.success("Transfer added", toastOptions);
    navigate("/project/schedule");
  };

  const transferList = transfers.map((transfer) => (
    <tr key={transfer._id}>
      <td>{transfer.company}</td>
      <td>{transfer.vehicleType}</td>
      <td>{transfer.vehicleCapacity}</td>
      <td
        onClick={() => handleAddTransfer(transfer)}
        className="cursor-pointer"
      >
        {location.state.timeOfEvent === "transfer_in" ? (
          <p>Add Transfer In</p>
        ) : (
          <p>Add Transfer Out</p>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Transfer In/Out</h1>
      <form>
        {!currentProjectIsLive ? (
          <div className="block relative w-64">
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
        <div className="block relative w-64">
          <label htmlFor="vehicleCapacity">Filter by Vehicle Size:</label>
          <select
            name="vehicleCapacity"
            id="vehicleCapacity"
            className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setVehicleCapacity(parseInt(e.target.value))}
          >
            <option value="">Choose type of Vehicle</option>
            <option value={3}>3-seat Mercedes</option>
            <option value={20}>Mini Bus</option>
            <option value={30}>30-seater Bus</option>
            <option value={50}>50-seater Bus</option>
            <option value={70}>70-seater Bus</option>
          </select>
        </div>
      </form>
      <table className="table-auto col-span-3">
        <thead className="bg-gray-50 border-b text-left">
          <tr>
            <th>Company</th>
            <th>Vehicle Type</th>
            <th>Vehicle Capacity</th>
            <th>Add To Schedule</th>
          </tr>
        </thead>
        <tbody className="text-white-50">{transferList}</tbody>
      </table>
    </>
  );
};

export default AddTransfersINOUTToSchedule;
