import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";
import HotelMasterForm from "./HotelMasterForm";

const HotelSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { hotel },
  } = useLocation();

  const postToEndpoint = async (data, endPoint, update) => {
    try {
      if (update === true) {
        await baseAPI.patch(`v1/${endPoint}/${hotel._id}`, data);
        toast.success("Hotel updated", toastOptions);
      } else {
        await baseAPI.post(`v1/${endPoint}`, data);
        toast.success("Hotel created", toastOptions);
      }
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const fillFormData = (values, files) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("adress", values.address);
    formData.append("numberStars", values.numberStars);
    formData.append("numberRooms", values.numberRooms);
    formData.append("checkin_out", values.checkin_out);
    formData.append("wheelChairAccessible", values.wheelChairAccessible);
    formData.append("wifiSpeed", values.wifiSpeed);
    formData.append("swimmingPool", values.swimmingPool);
    formData.append("restaurants", values.restaurants);
    formData.append("textContent", JSON.stringify(values.textContent));
    formData.append("location[coordinates][0]", values.latitude);
    formData.append("location[coordinates][1]", values.longitude);

    for (let i = 0; i < files.length; i++) {
      formData.append("imageContentUrl", files[i]);
    }
    return formData;
  };

  const fillJSONData = (values) => {
    let jsonData = {};
    jsonData.name = values.name;
    jsonData.city = values.city;
    jsonData.adress = values.address;
    jsonData.numberStars = values.numberStars;
    jsonData.numberRooms = values.numberRooms;
    jsonData.checkin_out = values.checkin_out;
    jsonData.wheelChairAccessible = values.wheelChairAccessible;
    jsonData.wifiSpeed = values.wifiSpeed;
    jsonData.swimmingPool = values.swimmingPool;
    jsonData.restaurants = values.restaurants;
    jsonData.textContent = JSON.stringify(values.textContent);
    jsonData.location = {
      type: "Point",
      coordinates: [values.latitude, values.longitude],
    };

    return jsonData;
  };

  const submitForm = (values, files, endpoint, update) => {
    let dataToPost;
    if (update === false) {
      dataToPost = fillFormData(values, files);
    } else {
      dataToPost = fillJSONData(values);
    }
    postToEndpoint(dataToPost, endpoint, update);
  };

  return (
    <div>
      <HotelMasterForm submitForm={submitForm} hotel={hotel} />
    </div>
  );
};

export default HotelSpecs;
