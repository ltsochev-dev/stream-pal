import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/app/context/AuthContext";
import SimplePreloader from "@/app/components/SimplePreloader";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <SimplePreloader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
