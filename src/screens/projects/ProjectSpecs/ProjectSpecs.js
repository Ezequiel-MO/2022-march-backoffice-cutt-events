import React from "react";
import { useDispatch } from "react-redux";
import baseAPI from "../../../axios/axiosConfig";
import { SET_CURRENT_PROJECT } from "../../../redux/features/CurrentProjectSlice";
import ProjectMasterForm from "./ProjectMasterForm";

const ProjectSpecs = () => {
  const dispatch = useDispatch();
  const postToEndpoint = async (data, endPoint) => {
    try {
      console.log("data", data);
      dispatch(SET_CURRENT_PROJECT(data));
      await baseAPI.post(`v1/${endPoint}`, data);
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
