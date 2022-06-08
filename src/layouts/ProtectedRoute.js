import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/header/Header";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {auth._id ? (
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default ProtectedRoute;
