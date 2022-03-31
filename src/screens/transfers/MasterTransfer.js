import { useNavigate } from "react-router-dom";

const MasterTransfer = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/project/list")}>
        Get a List of All Transfers in the Data Base
      </button>

      <button onClick={() => navigate("/transfer/specs")}>
        Create a New Transfer service and Save in the Data Base
      </button>
      <button onClick={() => navigate("/hotel-list")}>
        Add a Transfer to project event
      </button>
    </>
  );
};

export default MasterTransfer;
