import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/project")}>Config New Project</button>
      <button onClick={() => navigate("/hotel")}>Hotel Master</button>
      <button onClick={() => navigate("/restaurant")}>Restaurant Master</button>
      <button onClick={() => navigate("/event")}>Event Master</button>
    </>
  );
};

export default Dashboard;
