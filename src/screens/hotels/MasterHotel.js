import { useNavigate } from "react-router-dom";

const MasterHotel = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="text-2xl">Manage Hotels</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/hotel/list")}
          className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
        >
          Get a List of All Hotels in the Data Base
        </li>
        <li
          onClick={() => navigate("/hotel/specs")}
          className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
        >
          Create a New Hotel and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterHotel;
