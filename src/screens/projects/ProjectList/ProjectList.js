import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const handleGetProjectList = async () => {
    try {
      const response = await baseAPI.get("v1/projects");
      setProjects(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await baseAPI.delete(`v1/projects/${projectId}`);
      alert("Project Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const projectList = projects.map((project) => (
    <li key={project._id}>{project.code}</li>
  ));
  return (
    <>
      <ul>{projectList}</ul>
      <button onClick={handleGetProjectList}>Get Project List</button>
      <button onClick={() => handleDeleteProject("6237450f7c388800b1edadbb")}>
        Delete Project
      </button>
    </>
  );
};

export default ProjectList;
