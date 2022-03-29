import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [city, setCity] = useState("Barcelona");
  const [accountManager, setAccountManager] = useState("John Doe");

  useEffect(() => {
    const getProjectList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/projects?groupLocation=${city}&accountManager=${accountManager}`
        );
        setProjects(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectList();
  }, [city, accountManager]);

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
      <h1>Project List</h1>
      <form>
        <div>
          <label htmlFor="cities">Filter by city:</label>
          <select
            name="cities"
            id="cities"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="Barcelona">Barcelona</option>
            <option value="Valencia">Valencia</option>
            <option value="Madrid">Madrid</option>
          </select>
        </div>
        <div>
          <label htmlFor="accountManager">Filter by Account Manager:</label>
          <select
            name="accountManager"
            id="accountManager"
            onChange={(e) => setAccountManager(e.target.value)}
          >
            <option value="Montse Miranda">Montse Miranda</option>
            <option value="Ezequiel Martínez">Ezequiel Martínez</option>
            <option value="Minerva Martínez">Minerva Martínez</option>
          </select>
        </div>
      </form>
      <ul>{projectList}</ul>
    </>
  );
};

export default ProjectList;
