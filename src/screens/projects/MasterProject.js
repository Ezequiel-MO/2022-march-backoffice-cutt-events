import { useNavigate } from "react-router-dom";

const MasterProject = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/project-list")}>
        Get a List of All Projects in the Data Base
      </button>
      <button onClick={() => navigate("/project-specs")}>
        Create a New Project and Save in the Data Base
      </button>
    </>
  );
};

export default MasterProject;
