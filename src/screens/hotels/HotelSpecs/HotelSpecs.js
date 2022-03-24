import React from "react";
import baseAPI from "../../../axios/axiosConfig";
import { hotelData } from "../../../dev-data/hotel-data";

const HotelSpecs = () => {
  const handleHotelCreate = async () => {
    try {
      await baseAPI.post("/v1/hotels", hotelData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleHotelCreate}>Create a new hotel</button>
    </>
  );
};

export default HotelSpecs;
