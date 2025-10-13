import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserQueryOptions } from "./query-options/fetchCurrentUserQueryOptions";

function ProtectedRoute() {
  const {data: user, isLoading, isError} = useQuery(fetchCurrentUserQueryOptions());
  
  if (isLoading) return null;
  if (isError || !user) return <Navigate to="/login" replace />;

  return <Outlet />; // render child routes
}

export default ProtectedRoute;
