import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserQueryOptions } from "./query-options/fetchCurrentUserQueryOptions";


function PublicRoute() {
  const {data: user, isLoading, isError} = useQuery(fetchCurrentUserQueryOptions());

  if (isLoading) return null;
  if (user && !isError) return <Navigate to="/home" replace />;

  return <Outlet />; // render login/signup if no token
}

export default PublicRoute;
