import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const HotelList = () => {
  const navigate = useNavigate();
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
    <>
      <li key={hotel._id}>
        {hotel.name}
        <button
          onClick={() =>
            navigate("/hotel-update", {
              state: { hotelId: hotel._id, hotelName: hotel.name },
            })
          }
        >
          Update a Hotel
        </button>
        <button onClick={() => handleDeleteHotel(hotel._id)}>
          Delete Hotel
        </button>
      </li>
    </>
  ));
  return (
    <>
      <ul>{hotelList}</ul>

      <button onClick={handleGetHotelList}>Get Hotel List</button>
    </>
  );
};

export default HotelList;
