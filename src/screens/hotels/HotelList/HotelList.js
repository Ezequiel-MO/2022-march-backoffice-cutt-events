import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";

const HotelList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [numberStars, setNumberStars] = useState(3);
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      setCity(currentProject.groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getHotelList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/hotels?city=${city}&numberStars=${numberStars}`
        );
        setHotels(response.data.data.data);
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    };
    getHotelList();
  }, [city, numberStars]);

  const handleDeleteHotel = async (hotelId) => {
    try {
      await baseAPI.delete(`v1/hotels/${hotelId}`);
      toast.success("Hotel Deleted", toastOptions);
      setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
  };

  const hotelList = hotels.slice(0, 15).map((hotel) => (
    <tr key={hotel._id}>
      <td>{hotel.name}</td>
      <td>{hotel.city}</td>
      <td>{hotel.numberRooms}</td>
      <td>{hotel.meetingRooms}</td>
      <td>{hotel.restaurants}</td>
      <td
        className="hover:cursor-pointer"
        onClick={() =>
          navigate(`/hotel/specs`, {
            state: { hotel },
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
        onClick={() => handleDeleteHotel(hotel._id)}
      >
        <Icon icon="ei:trash" color="#ea5933" width="30" />
      </td>
      {currentProjectIsLive ? (
        <td
          className="hover:cursor-pointer"
          onClick={() =>
            navigate(`/hotel/${hotel._id}/add`, {
              state: { hotelName: hotel.name },
            })
          }
        >
          <Icon icon="ic:twotone-add-circle" color="#ea5933" width="25" />
        </td>
      ) : null}
    </tr>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Hotel List</h1>
      <hr />
      <div className="container grid grid-cols-4 gap-4 my-4">
        <form className="text-orange-50">
          {!currentProjectIsLive ? (
            <div className="block relative w-64">
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
          <div className="block relative w-64">
            <label htmlFor="nrStars">Filter by Nr of Stars:</label>
            <select
              name="nrStars"
              id="nrStars"
              className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setNumberStars(e.target.value)}
            >
              <option value={3}>3-star</option>
              <option value={4}>4-star</option>
              <option value={5}>5-star</option>
            </select>
          </div>
        </form>
        <table className="table-auto col-span-3">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th>Hotel Name</th>
              <th>City</th>
              <th>Nr of Rooms</th>
              <th>Nr of Meeting Rooms</th>
              <th>Restaurants</th>
              <th>Update</th>
              <th>Delete</th>
              {currentProjectIsLive && <th>Add To Project</th>}
            </tr>
          </thead>
          <tbody className="text-white-50">{hotelList}</tbody>
        </table>
      </div>
    </>
  );
};

export default HotelList;
