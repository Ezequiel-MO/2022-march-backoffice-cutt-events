import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { updateRestaurant } from "../../../dev-data/restaurant-data";

const RestaurantUpdate = () => {
  const [updatedRestaurant, setUpdatedRestaurant] = useState({});
  const [originalRestaurant, setOriginalRestaurant] = useState({});

  const handleRestaurantUpdate = async (restaurantId) => {
    try {
      const updated = await baseAPI.patch(
        `v1/restaurants/${restaurantId}`,
        updateRestaurant
      );
      setUpdatedRestaurant(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSingleRestaurant = async (restaurantId) => {
    try {
      const recovered = await baseAPI.get(`v1/restaurants/${restaurantId}`);
      setOriginalRestaurant(recovered);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {JSON.stringify(originalRestaurant)}
      <hr />
      {JSON.stringify(updatedRestaurant)}
      <button
        onClick={() => handleGetSingleRestaurant("6231deb6e4be0c3b00bedf89")}
      >
        Recover a restaurant
      </button>
      <button
        onClick={() => handleRestaurantUpdate("6231deb6e4be0c3b00bedf89")}
      >
        Amend an existing restaurant
      </button>
    </>
  );
};

export default RestaurantUpdate;
