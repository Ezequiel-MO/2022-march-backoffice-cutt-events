import React from "react";
import baseAPI from "../../../axios/axiosConfig";
import ProjectMasterForm from "./ProjectMasterForm";

const ProjectSpecs = () => {
  const postToEndpoint = async (data, endPoint) => {
    try {
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
