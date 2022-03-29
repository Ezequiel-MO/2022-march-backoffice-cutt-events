import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const HotelList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [numberStars, setNumberStars] = useState(3);

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
      <button
        onClick={() =>
          navigate("/hotel-update", {
            state: { hotelId: hotel._id, hotelName: hotel.name },
          })
        }
      >
        Update a Hotel
      </button>
      <button onClick={() => handleDeleteHotel(hotel._id)}>Delete Hotel</button>
    </li>
  ));

  return (
    <>
      <h1>Hotel List</h1>
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

export default HotelList;
