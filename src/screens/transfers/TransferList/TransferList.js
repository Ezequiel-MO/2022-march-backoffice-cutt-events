import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { useSelector } from "react-redux";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";

const TransferList = ({ addEventToSchedule, handleAddTransfer }) => {
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [vehicleCapacity, setVehicleCapacity] = useState(20);
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

  const handleDeleteTransfer = async (transferId) => {
    try {
      await baseAPI.delete(`v1/transfers/${transferId}`);
      alert("Transfer Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const transferList = transfers.map((transfer) => (
    <li key={transfer._id}>
      {transfer.company} <span>{transfer.vehicleType}</span>
      <span>{transfer.vehicleCapacity}</span>
      {addEventToSchedule ? (
        <>
          <button onClick={() => handleAddTransfer(transfer)}>
            Add Transfer to Event
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate(`/transfer-update/${transfer._id}`)}>
            Update a Transfer
          </button>
          <button onClick={() => handleDeleteTransfer(transfer._id)}>
            Delete Transfer
          </button>
        </>
      )}
    </li>
  ));

  return (
    <>
      {addEventToSchedule ? (
        <h3>Add transfer to the Event ? </h3>
      ) : (
        <h1>Transfer List</h1>
      )}

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

export default TransferList;
