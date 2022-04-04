import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";
import HotelMasterForm from "./HotelMasterForm";

const HotelSpecs = () => {
  const navigate = useNavigate();
  const postToEndpoint = async (data, endPoint) => {
    try {
      await baseAPI.post(`v1/${endPoint}`, data);
      toast.success("Hotel created", toastOptions);
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

  const submitForm = (values, files, endpoint) => {
    const dataToPost = fillFormData(values, files);
    postToEndpoint(dataToPost, endpoint);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <HotelMasterForm submitForm={submitForm} />
    </div>
  );
};

export default HotelSpecs;
