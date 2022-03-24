import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { updateHotel } from "../../../dev-data/hotel-data";

const HotelUpdate = () => {
  const [updatedHotel, setUpdatedHotel] = useState({});
  const [originalHotel, setOriginalHotel] = useState({});
  const handleHotelUpdate = async (hotelId) => {
    try {
      const updated = await baseAPI.patch(`v1/hotels/${hotelId}`, updateHotel);
      setUpdatedHotel(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSingleHotel = async (hotelId) => {
    try {
      const recovered = await baseAPI.get(`v1/hotels/${hotelId}`);
      setOriginalHotel(recovered);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {JSON.stringify(originalHotel)}
      <hr />
      {JSON.stringify(updatedHotel)}
      <button onClick={() => handleGetSingleHotel("6239dbe220b0ebd443e9ecbf")}>
        Recover a hotel
      </button>
      <button onClick={() => handleHotelUpdate("6239dbe220b0ebd443e9ecbf")}>
        Amend an existing hotel
      </button>
    </>
  );
};

export default HotelUpdate;
