import { useNavigate } from "react-router-dom";

const MasterEvent = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/event/list")}>
        Get a List of All Events in the Data Base
      </button>
      <button onClick={() => navigate("/event/specs")}>
        Create a New Event and Save in the Data Base
      </button>
    </>
  );
};

export default MasterEvent;
