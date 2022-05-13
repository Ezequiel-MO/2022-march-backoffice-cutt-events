import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";
import SearchBar from "../../../components/SearchBar";

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

  const AddRestaurantToProject = (restaurant) => {
    navigate(`/project/schedule/${restaurant._id}/event`, {
      state: {
        event: restaurant,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
      },
    });
  };

  const restaurantList = restaurants.slice(0, 15).map((restaurant) => (
    <tr key={restaurant._id}>
      <td>{restaurant.name}</td>
      <td>{restaurant.city}</td>
      <td>{restaurant.price}</td>
      <td
        className="hover:cursor-pointer"
        onClick={() =>
          navigate(`/restaurant/specs`, {
            state: { restaurant },
          })
        }
      >
        <Icon
          icon="arcticons:huawei-system-update"
          color="#ea5933"
          width="30"
        />
      </td>
      <td
        className="hover:cursor-pointer"
        onClick={() => handleDeleteRestaurant(restaurant._id)}
      >
        <Icon icon="ei:trash" color="#ea5933" width="30" />
      </td>
      {location.state ? (
        <td
          className="hover:cursor-pointer"
          onClick={() => AddRestaurantToProject(restaurant)}
        >
          <Icon icon="ic:twotone-add-circle" color="#ea5933" width="25" />
        </td>
      ) : null}
    </tr>
  ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <h1 className="text-2xl">Restaurant List</h1>
        <SearchBar />
      </div>

      <hr />
      <div className="container grid grid-cols-4 gap-4 my-4">
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
        <table className="table-auto col-span-3">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th>Rest Name</th>
              <th>City</th>
              <th>Menus from</th>
              <th>Update</th>
              <th>Delete</th>
              {location.state && <th>Add To Project</th>}
            </tr>
          </thead>
          <tbody className="text-white-50">{restaurantList}</tbody>
        </table>
      </div>
    </>
  );
};

export default RestaurantList;
