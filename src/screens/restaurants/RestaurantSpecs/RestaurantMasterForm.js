import { useEffect, useRef, useState } from "react";
import Error from "../../../UI/error/Error";
import { restaurantSchema, restNameSchema } from "./RestaurantValidation";

const RestaurantMasterForm = ({ submitForm, restaurant }) => {
  const [restName, setRestName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState(false);

  const [errorStatus, setErrorStatus] = useState({
    restName: false,
    longitude: false,
    latitude: false,
    price: false,
    city: false,
    textContent: false,
  });

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

  const handleSubmit = async (e) => {
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

  const checkError = async (e) => {
    const { name, value } = e.target;
    const data = { [name]: value };
    const restNameIsValid = await restNameSchema.isValid(data);
    setErrorStatus({ ...errorStatus, [name]: !restNameIsValid });
    setTimeout(() => {
      setErrorStatus({ ...errorStatus, [name]: false });
    }, 1000);
  };

  return (
    <div className="block text-center rounded-lg shadow-lg bg-black-50 py-8 w-full ">
      <h1 className="text-2xl mb-4">General Restaurant Data</h1>

      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        {error && <Error mensaje="Todos los campos son obligatorios" />}
        <div className="flex flex-col md:flex-row space-x-2 px-8">
          <div className="flex flex-col md:w-1/3">
            <label
              htmlFor="restName"
              className="text-white-100 uppercase font-bold"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="restName"
              name="restName"
              placeholder="Restaurant Name"
              className="border-2 w-full p-2 mt-2 rounded-md text-black-50"
              value={restName}
              onChange={(e) => setRestName(e.target.value)}
              onBlur={checkError}
            />
            {errorStatus.restName && (
              <Error mensaje="Please insert a restaurant name" />
            )}
            <label
              htmlFor="price"
              className=" text-white-100 uppercase font-bold"
            >
              Menu Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="ex : 35"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black-50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={checkError}
            />
            {errorStatus.price && (
              <Error mensaje="Please insert a sample menu price" />
            )}
            <label
              htmlFor="price"
              className=" text-white-100 uppercase font-bold"
            >
              Location (city)
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Restaurant City"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black-50"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={checkError}
            />
            {errorStatus.city && <Error mensaje="Please add a city" />}
          </div>

          <div className="flex flex-col md:w-1/3">
            <label
              htmlFor="textContent"
              className=" text-white-100 uppercase font-bold"
            >
              Restaurant Description
            </label>
            <textarea
              type="text"
              id="textContent"
              name="textContent"
              placeholder="Write a description"
              className="
              h-52       
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              mt-2
              mb-2   
              focus:bg-white focus:border-orange-50 focus:outline-none "
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              onBlur={checkError}
            />
            {errorStatus.textContent && (
              <Error mensaje="Please add a description" />
            )}

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
              className="block text-white-100 uppercase font-bold"
            >
              Coords (Longitude)
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              placeholder="ex : 2.154007"
              className="border-2 w-full p-2 mt-2 text-black-50 rounded-md"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              onBlur={checkError}
            />
            {errorStatus.longitude && (
              <Error mensaje="Please insert location (coords)" />
            )}
            <label
              htmlFor="latitude"
              className="block text-white-100 uppercase font-bold"
            >
              Coords (Latitude)
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              placeholder="ex : 41.390205"
              className="border-2 w-full p-2 mt-2 text-black-50 rounded-md"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              onBlur={checkError}
            />
            {errorStatus.latitude && (
              <Error mensaje="Please insert location (coords)" />
            )}
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
