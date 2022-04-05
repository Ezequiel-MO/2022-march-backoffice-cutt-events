import { useNavigate } from "react-router-dom";

const MasterTransfer = () => {
  const navigate = useNavigate();
  return (
    <div className="container ">
      <h1 className="text-2xl">Manage Transfers</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/transfer/list")}
          className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
        >
          Get a List of All Transfers in the Data Base
        </li>

        <li
          onClick={() => navigate("/transfer/specs")}
          className="hover:text-orange-50 hover:border-l-4 hover:border-white-50 cursor-pointer"
        >
          Create a New Transfer service and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterTransfer;
