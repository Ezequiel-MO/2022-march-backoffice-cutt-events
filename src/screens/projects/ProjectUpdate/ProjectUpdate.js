import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

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
      toast.success("Project Updated", toastOptions);
      setUpdatedProject(updated.data.data.data);
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
  };

  const renderOriginalProject = (
    <>
      {Object.keys(originalProject).map((field) => (
        <div
          key={`${field}`}
          className="relative px-6 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer"
        >
          {isInput[field] ? (
            <div>
              <p className="font-bold">{field} :</p>
              <input
                type="text"
                placeholder={`New ${field}  ...`}
                onBlur={() => setEditFieldStatus(`${field}`, false)}
                name={`${field}`}
                value={updatedProject[`${field}`]}
                onChange={handleUpdateProject}
                className="absolute right-3.5 bottom-2 w-2/3"
                autoFocus
              />
            </div>
          ) : (
            <div onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedProject[`${field}`]
                ? `${field} : ${updatedProject[field]}`
                : `${field} : ${originalProject[field]}`}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Original Project</h1>
      <form
        onSubmit={handleSubmit}
        className="flex align-center justify-around w-3/4 mx-auto"
      >
        <div className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
          {renderOriginalProject}
        </div>
        <button
          className="h-12 px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          type="submit"
        >
          Update and Save
        </button>
      </form>
    </>
  );
};

export default ProjectUpdate;
