import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateGard = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/authentication" />;
};

export default PrivateGard;
