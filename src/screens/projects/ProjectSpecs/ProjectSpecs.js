import React from "react";
import { useDispatch } from "react-redux";
import baseAPI from "../../../axios/axiosConfig";
import { SET_CURRENT_PROJECT } from "../../../redux/features/CurrentProjectSlice";
import ProjectMasterForm from "./ProjectMasterForm";
import { useNavigate } from "react-router-dom";

const ProjectSpecs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postToEndpoint = async (data, endPoint) => {
    try {
      const res = await baseAPI.post(`v1/${endPoint}`, data);
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
