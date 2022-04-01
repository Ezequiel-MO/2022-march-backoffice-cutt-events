import { useNavigate } from "react-router-dom";

const MasterEvent = () => {
  const navigate = useNavigate();
  return (
    <div className="container ">
      <h1 className="text-2xl">Manage Events</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/event/list")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Get a List of All Events in the Data Base
        </li>
        <li
          onClick={() => navigate("/event/specs")}
          className="hover:text-orange-50 cursor-pointer"
        >
          Create a New Event and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterEvent;
