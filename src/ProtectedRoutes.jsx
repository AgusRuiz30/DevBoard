import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/queries/useAuth.js";
import LoadingScreen from "./components/Loading";

function ProtectedRoutes() {
  const { data: profile, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Verificando tu sesión..." />;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
