import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Icon } from "@iconify/react";

const RestaurantMasterForm = ({ submitForm, restaurant }) => {
  const [restName, setRestName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState(false);

  const fileInput = useRef();

  useEffect(() => {
    if (Object.keys(restaurant).length > 0) {
      setRestName(restaurant.name);
      setLongitude(restaurant.location.coordinates[1]);
      setLatitude(restaurant.location.coordinates[0]);
      setPrice(restaurant.price);
      setCity(restaurant.city);
      setTextContent(restaurant.textContent);
    }
  }, [restaurant]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      [restName, longitude, latitude, price, city, textContent].includes("")
    ) {
      setError(true);
      return;
    }
    setError(false);

    const values = {
      name: restName,
      city,
      longitude,
      latitude,
      price,
      textContent,
      id: restaurant._id,
    };

    const update = Object.keys(restaurant).length > 0 ? true : false;

    submitForm(values, fileInput.current.files ?? [], "restaurants", update);
  };

  return (
    <div className="block text-center rounded-lg shadow-lg bg-white-50 py-8 w-full ">
      <h1 className="text-2xl mb-4">General Restaurant Data</h1>

      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-x-2 px-8">
          <div className="flex flex-col md:w-1/3">
            <label
              htmlFor="restName"
              className="block text-gray-700 uppercase font-bold"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="restName"
              placeholder="Restaurant Name"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={restName}
              onChange={(e) => setRestName(e.target.value)}
            />
            <label
              htmlFor="price"
              className="block text-gray-700 uppercase font-bold"
            >
              Menu Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="ex : 35"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label
              htmlFor="price"
              className="block text-gray-700 uppercase font-bold"
            >
              Location (city)
            </label>
            <input
              type="text"
              id="city"
              placeholder="Restaurant City"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:w-1/3">
            <label
              htmlFor="textContent"
              className="block text-gray-700 uppercase font-bold"
            >
              Restaurant Description
            </label>
            <textarea
              type="text"
              id="textContent"
              placeholder="Write a description"
              className="
              h-52
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              mt-2
              mb-2   
              focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />

            <input
              id="file-upload"
              type="file"
              ref={fileInput}
              name="imageContentUrl"
              multiple
              disabled={Object.keys(restaurant).length > 0 ? true : false}
            />
          </div>
          <div className="flex flex-col md:w-1/3">
            <label
              htmlFor="longitude"
              className="block text-gray-700 uppercase font-bold"
            >
              Coords (Longitude)
            </label>
            <input
              type="number"
              id="longitude"
              placeholder="ex : 2.154007"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <label
              htmlFor="latitude"
              className="block text-gray-700 uppercase font-bold"
            >
              Coords (Latitude)
            </label>
            <input
              type="number"
              id="latitude"
              placeholder="ex : 41.390205"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="submit"
              className="cursor-pointer mt-8 mx-auto py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
              value={
                restaurant._id ? "Edit Restaurant Form" : "Save new Restaurant"
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RestaurantMasterForm;
