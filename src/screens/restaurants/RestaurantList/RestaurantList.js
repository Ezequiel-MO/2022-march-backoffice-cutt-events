import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import SearchBar from "../../../components/SearchBar";
import RestaurantListItem from "./RestaurantListItem";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast.js";

const RestaurantList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [price, setPrice] = useState(null);
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

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
    if (city && price) {
      getRestaurantList();
    }
  }, [city, price]);

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await baseAPI.delete(`v1/restaurants/${restaurantId}`);
      toast.success("Restaurant Deleted", toastOptions);
      setRestaurants(
        restaurants.filter((restaurant) => restaurant._id !== restaurantId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addRestaurantToProject = (restaurant) => {
    navigate(`/project/schedule/${restaurant._id}/event`, {
      state: {
        event: restaurant,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
      },
    });
  };

  const restaurantList = restaurants
    .slice(0, 15)
    .map((restaurant) => (
      <RestaurantListItem
        key={restaurant._id}
        restaurant={restaurant}
        handleDeleteRestaurant={handleDeleteRestaurant}
        addRestaurantToProject={addRestaurantToProject}
        canBeAddedToProject={location.state}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <h1 className="text-2xl">Restaurant List</h1>
        <SearchBar />
        <p className="flex flex-row items-center">
          <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
          <span className="ml-2">
            Swipe restaurants right to update / left to remove restaurant
          </span>
        </p>
      </div>

      <hr />
      <div className="flex flex-row">
        <form className="text-orange-50">
          {!currentProjectIsLive ? (
            <div className="hidden lg:block relative w-64">
              <label htmlFor="cities">Filter by city:</label>
              <select
                name="cities"
                id="cities"
                className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Barcelona">Barcelona</option>
                <option value="Valencia">Valencia</option>
                <option value="Madrid">Madrid</option>
              </select>
            </div>
          ) : null}
          <div className="hidden lg:block relative w-64">
            <label htmlFor="price">Filter by Price:</label>
            <select
              name="price"
              id="price"
              className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            >
              <option value={25}>Less than €25</option>
              <option value={40}>Less than €40</option>
              <option value={60}>Less than €60</option>
              <option value={900}>All prices</option>
            </select>
          </div>
        </form>
        <div className="flex-1 m-4 flex-col">{restaurantList}</div>
      </div>
    </>
  );
};

export default RestaurantList;
