import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { useSelector } from "react-redux";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";

const TransferList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [numberStars, setNumberStars] = useState(3);
  const currentProject = useSelector(selectCurrentProject);

  useEffect(() => {
    if (currentProject) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject]);

  useEffect(() => {
    const getHotelList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/hotels?city=${city}&numberStars=${numberStars}`
        );
        setHotels(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getHotelList();
  }, [city, numberStars]);

  const handleDeleteHotel = async (hotelId) => {
    try {
      await baseAPI.delete(`v1/hotels/${hotelId}`);
      alert("Hotel Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const hotelList = hotels.map((hotel) => (
    <li key={hotel._id}>
      {hotel.name} <span>{hotel.city}</span>
      <button onClick={() => navigate(`/hotel-update/${hotel._id}`)}>
        Update a Hotel
      </button>
      <button onClick={() => handleDeleteHotel(hotel._id)}>Delete Hotel</button>
      {currentProject ? (
        <button
          onClick={() =>
            navigate(`/hotel-add/${hotel._id}`, {
              state: { hotelName: hotel.name },
            })
          }
        >
          Add To Project
        </button>
      ) : null}
    </li>
  ));

  return (
    <>
      <h1>Transfer List</h1>
      <form>
        {!currentProject ? (
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
        ) : null}
        <div>
          <label htmlFor="nrStars">Filter by Nr of Stars:</label>
          <select
            name="nrStars"
            id="nrStars"
            onChange={(e) => setNumberStars(e.target.value)}
          >
            <option value={3}>3-star</option>
            <option value={4}>4-star</option>
            <option value={5}>5-star</option>
          </select>
        </div>
      </form>
      <ul>{hotelList}</ul>
    </>
  );
};

export default TransferList;
