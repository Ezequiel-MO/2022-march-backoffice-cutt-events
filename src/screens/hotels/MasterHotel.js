import { useNavigate } from "react-router-dom";

const MasterHotel = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/hotel/list")}>
        Get a List of All Hotels in the Data Base
      </button>
      <button onClick={() => navigate("/hotel/specs")}>
        Create a New Hotel and Save in the Data Base
      </button>
    </>
  );
};

export default MasterHotel;
