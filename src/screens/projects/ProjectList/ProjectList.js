import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

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

  const projectList = projects.slice(0, 15).map((project) => (
    <tr key={project._id}>
      <td>{project.code}</td>
      <td>{project.groupLocation}</td>
      <td>{project.groupName}</td>
      <td>{project.nrPax}</td>
      <td>{project.arrivalDay}</td>
      <td>{project.departureDay}</td>
      <td>{project.clientCo}</td>
      <td
        className="hover:cursor-pointer"
        onClick={() =>
          navigate("/project/update", {
            state: { projectId: project._id, projectName: project.groupName },
          })
        }
      >
        <Icon
          icon="arcticons:huawei-system-update"
          color="#ea5933"
          width="30"
        />
      </td>
      <td
        className="hover:cursor-pointer"
        onClick={() => handleDeleteProject(project._id)}
      >
        <Icon icon="ei:trash" color="#ea5933" width="30" />
      </td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Project List</h1>
      <hr />
      <div className="container grid grid-cols-4 gap-4 my-4">
        <form className="text-orange-50">
          <div className="block relative w-64">
            <label htmlFor="cities">Filter by city:</label>
            <select
              name="cities"
              id="cities"
              className="block cursor-pointer appearance-none w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="Barcelona">Barcelona</option>
              <option value="Valencia">Valencia</option>
              <option value="Madrid">Madrid</option>
            </select>
          </div>
          <div className="block relative w-64">
            <label htmlFor="accountManager">Filter by Account Manager:</label>
            <select
              name="accountManager"
              id="accountManager"
              className="block cursor-pointer appearance-none w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setAccountManager(e.target.value)}
            >
              <option value="Montse Miranda">Montse Miranda</option>
              <option value="Ezequiel Martínez">Ezequiel Martínez</option>
              <option value="Minerva Martínez">Minerva Martínez</option>
            </select>
          </div>
        </form>
        <table className="table-auto col-span-3">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th>Code</th>
              <th>City</th>
              <th>Group Name</th>
              <th>Group Size</th>
              <th>Arrival Day</th>
              <th>Departure Day</th>
              <th>Client Company</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-white-50">{projectList}</tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectList;
