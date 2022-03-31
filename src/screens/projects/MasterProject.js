import { useNavigate } from "react-router-dom";

const MasterProject = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/project/list")}>
        Get a List of All Projects in the Data Base
      </button>

      <button onClick={() => navigate("/project/specs")}>
        Create a New Project and Save in the Data Base
      </button>
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
  );
};

export default MasterProject;
