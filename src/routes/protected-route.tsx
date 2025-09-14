import { useAuth } from "@/context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a spinner
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
