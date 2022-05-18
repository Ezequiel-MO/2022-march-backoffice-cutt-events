import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";
import HotelListItem from "./HotelListItem";
import SearchBar from "../../../components/SearchBar";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [numberStars, setNumberStars] = useState(3);
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      setCity(currentProject.groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getHotelList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/hotels?city=${city}&numberStars=${numberStars}`
        );
        console.log("hey", response.data.data.data);
        setHotels(response.data.data.data);
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    };
    getHotelList();
  }, [city, numberStars]);

  const handleDeleteHotel = async (hotelId) => {
    try {
      await baseAPI.delete(`v1/hotels/${hotelId}`);
      toast.success("Hotel Deleted", toastOptions);
      setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
  };

  const hotelList = hotels
    .slice(0, 15)
    .map((hotel) => (
      <HotelListItem
        key={hotel._id}
        hotel={hotel}
        handleDeleteHotel={handleDeleteHotel}
        canBeAddedToProject={currentProjectIsLive}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <h1 className="text-2xl">Hotel List</h1>
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
            <div className="hidden lg:block relative w-64">
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
            <label htmlFor="nrStars">Filter by Nr of Stars:</label>
            <select
              name="nrStars"
              id="nrStars"
              className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setNumberStars(e.target.value)}
            >
              <option value={3}>3-star</option>
              <option value={4}>4-star</option>
              <option value={5}>5-star</option>
            </select>
          </div>
        </form>
        <div className="flex-1 m-4 flex-col">{hotelList}</div>
      </div>
    </>
  );
};

export default HotelList;
