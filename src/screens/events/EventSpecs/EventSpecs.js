import React from "react";
import { toast, ToastContainer } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import EventMasterForm from "./EventMasterForm";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../../dev-data/toast";

const EventSpecs = () => {
  const navigate = useNavigate();
  const postToEndpoint = async (data, endPoint) => {
    try {
      await baseAPI.post(`v1/${endPoint}`, data);
      toast.success("Event created", toastOptions);
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
    formData.append("textContent", JSON.stringify(values.textContent));
    formData.append("price", values.price);
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
    <>
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
      <EventMasterForm submitForm={submitForm} />
    </>
  );
};

export default EventSpecs;
