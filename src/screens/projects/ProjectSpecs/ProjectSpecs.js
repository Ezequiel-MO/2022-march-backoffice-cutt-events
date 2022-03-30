import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseAPI from "../../../axios/axiosConfig";
import {
  ADD_DAYS_TO_PROJECT_SCHEDULE,
  SET_CURRENT_PROJECT,
} from "../../../redux/features/CurrentProjectSlice";
import ProjectMasterForm from "./ProjectMasterForm";
import { useNavigate } from "react-router-dom";
import {
  computeTotalDays,
  whichDay,
} from "../../../helperFunctions/helperFunctions";

const ProjectSpecs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transformData = (data, diffDays) => {
    let transformedData = { ...data };
    transformedData.schedule = [];
    console.log("daaata", transformedData);
    for (let i = 1; i <= diffDays; i++) {
      transformedData.schedule.push({
        date: whichDay(i, diffDays),
        dayOfEvent: i,
        morningEvents: [],
        lunch: [],
        afternoonEvents: [],
        dinner: [],
        transfer_in: [],
        transfer_out: [],
      });
    }
    return transformedData;
  };

  const postToEndpoint = async (data, endPoint) => {
    const diffDays = computeTotalDays(data.arrivalDay, data.departureDay);
    const transformedData = transformData(data, diffDays);
    try {
      const res = await baseAPI.post(`v1/${endPoint}`, transformedData);
      localStorage.setItem(
        "currentProject",
        JSON.stringify(res.data.data.data)
      );
      dispatch(SET_CURRENT_PROJECT(res.data.data.data));
      alert("Base Project Created");
      navigate("/hotel-list");
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = (values, endpoint) => {
    postToEndpoint(values, endpoint);
  };

  return (
    <>
      <ProjectMasterForm submitForm={submitForm} />
    </>
  );
};

export default ProjectSpecs;
