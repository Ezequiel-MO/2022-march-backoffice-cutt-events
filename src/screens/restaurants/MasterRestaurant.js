import { useNavigate } from "react-router-dom";

const MasterRestaurant = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="text-2xl">Manage Restaurants</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/restaurant/list")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Get a List of All Restaurants in the Data Base
        </li>
        <li
          onClick={() => navigate("/restaurant/specs")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Create a New Restaurant and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterRestaurant;
