import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";
import HotelListItem from "./HotelListItem";
import CityFilter from "../../../UI/filters/CityFilter";
import NrStarsFilter from "../../../UI/filters/NrStarsFilter";
import NrHotelRoomsFilter from "../../../UI/filters/NrHotelRoomsFilter";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const [numberStars, setNumberStars] = useState(0);
  const [numberRooms, setNumberRooms] = useState(600);
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
        if (city && numberStars && numberRooms) {
          const response = await baseAPI.get(
            `/v1/hotels?city=${city}&numberStars=${numberStars}&numberRooms[lt]=${numberRooms}`
          );

          setHotels(response.data.data.data);
        } else {
          const response = await baseAPI.get(`/v1/hotels`);
          setHotels(response.data.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    };

    getHotelList();
  }, [city, numberStars, numberRooms]);

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
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Hotel List</h1>
          <div className="flex flex-row">
            <div className="flex-1">
              {currentProjectIsLive ? null : <CityFilter setCity={setCity} />}
              <NrStarsFilter setNumberStars={setNumberStars} />
              <NrHotelRoomsFilter setNumberRooms={setNumberRooms} />
            </div>
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe restaurants right to update / left to remove restaurant
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />

      <div className="flex-1 m-4 flex-col">{hotelList}</div>
    </>
  );
};

export default HotelList;
