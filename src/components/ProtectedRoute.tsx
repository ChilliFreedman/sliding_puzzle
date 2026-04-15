import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { ROUTES } from "../utils/constants/routes"
import { useUser } from "../contexts/UserContext";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUser();

  return user ? children : <Navigate to={ROUTES.HOME} />;
};

export default ProtectedRoute;