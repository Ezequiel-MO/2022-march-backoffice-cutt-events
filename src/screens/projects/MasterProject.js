import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentProject } from "../../redux/features/CurrentProjectSlice";

const MasterProject = () => {
  const navigate = useNavigate();
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  return (
    <>
      {currentProjectIsLive ? (
        <>
          <button onClick={() => navigate("/hotel-list")}>
            Add a Hotel to current project
          </button>
          <button onClick={() => navigate("/project/schedule")}>
            Configure schedule for current project
          </button>
          <button onClick={() => localStorage.removeItem("currentProject")}>
            CLEAR EXISTING PROJECT
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/project/list")}>
            Get a List of All Projects in the Data Base
          </button>

          <button onClick={() => navigate("/project/specs")}>
            Create a New Project and Save in the Data Base
          </button>
        </>
      )}
    </>
  );
};

export default MasterProject;
