import React from "react";
import baseAPI from "../../../axios/axiosConfig";
import { restaurantData } from "../../../dev-data/restaurant-data";

const RestaurantSpecs = () => {
  const handleRestaurantCreate = async () => {
    try {
      await baseAPI.post("/v1/restaurants", restaurantData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleRestaurantCreate}>Create a new restaurant</button>
    </>
  );
};

export default RestaurantSpecs;
