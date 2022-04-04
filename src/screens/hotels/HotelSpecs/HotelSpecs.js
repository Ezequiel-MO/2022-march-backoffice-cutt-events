import React from "react";
import baseAPI from "../../../axios/axiosConfig";
import HotelMasterForm from "./HotelMasterForm";

const HotelSpecs = () => {
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
    formData.append("adress", values.address);
    formData.append("numberStars", values.numberStars);
    formData.append("numberRooms", values.numberRooms);
    formData.append("checkin_out", values.checkin_out);
    formData.append("wheelChairAccessible", values.wheelChairAccessible);
    formData.append("wifiSpeed", values.wifiSpeed);
    formData.append("swimmingPool", values.swimmingPool);
    formData.append("restaurants", values.restaurants);
    formData.append("textContent", values.textContent);
    formData.append("introduction", values.introduction);
    formData.append("location[coordinates][0]", values.latitude);
    formData.append("location[coordinates][1]", values.longitude);

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
    <div>
      <HotelMasterForm submitForm={submitForm} />
    </div>
  );
};

export default HotelSpecs;
