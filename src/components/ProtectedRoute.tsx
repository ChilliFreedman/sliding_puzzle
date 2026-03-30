import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import type { JSX } from "react";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("UserContext is undefined");
  const { user } = userContext;

  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;