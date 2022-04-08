import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";

const TransferList = () => {
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
    if (city && vehicleCapacity) {
      getTransferList();
    }
  }, [city, vehicleCapacity]);

  const handleDeleteTransfer = async (transferId) => {
    try {
      await baseAPI.delete(`v1/transfers/${transferId}`);
      toast.success("Transfer deleted", toastOptions);
      setTransfers(transfers.filter((transfer) => transfer._id !== transferId));
    } catch (error) {
      console.log(error);
    }
  };

  const transferList = transfers.map((transfer) => (
    <tr key={transfer._id}>
      <td>{transfer.company}</td>
      <td>{transfer.city}</td>
      <td>{transfer.vehicleType}</td>
      <td>{transfer.vehicleCapacity}</td>
      <>
        <td
          className="hover:cursor-pointer"
          onClick={() => navigate(`/transfer/${transfer._id}/update`)}
        >
          <Icon
            icon="arcticons:huawei-system-update"
            color="#ea5933"
            width="30"
          />
        </td>
        <td
          className="hover:cursor-pointer"
          onClick={() => handleDeleteTransfer(transfer._id)}
        >
          <Icon icon="ei:trash" color="#ea5933" width="30" />
        </td>
      </>
    </tr>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Transfer List</h1>
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
              <th>City</th>
              <th>Vehicle Type</th>
              <th>Vehicle Capacity</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-white-50">{transferList}</tbody>
        </table>
      </div>
    </>
  );
};

export default TransferList;
