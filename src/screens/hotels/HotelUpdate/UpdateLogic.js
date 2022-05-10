import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

const UpdateLogic = (params) => {
  const [updatedHotel, setUpdatedHotel] = useState({
    name: "",
    city: "",
    introduction: "",
    longitude: "",
    latitude: "",
    checkin_out: "",
    numberRooms: "",
    numberStars: "",
    restaurants: "",
    swimmingPool: "",
    wifiSpeed: "",
    textContent: "",
  });
  const [originalHotel, setOriginalHotel] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    city: false,
    introduction: false,
    longitude: false,
    latitude: false,
    checkin_out: false,
    numberRooms: false,
    numberStars: false,
    restaurants: false,
    swimmingPool: false,
    wifiSpeed: false,
    textContent: false,
  });

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateHotel = (e) => {
    setUpdatedHotel({
      ...updatedHotel,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setUpdatedHotel(originalHotel);
  }, [originalHotel]);

  const filterOutHotel = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "updatedAt" &&
        item !== "imageContentUrl" &&
        item !== "price" &&
        item !== "introduction" &&
        item !== "coordinates"
      ) {
        filteredOutObj[item] = obj[item];
      }
    });
    return filteredOutObj;
  };

  useEffect(() => {
    const getHotel = async () => {
      try {
        const recovered = await baseAPI.get(`v1/hotels/${params.hotelId}`);
        const filteredOutHotelObj = filterOutHotel(recovered.data.data.data);
        const filteredOutHotelObjWithCoords = {
          ...filteredOutHotelObj,
          longitude: recovered.data.data.data.location.coordinates[0],
          latitude: recovered.data.data.data.location.coordinates[1],
        };
        delete filteredOutHotelObjWithCoords.location;
        setOriginalHotel(filteredOutHotelObjWithCoords);
      } catch (error) {
        console.log(error);
      }
    };
    getHotel();
  }, [params.hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedHotelBackwithLocation = {
      ...updatedHotel,
      location: {
        type: "Point",
        coordinates: [updatedHotel.longitude, updatedHotel.latitude],
      },
    };
    delete updatedHotelBackwithLocation.longitude;
    delete updatedHotelBackwithLocation.latitude;
    try {
      const updated = await baseAPI.patch(
        `v1/hotels/${params.hotelId}`,
        updatedHotelBackwithLocation
      );
      toast.success("Hotel Updated", toastOptions);
      setUpdatedHotel(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSubmit,
    originalHotel,
    updatedHotel,
    isInput,
    handleUpdateHotel,
    setEditFieldStatus,
  };
};

export default UpdateLogic;
