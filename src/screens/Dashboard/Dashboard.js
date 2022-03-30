import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Master Resources</h1>
      <button onClick={() => navigate("/project")}>Projects</button>
      <button onClick={() => navigate("/hotel")}>Hotels</button>
      <button onClick={() => navigate("/restaurant")}>Restaurants</button>
      <button onClick={() => navigate("/event")}>Events</button>
    </>
  );
};

export default Dashboard;
