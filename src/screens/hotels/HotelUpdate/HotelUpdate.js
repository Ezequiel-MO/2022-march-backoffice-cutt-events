import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { updateHotel } from "../../../dev-data/hotel-data";
import { useLocation } from "react-router-dom";

const HotelUpdate = () => {
  const location = useLocation();
  const [updatedHotel, setUpdatedHotel] = useState({});
  const [originalHotel, setOriginalHotel] = useState({});

  const handleHotelUpdate = async () => {
    try {
      const updated = await baseAPI.patch(
        `v1/hotels/${location.state.hotelId}`,
        updateHotel
      );
      setUpdatedHotel(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSingleHotel = async () => {
    try {
      const recovered = await baseAPI.get(
        `v1/hotels/${location.state.hotelId}`
      );
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
      <button onClick={handleGetSingleHotel}>
        {`Recover hotel - ${location.state.hotelName}`}
      </button>
      <button onClick={handleHotelUpdate}>
        {`Amend hotel - ${location.state.hotelName}`}
      </button>
    </>
  );
};

export default HotelUpdate;
