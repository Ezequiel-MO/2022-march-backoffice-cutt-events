import React from "react";
import baseAPI from "../../../axios/axiosConfig";
import EventMasterForm from "./EventMasterForm";

const EventSpecs = () => {
  const postToEndpoint = async (data, endPoint) => {
    try {
      await baseAPI.post(`v1/${endPoint}`, data);
    } catch (error) {
      console.log(error);
    }
  };

  const fillFormData = (values, files) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("textContent", values.textContent);
    formData.append("price", values.price);
    formData.append("location[coordinates][0]", values.latitude);
    formData.append("location[coordinates][1]", values.longitude);
    formData.append("introduction", values.introduction);

    for (let i = 0; i < files.length; i++) {
      formData.append("imageContentUrl", files[i]);
    }
    return formData;
  };

  const transformValues = (valuesObj) => {
    const transformedValues = { ...valuesObj };
    transformedValues.textContent = JSON.stringify(valuesObj.textContent);
    transformedValues.introduction = JSON.stringify(valuesObj.introduction);

    return transformedValues;
  };

  const submitForm = (values, files, endpoint) => {
    const transformedValues = transformValues(values);
    const dataToPost = fillFormData(transformedValues, files);
    postToEndpoint(dataToPost, endpoint);
  };

  return (
    <>
      <EventMasterForm submitForm={submitForm} />
    </>
  );
};

export default EventSpecs;
