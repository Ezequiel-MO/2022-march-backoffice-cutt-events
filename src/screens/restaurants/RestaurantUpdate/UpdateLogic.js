import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

const UpdateLogic = (params) => {
  const [updatedRestaurant, setUpdatedRestaurant] = useState({
    name: "",
    city: "",
    textContent: "",
    longitude: "",
    latitude: "",
    price: "",
    introduction: "",
  });
  const [originalRestaurant, setOriginalRestaurant] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    city: false,
    textContent: false,
    longitude: false,
    latitude: false,
    price: false,
    introduction: false,
  });

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateRestaurant = (e) => {
    setUpdatedRestaurant({
      ...updatedRestaurant,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setUpdatedRestaurant(originalRestaurant);
  }, [originalRestaurant]);

  const filterOutRestaurant = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "updatedAt" &&
        item !== "imageContentUrl" &&
        item !== "transfer" &&
        item !== "introduction"
      ) {
        filteredOutObj[item] = obj[item];
      }
    });
    return filteredOutObj;
  };

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const recovered = await baseAPI.get(
          `v1/restaurants/${params.restaurantId}`
        );
        const filteredOutRestaurantObj = filterOutRestaurant(
          recovered.data.data.data
        );
        const filteredOutRestaurantObjWithCoords = {
          ...filteredOutRestaurantObj,
          longitude: recovered.data.data.data.location.coordinates[1],
          latitude: recovered.data.data.data.location.coordinates[0],
        };
        delete filteredOutRestaurantObjWithCoords.location;
        setOriginalRestaurant(filteredOutRestaurantObjWithCoords);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurant();
  }, [params.restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurantBackwithLocation = {
      ...updatedRestaurant,
      location: {
        type: "Point",
        coordinates: [updatedRestaurant.longitude, updatedRestaurant.latitude],
      },
    };
    delete updatedRestaurantBackwithLocation.longitude;
    delete updatedRestaurantBackwithLocation.latitude;
    try {
      const updated = await baseAPI.patch(
        `v1/restaurants/${params.restaurantId}`,
        updatedRestaurantBackwithLocation
      );
      toast.success("Restaurant Updated", toastOptions);
      setUpdatedRestaurant(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSubmit,
    originalRestaurant,
    updatedRestaurant,
    isInput,

    handleUpdateRestaurant,
    setEditFieldStatus,
  };
};

export default UpdateLogic;
