import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const RestaurantList = () => {
  const navigate = useNavigate();
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
    <li key={restaurant._id}>
      {restaurant.name}
      <button
        onClick={() =>
          navigate("/restaurant-update", {
            state: {
              restaurantId: restaurant._id,
              restaurantName: restaurant.name,
            },
          })
        }
      >
        Update a Restaurant
      </button>
      <button onClick={() => handleDeleteRestaurant(restaurant._id)}>
        Delete Restaurant
      </button>
    </li>
  ));

  return (
    <>
      <ul>{restaurantList}</ul>
      <button onClick={handleGetRestaurantList}>Get Restaurant List</button>
    </>
  );
};

export default RestaurantList;
