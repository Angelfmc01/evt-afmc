import { type ReactNode } from "react";
import { useAuthContext } from "../auth/authConextHook";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: number[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user?.rol as number)) return <Navigate to="/productos" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
