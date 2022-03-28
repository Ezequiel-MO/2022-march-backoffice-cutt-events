import React, { useEffect } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/Actions/ProjectActions";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    projectList: { projects },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

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
