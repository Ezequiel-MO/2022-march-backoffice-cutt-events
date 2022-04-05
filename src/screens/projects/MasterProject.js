import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentProject } from "../../redux/features/CurrentProjectSlice";

const MasterProject = () => {
  const navigate = useNavigate();
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  const handleClearProject = () => {
    localStorage.removeItem("currentProject");
    alert("Project cleared");
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="text-2xl">Manage Projects</h1>
      {currentProjectIsLive ? (
        <ul className="indent-6 text-white-100">
          <li
            onClick={() => navigate("/hotel/list")}
            className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
          >
            Add a Hotel to current project
          </li>
          <li
            onClick={() => navigate("/project/schedule")}
            className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
          >
            Configure schedule for current project
          </li>
          <li
            onClick={handleClearProject}
            className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
          >
            CLEAR EXISTING PROJECT
          </li>
        </ul>
      ) : (
        <ul className="indent-6 text-white-100">
          <li
            onClick={() => navigate("/project/list")}
            className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
          >
            Get a List of All Projects in the Data Base
          </li>
          <li
            onClick={() => navigate("/project/specs")}
            className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
          >
            Create a New Project and Save in the Data Base
          </li>
        </ul>
      )}
    </div>
  );
};

export default MasterProject;
