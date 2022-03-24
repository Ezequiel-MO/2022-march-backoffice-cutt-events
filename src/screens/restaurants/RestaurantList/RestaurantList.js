import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const handleGetRestaurantList = async () => {
    try {
      const response = await baseAPI.get("v1/restaurants");
      setRestaurants(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await baseAPI.delete(`v1/restaurants/${restaurantId}`);
      alert("Restaurant Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const restaurantList = restaurants.map((restaurant) => (
    <li key={restaurant._id}>{restaurant.name}</li>
  ));
  return (
    <>
      <ul>{restaurantList}</ul>

      <button onClick={handleGetRestaurantList}>Get Restaurant List</button>
      <button
        onClick={() => handleDeleteRestaurant("6239c8de280a9aac2e73fcb4")}
      >
        Delete Restaurant
      </button>
    </>
  );
};

export default RestaurantList;
