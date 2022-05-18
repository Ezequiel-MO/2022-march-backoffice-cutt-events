import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";
import TransferListItem from "./TransferListItem";
import SearchBar from "../../../components/SearchBar";

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

  const transferList = transfers
    .slice(0, 15)
    .map((transfer) => (
      <TransferListItem
        key={transfer._id}
        transfer={transfer}
        handleDeleteTransfer={handleDeleteTransfer}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <h1 className="text-2xl">Transfer List</h1>
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

        <div className="flex-1 m-4 flex-col">{transferList}</div>
      </div>
    </>
  );
};

export default TransferList;
