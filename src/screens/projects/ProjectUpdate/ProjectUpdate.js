import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { updateProject } from "../../../dev-data/project-data";

const ProjectUpdate = () => {
  const [updatedProject, setUpdatedProject] = useState({});
  const [originalProject, setOriginalProject] = useState({});
  const handleProjectUpdate = async (projectId) => {
    try {
      const updated = await baseAPI.patch(
        `v1/projects/${projectId}`,
        updateProject
      );
      setUpdatedProject(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSingleProject = async (projectId) => {
    try {
      const recovered = await baseAPI.get(`v1/projects/${projectId}`);
      setOriginalProject(recovered);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {JSON.stringify(originalProject)}
      <hr />
      {JSON.stringify(updatedProject)}
      <button
        onClick={() => handleGetSingleProject("623b36c1cc1f35fe5517fdb2")}
      >
        Recover a project
      </button>
      <button onClick={() => handleProjectUpdate("623b36c1cc1f35fe5517fdb2")}>
        Amend an existing project
      </button>
    </>
  );
};

export default ProjectUpdate;
