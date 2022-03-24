import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <button>Config New Project</button>
      <button onClick={() => navigate("/hotel")}>Hotel Master</button>
      <button>Restaurant Master</button>
      <button>Event Master</button>
    </>
  );
};

export default Dashboard;
