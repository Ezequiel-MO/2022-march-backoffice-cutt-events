import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const RestaurantList = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [price, setPrice] = useState(100);

  useEffect(() => {
    const getRestaurantList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/restaurants?city=${city}&price[lte]=${price}`
        );
        setRestaurants(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurantList();
  }, [city, price]);

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
      <h1>Restaurant List</h1>
      <form>
        <div>
          <label htmlFor="cities">Filter by city:</label>
          <select
            name="cities"
            id="cities"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="Barcelona">Barcelona</option>
            <option value="Valencia">Valencia</option>
            <option value="Madrid">Madrid</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Filter by Price:</label>
          <select
            name="price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value={25}>Less than €25</option>
            <option value={40}>Less than €40</option>
            <option value={60}>Less than €60</option>
            <option value={900}>All prices</option>
          </select>
        </div>
      </form>
      <ul>{restaurantList}</ul>
    </>
  );
};

export default RestaurantList;
