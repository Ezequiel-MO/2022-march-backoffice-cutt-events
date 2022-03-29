import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjectList = async () => {
      try {
        const response = await baseAPI.get("/v1/projects");
        setProjects(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectList();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await baseAPI.delete(`v1/projects/${projectId}`);
      alert("Project Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const projectList = projects.map((project) => (
    <li key={project._id}>
      {project.code}
      <button
        onClick={() =>
          navigate("/project-update", {
            state: { projectId: project._id, projectName: project.groupName },
          })
        }
      >
        Update a Project
      </button>
      <button onClick={() => handleDeleteProject(project._id)}>
        Delete Project
      </button>
    </li>
  ));

  return (
    <>
      <ul>{projectList}</ul>
    </>
  );
};

export default ProjectList;
