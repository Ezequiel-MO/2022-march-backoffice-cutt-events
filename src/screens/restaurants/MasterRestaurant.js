import { useNavigate } from "react-router-dom";

const MasterRestaurant = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/restaurant-list")}>
        Get a List of All Restaurants in the Data Base
      </button>
      <button onClick={() => navigate("/restaurant-specs")}>
        Create a New Restaurant and Save in the Data Base
      </button>
    </>
  );
};

export default MasterRestaurant;
