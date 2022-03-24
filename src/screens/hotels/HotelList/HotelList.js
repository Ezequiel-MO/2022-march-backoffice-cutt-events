import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const handleGetHotelList = async () => {
    try {
      const response = await baseAPI.get("/v1/hotels");
      setHotels(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      await baseAPI.delete(`v1/hotels/${hotelId}`);
      alert("Hotel Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const hotelList = hotels.map((hotel) => (
    <li key={hotel._id}>{hotel.name}</li>
  ));
  return (
    <>
      <ul>{hotelList}</ul>

      <button onClick={handleGetHotelList}>Get Hotel List</button>
      <button onClick={() => handleDeleteHotel("623b49aacc1f35fe5517fde9")}>
        Delete Hotel
      </button>
    </>
  );
};

export default HotelList;
