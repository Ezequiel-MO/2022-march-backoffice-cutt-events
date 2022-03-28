import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const ProjectUpdate = () => {
  const [originalProject, setOriginalProject] = useState({});
  const [updatedProject, setUpdatedProject] = useState({
    code: "",
    accountManager: "",
    groupName: "",
    /*  location: '', */
    /*  arrivalDay: "",
    departureDay: "", */
    nrPax: "",
    clientCo: "",
    clientAccManager: "",
  });
  const [isInput, setIsInput] = useState({
    code: false,
    accountManager: false,
    groupName: false,
    /*  location: false, */
    /*  arrivalDay: false,
    departureDay: false, */
    nrPax: false,
    clientCo: false,
    clientAccManager: false,
  });

  const location = useLocation();

  const filterOutProject = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "updatedAt" &&
        item !== "location" &&
        item !== "hotels" &&
        item !== "schedule" &&
        item !== "arrivalDay" &&
        item !== "departureDay"
      ) {
        filteredOutObj[item] = obj[item];
      }
    });
    return filteredOutObj;
  };

  useEffect(() => {
    setUpdatedProject(originalProject);
  }, [originalProject]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const recovered = await baseAPI.get(
          `v1/projects/${location.state.projectId}`
        );
        const filteredOutProjectObj = filterOutProject(
          recovered.data.data.data
        );
        setOriginalProject(filteredOutProjectObj);
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, [location.state.projectId]);

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateProject = (e) => {
    setUpdatedProject({
      ...updatedProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updated = await baseAPI.patch(
        `v1/projects/${location.state.projectId}`,
        updatedProject
      );
      setUpdatedProject(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalProject = (
    <>
      {Object.keys(originalProject).map((field) => (
        <div key={`${field}`}>
          {isInput[field] ? (
            <div style={{ display: "flex" }}>
              <p>{field} :</p>
              <input
                type="text"
                placeholder={`New ${field}  ...`}
                onBlur={() => setEditFieldStatus(`${field}`, false)}
                name={`${field}`}
                value={updatedProject[`${field}`]}
                onChange={handleUpdateProject}
                autoFocus
              />
            </div>
          ) : (
            <li onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedProject[`${field}`]
                ? `${field} : ${updatedProject[field]}`
                : `${field} : ${originalProject[field]}`}
            </li>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Original Project</h3>
          {renderOriginalProject}
        </div>
        <hr />
        <button type="submit">Update and Save</button>
      </form>
      <hr />
      <div>
        <h3>Updated Project</h3>
        {JSON.stringify(updatedProject)}
      </div>
    </>
  );
};

export default ProjectUpdate;
