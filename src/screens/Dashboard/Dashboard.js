import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="text-2xl">Master Resources</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/project")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Projects
        </li>
        <li
          onClick={() => navigate("/hotel")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Hotels
        </li>
        <li
          onClick={() => navigate("/restaurant")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Restaurants
        </li>
        <li
          onClick={() => navigate("/event")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Events
        </li>
        <li
          onClick={() => navigate("/transfer")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Transfers
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
